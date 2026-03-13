import "server-only";
import { serverApi } from "@/lib/server-api";
import type { BlogPost } from "@/types";

export function getBlogPostsAdmin() {
  return serverApi.get<BlogPost[]>("/blog/admin");
}

export function getBlogPost(slug: string) {
  return serverApi.get<BlogPost>(`/blog/${slug}`);
}
