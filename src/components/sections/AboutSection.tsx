
import React from "react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection = ({ siteContent = {} }: AboutSectionProps) => {
    return (
        <section id="sobre" className="section-elegant bg-gray-50">
          <div className="container-elegant">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="fade-in">
                <img 
                  src="/lovable-uploads/7e64d619-a794-49be-a483-0f550f7c02a0.png" 
                  alt="Igreja Missionária do Cristo Redentor - Ministério de Louvor" 
                  className="w-full h-[700px] object-cover image-elegant border-elegant" 
                />
              </div>
              <div className="text-left space-y-12 fade-in stagger-2">
                <div className="space-y-6">
                  <p className="nav-elegant text-gray-500 tracking-wider">SOBRE NÓS</p>
                  <h2 className="font-heading font-light text-gray-900">
                    {siteContent.about_us_heading || 'Nossa Igreja'}
                  </h2>
                </div>
                <div className="space-y-8">
                  <p className="text-elegant text-gray-600">
                    {siteContent.about_us_p1 || 'A Igreja Missionária do Cristo Redentor está localizada no bairro Cristo Redentor em Ribeirão Preto, sendo um farol de fé e esperança para nossa comunidade.'}
                  </p>
                  <p className="text-elegant text-gray-600">
                    {siteContent.about_us_p2 || 'Nossa missão é levar o amor de Cristo a todas as pessoas, oferecendo um ambiente acolhedor onde cada pessoa pode crescer em sua jornada espiritual e encontrar propósito através da palavra de Deus.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};
