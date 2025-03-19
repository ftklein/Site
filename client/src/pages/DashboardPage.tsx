import { useQuery, useMutation } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
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

export default function DashboardPage() {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const { data: user } = useQuery({
    queryKey: ["/api/auth/user"],
    retry: false,
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">Área Restrita</h1>
        <div>
          <script
            authed="location.reload()"
            src="https://auth.util.repl.co/script.js"
          ></script>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Administrativo</h1>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="bg-card p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Páginas do Site</h2>
          <div className="space-y-4">
            <Link href="/admin/home/edit">
              <Button className="w-full justify-start">
                <Pencil className="mr-2 h-4 w-4" />
                Editar Página Inicial
              </Button>
            </Link>
            <Link href="/admin/office/edit">
              <Button className="w-full justify-start">
                <Pencil className="mr-2 h-4 w-4" />
                Editar Página do Escritório
              </Button>
            </Link>
            <Link href="/admin/lawyer/edit">
              <Button className="w-full justify-start">
                <Pencil className="mr-2 h-4 w-4" />
                Editar Página do Advogado
              </Button>
            </Link>
            <Link href="/admin/areas/edit">
              <Button className="w-full justify-start">
                <Pencil className="mr-2 h-4 w-4" />
                Editar Áreas de Atuação
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}