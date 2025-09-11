-- Simplify and fix RLS policies for event_appointments table
-- Remove overlapping policies that create security complexity

-- Drop all existing policies to start clean
DROP POLICY IF EXISTS "Public can create appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can view appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can update appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can delete appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Block all other access" ON public.event_appointments;

-- Ensure RLS is enabled
ALTER TABLE public.event_appointments ENABLE ROW LEVEL SECURITY;

-- Create simplified, non-overlapping policies

-- 1. Allow public appointment creation (anonymous booking)
CREATE POLICY "Allow public booking" 
ON public.event_appointments 
FOR INSERT 
WITH CHECK (
  full_name IS NOT NULL 
  AND email IS NOT NULL 
  AND phone IS NOT NULL 
  AND appointment_date IS NOT NULL 
  AND appointment_time IS NOT NULL 
  AND address IS NOT NULL 
  AND appointment_date >= CURRENT_DATE
);

-- 2. Only authenticated admins can read sensitive data
CREATE POLICY "Admin read access only" 
ON public.event_appointments 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

-- 3. Only authenticated admins can modify appointments
CREATE POLICY "Admin modify access only" 
ON public.event_appointments 
FOR UPDATE 
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- 4. Only authenticated admins can delete appointments
CREATE POLICY "Admin delete access only" 
ON public.event_appointments 
FOR DELETE 
TO authenticated
USING (is_admin(auth.uid()));