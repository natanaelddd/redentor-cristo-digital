
import React from "react";

export const AboutSection = () => {
    return (
        <section id="sobre" className="py-16 md:py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <img src="/lovable-uploads/326e9cbc-61c9-469a-a8fe-76d7ead588bd.png" alt="Pastor pregando na Igreja Missionária Cristo Redentor" className="rounded-lg shadow-lg w-full h-auto object-cover aspect-square" />
              </div>
              <div className="text-left">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 font-heading">Sobre Nós</h2>
                <p className="text-muted-foreground text-lg mb-4">
                  A Igreja Missionária Cristo Redentor é uma comunidade de fé localizada no bairro Cristo Redentor em Ribeirão Preto - SP.
                </p>
                <p className="text-muted-foreground text-lg">
                  Nossa missão é compartilhar o amor de Cristo e servir à nossa comunidade com compaixão e dedicação. Junte-se a nós em nossos cultos e eventos.
                </p>
              </div>
            </div>
          </div>
        </section>
    );
};
