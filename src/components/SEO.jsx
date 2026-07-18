import { useEffect } from "react";

const siteName = "Qayalı Sport";
const defaultTitle = "Qayalı Sport | İdman geyimləri və fitness avadanlığı";
const defaultDescription =
  "Qayalı Sport — idman geyimləri və fitness avadanlığı. Sumqayıt şəhəri, 9-cu mikrorayon.";

function setMeta(selectorName, content, attribute = "name") {
  if (!content) {
    return;
  }

  let tag = document.head.querySelector(`meta[${attribute}="${selectorName}"]`);

  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, selectorName);
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
}

export default function SEO({
  title,
  description = defaultDescription,
  image,
  type = "website",
}) {
  useEffect(() => {
    const pageTitle = title ? `${title} | ${siteName}` : defaultTitle;

    document.title = pageTitle;

    setMeta("description", description);
    setMeta("og:site_name", siteName, "property");
    setMeta("og:title", pageTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("twitter:card", image ? "summary_large_image" : "summary");
    setMeta("twitter:title", pageTitle);
    setMeta("twitter:description", description);

    if (typeof window !== "undefined") {
      setMeta("og:url", window.location.href, "property");
    }

    if (image) {
      setMeta("og:image", image, "property");
      setMeta("twitter:image", image);
    }
  }, [description, image, title, type]);

  return null;
}
