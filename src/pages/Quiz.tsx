import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BibleVersePopup } from "@/components/BibleVersePopup";
import { quizLessons } from "@/data/quizLessons";
import { lessonContents } from "@/data/lessonContents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, ChevronRight, ChevronLeft, User, Send, CheckCircle, FileText } from "lucide-react";

type Step = "name" | "selectLesson" | "reading" | "quiz";

export default function QuizPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [step, setStep] = useState<Step>("name");
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const lesson = selectedLessonNumber !== null ? quizLessons.find(l => l.number === selectedLessonNumber) : null;
  const lessonContent = selectedLessonNumber !== null ? lessonContents.find(l => l.number === selectedLessonNumber) : null;

  const handleConfirmName = () => {
    if (studentName.trim().length < 3) {
      toast({ title: "Nome obrigatório", description: "Por favor, insira seu nome completo.", variant: "destructive" });
      return;
    }
    setStep("selectLesson");
  };

  const handleSelectLesson = (num: number) => {
    setSelectedLessonNumber(num);
    setStep("reading");
    window.scrollTo(0, 0);
  };

  const handleStartQuiz = () => {
    setStep("quiz");
    window.scrollTo(0, 0);
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
    setSelectedLessonNumber(null);
    setAnswers({});
    setSubmitted(false);
    setStep("selectLesson");
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
        {step === "name" && (
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <BookOpen className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-2xl">Curso Preparatório para Batismo</CardTitle>
              <p className="text-muted-foreground mt-2">
                Igreja Missionária do Cristo Redentor
              </p>
              <p className="text-sm text-muted-foreground">
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
        {step === "selectLesson" && (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Curso Preparatório para Batismo</p>
              <h1 className="text-2xl font-bold">Olá, {studentName}!</h1>
              <p className="text-muted-foreground mt-1">Escolha uma lição para ler e responder o questionário</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {quizLessons.map(l => (
                <Card
                  key={l.number}
                  className="cursor-pointer hover:shadow-md transition-shadow hover:border-primary"
                  onClick={() => handleSelectLesson(l.number)}
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

        {/* Step 3: Reading Material */}
        {step === "reading" && lessonContent && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setSelectedLessonNumber(null); setStep("selectLesson"); }}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
            </div>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <FileText className="h-4 w-4" />
                Etapa 1 de 2 — Leitura
              </div>
              <h1 className="text-2xl font-bold">Lição {lessonContent.number} — {lessonContent.title}</h1>
              <p className="text-muted-foreground text-sm">
                Leia o conteúdo abaixo com atenção antes de responder o questionário
              </p>
            </div>

            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {lessonContent.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    {section.title && (
                      <h2 className="text-lg font-bold text-primary border-b pb-1">
                        {section.title}
                      </h2>
                    )}
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                      {section.content}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="text-center pb-8 space-y-3">
              <p className="text-sm text-muted-foreground">
                Terminou a leitura? Agora responda o questionário!
              </p>
              <Button size="lg" onClick={handleStartQuiz} className="min-w-[250px]">
                <BookOpen className="h-4 w-4 mr-2" /> Ir para o Questionário
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Answer Questions */}
        {step === "quiz" && lesson && (
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep("reading")}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar à Leitura
              </Button>
            </div>

            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <FileText className="h-4 w-4" />
                Etapa 2 de 2 — Questionário
              </div>
              <h1 className="text-2xl font-bold">Lição {lesson.number} — {lesson.title}</h1>
              <p className="text-muted-foreground text-sm">
                Respondendo como: <strong>{studentName}</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                💡 Clique nos links bíblicos para reler o versículo
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
