
import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

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
      localStorage.setItem("token", response.token);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
        <Button onClick={() => {
          localStorage.removeItem("token");
          queryClient.invalidateQueries({ queryKey: ["/api/auth/user"] });
        }}>
          Sair
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Páginas do Site</h2>
          <div className="space-y-4">
            <Button className="w-full justify-start">
              Editar Página Inicial
            </Button>
            <Button className="w-full justify-start">
              Editar Página do Escritório
            </Button>
            <Button className="w-full justify-start">
              Editar Página do Advogado
            </Button>
            <Button className="w-full justify-start">
              Editar Áreas de Atuação
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
