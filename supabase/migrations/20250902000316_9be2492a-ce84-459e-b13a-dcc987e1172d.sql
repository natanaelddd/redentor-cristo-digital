-- Add unique constraint for reading_plan_days to support ON CONFLICT
ALTER TABLE reading_plan_days ADD CONSTRAINT reading_plan_days_plan_id_day_number_key UNIQUE (plan_id, day_number);