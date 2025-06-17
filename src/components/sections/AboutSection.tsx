
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection = ({ siteContent = {} }: AboutSectionProps) => {
    return (
        <section id="sobre" className="py-20 md:py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl transform rotate-1"></div>
                  <img 
                    src={siteContent.about_us_image || 'https://images.unsplash.com/photo-1594794617141-2d7f99b22223?q=80&w=2070&auto=format&fit=crop'} 
                    alt="Pastor pregando na Igreja Missionária do Cristo Redentor" 
                    className="relative rounded-2xl shadow-2xl w-full h-[500px] object-cover" 
                  />
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="max-w-xl">
                  <p className="text-primary text-sm uppercase tracking-[0.2em] font-medium mb-4">
                    Sobre Nós
                  </p>
                  
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 font-heading leading-tight">
                    {siteContent.about_us_heading || 'Nossa História'}
                  </h2>
                  
                  <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      {siteContent.about_us_p1 || 'A Igreja Missionária do Cristo Redentor é uma comunidade de fé dedicada a compartilhar o amor de Deus e servir nossa cidade de Ribeirão Preto com excelência e propósito, localizada no bairro Cristo Redentor.'}
                    </p>
                    <p>
                      {siteContent.about_us_p2 || 'Nosso compromisso é criar um ambiente acolhedor onde cada pessoa possa crescer espiritualmente e encontrar seu propósito em Cristo, impactando vidas através do amor e da verdade em nossa comunidade local.'}
                    </p>
                  </div>
                  
                  <div className="mt-10">
                    <Button 
                      size="lg" 
                      className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-3 text-base font-medium transition-all duration-300 hover:scale-105"
                    >
                      Conheça Nossa História
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};
