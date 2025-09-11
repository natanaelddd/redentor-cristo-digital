-- Fix security vulnerability in event_appointments table
-- Remove existing policy that allows public read access
DROP POLICY IF EXISTS "Only admins can view appointments" ON public.event_appointments;

-- Create new restrictive policy that explicitly blocks anonymous access
CREATE POLICY "Admins can view appointments" 
ON public.event_appointments 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

-- Ensure the policy for creating appointments is secure but still allows public access
DROP POLICY IF EXISTS "Public can create appointments" ON public.event_appointments;

CREATE POLICY "Anyone can create appointments" 
ON public.event_appointments 
FOR INSERT 
WITH CHECK (true);

-- Verify RLS is enabled (it should already be enabled)
ALTER TABLE public.event_appointments ENABLE ROW LEVEL SECURITY;

-- Add a blocking policy for anonymous users on SELECT operations
CREATE POLICY "Block anonymous access to appointments" 
ON public.event_appointments 
FOR SELECT 
TO anon
USING (false);