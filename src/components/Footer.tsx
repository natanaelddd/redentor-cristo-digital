
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src="/lovable-uploads/510dc53b-a62d-4953-9368-b33e0abc2d6d.png" alt="Logo" className="h-10 w-10" />
              <span className="font-bold text-lg font-heading">Igreja Missionária Cristo Redentor</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Um lugar de fé, esperança e amor no coração de Ribeirão Preto.
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider font-heading">Links</h3>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-muted-foreground hover:text-primary">Início</a>
              <a href="#sobre" className="text-muted-foreground hover:text-primary">Sobre Nós</a>
              <a href="#eventos" className="text-muted-foreground hover:text-primary">Nossos Cultos</a>
              <a href="#contato" className="text-muted-foreground hover:text-primary">Contato</a>
            </nav>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider font-heading">Siga-nos</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href="https://www.instagram.com/igrejamissionariacr/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://www.facebook.com/rede.adolescentes/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Igreja Missionária Cristo Redentor. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
