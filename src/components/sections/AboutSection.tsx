
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
        <section id="sobre" className="py-32 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                <div className="relative">
                  <img 
                    src={siteContent.about_us_image || 'https://images.unsplash.com/photo-1594794617141-2d7f99b22223?q=80&w=2070&auto=format&fit=crop'} 
                    alt="Pastor pregando na Igreja Missionária do Cristo Redentor" 
                    className="w-full h-[600px] object-cover" 
                  />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <div className="max-w-xl">
                  <p className="text-primary text-sm uppercase tracking-[0.4em] font-light mb-8">
                    Sobre Nós
                  </p>
                  
                  <h2 className="text-4xl md:text-5xl font-light mb-12 leading-tight tracking-tight">
                    {siteContent.about_us_heading || 'Nossa História'}
                  </h2>
                  
                  <div className="space-y-8 text-lg text-gray-600 leading-relaxed font-light">
                    <p>
                      {siteContent.about_us_p1 || 'A Igreja Missionária do Cristo Redentor é uma comunidade de fé dedicada a compartilhar o amor de Deus e servir nossa cidade de Ribeirão Preto com excelência e propósito, localizada no bairro Cristo Redentor.'}
                    </p>
                    <p>
                      {siteContent.about_us_p2 || 'Nosso compromisso é criar um ambiente acolhedor onde cada pessoa possa crescer espiritualmente e encontrar seu propósito em Cristo, impactando vidas através do amor e da verdade em nossa comunidade local.'}
                    </p>
                  </div>
                  
                  <div className="mt-12">
                    <Button 
                      variant="outline"
                      size="lg" 
                      className="border-black text-black hover:bg-black hover:text-white rounded-none px-8 py-3 text-sm font-light uppercase tracking-[0.2em] transition-all duration-300"
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
