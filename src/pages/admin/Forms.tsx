import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Eye, Edit, Trash2, Settings, BarChart3 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface EventForm {
  id: string;
  name: string;
  description: string;
  slug: string;
  is_active: boolean;
  registration_count: number;
  max_registrations: number;
  created_at: string;
}

const FormsAdmin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: forms, isLoading } = useQuery({
    queryKey: ['event_forms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_forms')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as EventForm[];
    }
  });

  const deleteFormMutation = useMutation({
    mutationFn: async (formId: string) => {
      const { error } = await supabase
        .from('event_forms')
        .delete()
        .eq('id', formId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Formulário deletado com sucesso!');
      queryClient.invalidateQueries({ queryKey: ['event_forms'] });
    },
    onError: (error) => {
      toast.error('Erro ao deletar formulário: ' + error.message);
    }
  });

  const toggleActiveMutation = useMutation({
    mutationFn: async ({ formId, isActive }: { formId: string; isActive: boolean }) => {
      const { error } = await supabase
        .from('event_forms')
        .update({ 
          is_active: !isActive,
          updated_at: new Date().toISOString()
        })
        .eq('id', formId);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success('Status do formulário atualizado!');
      queryClient.invalidateQueries({ queryKey: ['event_forms'] });
    },
    onError: (error) => {
      console.error('Erro ao ativar/desativar formulário:', error);
      toast.error('Erro ao atualizar status: ' + error.message);
    }
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Formulários de Eventos</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded"></div>
                  <div className="h-4 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Formulários de Eventos</h1>
          <p className="text-muted-foreground">
            Gerencie formulários de inscrição para eventos da igreja
          </p>
        </div>
        <Button 
          onClick={() => navigate('/admin/forms/new')}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Criar Formulário
        </Button>
      </div>

      {forms && forms.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
              <Plus className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Nenhum formulário criado</h3>
            <p className="text-muted-foreground mb-4">
              Comece criando seu primeiro formulário de evento
            </p>
            <Button onClick={() => navigate('/admin/forms/new')}>
              Criar Primeiro Formulário
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms?.map((form) => (
          <Card key={form.id} className="relative group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{form.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {form.description || 'Sem descrição'}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={form.is_active ? 'default' : 'secondary'}>
                    {form.is_active ? 'Ativo' : 'Inativo'}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Inscrições:</span>
                  <span className="font-medium">
                    {form.registration_count}
                    {form.max_registrations && ` / ${form.max_registrations}`}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">URL:</span>
                  <span className="font-mono text-xs">/evento/{form.slug}</span>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => navigate(`/admin/forms/${form.id}/builder`)}
                  >
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/forms/${form.id}/registrations`)}
                  >
                    <BarChart3 className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => window.open(`/evento/${form.slug}`, '_blank')}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/admin/forms/${form.id}/settings`)}
                  >
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex gap-2">
                  <Button 
                    variant={form.is_active ? 'destructive' : 'default'}
                    size="sm"
                    className="flex-1"
                    onClick={() => toggleActiveMutation.mutate({ 
                      formId: form.id, 
                      isActive: form.is_active 
                    })}
                    disabled={toggleActiveMutation.isPending}
                  >
                    {form.is_active ? 'Desativar' : 'Ativar'}
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      if (confirm('Tem certeza que deseja deletar este formulário?')) {
                        deleteFormMutation.mutate(form.id);
                      }
                    }}
                    disabled={deleteFormMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FormsAdmin;