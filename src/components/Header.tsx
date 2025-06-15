
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger, DrawerClose } from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";

const navLinks = [
  { title: "Início", href: "#" },
  { title: "Sobre", href: "#sobre" },
  { title: "Eventos", href: "#eventos" },
  { title: "Contato", href: "#contato" },
];

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src="/lovable-uploads/510dc53b-a62d-4953-9368-b33e0abc2d6d.png" alt="Logo" className="h-10 w-10" />
          <span className="font-bold hidden sm:inline-block">Igreja Missionária Cristo Redentor</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navLinks.map((link) => (
            <a key={link.title} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              {link.title}
            </a>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </DrawerTrigger>
            <DrawerContent>
                <div className="p-4 mt-4">
                    <div className="flex justify-end items-center mb-4">
                        <DrawerClose asChild>
                             <Button variant="ghost" size="icon">
                                <X className="h-6 w-6" />
                            </Button>
                        </DrawerClose>
                    </div>
                  <nav className="grid gap-6 text-lg font-medium text-center">
                    {navLinks.map((link) => (
                      <DrawerClose key={link.title} asChild>
                          <a
                            href={link.href}
                            className="flex items-center justify-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                          >
                            {link.title}
                          </a>
                      </DrawerClose>
                    ))}
                  </nav>
                </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
};
