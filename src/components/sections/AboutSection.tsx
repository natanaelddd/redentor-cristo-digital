
import React from "react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection = ({ siteContent = {} }: AboutSectionProps) => {
    return (
        <section id="sobre" className="section-elegant bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-50 -translate-y-48 translate-x-48"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-blue-100 to-indigo-100 rounded-full opacity-50 translate-y-32 -translate-x-32"></div>
          
          {/* Curved top */}
          <div className="absolute top-0 left-0 w-full">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 Z" fill="white"/>
            </svg>
          </div>

          <div className="container-elegant relative z-10 pt-32">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="fade-in relative">
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <img 
                    src="/lovable-uploads/7e64d619-a794-49be-a483-0f550f7c02a0.png" 
                    alt="Igreja Missionária do Cristo Redentor - Ministério de Louvor" 
                    className="w-full h-[700px] object-cover image-elegant transform hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                {/* Floating card */}
                <div className="absolute -bottom-8 -right-8 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
                    <div className="text-sm text-gray-600 font-medium">Membros Ativos</div>
                  </div>
                </div>
              </div>
              
              <div className="text-left space-y-12 fade-in stagger-2">
                <div className="space-y-6">
                  <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
                    <p className="text-sm uppercase tracking-wider text-purple-700 font-medium">SOBRE NÓS</p>
                  </div>
                  <h2 className="font-heading font-light text-gray-900 text-5xl leading-tight">
                    {siteContent.about_us_heading || 'Nossa Igreja'}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                </div>
                
                <div className="space-y-8">
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {siteContent.about_us_p1 || 'A Igreja Missionária do Cristo Redentor está localizada no bairro Cristo Redentor em Ribeirão Preto, sendo um farol de fé e esperança para nossa comunidade.'}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {siteContent.about_us_p2 || 'Nossa missão é levar o amor de Cristo a todas as pessoas, oferecendo um ambiente acolhedor onde cada pessoa pode crescer em sua jornada espiritual e encontrar propósito através da palavra de Deus.'}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-8 pt-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">15+</div>
                    <div className="text-sm text-gray-600">Anos de Ministério</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
                    <div className="text-sm text-gray-600">Cultos por Semana</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 mb-2">50+</div>
                    <div className="text-sm text-gray-600">Voluntários</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Curved bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,120 Z" fill="white"/>
            </svg>
          </div>
        </section>
    );
};
