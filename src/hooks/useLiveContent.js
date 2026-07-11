import { useEffect, useState } from "react";
import { products as fallbackProducts } from "../data/products";
import {
  instagramPosts as fallbackPosts,
  instagramComments as fallbackComments,
} from "../data/media";

export function useLiveContent() {
  const [content, setContent] = useState({
    products: fallbackProducts,
    posts: fallbackPosts.filter((post) => post.type === "p").slice(0, 12),
    comments: fallbackComments,
    live: false,
  });
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/content", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : Promise.reject()))
      .then(setContent)
      .catch(() => {});
    return () => controller.abort();
  }, []);
  return { ...content, posts: content.posts.filter((post) => post.type === "p" || post.type === "IMAGE" || post.type === "CAROUSEL_ALBUM").slice(0, 12) };
}
