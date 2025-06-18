
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Skeleton } from "@/components/ui/skeleton";

// Helper para formatar o conteúdo do site em um objeto chave-valor
const formatSiteContent = (content: any[] | null) => {
  if (!content) return {};
  return content.reduce((acc, item) => {
    acc[item.section_key] = item.content_value;
    return acc;
  }, {} as { [key: string]: string });
};

const Index = () => {
  const { data: pageData, isLoading } = useQuery({
    queryKey: ["site_data"],
    queryFn: async () => {
      const [
        { data: heroSlides, error: heroSlidesError },
        { data: siteContent, error: siteContentError },
        { data: navLinks, error: navLinksError },
        { data: events, error: eventsError },
      ] = await Promise.all([
        supabase.from("hero_slides").select("*").order("order").eq('is_active', true),
        supabase.from("site_content").select("*"),
        supabase.from("navigation_links").select("*").order("order").eq('is_active', true),
        supabase.from("events").select("*").order("order").eq('is_active', true),
      ]);

      if (heroSlidesError) throw new Error(heroSlidesError.message);
      if (siteContentError) throw new Error(siteContentError.message);
      if (navLinksError) throw new Error(navLinksError.message);
      if (eventsError) throw new Error(eventsError.message);

      // Dados dos eventos padrão
      const staticEvents = [
        {
          id: '1',
          title: 'Culto de Domingo',
          image_url: 'https://images.unsplash.com/photo-1594794617141-2d7f99b22223?q=80&w=2070&auto=format&fit=crop',
          day_of_week: 'Todos os Domingos',
          time: '9h e 19h',
          description: 'Um tempo de louvor, adoração e palavra de Deus para toda família.'
        },
        {
          id: '2',
          title: 'Estudo Bíblico',
          image_url: 'https://images.unsplash.com/photo-1543621894-0a345e6b12de?q=80&w=2070&auto=format&fit=crop',
          day_of_week: 'Todas as Quartas',
          time: '20h',
          description: 'Aprofunde seu conhecimento nas escrituras sagradas conosco.'
        },
        {
          id: '3',
          title: 'Rede de Jovens',
          image_url: 'https://images.unsplash.com/photo-1544219454-935243f7737e?q=80&w=2070&auto=format&fit=crop',
          day_of_week: 'Todos os Sábados',
          time: '19h30',
          description: 'Um encontro especial para os jovens da nossa comunidade.'
        }
      ];

      // Links de navegação padrão
      const staticNavLinks = [
        { title: 'INÍCIO', href: '#' },
        { title: 'SOBRE', href: '#sobre' },
        { title: 'EVENTOS', href: '#eventos' },
        { title: 'CONTATO', href: '#contato' }
      ];

      return {
        heroSlides,
        siteContent: formatSiteContent(siteContent),
        navLinks: (navLinks && navLinks.length > 0) ? navLinks : staticNavLinks,
        events: (events && events.length > 0) ? events : staticEvents,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-12 w-32 rounded-full" />
          </div>
          <Skeleton className="h-screen w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white font-body">
      <Header navLinks={pageData?.navLinks} logoUrl={pageData?.siteContent.logo_url} />
      <main className="flex-grow">
        <HeroSection slides={pageData?.heroSlides} siteContent={pageData?.siteContent} />
        <AboutSection siteContent={pageData?.siteContent} />
        <EventsSection events={pageData?.events} />
        <ContactSection />
      </main>
      <Footer navLinks={pageData?.navLinks} siteContent={pageData?.siteContent} />
    </div>
  );
};

export default Index;
