import type { MetadataRoute } from "next";
import { getPortfolioData } from "@/data/portfolio";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getPortfolioData();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date("2026-09-14T00:00:00.000Z"),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        absoluteUrl(data.profile.portraitPath),
        ...data.photos.map((photo) => absoluteUrl(photo.src)),
      ],
    },
    ...data.posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: post.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}

