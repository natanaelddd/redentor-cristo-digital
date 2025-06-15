
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

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
        <section id="eventos" className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12 font-heading">Nossos Cultos</h2>
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                {events.map((event) => (
                  <Card key={event.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    {event.image_url && <img src={event.image_url} alt={event.title} className="w-full h-56 object-cover"/>}
                    <CardHeader>
                      <CardTitle className="font-heading">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center text-muted-foreground mb-2">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>{event.day_of_week} às {event.time}</span>
                      </div>
                      <p>{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Nenhum evento agendado no momento. Volte em breve!</p>
              </div>
            )}
            <div className="text-center">
              <Button size="lg" variant="outline">
                TODOS OS EVENTOS
              </Button>
            </div>
          </div>
        </section>
    );
};
