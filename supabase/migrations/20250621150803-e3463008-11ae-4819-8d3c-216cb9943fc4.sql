
-- Primeiro, remover as tabelas se existirem
DROP TABLE IF EXISTS reading_plan_days CASCADE;
DROP TABLE IF EXISTS reading_plan_details CASCADE;

-- Criar tabela para planos de leitura dinâmicos
CREATE TABLE public.reading_plan_details (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER NOT NULL UNIQUE, -- Adicionar UNIQUE constraint
  title TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  description TEXT,
  author TEXT,
  duration TEXT,
  is_active BOOLEAN DEFAULT true,
  order_position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela para as leituras diárias de cada plano
CREATE TABLE public.reading_plan_days (
  id SERIAL PRIMARY KEY,
  plan_id INTEGER NOT NULL REFERENCES reading_plan_details(plan_id) ON DELETE CASCADE,
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  passage TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Adicionar trigger para atualizar updated_at
CREATE OR REPLACE TRIGGER update_reading_plan_details_updated_at
  BEFORE UPDATE ON reading_plan_details
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE OR REPLACE TRIGGER update_reading_plan_days_updated_at
  BEFORE UPDATE ON reading_plan_days
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Inserir os planos existentes na nova estrutura
INSERT INTO reading_plan_details (plan_id, title, image_url, category, description, author, duration, order_position) VALUES
(1, 'As Cicatrizes e Marcas da Vida', 'https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=2070&auto=format&fit=crop', 'Pais', 'Um plano focado na cura e restauração através da Palavra de Deus.', 'Priscilla Shirer', '7 dias', 1),
(2, 'Propósito de Vida', 'https://images.unsplash.com/photo-1519452929597-4ef08f8c4ead?q=80&w=2070&auto=format&fit=crop', 'Pais', 'Descubra o plano de Deus para sua vida e viva com propósito divino.', 'Rick Warren', '7 dias', 2),
(3, 'Namoro Cristão', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop', 'Pais', 'Princípios bíblicos para relacionamentos saudáveis e honrosos.', 'Joshua Harris', '6 dias', 3),
(4, 'O Silêncio que Cura', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2070&auto=format&fit=crop', 'Novo na Fé', 'Encontre paz e direção através da meditação e quietude com Deus.', 'Max Lucado', '10 dias', 4),
(5, 'Casais Abençoados Em Deus', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2070&auto=format&fit=crop', 'Novo na Fé', 'Fortaleça seu casamento com fundamentos cristãos sólidos.', 'Gary Chapman', '14 dias', 5),
(6, 'Em Quem Confiar?', 'https://images.unsplash.com/photo-1507692049790-de58290a4334?q=80&w=2070&auto=format&fit=crop', 'Novo na Fé', 'Desenvolva uma confiança inabalável em Deus em todas as circunstâncias.', 'Charles Stanley', '8 dias', 6),
(7, 'O que Jesus Postaria?', 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=2039&auto=format&fit=crop', 'Juventude', 'Navegue nas redes sociais com sabedoria e propósito cristão.', 'Craig Groeschel', '5 dias', 7),
(8, 'Amigos Verdadeiros', 'https://images.unsplash.com/photo-1543269664-7eef42226a21?q=80&w=2070&auto=format&fit=crop', 'Juventude', 'Descubra o valor das amizades baseadas em princípios cristãos.', 'Francis Chan', '7 dias', 8),
(9, 'Ar & Crescer', 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=2049&auto=format&fit=crop', 'Juventude', 'Crescimento espiritual autêntico para a nova geração de cristãos.', 'Lecrae Moore', '12 dias', 9);

-- Inserir algumas leituras diárias como exemplo
INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content) VALUES
-- Plano 1: As Cicatrizes e Marcas da Vida
(1, 1, 'Cicatrizes que Curam', 'Salmos 147:3', 'Ele sara os quebrantados de coração e cuida das suas feridas. Deus não apenas conhece nossas dores, mas ativamente trabalha para nos curar.'),
(1, 2, 'Marcas da Graça', '2 Coríntios 12:9', 'A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza. Nossas limitações se tornam o palco para a força de Deus.'),
(1, 3, 'Restauração Divina', 'Joel 2:25', 'Restituir-vos-ei os anos que comeu o gafanhoto. Deus tem o poder de restaurar completamente aquilo que foi perdido ou destruído.'),

-- Plano 2: Propósito de Vida
(2, 1, 'Feito para um Propósito', 'Efésios 2:10', 'Porque somos feitura sua, criados em Cristo Jesus para as boas obras, as quais Deus preparou para que andássemos nelas.'),
(2, 2, 'Planejado por Deus', 'Jeremias 29:11', 'Porque eu bem sei os pensamentos que tenho a vosso respeito, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.'),
(2, 3, 'Servindo ao Reino', 'Mateus 6:33', 'Mas, buscai primeiro o reino de Deus, e a sua justiça, e todas estas coisas vos serão acrescentadas.');
