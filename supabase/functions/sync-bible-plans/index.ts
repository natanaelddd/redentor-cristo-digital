
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

    // Simular busca de planos do Bible.com (em produção, você faria scraping real)
    const biblePlans = [
      {
        plan_id: 10,
        title: 'Oração: Uma Conversa com Deus',
        image_url: '/lovable-uploads/850f1e45-963d-4719-a2ac-7ba152fd8f99.png',
        category: 'Oração',
        description: 'Aprenda a desenvolver uma vida de oração profunda e transformadora.',
        author: 'Max Lucado',
        duration: '7 dias',
        order_position: 10
      },
      {
        plan_id: 11,
        title: 'Fundamentos da Fé Cristã',
        image_url: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop',
        category: 'Novo na Fé',
        description: 'Construa uma base sólida para sua caminhada cristã.',
        author: 'John MacArthur',
        duration: '14 dias',
        order_position: 11
      },
      {
        plan_id: 12,
        title: 'Vivendo em Comunidade',
        image_url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop',
        category: 'Juventude',
        description: 'Descubra o poder da comunhão cristã autêntica.',
        author: 'Dietrich Bonhoeffer',
        duration: '10 dias',
        order_position: 12
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

    // Adicionar leituras diárias para o plano de oração
    const prayerReadings = [
      {
        plan_id: 10,
        day_number: 1,
        title: 'O Convite para Orar',
        passage: 'Mateus 6:9-13',
        content: 'Jesus nos ensina como orar através do Pai Nosso. Esta não é apenas uma oração para repetir, mas um modelo de como nos comunicarmos com Deus.'
      },
      {
        plan_id: 10,
        day_number: 2,
        title: 'Oração com Fé',
        passage: 'Marcos 11:24',
        content: 'A fé é essencial na oração. Quando oramos, devemos crer que Deus nos ouve e responderá conforme Sua vontade perfeita.'
      },
      {
        plan_id: 10,
        day_number: 3,
        title: 'Perseverança na Oração',
        passage: 'Lucas 18:1-8',
        content: 'Jesus nos ensina sobre a importância de persistir em oração. Não devemos desanimar, mas continuar buscando a Deus.'
      }
    ];

    for (const reading of prayerReadings) {
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
