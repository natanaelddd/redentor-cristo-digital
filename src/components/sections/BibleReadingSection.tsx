
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, ArrowRight } from "lucide-react";

export const BibleReadingSection = () => {
  const readingPlans = [
    {
      id: 1,
      title: "As Cicatrizes e Marcas da Vida",
      image: "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Um plano focado na cura e restauração através da Palavra."
    },
    {
      id: 2,
      title: "Pentecostes: O Fogo que Permanece",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop",
      category: "Mulheres",
      description: "Explore o poder do Espírito Santo em sua vida."
    },
    {
      id: 3,
      title: "Namoro Cristão",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Princípios bíblicos para relacionamentos saudáveis."
    },
    {
      id: 4,
      title: "O Silêncio que Cura",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      category: "Homens",
      description: "Encontre paz e direção através da meditação bíblica."
    },
    {
      id: 5,
      title: "Casais Abençoados Em Deus",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop",
      category: "Homens",
      description: "Fortaleça seu casamento com princípios cristãos."
    },
    {
      id: 6,
      title: "Em Quem Confiar?",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
      category: "Homens",
      description: "Desenvolva uma confiança inabalável em Deus."
    },
    {
      id: 7,
      title: "O que Jesus Postaria?",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop",
      category: "Juventude",
      description: "Navegue nas redes sociais com sabedoria cristã."
    },
    {
      id: 8,
      title: "Amigos Verdadeiros",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
      category: "Juventude",
      description: "Descubra o valor das amizades baseadas em Cristo."
    },
    {
      id: 9,
      title: "Ar & Crescer",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop",
      category: "Juventude",
      description: "Crescimento espiritual para a nova geração."
    }
  ];

  const categories = ["Mulheres", "Homens", "Juventude"];

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

        {/* Cards dinâmicos de planos de leitura */}
        <div className="space-y-16 mb-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-3xl font-bold mb-8 text-center">{category}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {readingPlans
                  .filter((plan) => plan.category === category)
                  .map((plan) => (
                    <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={plan.image}
                          alt={plan.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
                          <div className="p-4 text-white">
                            <h4 className="font-bold text-lg mb-1">{plan.title}</h4>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-gray-600 text-sm">{plan.description}</p>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg rounded-full"
            onClick={() => window.open('https://www.bible.com/pt/reading-plans', '_blank')}
          >
            Explorar Mais Planos de Leitura
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
