import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { BookOpen } from "lucide-react";
import type { BibleReference } from "@/data/quizLessons";

interface BibleVersePopupProps {
  bibleRef: BibleReference;
}

export function BibleVersePopup({ bibleRef }: BibleVersePopupProps) {
  return (
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
  );
}
