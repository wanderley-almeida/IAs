import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services, getServicePath } from "@/content/services";
import { news } from "@/content/news";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/sobre",
    "/sobre/historia",
    "/sobre/tabelia",
    "/sobre/equipe",
    "/servicos",
    "/servicos/notas",
    "/servicos/protesto",
    "/faq",
    "/noticias",
    "/transparencia",
    "/privacidade",
    "/lgpd",
    "/contato",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "" ? 1 : 0.8,
    })),
    ...services.map((service) => ({
      url: `${site.url}${getServicePath(service)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...news.map((article) => ({
      url: `${site.url}/noticias/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
