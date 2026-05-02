
-- Table for quiz submissions
CREATE TABLE public.quiz_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  student_name TEXT NOT NULL,
  lesson_number INTEGER NOT NULL,
  lesson_title TEXT NOT NULL,
  answers JSONB NOT NULL DEFAULT '[]'::jsonb,
  score INTEGER,
  total_questions INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a quiz (public form)
CREATE POLICY "Anyone can submit quiz" ON public.quiz_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Only admins can view submissions
CREATE POLICY "Admins can view submissions" ON public.quiz_submissions
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));
