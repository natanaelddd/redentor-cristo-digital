-- Fix security issue: Customer data in download_logs is publicly accessible
-- Remove the overly permissive policy that blocks all SELECT access
DROP POLICY IF EXISTS "System operations only for download_logs" ON public.download_logs;

-- Add proper RLS policies for download_logs
-- Users can only view their own download logs when authenticated
CREATE POLICY "Users can view their own download logs" 
ON public.download_logs 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

-- Admins can view all download logs (this already exists but making sure)
CREATE POLICY "Admins can view all download logs" 
ON public.download_logs 
FOR SELECT 
TO authenticated  
USING (is_admin(auth.uid()));

-- Ensure profiles table is also properly secured
-- Drop and recreate policies to be more explicit about anonymous access
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Recreate policies with explicit authenticated requirement
CREATE POLICY "Users can view their own profile" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (is_admin(auth.uid()));

-- Block all anonymous access to profiles explicitly
CREATE POLICY "Block anonymous access to profiles" 
ON public.profiles 
FOR ALL 
TO anon
USING (false)
WITH CHECK (false);