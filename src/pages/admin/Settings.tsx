import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Save, Database, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { syncBiblePlans } from "@/utils/syncBiblePlans";
import { clearBrowserCache } from "@/utils/cacheUtils";

interface AdminSetting {
  id: string;
  setting_key: string;
  setting_value?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function SettingsAdmin() {
  const queryClient = useQueryClient();
  const [isSyncing, setIsSyncing] = useState(false);

  const { data: settings, isLoading } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("admin_settings")
        .select("*")
        .order("setting_key");
      
      if (error) throw error;
      return data as AdminSetting[];
    },
  });

  const updateSettingMutation = useMutation({
    mutationFn: async ({ key, value }: { key: string; value: string }) => {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user?.id) throw new Error("Usuário não autenticado");

      const { data, error } = await supabase
        .from("admin_settings")
        .upsert({
          setting_key: key,
          setting_value: value,
          user_id: session.session.user.id
        }, { 
          onConflict: 'setting_key,user_id' 
        })
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-settings"] });
      toast.success("Configuração salva com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao salvar configuração: " + error.message);
    },
  });

  const handleSyncBiblePlans = async () => {
    setIsSyncing(true);
    try {
      const result = await syncBiblePlans();
      if (result.success) {
        toast.success("Planos sincronizados com sucesso!");
        queryClient.invalidateQueries({ queryKey: ["reading_plans"] });
        queryClient.invalidateQueries({ queryKey: ["admin_reading_plans"] });
      } else {
        toast.error("Erro na sincronização: " + result.error);
      }
    } catch (error) {
      toast.error("Erro inesperado na sincronização");
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Salvar configurações gerais
    const siteTitle = formData.get("site_title") as string;
    const siteDescription = formData.get("site_description") as string;
    const contactEmail = formData.get("contact_email") as string;
    const contactPhone = formData.get("contact_phone") as string;

    // Executar todas as atualizações
    Promise.all([
      updateSettingMutation.mutateAsync({ key: "site_title", value: siteTitle }),
      updateSettingMutation.mutateAsync({ key: "site_description", value: siteDescription }),
      updateSettingMutation.mutateAsync({ key: "contact_email", value: contactEmail }),
      updateSettingMutation.mutateAsync({ key: "contact_phone", value: contactPhone }),
    ]).then(() => {
      toast.success("Todas as configurações foram salvas!");
    }).catch(() => {
      toast.error("Erro ao salvar algumas configurações");
    });
  };

  const getSetting = (key: string) => {
    return settings?.find(s => s.setting_key === key)?.setting_value || "";
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Configurações</h1>
        <p className="text-muted-foreground">
          Configure as opções gerais do sistema
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Configurações Gerais */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações Gerais
            </CardTitle>
            <CardDescription>
              Informações básicas do site e da igreja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="site_title">Título do Site</Label>
                <Input
                  id="site_title"
                  name="site_title"
                  defaultValue={getSetting("site_title")}
                  placeholder="Igreja Missionária Cristo Redentor"
                />
              </div>
              
              <div>
                <Label htmlFor="site_description">Descrição do Site</Label>
                <Textarea
                  id="site_description"
                  name="site_description"
                  defaultValue={getSetting("site_description")}
                  placeholder="Uma igreja comprometida com o amor de Cristo..."
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="contact_email">Email de Contato</Label>
                <Input
                  id="contact_email"
                  name="contact_email"
                  type="email"
                  defaultValue={getSetting("contact_email")}
                  placeholder="contato@igreja.com"
                />
              </div>
              
              <div>
                <Label htmlFor="contact_phone">Telefone de Contato</Label>
                <Input
                  id="contact_phone"
                  name="contact_phone"
                  defaultValue={getSetting("contact_phone")}
                  placeholder="(11) 9999-9999"
                />
              </div>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configurações
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Controle de Funcionalidades */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Controle de Funcionalidades
            </CardTitle>
            <CardDescription>
              Ativar ou desativar funcionalidades do site
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const eventRegistrationEnabled = formData.get("event_registration_enabled") === "on" ? "true" : "false";
              
              updateSettingMutation.mutateAsync({ 
                key: "event_registration_enabled", 
                value: eventRegistrationEnabled 
              });
            }} className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="event_registration_enabled"
                  name="event_registration_enabled"
                  defaultChecked={getSetting("event_registration_enabled") === "true"}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="event_registration_enabled" className="text-sm font-medium">
                  Habilitar sistema de agendamento de eventos
                </Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Quando ativado, exibe a barra de evento especial na página inicial com link para agendamento. Desative para remover completamente da página inicial.
              </p>
              
              <Button type="submit" className="w-full">
                <Save className="h-4 w-4 mr-2" />
                Salvar Configuração de Eventos
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Operações do Sistema */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Operações do Sistema
            </CardTitle>
            <CardDescription>
              Ferramentas para manutenção e sincronização
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Sincronização de Dados</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Sincronize os planos de leitura bíblica com a base de dados mais recente.
              </p>
              <Button 
                onClick={handleSyncBiblePlans}
                disabled={isSyncing}
                className="w-full"
              >
                {isSyncing ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Sincronizando...
                  </>
                ) : (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Sincronizar Planos de Leitura
                  </>
                )}
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Limpeza de Cache</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Limpe o cache do navegador para resolver problemas de carregamento.
              </p>
              <Button 
                onClick={() => {
                  if (clearBrowserCache()) {
                    toast.success("Cache limpo com sucesso! Recarregue a página.");
                  } else {
                    toast.error("Erro ao limpar cache");
                  }
                }}
                variant="outline"
                className="w-full"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Limpar Cache do Navegador
              </Button>
            </div>

            <div>
              <h4 className="font-medium mb-2">Estatísticas do Sistema</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Configurações salvas:</span>
                  <span className="font-medium">{settings?.length || 0}</span>
                </div>
                <div className="flex justify-between">
                  <span>Última sincronização:</span>
                  <span className="font-medium">
                    {getSetting("last_bible_sync") 
                      ? new Date(getSetting("last_bible_sync")).toLocaleString('pt-BR')
                      : "Nunca"
                    }
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Configurações Avançadas */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações Salvas</CardTitle>
          <CardDescription>
            Todas as configurações atualmente salvas no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {settings?.map((setting) => (
              <div key={setting.id} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                <span className="font-medium">{setting.setting_key}</span>
                <span className="text-sm text-muted-foreground truncate max-w-xs">
                  {setting.setting_value}
                </span>
              </div>
            ))}
            {(!settings || settings.length === 0) && (
              <p className="text-muted-foreground text-center py-4">
                Nenhuma configuração encontrada
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}