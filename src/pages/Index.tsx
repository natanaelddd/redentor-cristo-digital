import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { BookOpen } from "lucide-react";
import { AboutSection } from "@/components/sections/AboutSection";
import { BibleReadingSection } from "@/components/sections/BibleReadingSection";
import { EventsSection } from "@/components/sections/EventsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Skeleton } from "@/components/ui/skeleton";
import { LiveEditor } from "@/components/LiveEditor";
import { EventAnnouncements } from "@/components/EventAnnouncements";
import { EventInscriptionAlert } from "@/components/EventInscriptionAlert";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Calendar, Eye, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

// Helper para formatar o conteúdo do site em um objeto chave-valor
const formatSiteContent = (content: any[] | null) => {
  if (!content) return {};
  return content.reduce((acc, item) => {
    acc[item.section_key] = item.content_value;
    return acc;
  }, {} as { [key: string]: string });
};

const Index = () => {
  const { isAdmin, signOut } = useAuth();
  
  const { data: pageData, isLoading, error } = useQuery({
    queryKey: ["site_data"],
    queryFn: async () => {
      try {
        // Dados estáticos de fallback para garantir que a página sempre carregue
        const staticEvents = [
          {
            id: '1',
            title: 'Culto de Domingo',
            image_url: '/lovable-uploads/8f26c45c-7c10-4b49-ae6c-955370e66511.png',
            day_of_week: 'Todos os Domingos',
            time: '19h',
            description: 'Um tempo de louvor, adoração e palavra de Deus para toda família.'
          },
          {
            id: '2',
            title: 'Estudo Bíblico',
            image_url: '/lovable-uploads/2ec1f073-a0ea-4dcf-969b-ab19f3b541b4.png',
            day_of_week: 'Todas as Quartas',
            time: '20h',
            description: 'Aprofunde seu conhecimento nas escrituras sagradas conosco.'
          },
          {
            id: '3',
            title: 'Reunião de Oração',
            image_url: '/lovable-uploads/850f1e45-963d-4719-a2ac-7ba152fd8f99.png',
            day_of_week: 'Todas as Sextas',
            time: '20h',
            description: 'Um momento especial de oração e comunhão com Deus.'
          }
        ];

        const staticNavLinks = [
          { title: 'INÍCIO', href: '/' },
          { title: 'SOBRE', href: '/#sobre' },
          { title: 'EVENTOS', href: '/#eventos' },
          { title: 'CONTATO', href: '/#contato' }
        ];

        try {
          // Tenta carregar dados do Supabase
          const [
            { data: heroSlides },
            { data: siteContent },
            { data: navLinks },
            { data: events },
            { data: adminSettings },
          ] = await Promise.all([
            supabase.from("church_hero_slides").select("*").order("order").eq('is_active', true),
            supabase.from("site_content").select("*"),
            supabase.from("navigation_links").select("*").order("order").eq('is_active', true),
            supabase.from("events").select("*").order("order").eq('is_active', true),
            supabase.from("admin_settings").select("*"),
          ]);

          // Verificar se o agendamento de eventos está habilitado
          const eventRegistrationEnabled = adminSettings?.find(
            setting => setting.setting_key === 'event_registration_enabled'
          )?.setting_value === 'true';

          // Verificar se o banner do encontro está habilitado (ativo por padrão)
          const encontroBannerEnabled = adminSettings?.find(
            setting => setting.setting_key === 'encontro_banner_enabled'
          )?.setting_value !== 'false'; // Ativo por padrão, desativado apenas se explicitamente definido como 'false'

          return {
            heroSlides: heroSlides || [],
            siteContent: formatSiteContent(siteContent),
            navLinks: (navLinks && navLinks.length > 0) ? navLinks : staticNavLinks,
            events: (events && events.length > 0) ? events : staticEvents,
            eventRegistrationEnabled,
            encontroBannerEnabled,
          };
        } catch (dbError) {
          console.error('Database error, using fallback data:', dbError);
          // Em caso de erro do banco, usa dados estáticos
          return {
            heroSlides: [],
            siteContent: {},
            navLinks: staticNavLinks,
            events: staticEvents,
            eventRegistrationEnabled: false,
            encontroBannerEnabled: false,
          };
        }
      } catch (error) {
        console.error('Error in query function:', error);
        // Fallback completo em caso de qualquer erro
        return {
          heroSlides: [],
          siteContent: {},
          navLinks: [
            { title: 'INÍCIO', href: '/' },
            { title: 'SOBRE', href: '/#sobre' },
            { title: 'EVENTOS', href: '/#eventos' },
            { title: 'CONTATO', href: '/#contato' }
          ],
            eventRegistrationEnabled: false,
            encontroBannerEnabled: true, // Ativo por padrão em caso de erro
          events: [
            {
              id: '1',
              title: 'Culto de Domingo',
              image_url: '/lovable-uploads/8f26c45c-7c10-4b49-ae6c-955370e66511.png',
              day_of_week: 'Todos os Domingos',
              time: '19h',
              description: 'Um tempo de louvor, adoração e palavra de Deus para toda família.'
            }
          ]
        };
      }
    },
    // Configurações para tornar a query mais robusta
    retry: 2,
    retryDelay: 1000,
    staleTime: 30000, // 30 segundos
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  // Adicionar logs para debug
  if (error) {
    console.error('Erro ao carregar dados da página:', error);
  }

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
      <Header 
        navLinks={pageData?.navLinks} 
        logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png"
        showAdminActions={isAdmin}
        onLogout={signOut}
      />
      
      
      
      {/* Dynamic Event Announcements */}
      <div className="bg-background">
        <div className="container mx-auto px-4 py-2">
          <EventAnnouncements />
        </div>
      </div>
      
      {/* Event Banner - Exibido condicionalmente */}
      {pageData?.eventRegistrationEnabled && (
        <div className="bg-gradient-to-r from-orange-500 via-orange-600 to-amber-800 text-white py-4 relative overflow-hidden animate-pulse shadow-lg">
          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-700 opacity-50 animate-[pulse_2s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[slide-in-right_3s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full animate-bounce">
                  <Eye className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg drop-shadow-md">
                    🚨 Dia da Saúde Ocular - 13/09 🚨
                  </h3>
                  <p className="text-sm opacity-90 drop-shadow-sm">Exames grátis + armações e lentes com super desconto</p>
                </div>
              </div>
              <Link to="/agendamento">
                <Button variant="secondary" size="lg" className="bg-white text-orange-700 hover:bg-gray-100 font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-2 border-orange-200">
                  <Calendar className="h-4 w-4 mr-2" />
                  ⚡ Agendar Exame GRÁTIS ⚡
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow">
        <HeroSection slides={pageData?.heroSlides} siteContent={pageData?.siteContent} />

        {/* Banner sutil do Curso de Batismo */}
        <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border-y border-blue-100">
          <div className="container mx-auto px-4 py-4">
            <Link to="/quiz" className="flex items-center justify-between gap-4 group">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-sm group-hover:shadow-md transition-shadow">
                  <BookOpen className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-800 group-hover:text-primary transition-colors">
                    Curso Preparatório para Batismo
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    8 lições online • Salva seu progresso • Certificado ao concluir
                  </p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="shrink-0 border-blue-200 text-blue-700 hover:bg-blue-100 hidden sm:flex">
                Iniciar Curso <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <ChevronRight className="h-5 w-5 text-blue-400 sm:hidden shrink-0 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        <AboutSection siteContent={pageData?.siteContent} />
        <BibleReadingSection />
        <EventsSection events={pageData?.events} />
        <ContactSection />
      </main>
      <Footer navLinks={pageData?.navLinks} siteContent={pageData?.siteContent} />
      <LiveEditor isAdmin={isAdmin} />
    </div>
  );
};

export default Index;