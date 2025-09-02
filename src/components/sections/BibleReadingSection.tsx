
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Book, ArrowRight, Loader2, RefreshCw } from "lucide-react";
import { useReadingPlans } from "@/hooks/useReadingPlans";
import { syncBiblePlans } from "@/utils/syncBiblePlans";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const BibleReadingSection = () => {
  const navigate = useNavigate();
  const { data: readingPlans, isLoading, error } = useReadingPlans();
  const [isSyncing, setIsSyncing] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleSyncPlans = async () => {
    setIsSyncing(true);
    
    try {
      const result = await syncBiblePlans();
      
      if (result.success) {
        toast({
          title: "Planos sincronizados!",
          description: "Os planos de leitura foram carregados com sucesso.",
        });
        queryClient.invalidateQueries({ queryKey: ["reading_plans"] });
      } else {
        console.error('Erro na sincronização:', result.error);
        toast({
          title: "Erro na sincronização",
          description: "Não foi possível carregar os planos. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      toast({
        title: "Erro inesperado",
        description: "Ocorreu um erro ao sincronizar os planos.",
        variant: "destructive",
      });
    }
    
    setIsSyncing(false);
  };

  const handlePlanClick = (planId: number) => {
    console.log('Navegando para plano:', planId);
    navigate(`/plano-leitura/${planId}`);
  };

  if (isLoading) {
    return (
      <section id="planos-leitura" className="py-32 bg-gray-50">
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
          
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
            <span className="ml-2 text-gray-600">Carregando planos de leitura...</span>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    console.error('Erro ao carregar planos:', error);
    return (
      <section id="planos-leitura" className="py-32 bg-gray-50">
        <div className="container mx-auto px-8">
          <div className="text-center">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Erro ao carregar planos</h2>
            <p className="text-gray-600">Não foi possível carregar os planos de leitura. Tente novamente mais tarde.</p>
          </div>
        </div>
      </section>
    );
  }

  const categories = ["Pais", "Novo na Fé", "Juventude"];

  return (
    <section id="planos-leitura" className="py-32 bg-gray-50">
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

        {(!readingPlans || readingPlans.length === 0) && (
          <div className="text-center py-16">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-4 text-gray-800">Nenhum plano encontrado</h3>
            <p className="text-gray-600 mb-6">Os planos de leitura ainda não foram carregados.</p>
            <Button 
              onClick={handleSyncPlans}
              disabled={isSyncing}
              className="bg-black text-white hover:bg-gray-800"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Carregando Planos...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Carregar Planos de Leitura
                </>
              )}
            </Button>
          </div>
        )}

        <div className="space-y-16 mb-12">
          {categories.map((category) => {
            const categoryPlans = readingPlans?.filter((plan) => plan.category === category) || [];
            
            if (categoryPlans.length === 0) return null;
            
            return (
              <div key={category}>
                <h3 className="text-3xl font-bold mb-8 text-center">{category}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {categoryPlans.map((plan) => (
                    <Card 
                      key={plan.id} 
                      className="hover:shadow-lg transition-all duration-300 cursor-pointer group border-0 shadow-md"
                      onClick={() => handlePlanClick(plan.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <Book className="h-8 w-8 text-gray-500" />
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">{plan.duration}</span>
                        </div>
                        <h4 className="font-bold text-lg mb-2 line-clamp-2">{plan.title}</h4>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{plan.description}</p>
                        <p className="text-xs text-gray-500 mb-4">Por {plan.author}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-black text-sm font-medium">Começar Leitura</span>
                          <ArrowRight className="h-4 w-4 text-black group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
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
