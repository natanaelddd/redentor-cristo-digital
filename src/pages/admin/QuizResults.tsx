import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, BookOpen, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface SubmissionAnswer {
  questionId: number;
  question: string;
  answer: string;
  bibleRef: string;
}

export default function QuizResults() {
  const { data: submissions, isLoading } = useQuery({
    queryKey: ["quiz_submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("quiz_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <p className="p-4">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Questionários Bíblicos</h1>
        <p className="text-muted-foreground">Respostas enviadas pelos alunos</p>
      </div>

      {!submissions?.length ? (
        <Card><CardContent className="py-8 text-center text-muted-foreground">Nenhuma resposta recebida ainda.</CardContent></Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Aluno</TableHead>
                  <TableHead>Lição</TableHead>
                  <TableHead>Perguntas</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        {sub.student_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        Lição {sub.lesson_number} — {sub.lesson_title}
                      </Badge>
                    </TableCell>
                    <TableCell>{sub.total_questions}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(sub.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" /> Ver Respostas
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                              <BookOpen className="h-5 w-5" />
                              Respostas de {sub.student_name}
                            </DialogTitle>
                            <p className="text-sm text-muted-foreground">
                              Lição {sub.lesson_number} — {sub.lesson_title} | {format(new Date(sub.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
                            </p>
                          </DialogHeader>
                          <div className="space-y-4 mt-4">
                            {(sub.answers as unknown as SubmissionAnswer[])?.map((a, idx) => (
                              <div key={idx} className="border rounded-lg p-4 space-y-2">
                                <div className="flex items-start gap-2">
                                  <span className="bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold shrink-0">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <p className="font-medium text-sm">{a.question}</p>
                                    {a.bibleRef && (
                                      <p className="text-xs text-blue-600">📖 {a.bibleRef}</p>
                                    )}
                                  </div>
                                </div>
                                <div className="bg-green-50 border border-green-200 rounded p-3 ml-8">
                                  <p className="text-sm">{a.answer}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
