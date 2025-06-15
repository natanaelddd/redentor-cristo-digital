
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Início", href: "#" },
  { title: "Sobre Nós", href: "#sobre" },
  { title: "Nossos Cultos", href: "#eventos" },
  { title: "Contato", href: "#contato" },
];

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-transparent backdrop-blur-sm supports-[backdrop-filter]:bg-transparent/60 absolute">
      <div className="container mx-auto flex h-24 items-center justify-between px-4 relative">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/510dc53b-a62d-4953-9368-b33e0abc2d6d.png" alt="Logo" className="h-12 w-12" />
        </Link>

        {/* Menu Trigger */}
        <div className="flex">
          <Button 
            variant="outline" 
            onClick={() => setMobileMenuOpen(true)} 
            className="rounded-full bg-white/90 text-primary hover:bg-white px-6 py-2 shadow-sm"
          >
            <span>MENU</span>
            <Menu className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center animate-in fade-in-0 duration-300">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 right-4 text-white hover:bg-white/10 hover:text-white" 
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
    </header>
  );
};
