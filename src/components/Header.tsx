
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";

type NavLink = {
  title: string;
  href: string;
};

interface HeaderProps {
  navLinks?: NavLink[];
  logoUrl?: string;
  showAdminActions?: boolean;
  onLogout?: () => void;
}

export const Header = ({ navLinks = [], logoUrl, showAdminActions = false, onLogout }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const defaultNavLinks = [
    { title: 'INÍCIO', href: '#' },
    { title: 'SOBRE', href: '#sobre' },
    { title: 'EVENTOS', href: '#eventos' },
    { title: 'CONTATO', href: '#contato' }
  ];

  const linksToUse = navLinks.length > 0 ? navLinks : defaultNavLinks;

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="container-elegant">
        <div className="flex items-center justify-between py-8">
          {/* Logo */}
          <div className="flex items-center">
            {logoUrl ? (
              <img src={logoUrl} alt="Igreja Missionária Cristo Redentor" className="h-16 object-contain" />
            ) : (
              <div className="h-14 w-14 rounded-full bg-black flex items-center justify-center">
                <span className="text-lg font-bold text-white">IC</span>
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-12">
            {linksToUse.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="nav-elegant text-gray-800 hover:text-gray-600 transition-colors"
              >
                {link.title}
              </a>
            ))}
            {showAdminActions && onLogout && (
              <Button
                onClick={onLogout}
                className="button-elegant text-gray-800 hover:bg-gray-800 hover:text-white"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden py-8 border-t border-gray-100">
            <div className="flex flex-col space-y-6">
              {linksToUse.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="nav-elegant text-gray-800 hover:text-gray-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              {showAdminActions && onLogout && (
                <Button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="button-elegant text-gray-800 hover:bg-gray-800 hover:text-white w-fit"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
