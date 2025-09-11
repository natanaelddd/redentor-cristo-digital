-- Fix event_appointments table security
-- Drop existing RLS policies to create a secure setup
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Allow appointment creation for anonymous users" ON public.event_appointments;
DROP POLICY IF EXISTS "Allow appointment creation for authenticated users" ON public.event_appointments;
DROP POLICY IF EXISTS "Block anonymous SELECT access" ON public.event_appointments;
DROP POLICY IF EXISTS "Block anonymous access to appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Users can view their own appointments" ON public.event_appointments;

-- Create new secure RLS policies
-- Allow public to create appointments (for booking functionality)
CREATE POLICY "Public can create appointments" 
ON public.event_appointments 
FOR INSERT 
WITH CHECK (true);

-- Only admins can read appointment data
CREATE POLICY "Only admins can view appointments" 
ON public.event_appointments 
FOR SELECT 
USING (is_admin(auth.uid()));

-- Only admins can update/delete appointments
CREATE POLICY "Only admins can modify appointments" 
ON public.event_appointments 
FOR UPDATE 
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Only admins can delete appointments" 
ON public.event_appointments 
FOR DELETE 
USING (is_admin(auth.uid()));

-- Allow anonymous users to check slot availability via function
CREATE OR REPLACE FUNCTION public.check_appointment_slot_availability(
  check_date date,
  check_time time
) RETURNS boolean
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

-- Allow anonymous users to get total appointment count
CREATE OR REPLACE FUNCTION public.get_appointment_count_for_date(
  check_date date
) RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN (
    SELECT COUNT(*)::integer 
    FROM event_appointments 
    WHERE appointment_date = check_date
  );
END;
$$;