
import React from "react";
import { MapPin, Church, Phone, Clock } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contato" className="py-32 bg-white">
          <div className="container mx-auto px-8">
            <div className="text-center mb-20">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-500 mb-4">LOCALIZAÇÃO</p>
              <h2 className="text-5xl md:text-6xl font-bold font-heading">Venha nos Visitar</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.2826553423824!2d-47.84071708485187!3d-21.11094928593143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b995f65d6b6223%3A0x50bba25ba98fe3a4!2sIgreja%20Mission%C3%A1ria!5e0!3m2!1spt!2sbr!4v1645123456789!5m2!1spt!2sbr"
                  width="100%"
                  height="500"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  className="shadow-lg"
                  title="Localização da Igreja Missionária do Cristo Redentor"
                ></iframe>
              </div>
              
              <div className="text-left space-y-12">
                <div>
                  <h3 className="text-3xl font-bold mb-8 font-heading">Informações de Contato</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-6">
                    <MapPin className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Endereço</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Av. Pedro Abrahão Alem Neto, 520<br />
                        Cristo Redentor - Ribeirão Preto, SP<br />
                        CEP: 14063-145
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6">
                    <Clock className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Horários dos Cultos</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Domingos: 9h e 19h<br />
                        Quartas: 20h (Estudo Bíblico)<br />
                        Sábados: 19h30 (Jovens)
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-6">
                    <Church className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-lg mb-2">Nossa Missão</h4>
                      <p className="text-gray-600 leading-relaxed">
                        Levando o amor de Cristo para a comunidade do Cristo Redentor e região, 
                        oferecendo um ambiente de fé, esperança e transformação.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};
