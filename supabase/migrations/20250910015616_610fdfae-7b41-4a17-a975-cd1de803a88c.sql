-- Create a new table specifically for church hero slides
CREATE TABLE public.church_hero_slides (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  category text NOT NULL,
  title text NOT NULL,
  description text,
  button_text text NOT NULL,
  button_link text,
  image_url text,
  subtitle text,
  text_alignment text DEFAULT 'left'::text,
  text_color text DEFAULT '#ffffff'::text,
  background_color text DEFAULT '#000000'::text,
  button_color text DEFAULT '#6366f1'::text,
  button_hover_color text DEFAULT '#4f46e5'::text,
  overlay_opacity numeric DEFAULT 0.5,
  animation_type text DEFAULT 'fade'::text,
  animation_duration integer DEFAULT 500,
  display_duration integer DEFAULT 5000,
  "order" integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.church_hero_slides ENABLE ROW LEVEL SECURITY;

-- Create policies for church hero slides
CREATE POLICY "Admins can manage church slides" 
ON public.church_hero_slides 
FOR ALL 
USING (is_admin(auth.uid()));

CREATE POLICY "Everyone can view active church slides" 
ON public.church_hero_slides 
FOR SELECT 
USING (is_active = true);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_church_hero_slides_updated_at
BEFORE UPDATE ON public.church_hero_slides
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert church-specific slides into the new table
INSERT INTO public.church_hero_slides (category, title, description, button_text, button_link, "order", is_active) VALUES
('Bem-vindos', 'Igreja Missionária Cristo Redentor', 'Uma comunidade de fé, esperança e amor em Ribeirão Preto. Venha fazer parte da nossa família espiritual.', 'Conheça Nossa Igreja', '#sobre', 0, true),
('Cultos', 'Participe dos Nossos Cultos', 'Domingos às 19h e Quartas às 20h. Momentos de adoração, palavra e comunhão.', 'Ver Horários', '#eventos', 1, true),
('Ministérios', 'Faça Parte dos Ministérios', 'Descubra seu chamado e sirva a Deus através dos nossos diversos ministérios.', 'Conhecer Ministérios', '#contato', 2, true),
('Estudos', 'Estudos Bíblicos', 'Aprofunde sua fé através dos nossos estudos bíblicos e grupos de discipulado.', 'Participar', '#estudos', 3, true);