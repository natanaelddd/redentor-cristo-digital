
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
      <div className="container-elegant section-padding">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 text-center md:text-left">
          
          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-center md:items-start space-y-8">
            <Link to="/" className="flex items-center gap-4">
              {siteContent.logo_url ? (
                <img src={siteContent.logo_url} alt="Logo" className="h-14 w-14 rounded-full object-cover" />
              ) : (
                <img src="/lovable-uploads/52bb9865-eabf-4a7f-aee6-c64d183500e9.png" alt="Logo" className="h-14 w-14 rounded-full object-cover" />
              )}
              <span className="font-heading font-light text-xl">
                {siteContent.footer_logo_text || 'Igreja Missionária\ndo Cristo Redentor'}
              </span>
            </Link>
            
            {/* Logo repetido */}
            <div className="opacity-20 scale-75">
              {siteContent.logo_url ? (
                <img src={siteContent.logo_url} alt="Logo" className="h-14 w-14 rounded-full object-cover" />
              ) : (
                <img src="/lovable-uploads/52bb9865-eabf-4a7f-aee6-c64d183500e9.png" alt="Logo" className="h-14 w-14 rounded-full object-cover" />
              )}
            </div>
            
            <p className="text-elegant text-gray-400">
              {siteContent.footer_about_text || 'Um lugar de fé, esperança e amor no coração do bairro Cristo Redentor em Ribeirão Preto.'}
            </p>
          </div>

          {/* Column 2: Links */}
          <div className="space-y-8">
            <h3 className="font-heading font-light text-lg tracking-wider">Links Rápidos</h3>
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a 
                  key={link.title} 
                  href={link.href} 
                  className="nav-elegant text-gray-400 hover:text-white transition-colors"
                >
                  {link.title}
                </a>
              ))}
            </nav>
          </div>

          {/* Column 3: Contact */}
          <div className="space-y-8">
            <h3 className="font-heading font-light text-lg tracking-wider">Contato</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4 justify-center md:justify-start">
                <MapPin className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                <p className="text-elegant text-gray-400">
                  Av. Pedro Abrahão Alem Neto, 520<br />
                  Cristo Redentor, Ribeirão Preto - SP
                </p>
              </div>
            </div>
          </div>

          {/* Column 4: Social */}
          <div className="space-y-8">
            <h3 className="font-heading font-light text-lg tracking-wider">Redes Sociais</h3>
            <div className="flex gap-6 justify-center md:justify-start">
              <a 
                href={siteContent.footer_instagram_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Instagram className="h-7 w-7" />
                <span className="sr-only">Instagram</span>
              </a>
              <a 
                href={siteContent.footer_facebook_url || '#'} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <Facebook className="h-7 w-7" />
                <span className="sr-only">Facebook</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-20 pt-12 text-center">
          <p className="text-elegant text-gray-400">
            &copy; {new Date().getFullYear()} Igreja Missionária do Cristo Redentor. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
