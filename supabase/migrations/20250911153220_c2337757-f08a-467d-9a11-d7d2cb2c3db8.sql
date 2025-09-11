-- Drop all existing policies on event_appointments
DROP POLICY IF EXISTS "Admins can view appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Block anonymous access to appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Anyone can create appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can modify appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can delete appointments" ON public.event_appointments;

-- Ensure RLS is enabled
ALTER TABLE public.event_appointments ENABLE ROW LEVEL SECURITY;

-- Create comprehensive policies that explicitly block all unauthorized access
-- 1. Allow only authenticated admins to view appointments
CREATE POLICY "Authenticated admins can view appointments" 
ON public.event_appointments 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND 
  is_admin(auth.uid()) = true
);

-- 2. Explicitly block all anonymous SELECT attempts
CREATE POLICY "Block all anonymous select access" 
ON public.event_appointments 
FOR SELECT 
TO anon
USING (false);

-- 3. Allow public insertion (for appointment booking)
CREATE POLICY "Public can create appointments" 
ON public.event_appointments 
FOR INSERT 
TO public
WITH CHECK (true);

-- 4. Only admins can update appointments
CREATE POLICY "Only admins can update appointments" 
ON public.event_appointments 
FOR UPDATE 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND 
  is_admin(auth.uid()) = true
)
WITH CHECK (
  auth.uid() IS NOT NULL AND 
  is_admin(auth.uid()) = true
);

-- 5. Only admins can delete appointments
CREATE POLICY "Only admins can delete appointments" 
ON public.event_appointments 
FOR DELETE 
TO authenticated
USING (
  auth.uid() IS NOT NULL AND 
  is_admin(auth.uid()) = true
);

-- Create a view for public access that doesn't expose sensitive data (if needed)
DROP VIEW IF EXISTS public.appointment_availability;
CREATE VIEW public.appointment_availability AS
SELECT 
  appointment_date,
  appointment_time,
  COUNT(*) as booked_slots
FROM public.event_appointments 
GROUP BY appointment_date, appointment_time;