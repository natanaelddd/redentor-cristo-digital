-- Limpar dados incorretos da tabela hero_slides
DELETE FROM public.hero_slides;

-- Inserir slides corretos para a Igreja Missionária Cristo Redentor
INSERT INTO public.hero_slides (
  id,
  category,
  title,
  description,
  button_text,
  "order",
  is_active,
  created_at,
  updated_at
) VALUES 
(
  gen_random_uuid(),
  'COMUNIDADE CRISTÃ EM RIBEIRÃO PRETO',
  'IGREJA MISSIONÁRIA CRISTO REDENTOR',
  'Há mais de 20 anos transformando vidas através do amor de Cristo em Ribeirão Preto. Uma família de fé que acolhe a todos.',
  'CONHEÇA NOSSA IGREJA',
  1,
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  'CULTOS E ADORAÇÃO',
  'VENHA ADORAR CONOSCO',
  'Cultos dominicais às 19h com louvor, palavra e comunhão. Estudo bíblico quartas 20h. Oração sextas 20h.',
  'PARTICIPE DOS CULTOS',
  2,
  true,
  now(),
  now()
),
(
  gen_random_uuid(),
  'MINISTÉRIOS E AÇÕES SOCIAIS',
  'SERVINDO A COMUNIDADE',
  'Através de nossos ministérios alcançamos famílias, jovens e crianças. Ações sociais que demonstram o amor de Cristo.',
  'CONHEÇA NOSSOS MINISTÉRIOS',
  3,
  true,
  now(),
  now()
);