
import { Link } from "react-router-dom";
import { Instagram, Facebook } from "lucide-react";

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
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Column 1: Logo & About */}
          <div className="flex flex-col items-center md:items-start">
            <Link to="/" className="flex items-center gap-2 mb-4">
              {siteContent.logo_url && <img src={siteContent.logo_url} alt="Logo" className="h-10 w-10" />}
              <span className="font-bold text-lg font-heading">{siteContent.footer_logo_text || 'Igreja Missionária Cristo Redentor'}</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              {siteContent.footer_about_text || 'Um lugar de fé, esperança e amor no coração de Ribeirão Preto.'}
            </p>
          </div>

          {/* Column 2: Links */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider font-heading">Links</h3>
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a key={link.title} href={link.href} className="text-muted-foreground hover:text-primary">{link.title}</a>
              ))}
            </nav>
          </div>

          {/* Column 3: Social */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wider font-heading">Siga-nos</h3>
            <div className="flex gap-4 justify-center md:justify-start">
              <a href={siteContent.footer_instagram_url || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href={siteContent.footer_facebook_url || '#'} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
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
