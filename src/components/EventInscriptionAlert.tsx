import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const EventInscriptionAlert = () => {
  return (
    <div className="bg-gradient-to-r from-primary via-primary-foreground to-accent text-primary-foreground py-6 relative overflow-hidden shadow-lg border-b">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-accent/80 opacity-70 animate-[pulse_3s_ease-in-out_infinite]"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slide-in-right_4s_ease-in-out_infinite]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full animate-bounce">
              <Users className="h-7 w-7" />
            </div>
            <div>
              <h3 className="font-bold text-xl drop-shadow-md text-white">
                🙏 Inscrições para Encontro com Deus 🙏
              </h3>
              <p className="text-lg opacity-95 drop-shadow-sm text-white">
                08 e 09 de Novembro - Participe conosco!
              </p>
            </div>
          </div>
          <Link to="/inscricao-encontro">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-primary hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-primary/20"
            >
              <Calendar className="h-5 w-5 mr-2" />
              ✨ Inscrever-se ✨
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};