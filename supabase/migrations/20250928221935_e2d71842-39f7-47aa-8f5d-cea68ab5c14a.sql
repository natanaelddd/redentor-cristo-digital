-- Criar tabela para inscrições do evento "Encontro com Deus"
CREATE TABLE public.event_inscriptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  address TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.event_inscriptions ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção pública
CREATE POLICY "Allow public inscription creation" 
ON public.event_inscriptions 
FOR INSERT 
WITH CHECK (
  full_name IS NOT NULL AND 
  email IS NOT NULL AND 
  phone IS NOT NULL AND 
  address IS NOT NULL
);

-- Política para admins visualizarem todas as inscrições
CREATE POLICY "Admins can view all inscriptions" 
ON public.event_inscriptions 
FOR SELECT 
USING (is_admin(auth.uid()));

-- Política para admins gerenciarem inscrições
CREATE POLICY "Admins can manage inscriptions" 
ON public.event_inscriptions 
FOR ALL 
USING (is_admin(auth.uid()));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_event_inscriptions_updated_at
BEFORE UPDATE ON public.event_inscriptions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();