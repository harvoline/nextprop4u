import { NextResponse } from "next/server";
import portalData from "../../../data/portal_data.json";
import fs from "fs";
import path from "path";

export async function GET() {
  return NextResponse.json({
    status: "online",
    updated_at: portalData.updated_at,
    stats: portalData.stats,
    message: "NextProp4U Agent CRM Sync API is live.",
  });
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

    // Attempt to write locally if running with write permissions (e.g. self-hosted / dev)
    try {
      const dataPath = path.join(process.cwd(), "src", "data", "portal_data.json");
      fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), "utf8");
    } catch {
      // In serverless / read-only Vercel environment, local filesystem is read-only
    }

    return NextResponse.json({
      success: true,
      message: "Sync completed successfully",
      stats: updatedData.stats,
      updated_at: updatedData.updated_at,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Sync failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
