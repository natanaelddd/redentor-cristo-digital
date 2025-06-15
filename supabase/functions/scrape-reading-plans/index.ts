
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (_req) => {
  if (_req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const response = await fetch('https://www.bible.com/pt/reading-plans');
    if (!response.ok) {
      throw new Error(`Failed to fetch page: ${response.statusText}`);
    }
    const html = await response.text();
    const doc = new DOMParser().parseFromString(html, 'text/html');
    
    if (!doc) {
      throw new Error("Failed to parse HTML");
    }

    const plans: any[] = [];
    const planElements = doc.querySelectorAll('div.grid a[href^="/reading-plans/"]');

    planElements.forEach(element => {
      const href = element.getAttribute('href');
      if (!href) return;

      const planUrl = `https://www.bible.com${href}`;
      
      const titleElement = element.querySelector('h3');
      const descriptionElement = element.querySelector('p');
      const imageElement = element.querySelector('img');

      const title = titleElement ? titleElement.textContent.trim() : '';
      const description = descriptionElement ? descriptionElement.textContent.trim() : '';
      const imageUrl = imageElement ? imageElement.getAttribute('src') : null;

      if (title && planUrl) {
        plans.push({
          title,
          description,
          image_url: imageUrl,
          plan_url: planUrl,
        });
      }
    });

    if (plans.length > 0) {
      const { error } = await supabaseAdmin
        .from('reading_plans')
        .upsert(plans, { onConflict: 'plan_url', ignoreDuplicates: false });

      if (error) {
        console.error('Supabase upsert error:', error);
        throw error;
      }
    }

    return new Response(JSON.stringify({ message: `Successfully scraped and upserted ${plans.length} plans.` }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    });
  }
});
