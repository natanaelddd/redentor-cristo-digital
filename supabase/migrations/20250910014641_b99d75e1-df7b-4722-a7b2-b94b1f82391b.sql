-- Limpar slides existentes e criar novos para a Igreja
DELETE FROM hero_slides;

-- Inserir novos slides específicos para Igreja Missionária Cristo Redentor
INSERT INTO hero_slides (
  category, title, description, button_text, "order", is_active,
  text_color, background_color, button_color, button_hover_color,
  overlay_opacity, display_duration, animation_type
) VALUES 
(
  'COMUNIDADE CRISTÃ EM RIBEIRÃO PRETO',
  'IGREJA MISSIONÁRIA CRISTO REDENTOR',
  'Há mais de 20 anos transformando vidas através do amor de Cristo em Ribeirão Preto. Uma família de fé que acolhe a todos.',
  'CONHEÇA NOSSA IGREJA',
  1,
  true,
  '#ffffff',
  '#000000',
  '#ea580c',
  '#c2410c',
  0.6,
  6000,
  'fade'
),
(
  'CULTOS E ADORAÇÃO',
  'VENHA ADORAR CONOSCO',
  'Cultos dominicais às 19h com louvor, palavra e comunhão. Estudo bíblico quartas 20h. Oração sextas 20h.',
  'PARTICIPE DOS CULTOS',
  2,
  true,
  '#ffffff',
  '#000000',
  '#ea580c',
  '#c2410c',
  0.6,
  6000,
  'fade'
),
(
  'MINISTÉRIOS E AÇÕES SOCIAIS',
  'SERVINDO A COMUNIDADE',
  'Através de nossos ministérios alcançamos famílias, jovens e crianças. Ações sociais que demonstram o amor de Cristo.',
  'CONHEÇA NOSSOS MINISTÉRIOS',
  3,
  true,
  '#ffffff',
  '#000000',
  '#ea580c',
  '#c2410c',
  0.6,
  6000,
  'fade'
),
(
  'PALAVRA DE DEUS',
  'CRESÇA NA FÉ',
  'Estudos bíblicos, discipulado e ensino da Palavra para toda família. Venha crescer espiritualmente conosco.',
  'PARTICIPE DOS ESTUDOS',
  4,
  true,
  '#ffffff',
  '#000000',
  '#ea580c',
  '#c2410c',
  0.6,
  6000,
  'fade'
);