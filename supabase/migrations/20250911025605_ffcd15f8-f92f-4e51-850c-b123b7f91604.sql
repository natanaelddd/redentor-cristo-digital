-- Enable realtime for event_appointments table
ALTER TABLE public.event_appointments REPLICA IDENTITY FULL;

-- Add the table to the realtime publication
ALTER PUBLICATION supabase_realtime ADD TABLE public.event_appointments;