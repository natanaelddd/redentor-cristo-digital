-- Remove the security definer view that was flagged
DROP VIEW IF EXISTS public.appointment_availability;

-- Create a simple function to check appointment availability without exposing sensitive data
CREATE OR REPLACE FUNCTION public.check_appointment_availability(check_date date, check_time time)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Return true if slot is available, false if taken
  RETURN NOT EXISTS (
    SELECT 1 
    FROM event_appointments 
    WHERE appointment_date = check_date 
    AND appointment_time = check_time
  );
END;
$$;