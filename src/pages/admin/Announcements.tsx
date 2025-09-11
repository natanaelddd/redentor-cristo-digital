import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Loader2, Plus, Edit, Trash2, Megaphone, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EventAnnouncement {
  id: string;
  title: string;
  message: string;
  type: string;
  link_url?: string;
  link_text?: string;
  background_color: string;
  text_color: string;
  is_active: boolean;
  start_date?: string;
  end_date?: string;
  order_position: number;
  created_at: string;
  updated_at: string;
}

export default function AnnouncementsAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingAnnouncement, setEditingAnnouncement] = useState<EventAnnouncement | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const { data: announcements, isLoading } = useQuery({
    queryKey: ['admin_announcements'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('event_announcements')
        .select('*')
        .order('order_position', { ascending: true });

      if (error) throw error;
      return data as EventAnnouncement[];
    }
  });

  const createAnnouncementMutation = useMutation({
    mutationFn: async (announcement: Omit<EventAnnouncement, 'id' | 'created_at' | 'updated_at'>) => {
      const { error } = await supabase
        .from('event_announcements')
        .insert([announcement]);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Aviso criado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['admin_announcements'] });
      setIsCreating(false);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao criar aviso: " + error.message,
        variant: "destructive",
      });
    }
  });

  const updateAnnouncementMutation = useMutation({
    mutationFn: async (announcement: Partial<EventAnnouncement> & { id: string }) => {
      const { error } = await supabase
        .from('event_announcements')
        .update(announcement)
        .eq('id', announcement.id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Aviso atualizado com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['admin_announcements'] });
      setEditingAnnouncement(null);
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao atualizar aviso: " + error.message,
        variant: "destructive",
      });
    }
  });

  const deleteAnnouncementMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('event_announcements')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Sucesso",
        description: "Aviso excluído com sucesso",
      });
      queryClient.invalidateQueries({ queryKey: ['admin_announcements'] });
    },
    onError: (error) => {
      toast({
        title: "Erro",
        description: "Falha ao excluir aviso: " + error.message,
        variant: "destructive",
      });
    }
  });

  const handleToggleActive = (announcement: EventAnnouncement) => {
    updateAnnouncementMutation.mutate({
      id: announcement.id,
      is_active: !announcement.is_active
    });
  };

  const handleSaveAnnouncement = (formData: FormData, isEdit: boolean = false) => {
    const announcementData = {
      title: formData.get('title') as string,
      message: formData.get('message') as string,
      type: formData.get('type') as string,
      link_url: formData.get('link_url') as string || null,
      link_text: formData.get('link_text') as string || null,
      background_color: formData.get('background_color') as string,
      text_color: formData.get('text_color') as string,
      start_date: formData.get('start_date') as string || null,
      end_date: formData.get('end_date') as string || null,
      order_position: parseInt(formData.get('order_position') as string) || 0,
      is_active: formData.get('is_active') === 'on',
    };

    if (isEdit && editingAnnouncement) {
      updateAnnouncementMutation.mutate({
        id: editingAnnouncement.id,
        ...announcementData
      });
    } else {
      createAnnouncementMutation.mutate(announcementData);
    }
  };

  const AnnouncementForm = ({ announcement }: { announcement?: EventAnnouncement }) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSaveAnnouncement(new FormData(e.currentTarget), !!announcement);
      }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <Input name="title" defaultValue={announcement?.title} required />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Mensagem</label>
        <Textarea name="message" defaultValue={announcement?.message} required />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Tipo</label>
        <Select name="type" defaultValue={announcement?.type || 'info'}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="info">Informativo</SelectItem>
            <SelectItem value="warning">Aviso</SelectItem>
            <SelectItem value="success">Sucesso</SelectItem>
            <SelectItem value="error">Erro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Cor de Fundo</label>
          <Input 
            name="background_color" 
            type="color" 
            defaultValue={announcement?.background_color || '#3b82f6'} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Cor do Texto</label>
          <Input 
            name="text_color" 
            type="color" 
            defaultValue={announcement?.text_color || '#ffffff'} 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Link (opcional)</label>
        <Input name="link_url" type="url" defaultValue={announcement?.link_url || ''} />
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Texto do Link</label>
        <Input name="link_text" defaultValue={announcement?.link_text || 'Saiba mais'} />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Data de Início</label>
          <Input 
            name="start_date" 
            type="datetime-local" 
            defaultValue={announcement?.start_date ? new Date(announcement.start_date).toISOString().slice(0, 16) : ''} 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Data de Fim</label>
          <Input 
            name="end_date" 
            type="datetime-local" 
            defaultValue={announcement?.end_date ? new Date(announcement.end_date).toISOString().slice(0, 16) : ''} 
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium mb-1">Posição (ordem de exibição)</label>
        <Input 
          name="order_position" 
          type="number" 
          defaultValue={announcement?.order_position || 0} 
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <input 
          type="checkbox" 
          name="is_active" 
          id="is_active" 
          defaultChecked={announcement?.is_active ?? true} 
          className="rounded"
        />
        <label htmlFor="is_active" className="text-sm font-medium">Ativo</label>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button type="button" variant="outline" onClick={() => {
          setEditingAnnouncement(null);
          setIsCreating(false);
        }}>
          Cancelar
        </Button>
        <Button type="submit">
          {announcement ? 'Atualizar' : 'Criar'}
        </Button>
      </div>
    </form>
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Carregando avisos...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">Avisos de Eventos</h1>
          <p className="text-muted-foreground">Gerencie os avisos e banners que aparecem no site</p>
        </div>
        
        <Dialog open={isCreating} onOpenChange={setIsCreating}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Novo Aviso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Novo Aviso</DialogTitle>
            </DialogHeader>
            <AnnouncementForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {announcements?.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="flex items-center space-x-3">
                <Megaphone className="h-5 w-5" />
                <CardTitle className="text-lg">{announcement.title}</CardTitle>
                {announcement.is_active ? (
                  <Eye className="h-4 w-4 text-green-500" />
                ) : (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  checked={announcement.is_active}
                  onCheckedChange={() => handleToggleActive(announcement)}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingAnnouncement(announcement)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteAnnouncementMutation.mutate(announcement.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div 
                className="p-3 rounded-md mb-3"
                style={{ 
                  backgroundColor: announcement.background_color,
                  color: announcement.text_color 
                }}
              >
                <p className="font-medium">{announcement.message}</p>
                {announcement.link_url && (
                  <a 
                    href={announcement.link_url} 
                    className="underline hover:no-underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {announcement.link_text}
                  </a>
                )}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium">Tipo:</span> {announcement.type}
                </div>
                <div>
                  <span className="font-medium">Posição:</span> {announcement.order_position}
                </div>
                <div>
                  <span className="font-medium">Início:</span> {
                    announcement.start_date 
                      ? new Date(announcement.start_date).toLocaleDateString() 
                      : 'Sempre'
                  }
                </div>
                <div>
                  <span className="font-medium">Fim:</span> {
                    announcement.end_date 
                      ? new Date(announcement.end_date).toLocaleDateString() 
                      : 'Sempre'
                  }
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal de Edição */}
      {editingAnnouncement && (
        <Dialog open={!!editingAnnouncement} onOpenChange={() => setEditingAnnouncement(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Editar Aviso</DialogTitle>
            </DialogHeader>
            <AnnouncementForm announcement={editingAnnouncement} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}