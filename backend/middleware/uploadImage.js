import multer from "multer";

const MAX_FILE_SIZE = 6 * 1024 * 1024;

function imageOnly(_request, file, callback) {
  if (!file.mimetype.startsWith("image/")) {
    return callback(new Error("Yalnız şəkil faylları qəbul olunur. JPG, PNG və WEBP istifadə edin."));
  }

  return callback(null, true);
}

export const uploadProductImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: imageOnly,
});
