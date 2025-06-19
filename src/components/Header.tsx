
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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
      <header className="fixed top-8 left-8 right-8 z-50 flex justify-between items-center">
        <Link to="/">
          <img 
            src="/lovable-uploads/52bb9865-eabf-4a7f-aee6-c64d183500e9.png" 
            alt="Logo Igreja Missionária do Cristo Redentor" 
            className="h-16 w-16 rounded-full object-cover shadow-lg bg-white p-2" 
          />
        </Link>
        
        <Button 
          variant="outline" 
          onClick={() => setMobileMenuOpen(true)} 
          className="rounded-full bg-white/95 backdrop-blur text-black hover:bg-white border-2 border-black px-8 py-3 font-medium tracking-wider"
        >
          <span className="mr-3">MENU</span>
          <div className="flex flex-col gap-1">
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-0.5 bg-black"></div>
            <div className="w-4 h-0.5 bg-black"></div>
          </div>
        </Button>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in-0 duration-300">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-8 right-8 text-white hover:bg-white/10 hover:text-white w-12 h-12" 
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
                className="text-3xl font-light text-white transition-colors hover:text-primary uppercase tracking-[0.2em]"
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
