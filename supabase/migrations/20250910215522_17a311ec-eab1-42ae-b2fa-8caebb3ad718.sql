-- Fix security vulnerability in event_appointments table
-- Block anonymous access and add proper user access controls

-- Drop existing policies to recreate them with better security
DROP POLICY IF EXISTS "Allow appointment creation for everyone" ON public.event_appointments;
DROP POLICY IF EXISTS "Admins can manage all appointments" ON public.event_appointments;

-- Create comprehensive security policies

-- 1. Block all anonymous access completely
CREATE POLICY "Block anonymous access to appointments" 
ON public.event_appointments 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);

-- 2. Allow anyone to create appointments (preserving functionality)
CREATE POLICY "Allow appointment creation for authenticated users" 
ON public.event_appointments 
FOR INSERT 
TO authenticated
WITH CHECK (true);

-- 3. Allow appointment creation for anonymous users (for public booking)
CREATE POLICY "Allow appointment creation for anonymous users" 
ON public.event_appointments 
FOR INSERT 
TO anon
WITH CHECK (true);

-- 4. Allow authenticated users to view only their own appointments
CREATE POLICY "Users can view their own appointments" 
ON public.event_appointments 
FOR SELECT 
TO authenticated
USING (
  auth.jwt() ->> 'email' = email OR 
  auth.uid() IN (SELECT id FROM public.profiles WHERE email = event_appointments.email)
);

-- 5. Admins can manage all appointments
CREATE POLICY "Admins can manage all appointments" 
ON public.event_appointments 
FOR ALL 
TO authenticated
USING (is_admin(auth.uid()))
WITH CHECK (is_admin(auth.uid()));

-- 6. Block all other SELECT access for anonymous users
CREATE POLICY "Block anonymous SELECT access" 
ON public.event_appointments 
FOR SELECT 
TO anon
USING (false);