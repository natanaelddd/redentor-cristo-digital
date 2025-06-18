
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

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
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 p-4 sm:p-6 flex justify-between items-center">
        <Link to="/" className="z-50">
          {logoUrl && <img src={logoUrl} alt="Logo" className="h-16 w-16 sm:h-20 sm:w-20" />}
        </Link>
        
        {/* Menu Button with corner bars design */}
        <Button 
          variant="ghost" 
          onClick={() => setMobileMenuOpen(true)} 
          className="relative w-12 h-12 p-0 hover:bg-white/10 group z-50"
        >
          <div className="relative w-6 h-6">
            {/* Top left corner */}
            <div className="absolute top-0 left-0 w-3 h-0.5 bg-white group-hover:bg-primary transition-colors"></div>
            <div className="absolute top-0 left-0 w-0.5 h-3 bg-white group-hover:bg-primary transition-colors"></div>
            
            {/* Top right corner */}
            <div className="absolute top-0 right-0 w-3 h-0.5 bg-white group-hover:bg-primary transition-colors"></div>
            <div className="absolute top-0 right-0 w-0.5 h-3 bg-white group-hover:bg-primary transition-colors"></div>
            
            {/* Bottom left corner */}
            <div className="absolute bottom-0 left-0 w-3 h-0.5 bg-white group-hover:bg-primary transition-colors"></div>
            <div className="absolute bottom-0 left-0 w-0.5 h-3 bg-white group-hover:bg-primary transition-colors"></div>
            
            {/* Bottom right corner */}
            <div className="absolute bottom-0 right-0 w-3 h-0.5 bg-white group-hover:bg-primary transition-colors"></div>
            <div className="absolute bottom-0 right-0 w-0.5 h-3 bg-white group-hover:bg-primary transition-colors"></div>
          </div>
          <span className="sr-only">Menu</span>
        </Button>
      </header>

      {/* Sunday Services Bar */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-black/90 text-white py-2 px-4">
        <div className="container mx-auto flex justify-center items-center">
          <div className="text-center">
            <span className="text-sm font-medium">CULTO DE DOMINGO</span>
            <span className="mx-4 text-primary">•</span>
            <span className="text-sm">19:00h</span>
            <span className="mx-4 text-primary">•</span>
            <span className="text-sm">Av. Pedro Abrahão Alem Neto, 520</span>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center animate-in fade-in-0 duration-300">
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
                className="text-3xl font-light text-white transition-colors hover:text-primary uppercase tracking-[0.2em]"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.title}
              </a>
            ))}
            {!loading && (
              session ? (
                <>
                  <Link
                    to="/admin"
                    className="text-3xl font-light text-white transition-colors hover:text-primary uppercase tracking-[0.2em]"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-3xl font-light text-white transition-colors hover:text-primary uppercase tracking-[0.2em] flex items-center justify-center"
                  >
                    <LogOut className="h-6 w-6 mr-2" />
                    Sair
                  </button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-3xl font-light text-white transition-colors hover:text-primary uppercase tracking-[0.2em]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin
                </Link>
              )
            )}
          </nav>
        </div>
      )}
    </>
  );
};
