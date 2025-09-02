import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, FileText } from "lucide-react";
import { toast } from "sonner";

interface SiteContent {
  id: string;
  section_key: string;
  content_value?: string;
  created_at: string;
  updated_at: string;
}

export default function ContentAdmin() {
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: contents, isLoading } = useQuery({
    queryKey: ["admin-content"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("site_content")
        .select("*")
        .order("section_key");
      
      if (error) throw error;
      return data as SiteContent[];
    },
  });

  const createContentMutation = useMutation({
    mutationFn: async (content: { section_key: string; content_value: string }) => {
      const { data, error } = await supabase
        .from("site_content")
        .insert([content])
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast.success("Conteúdo criado com sucesso!");
      setIsDialogOpen(false);
      setEditingContent(null);
    },
    onError: (error) => {
      toast.error("Erro ao criar conteúdo: " + error.message);
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: async (content: { id: string; section_key: string; content_value: string }) => {
      const { data, error } = await supabase
        .from("site_content")
        .update({ section_key: content.section_key, content_value: content.content_value })
        .eq("id", content.id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast.success("Conteúdo atualizado com sucesso!");
      setIsDialogOpen(false);
      setEditingContent(null);
    },
    onError: (error) => {
      toast.error("Erro ao atualizar conteúdo: " + error.message);
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("site_content")
        .delete()
        .eq("id", id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-content"] });
      toast.success("Conteúdo excluído com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir conteúdo: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const contentData = {
      section_key: formData.get("section_key") as string,
      content_value: formData.get("content_value") as string,
    };

    if (editingContent) {
      updateContentMutation.mutate({ ...contentData, id: editingContent.id });
    } else {
      createContentMutation.mutate(contentData);
    }
  };

  const openDialog = (content?: SiteContent) => {
    setEditingContent(content || null);
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Conteúdo do Site</h1>
          <p className="text-muted-foreground">
            Gerencie os textos e informações do site
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => openDialog()}>
              <Plus className="h-4 w-4 mr-2" />
              Novo Conteúdo
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>
                {editingContent ? "Editar Conteúdo" : "Novo Conteúdo"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="section_key">Chave da Seção</Label>
                <Input
                  id="section_key"
                  name="section_key"
                  defaultValue={editingContent?.section_key || ""}
                  placeholder="Ex: hero_title, about_description"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="content_value">Conteúdo</Label>
                <Textarea
                  id="content_value"
                  name="content_value"
                  defaultValue={editingContent?.content_value || ""}
                  rows={6}
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit">
                  {editingContent ? "Atualizar" : "Criar"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {contents?.map((content) => (
          <Card key={content.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    {content.section_key}
                  </CardTitle>
                  <CardDescription>
                    Atualizado em: {new Date(content.updated_at).toLocaleString('pt-BR')}
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDialog(content)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => deleteContentMutation.mutate(content.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {content.content_value?.substring(0, 200)}
                {content.content_value && content.content_value.length > 200 && "..."}
              </p>
            </CardContent>
          </Card>
        ))}
        
        {(!contents || contents.length === 0) && (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-muted-foreground">
                Nenhum conteúdo encontrado. Clique em "Novo Conteúdo" para criar o primeiro.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}