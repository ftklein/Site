import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, useParams } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { insertArticleSchema, type Article } from "@shared/schema";
import { slugify } from "@/lib/utils";

export default function ArticleEditorPage() {
  const [, setLocation] = useLocation();
  const params = useParams();
  const { toast } = useToast();
  const isEditing = Boolean(params.id);

  const { data: article } = useQuery<Article>({
    queryKey: [`/api/admin/articles/${params.id}`],
    enabled: isEditing,
  });

  const form = useForm({
    resolver: zodResolver(insertArticleSchema),
    defaultValues: {
      title: article?.title || "",
      content: article?.content || "",
      slug: article?.slug || "",
      published: article?.published || false,
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      if (isEditing) {
        return apiRequest("PATCH", `/api/admin/articles/${params.id}`, data);
      }
      return apiRequest("POST", "/api/admin/articles", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/articles"] });
      toast({
        title: isEditing ? "Artigo atualizado" : "Artigo criado",
        description: isEditing
          ? "As alterações foram salvas com sucesso."
          : "O artigo foi criado com sucesso.",
      });
      setLocation("/admin");
    },
  });

  function onSubmit(data: any) {
    if (!data.slug) {
      data.slug = slugify(data.title);
    }
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#26333b] mb-8">
          {isEditing ? "Editar Artigo" : "Novo Artigo"}
        </h1>

        <div className="bg-white rounded-lg shadow p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Título</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="artigo-slug" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conteúdo</FormLabel>
                    <FormControl>
                      <ReactQuill
                        theme="snow"
                        value={field.value}
                        onChange={field.onChange}
                        className="bg-white"
                        modules={{
                          toolbar: [
                            [{ header: [1, 2, 3, 4, 5, 6, false] }],
                            ["bold", "italic", "underline", "strike"],
                            [{ list: "ordered" }, { list: "bullet" }],
                            ["link", "blockquote"],
                            [{ align: [] }],
                            ["clean"],
                          ],
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="published"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between">
                    <FormLabel>Publicar artigo</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex justify-end gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/admin")}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="bg-[#26333b] hover:bg-[#1a242a]"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
