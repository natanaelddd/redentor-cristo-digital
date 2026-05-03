import { Award, Church, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Props {
  studentName: string;
  completionDate: string;
}

export function CourseCompletionCertificate({ studentName, completionDate }: Props) {
  return (
    <div className="max-w-lg mx-auto">
      <Card className="border-2 border-amber-300 bg-gradient-to-br from-amber-50 via-white to-amber-50 shadow-xl overflow-hidden relative">
        {/* Ornamental corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-amber-400 rounded-tl-lg" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-amber-400 rounded-tr-lg" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-amber-400 rounded-bl-lg" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-amber-400 rounded-br-lg" />

        <CardContent className="pt-10 pb-10 px-8 text-center space-y-5 relative">
          <Award className="h-16 w-16 text-amber-500 mx-auto drop-shadow-md" />

          <div className="space-y-1">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-600 font-semibold">Certificado de Conclusão</p>
            <h2 className="text-2xl font-heading font-bold text-gray-800">
              Curso Preparatório para Batismo
            </h2>
          </div>

          <div className="py-3">
            <p className="text-sm text-muted-foreground">Certificamos que</p>
            <p className="text-2xl font-heading font-bold text-primary mt-1">
              {studentName}
            </p>
          </div>

          <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
            concluiu com dedicação todas as 8 lições do Curso Preparatório para Batismo, demonstrando compromisso com a fé e o crescimento espiritual.
          </p>

          <div className="border-t border-amber-200 pt-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <Church className="h-4 w-4" />
              <span>Igreja Missionária do Cristo Redentor</span>
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Pastor Silas Silva
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{completionDate}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            const el = document.querySelector('.max-w-lg');
            if (el) {
              const range = document.createRange();
              range.selectNode(el);
              window.getSelection()?.removeAllRanges();
              window.getSelection()?.addRange(range);
              try { document.execCommand('copy'); } catch {}
              window.getSelection()?.removeAllRanges();
            }
          }}
        >
          📸 Tirar screenshot para compartilhar
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Use o recurso de captura de tela do seu dispositivo para salvar
        </p>
      </div>
    </div>
  );
}
