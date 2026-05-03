import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BibleVersePopup } from "@/components/BibleVersePopup";
import { ConfettiEffect } from "@/components/ConfettiEffect";
import { CourseCompletionCertificate } from "@/components/CourseCompletionCertificate";
import { quizLessons } from "@/data/quizLessons";
import { lessonContents } from "@/data/lessonContents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import {
  BookOpen, ChevronRight, ChevronLeft, User, Send, CheckCircle, FileText, RotateCcw,
  Heart, Droplets, Wind, Cross, Users, HandCoins, Award, Flame, Star, Trophy
} from "lucide-react";

type Step = "welcome_back" | "name" | "selectLesson" | "reading" | "quiz";

const STORAGE_KEY = "batismo_curso_progress";
const TOTAL_LESSONS = quizLessons.length;

// Icons and colors for each lesson
const lessonMeta: Record<number, { icon: React.ElementType; gradient: string; color: string }> = {
  1: { icon: Cross, gradient: "from-blue-500 to-indigo-600", color: "text-blue-600" },
  2: { icon: Heart, gradient: "from-rose-500 to-pink-600", color: "text-rose-600" },
  3: { icon: Flame, gradient: "from-amber-500 to-orange-600", color: "text-amber-600" },
  4: { icon: Droplets, gradient: "from-cyan-500 to-blue-600", color: "text-cyan-600" },
  5: { icon: Wind, gradient: "from-purple-500 to-violet-600", color: "text-purple-600" },
  6: { icon: HandCoins, gradient: "from-emerald-500 to-teal-600", color: "text-emerald-600" },
  7: { icon: Users, gradient: "from-sky-500 to-blue-600", color: "text-sky-600" },
  8: { icon: Star, gradient: "from-yellow-500 to-amber-600", color: "text-yellow-600" },
};

const motivationalMessages = [
  "\"Porque pela graça sois salvos, por meio da fé\" — Efésios 2:8",
  "\"Tudo posso naquele que me fortalece\" — Filipenses 4:13",
  "\"O Senhor é o meu pastor; nada me faltará\" — Salmo 23:1",
  "\"Buscar-me-eis e me achareis quando me buscardes de todo o vosso coração\" — Jeremias 29:13",
  "\"Confie no Senhor de todo o seu coração\" — Provérbios 3:5",
  "\"Porque Deus amou o mundo de tal maneira...\" — João 3:16",
];

function getProgressMessage(completed: number, total: number): string {
  const pct = (completed / total) * 100;
  if (pct === 0) return "🌱 Sua jornada de fé começa aqui!";
  if (pct <= 25) return "🙏 Ótimo começo! Continue firme na caminhada!";
  if (pct <= 50) return "📖 Metade do caminho! Você está indo muito bem!";
  if (pct <= 75) return "⭐ Quase lá! Sua dedicação é inspiradora!";
  if (pct < 100) return "🏆 Falta pouco! O batismo te espera!";
  return "🎉 Parabéns! Você concluiu todo o curso!";
}

interface SavedProgress {
  studentName: string;
  step: Exclude<Step, "welcome_back">;
  selectedLessonNumber: number | null;
  answers: Record<number, string>;
}

function loadProgress(): SavedProgress | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as SavedProgress;
    if (data.studentName && data.step) return data;
    return null;
  } catch {
    return null;
  }
}

function saveProgress(p: SavedProgress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(p));
  } catch { /* ignore quota errors */ }
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

