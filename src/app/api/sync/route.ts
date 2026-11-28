import { NextResponse } from "next/server";
import portalData from "../../../data/portal_data.json";
import fs from "fs";
import path from "path";

const SUPABASE_URL =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://tizejwwqpexqocxhzytp.supabase.co";
const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_zPgaMpmYUzlcB2eNcX-iiw_znNiS0Ky";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isFull = searchParams.get("full") === "true";

  try {
    // Attempt to read live state from Supabase portal_state table
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/portal_state?id=eq.latest&select=data,updated_at`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
        cache: "no-store",
      }
    );

    if (res.ok) {
      const rows = await res.json();
      if (rows && rows.length > 0 && rows[0].data) {
        const live = rows[0].data;
        if (isFull) {
          return NextResponse.json(live, {
            headers: { "Cache-Control": "no-store, max-age=0" },
          });
        }
        return NextResponse.json(
          {
            status: "online",
            source: "supabase_live",
            updated_at: live.updated_at || rows[0].updated_at,
            stats: live.stats,
            message: "NextProp4U Agent CRM Sync API is live (connected to Supabase).",
          },
          { headers: { "Cache-Control": "no-store, max-age=0" } }
        );
      }
    }
  } catch (err) {
    console.warn("Supabase fetch failed, falling back to static portalData:", err);
  }

  // Fallback to static portal_data.json
  if (isFull) {
    return NextResponse.json(portalData, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  }

  return NextResponse.json(
    {
      status: "online",
      source: "static_bundle",
      updated_at: portalData.updated_at,
      stats: portalData.stats,
      message: "NextProp4U Agent CRM Sync API is live.",
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } }
  );
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const authHeader = request.headers.get("authorization");
    const secret =
      body.secret ||
      (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null);

    const validSecret =
      process.env.SYNC_API_KEY || "nextprop_sync_secret_afif_2026";

    if (secret !== validSecret) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid sync secret key" },
        { status: 401 }
      );
    }

    const { inventory, inquiries, matches, owner_listings } = body;

    const updatedData = {
      updated_at: new Date().toISOString(),
      stats: {
        total_inquiries: inquiries?.length || portalData.stats.total_inquiries,
        total_inventory: inventory?.length || portalData.stats.total_inventory,
        total_matches: matches?.length || portalData.stats.total_matches,
        total_owners: owner_listings?.length || portalData.stats.total_owners,
      },
      inventory: inventory || portalData.inventory,
      inquiries: inquiries || portalData.inquiries,
      matches: matches || portalData.matches,
      owner_listings: owner_listings || portalData.owner_listings,
    };

    // 1. Sync directly to Supabase portal_state table
    try {
      await fetch(`${SUPABASE_URL}/rest/v1/portal_state`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          "Content-Type": "application/json",
          Prefer: "resolution=merge-duplicates",
        },
        body: JSON.stringify({
          id: "latest",
          data: updatedData,
          updated_at: updatedData.updated_at,
        }),
      });
    } catch (sbErr) {
      console.error("Supabase upsert failed:", sbErr);
    }

    // 2. Attempt local write if local filesystem is writable (dev/self-hosted)
    try {
      const dataPath = path.join(process.cwd(), "src", "data", "portal_data.json");
      fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), "utf8");
    } catch {
      // Read-only environment like Vercel edge/serverless
    }

    return NextResponse.json({
      success: true,
      message: "Sync completed successfully and saved to Supabase",
      stats: updatedData.stats,
      updated_at: updatedData.updated_at,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Sync failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
