import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Link, MoveUp, MoveDown } from "lucide-react";
import { toast } from "sonner";

interface NavigationLink {
  id: string;
  title: string;
  href: string;
  order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export default function NavigationAdmin() {
  const [editingLink, setEditingLink] = useState<NavigationLink | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: links, isLoading } = useQuery({
    queryKey: ["admin-navigation"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("navigation_links")
        .select("*")
        .order("order");
      
      if (error) throw error;
      return data as NavigationLink[];
    },
  });

  const createLinkMutation = useMutation({
    mutationFn: async (link: Omit<NavigationLink, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("navigation_links")
        .insert([link])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-navigation"] });
      toast.success("Link criado com sucesso!");
      setIsDialogOpen(false);
      setEditingLink(null);
    },
    onError: (error) => {
      toast.error("Erro ao criar link: " + error.message);
    },
  });

  const updateLinkMutation = useMutation({
    mutationFn: async (link: NavigationLink) => {
      const { data, error } = await supabase
        .from("navigation_links")
        .update({
          title: link.title,
          href: link.href,
          order: link.order,
          is_active: link.is_active
        })
        .eq("id", link.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-navigation"] });
      toast.success("Link atualizado com sucesso!");
      setIsDialogOpen(false);
      setEditingLink(null);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar link: " + error.message);
    },
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("navigation_links")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-navigation"] });
      toast.success("Link excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir link: " + error.message);
    },
  });

  const updateOrderMutation = useMutation({
    mutationFn: async ({ id, newOrder }: { id: string; newOrder: number }) => {
      const { error } = await supabase
        .from("navigation_links")
        .update({ order: newOrder })
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-navigation"] });
    },
    onError: (error) => {
      toast.error("Erro ao reordenar link: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const linkData = {
      title: formData.get("title") as string,
      href: formData.get("href") as string,
      order: parseInt(formData.get("order") as string),
      is_active: formData.get("is_active") === "on",
    };

    if (editingLink) {
      updateLinkMutation.mutate({ 
        ...linkData, 
        id: editingLink.id,
        created_at: editingLink.created_at,
        updated_at: editingLink.updated_at
      });
    } else {
      createLinkMutation.mutate(linkData);
    }
  };

  const moveLink = (id: string, direction: "up" | "down") => {
    const link = links?.find(l => l.id === id);
    if (!link || !links) return;

    const newOrder = direction === "up" ? link.order - 1 : link.order + 1;
    updateOrderMutation.mutate({ id, newOrder });
  };

  const openDialog = (link?: NavigationLink) => {
    setEditingLink(link || null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Navegação</h1>
          <p className="text-muted-foreground">
            Gerencie os links de navegação do site
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Link
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingLink ? "Editar Link" : "Novo Link"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Título</Label>
                  <Input
                    id="title"
                    name="title"
                    defaultValue={editingLink?.title || ""}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="order">Ordem</Label>
                  <Input
                    id="order"
                    name="order"
                    type="number"
                    defaultValue={editingLink?.order || links?.length + 1 || 1}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="href">URL</Label>
                <Input
                  id="href"
                  name="href"
                  defaultValue={editingLink?.href || ""}
                  placeholder="Ex: /sobre, #eventos, https://exemplo.com"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_active"
                  name="is_active"
                  defaultChecked={editingLink?.is_active ?? true}
                />
                <Label htmlFor="is_active">Link ativo</Label>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingLink ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {links?.map((link) => (
          <Card key={link.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="h-5 w-5" />
                    {link.title}
                    <Badge variant={link.is_active ? "default" : "secondary"}>
                      {link.is_active ? "Ativo" : "Inativo"}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{link.href}</CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveLink(link.id, "up")}
                    disabled={link.order === 1}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => moveLink(link.id, "down")}
                    disabled={link.order === links.length}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(link)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteLinkMutation.mutate(link.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Ordem: {link.order}
                </span>
                <span className="text-sm text-muted-foreground">
                  Atualizado: {new Date(link.updated_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {(!links || links.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum link encontrado. Clique em "Novo Link" para criar o primeiro.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}