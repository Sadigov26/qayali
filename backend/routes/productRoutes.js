import express from "express";
import cloudinary, { uploadProductImageToCloudinary } from "../config/cloudinary.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { uploadProductImage } from "../middleware/uploadImage.js";
import Product from "../models/Product.js";

const router = express.Router();

function parsePagination(query) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 20, 1), 50);

  return { page, limit, skip: (page - 1) * limit };
}

function normalizeCategory(category) {
  const value = String(category || "").trim();
  return value || "Ümumi";
}

function productFilter(query) {
  const category = String(query.category || "").trim();

  if (!category || category === "all") {
    return {};
  }

  return { category };
}

function productSort(sort) {
  if (sort === "views") {
    return { views: -1, createdAt: -1 };
  }

  if (sort === "oldest") {
    return { createdAt: 1 };
  }

  return { createdAt: -1 };
}

function parsePrice(price) {
  if (price === "" || price == null) {
    return null;
  }

  const parsed = Number(price);
  return Number.isNaN(parsed) ? null : parsed;
}

function productPayload(body, image = {}) {
  return {
    title: body.title,
    description: body.description || "",
    price: parsePrice(body.price),
    category: normalizeCategory(body.category),
    imageUrl: image.secure_url,
    imagePublicId: image.public_id,
  };
}

function validateProductBody(body) {
  const description = String(body.description || "");

  if (description.length > 700) {
    return "Açıqlama maksimum 700 karakter ola bilər";
  }

  return "";
}

router.get("/", async (request, response) => {
  const { page, limit, skip } = parsePagination(request.query);
  const filter = productFilter(request.query);
  const [items, total] = await Promise.all([
    Product.find(filter)
      .sort(productSort(request.query.sort))
      .skip(skip)
      .limit(limit),
    Product.countDocuments(filter),
  ]);

  response.json({
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  });
});

router.get("/stats", requireAdmin, async (_request, response) => {
  const [summary, categoryStats, topViewed, latestProducts] = await Promise.all([
    Product.aggregate([
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          totalViews: { $sum: "$views" },
          averageViews: { $avg: "$views" },
        },
      },
    ]),
    Product.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
          views: { $sum: "$views" },
        },
      },
      { $sort: { count: -1, views: -1, _id: 1 } },
    ]),
    Product.find().sort({ views: -1, createdAt: -1 }).limit(5),
    Product.find().sort({ createdAt: -1 }).limit(5),
  ]);

  const stats = summary[0] || {
    totalProducts: 0,
    totalViews: 0,
    averageViews: 0,
  };

  return response.json({
    totalProducts: stats.totalProducts,
    totalViews: stats.totalViews || 0,
    averageViews: Math.round(stats.averageViews || 0),
    categoryStats: categoryStats.map((item) => ({
      category: item._id || "Ümumi",
      count: item.count,
      views: item.views || 0,
    })),
    topViewed,
    latestProducts,
  });
});

router.get("/:id", async (request, response) => {
  const shouldTrackView =
    request.query.track !== "0" && !request.headers.authorization;
  const product = shouldTrackView
    ? await Product.findByIdAndUpdate(
        request.params.id,
        { $inc: { views: 1 } },
        { new: true },
      )
    : await Product.findById(request.params.id);

  if (!product) {
    return response.status(404).json({ message: "Məhsul tapılmadı" });
  }

  return response.json(product);
});

router.post(
  "/",
  requireAdmin,
  uploadProductImage.single("image"),
  async (request, response) => {
    if (!request.file) {
      return response.status(400).json({ message: "Şəkil əlavə edin" });
    }

    const validationError = validateProductBody(request.body);

    if (validationError) {
      return response.status(400).json({ message: validationError });
    }

    const image = await uploadProductImageToCloudinary(request.file);
    const product = await Product.create(productPayload(request.body, image));

    return response.status(201).json(product);
  },
);

router.put(
  "/:id",
  requireAdmin,
  uploadProductImage.single("image"),
  async (request, response) => {
    const product = await Product.findById(request.params.id);

    if (!product) {
      return response.status(404).json({ message: "Məhsul tapılmadı" });
    }

    const validationError = validateProductBody(request.body);

    if (validationError) {
      return response.status(400).json({ message: validationError });
    }

    const oldPublicId = product.imagePublicId;
    let newImage = null;

    if (request.file) {
      newImage = await uploadProductImageToCloudinary(request.file);
    }

    product.title = request.body.title ?? product.title;
    product.description = request.body.description ?? product.description;
    product.price = parsePrice(request.body.price);
    product.category = normalizeCategory(request.body.category ?? product.category);

    if (newImage) {
      product.imageUrl = newImage.secure_url;
      product.imagePublicId = newImage.public_id;
    }

    await product.save();

    if (newImage && oldPublicId) {
      await cloudinary.uploader.destroy(oldPublicId).catch(() => null);
    }

    return response.json(product);
  },
);

router.delete("/:id", requireAdmin, async (request, response) => {
  const product = await Product.findByIdAndDelete(request.params.id);

  if (!product) {
    return response.status(404).json({ message: "Məhsul tapılmadı" });
  }

  await cloudinary.uploader.destroy(product.imagePublicId).catch(() => null);
  return response.json({ message: "Məhsul silindi" });
});

export default router;
