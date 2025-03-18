import { motion } from "framer-motion";
import { ArrowRight, Award, Gavel, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#26333b] text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Excelência e Comprometimento em Advocacia
            </h1>
            <p className="text-lg md:text-xl mb-8 text-[#d5d0d2]">
              Soluções jurídicas especializadas em Direito Penal, Família e Consumidor
            </p>
            <Button asChild size="lg" className="bg-[#b28723] hover:bg-[#96721d]">
              <Link href="/contato">
                <a className="flex items-center gap-2">
                  Agende uma Consulta <ArrowRight className="w-4 h-4" />
                </a>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Areas of Practice */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#26333b]">
            Áreas de Atuação
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Scale className="w-8 h-8" />,
                title: "Direito Penal",
                description: "Defesa criminal especializada com foco na proteção dos seus direitos."
              },
              {
                icon: <Gavel className="w-8 h-8" />,
                title: "Direito de Família",
                description: "Suporte jurídico humanizado para questões familiares."
              },
              {
                icon: <Award className="w-8 h-8" />,
                title: "Direito do Consumidor",
                description: "Proteção aos seus direitos nas relações de consumo."
              }
            ].map((area, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="mb-4 text-[#b28723] flex justify-center">
                  {area.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#26333b]">
                  {area.title}
                </h3>
                <p className="text-gray-600">
                  {area.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#26333b] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Precisa de Assessoria Jurídica?
          </h2>
          <p className="text-lg mb-8 text-[#d5d0d2]">
            Entre em contato para uma avaliação personalizada do seu caso
          </p>
          <Button asChild variant="outline" size="lg" className="border-[#b28723] text-[#b28723] hover:bg-[#b28723] hover:text-white">
            <Link href="/contato">Fale Conosco</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}