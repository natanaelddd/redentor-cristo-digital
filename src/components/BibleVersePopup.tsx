import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { BibleReference } from "@/data/quizLessons";
import type { LessonContent } from "@/data/lessonContents";

interface BibleVersePopupProps {
  bibleRef: BibleReference;
  lessonContent?: LessonContent;
}

export function BibleVersePopup({ bibleRef, lessonContent }: BibleVersePopupProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Popup do versículo específico */}
      <Dialog>
        <DialogTrigger asChild>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 text-sm text-blue-700 hover:text-blue-900 hover:underline font-medium transition-colors"
          >
            <BookOpen className="h-4 w-4" />
            📖 Ler {bibleRef.reference}
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-blue-700" />
              {bibleRef.reference}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-5">
            <p className="text-base leading-relaxed text-gray-800 italic">
              "{bibleRef.text}"
            </p>
            <p className="mt-3 text-sm font-semibold text-amber-800 text-right">
              — {bibleRef.reference}
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Leia o texto acima para responder à pergunta do questionário.
          </p>
        </DialogContent>
      </Dialog>

      {/* Popup do contexto completo da lição */}
      {lessonContent && (
        <Dialog>
          <DialogTrigger asChild>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-xs text-purple-600 hover:text-purple-800 hover:underline font-medium transition-colors bg-purple-50 px-2 py-1 rounded-full"
            >
              📚 Ler contexto completo
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl max-h-[85vh] p-0">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-purple-600" />
                Lição {lessonContent.number} — {lessonContent.title}
              </DialogTitle>
              <p className="text-xs text-muted-foreground">
                Leia o conteúdo completo para responder com mais segurança
              </p>
            </DialogHeader>
            <ScrollArea className="px-6 pb-6 max-h-[65vh]">
              <div className="space-y-5 pr-4">
                {lessonContent.sections.map((section, idx) => (
                  <div key={idx} className="space-y-2">
                    {section.title && (
                      <h3 className="text-base font-bold text-purple-700 border-b border-purple-100 pb-1">
                        {section.title}
                      </h3>
                    )}
                    <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
