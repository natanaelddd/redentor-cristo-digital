import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Iniciando sincronização dos planos bíblicos...');
    
    // Limpar dados existentes
    await supabaseClient.from('reading_plan_details').delete().neq('id', 0);
    await supabaseClient.from('reading_plan_days').delete().neq('id', 0);
    
    console.log('Dados existentes removidos');

    // Dados dos planos bíblicos
    const biblePlans = [
      {
        plan_id: 1,
        title: "Novo Testamento em 90 Dias",
        category: "Cronológico",
        description: "Leia todo o Novo Testamento em apenas 90 dias com este plano estruturado.",
        author: "YouVersion",
        duration: "90 dias",
        image_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop",
        is_active: true,
        order_position: 1
      },
      {
        plan_id: 2,
        title: "Salmos de Louvor",
        category: "Devocional",
        description: "Uma jornada através dos Salmos para fortalecer sua vida de oração e louvor.",
        author: "Life.Church",
        duration: "30 dias",
        image_url: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop",
        is_active: true,
        order_position: 2
      },
      {
        plan_id: 3,
        title: "Evangelho de João",
        category: "Livro",
        description: "Explore o Evangelho de João e descubra o amor de Jesus de uma forma profunda.",
        author: "Zondervan",
        duration: "21 dias",
        image_url: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2128&auto=format&fit=crop",
        is_active: true,
        order_position: 3
      },
      {
        plan_id: 4,
        title: "Sabedoria de Provérbios",
        category: "Temático",
        description: "Descubra a sabedoria prática de Deus através do livro de Provérbios.",
        author: "Joyce Meyer",
        duration: "31 dias",
        image_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2070&auto=format&fit=crop",
        is_active: true,
        order_position: 4
      },
      {
        plan_id: 5,
        title: "Paz em Tempos Difíceis",
        category: "Tópico",
        description: "Encontre paz e esperança nas promessas de Deus durante momentos desafiadores.",
        author: "Rick Warren",
        duration: "14 dias",
        image_url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop",
        is_active: true,
        order_position: 5
      }
    ];

    // Inserir planos
    const { error: plansError } = await supabaseClient
      .from('reading_plan_details')
      .upsert(biblePlans, { 
        onConflict: 'plan_id',
        ignoreDuplicates: false 
      });

    if (plansError) {
      console.error('Erro ao inserir planos:', plansError);
      throw plansError;
    }

    console.log(`${biblePlans.length} planos inseridos com sucesso`);

    // Dados das leituras diárias (exemplo para alguns planos)
    const planReadings = [
      // Novo Testamento em 90 Dias - Primeiros 5 dias
      { plan_id: 1, day_number: 1, title: "O Verbo se fez carne", passage: "João 1:1-18", content: "No princípio era o Verbo, e o Verbo estava com Deus, e o Verbo era Deus. Reflita sobre a divindade de Jesus Cristo e sua encarnação." },
      { plan_id: 1, day_number: 2, title: "Jesus chama os primeiros discípulos", passage: "João 1:19-51", content: "Veja como Jesus chamou seus primeiros discípulos e como eles responderam ao seu chamado." },
      { plan_id: 1, day_number: 3, title: "As bodas de Caná", passage: "João 2:1-25", content: "O primeiro milagre de Jesus revela sua glória e o início de seu ministério público." },
      { plan_id: 1, day_number: 4, title: "Jesus e Nicodemos", passage: "João 3:1-21", content: "O diálogo com Nicodemos revela a necessidade do novo nascimento espiritual." },
      { plan_id: 1, day_number: 5, title: "Jesus e a mulher samaritana", passage: "João 4:1-42", content: "Jesus quebra barreiras culturais para oferecer água viva à mulher samaritana." },

      // Salmos de Louvor - Primeiros 5 dias
      { plan_id: 2, day_number: 1, title: "Bem-aventurado o homem", passage: "Salmo 1", content: "O Salmo 1 contrasta o caminho do justo com o caminho dos ímpios. Medite na importância de se deleitar na lei do Senhor." },
      { plan_id: 2, day_number: 2, title: "O Senhor é meu pastor", passage: "Salmo 23", content: "Um dos salmos mais conhecidos, que fala sobre o cuidado e proteção de Deus como nosso pastor." },
      { plan_id: 2, day_number: 3, title: "Louvai ao Senhor", passage: "Salmo 100", content: "Um salmo de louvor que nos convida a entrar na presença de Deus com alegria e gratidão." },
      { plan_id: 2, day_number: 4, title: "Sede de Deus", passage: "Salmo 42", content: "A alma sedenta busca por Deus como a corça busca correntes de águas." },
      { plan_id: 2, day_number: 5, title: "Refúgio e fortaleza", passage: "Salmo 46", content: "Deus é nosso refúgio e fortaleza, socorro bem presente nas tribulações." },

      // Evangelho de João - Primeiros 5 dias
      { plan_id: 3, day_number: 1, title: "O Verbo eterno", passage: "João 1:1-18", content: "João apresenta Jesus como o Verbo eterno que se fez carne para habitar entre nós." },
      { plan_id: 3, day_number: 2, title: "O testemunho de João Batista", passage: "João 1:19-34", content: "João Batista testifica sobre Jesus como o Cordeiro de Deus que tira o pecado do mundo." },
      { plan_id: 3, day_number: 3, title: "Os primeiros discípulos", passage: "João 1:35-51", content: "Jesus chama seus primeiros discípulos, incluindo Pedro, André, Filipe e Natanael." },
      { plan_id: 3, day_number: 4, title: "O primeiro sinal", passage: "João 2:1-11", content: "Jesus transforma água em vinho nas bodas de Caná, revelando sua glória." },
      { plan_id: 3, day_number: 5, title: "Purificação do templo", passage: "João 2:12-25", content: "Jesus purifica o templo, mostrando zelo pela casa de seu Pai." }
    ];

    // Inserir leituras diárias
    const { error: readingsError } = await supabaseClient
      .from('reading_plan_days')
      .upsert(planReadings, { 
        onConflict: 'plan_id,day_number',
        ignoreDuplicates: false 
      });

    if (readingsError) {
      console.error('Erro ao inserir leituras:', readingsError);
      throw readingsError;
    }

    console.log(`${planReadings.length} leituras diárias inseridas com sucesso`);

    // Atualizar timestamp da última sincronização
    const { error: timestampError } = await supabaseClient
      .from('site_content')
      .upsert({ 
        section_key: 'last_bible_sync', 
        content_value: new Date().toISOString() 
      }, { 
        onConflict: 'section_key',
        ignoreDuplicates: false 
      });

    if (timestampError) {
      console.error('Erro ao atualizar timestamp:', timestampError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Planos bíblicos sincronizados com sucesso!',
        plansSynced: biblePlans.length
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Erro na sincronização:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Erro interno do servidor' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})