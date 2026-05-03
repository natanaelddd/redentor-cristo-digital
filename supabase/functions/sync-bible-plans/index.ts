
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log('Iniciando sincronização de planos do Bible.com...');

    // Limpar planos existentes
    const { error: deleteError } = await supabaseClient
      .from('reading_plan_details')
      .delete()
      .neq('id', 0);

    if (deleteError) {
      console.error('Erro ao limpar planos existentes:', deleteError);
    }

    const { error: deleteReadingsError } = await supabaseClient
      .from('reading_plan_days')
      .delete()
      .neq('id', 0);

    if (deleteReadingsError) {
      console.error('Erro ao limpar leituras existentes:', deleteReadingsError);
    }

    // Planos reais do Bible.com organizados por categoria
    const biblePlans = [
      // === PAIS (Família) ===
      {
        plan_id: 1,
        title: 'Relacionamentos Familiares Moldados pela Fé',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/70364/1280x720.jpg',
        category: 'Pais',
        description: 'A família é um dos maiores presentes de Deus ao ser humano. Reflita sobre princípios que fortalecem o casamento, a criação dos filhos e a convivência no lar.',
        author: 'Medita na Palavra',
        duration: '16 dias',
        order_position: 1,
        link_url: 'https://www.bible.com/pt/reading-plans/70364-relacionamentos-familiares-moldados-pela-fe'
      },
      {
        plan_id: 2,
        title: 'Como Ter Uma Família Inseparável',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/59941/1280x720.jpg',
        category: 'Pais',
        description: 'Em dias em que as famílias têm sido atacadas constantemente, ter uma família inseparável não é impossível, mas requer de cada um de nós um pequeno esforço.',
        author: 'Robson Carlos Ferreira',
        duration: '3 dias',
        order_position: 2,
        link_url: 'https://www.bible.com/pt/reading-plans/59941-como-ter-uma-familia-inseparavel'
      },
      {
        plan_id: 3,
        title: 'Como Ajudar Seu Milenial a Retornar à Fé',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/4260/1280x720.jpg',
        category: 'Pais',
        description: 'Orientações práticas e bíblicas para pais que desejam ajudar seus filhos a redescobrirem a fé cristã.',
        author: 'Life.Church',
        duration: '5 dias',
        order_position: 3,
        link_url: 'https://www.bible.com/pt/reading-plans/4260-how-to-help-your-millennial-return-to-faith'
      },

      // === NOVO NA FÉ ===
      {
        plan_id: 4,
        title: 'Começando um Relacionamento com Jesus',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/1594/1280x720.jpg',
        category: 'Novo na Fé',
        description: 'É um recém-convertido? Quer entender mais sobre o Cristianismo? Então este é o plano certo para você. Extraído do livro "Start Here".',
        author: 'David Dwight & Nicole Unice',
        duration: '7 dias',
        order_position: 4,
        link_url: 'https://www.bible.com/pt/reading-plans/1594-beginning-a-relationship-with-jesus'
      },
      {
        plan_id: 5,
        title: 'Quem é Jesus?',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/9242/1280x720.jpg',
        category: 'Novo na Fé',
        description: 'Jesus é a figura central da fé cristã. Analise mais profundamente quem Ele é: perdoador de pecados, amigo, a luz, operador de milagres, Senhor ressuscitado.',
        author: 'Alpha',
        duration: '5 dias',
        order_position: 5,
        link_url: 'https://www.bible.com/pt/reading-plans/9242-who-is-jesus'
      },
      {
        plan_id: 6,
        title: 'O Plano de Deus para sua Vida',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/1597/1280x720.jpg',
        category: 'Novo na Fé',
        description: 'Deus diz: "Você pode escolher o quanto eu abençoo sua vida. Você crê, e eu o farei." Junte-se ao Pastor Rick nesta série sobre acreditar e ser fiel ao sonho de Deus.',
        author: 'Rick Warren',
        duration: '19 dias',
        order_position: 6,
        link_url: 'https://www.bible.com/pt/reading-plans/1597-gods-dream-for-your-life'
      },

      // === JUVENTUDE ===
      {
        plan_id: 7,
        title: 'Como Compartilhar Sua Fé',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/2881/1280x720.jpg',
        category: 'Juventude',
        description: 'Quer ganhar coragem para compartilhar sua fé e aprender como fazer isso sem parecer estranho? Esse Plano é para você.',
        author: 'Life.Church Switch',
        duration: '7 dias',
        order_position: 7,
        link_url: 'https://www.bible.com/pt/reading-plans/2881-how-to-share-your-faith'
      },
      {
        plan_id: 8,
        title: 'Ansiedade, Medo, Preocupação e Jesus',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/47586/1280x720.jpg',
        category: 'Juventude',
        description: 'No meio de suas crises, conheça um Deus que recebe suas ansiedades, expulsa o medo e o convida a não se preocupar. Jesus é a resposta!',
        author: 'João Marcus Fontenelli',
        duration: '9 dias',
        order_position: 8,
        link_url: 'https://www.bible.com/pt/reading-plans/47586-ansiedade-medo-preocupacao-e-jesus'
      },
      {
        plan_id: 9,
        title: 'BibleProject | Encontrando Deus no Deserto',
        image_url: 'https://imageproxy.youversionapi.com/https://s3.amazonaws.com/yvplans/66786/1280x720.jpg',
        category: 'Juventude',
        description: 'Uma terra desolada que se torna um lugar de teste, preparação e restauração. Pense sobre o tema bíblico do deserto nesta jornada.',
        author: 'BibleProject',
        duration: '7 dias',
        order_position: 9,
        link_url: 'https://www.bible.com/pt/reading-plans/66786-bibleproject-encontrando-deus-no-deserto'
      }
    ];

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

    // Atualizar timestamp
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
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro na sincronização:', error);
    const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
    return new Response(
      JSON.stringify({ success: false, error: errorMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
