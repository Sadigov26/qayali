import cloudinaryPackage from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const { v2: cloudinary } = cloudinaryPackage;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const productImageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "qayali-sport/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1400, height: 1400, crop: "limit" }],
  },
});

export default cloudinary;
