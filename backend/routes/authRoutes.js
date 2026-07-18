import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { requireAdmin } from "../middleware/authMiddleware.js";
import Admin from "../models/Admin.js";

const router = express.Router();

function signAdminToken(admin) {
  return jwt.sign(
    { id: admin._id.toString(), username: admin.username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

router.post("/login", async (request, response) => {
  const username = String(request.body.username || "").trim().toLowerCase();
  const password = String(request.body.password || "");

  if (!username || !password) {
    return response
      .status(400)
      .json({ message: "İstifadəçi adı və şifrə tələb olunur" });
  }

  const admin = await Admin.findOne({ username });
  const passwordMatches =
    admin && (await bcrypt.compare(password, admin.passwordHash));

  if (!passwordMatches) {
    return response.status(401).json({ message: "Giriş məlumatları yanlışdır" });
  }

  return response.json({
    token: signAdminToken(admin),
    admin: { id: admin._id.toString(), username: admin.username },
  });
});

router.put("/password", requireAdmin, async (request, response) => {
  const currentPassword = String(request.body.currentPassword || "");
  const newPassword = String(request.body.newPassword || "");

  if (!currentPassword || !newPassword) {
    return response
      .status(400)
      .json({ message: "Cari şifrə və yeni şifrə tələb olunur" });
  }

  if (newPassword.length < 8) {
    return response
      .status(400)
      .json({ message: "Yeni şifrə ən azı 8 simvol olmalıdır" });
  }

  const admin = await Admin.findById(request.admin.id);
  const passwordMatches =
    admin && (await bcrypt.compare(currentPassword, admin.passwordHash));

  if (!passwordMatches) {
    return response.status(401).json({ message: "Cari şifrə yanlışdır" });
  }

  admin.passwordHash = await bcrypt.hash(newPassword, 12);
  await admin.save();

  return response.json({ message: "Şifrə yeniləndi" });
});

export default router;
