import "./env.js";
import cloudinaryPackage from "cloudinary";

const { v2: cloudinary } = cloudinaryPackage;

function getCloudinaryConfig() {
  const hasSeparateCredentials =
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET;

  if (process.env.CLOUDINARY_URL) {
    const parsedUrl = new URL(process.env.CLOUDINARY_URL);

    return {
      cloud_name: parsedUrl.hostname,
      api_key: decodeURIComponent(parsedUrl.username),
      api_secret: decodeURIComponent(parsedUrl.password),
      signature_algorithm: "sha256",
      hide_sensitive: true,
    };
  }

  if (hasSeparateCredentials) {
    return {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      signature_algorithm: "sha256",
      hide_sensitive: true,
    };
  }

  return {
    cloud_name: "",
    api_key: "",
    api_secret: "",
    signature_algorithm: "sha256",
    hide_sensitive: true,
  };
}

cloudinary.config(getCloudinaryConfig());

export function uploadProductImageToCloudinary(file) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "qayali-sport/products",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        resolve(result);
      },
    );

    stream.end(file.buffer);
  });
}

export default cloudinary;
