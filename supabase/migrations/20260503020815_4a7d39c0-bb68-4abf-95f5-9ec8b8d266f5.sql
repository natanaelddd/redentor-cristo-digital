
-- Remove event_appointments from Realtime publication (no IF EXISTS in ALTER PUBLICATION)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM pg_publication_tables 
    WHERE pubname = 'supabase_realtime' AND tablename = 'event_appointments'
  ) THEN
    ALTER PUBLICATION supabase_realtime DROP TABLE public.event_appointments;
  END IF;
END $$;
