
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
        <section id="eventos" className="section-elegant bg-white">
          <div className="container-elegant">
            <div className="text-center mb-20 fade-in">
              <p className="nav-elegant text-gray-500 mb-6 tracking-wider">PROGRAMAÇÃO</p>
              <h2 className="font-heading font-light text-gray-900">Nossos Cultos</h2>
            </div>
            
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 grid-elegant mb-20">
                {events.map((event, index) => (
                  <Card key={event.id} className={`card-elegant overflow-hidden fade-in stagger-${index + 1}`}>
                    {event.image_url && (
                      <div className="h-80 overflow-hidden">
                        <img 
                          src={event.image_url} 
                          alt={event.title} 
                          className="w-full h-full object-cover image-elegant"
                        />
                      </div>
                    )}
                    <CardHeader className="p-10">
                      <CardTitle className="font-heading font-light text-2xl mb-6 text-gray-900">{event.title}</CardTitle>
                      <div className="flex items-center text-gray-500 mb-6 space-x-6">
                        <div className="flex items-center">
                          <Calendar className="mr-3 h-5 w-5" />
                          <span className="text-elegant">{event.day_of_week}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="mr-3 h-5 w-5" />
                          <span className="text-elegant">{event.time}</span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="px-10 pb-10">
                      <p className="text-elegant text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 mb-20">
                <p className="text-elegant">Nenhum evento agendado no momento. Volte em breve!</p>
              </div>
            )}
            
            <div className="text-center fade-in stagger-4">
              <button className="button-elegant text-gray-900 hover:bg-gray-900 hover:text-white">
                TODOS OS EVENTOS
              </button>
            </div>
          </div>
        </section>
    );
};
