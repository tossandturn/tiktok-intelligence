-- Add Daily Snapshot Models for Historical Data
-- SECTION 2: Historical Trend Database

-- Creator Daily Snapshot
CREATE TABLE "CreatorDailySnapshot" (
    "id" TEXT NOT NULL,
    "creatorId" TEXT NOT NULL,
    "followers" INTEGER NOT NULL,
    "following" INTEGER NOT NULL,
    "totalLikes" BIGINT NOT NULL,
    "totalVideos" INTEGER NOT NULL,
    "trendScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreatorDailySnapshot_pkey" PRIMARY KEY ("id")
);

-- Video Daily Snapshot
CREATE TABLE "VideoDailySnapshot" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "views" BIGINT NOT NULL,
    "likes" BIGINT NOT NULL,
    "comments" BIGINT NOT NULL,
    "shares" BIGINT NOT NULL,
    "viewsGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "likesGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "sharesGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "commentsGrowth" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trendScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VideoDailySnapshot_pkey" PRIMARY KEY ("id")
);

-- Hashtag Daily Snapshot
CREATE TABLE "HashtagDailySnapshot" (
    "id" TEXT NOT NULL,
    "hashtagId" TEXT NOT NULL,
    "usageCount" BIGINT NOT NULL,
    "videoCount" INTEGER NOT NULL DEFAULT 0,
    "viewCount" BIGINT NOT NULL DEFAULT 0,
    "growthRate" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "trendScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "collectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "HashtagDailySnapshot_pkey" PRIMARY KEY ("id")
);

-- Opportunity Score Table (SECTION 8)
CREATE TABLE "OpportunityScore" (
    "id" TEXT NOT NULL,
    "targetType" TEXT NOT NULL,
    "targetId" TEXT,
    "name" TEXT NOT NULL,
    "demandScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "competitionScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "opportunityScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "country" TEXT NOT NULL DEFAULT 'US',
    "calculatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),

    CONSTRAINT "OpportunityScore_pkey" PRIMARY KEY ("id")
);

-- Add foreign keys
ALTER TABLE "CreatorDailySnapshot" ADD CONSTRAINT "CreatorDailySnapshot_creatorId_fkey"
    FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "VideoDailySnapshot" ADD CONSTRAINT "VideoDailySnapshot_videoId_fkey"
    FOREIGN KEY ("videoId") REFERENCES "Video"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "HashtagDailySnapshot" ADD CONSTRAINT "HashtagDailySnapshot_hashtagId_fkey"
    FOREIGN KEY ("hashtagId") REFERENCES "Hashtag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- Create indexes
CREATE INDEX "CreatorDailySnapshot_creatorId_idx" ON "CreatorDailySnapshot"("creatorId");
CREATE INDEX "CreatorDailySnapshot_createdAt_idx" ON "CreatorDailySnapshot"("createdAt");
CREATE INDEX "CreatorDailySnapshot_trendScore_idx" ON "CreatorDailySnapshot"("trendScore");

CREATE INDEX "VideoDailySnapshot_videoId_idx" ON "VideoDailySnapshot"("videoId");
CREATE INDEX "VideoDailySnapshot_collectedAt_idx" ON "VideoDailySnapshot"("collectedAt");
CREATE INDEX "VideoDailySnapshot_trendScore_idx" ON "VideoDailySnapshot"("trendScore");

CREATE INDEX "HashtagDailySnapshot_hashtagId_idx" ON "HashtagDailySnapshot"("hashtagId");
CREATE INDEX "HashtagDailySnapshot_collectedAt_idx" ON "HashtagDailySnapshot"("collectedAt");
CREATE INDEX "HashtagDailySnapshot_trendScore_idx" ON "HashtagDailySnapshot"("trendScore");

CREATE INDEX "OpportunityScore_targetType_idx" ON "OpportunityScore"("targetType");
CREATE INDEX "OpportunityScore_opportunityScore_idx" ON "OpportunityScore"("opportunityScore");
CREATE INDEX "OpportunityScore_calculatedAt_idx" ON "OpportunityScore"("calculatedAt");
CREATE INDEX "OpportunityScore_country_idx" ON "OpportunityScore"("country");
