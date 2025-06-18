
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

type NavLink = {
  title: string;
  href: string;
};

interface HeaderProps {
  navLinks?: NavLink[];
  logoUrl?: string;
}

export const Header = ({ navLinks = [], logoUrl }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-start">
        <Link to="/">
          {logoUrl && <img src={logoUrl} alt="Logo" className="h-16 w-16 sm:h-20 sm:w-20" />}
        </Link>
        <Button 
          variant="outline" 
          onClick={() => setMobileMenuOpen(true)} 
          className="rounded-full bg-white/90 text-primary hover:bg-white px-6 py-3 shadow-md"
        >
          <span>MENU</span>
          <Menu className="h-5 w-5 ml-2" />
        </Button>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center animate-in fade-in-0 duration-300">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:bg-white/10 hover:text-white" 
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-8 w-8" />
            <span className="sr-only">Fechar menu</span>
          </Button>
          <nav className="grid gap-8 text-center">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="text-2xl font-medium text-white transition-colors hover:text-primary uppercase tracking-wider"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};
