
import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Book, Calendar, Clock, User, Loader2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useReadingPlan } from "@/hooks/useReadingPlans";

const ReadingPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const planId = parseInt(id || "");
  
  const { data: plan, isLoading, error } = useReadingPlan(planId);

  // Scroll para o topo quando o componente carrega
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleBackNavigation = () => {
    console.log('Voltando para home');
    navigate("/#planos-leitura");
    setTimeout(() => {
      const element = document.getElementById('planos-leitura');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-body">
        <Header logoUrl="/lovable-uploads/church-logo-bw.png" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-16 w-16 text-gray-400 mx-auto mb-4 animate-spin" />
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Carregando plano de leitura...</h1>
            <p className="text-gray-600">Por favor, aguarde enquanto carregamos o conteúdo.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !plan) {
    console.error('Erro ao carregar plano:', error);
    return (
      <div className="flex flex-col min-h-screen bg-white font-body">
        <Header logoUrl="/lovable-uploads/church-logo-bw.png" />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Plano não encontrado</h1>
            <p className="text-gray-600 mb-4">O plano de leitura que você procura não existe ou não pôde ser carregado.</p>
            <Button onClick={() => navigate("/")} className="bg-black text-white hover:bg-gray-800">
              Voltar ao Início
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header logoUrl="/lovable-uploads/church-logo-bw.png" />
      <main className="flex-grow py-16">
        <div className="container mx-auto px-8 max-w-4xl">
          <div className="mb-8">
            <div 
              onClick={handleBackNavigation}
              className="mb-6 inline-flex items-center gap-3 bg-black text-white hover:bg-gray-800 active:bg-gray-900 px-6 py-3 text-base font-medium transition-all duration-200 rounded-lg cursor-pointer min-h-[48px] focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleBackNavigation();
                }
              }}
            >
              <ArrowLeft className="h-5 w-5 flex-shrink-0" />
              <span className="leading-none">Voltar aos Planos</span>
            </div>
            
            <div className="relative h-64 rounded-lg overflow-hidden mb-6 shadow-lg">
              <img
                src={plan.image}
                alt={plan.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.log('Erro ao carregar imagem do plano:', plan.image);
                  e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h1 className="text-4xl font-bold mb-2">{plan.title}</h1>
                  <p className="text-lg opacity-90">{plan.description}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{plan.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                <span>{plan.category}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5" />
                <span>Por {plan.author}</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Leituras Diárias</h2>
            {plan.readings && plan.readings.length > 0 ? (
              plan.readings.map((reading) => (
                <Card key={reading.day} className="hover:shadow-md transition-shadow border-l-4 border-l-black">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className="bg-black text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {reading.day}
                      </div>
                      <div className="flex-grow">
                        <h3 className="text-lg">{reading.title}</h3>
                        <p className="text-sm text-gray-600 font-normal">{reading.passage}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 italic mb-4">"{reading.content}"</p>
                    <div className="pt-4 border-t bg-gray-50 -mx-6 -mb-6 px-6 py-4">
                      <p className="text-sm text-gray-600">
                        💡 <strong>Reflexão:</strong> Como este versículo pode transformar sua vida hoje?
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card className="text-center py-8">
                <CardContent>
                  <Book className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">As leituras diárias para este plano ainda estão sendo preparadas.</p>
                  <p className="text-sm text-gray-500 mt-2">Em breve, você poderá acessar todo o conteúdo do plano.</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="mt-12 text-center">
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">Complete sua jornada espiritual</h3>
                <p className="text-gray-600 mb-6">
                  Dedique alguns minutos por dia para meditar nestes versículos e fortalecer sua fé. 
                  Cada leitura é uma oportunidade de crescer em intimidade com Deus.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    className="bg-black text-white hover:bg-gray-800"
                    onClick={() => window.open('https://www.bible.com/pt/reading-plans', '_blank')}
                  >
                    Explorar Mais Planos
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={handleBackNavigation}
                  >
                    Ver Outros Planos
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ReadingPlan;
