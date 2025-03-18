import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Article } from "@shared/schema";

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-[#26333b] line-clamp-2">
          <Link href={`/artigos/${article.slug}`}>
            <a className="hover:text-[#b28723] transition-colors">
              {article.title}
            </a>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div
          className="text-gray-600 line-clamp-4"
          dangerouslySetInnerHTML={{
            __html: article.content.slice(0, 200) + "...",
          }}
        />
        <div className="mt-4 text-sm text-gray-500">
          {article.publishedAt &&
            new Date(article.publishedAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
        </div>
      </CardContent>
    </Card>
  );
}
