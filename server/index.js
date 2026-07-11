/* global process */
import express from "express";
import * as cheerio from "cheerio";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { products as fallbackProducts } from "../src/data/products.js";
import { instagramPosts as fallbackPosts, instagramComments as fallbackComments } from "../src/data/media.js";

const app = express();
const port = process.env.PORT || 8787;
const cache = new Map();
const CACHE_MS = 15 * 60 * 1000;
const bannedCommentTerms = /qiym[əe]t|neç[əe]dir|endirim|təklif|çatdırılma|ünvan|wp|whatsapp|kredit|taksit|almaq|satış|sifariş/i;
const positiveSignals = /🔥|👏|😍|❤️|👍|🙌|qəşə|əla|super|keyfiyyət|gözəl|möhtəşəm|bəyəndim|zövq/i;

const cached = async (key, loader) => {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.time < CACHE_MS) return hit.data;
  const data = await loader();
  cache.set(key, { time: Date.now(), data });
  return data;
};

async function getBirmarketProducts() {
  return cached("products", async () => {
    const response = await fetch("https://birmarket.az/merchant/9215-qayali-sport", { headers: { "user-agent": "Mozilla/5.0 QayaliSportWebsite/1.0" } });
    if (!response.ok) throw new Error(`Birmarket ${response.status}`);
    const $ = cheerio.load(await response.text());
    const found = [];
    $('a[href*="/product/"]').each((_, element) => {
      const link = $(element);
      const href = new URL(link.attr("href"), "https://birmarket.az").href;
      const image = link.find("img").first().attr("src") || link.find("img").first().attr("data-src");
      const text = link.text().replace(/\s+/g, " ").trim();
      const price = text.match(/\d+[.,]\d{2}\s*₼/)?.[0];
      const name = text.replace(price || "", "").trim();
      if (image && price && name && !found.some((item) => item.source === href)) found.push({ id: found.length + 1, name, category: "fitness", detail: "Qayalı Sport · Birmarket", weight: name.match(/\d+(?:[.,]\d+)?\s*kq/i)?.[0] || "", price, image, source: href });
    });
    return found.length ? found : fallbackProducts;
  });
}

async function getInstagram() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  if (!token || !userId) return cached("instagram-public", async () => {
    const photos = fallbackPosts.filter((post) => post.type === "p").slice(0, 12);
    const posts = await Promise.all(photos.map(async (post) => {
      try { const response = await fetch(post.url, { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126 Safari/537.36" } }); const $ = cheerio.load(await response.text()); return { ...post, image: $('meta[property="og:image"]').attr("content") || post.image, label: $('meta[property="og:description"]').attr("content")?.split(": ")[1]?.slice(0, 80) || post.label }; }
      catch { return post; }
    }));
    return { posts, comments: fallbackComments, live: false };
  });
  return cached("instagram", async () => {
    const mediaUrl = new URL(`https://graph.facebook.com/v23.0/${userId}/media`);
    mediaUrl.searchParams.set("fields", "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp");
    mediaUrl.searchParams.set("limit", "30");
    mediaUrl.searchParams.set("access_token", token);
    const mediaResponse = await fetch(mediaUrl);
    if (!mediaResponse.ok) throw new Error(`Instagram media ${mediaResponse.status}`);
    const media = (await mediaResponse.json()).data || [];
    const comments = [];
    for (const item of media.slice(0, 6)) {
      const commentsUrl = new URL(`https://graph.facebook.com/v23.0/${item.id}/comments`);
      commentsUrl.searchParams.set("fields", "username,text,timestamp");
      commentsUrl.searchParams.set("limit", "50");
      commentsUrl.searchParams.set("access_token", token);
      const response = await fetch(commentsUrl);
      if (!response.ok) continue;
      const rows = (await response.json()).data || [];
      rows.filter((comment) => !bannedCommentTerms.test(comment.text) && positiveSignals.test(comment.text)).forEach((comment) => comments.push({ username: comment.username, text: comment.text, postUrl: item.permalink }));
    }
    const posts = media.filter((item) => item.media_type === "IMAGE" || item.media_type === "CAROUSEL_ALBUM").slice(0, 12).map((item) => ({ id: item.id, url: item.permalink, image: item.media_url, label: item.caption?.split("\n")[0]?.slice(0, 80) || "Qayalı Sport", date: new Date(item.timestamp).toLocaleDateString("az-AZ"), type: item.media_type }));
    return { posts, comments: comments.slice(0, 12), live: true };
  });
}

app.get("/api/content", async (_request, response) => {
  try { const [products, instagram] = await Promise.all([getBirmarketProducts().catch(() => fallbackProducts), getInstagram().catch(() => ({ posts: fallbackPosts, comments: fallbackComments, live: false }))]); response.json({ products, ...instagram, updatedAt: new Date().toISOString() }); }
  catch { response.status(500).json({ error: "Məlumatlar yenilənə bilmədi" }); }
});

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
app.use(express.static(path.join(root, "dist")));
app.get("/{*splat}", (_request, response) => response.sendFile(path.join(root, "dist", "index.html")));
app.listen(port, () => console.log(`Qayalı API http://localhost:${port}`));
