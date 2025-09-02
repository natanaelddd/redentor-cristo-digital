import { supabase } from "@/integrations/supabase/client";

export const syncBiblePlans = async () => {
  try {
    console.log('Iniciando sincronização dos planos bíblicos...');
    
    const { data, error } = await supabase.functions.invoke('sync-bible-plans', {
      body: { action: 'sync' }
    });

    if (error) {
      console.error('Erro na função sync-bible-plans:', error);
      throw error;
    }

    console.log('Sincronização concluída:', data);
    
    return {
      success: true,
      plansSynced: data?.plansSynced || 0,
      message: data?.message || 'Planos sincronizados com sucesso'
    };
  } catch (error) {
    console.error('Erro ao sincronizar planos:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido'
    };
  }
};