-- Add country field to Creator and Sound models
-- For country-based filtering

-- Add country column to Creator table
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "country" TEXT NOT NULL DEFAULT 'US';

-- Add country column to Sound table
ALTER TABLE "Sound" ADD COLUMN IF NOT EXISTS "country" TEXT NOT NULL DEFAULT 'US';

-- Create indexes for country filtering
CREATE INDEX IF NOT EXISTS "Creator_country_idx" ON "Creator"("country");
CREATE INDEX IF NOT EXISTS "Sound_country_idx" ON "Sound"("country");
