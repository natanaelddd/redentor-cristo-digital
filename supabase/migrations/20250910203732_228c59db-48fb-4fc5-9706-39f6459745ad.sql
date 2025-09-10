-- Adicionar constraint única para evitar agendamentos duplicados no mesmo horário e data
ALTER TABLE public.event_appointments 
ADD CONSTRAINT unique_appointment_datetime 
UNIQUE (appointment_date, appointment_time);