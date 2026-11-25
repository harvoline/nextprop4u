import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NextProp4U - Muhammad Norafif | Ejen Hartanah Setapak & KL",
    short_name: "NextProp4U",
    description:
      "Perunding Berdaftar Maxxan Realty untuk khidmat jual, beli dan sewa rumah di Setapak, Kuala Lumpur dan seluruh Selangor.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f6f0",
    theme_color: "#ea580c",
    icons: [
      {
        src: "/images/please_follow_my_picture_and_3de36cdc_2K.jpg",
        sizes: "192x192 512x512",
        type: "image/jpeg",
      },
    ],
  };
}
