
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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

    console.log('Iniciando sincronização de planos do Bible.com...');

    // Primeiro, limpar todos os planos existentes
    const { error: deleteError } = await supabaseClient
      .from('reading_plan_details')
      .delete()
      .neq('id', 0); // Delete all records

    if (deleteError) {
      console.error('Erro ao limpar planos existentes:', deleteError);
    } else {
      console.log('Planos existentes removidos com sucesso');
    }

    // Limpar leituras diárias existentes
    const { error: deleteReadingsError } = await supabaseClient
      .from('reading_plan_days')
      .delete()
      .neq('id', 0); // Delete all records

    if (deleteReadingsError) {
      console.error('Erro ao limpar leituras existentes:', deleteReadingsError);
    } else {
      console.log('Leituras existentes removidas com sucesso');
    }

    // Novos planos bíblicos com imagens cristãs únicas
    const biblePlans = [
      {
        plan_id: 1,
        title: 'Ensinar os Filhos',
        image_url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop',
        category: 'Pais',
        description: 'Aprenda os princípios bíblicos para ensinar e guiar seus filhos na fé.',
        author: 'John MacArthur',
        duration: '15 dias',
        order_position: 1
      },
      {
        plan_id: 2,
        title: 'Família Cristã',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop',
        category: 'Pais',
        description: 'Construa uma família sólida baseada nos valores cristãos.',
        author: 'Charles Stanley',
        duration: '21 dias',
        order_position: 2
      },
      {
        plan_id: 3,
        title: 'Primeiros Passos na Fé',
        image_url: 'https://images.unsplash.com/photo-1445116572660-236099ec97a0?q=80&w=2071&auto=format&fit=crop',
        category: 'Novo na Fé',
        description: 'Um guia para quem está começando sua jornada cristã.',
        author: 'R.A. Torrey',
        duration: '14 dias',
        order_position: 3
      },
      {
        plan_id: 4,
        title: 'Fundamentos da Bíblia',
        image_url: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2086&auto=format&fit=crop',
        category: 'Novo na Fé',
        description: 'Conheça os fundamentos essenciais da fé cristã.',
        author: 'Derek Kidner',
        duration: '30 dias',
        order_position: 4
      },
      {
        plan_id: 5,
        title: 'Propósito na Juventude',
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
        category: 'Juventude',
        description: 'Descubra o propósito de Deus para sua vida jovem.',
        author: 'John Newton',
        duration: '10 dias',
        order_position: 5
      },
      {
        plan_id: 6,
        title: 'Jovens de Fé',
        image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2125&auto=format&fit=crop',
        category: 'Juventude',
        description: 'Fortaleça sua fé e identidade em Cristo na juventude.',
        author: 'Max Lucado',
        duration: '7 dias',
        order_position: 6
      }
    ];

    // Inserir ou atualizar planos
    for (const plan of biblePlans) {
      const { error: upsertError } = await supabaseClient
        .from('reading_plan_details')
        .upsert(plan, { 
          onConflict: 'plan_id',
          ignoreDuplicates: false 
        });

      if (upsertError) {
        console.error('Erro ao inserir plano:', upsertError);
      } else {
        console.log('Plano sincronizado:', plan.title);
      }
    }

    // Adicionar leituras diárias para alguns planos
    const planReadings = [
      // Plano 1: Pais de Fé
      {
        plan_id: 1,
        day_number: 1,
        title: 'O Coração do Pai',
        passage: 'Deuteronômio 6:4-9',
        content: 'Como pais, somos chamados a ensinar nossos filhos sobre Deus não apenas com palavras, mas com nosso exemplo de vida.'
      },
      {
        plan_id: 1,
        day_number: 2,
        title: 'Disciplina com Amor',
        passage: 'Provérbios 22:6',
        content: 'A disciplina não é punição, mas direcionamento amoroso que ajuda nossos filhos a crescer no caminho correto.'
      },
      // Plano 4: Primeiros Passos
      {
        plan_id: 4,
        day_number: 1,
        title: 'O Amor de Deus',
        passage: 'João 3:16',
        content: 'Comece sua jornada cristã entendendo o imenso amor que Deus tem por você.'
      },
      {
        plan_id: 4,
        day_number: 2,
        title: 'Nova Criatura',
        passage: '2 Coríntios 5:17',
        content: 'Quando você aceita Jesus, torna-se uma nova criatura. As coisas antigas já passaram.'
      },
      // Plano 7: Jovens de Propósito
      {
        plan_id: 7,
        day_number: 1,
        title: 'Criado com Propósito',
        passage: 'Jeremias 29:11',
        content: 'Deus tem planos específicos para sua vida. Descubra o propósito para o qual você foi criado.'
      },
      {
        plan_id: 7,
        day_number: 2,
        title: 'Chamado para Grandeza',
        passage: 'Efésios 2:10',
        content: 'Você é obra de Deus, criado para boas obras que Ele preparou de antemão.'
      }
    ];

    for (const reading of planReadings) {
      const { error } = await supabaseClient
        .from('reading_plan_days')
        .upsert(reading, { 
          onConflict: 'plan_id,day_number',
          ignoreDuplicates: false 
        });

      if (error) {
        console.error('Erro ao inserir leitura:', error);
      }
    }

    // Atualizar timestamp da última sincronização
    const { error: updateError } = await supabaseClient
      .from('site_content')
      .upsert({
        section_key: 'last_bible_sync',
        content_value: new Date().toISOString()
      }, { onConflict: 'section_key' });

    if (updateError) {
      console.error('Erro ao atualizar timestamp:', updateError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Planos sincronizados com sucesso',
        synced_plans: biblePlans.length 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Erro na sincronização:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
