import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";

interface Event {
  id: string;
  title: string;
  description?: string;
  day_of_week?: string;
  time?: string;
  image_url?: string;
  is_active: boolean;
  order: number;
}

export default function EventsAdmin() {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: events, isLoading } = useQuery({
    queryKey: ["admin-events"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("order");
      
      if (error) throw error;
      return data as Event[];
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (event: Omit<Event, "id">) => {
      const { data, error } = await supabase
        .from("events")
        .insert([event])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Evento criado com sucesso!");
      setIsDialogOpen(false);
      setEditingEvent(null);
    },
    onError: (error) => {
      toast.error("Erro ao criar evento: " + error.message);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async (event: Event) => {
      const { data, error } = await supabase
        .from("events")
        .update(event)
        .eq("id", event.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Evento atualizado com sucesso!");
      setIsDialogOpen(false);
      setEditingEvent(null);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar evento: " + error.message);
    },
  });

  const deleteEventMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-events"] });
      toast.success("Evento excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir evento: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const eventData = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      day_of_week: formData.get("day_of_week") as string,
      time: formData.get("time") as string,
      image_url: formData.get("image_url") as string || null,
      order: parseInt(formData.get("order") as string),
      is_active: formData.get("is_active") === "on",
    };

    if (editingEvent) {
      updateEventMutation.mutate({ ...eventData, id: editingEvent.id });
    } else {
      createEventMutation.mutate(eventData);
    }
  };

  const openDialog = (event?: Event) => {
    setEditingEvent(event || null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Eventos</h1>
          <p className="text-muted-foreground">
            Gerencie os eventos da igreja
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Evento
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingEvent ? "Editar Evento" : "Novo Evento"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingEvent?.title || ""}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    defaultValue={editingEvent?.order || events?.length + 1 || 1}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingEvent?.description || ""}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="day_of_week">Dia da Semana</Label>
                  <Input
                    id="day_of_week"
                    name="day_of_week"
                    defaultValue={editingEvent?.day_of_week || ""}
                    placeholder="Ex: Domingo"
                  />
                </div>
                <div>
                  <Label htmlFor="time">Horário</Label>
                  <Input
                    id="time"
                    name="time"
                    defaultValue={editingEvent?.time || ""}
                    placeholder="Ex: 19:00"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="image_url">URL da Imagem (opcional)</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  defaultValue={editingEvent?.image_url || ""}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingEvent?.is_active ?? true}
                />
                <Label htmlFor="is_active">Evento ativo</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingEvent ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {events?.map((event) => (
          <Card key={event.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    {event.title}
                    <Badge variant={event.is_active ? "default" : "secondary"}>
                      {event.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {event.day_of_week && event.time && `${event.day_of_week} às ${event.time}`}
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteEventMutation.mutate(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {event.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Ordem: {event.order}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {(!events || events.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum evento encontrado. Clique em "Novo Evento" para criar o primeiro.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}