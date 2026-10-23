import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rays of Wisdom Society",
    short_name: "Rays of Wisdom",
    description: "The wisdom behind ancient rituals and practices. New Delhi.",
    start_url: "/",
    display: "standalone",
    background_color: "#f6efe0",
    theme_color: "#f6efe0",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
