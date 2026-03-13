import type { Metadata } from "next";
import { getBlogPostsAdmin } from "@/services/blog";
import { Badge } from "@/components/ui/badge";
import { PageHeader } from "@/components/ui/page-header";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

export const metadata: Metadata = { title: "Blog" };

export default async function BlogPage() {
  const posts = await getBlogPostsAdmin();

  return (
    <div>
      <PageHeader title="Blog" />

      <Card>
        {posts.length === 0 ? (
          <EmptyState message="No hay posts creados" />
        ) : (
          <div className="divide-y divide-slate-800">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between p-6"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">{post.title}</span>
                  <span className="text-sm text-slate-500">
                    por {post.author.name}
                    {post.publishedAt &&
                      ` · ${new Date(post.publishedAt).toLocaleDateString("es-AR")}`}
                  </span>
                </div>
                <Badge color={post.published ? "green" : "slate"}>
                  {post.published ? "Publicado" : "Borrador"}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
