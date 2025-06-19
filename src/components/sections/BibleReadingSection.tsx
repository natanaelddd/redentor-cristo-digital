
import React from "react";
import { Button } from "@/components/ui/button";
import { Book, ArrowRight } from "lucide-react";

export const BibleReadingSection = () => {
  return (
    <section className="py-32 bg-gray-50">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">CRESCIMENTO ESPIRITUAL</p>
          <h2 className="text-5xl md:text-6xl font-bold mb-8 font-heading leading-tight">
            Planos de Leitura Bíblica
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cresça em sua jornada espiritual com planos de leitura bíblica estruturados e inspiradores.
            Conecte-se com a Palavra de Deus de forma consistente e transformadora.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold">Leitura Anual</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Complete a Bíblia em um ano com planos estruturados e reflexões diárias.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Leitura cronológica</li>
              <li>• Antigo e Novo Testamento</li>
              <li>• Reflexões diárias</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold">Temas Específicos</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Explore temas como fé, esperança, amor e propósito através das escrituras.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Fé e confiança</li>
              <li>• Amor e relacionamentos</li>
              <li>• Propósito de vida</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center mb-4">
              <Book className="h-6 w-6 text-primary mr-2" />
              <h3 className="text-xl font-bold">Novos na Fé</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Planos especiais para quem está começando sua jornada cristã.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• Fundamentos da fé</li>
              <li>• Histórias principais</li>
              <li>• Orientação espiritual</li>
            </ul>
          </div>
        </div>

        <div className="text-center">
          <Button 
            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-full"
            onClick={() => window.open('https://www.bible.com/pt/reading-plans', '_blank')}
          >
            Explorar Planos de Leitura
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Acesse Bible.com para descobrir centenas de planos de leitura
          </p>
        </div>
      </div>
    </section>
  );
};
