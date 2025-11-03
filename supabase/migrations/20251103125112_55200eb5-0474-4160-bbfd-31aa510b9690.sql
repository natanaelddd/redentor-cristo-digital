-- Add participant_type column to event_inscriptions
ALTER TABLE public.event_inscriptions 
ADD COLUMN participant_type text NOT NULL DEFAULT 'encontrista' CHECK (participant_type IN ('encontrista', 'trabalhador'));