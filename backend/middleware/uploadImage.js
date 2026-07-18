import multer from "multer";

const MAX_FILE_SIZE = 6 * 1024 * 1024;
const allowedImageExtensions = [".jpg", ".jpeg", ".png", ".webp", ".heic", ".heif"];

function hasAllowedImageExtension(filename = "") {
  const lowerName = filename.toLowerCase();

  return allowedImageExtensions.some((extension) => lowerName.endsWith(extension));
}

function imageOnly(_request, file, callback) {
  const isImageMime = file.mimetype.startsWith("image/");
  const isAllowedExtension = hasAllowedImageExtension(file.originalname);

  if (!isImageMime && !isAllowedExtension) {
    return callback(
      new Error(
        "Yalnız şəkil faylları qəbul olunur. JPG, PNG, WEBP və HEIC istifadə edin.",
      ),
    );
  }

  return callback(null, true);
}

export const uploadProductImage = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter: imageOnly,
});
