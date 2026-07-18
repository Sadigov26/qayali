import cors from "cors";
import "./config/env.js";
import express from "express";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT || 5000;

function normalizeOrigin(origin = "") {
  return origin.trim().replace(/\/+$/, "");
}

const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) {
    return true;
  }

  const normalizedOrigin = normalizeOrigin(origin);

  return (
    allowedOrigins.length === 0 ||
    allowedOrigins.includes(normalizedOrigin) ||
    normalizedOrigin.endsWith(".vercel.app")
  );
}

app.use(
  cors({
    origin(origin, callback) {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("CORS icazəsi yoxdur"));
    },
  }),
);
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok", service: "qayali-sport-admin-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.use((error, _request, response, _next) => {
  void _next;
  console.error(error.message || error);

  if (error.name === "MulterError" && error.code === "LIMIT_FILE_SIZE") {
    return response.status(400).json({ message: "Şəkil maksimum 3MB ola bilər" });
  }

  return response
    .status(500)
    .json({ message: "Əməliyyat tamamlanmadı. Məlumatları yoxlayıb yenidən cəhd edin." });
});

await connectDB();

app.listen(port, () => {
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
