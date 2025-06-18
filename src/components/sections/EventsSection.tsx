
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";

type Event = {
  id: string;
  image_url: string | null;
  title: string;
  day_of_week: string | null;
  time: string | null;
  description: string | null;
}

interface EventsSectionProps {
  events?: Event[];
}

export const EventsSection = ({ events = [] }: EventsSectionProps) => {
    return (
        <section id="eventos" className="py-32 bg-gray-50">
          <div className="container mx-auto px-8">
            <div className="text-center mb-20">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">PROGRAMAÇÃO</p>
              <h2 className="text-5xl md:text-6xl font-bold font-heading">Nossos Cultos</h2>
            </div>
            
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 rounded-none border-none">
                    {event.image_url && (
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={event.image_url} 
                          alt={event.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    )}
                    <CardHeader className="p-8">
                      <CardTitle className="font-heading text-2xl mb-4">{event.title}</CardTitle>
                      <div className="flex items-center text-gray-600 mb-4 space-x-4">
                        <div className="flex items-center">
                          <Calendar className="mr-2 h-5 w-5" />
                          <span>{event.day_of_week}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-2 h-5 w-5" />
                          <span>{event.time}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                      <p className="text-gray-600 leading-relaxed">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 mb-16">
                <p className="text-lg">Nenhum evento agendado no momento. Volte em breve!</p>
              </div>
            )}
            
            <div className="text-center">
              <Button size="lg" variant="outline" className="rounded-none px-12 py-4 text-sm tracking-[0.2em] font-medium border-2 border-black text-black hover:bg-black hover:text-white transition-all">
                TODOS OS EVENTOS
              </Button>
            </div>
          </div>
        </section>
    );
};
