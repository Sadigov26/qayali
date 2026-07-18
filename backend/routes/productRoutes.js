import express from "express";
import cloudinary from "../config/cloudinary.js";
import { requireAdmin } from "../middleware/authMiddleware.js";
import { uploadProductImage } from "../middleware/uploadImage.js";
import Product from "../models/Product.js";

const router = express.Router();

function parsePagination(query) {
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 20, 1), 50);

  return { page, limit, skip: (page - 1) * limit };
}

function parsePrice(price) {
  if (price === "" || price == null) {
    return null;
  }

  const parsed = Number(price);
  return Number.isNaN(parsed) ? null : parsed;
}

function productPayload(body, file, fallback = {}) {
  return {
    title: body.title ?? fallback.title,
    description: body.description ?? fallback.description,
    price: parsePrice(body.price),
    imageUrl: file?.path ?? fallback.imageUrl,
    imagePublicId: file?.filename ?? fallback.imagePublicId,
  };
}

router.get("/", async (request, response) => {
  const { page, limit, skip } = parsePagination(request.query);
  const [items, total] = await Promise.all([
    Product.find().sort({ createdAt: -1 }).skip(skip).limit(limit),
    Product.countDocuments(),
  ]);

  response.json({
    items,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit) || 1,
  });
});

router.get("/:id", async (request, response) => {
  const product = await Product.findById(request.params.id);

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

    const product = await Product.create(productPayload(request.body, request.file));
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

    const oldPublicId = product.imagePublicId;
    Object.assign(product, productPayload(request.body, request.file, product));
    await product.save();

    if (request.file && oldPublicId) {
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
