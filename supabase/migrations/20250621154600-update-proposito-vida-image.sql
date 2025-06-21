
-- Reativar o plano "Propósito de Vida" e atualizar apenas a imagem
UPDATE reading_plan_details 
SET is_active = true,
    image_url = '/lovable-uploads/f2288d2d-f0c1-4e9b-a53c-3c96a51fd7e8.png'
WHERE plan_id = 2 AND title = 'Propósito de Vida';

-- Restaurar as leituras diárias que foram removidas (caso necessário)
INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 1, 'Descobrindo Seu Propósito', 'Jeremias 29:11', 'Porque eu sei os planos que tenho para vós, diz o Senhor; planos de paz e não de mal, para vos dar o fim que esperais.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 1);

INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 2, 'Caminhando com Propósito', 'Provérbios 3:5-6', 'Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 2);

INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 3, 'Servindo com Amor', '1 Pedro 4:10', 'Cada um administre aos outros o dom como o recebeu, como bons despenseiros da multiforme graça de Deus.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 3);

INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 4, 'Crescendo em Sabedoria', 'Provérbios 27:17', 'Assim como o ferro com ferro se afia, assim o homem afia o rosto do seu amigo.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 4);

INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 5, 'Vivendo com Gratidão', '1 Tessalonicenses 5:18', 'Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 5);

INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 6, 'Perseverando na Fé', 'Hebreus 12:1', 'Corramos, com paciência, a carreira que nos está proposta.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 6);

INSERT INTO reading_plan_days (plan_id, day_number, title, passage, content)
SELECT 2, 7, 'Celebrando a Jornada', 'Filipenses 4:13', 'Posso todas as coisas em Cristo que me fortalece.'
WHERE NOT EXISTS (SELECT 1 FROM reading_plan_days WHERE plan_id = 2 AND day_number = 7);
