import type { MetadataRoute } from "next";

const BASE = "https://giantsoftech.com";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        { url: BASE, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
        { url: `${BASE}/services`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE}/work`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE}/team`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.8 },
    ];
}
