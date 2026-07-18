import multer from "multer";
import { productImageStorage } from "../config/cloudinary.js";

const MAX_FILE_SIZE = 3 * 1024 * 1024;

function imageOnly(_request, file, callback) {
  if (!file.mimetype.startsWith("image/")) {
    return callback(new Error("Yalnız şəkil faylları qəbul olunur"));
  }

  return callback(null, true);
}

export const uploadProductImage = multer({
  storage: productImageStorage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: imageOnly,
});
