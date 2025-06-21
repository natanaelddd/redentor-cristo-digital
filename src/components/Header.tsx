
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
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-8">
        <div className="flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-12 w-12 rounded-full object-cover" />
            ) : (
              <div className="h-12 w-12 rounded-full bg-black flex items-center justify-center">
                <span className="text-lg font-bold text-white">IC</span>
              </div>
            )}
            <div className="font-bold text-lg font-heading">
              Igreja Missionária<br />
              <span className="text-sm">do Cristo Redentor</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {linksToUse.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-sm font-medium tracking-[0.1em] hover:text-gray-600 transition-colors"
              >
                {link.title}
              </a>
            ))}
            {!showAdminActions && (
              <a
                href="/admin"
                className="text-sm font-medium tracking-[0.1em] hover:text-gray-600 transition-colors"
              >
                ADMIN
              </a>
            )}
            {showAdminActions && onLogout && (
              <Button
                onClick={onLogout}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
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
          <nav className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              {linksToUse.map((link) => (
                <a
                  key={link.title}
                  href={link.href}
                  className="text-sm font-medium tracking-[0.1em] hover:text-gray-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              ))}
              {!showAdminActions && (
                <a
                  href="/admin"
                  className="text-sm font-medium tracking-[0.1em] hover:text-gray-600 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ADMIN
                </a>
              )}
              {showAdminActions && onLogout && (
                <Button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 w-fit"
                >
                  <LogOut className="h-4 w-4" />
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
