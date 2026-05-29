-- Add AI prediction fields to Trend table
ALTER TABLE "Trend" ADD COLUMN IF NOT EXISTS "predictedEngagement" INTEGER;
ALTER TABLE "Trend" ADD COLUMN IF NOT EXISTS "momentumScore" DOUBLE PRECISION DEFAULT 0;
ALTER TABLE "Trend" ADD COLUMN IF NOT EXISTS "trendForecast7d" DOUBLE PRECISION;
ALTER TABLE "Trend" ADD COLUMN IF NOT EXISTS "trendForecast30d" DOUBLE PRECISION;
ALTER TABLE "Trend" ADD COLUMN IF NOT EXISTS "viralProbability" DOUBLE PRECISION DEFAULT 0;
ALTER TABLE "Trend" ADD COLUMN IF NOT EXISTS "peakTime" TIMESTAMP(3);

-- Add fields to Video table
ALTER TABLE "Video" ADD COLUMN IF NOT EXISTS "engagementRate" DOUBLE PRECISION;
ALTER TABLE "Video" ADD COLUMN IF NOT EXISTS "retentionRate" DOUBLE PRECISION;
ALTER TABLE "Video" ADD COLUMN IF NOT EXISTS "watchTime" DOUBLE PRECISION;

-- Add fields to Creator table
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "momentumScore" DOUBLE PRECISION DEFAULT 0;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "engagementRate" DOUBLE PRECISION DEFAULT 0;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "avgViews" INTEGER DEFAULT 0;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "viralVideoRate" DOUBLE PRECISION DEFAULT 0;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "audienceOverlap" JSONB;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "predictedGrowth7d" DOUBLE PRECISION;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "predictedGrowth30d" DOUBLE PRECISION;
ALTER TABLE "Creator" ADD COLUMN IF NOT EXISTS "lastAnalyzed" TIMESTAMP(3);

-- Add fields to Hashtag table
ALTER TABLE "Hashtag" ADD COLUMN IF NOT EXISTS "velocity" DOUBLE PRECISION DEFAULT 0;
ALTER TABLE "Hashtag" ADD COLUMN IF NOT EXISTS "engagementRate" DOUBLE PRECISION;
ALTER TABLE "Hashtag" ADD COLUMN IF NOT EXISTS "avgViews" INTEGER;
ALTER TABLE "Hashtag" ADD COLUMN IF NOT EXISTS "viralScore" DOUBLE PRECISION;
ALTER TABLE "Hashtag" ADD COLUMN IF NOT EXISTS "relatedHashtags" JSONB;

-- Add fields to Sound table
ALTER TABLE "Sound" ADD COLUMN IF NOT EXISTS "velocity" DOUBLE PRECISION;
ALTER TABLE "Sound" ADD COLUMN IF NOT EXISTS "viralScore" DOUBLE PRECISION;
ALTER TABLE "Sound" ADD COLUMN IF NOT EXISTS "trendingSince" TIMESTAMP(3);

-- Create TrendAnalysis table
CREATE TABLE IF NOT EXISTS "TrendAnalysis" (
    "id" TEXT NOT NULL,
    "trendId" TEXT,
    "hashtagId" TEXT,
    "soundId" TEXT,
    "trendScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "velocity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "predictedEngagement" INTEGER,
    "forecast7d" DOUBLE PRECISION,
    "forecast30d" DOUBLE PRECISION,
    "momentumDirection" TEXT,
    "riskLevel" TEXT,
    "opportunityWindow" TEXT,
    "competitorSaturation" DOUBLE PRECISION,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "TrendAnalysis_pkey" PRIMARY KEY ("id")
);

-- Create indexes for TrendAnalysis
CREATE INDEX IF NOT EXISTS "TrendAnalysis_trendScore_idx" ON "TrendAnalysis"("trendScore");
CREATE INDEX IF NOT EXISTS "TrendAnalysis_velocity_idx" ON "TrendAnalysis"("velocity");
CREATE INDEX IF NOT EXISTS "TrendAnalysis_lastUpdated_idx" ON "TrendAnalysis"("lastUpdated");

-- Create UserAlert table
CREATE TABLE IF NOT EXISTS "UserAlert" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trendId" TEXT,
    "hashtagId" TEXT,
    "creatorId" TEXT,
    "alertType" TEXT NOT NULL,
    "threshold" DOUBLE PRECISION,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "frequency" TEXT NOT NULL DEFAULT 'daily',
    "lastSent" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "UserAlert_pkey" PRIMARY KEY ("id")
);

-- Create indexes for UserAlert
CREATE INDEX IF NOT EXISTS "UserAlert_userId_idx" ON "UserAlert"("userId");
CREATE INDEX IF NOT EXISTS "UserAlert_alertType_idx" ON "UserAlert"("alertType");
CREATE INDEX IF NOT EXISTS "UserAlert_isActive_idx" ON "UserAlert"("isActive");

-- Create Report table
CREATE TABLE IF NOT EXISTS "Report" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "isShareable" BOOLEAN NOT NULL DEFAULT true,
    "shareToken" TEXT UNIQUE,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- Create indexes for Report
CREATE INDEX IF NOT EXISTS "Report_userId_idx" ON "Report"("userId");
CREATE INDEX IF NOT EXISTS "Report_shareToken_idx" ON "Report"("shareToken");
CREATE INDEX IF NOT EXISTS "Report_type_idx" ON "Report"("type");

-- Create CreatorVideo table
CREATE TABLE IF NOT EXISTS "CreatorVideo" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    CONSTRAINT "CreatorVideo_pkey" PRIMARY KEY ("id")
);

-- Create indexes for CreatorVideo
CREATE INDEX IF NOT EXISTS "CreatorVideo_creatorId_idx" ON "CreatorVideo"("creatorId");

-- Create unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "CreatorVideo_creatorId_videoId_key" ON "CreatorVideo"("creatorId", "videoId");
