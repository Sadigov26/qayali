import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const configDir = path.dirname(fileURLToPath(import.meta.url));
const backendEnvPath = path.resolve(configDir, "..", ".env");

dotenv.config({ path: backendEnvPath });
dotenv.config();
