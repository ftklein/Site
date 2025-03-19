import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

export default function DashboardPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token");

      const response = await apiRequest("GET", "/api/auth/user", undefined, {
        Authorization: `Bearer ${token}`
      });
      return response;
    },
    retry: false
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: { username: string; password: string }) => {
      const response = await apiRequest("POST", "/api/auth/login", credentials);
      if (response.token) {
        localStorage.setItem("token", response.token);
        queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
      }
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Login realizado",
        description: "Você está conectado ao dashboard.",
      });
    },
    onError: () => {
      toast({
        title: "Erro no login",
        description: "Usuário ou senha inválidos.",
        variant: "destructive"
      });
    }
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-card p-6 rounded-lg shadow">
          <h1 className="text-2xl font-bold mb-6">Login Dashboard</h1>
          <form onSubmit={(e) => {
            e.preventDefault();
            loginMutation.mutate({ username, password });
          }} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Usuário"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[#26333b]">Dashboard</h1>
          <Button onClick={() => {
            localStorage.removeItem("token");
            queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
          }}>
            Sair
          </Button>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Alterar Senha</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const currentPassword = formData.get("currentPassword") as string;
              const newPassword = formData.get("newPassword") as string;

              apiRequest("POST", "/api/auth/change-password", {
                currentPassword,
                newPassword
              }).then(() => {
                toast({
                  title: "Senha alterada",
                  description: "Sua senha foi alterada com sucesso.",
                });
                e.currentTarget.reset();
              }).catch(() => {
                toast({
                  title: "Erro",
                  description: "Senha atual incorreta.",
                  variant: "destructive"
                });
              });
            }} className="space-y-4">
              <div>
                <Input
                  type="password"
                  name="currentPassword"
                  placeholder="Senha Atual"
                  required
                />
              </div>
              <div>
                <Input
                  type="password"
                  name="newPassword"
                  placeholder="Nova Senha"
                  required
                />
              </div>
              <Button type="submit">
                Alterar Senha
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Páginas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/admin/pages/home">
                <Button variant="outline" className="w-full justify-start">
                  Página Inicial
                </Button>
              </Link>
              <Link href="/admin/pages/office">
                <Button variant="outline" className="w-full justify-start">
                  Escritório
                </Button>
              </Link>
              <Link href="/admin/pages/lawyer">
                <Button variant="outline" className="w-full justify-start">
                  Advogado
                </Button>
              </Link>
              <Link href="/admin/pages/practice-areas">
                <Button variant="outline" className="w-full justify-start">
                  Áreas de Atuação
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Artigos</CardTitle>
                <Link href="/admin/articles/new">
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Artigo
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/admin/articles">
                <Button variant="outline" className="w-full justify-start">
                  Gerenciar Artigos
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}