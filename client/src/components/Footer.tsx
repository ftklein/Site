import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#26333b] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">FK Advocacia</h3>
            <p className="text-gray-300">
              Comprometidos com a excelência e a defesa dos seus direitos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              {[
                { name: "Início", href: "/" },
                { name: "O Escritório", href: "/escritorio" },
                { name: "O Advogado", href: "/advogado" },
                { name: "Áreas de Atuação", href: "/areas-atuacao" },
              ].map((link) => (
                <li key={link.name}>
                  <Link href={link.href}>
                    <a className="text-gray-300 hover:text-[#b28723] transition-colors">
                      {link.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <address className="text-gray-300 not-italic">
              <p>Av. Principal, 1000</p>
              <p>Centro, Cidade - Estado</p>
              <p>CEP: 00000-000</p>
              <p className="mt-2">(00) 0000-0000</p>
              <p>contato@fkadvocacia.com.br</p>
            </address>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-300 hover:text-[#b28723] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#b28723] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-[#b28723] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            © {new Date().getFullYear()} FK Advocacia. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
