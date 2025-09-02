import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Book, Clock, User, RefreshCw, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useReadingPlans } from "@/hooks/useReadingPlans";
import { useToast } from "@/components/ui/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { syncBiblePlans } from "@/utils/syncBiblePlans";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  name: string;
  emoji: string;
}

export const BibleReadingSection = () => {
  const navigate = useNavigate();
  const { data: readingPlans, isLoading, error } = useReadingPlans();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [syncing, setSyncing] = useState(false);

  const handleSyncPlans = async () => {
    setSyncing(true);
    try {
      const result = await syncBiblePlans();
      
      if (result.success) {
        toast({
          title: "Planos sincronizados!",
          description: `${result.plansSynced} planos foram atualizados com sucesso.`,
        });
        queryClient.invalidateQueries({ queryKey: ["reading_plans"] });
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Erro ao sincronizar planos:', error);
      toast({
        title: "Erro na sincronização",
        description: "Houve um problema ao sincronizar os planos. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setSyncing(false);
    }
  };

  const handlePlanClick = (planId: number) => {
    navigate(`/plano-leitura/${planId}`);
  };

  if (isLoading) {
    return (
      <section id="planos-leitura" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-48 w-full rounded-xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-10 w-32" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="planos-leitura" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-8 text-center">
          <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Erro ao carregar planos</h2>
          <p className="text-gray-600 mb-8">
            Houve um problema ao carregar os planos de leitura. Tente sincronizar novamente.
          </p>
          <Button onClick={handleSyncPlans} disabled={syncing}>
            {syncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sincronizando...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Sincronizar Planos
              </>
            )}
          </Button>
        </div>
      </section>
    );
  }

  const categories: Category[] = [
    { name: "Devocional", emoji: "🙏" },
    { name: "Temático", emoji: "📖" },
    { name: "Livro", emoji: "📜" },
    { name: "Cronológico", emoji: "⏳" },
    { name: "Tópico", emoji: "💡" },
  ];

  if (!readingPlans || readingPlans.length === 0) {
    return (
      <section id="planos-leitura" className="py-24 bg-gradient-to-br from-slate-50 to-white">
        <div className="container mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold font-heading text-gray-900 mb-6">
              Planos de{" "}
              <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                Leitura
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Organize sua jornada de leitura bíblica com nossos planos especialmente selecionados.
            </p>
          </div>

          <div className="text-center">
            <Book className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Nenhum plano encontrado</h3>
            <p className="text-gray-600 mb-8">
              Clique no botão abaixo para sincronizar os planos de leitura mais recentes.
            </p>
            <Button onClick={handleSyncPlans} disabled={syncing} size="lg">
              {syncing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sincronizando...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sincronizar Planos
                </>
              )}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="planos-leitura" className="py-24 bg-gradient-to-br from-slate-50 to-white">
      <div className="container mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold font-heading text-gray-900 mb-6">
            Planos de{" "}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Leitura
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Organize sua jornada de leitura bíblica com nossos planos especialmente selecionados.
          </p>
          
          <Button 
            onClick={handleSyncPlans} 
            disabled={syncing}
            variant="outline"
            className="mb-8"
          >
            {syncing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Sincronizando...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Atualizar Planos
              </>
            )}
          </Button>
        </div>

        {categories.map((category) => {
          const categoryPlans = readingPlans.filter(plan => plan.category === category.name);
          
          if (categoryPlans.length === 0) return null;

          return (
            <div key={category.name} className="mb-16">
              <h3 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                <span className="text-4xl">{category.emoji}</span>
                {category.name}
              </h3>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryPlans.map((plan) => (
                  <Card key={plan.id} className="group hover:shadow-2xl transition-all duration-300 border-0 shadow-lg bg-white/80 backdrop-blur-sm overflow-hidden">
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={plan.image} 
                        alt={plan.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardHeader className="pb-4">
                      <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                        {plan.title}
                      </CardTitle>
                      <CardDescription className="text-gray-600 leading-relaxed">
                        {plan.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {plan.author && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <User className="h-4 w-4" />
                          <span>{plan.author}</span>
                        </div>
                      )}
                      {plan.duration && (
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="h-4 w-4" />
                          <span>{plan.duration}</span>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button 
                        onClick={() => handlePlanClick(plan.id)}
                        className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0 shadow-lg group-hover:shadow-xl transition-all duration-300"
                      >
                        Começar Leitura
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        <div className="text-center mt-16">
          <Button 
            variant="outline" 
            size="lg"
            className="border-2 border-orange-200 text-orange-600 hover:bg-orange-50"
            asChild
          >
            <a 
              href="https://www.bible.com/reading-plans" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Explorar Mais Planos na Bible.com
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};