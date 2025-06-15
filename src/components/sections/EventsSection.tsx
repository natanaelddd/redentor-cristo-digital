
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export const EventsSection = () => {
    return (
        <section id="eventos" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-heading">Nossos Cultos</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1594794617141-2d7f99b22223?q=80&w=2070&auto=format&fit=crop" alt="Culto de Domingo" className="w-full h-56 object-cover"/>
                <CardHeader>
                  <CardTitle className="font-heading">Culto de Domingo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todos os Domingos às 19h</span>
                  </div>
                  <p>Um tempo de louvor, adoração e palavra de Deus.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <img src="https://images.unsplash.com/photo-1543621894-0a345e6b12de?q=80&w=2070&auto=format&fit=crop" alt="Estudo Bíblico" className="w-full h-56 object-cover"/>
                <CardHeader>
                  <CardTitle className="font-heading">Estudo Bíblico</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todas as Quartas às 20h</span>
                  </div>
                  <p>Aprofunde seu conhecimento nas escrituras sagradas.</p>
                </CardContent>
              </Card>
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img src="https://images.unsplash.com/photo-1544219454-935243f7737e?q=80&w=2070&auto=format&fit=crop" alt="Rede de Jovens" className="w-full h-56 object-cover"/>
                <CardHeader>
                  <CardTitle className="font-heading">Rede de Jovens</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-muted-foreground mb-2">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>Todos os Sábados às 19h30</span>
                  </div>
                  <p>Um encontro dinâmico para os jovens da nossa comunidade.</p>
                </CardContent>
              </Card>
            </div>
            <div className="text-center">
              <Button size="lg" variant="outline">
                TODOS OS EVENTOS
              </Button>
            </div>
          </div>
        </section>
    );
};
