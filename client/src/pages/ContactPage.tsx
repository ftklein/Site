import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  message: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
    form.reset();
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#26333b] mb-4">Contato</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Entre em contato conosco para agendar uma consulta
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input placeholder="Seu nome completo" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input placeholder="(00) 00000-0000" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mensagem</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Descreva seu caso"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button 
                  type="submit"
                  className="w-full bg-[#26333b] hover:bg-[#1a242a]"
                >
                  Enviar Mensagem
                </Button>
              </form>
            </Form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex items-start gap-4">
              <div className="bg-[#26333b] p-3 rounded-lg">
                <MapPin className="w-6 h-6 text-[#b28723]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#26333b] mb-2">
                  Endereço
                </h3>
                <p className="text-gray-600">
                  Av. Principal, 1000<br />
                  Centro, Cidade - Estado<br />
                  CEP: 00000-000
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#26333b] p-3 rounded-lg">
                <Phone className="w-6 h-6 text-[#b28723]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#26333b] mb-2">
                  Telefone
                </h3>
                <p className="text-gray-600">
                  (00) 0000-0000<br />
                  (00) 00000-0000
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-[#26333b] p-3 rounded-lg">
                <Mail className="w-6 h-6 text-[#b28723]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#26333b] mb-2">
                  Email
                </h3>
                <p className="text-gray-600">
                  contato@fkadvocacia.com.br
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
