import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Admin from "../models/Admin.js";

dotenv.config();

const username = String(process.env.ADMIN_USERNAME || "admin")
  .trim()
  .toLowerCase();
const password = String(process.env.ADMIN_PASSWORD || "");

if (!password) {
  console.error("ADMIN_PASSWORD .env daxilində yazılmalıdır");
  process.exit(1);
}

await connectDB();

const passwordHash = await bcrypt.hash(password, 12);
await Admin.findOneAndUpdate(
  { username },
  { username, passwordHash },
  { upsert: true, new: true },
);

console.log(`Admin hazırdır: ${username}`);
process.exit(0);
