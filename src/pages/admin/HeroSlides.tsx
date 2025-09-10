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
import { Plus, Edit, Trash2, MoveUp, MoveDown } from "lucide-react";
import { toast } from "sonner";

interface HeroSlide {
  id: string;
  category: string;
  title: string;
  description: string | null;
  button_text: string;
  order: number;
  is_active: boolean;
  image_url?: string | null;
}

export default function HeroSlidesAdmin() {
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: slides, isLoading } = useQuery({
    queryKey: ["admin-hero-slides"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("church_hero_slides")
        .select("*")
        .order("order");
      
      if (error) throw error;
      return data as HeroSlide[];
    },
  });

  const createSlideMutation = useMutation({
    mutationFn: async (slide: Omit<HeroSlide, "id">) => {
      const { data, error } = await supabase
        .from("church_hero_slides")
        .insert([slide])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      toast.success("Slide criado com sucesso!");
      setIsDialogOpen(false);
      setEditingSlide(null);
    },
    onError: (error) => {
      toast.error("Erro ao criar slide: " + error.message);
    },
  });

  const updateSlideMutation = useMutation({
    mutationFn: async (slide: HeroSlide) => {
      const { data, error } = await supabase
        .from("church_hero_slides")
        .update(slide)
        .eq("id", slide.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      toast.success("Slide atualizado com sucesso!");
      setIsDialogOpen(false);
      setEditingSlide(null);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar slide: " + error.message);
    },
  });

  const deleteSlideMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("church_hero_slides")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
      toast.success("Slide excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir slide: " + error.message);
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase
        .from("church_hero_slides")
        .update({ order: newOrder })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-hero-slides"] });
    },
    onError: (error) => {
      toast.error("Erro ao reordenar slide: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const slideData = {
      category: formData.get("category") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      button_text: formData.get("button_text") as string,
      order: parseInt(formData.get("order") as string),
      is_active: formData.get("is_active") === "on",
      image_url: formData.get("image_url") as string || null,
    };

    if (editingSlide) {
      updateSlideMutation.mutate({ ...slideData, id: editingSlide.id });
    } else {
      createSlideMutation.mutate(slideData);
    }
  };

  const moveSlide = (id: string, direction: "up" | "down") => {
    const slide = slides?.find(s => s.id === id);
    if (!slide || !slides) return;

    const newOrder = direction === "up" ? slide.order - 1 : slide.order + 1;
    updateOrderMutation.mutate({ id, newOrder });
  };

  const openDialog = (slide?: HeroSlide) => {
    setEditingSlide(slide || null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Hero Slides</h1>
          <p className="text-muted-foreground">
            Gerencie os slides do banner principal do site
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Slide
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingSlide ? "Editar Slide" : "Novo Slide"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Categoria</Label>
                  <Input
                    id="category"
                    name="category"
                    defaultValue={editingSlide?.category || ""}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    defaultValue={editingSlide?.order || slides?.length + 1 || 1}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  name="title"
                  defaultValue={editingSlide?.title || ""}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={editingSlide?.description || ""}
                  rows={3}
                />
              </div>
              
              <div>
                <Label htmlFor="button_text">Texto do Botão</Label>
                <Input
                  id="button_text"
                  name="button_text"
                  defaultValue={editingSlide?.button_text || ""}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="image_url">URL da Imagem (opcional)</Label>
                <Input
                  id="image_url"
                  name="image_url"
                  type="url"
                  defaultValue={editingSlide?.image_url || ""}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingSlide?.is_active ?? true}
                />
                <Label htmlFor="is_active">Slide ativo</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingSlide ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {slides?.map((slide) => (
          <Card key={slide.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {slide.title}
                    <Badge variant={slide.is_active ? "default" : "secondary"}>
                      {slide.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{slide.category}</CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveSlide(slide.id, "up")}
                    disabled={slide.order === 1}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveSlide(slide.id, "down")}
                    disabled={slide.order === slides.length}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(slide)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteSlideMutation.mutate(slide.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-2">
                {slide.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm">Botão: {slide.button_text}</span>
                <span className="text-sm text-muted-foreground">
                  Ordem: {slide.order}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {(!slides || slides.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum slide encontrado. Clique em "Novo Slide" para criar o primeiro.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}