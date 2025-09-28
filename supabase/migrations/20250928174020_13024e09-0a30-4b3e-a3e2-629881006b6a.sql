-- Adicionar políticas RLS mais específicas e melhorar segurança
-- Política para permitir que usuários vejam apenas seus próprios agendamentos (se implementarmos autenticação futura)
CREATE POLICY "Users can view their own appointments" 
ON public.event_appointments 
FOR SELECT 
USING (email = auth.email());

-- Adicionar função para limpar dados sensíveis em logs
CREATE OR REPLACE FUNCTION public.anonymize_appointment_data(appointment_data jsonb)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Remove informações sensíveis dos logs
  RETURN jsonb_build_object(
    'appointment_date', appointment_data->>'appointment_date',
    'appointment_time', appointment_data->>'appointment_time',
    'email_masked', CASE 
      WHEN appointment_data->>'email' IS NOT NULL THEN 
        CONCAT(LEFT(appointment_data->>'email', 2), '***@', SPLIT_PART(appointment_data->>'email', '@', 2))
      ELSE NULL
    END,
    'phone_masked', CASE 
      WHEN appointment_data->>'phone' IS NOT NULL THEN 
        CONCAT(LEFT(appointment_data->>'phone', 3), '***', RIGHT(appointment_data->>'phone', 2))
      ELSE NULL
    END
  );
END;
$$;

-- Trigger para log de auditoria de criação de agendamentos (com dados anonimizados)
CREATE OR REPLACE FUNCTION public.log_appointment_creation()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    action, 
    table_name, 
    record_id, 
    new_values,
    ip_address
  ) VALUES (
    'appointment_created',
    'event_appointments',
    NEW.id,
    anonymize_appointment_data(to_jsonb(NEW)),
    COALESCE(current_setting('request.headers', true)::jsonb->>'x-forwarded-for', 'unknown')
  );
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER appointment_creation_audit
  AFTER INSERT ON public.event_appointments
  FOR EACH ROW
  EXECUTE FUNCTION log_appointment_creation();

-- Adicionar índice para melhorar performance nas consultas por data
CREATE INDEX IF NOT EXISTS idx_event_appointments_date_time 
ON public.event_appointments (appointment_date, appointment_time);

-- Adicionar política para rate limiting (prevenir spam)
CREATE OR REPLACE FUNCTION public.check_appointment_rate_limit(client_email text, client_ip inet DEFAULT NULL)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count integer;
BEGIN
  -- Verificar quantos agendamentos foram feitos pelo mesmo email nas últimas 24 horas
  SELECT COUNT(*) INTO recent_count
  FROM public.event_appointments
  WHERE email = client_email 
    AND created_at > now() - interval '24 hours';
  
  -- Permitir máximo 3 agendamentos por email por dia
  RETURN recent_count < 3;
END;
$$;