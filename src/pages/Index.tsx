
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
import { ReadingPlansSection } from "@/components/sections/ReadingPlansSection";

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
        { data: readingPlans, error: readingPlansError },
      ] = await Promise.all([
        supabase.from("hero_slides").select("*").order("order").eq('is_active', true),
        supabase.from("site_content").select("*"),
        supabase.from("navigation_links").select("*").order("order").eq('is_active', true),
        supabase.from("events").select("*").order("order").eq('is_active', true),
        supabase.from("reading_plans").select("*").order("created_at", { ascending: false }),
      ]);

      if (heroSlidesError) throw new Error(heroSlidesError.message);
      if (siteContentError) throw new Error(siteContentError.message);
      if (navLinksError) throw new Error(navLinksError.message);
      if (eventsError) throw new Error(eventsError.message);
      if (readingPlansError) throw new Error(readingPlansError.message);

      // Dados estáticos para o hero quando não há dados no banco
      const staticHeroSlides = [
        {
          id: '1',
          category: 'Bem-vindos',
          title: 'Igreja Missionária Cristo Redentor',
          description: 'Um lugar de fé, esperança e amor no coração de Ribeirão Preto. Venha fazer parte da nossa família!',
          button_text: 'Conheça mais',
          order: 1,
          is_active: true
        },
        {
          id: '2',
          category: 'Comunidade',
          title: 'Faça Parte da Nossa Família',
          description: 'Conecte-se com Deus e com uma comunidade acolhedora que caminha junto na fé.',
          button_text: 'Junte-se a nós',
          order: 2,
          is_active: true
        }
      ];

      // Dados dos eventos que esqueci de inserir na migração anterior
      const staticEvents = [
        {
          id: '1',
          title: 'Culto de Domingo',
          image_url: 'https://images.unsplash.com/photo-1594794617141-2d7f99b22223?q=80&w=2070&auto=format&fit=crop',
          day_of_week: 'Todos os Domingos',
          time: '19h',
          description: 'Um tempo de louvor, adoração e palavra de Deus.'
        },
        {
          id: '2',
          title: 'Estudo Bíblico',
          image_url: 'https://images.unsplash.com/photo-1543621894-0a345e6b12de?q=80&w=2070&auto=format&fit=crop',
          day_of_week: 'Todas as Quartas',
          time: '20h',
          description: 'Aprofunde seu conhecimento nas escrituras sagradas.'
        },
        {
          id: '3',
          title: 'Rede de Jovens',
          image_url: 'https://images.unsplash.com/photo-1544219454-935243f7737e?q=80&w=2070&auto=format&fit=crop',
          day_of_week: 'Todos os Sábados',
          time: '19h30',
          description: 'Um encontro dinâmico para os jovens da nossa comunidade.'
        }
      ];

      return {
        heroSlides: (heroSlides && heroSlides.length > 0) ? heroSlides : staticHeroSlides,
        siteContent: formatSiteContent(siteContent),
        navLinks,
        events: (events && events.length > 0) ? events : staticEvents,
        readingPlans,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 p-4 gap-4">
        <header className="flex justify-between items-center">
          <Skeleton className="h-20 w-20 rounded-full" />
          <Skeleton className="h-12 w-28 rounded-full" />
        </header>
        <main className="flex-grow space-y-4">
          <Skeleton className="h-screen w-full rounded-2xl" />
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-body p-2 sm:p-4">
      <Header navLinks={pageData?.navLinks} logoUrl={pageData?.siteContent.logo_url} />
      <main className="flex-grow rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
        <HeroSection slides={pageData?.heroSlides} siteContent={pageData?.siteContent} />
        <AboutSection siteContent={pageData?.siteContent} />
        <EventsSection events={pageData?.events} />
        <ReadingPlansSection plans={pageData?.readingPlans} />
        <ContactSection />
      </main>
      <Footer navLinks={pageData?.navLinks} siteContent={pageData?.siteContent} />
    </div>
  );
};

export default Index;
