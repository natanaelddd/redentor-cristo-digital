
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface ReadingPlanDay {
  day: number;
  title: string;
  passage: string;
  content: string;
}

export interface ReadingPlan {
  id: number;
  title: string;
  image: string;
  category: string;
  description: string;
  author: string;
  duration: string;
  readings?: ReadingPlanDay[];
}

export const useReadingPlans = () => {
  return useQuery({
    queryKey: ["reading_plans"],
    queryFn: async () => {
      console.log('Buscando planos de leitura do banco de dados...');
      
      const { data: plans, error } = await supabase
        .from("reading_plan_details")
        .select("*")
        .eq("is_active", true)
        .order("order_position");

      if (error) {
        console.error('Erro ao buscar planos:', error);
      }

      console.log('Planos encontrados:', plans);

      // Se não há dados no banco, usar dados estáticos de fallback
      if (!plans || plans.length === 0) {
        const fallbackPlans: ReadingPlan[] = [
          {
            id: 1,
            title: "Família Cristã",
            image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
            category: "Pais",
            description: "Construa uma família sólida baseada nos valores cristãos.",
            author: "Charles Stanley",
            duration: "21 dias"
          },
          {
            id: 2,
            title: "Fundamentos da Fé",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
            category: "Novo na Fé",
            description: "Descubra os pilares essenciais da vida cristã.",
            author: "Rick Warren",
            duration: "30 dias"
          },
          {
            id: 3,
            title: "Propósito e Chamado",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
            category: "Juventude",
            description: "Encontre seu propósito e chamado em Deus.",
            author: "Joyce Meyer",
            duration: "14 dias"
          }
        ];
        
        return fallbackPlans;
      }

      // Transformar dados do banco para o formato esperado
      const readingPlans: ReadingPlan[] = plans?.map(plan => ({
        id: plan.plan_id,
        title: plan.title,
        image: plan.image_url || "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
        category: plan.category,
        description: plan.description || "",
        author: plan.author || "",
        duration: plan.duration || ""
      })) || [];

      return readingPlans;
    },
  });
};

export const useReadingPlan = (planId: number) => {
  return useQuery({
    queryKey: ["reading_plan", planId],
    queryFn: async () => {
      console.log('Buscando plano específico:', planId);
      
      // Buscar detalhes do plano
      const { data: planDetails, error: planError } = await supabase
        .from("reading_plan_details")
        .select("*")
        .eq("plan_id", planId)
        .eq("is_active", true)
        .single();

      if (planError) {
        console.error('Erro ao buscar detalhes do plano:', planError);
        return null;
      }

      // Buscar leituras diárias do plano
      const { data: planDays, error: daysError } = await supabase
        .from("reading_plan_days")
        .select("*")
        .eq("plan_id", planId)
        .order("day_number");

      if (daysError) {
        console.error('Erro ao buscar leituras diárias:', daysError);
      }

      console.log('Detalhes do plano encontrados:', planDetails);
      console.log('Leituras diárias encontradas:', planDays);

      // Transformar dados para o formato esperado
      const readings: ReadingPlanDay[] = planDays?.map(day => ({
        day: day.day_number,
        title: day.title,
        passage: day.passage,
        content: day.content
      })) || [];

      const plan: ReadingPlan = {
        id: planDetails.plan_id,
        title: planDetails.title,
        image: planDetails.image_url || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
        category: planDetails.category,
        description: planDetails.description || "",
        author: planDetails.author || "",
        duration: planDetails.duration || "",
        readings
      };

      return plan;
    },
    enabled: !!planId,
  });
};
