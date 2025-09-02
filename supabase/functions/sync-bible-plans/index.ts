
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

    // Planos bíblicos com imagens válidas e únicas
    const biblePlans = [
      {
        plan_id: 1,
        title: 'Pais de Fé: Criando Filhos que Conhecem a Deus',
        image_url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=2070&auto=format&fit=crop',
        category: 'Pais',
        description: 'Um plano de 7 dias para pais que desejam criar filhos que conhecem e amam a Deus.',
        author: 'Dr. Tony Evans',
        duration: '7 dias',
        order_position: 1
      },
      {
        plan_id: 2,
        title: 'Família Abençoada: Princípios Bíblicos',
        image_url: 'https://images.unsplash.com/photo-1606731834810-fb8f8adfd0e8?q=80&w=2071&auto=format&fit=crop',
        category: 'Pais',
        description: 'Descubra como aplicar princípios bíblicos para construir uma família forte e unida.',
        author: 'Joyce Meyer',
        duration: '14 dias',
        order_position: 2
      },
      {
        plan_id: 3,
        title: 'Educando com Amor e Disciplina',
        image_url: 'https://images.unsplash.com/photo-1544717684-d73c53d7df48?q=80&w=2069&auto=format&fit=crop',
        category: 'Pais',
        description: 'Aprenda a equilibrar amor e disciplina na educação dos seus filhos conforme a Palavra.',
        author: 'James Dobson',
        duration: '10 dias',
        order_position: 3
      },
      {
        plan_id: 4,
        title: 'Primeiros Passos na Fé Cristã',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2074&auto=format&fit=crop',
        category: 'Novo na Fé',
        description: 'Um guia essencial para quem está começando sua jornada com Cristo.',
        author: 'Rick Warren',
        duration: '21 dias',
        order_position: 4
      },
      {
        plan_id: 5,
        title: 'Fundamentos da Vida Cristã',
        image_url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
        category: 'Novo na Fé',
        description: 'Construa uma base sólida para sua caminhada cristã com verdades fundamentais.',
        author: 'Billy Graham',
        duration: '14 dias',
        order_position: 5
      },
      {
        plan_id: 6,
        title: 'Conhecendo Jesus Pessoalmente',
        image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?q=80&w=2125&auto=format&fit=crop',
        category: 'Novo na Fé',
        description: 'Desenvolva um relacionamento pessoal e profundo com Jesus Cristo.',
        author: 'Max Lucado',
        duration: '7 dias',
        order_position: 6
      },
      {
        plan_id: 7,
        title: 'Jovens de Propósito: Descobrindo Seu Chamado',
        image_url: 'https://images.unsplash.com/photo-1529390079861-591de354faf5?q=80&w=2070&auto=format&fit=crop',
        category: 'Juventude',
        description: 'Descubra o propósito de Deus para sua vida e como viver com significado.',
        author: 'Nick Vujicic',
        duration: '21 dias',
        order_position: 7
      },
      {
        plan_id: 8,
        title: 'Pureza e Santidade na Juventude',
        image_url: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=2070&auto=format&fit=crop',
        category: 'Juventude',
        description: 'Aprenda a viver uma vida de pureza e santidade em meio aos desafios da juventude.',
        author: 'Sean McDowell',
        duration: '14 dias',
        order_position: 8
      },
      {
        plan_id: 9,
        title: 'Liderança Cristã para Jovens',
        image_url: 'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=2070&auto=format&fit=crop',
        category: 'Juventude',
        description: 'Desenvolva habilidades de liderança baseadas em princípios bíblicos.',
        author: 'John Maxwell',
        duration: '10 dias',
        order_position: 9
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
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    );
  }
});
