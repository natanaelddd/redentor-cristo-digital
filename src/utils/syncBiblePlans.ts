import { supabase } from "@/integrations/supabase/client";

export const syncBiblePlans = async () => {
  try {
    const { data, error } = await supabase.functions.invoke('sync-bible-plans');
    
    if (error) {
      console.error('Erro ao sincronizar planos:', error);
      return { success: false, error };
    }
    
    console.log('Planos sincronizados com sucesso:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Erro na função de sincronização:', error);
    return { success: false, error };
  }
};