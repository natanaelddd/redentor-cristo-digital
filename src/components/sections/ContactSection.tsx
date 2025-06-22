
import React from "react";
import { MapPin, Church, Phone, Clock, Mail, ArrowRight } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contato" className="py-32 bg-gradient-to-br from-white to-orange-50 relative overflow-hidden">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-orange-100 to-red-100 rounded-full opacity-30 -translate-y-48 -translate-x-48"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tr from-red-100 to-orange-100 rounded-full opacity-30 translate-y-32 translate-x-32"></div>
          
          {/* Curved top */}
          <div className="absolute top-0 left-0 w-full">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,0 Z" fill="white"/>
            </svg>
          </div>

          <div className="container mx-auto px-8 relative z-10 pt-20">
            <div className="text-center mb-20">
              <div className="inline-block px-6 py-3 bg-gradient-to-r from-orange-100 to-red-100 rounded-full mb-6">
                <p className="text-sm uppercase tracking-wider text-orange-700 font-medium">LOCALIZAÇÃO</p>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold font-heading text-gray-900 mb-6">Venha nos Visitar</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-full mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="rounded-3xl overflow-hidden shadow-2xl border border-gray-200">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3730.2826553423824!2d-47.84071708485187!3d-21.11094928593143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b995f65d6b6223%3A0x50bba25ba98fe3a4!2sIgreja%20Mission%C3%A1ria!5e0!3m2!1spt!2sbr!4v1645123456789!5m2!1spt!2sbr"
                    width="100%"
                    height="500"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    className="w-full h-[500px]"
                    title="Localização da Igreja Missionária do Cristo Redentor"
                  ></iframe>
                </div>
                
                {/* Floating location card */}
                <div className="absolute -bottom-8 left-8 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Cristo Redentor</div>
                      <div className="text-sm text-gray-600">Ribeirão Preto, SP</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-left space-y-10">
                <div>
                  <h3 className="text-4xl font-bold mb-8 font-heading text-gray-900">Informações de Contato</h3>
                </div>
                
                <div className="space-y-8">
                  <div className="group">
                    <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">Endereço</h4>
                        <p className="text-gray-600 leading-relaxed">
                          Av. Pedro Abrahão Alem Neto, 520<br />
                          Cristo Redentor - Ribeirão Preto, SP<br />
                          CEP: 14063-145
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-14 h-14 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Clock className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">Horários dos Cultos</h4>
                        <p className="text-gray-600 leading-relaxed">
                          Domingos: 9h e 19h<br />
                          Quartas: 20h (Estudo Bíblico)<br />
                          Sábados: 19h30 (Jovens)
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex items-start space-x-6 p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      <div className="w-14 h-14 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <Church className="h-7 w-7 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg mb-3 text-gray-900 group-hover:text-orange-600 transition-colors">Nossa Missão</h4>
                        <p className="text-gray-600 leading-relaxed">
                          Levando o amor de Cristo para a comunidade do Cristo Redentor e região, 
                          oferecendo um ambiente de fé, esperança e transformação.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-8">
                  <button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 rounded-full font-medium tracking-wide transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
                    Entre em Contato
                    <ArrowRight className="ml-3 h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Curved bottom */}
          <div className="absolute bottom-0 left-0 w-full">
            <svg className="w-full h-24" preserveAspectRatio="none" viewBox="0 0 1200 120" fill="none">
              <path d="M0,120 C150,20 350,120 600,70 C850,20 1050,120 1200,70 L1200,120 Z" fill="#000000"/>
            </svg>
          </div>
        </section>
    );
};
