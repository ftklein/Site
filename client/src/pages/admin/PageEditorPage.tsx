
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { apiRequest } from "@/lib/queryClient";

export default function PageEditorPage() {
  const [location] = useLocation();
  const { toast } = useToast();
  const [content, setContent] = useState("");
  const pageName = location.split("/").pop();

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await apiRequest("GET", `/api/admin/pages/${pageName}`);
        setContent(response.content);
      } catch (error) {
        toast({
          title: "Erro",
          description: "Erro ao carregar conteúdo da página",
        });
      }
    };
    fetchContent();
  }, [pageName]);

  const handleSave = async () => {
    try {
      await apiRequest("PUT", `/api/admin/pages/${pageName}`, { content });
      toast({
        title: "Sucesso",
        description: "Página atualizada com sucesso",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao salvar página",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Editor de Página - {pageName}</CardTitle>
        </CardHeader>
        <CardContent>
          <ReactQuill 
            value={content} 
            onChange={setContent}
            className="h-[400px] mb-4"
          />
          <Button onClick={handleSave}>Salvar</Button>
        </CardContent>
      </Card>
    </div>
  );
}
