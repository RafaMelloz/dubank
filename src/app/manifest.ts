import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DuBank",
    short_name: "DuBank",
    description: "Controle de finanças pessoal",
    start_url: "/",
    display: "standalone",
    background_color: "#a5f3fc",
    theme_color: "#a5f3fc",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}