
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, MessageCircle } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

type CarouselItemData = {
  id: string;
  category: string;
  title: string;
  description: string | null;
  button_text: string;
};

type SiteContent = {
  [key: string]: string | undefined;
};

interface HeroSectionProps {
  slides?: CarouselItemData[];
  siteContent?: SiteContent;
}

export const HeroSection = ({ slides = [], siteContent = {} }: HeroSectionProps) => {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
        return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
        });
    }, [api, slides]);

    // Se não há slides, mostra um slide padrão
    const displaySlides = slides.length > 0 ? slides : [
      {
        id: 'default',
        category: 'Bem-vindos',
        title: 'Igreja Missionária Cristo Redentor',
        description: 'Um lugar de fé, esperança e amor no coração de Ribeirão Preto. Venha fazer parte da nossa família!',
        button_text: 'Conheça mais'
      }
    ];

    return (
        <section
          id="#"
          className="relative h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center overflow-hidden"
          style={{ 
            backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop')" 
          }}
        >
          <div className="relative container mx-auto px-4 w-full z-10">
            <Carousel setApi={setApi} className="w-full max-w-7xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {displaySlides.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="flex items-center justify-center min-h-[80vh]">
                      <div className="text-center text-white max-w-4xl mx-auto px-4">
                        <div className="flex justify-center items-center mb-6">
                          <p className="text-sm uppercase tracking-[0.2em] text-white/80 font-medium">{item.category}</p>
                          {displaySlides.length > 1 && (
                            <div className="flex gap-2 ml-8">
                              {Array.from({ length: count }).map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => api?.scrollTo(i)}
                                  className={`h-1 rounded-full transition-all duration-300 ${current === i ? 'bg-white w-8' : 'bg-white/40 w-4'}`}
                                >
                                  <span className="sr-only">Slide {i + 1}</span>
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                        
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading mb-6 leading-tight">
                          {item.title}
                        </h1>
                        
                        <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed">
                          {item.description}
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                          <Button 
                            size="lg" 
                            className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-3 font-medium text-base transition-all duration-300 hover:scale-105"
                          >
                            {item.button_text}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                          
                          <Button 
                            variant="outline" 
                            size="lg"
                            className="border-white text-white hover:bg-white hover:text-black rounded-full px-8 py-3 font-medium text-base transition-all duration-300"
                          >
                            Assista Online
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              {displaySlides.length > 1 && (
                <>
                  <CarouselPrevious className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm w-12 h-12" />
                  <CarouselNext className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm w-12 h-12" />
                </>
              )}
            </Carousel>
          </div>
          
          {/* Bottom Bar */}
          <div className="absolute bottom-0 left-0 right-0 bg-white text-foreground z-20">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 text-sm font-medium uppercase tracking-wide">
                  <span className="text-primary font-bold">Cultos Dominicais</span>
                  <span className="text-muted-foreground">|</span>
                  <span>{siteContent.sunday_services_time_1 || '9h'}</span>
                  <span className="text-muted-foreground">|</span>
                  <span>{siteContent.sunday_services_time_2 || '11h'}</span>
                  <span className="text-muted-foreground">|</span>
                  <span>{siteContent.sunday_services_time_3 || '19h'}</span>
                </div>

                <div className="hidden lg:flex flex-1 mx-8 overflow-hidden">
                  <div className="flex animate-marquee whitespace-nowrap">
                    <span className="text-sm font-medium uppercase tracking-wide px-4">
                      FAÇA PARTE DA NOSSA FAMÍLIA - IGREJA CRISTO REDENTOR - FAÇA PARTE DA NOSSA FAMÍLIA -&nbsp;
                    </span>
                    <span className="text-sm font-medium uppercase tracking-wide px-4" aria-hidden="true">
                      FAÇA PARTE DA NOSSA FAMÍLIA - IGREJA CRISTO REDENTOR - FAÇA PARTE DA NOSSA FAMÍLIA -&nbsp;
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <a href="#sobre" className="hidden lg:flex items-center gap-2 text-sm font-medium uppercase tracking-wide hover:text-primary transition-colors">
                    <span>Scroll Down</span>
                    <ArrowDown className="h-4 w-4" />
                  </a>
                  <Button size="icon" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 w-10 h-10 transition-all duration-300 hover:scale-110">
                    <MessageCircle className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
    );
};
