-- PostgreSQL / Supabase Schema for Afif Property App

CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Property Listings (Telegram & Direct Landlords)
CREATE TABLE IF NOT EXISTS public.property_listings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id TEXT NOT NULL,
    listing_date TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    title TEXT NOT NULL,
    location_line TEXT,
    asking_price TEXT,
    price_numeric NUMERIC(15, 2),
    currency VARCHAR(10) DEFAULT 'MYR',
    status TEXT NOT NULL DEFAULT 'Available',
    property_type TEXT DEFAULT 'Residential',
    source_excerpt TEXT,
    source_channel TEXT,
    duplicate_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_property_message_id UNIQUE (message_id)
);

CREATE INDEX IF NOT EXISTS idx_property_listing_date ON public.property_listings (listing_date DESC);
CREATE INDEX IF NOT EXISTS idx_property_price_numeric ON public.property_listings (price_numeric);
CREATE INDEX IF NOT EXISTS idx_property_location_trgm ON public.property_listings USING gin (location_line gin_trgm_ops);

-- 2. Social Media Leads (Facebook Groups, Threads, TikTok, Instagram)
CREATE TABLE IF NOT EXISTS public.social_leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_ref TEXT NOT NULL,
    platform TEXT NOT NULL,
    lead_name TEXT NOT NULL,
    contact_number TEXT,
    handle TEXT,
    inquiry_text TEXT,
    target_area TEXT,
    budget_range TEXT,
    property_type TEXT,
    matched_inventory TEXT,
    post_url TEXT,
    is_gold_alert BOOLEAN DEFAULT FALSE,
    lead_status TEXT NOT NULL DEFAULT 'New Match', -- New Match, Draft Posted, In WhatsApp, Viewing Set, Closed
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_lead_ref UNIQUE (lead_ref)
);

CREATE INDEX IF NOT EXISTS idx_leads_platform ON public.social_leads (platform);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.social_leads (lead_status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.social_leads (created_at DESC);

-- Enable Supabase Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.property_listings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.social_leads;
