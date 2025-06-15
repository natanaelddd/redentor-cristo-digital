
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 relative">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/510dc53b-a62d-4953-9368-b33e0abc2d6d.png" alt="Logo" className="h-10 w-10" />
          <span className="font-bold hidden sm:inline-block font-heading">Igreja Missionária Cristo Redentor</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a 
              key={link.title} 
              href={link.href} 
              className="relative group text-sm font-medium text-muted-foreground transition-colors hover:text-primary uppercase tracking-wider"
            >
              {link.title}
              <span className="absolute bottom-[-2px] left-0 w-full h-[1px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
            </a>
          ))}
        </nav>

        {/* Mobile Navigation Trigger */}
        <div className="md:hidden">
          <Button variant="outline" size="icon" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Abrir menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center md:hidden animate-in fade-in-0 duration-300">
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
