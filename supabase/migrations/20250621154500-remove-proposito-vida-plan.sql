
-- Desativar o plano "Propósito de Vida" que está incomodando
UPDATE reading_plan_details 
SET is_active = false 
WHERE plan_id = 2 AND title = 'Propósito de Vida';

-- Remover também as leituras diárias associadas a este plano
DELETE FROM reading_plan_days 
WHERE plan_id = 2;
