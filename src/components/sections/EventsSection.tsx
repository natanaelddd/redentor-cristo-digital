
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, ArrowRight } from "lucide-react";

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
        <section id="eventos" className="section-elegant bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-30"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full opacity-30"></div>
          
          {/* Curved top */}
          <div className="absolute top-0 left-0 w-full">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 Z" fill="white"/>
            </svg>
          </div>

          <div className="container-elegant relative z-10 pt-32">
            <div className="text-center mb-20 fade-in">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full mb-6">
                <p className="text-sm uppercase tracking-wider text-purple-700 font-medium">PROGRAMAÇÃO</p>
              </div>
              <h2 className="font-heading font-light text-gray-900 text-5xl mb-6">Nossos Cultos</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mx-auto"></div>
            </div>
            
            {events.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                {events.map((event, index) => (
                  <div key={event.id} className={`group fade-in stagger-${index + 1}`}>
                    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
                      {event.image_url && (
                        <div className="h-64 overflow-hidden relative">
                          <img 
                            src={event.image_url} 
                            alt={event.title} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                      )}
                      
                      <div className="p-8">
                        <h3 className="font-heading font-medium text-2xl mb-6 text-gray-900 group-hover:text-purple-600 transition-colors">
                          {event.title}
                        </h3>
                        
                        <div className="flex flex-col gap-4 mb-6">
                          <div className="flex items-center text-gray-600">
                            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                              <Calendar className="h-5 w-5 text-purple-600" />
                            </div>
                            <span className="font-medium">{event.day_of_week}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mr-4">
                              <Clock className="h-5 w-5 text-pink-600" />
                            </div>
                            <span className="font-medium">{event.time}</span>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 leading-relaxed mb-6">{event.description}</p>
                        
                        <button className="flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group-hover:translate-x-2 duration-300">
                          Saiba mais
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600 mb-20 bg-white rounded-3xl p-16 shadow-lg border border-gray-100">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-8 w-8 text-purple-600" />
                </div>
                <p className="text-lg">Nenhum evento agendado no momento. Volte em breve!</p>
              </div>
            )}
            
            <div className="text-center fade-in stagger-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-12 py-4 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                TODOS OS EVENTOS
                <ArrowRight className="ml-3 h-5 w-5 inline" />
              </button>
            </div>
          </div>

          {/* Curved bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,120 Z" fill="white"/>
            </svg>
          </div>
        </section>
    );
};
