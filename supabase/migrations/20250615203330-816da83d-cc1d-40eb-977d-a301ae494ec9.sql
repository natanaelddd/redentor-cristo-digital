
-- Cria a tabela para armazenar os planos de leitura
CREATE TABLE public.reading_plans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  plan_url TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Permite que qualquer pessoa leia os planos de leitura
ALTER TABLE public.reading_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Enable read access for all users" ON public.reading_plans FOR SELECT USING (true);

-- Cria uma função para atualizar o campo `updated_at` automaticamente
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

-- Cria um gatilho (trigger) que chama a função acima antes de qualquer atualização na tabela
CREATE TRIGGER update_reading_plans_updated_at
BEFORE UPDATE ON public.reading_plans
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
