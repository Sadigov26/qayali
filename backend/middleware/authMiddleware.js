import jwt from "jsonwebtoken";

export function requireAdmin(request, response, next) {
  const authHeader = request.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice("Bearer ".length)
    : null;

  if (!token) {
    return response.status(401).json({ message: "Admin girişi tələb olunur" });
  }

  try {
    request.admin = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return response.status(401).json({ message: "Sessiya etibarsızdır" });
  }
}
