import type { MetadataRoute } from "next";
import { site } from "@/data/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `${site.name} — Bukya Naresh`,
        short_name: site.name,
        description:
            "Digital headquarters of Bukya Naresh — quantitative development through research, markets, data and engineering.",
        start_url: "/",
        display: "standalone",
        background_color: "#0a0a0c",
        theme_color: "#0a0a0c",
        icons: [
            { src: "/icon", sizes: "32x32", type: "image/png" },
            { src: "/apple-icon", sizes: "180x180", type: "image/png" },
        ],
    };
}
