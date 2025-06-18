
import React from "react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection = ({ siteContent = {} }: AboutSectionProps) => {
    return (
        <section id="sobre" className="py-32 bg-white">
          <div className="container mx-auto px-8">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                {siteContent.about_us_image ? (
                  <img 
                    src={siteContent.about_us_image} 
                    alt="Igreja Missionária do Cristo Redentor" 
                    className="w-full h-[600px] object-cover rounded-none shadow-lg" 
                  />
                ) : (
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2070&auto=format&fit=crop" 
                    alt="Igreja Missionária do Cristo Redentor" 
                    className="w-full h-[600px] object-cover rounded-none shadow-lg" 
                  />
                )}
              </div>
              <div className="text-left space-y-8">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">SOBRE NÓS</p>
                  <h2 className="text-5xl md:text-6xl font-bold mb-8 font-heading leading-tight">
                    {siteContent.about_us_heading || 'Nossa Igreja'}
                  </h2>
                </div>
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    {siteContent.about_us_p1 || 'A Igreja Missionária do Cristo Redentor está localizada no bairro Cristo Redentor em Ribeirão Preto, sendo um farol de fé e esperança para nossa comunidade.'}
                  </p>
                  <p>
                    {siteContent.about_us_p2 || 'Nossa missão é levar o amor de Cristo a todas as pessoas, oferecendo um ambiente acolhedor onde cada pessoa pode crescer em sua jornada espiritual e encontrar propósito através da palavra de Deus.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};
