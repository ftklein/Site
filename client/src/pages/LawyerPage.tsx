import { motion } from "framer-motion";
import { Award, BookOpen, History, Users } from "lucide-react";

export default function LawyerPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden bg-[#26333b] flex items-center justify-center">
            <span className="text-6xl text-[#b28723]">FK</span>
          </div>
          <h1 className="text-4xl font-bold text-[#26333b] mb-4">
            Dr. Felipe Klein
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Advogado Especialista em Direito Penal, Família e Consumidor
          </p>
        </motion.div>

        {/* Experience & Education */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#26333b] mb-6 flex items-center gap-2">
              <History className="text-[#b28723]" />
              Experiência Profissional
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-semibold">Sócio-Fundador - FK Advocacia</h3>
                <p className="text-gray-600">2015 - Presente</p>
              </li>
              <li>
                <h3 className="font-semibold">Advogado Associado</h3>
                <p className="text-gray-600">2010 - 2015</p>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-bold text-[#26333b] mb-6 flex items-center gap-2">
              <BookOpen className="text-[#b28723]" />
              Formação Acadêmica
            </h2>
            <ul className="space-y-4">
              <li>
                <h3 className="font-semibold">Especialização em Direito Penal</h3>
                <p className="text-gray-600">Universidade Federal - 2012</p>
              </li>
              <li>
                <h3 className="font-semibold">Bacharel em Direito</h3>
                <p className="text-gray-600">Universidade Federal - 2009</p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: <Award className="w-8 h-8" />,
              title: "Premiações",
              description: "Reconhecido pela excelência em advocacia"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Clientes Atendidos",
              description: "Mais de 1000 casos solucionados"
            },
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Publicações",
              description: "Autor de artigos jurídicos relevantes"
            }
          ].map((achievement, index) => (
            <div
              key={index}
              className="text-center p-6 bg-gray-50 rounded-lg"
            >
              <div className="text-[#b28723] mb-4 flex justify-center">
                {achievement.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#26333b] mb-2">
                {achievement.title}
              </h3>
              <p className="text-gray-600">
                {achievement.description}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