export default function QuizPage() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const [studentName, setStudentName] = useState("");
  const [step, setStep] = useState<Step>("name");
  const [selectedLessonNumber, setSelectedLessonNumber] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);

  const lesson = selectedLessonNumber !== null ? quizLessons.find(l => l.number === selectedLessonNumber) : null;
  const lessonContent = selectedLessonNumber !== null ? lessonContents.find(l => l.number === selectedLessonNumber) : null;

  const progressPct = (completedLessons.length / TOTAL_LESSONS) * 100;
  const allComplete = completedLessons.length >= TOTAL_LESSONS;

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.studentName && saved.step !== "name") {
      setStudentName(saved.studentName);
      setSelectedLessonNumber(saved.selectedLessonNumber);
      setAnswers(saved.answers || {});
      setStep("welcome_back");
    }
    setInitialized(true);
  }, []);

  // Persist progress on every relevant change
  useEffect(() => {
    if (!initialized) return;
    if (step === "welcome_back" || step === "name") return;
    if (!studentName) return;
    saveProgress({
      studentName,
      step: step as Exclude<Step, "welcome_back">,
      selectedLessonNumber,
      answers,
    });
  }, [studentName, step, selectedLessonNumber, answers, initialized]);

  // Auto-hide confetti
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const fetchCompletedLessons = useCallback(async (name: string) => {
    try {
      const { data } = await supabase
        .from("quiz_submissions")
        .select("lesson_number")
        .eq("student_name", name.trim());
      if (data) {
        const completed = [...new Set(data.map(d => d.lesson_number))];
        setCompletedLessons(completed);
      }
    } catch { /* ignore */ }
  }, []);

  const handleContinue = () => {
    const saved = loadProgress();
    if (saved) {
      setStep(saved.step);
      fetchCompletedLessons(saved.studentName);
    }
  };

  const handleStartFresh = () => {
    clearProgress();
    setStudentName("");
    setSelectedLessonNumber(null);
    setAnswers({});
    setCompletedLessons([]);
    setStep("name");
  };

  const handleConfirmName = () => {
    if (studentName.trim().length < 3) {
      toast({ title: "Nome obrigatório", description: "Por favor, insira seu nome completo.", variant: "destructive" });
      return;
    }
    fetchCompletedLessons(studentName);
    setStep("selectLesson");
  };

  const handleSelectLesson = (num: number) => {
    setSelectedLessonNumber(num);
    setAnswers({});
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

      const newCompleted = [...new Set([...completedLessons, lesson.number])];
      setCompletedLessons(newCompleted);
      setSubmitted(true);
      setShowConfetti(true);

      if (newCompleted.length >= TOTAL_LESSONS) {
        setShowCertificate(true);
      }

      toast({ title: "🎉 Respostas enviadas!", description: "Suas respostas foram salvas com sucesso." });
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
    setShowCertificate(false);
    setStep("selectLesson");
  };

  if (!initialized) return null;

  const randomVerse = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
  const currentLessonMeta = selectedLessonNumber ? lessonMeta[selectedLessonNumber] || lessonMeta[1] : lessonMeta[1];

  // Success screen
  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
        {showConfetti && <ConfettiEffect />}
        <Header navLinks={[{ title: "INÍCIO", href: "/" }]} logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />
        <main className="flex-grow flex items-center justify-center p-4">
          {showCertificate ? (
            <div className="space-y-6 w-full max-w-lg">
              <div className="text-center space-y-2">
                <Trophy className="h-12 w-12 text-amber-500 mx-auto" />
                <h1 className="text-2xl font-heading font-bold">Curso Completo!</h1>
                <p className="text-muted-foreground">Você concluiu todas as {TOTAL_LESSONS} lições. Que Deus abençoe seu batismo!</p>
              </div>
              <CourseCompletionCertificate
                studentName={studentName}
                completionDate={new Date().toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
              />
              <div className="flex flex-col gap-2 items-center">
                <Button variant="outline" onClick={() => navigate("/")}>Voltar ao início</Button>
              </div>
            </div>
          ) : (
            <Card className="max-w-md w-full text-center border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-8 pb-8 space-y-5">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-20 w-20 rounded-full bg-green-100 animate-ping opacity-30" />
                  </div>
                  <CheckCircle className="h-16 w-16 text-green-600 mx-auto relative" />
                </div>
                <h2 className="text-2xl font-heading font-bold">Lição Concluída!</h2>
                <p className="text-muted-foreground">
                  Parabéns, <strong>{studentName}</strong>! Você completou a lição "<strong>{lesson?.title}</strong>".
                </p>

                {/* Progress update */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 space-y-2">
                  <div className="flex justify-between text-sm font-medium">
                    <span>Progresso do curso</span>
                    <span className="text-primary">{completedLessons.length}/{TOTAL_LESSONS}</span>
                  </div>
                  <Progress value={progressPct} className="h-3" />
                  <p className="text-xs text-muted-foreground">{getProgressMessage(completedLessons.length, TOTAL_LESSONS)}</p>
                </div>

                {/* Motivational verse */}
                <div className="border-l-4 border-amber-400 pl-3 py-2 text-left bg-amber-50/50 rounded-r-lg">
                  <p className="text-sm italic text-gray-600">{randomVerse}</p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <Button onClick={handleReset} className="bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90">
                    Continuar Estudando <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                  <Button variant="ghost" onClick={() => navigate("/")}>Voltar ao início</Button>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-amber-50/20">
      <Header navLinks={[{ title: "INÍCIO", href: "/" }]} logoUrl="/lovable-uploads/db19ffc6-8337-43da-a20a-e0340ed44a7f.png" />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-3xl">
        {/* Welcome Back screen */}
        {step === "welcome_back" && (
          <Card className="max-w-md mx-auto border-0 shadow-lg bg-white/80 backdrop-blur animate-fade-in">
            <CardHeader className="text-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-2xl font-heading">Bem-vindo(a) de volta!</CardTitle>
              <p className="text-muted-foreground mt-2">
                <strong>{studentName}</strong>, encontramos seu progresso salvo.
              </p>
              <p className="text-sm text-muted-foreground">
                Deseja continuar de onde parou?
              </p>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button className="w-full bg-gradient-to-r from-primary to-blue-600" onClick={handleContinue}>
                <ChevronRight className="h-4 w-4 mr-2" /> Continuar de onde parei
              </Button>
              <Button variant="outline" className="w-full" onClick={handleStartFresh}>
                <RotateCcw className="h-4 w-4 mr-2" /> Começar do zero
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 1: Name */}
        {step === "name" && (
          <div className="animate-fade-in">
            {/* Hero banner */}
            <div className="text-center mb-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-amber-50 text-amber-700 px-4 py-1.5 rounded-full text-sm font-medium">
                <Award className="h-4 w-4" />
                Certificado ao completar o curso
              </div>
              <h1 className="text-3xl sm:text-4xl font-heading font-bold bg-gradient-to-r from-blue-700 via-primary to-indigo-600 bg-clip-text text-transparent">
                Curso Preparatório para Batismo
              </h1>
              <p className="text-muted-foreground">
                Igreja Missionária do Cristo Redentor
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                {TOTAL_LESSONS} lições • Leitura + Questionário • Salva seu progresso automaticamente
              </p>
            </div>

            <Card className="max-w-md mx-auto border-0 shadow-lg bg-white/80 backdrop-blur">
              <CardContent className="pt-6 pb-6 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium flex items-center gap-2">
                    <User className="h-4 w-4" /> Nome Completo
                  </label>
                  <Input
                    placeholder="Ex: João da Silva"
                    value={studentName}
                    onChange={e => setStudentName(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && handleConfirmName()}
                    className="h-12 text-base"
                  />
                </div>
                <Button className="w-full h-12 text-base bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90" onClick={handleConfirmName}>
                  Começar o Curso <ChevronRight className="h-5 w-5 ml-1" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Seu progresso será salvo automaticamente 💾
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Select Lesson */}
        {step === "selectLesson" && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with progress */}
            <div className="text-center space-y-3">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Curso Preparatório para Batismo</p>
              <h1 className="text-2xl font-heading font-bold">Olá, {studentName}! 👋</h1>

              {/* Progress bar */}
              <div className="max-w-sm mx-auto bg-white/80 backdrop-blur rounded-xl p-4 shadow-sm space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">Seu progresso</span>
                  <span className="text-primary font-bold">{completedLessons.length}/{TOTAL_LESSONS}</span>
                </div>
                <Progress value={progressPct} className="h-3" />
                <p className="text-xs text-muted-foreground">{getProgressMessage(completedLessons.length, TOTAL_LESSONS)}</p>
              </div>
            </div>

            {/* Lesson cards */}
            <div className="grid gap-3 sm:grid-cols-2">
              {quizLessons.map((l, idx) => {
                const isCompleted = completedLessons.includes(l.number);
                const meta = lessonMeta[l.number] || lessonMeta[1];
                const LessonIcon = meta.icon;
                return (
                  <Card
                    key={l.number}
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border-0 shadow-sm ${
                      isCompleted
                        ? "bg-gradient-to-br from-green-50 to-emerald-50 ring-1 ring-green-200"
                        : "bg-white/80 backdrop-blur hover:bg-white"
                    }`}
                    style={{ animationDelay: `${idx * 80}ms` }}
                    onClick={() => handleSelectLesson(l.number)}
                  >
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`rounded-xl h-12 w-12 flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? "bg-gradient-to-br from-amber-400 to-amber-500 shadow-md shadow-amber-200"
                          : `bg-gradient-to-br ${meta.gradient} shadow-md`
                      }`}>
                        {isCompleted ? (
                          <Award className="h-6 w-6 text-white" />
                        ) : (
                          <LessonIcon className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm">
                          <span className="text-muted-foreground">Lição {l.number}:</span>{" "}
                          {l.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {isCompleted ? (
                            <span className="text-amber-600 font-medium">🏅 Concluída</span>
                          ) : (
                            `${l.questions.length} perguntas`
                          )}
                        </p>
                      </div>
                      <ChevronRight className={`h-5 w-5 shrink-0 ${isCompleted ? "text-amber-500" : "text-muted-foreground"}`} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Motivational footer */}
            {allComplete && (
              <Card className="border-0 bg-gradient-to-r from-amber-50 to-yellow-50 shadow-md">
                <CardContent className="p-5 text-center space-y-3">
                  <Trophy className="h-10 w-10 text-amber-500 mx-auto" />
                  <h3 className="font-heading font-bold text-lg">Todas as lições concluídas!</h3>
                  <p className="text-sm text-muted-foreground">Você pode revisar qualquer lição ou ver seu certificado.</p>
                  <Button
                    variant="outline"
                    className="border-amber-300 text-amber-700 hover:bg-amber-100"
                    onClick={() => { setShowCertificate(true); setSubmitted(true); }}
                  >
                    <Award className="h-4 w-4 mr-2" /> Ver Certificado
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Step 3: Reading Material */}
        {step === "reading" && lessonContent && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => { setSelectedLessonNumber(null); setStep("selectLesson"); }}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar
              </Button>
            </div>

            <div className="text-center space-y-3">
              {/* Lesson icon badge */}
              <div className={`inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-gradient-to-br ${currentLessonMeta.gradient} shadow-lg mx-auto`}>
                {(() => { const Icon = currentLessonMeta.icon; return <Icon className="h-7 w-7 text-white" />; })()}
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                <FileText className="h-4 w-4" />
                Etapa 1 de 2 — Leitura
              </div>
              <h1 className="text-2xl font-heading font-bold">Lição {lessonContent.number} — {lessonContent.title}</h1>
              <p className="text-muted-foreground text-sm">
                Leia o conteúdo abaixo com atenção antes de responder o questionário
              </p>
            </div>

            <Card className="overflow-hidden border-0 shadow-lg bg-white/90 backdrop-blur">
              <CardContent className="p-6 sm:p-8 space-y-6">
                {lessonContent.sections.map((section, idx) => (
                  <div key={idx} className="space-y-3" style={{ animationDelay: `${idx * 100}ms` }}>
                    {section.title && (
                      <h2 className={`text-lg font-bold ${currentLessonMeta.color} border-b border-gray-100 pb-2`}>
                        {section.title}
                      </h2>
                    )}
                    <div className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                      {section.content.split(/(".*?")/g).map((part, i) =>
                        part.startsWith('"') && part.endsWith('"') ? (
                          <span key={i} className="bg-amber-50 border-l-3 border-amber-400 px-2 py-0.5 rounded-r inline italic text-gray-600">
                            {part}
                          </span>
                        ) : (
                          <span key={i}>{part}</span>
                        )
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <div className="text-center pb-8 space-y-3">
              <p className="text-sm text-muted-foreground">
                ✅ Terminou a leitura? Agora responda o questionário!
              </p>
              <Button size="lg" onClick={handleStartQuiz} className="min-w-[250px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-200">
                <BookOpen className="h-4 w-4 mr-2" /> Ir para o Questionário
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Answer Questions */}
        {step === "quiz" && lesson && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => setStep("reading")}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Voltar à Leitura
              </Button>
            </div>

            <div className="text-center space-y-3">
              <div className={`inline-flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br ${currentLessonMeta.gradient} shadow-md mx-auto`}>
                {(() => { const Icon = currentLessonMeta.icon; return <Icon className="h-6 w-6 text-white" />; })()}
              </div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                <FileText className="h-4 w-4" />
                Etapa 2 de 2 — Questionário
              </div>
              <h1 className="text-2xl font-heading font-bold">Lição {lesson.number} — {lesson.title}</h1>
              <p className="text-muted-foreground text-sm">
                Respondendo como: <strong>{studentName}</strong>
              </p>

              {/* Question progress */}
              <div className="max-w-xs mx-auto">
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Respondidas</span>
                  <span>{Object.values(answers).filter(a => a.trim()).length}/{lesson.questions.length}</span>
                </div>
                <Progress
                  value={(Object.values(answers).filter(a => a.trim()).length / lesson.questions.length) * 100}
                  className="h-2"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                💡 Clique nos links bíblicos para reler o versículo
              </p>
            </div>

            <div className="space-y-4">
              {lesson.questions.map((q, idx) => {
                const isAnswered = !!answers[q.id]?.trim();
                return (
                  <Card key={q.id} className={`overflow-hidden border-0 shadow-sm transition-all duration-300 ${isAnswered ? "ring-1 ring-green-200 bg-green-50/30" : "bg-white/80 backdrop-blur"}`}>
                    <CardContent className="p-5 space-y-3">
                      <div className="flex gap-3">
                        <span className={`rounded-full h-8 w-8 flex items-center justify-center text-sm font-bold shrink-0 mt-0.5 transition-colors ${
                          isAnswered
                            ? "bg-green-500 text-white"
                            : "bg-gradient-to-br from-primary to-blue-600 text-white"
                        }`}>
                          {isAnswered ? <CheckCircle className="h-4 w-4" /> : idx + 1}
                        </span>
                        <div className="space-y-2 flex-1">
                          <p className="font-medium">{q.question}</p>
                          {q.bibleRef && <BibleVersePopup bibleRef={q.bibleRef} lessonContent={lessonContent || undefined} />}
                          <Textarea
                            placeholder="Digite sua resposta aqui..."
                            value={answers[q.id] || ""}
                            onChange={e => handleAnswerChange(q.id, e.target.value)}
                            rows={3}
                            className="mt-2 border-gray-200 focus:border-primary"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="text-center pb-8">
              <Button
                size="lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="min-w-[220px] bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-lg shadow-green-200 h-12 text-base"
              >
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
