-- Seed data for TikTok Intelligence
-- Run this in Neon console or psql

-- Insert sample trends
INSERT INTO "Trend" (id, slug, title, description, category, country, "growthRate", views, creators, "isViral", "isNew", "viralScore", "velocity", saturation, "creatorFit", engagement, "avgViews", competition, urgency, "publishedAt", "updatedAt")
VALUES
  (gen_random_uuid(), 'tiktok-dance-trends-2026', 'TikTok Dance Trends 2026', 'Latest viral dance trends taking over TikTok right now.', 'Dance', 'US', 245, '120M', 45000, true, true, 95, 1250000, 0.3, 0.85, 8.5, '1.2M', 'LOW', 'HIGH', NOW(), NOW()),
  (gen_random_uuid(), 'viral-hashtag-challenge', 'Viral Hashtag Challenge', 'The hashtag challenge everyone is talking about.', 'Challenge', 'US', 189, '85M', 28000, true, false, 88, 850000, 0.4, 0.75, 7.2, '850K', 'MEDIUM', 'MEDIUM', NOW(), NOW()),
  (gen_random_uuid(), 'tiktok-creator-growth', 'TikTok Creator Growth Hacks', 'Proven strategies to grow your TikTok following fast.', 'Growth', 'US', 156, '45M', 12000, false, false, 72, 420000, 0.6, 0.65, 6.8, '450K', 'HIGH', 'LOW', NOW(), NOW()),
  (gen_random_uuid(), 'trending-sounds-2026', 'Trending Sounds 2026', 'The hottest sounds that are trending right now.', 'Music', 'US', 298, '200M', 62000, true, true, 96, 2100000, 0.25, 0.9, 9.2, '2.1M', 'LOW', 'HIGH', NOW(), NOW()),
  (gen_random_uuid(), 'tiktok-marketing-guide', 'TikTok Marketing Guide', 'Complete guide to marketing on TikTok for brands.', 'Marketing', 'US', 134, '32M', 8500, false, false, 68, 320000, 0.7, 0.55, 5.5, '320K', 'HIGH', 'LOW', NOW(), NOW())
ON CONFLICT (slug) DO UPDATE SET
  "growthRate" = EXCLUDED."growthRate",
  views = EXCLUDED.views,
  "viralScore" = EXCLUDED."viralScore",
  "updatedAt" = NOW();

-- Insert sample hashtags
INSERT INTO "Hashtag" (id, name, views, videos, "growthRate", category, "isRising", velocity, "scrapedAt")
VALUES
  (gen_random_uuid(), 'dance', '500M', 2500000, 125, 'Dance', true, 15000, NOW()),
  (gen_random_uuid(), 'viral', '1.2B', 5000000, 200, 'Trending', true, 45000, NOW()),
  (gen_random_uuid(), 'tiktok', '10B', 50000000, 50, 'General', false, 5000, NOW()),
  (gen_random_uuid(), 'fyp', '5B', 30000000, 80, 'General', true, 12000, NOW()),
  (gen_random_uuid(), 'music', '800M', 8000000, 95, 'Music', true, 18000, NOW())
ON CONFLICT (name) DO UPDATE SET
  views = EXCLUDED.views,
  videos = EXCLUDED.videos,
  "growthRate" = EXCLUDED."growthRate",
  "scrapedAt" = NOW();

-- Insert sample creators
INSERT INTO "Creator" (id, username, "displayName", followers, following, likes, niche, "isVerified", "momentumScore", "engagementRate", "avgViews", "updatedAt")
VALUES
  (gen_random_uuid(), 'mrbeast', 'MrBeast', 100000000, 100, 5000000000, 'Entertainment', true, 98, 12.5, 25000000, NOW()),
  (gen_random_uuid(), 'charlidamelio', 'Charli D''Amelio', 150000000, 500, 12000000000, 'Dance', true, 92, 8.5, 8000000, NOW()),
  (gen_random_uuid(), 'khaby.lame', 'Khaby Lame', 160000000, 200, 2500000000, 'Comedy', true, 95, 15.2, 12000000, NOW())
ON CONFLICT (username) DO UPDATE SET
  followers = EXCLUDED.followers,
  likes = EXCLUDED.likes,
  "updatedAt" = NOW();

-- Insert sample sounds
INSERT INTO "Sound" (id, title, author, uses, "growthRate", "isViral", velocity, "viralScore", "scrapedAt")
VALUES
  (gen_random_uuid(), 'Original Sound - Viral Hit', 'Popular Artist', 2500000, 450, true, 125000, 94, NOW()),
  (gen_random_uuid(), 'Trending Audio 2026', 'DJ Trend', 1800000, 320, true, 98000, 89, NOW()),
  (gen_random_uuid(), 'Dance Challenge Music', 'Beat Maker', 3200000, 280, true, 156000, 91, NOW())
ON CONFLICT (id) DO NOTHING;

SELECT 'Seed data inserted successfully!' as result;
