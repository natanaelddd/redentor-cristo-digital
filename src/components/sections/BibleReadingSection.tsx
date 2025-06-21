
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, ArrowRight } from "lucide-react";

export const BibleReadingSection = () => {
  const navigate = useNavigate();
  
  const readingPlans = [
    {
      id: 1,
      title: "As Cicatrizes e Marcas da Vida",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Um plano focado na cura e restauração através da Palavra de Deus.",
      author: "Priscilla Shirer",
      duration: "7 dias"
    },
    {
      id: 2,
      title: "Pentecostes: O Fogo que Permanece",
      image: "https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop",
      category: "Mulheres",
      description: "Explore o poder transformador do Espírito Santo em sua jornada de fé.",
      author: "Beth Moore",
      duration: "5 dias"
    },
    {
      id: 3,
      title: "Namoro Cristão",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?q=80&w=2074&auto=format&fit=crop",
      category: "Mulheres",
      description: "Princípios bíblicos para relacionamentos saudáveis e honrosos.",
      author: "Joshua Harris",
      duration: "6 dias"
    },
    {
      id: 4,
      title: "O Silêncio que Cura",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
      category: "Homens",
      description: "Encontre paz e direção através da meditação e quietude com Deus.",
      author: "Max Lucado",
      duration: "10 dias"
    },
    {
      id: 5,
      title: "Casais Abençoados Em Deus",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop",
      category: "Homens",
      description: "Fortaleça seu casamento com fundamentos cristãos sólidos.",
      author: "Gary Chapman",
      duration: "14 dias"
    },
    {
      id: 6,
      title: "Em Quem Confiar?",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2074&auto=format&fit=crop",
      category: "Homens",
      description: "Desenvolva uma confiança inabalável em Deus em todas as circunstâncias.",
      author: "Charles Stanley",
      duration: "8 dias"
    },
    {
      id: 7,
      title: "O que Jesus Postaria?",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2039&auto=format&fit=crop",
      category: "Juventude",
      description: "Navegue nas redes sociais com sabedoria e propósito cristão.",
      author: "Craig Groeschel",
      duration: "5 dias"
    },
    {
      id: 8,
      title: "Amigos Verdadeiros",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2069&auto=format&fit=crop",
      category: "Juventude",
      description: "Descubra o valor das amizades baseadas em princípios cristãos.",
      author: "Francis Chan",
      duration: "7 dias"
    },
    {
      id: 9,
      title: "Ar & Crescer",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop",
      category: "Juventude",
      description: "Crescimento espiritual autêntico para a nova geração de cristãos.",
      author: "Lecrae Moore",
      duration: "12 dias"
    }
  ];

  const categories = ["Mulheres", "Homens", "Juventude"];

  const handlePlanClick = (planId: number) => {
    console.log('Navegando para plano:', planId);
    navigate(`/plano-leitura/${planId}`);
  };

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

        <div className="space-y-16 mb-12">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-3xl font-bold mb-8 text-center">{category}</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {readingPlans
                  .filter((plan) => plan.category === category)
                  .map((plan) => (
                    <Card 
                      key={plan.id} 
                      className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md"
                      onClick={() => handlePlanClick(plan.id)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={plan.image}
                          alt={plan.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            console.log('Erro ao carregar imagem:', plan.image);
                            e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop";
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex items-end">
                          <div className="p-4 text-white w-full">
                            <h4 className="font-bold text-lg mb-1 line-clamp-2">{plan.title}</h4>
                            <p className="text-sm opacity-90">{plan.duration}</p>
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{plan.description}</p>
                        <p className="text-xs text-gray-500 mb-3">Por {plan.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-black text-sm font-medium">Começar Leitura</span>
                          <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
                        </div>
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
