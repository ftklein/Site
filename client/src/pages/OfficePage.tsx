import { motion } from "framer-motion";
import { Building2, Users, Target, Clock } from "lucide-react";

export default function OfficePage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#26333b] mb-4">O Escritório</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprometidos com a excelência jurídica e a satisfação dos nossos clientes
          </p>
        </motion.div>

        {/* Mission and Values */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#26333b] mb-4">Nossa Missão</h2>
            <p className="text-gray-600">
              Proporcionar soluções jurídicas eficientes e personalizadas, defendendo os interesses 
              de nossos clientes com ética, profissionalismo e dedicação integral.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#26333b] mb-4">Nossa Visão</h2>
            <p className="text-gray-600">
              Ser referência em advocacia especializada, reconhecidos pela excelência no atendimento 
              e pela busca constante da justiça e dos direitos de nossos clientes.
            </p>
          </motion.div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              icon: <Building2 className="w-8 h-8" />,
              title: "Estrutura Moderna",
              description: "Ambiente preparado para atender com conforto e privacidade"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Equipe Qualificada",
              description: "Profissionais especializados e em constante atualização"
            },
            {
              icon: <Target className="w-8 h-8" />,
              title: "Foco no Cliente",
              description: "Atendimento personalizado e dedicação aos casos"
            },
            {
              icon: <Clock className="w-8 h-8" />,
              title: "Agilidade",
              description: "Respostas rápidas e acompanhamento constante"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <div className="text-[#b28723] mb-4 flex justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#26333b] mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
