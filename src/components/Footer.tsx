
import { Link } from "react-router-dom";
import { Instagram, Facebook, MapPin, Phone } from "lucide-react";

type NavLink = {
  title: string;
  href: string;
};

type SiteContent = {
  [key: string]: string | undefined;
};

interface FooterProps {
  navLinks?: NavLink[];
  siteContent?: SiteContent;
}

export const Footer = ({ navLinks = [], siteContent = {} }: FooterProps) => {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
          
          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-3 mb-6">
              {siteContent.logo_url ? (
                <img src={siteContent.logo_url} alt="Logo" className="h-12 w-12 rounded-full object-cover" />
              ) : (
                <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
                  <span className="text-lg font-bold text-black">IC</span>
                </div>
              )}
              <span className="font-bold text-lg font-heading">
                {siteContent.footer_logo_text || 'Igreja Missionária\ndo Cristo Redentor'}
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed">
              {siteContent.footer_about_text || 'Um lugar de fé, esperança e amor no coração do bairro Cristo Redentor em Ribeirão Preto.'}
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold mb-6 uppercase tracking-[0.2em] font-heading text-sm">Links Rápidos</h3>
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a 
                  key={link.title} 
                  href={link.href} 
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="font-bold mb-6 uppercase tracking-[0.2em] font-heading text-sm">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 justify-center md:justify-start">
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-400 leading-relaxed">
                  Av. Pedro Abrahão Alem Neto, 520<br />
                  Cristo Redentor, Ribeirão Preto - SP
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Social */}
          <div>
            <h3 className="font-bold mb-6 uppercase tracking-[0.2em] font-heading text-sm">Redes Sociais</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a 
                href={siteContent.footer_instagram_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href={siteContent.footer_facebook_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Igreja Missionária do Cristo Redentor. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
