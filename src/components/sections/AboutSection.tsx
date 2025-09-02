
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";

type SiteContent = {
  [key: string]: string | undefined;
};

interface AboutSectionProps {
  siteContent?: SiteContent;
}

export const AboutSection = ({ siteContent = {} }: AboutSectionProps) => {
  return (
    <section id="sobre" className="relative py-32 bg-gradient-to-br from-slate-50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-5xl lg:text-6xl font-bold font-heading text-gray-900 leading-tight">
                Nossa{" "}
                <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  História
                </span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                {siteContent?.about_description || 
                  "Somos uma comunidade de fé comprometida em viver e compartilhar o amor de Cristo. Nosso propósito é ser uma igreja que transforma vidas através da palavra de Deus, do amor genuíno e do serviço ao próximo."}
              </p>
              <p className="text-lg text-gray-500 leading-relaxed">
                Acreditamos que cada pessoa é única e especial aos olhos de Deus, e nossa missão é criar um ambiente onde todos possam crescer espiritualmente e encontrar seu propósito em Cristo.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 rounded-full px-8 py-4 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                Saiba Mais Sobre Nós
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-gray-300 text-gray-700 hover:border-orange-600 hover:text-orange-600 rounded-full px-8 py-4 text-base font-medium transition-all duration-300"
              >
                Nossa Visão
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                src="/lovable-uploads/church-community-bw.png"
                alt="Nossa Igreja"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
            
            {/* Floating card */}
            <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Amor & Comunhão</p>
                  <p className="text-sm text-gray-500">Nossa essência</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values section */}
        <div className="mt-32">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold font-heading text-gray-900 mb-6">
              Nossos{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Valores
              </span>
            </h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Princípios que norteiam nossa caminhada e definem quem somos como comunidade de fé.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Heart className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Amor</h4>
              <p className="text-gray-600 leading-relaxed">
                O amor de Cristo é o centro de tudo o que fazemos. Amamos a Deus acima de tudo e ao próximo como a nós mesmos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Comunidade</h4>
              <p className="text-gray-600 leading-relaxed">
                Somos uma família unida pela fé, onde cada membro é valorizado e tem seu lugar especial no corpo de Cristo.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-100 to-red-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="h-8 w-8 text-orange-600" />
              </div>
              <h4 className="text-2xl font-bold text-gray-900 mb-4">Palavra</h4>
              <p className="text-gray-600 leading-relaxed">
                A Bíblia é nossa base e fundamento. Buscamos viver de acordo com os ensinamentos de Jesus Cristo.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Curved shape at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg className="w-full h-32" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
          <path d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,120 Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};
