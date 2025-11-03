import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Download, Users, Calendar, RefreshCw, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useToast } from "@/hooks/use-toast";
import jsPDF from "jspdf";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";

interface Inscription {
  id: string;
  full_name: string;
  address: string;
  email: string;
  phone: string;
  participant_type: "encontrista" | "trabalhador";
  created_at: string;
  updated_at: string;
}

export default function EventInscriptions() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data: inscriptions, isLoading, refetch } = useQuery({
    queryKey: ["event_inscriptions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("event_inscriptions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Inscription[];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("event_inscriptions")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event_inscriptions"] });
      toast({
        title: "Inscrição excluída",
        description: "A inscrição foi removida com sucesso.",
      });
      setDeleteId(null);
    },
    onError: (error) => {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a inscrição. Tente novamente.",
        variant: "destructive",
      });
      console.error("Delete error:", error);
    },
  });

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const generatePDF = () => {
    if (!inscriptions || inscriptions.length === 0) {
      toast({
        title: "Nenhuma inscrição encontrada",
        description: "Não há inscrições para gerar o PDF.",
        variant: "destructive",
      });
      return;
    }

    // Separar por tipo
    const encontristas = inscriptions.filter(i => i.participant_type === "encontrista");
    const trabalhadores = inscriptions.filter(i => i.participant_type === "trabalhador");

    const doc = new jsPDF();
    
    // Título
    doc.setFontSize(20);
    doc.text("Inscrições - Encontro com Deus", 20, 30);
    doc.setFontSize(14);
    doc.text("08 e 09 de Novembro de 2024", 20, 45);
    
    // Data de geração
    doc.setFontSize(10);
    doc.text(`Gerado em: ${format(new Date(), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 20, 55);
    
    // Estatísticas
    doc.setFontSize(12);
    doc.text(`Total de inscrições: ${inscriptions.length}`, 20, 70);
    doc.text(`Encontristas: ${encontristas.length}`, 20, 78);
    doc.text(`Trabalhadores: ${trabalhadores.length}`, 20, 86);
    
    let yPosition = 100;
    
    // === SEÇÃO ENCONTRISTAS ===
    if (encontristas.length > 0) {
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text("ENCONTRISTAS", 20, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 15;
      
      // Cabeçalhos
      doc.setFontSize(10);
      doc.text("Nome", 20, yPosition);
      doc.text("Email", 80, yPosition);
      doc.text("Telefone", 140, yPosition);
      doc.text("Data", 180, yPosition);
      yPosition += 5;
      doc.line(20, yPosition, 200, yPosition);
      yPosition += 5;
      
      // Dados dos encontristas
      encontristas.forEach((inscription) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 30;
          
          doc.setFontSize(10);
          doc.text("Nome", 20, yPosition);
          doc.text("Email", 80, yPosition);
          doc.text("Telefone", 140, yPosition);
          doc.text("Data", 180, yPosition);
          yPosition += 5;
          doc.line(20, yPosition, 200, yPosition);
          yPosition += 5;
        }
        
        doc.setFontSize(8);
        const name = inscription.full_name.length > 25 ? inscription.full_name.substring(0, 22) + "..." : inscription.full_name;
        const email = inscription.email.length > 20 ? inscription.email.substring(0, 17) + "..." : inscription.email;
        const phone = inscription.phone;
        const date = format(new Date(inscription.created_at), "dd/MM/yy", { locale: ptBR });
        
        doc.text(name, 20, yPosition);
        doc.text(email, 80, yPosition);
        doc.text(phone, 140, yPosition);
        doc.text(date, 180, yPosition);
        yPosition += 8;
      });
      
      yPosition += 15;
    }
    
    // === SEÇÃO TRABALHADORES ===
    if (trabalhadores.length > 0) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 30;
      }
      
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text("TRABALHADORES", 20, yPosition);
      doc.setFont(undefined, 'normal');
      yPosition += 15;
      
      // Cabeçalhos
      doc.setFontSize(10);
      doc.text("Nome", 20, yPosition);
      doc.text("Email", 80, yPosition);
      doc.text("Telefone", 140, yPosition);
      doc.text("Data", 180, yPosition);
      yPosition += 5;
      doc.line(20, yPosition, 200, yPosition);
      yPosition += 5;
      
      // Dados dos trabalhadores
      trabalhadores.forEach((inscription) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 30;
          
          doc.setFontSize(10);
          doc.text("Nome", 20, yPosition);
          doc.text("Email", 80, yPosition);
          doc.text("Telefone", 140, yPosition);
          doc.text("Data", 180, yPosition);
          yPosition += 5;
          doc.line(20, yPosition, 200, yPosition);
          yPosition += 5;
        }
        
        doc.setFontSize(8);
        const name = inscription.full_name.length > 25 ? inscription.full_name.substring(0, 22) + "..." : inscription.full_name;
        const email = inscription.email.length > 20 ? inscription.email.substring(0, 17) + "..." : inscription.email;
        const phone = inscription.phone;
        const date = format(new Date(inscription.created_at), "dd/MM/yy", { locale: ptBR });
        
        doc.text(name, 20, yPosition);
        doc.text(email, 80, yPosition);
        doc.text(phone, 140, yPosition);
        doc.text(date, 180, yPosition);
        yPosition += 8;
      });
    }
    
    // Adicionar página com detalhes completos dos Encontristas
    if (encontristas.length > 0) {
      doc.addPage();
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text("Detalhes Completos - ENCONTRISTAS", 20, 30);
      doc.setFont(undefined, 'normal');
      
      yPosition = 50;
      
      encontristas.forEach((inscription, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }
        
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${inscription.full_name}`, 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.text(`Email: ${inscription.email}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Telefone: ${inscription.phone}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Endereço: ${inscription.address}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Data de inscrição: ${format(new Date(inscription.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 25, yPosition);
        yPosition += 15;
      });
    }
    
    // Adicionar página com detalhes completos dos Trabalhadores
    if (trabalhadores.length > 0) {
      doc.addPage();
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text("Detalhes Completos - TRABALHADORES", 20, 30);
      doc.setFont(undefined, 'normal');
      
      yPosition = 50;
      
      trabalhadores.forEach((inscription, index) => {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }
        
        doc.setFontSize(12);
        doc.text(`${index + 1}. ${inscription.full_name}`, 20, yPosition);
        yPosition += 10;
        
        doc.setFontSize(10);
        doc.text(`Email: ${inscription.email}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Telefone: ${inscription.phone}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Endereço: ${inscription.address}`, 25, yPosition);
        yPosition += 7;
        doc.text(`Data de inscrição: ${format(new Date(inscription.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`, 25, yPosition);
        yPosition += 15;
      });
    }
    
    doc.save(`inscricoes-encontro-com-deus-${format(new Date(), "dd-MM-yyyy")}.pdf`);
    
    toast({
      title: "PDF gerado com sucesso!",
      description: "O arquivo foi baixado para seu computador.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Inscrições - Encontro com Deus</h1>
          <p className="text-muted-foreground">08 e 09 de Novembro de 2024</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => refetch()} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={generatePDF} variant="default" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Baixar PDF
          </Button>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Inscrições</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inscriptions?.length || 0}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Encontristas</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inscriptions?.filter(i => i.participant_type === "encontrista").length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trabalhadores</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inscriptions?.filter(i => i.participant_type === "trabalhador").length || 0}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Última Inscrição</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {inscriptions && inscriptions.length > 0
                ? format(new Date(inscriptions[0].created_at), "dd/MM/yyyy", { locale: ptBR })
                : "Nenhuma"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabela de Inscrições */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Inscrições</CardTitle>
          <CardDescription>
            Todas as inscrições para o Encontro com Deus
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">Carregando inscrições...</div>
          ) : !inscriptions || inscriptions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhuma inscrição encontrada
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Data de Inscrição</TableHead>
                    <TableHead className="text-right">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inscriptions.map((inscription) => (
                    <TableRow key={inscription.id}>
                      <TableCell className="font-medium">
                        {inscription.full_name}
                      </TableCell>
                      <TableCell>
                        <Badge variant={inscription.participant_type === "trabalhador" ? "default" : "secondary"}>
                          {inscription.participant_type === "trabalhador" ? "Trabalhador" : "Encontrista"}
                        </Badge>
                      </TableCell>
                      <TableCell>{inscription.email}</TableCell>
                      <TableCell>{inscription.phone}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {inscription.address}
                      </TableCell>
                      <TableCell>
                        {format(new Date(inscription.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </TableCell>
                      <TableCell className="text-right">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                              <AlertDialogDescription>
                                Tem certeza que deseja excluir a inscrição de{" "}
                                <strong>{inscription.full_name}</strong>? Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(inscription.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}