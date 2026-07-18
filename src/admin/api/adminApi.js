const API_BASE_URL = import.meta.env.VITE_ADMIN_API_URL || "";
const TOKEN_KEY = "qayali-admin-token";

export function getAdminToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(TOKEN_KEY);
}

async function parseResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Sorğu tamamlanmadı");
  }

  return data;
}

export async function adminRequest(path, options = {}) {
  const token = getAdminToken();
  const headers = new Headers(options.headers);

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  if (options.body && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      "Serverlə əlaqə qurulmadı. İnternet bağlantısını və backend ünvanını yoxlayın.",
    );
  }

  return parseResponse(response);
}

export function loginAdmin(credentials) {
  return adminRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function changeAdminPassword(payload) {
  return adminRequest("/api/auth/password", {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function getProducts(page = 1, limit = 20, options = {}) {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (options.category && options.category !== "all") {
    params.set("category", options.category);
  }

  if (options.sort) {
    params.set("sort", options.sort);
  }

  return adminRequest(`/api/products?${params.toString()}`);
}

export function getProductStats() {
  return adminRequest("/api/products/stats");
}

export function createProduct(formData) {
  return adminRequest("/api/products", {
    method: "POST",
    body: formData,
  });
}

export function updateProduct(id, formData) {
  return adminRequest(`/api/products/${id}`, {
    method: "PUT",
    body: formData,
  });
}

export function deleteProduct(id) {
  return adminRequest(`/api/products/${id}`, {
    method: "DELETE",
  });
}
