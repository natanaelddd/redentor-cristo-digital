
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ReadingPlan {
  id: number;
  plan_id: number;
  title: string;
  image_url: string;
  category: string;
  description: string;
  author: string;
  duration: string;
  is_active: boolean;
  order_position: number;
}

export const AdminPanel = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingPlan, setEditingPlan] = useState<ReadingPlan | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: plans, isLoading } = useQuery({
    queryKey: ['admin_reading_plans'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reading_plan_details')
        .select('*')
        .order('order_position');

      if (error) throw error;
      return data;
    }
  });

  const syncBiblePlansMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke('sync-bible-plans');
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Planos sincronizados com Bible.com",
      });
      queryClient.invalidateQueries({ queryKey: ['admin_reading_plans'] });
      queryClient.invalidateQueries({ queryKey: ['reading_plans'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha na sincronização: " + error.message,
        variant: "destructive",
      });
    }
  });

  const updatePlanMutation = useMutation({
    mutationFn: async (plan: Partial<ReadingPlan>) => {
      const { error } = await supabase
        .from('reading_plan_details')
        .update(plan)
        .eq('id', plan.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Plano atualizado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['admin_reading_plans'] });
      queryClient.invalidateQueries({ queryKey: ['reading_plans'] });
      setEditingPlan(null);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar: " + error.message,
        variant: "destructive",
      });
    }
  });

  const deletePlanMutation = useMutation({
    mutationFn: async (planId: number) => {
      const { error } = await supabase
        .from('reading_plan_details')
        .delete()
        .eq('id', planId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Plano excluído com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['admin_reading_plans'] });
      queryClient.invalidateQueries({ queryKey: ['reading_plans'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao excluir: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleToggleActive = (plan: ReadingPlan) => {
    updatePlanMutation.mutate({
      id: plan.id,
      is_active: !plan.is_active
    });
  };

  const handleSavePlan = (formData: FormData) => {
    const updatedPlan = {
      id: editingPlan?.id,
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      author: formData.get('author') as string,
      duration: formData.get('duration') as string,
      category: formData.get('category') as string,
      image_url: formData.get('image_url') as string,
    };

    updatePlanMutation.mutate(updatedPlan);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando painel administrativo...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">Gerencie os planos de leitura bíblica</p>
      </div>

      <Tabs defaultValue="plans" className="space-y-6">
        <TabsList>
          <TabsTrigger value="plans">Planos de Leitura</TabsTrigger>
          <TabsTrigger value="sync">Sincronização</TabsTrigger>
        </TabsList>

        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Planos de Leitura</h2>
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Plano
            </Button>
          </div>

          <div className="grid gap-4">
            {plans?.map((plan) => (
              <Card key={plan.id}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={plan.is_active}
                      onCheckedChange={() => handleToggleActive(plan)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingPlan(plan)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deletePlanMutation.mutate(plan.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Categoria:</span> {plan.category}
                    </div>
                    <div>
                      <span className="font-medium">Autor:</span> {plan.author}
                    </div>
                    <div>
                      <span className="font-medium">Duração:</span> {plan.duration}
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {plan.is_active ? 'Ativo' : 'Inativo'}
                    </div>
                  </div>
                  <p className="text-gray-600 mt-2">{plan.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sync">
          <Card>
            <CardHeader>
              <CardTitle>Sincronização com Bible.com</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-gray-600">
                Sincronize automaticamente novos planos de leitura do Bible.com
              </p>
              <Button
                onClick={() => syncBiblePlansMutation.mutate()}
                disabled={syncBiblePlansMutation.isPending}
              >
                {syncBiblePlansMutation.isPending ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4 mr-2" />
                )}
                Sincronizar Agora
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Modal de Edição */}
      {editingPlan && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-lg">
            <CardHeader>
              <CardTitle>Editar Plano</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSavePlan(new FormData(e.currentTarget));
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium mb-1">Título</label>
                  <Input name="title" defaultValue={editingPlan.title} required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <Textarea name="description" defaultValue={editingPlan.description} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Autor</label>
                  <Input name="author" defaultValue={editingPlan.author} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Duração</label>
                  <Input name="duration" defaultValue={editingPlan.duration} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <Input name="category" defaultValue={editingPlan.category} />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL da Imagem</label>
                  <Input name="image_url" defaultValue={editingPlan.image_url} />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingPlan(null)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit" disabled={updatePlanMutation.isPending}>
                    {updatePlanMutation.isPending ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : null}
                    Salvar
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};
