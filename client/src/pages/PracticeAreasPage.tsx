import { motion } from "framer-motion";
import PracticeAreaCard from "@/components/PracticeAreaCard";
import { Scale, Users, ShoppingCart } from "lucide-react";

const practiceAreas = [
  {
    icon: <Scale className="w-12 h-12" />,
    title: "Direito Penal",
    description: "Atuação especializada em defesa criminal, incluindo:",
    items: [
      "Defesa em processos criminais",
      "Habeas Corpus",
      "Recursos criminais",
      "Execução penal",
      "Medidas cautelares"
    ]
  },
  {
    icon: <Users className="w-12 h-12" />,
    title: "Direito de Família",
    description: "Assessoria completa em questões familiares:",
    items: [
      "Divórcio e separação",
      "Guarda e alimentos",
      "Inventário e testamentos",
      "União estável",
      "Adoção"
    ]
  },
  {
    icon: <ShoppingCart className="w-12 h-12" />,
    title: "Direito do Consumidor",
    description: "Proteção aos direitos do consumidor em:",
    items: [
      "Problemas com produtos e serviços",
      "Cobranças indevidas",
      "Contratos abusivos",
      "Negativação indevida",
      "Danos morais"
    ]
  }
];

export default function PracticeAreasPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-[#26333b] mb-4">
            Áreas de Atuação
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Oferecemos serviços jurídicos especializados nas seguintes áreas
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {practiceAreas.map((area, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <PracticeAreaCard
                icon={area.icon}
                title={area.title}
                description={area.description}
                items={area.items}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
