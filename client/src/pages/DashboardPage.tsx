
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Article } from "@shared/schema";

export default function DashboardPage() {
  const { toast } = useToast();
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/admin/articles"],
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/admin/articles/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/articles"] });
      toast({
        title: "Artigo excluído",
        description: "O artigo foi excluído com sucesso.",
      });
    },
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Artigo
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-card p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-2">Total de Artigos</h3>
          <p className="text-3xl font-bold">{articles?.length || 0}</p>
          <Badge variant="secondary" className="mt-2">Publicados</Badge>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow">
        <h2 className="text-xl font-bold mb-4">Gerenciar Artigos</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Título</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles?.map((article) => (
              <TableRow key={article.id}>
                <TableCell>{article.title}</TableCell>
                <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="space-x-2">
                  <Link href={`/admin/articles/${article.id}/edit`}>
                    <Button variant="outline" size="sm">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Excluir artigo</AlertDialogTitle>
                        <AlertDialogDescription>
                          Tem certeza que deseja excluir este artigo? Esta ação não pode ser desfeita.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancelar</AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteMutation.mutate(article.id)}>
                          Confirmar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
