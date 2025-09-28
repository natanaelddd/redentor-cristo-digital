import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, ArrowDown, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { CarouselApi } from "@/components/ui/carousel";
import landscapeHills from "@/assets/landscape-hills.jpg";
import landscapeLake from "@/assets/landscape-lake.jpg";
import landscapeForest from "@/assets/landscape-forest.jpg";
import landscapeMeadow from "@/assets/landscape-meadow.jpg";

type HeroSlide = {
  id: string;
  image_url: string | null;
  title: string;
  subtitle: string | null;
  description: string | null;
  button_text: string;
  button_link: string | null;
  text_color: string | null;
  background_color: string | null;
  overlay_opacity: number | null;
  text_alignment: string | null;
  button_color: string | null;
  button_hover_color: string | null;
  animation_type: string | null;
  animation_duration: number | null;
  display_duration: number | null;
  order: number | null;
  is_active: boolean | null;
};

type SiteContent = {
  [key: string]: string | undefined;
};

interface HeroSectionProps {
  slides?: HeroSlide[];
  siteContent?: SiteContent;
}

export const HeroSection = ({ slides = [], siteContent = {} }: HeroSectionProps) => {
    const [api, setApi] = useState<CarouselApi>();
    const [current, setCurrent] = useState(0);
    const [count, setCount] = useState(0);

    // Imagens de paisagens naturais leves - geradas com IA
    const backgroundImages = [
      landscapeHills,
      landscapeLake,
      landscapeForest,
      landscapeMeadow
    ];

    // Seleciona uma imagem aleatória a cada refresh
    const [selectedImage] = useState(() => {
      const randomIndex = Math.floor(Math.random() * backgroundImages.length);
      return backgroundImages[randomIndex];
    });

    useEffect(() => {
        if (!api) {
        return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap());

        api.on("select", () => {
        setCurrent(api.selectedScrollSnap());
        });
    }, [api]);

    // Se houver slides customizados do admin, use-os; senão, use o conteúdo padrão
    if (slides && slides.length > 0) {
        return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <Carousel setApi={setApi} className="w-full h-full">
            <CarouselContent>
                {slides.map((slide, index) => (
                <CarouselItem key={slide.id || index} className="relative h-screen">
                    <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: slide.image_url ? `url(${slide.image_url})` : `url(${selectedImage})`,
                        backgroundColor: slide.background_color || '#000000'
                    }}
                    />
                    <div 
                    className="absolute inset-0 bg-black"
                    style={{ opacity: slide.overlay_opacity || 0.5 }}
                    />
                    <div className="container mx-auto h-full flex items-center relative z-10 px-4">
                    <div 
                        className={`max-w-2xl ${
                        slide.text_alignment === 'center' ? 'mx-auto text-center' :
                        slide.text_alignment === 'right' ? 'ml-auto text-right' :
                        'text-left'
                        }`}
                    >
                        <h1 
                        className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-lg"
                        style={{ color: slide.text_color || '#ffffff' }}
                        >
                        {slide.title}
                        </h1>
                        {slide.subtitle && (
                        <h2 
                            className="text-xl md:text-2xl mb-6 opacity-90 drop-shadow-md"
                            style={{ color: slide.text_color || '#ffffff' }}
                        >
                            {slide.subtitle}
                        </h2>
                        )}
                        {slide.description && (
                        <p 
                            className="text-lg md:text-xl mb-8 opacity-80 drop-shadow-sm"
                            style={{ color: slide.text_color || '#ffffff' }}
                        >
                            {slide.description}
                        </p>
                        )}
                        {slide.button_text && (
                        <Button
                            size="lg"
                            className="text-lg px-8 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                            style={{
                            backgroundColor: slide.button_color || '#6366f1',
                            color: '#ffffff'
                            }}
                            onMouseEnter={(e) => {
                            if (slide.button_hover_color) {
                                e.currentTarget.style.backgroundColor = slide.button_hover_color;
                            }
                            }}
                            onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = slide.button_color || '#6366f1';
                            }}
                            onClick={() => {
                            if (slide.button_link) {
                                if (slide.button_link.startsWith('#')) {
                                const element = document.querySelector(slide.button_link);
                                element?.scrollIntoView({ behavior: 'smooth' });
                                } else {
                                window.open(slide.button_link, '_blank');
                                }
                            }
                            }}
                        >
                            {slide.button_text}
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                        )}
                    </div>
                    </div>
                </CarouselItem>
                ))}
            </CarouselContent>
            {slides.length > 1 && (
                <>
                <CarouselPrevious className="left-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                <CarouselNext className="right-4 bg-white/10 border-white/20 text-white hover:bg-white/20" />
                </>
            )}
            </Carousel>
            
            {/* Indicadores de slide */}
            {slides.length > 1 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {slides.map((_, index) => (
                <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    current === index ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => api?.scrollTo(index)}
                />
                ))}
            </div>
            )}
        </section>
        );
    }

    // Layout padrão quando não há slides customizados
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background com overlay */}
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
            backgroundImage: `url(${selectedImage})`
            }}
        />
        <div className="absolute inset-0 bg-black/50" />
        
        {/* Conteúdo */}
        <div className="container mx-auto text-center relative z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Redentor Cristo Digital
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md">
                Um lugar de fé, esperança e amor. Junte-se à nossa comunidade cristã.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white text-lg px-8 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                const aboutSection = document.getElementById('sobre');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                Conhecer Nossa Igreja
                <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
                variant="outline" 
                size="lg" 
                className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-8 py-6 font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                onClick={() => {
                const contactSection = document.getElementById('contato');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                <MessageCircle className="mr-2 h-5 w-5" />
                Fale Conosco
            </Button>
            </div>
        </div>
        
        {/* Seta para baixo animada */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <ArrowDown className="h-8 w-8" />
        </div>
        </section>
    );
};