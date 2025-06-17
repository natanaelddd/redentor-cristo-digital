
import React from "react";
import { MapPin, Church } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contato" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
             <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-heading">Localização</h2>
             <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3729.4285847436847!2d-47.8388!3d-20.7962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b9bf0c5b7c8b45%3A0x1234567890abcdef!2sAv.%20Pedro%20Abrah%C3%A3o%20Alem%20Neto%2C%20520%20-%20Cristo%20Redentor%2C%20Ribeir%C3%A3o%20Preto%20-%20SP%2C%2014063-145!5e0!3m2!1spt-BR!2sbr!4v1640995200000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    className="rounded-lg shadow-lg"
                    title="Mapa de Localização da Igreja"
                  ></iframe>
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-bold mb-6 font-heading">Venha nos visitar</h3>
                  <div className="flex items-start text-muted-foreground text-lg mb-4">
                    <MapPin className="mr-4 h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <span>Av. Pedro Abrahão Alem Neto, 520<br />Cristo Redentor<br />Ribeirão Preto - SP, 14063-145</span>
                  </div>
                  <div className="flex items-center text-muted-foreground text-lg">
                    <Church className="mr-4 h-6 w-6 text-primary flex-shrink-0" />
                    <span>Junte-se a nós para uma experiência de fé e comunidade.</span>
                  </div>
                </div>
             </div>
          </div>
        </section>
    );
};
