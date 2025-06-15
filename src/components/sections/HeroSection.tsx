
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

    return (
        <section
          id="#"
          className="relative h-screen bg-cover bg-center text-white flex items-center justify-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <div className="relative container mx-auto px-4 w-full">
            <Carousel setApi={setApi} className="w-full max-w-5xl mx-auto" opts={{ loop: true }}>
              <CarouselContent>
                {slides.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="p-4">
                      <div className="bg-background/90 backdrop-blur-sm text-foreground p-8 md:p-16 rounded-2xl shadow-2xl relative">
                        <div className="flex justify-between items-start mb-4">
                          <p className="text-sm uppercase tracking-widest text-muted-foreground">{item.category}</p>
                          <div className="flex gap-2">
                            {Array.from({ length: count }).map((_, i) => (
                              <button
                                key={i}
                                onClick={() => api?.scrollTo(i)}
                                className={`h-2 w-2 rounded-full transition-all ${current === i ? 'bg-primary w-4' : 'bg-muted'}`}
                              >
                                <span className="sr-only">Slide {i + 1}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="min-h-[180px] md:min-h-[150px]">
                          <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4 text-primary-foreground">{item.title}</h2>
                          <p className="text-lg text-muted-foreground mb-8 max-w-2xl">{item.description}</p>
                        </div>
                        <div className="flex">
                          <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8">{item.button_text}</Button>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-primary border-none w-12 h-12" />
              <CarouselNext className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 rounded-full bg-white/80 hover:bg-white text-primary border-none w-12 h-12" />
            </Carousel>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-white text-foreground p-4 flex justify-between items-center z-10 text-xs sm:text-sm">
            <div className="flex items-center gap-2 sm:gap-4 uppercase font-medium">
              <span>{siteContent.sunday_services_title || 'Sunday Services'}</span>
              <div className="hidden md:flex items-center gap-2 sm:gap-4">
                  <span className="text-muted-foreground">|</span>
                  <span>{siteContent.sunday_services_time_1 || ''}</span>
                  <span className="text-muted-foreground">|</span>
                  <span>{siteContent.sunday_services_time_2 || ''}</span>
                  <span className="text-muted-foreground">|</span>
                  <span>{siteContent.sunday_services_time_3 || ''}</span>
              </div>
              <span className="text-muted-foreground">|</span>
              <a href={siteContent.watch_online_link || '#'} className="flex items-center gap-1">
                <span>{siteContent.watch_online_text || 'Watch Online'}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

            <div className="flex-1 mx-8 overflow-hidden hidden lg:block">
              <div className="flex animate-marquee">
                <p className="whitespace-nowrap uppercase font-medium px-4">MAY - DONATE TO MIRACLES IN MAY - DONATE TO MIRACLES IN MAY -&nbsp;</p>
                <p className="whitespace-nowrap uppercase font-medium px-4" aria-hidden="true">MAY - DONATE TO MIRACLES IN MAY - DONATE TO MIRACLES IN MAY -&nbsp;</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <a href="#sobre" className="hidden lg:flex items-center gap-1 uppercase font-medium">
                <span>Scroll Down</span>
                <ArrowDown className="h-4 w-4" />
              </a>
              <Button size="icon" className="rounded-full bg-foreground text-background hover:bg-foreground/90 w-10 h-10">
                <MessageCircle className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
    );
};
