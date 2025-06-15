
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <img src="/lovable-uploads/510dc53b-a62d-4953-9368-b33e0abc2d6d.png" alt="Logo" className="h-8 w-8" />
                <span className="font-bold">Igreja Missionária Cristo Redentor</span>
            </Link>
            <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-4">
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
    </footer>
  );
};
