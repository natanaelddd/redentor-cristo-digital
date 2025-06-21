
-- Atualizar a imagem do plano "Propósito de Vida" para a nova imagem enviada
UPDATE reading_plan_details 
SET image_url = '/lovable-uploads/f2288d2d-f0c1-4e9b-a53c-3c96a51fd7e8.png'
WHERE plan_id = 2 AND title = 'Propósito de Vida';
