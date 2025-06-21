
-- Atualizar a imagem do plano "Propósito de Vida" para uma imagem de pessoa na montanha
UPDATE reading_plan_details 
SET image_url = 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=3506&auto=format&fit=crop'
WHERE plan_id = 2 AND title = 'Propósito de Vida';
