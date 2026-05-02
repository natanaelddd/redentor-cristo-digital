import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BibleVersePopup } from "@/components/BibleVersePopup";
import { quizLessons } from "@/data/quizLessons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, ChevronRight, ChevronLeft, User, Send, CheckCircle } from "lucide-react";

export default function QuizPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const lesson = selectedLesson !== null ? quizLessons.find(l => l.number === selectedLesson) : null;

  const handleConfirmName = () => {
    if (studentName.trim().length < 3) {
      toast({ title: "Nome obrigatório", description: "Por favor, insira seu nome completo.", variant: "destructive" });
      return;
    }
    setNameConfirmed(true);
  };

  const handleAnswerChange = (questionId: number, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    if (!lesson) return;

    const unanswered = lesson.questions.filter(q => !answers[q.id]?.trim());
    if (unanswered.length > 0) {
      toast({ title: "Responda todas as perguntas", description: `Faltam ${unanswered.length} pergunta(s) sem resposta.`, variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    try {
      const formattedAnswers = lesson.questions.map(q => ({
        questionId: q.id,
        question: q.question,
        answer: answers[q.id] || "",
        bibleRef: q.bibleRef?.reference || ""
      }));

      const { error } = await supabase.from("quiz_submissions").insert({
        student_name: studentName.trim(),
        lesson_number: lesson.number,
        lesson_title: lesson.title,
        answers: formattedAnswers,
        total_questions: lesson.questions.length,
      });

      if (error) throw error;

      setSubmitted(true);
      toast({ title: "Respostas enviadas!", description: "Suas respostas foram salvas com sucesso." });
    } catch (err: any) {
      toast({ title: "Erro ao enviar", description: err.message, variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedLesson(null);
    setAnswers({});
    setSubmitted(false);
  };

  // Success screen
  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header navLinks={[]} logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />
        <main className="flex-grow flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center">
            <CardContent className="pt-8 pb-8 space-y-4">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
              <h2 className="text-2xl font-bold">Respostas Enviadas!</h2>
              <p className="text-muted-foreground">
                Obrigado, <strong>{studentName}</strong>! Suas respostas da lição "<strong>{lesson?.title}</strong>" foram enviadas com sucesso.
              </p>
              <div className="flex flex-col gap-2 pt-4">
                <Button onClick={handleReset}>Responder outra lição</Button>
                <Button variant="outline" onClick={() => navigate("/")}>Voltar ao início</Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header navLinks={[]} logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        {/* Step 1: Name */}
        {!nameConfirmed && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl">Questionário Bíblico</CardTitle>
              <p className="text-muted-foreground mt-2">
                Antes de começar, informe seu nome completo
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" /> Nome Completo
                </label>
                <Input
                  placeholder="Ex: João da Silva"
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleConfirmName()}
                />
              </div>
              <Button className="w-full" onClick={handleConfirmName}>
                Continuar <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Select Lesson */}
        {nameConfirmed && !selectedLesson && (
          <div className="space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold">Olá, {studentName}!</h1>
              <p className="text-muted-foreground mt-1">Escolha uma lição para responder o questionário</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quizLessons.map(l => (
                <Card
                  key={l.number}
                  className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary"
                  onClick={() => setSelectedLesson(l.number)}
                >
                  <CardContent className="p-4 flex items-center gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold text-lg shrink-0">
                      {l.number}
                    </div>
                    <div>
                      <h3 className="font-semibold">{l.title}</h3>
                      <p className="text-xs text-muted-foreground">{l.questions.length} perguntas</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground ml-auto" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Answer Questions */}
        {nameConfirmed && lesson && !submitted && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setSelectedLesson(null); setAnswers({}); }}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
            </div>

            <div className="text-center">
              <h1 className="text-2xl font-bold">Lição {lesson.number} — {lesson.title}</h1>
              <p className="text-muted-foreground text-sm mt-1">
                Respondendo como: <strong>{studentName}</strong>
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                💡 Clique nos links bíblicos para ler o versículo antes de responder
              </p>
            </div>

            <div className="space-y-5">
              {lesson.questions.map((q, idx) => (
                <Card key={q.id} className="overflow-hidden">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex gap-3">
                      <span className="bg-primary text-primary-foreground rounded-full h-7 w-7 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div className="space-y-2 flex-1">
                        <p className="font-medium">{q.question}</p>
                        {q.bibleRef && <BibleVersePopup bibleRef={q.bibleRef} />}
                        <Textarea
                          placeholder="Digite sua resposta aqui..."
                          value={answers[q.id] || ""}
                          onChange={e => handleAnswerChange(q.id, e.target.value)}
                          rows={3}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center pb-8">
              <Button size="lg" onClick={handleSubmit} disabled={isSubmitting} className="min-w-[200px]">
                {isSubmitting ? "Enviando..." : (
                  <>
                    <Send className="h-4 w-4 mr-2" /> Enviar Respostas
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
