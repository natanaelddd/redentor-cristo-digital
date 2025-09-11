-- Fix RLS policies for event_appointments table to ensure complete security

-- First, drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow appointment creation" ON public.event_appointments;
DROP POLICY IF EXISTS "Authenticated admins can view appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Block all anonymous select access" ON public.event_appointments;
DROP POLICY IF EXISTS "No anonymous reads under any circumstance" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can delete appointments" ON public.event_appointments;
DROP POLICY IF EXISTS "Only admins can update appointments" ON public.event_appointments;

-- Ensure RLS is enabled
ALTER TABLE public.event_appointments ENABLE ROW LEVEL SECURITY;

-- Create comprehensive and secure policies

-- 1. Allow anonymous users to create appointments (public booking)
CREATE POLICY "Public can create appointments" 
ON public.event_appointments 
FOR INSERT 
TO anon, authenticated
WITH CHECK (
  full_name IS NOT NULL 
  AND email IS NOT NULL 
  AND phone IS NOT NULL 
  AND appointment_date IS NOT NULL 
  AND appointment_time IS NOT NULL 
  AND address IS NOT NULL 
  AND appointment_date >= CURRENT_DATE
);

-- 2. Only authenticated admins can view appointments
CREATE POLICY "Only admins can view appointments" 
ON public.event_appointments 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

-- 3. Only authenticated admins can update appointments
CREATE POLICY "Only admins can update appointments" 
ON public.event_appointments 
FOR UPDATE 
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- 4. Only authenticated admins can delete appointments
CREATE POLICY "Only admins can delete appointments" 
ON public.event_appointments 
FOR DELETE 
TO authenticated
USING (is_admin(auth.uid()));

-- 5. Explicitly block all other access
CREATE POLICY "Block all other access" 
ON public.event_appointments 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);