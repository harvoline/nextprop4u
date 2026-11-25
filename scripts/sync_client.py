#!/usr/bin/env python3
"""
Sync Client for Afif Property App
Pushes local SQLite leads and Telegram inventory to Supabase / PostgreSQL.
Zero binary dependencies (pure standard library).
"""
import os
import sys
import json
import sqlite3
import urllib.request
import urllib.error

SUPABASE_URL = os.environ.get("SUPABASE_URL", "")
SUPABASE_SERVICE_KEY = os.environ.get("SUPABASE_SERVICE_KEY", "")

def sync_leads_from_sqlite(db_path):
    if not os.path.exists(db_path):
        print(f"[!] SQLite DB not found: {db_path}")
        return

    conn = sqlite3.connect(db_path)
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [r[0] for r in cur.fetchall()]
    print(f"[*] Found tables: {tables}")

    table_name = "inquiries" if "inquiries" in tables else ("social_leads" if "social_leads" in tables else tables[0])
    cur.execute(f"SELECT * FROM {table_name}")
    rows = cur.fetchall()
    print(f"[*] Reading {len(rows)} leads from {table_name}...")

    records = []
    for r in rows:
        d = dict(r)
        records.append({
            "lead_ref": str(d.get("id") or d.get("post_id") or d.get("lead_ref")),
            "platform": d.get("platform") or "Social Media",
            "lead_name": d.get("author_name") or d.get("lead_name") or "Prospect",
            "inquiry_text": d.get("content") or d.get("inquiry_text") or "",
            "target_area": d.get("target_area") or "",
            "budget_range": f"RM {d.get('budget_min', '')} - RM {d.get('budget_max', '')}",
            "property_type": d.get("property_type") or "",
            "matched_inventory": d.get("matched_units_summary") or "",
            "post_url": d.get("post_url") or "",
            "lead_status": d.get("status") or "New Match",
        })

    if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
        print("[!] SUPABASE_URL or SUPABASE_SERVICE_KEY missing. Dry-run output:")
        print(json.dumps(records[:2], indent=2))
        return

    # Post to Supabase PostgREST
    url = f"{SUPABASE_URL.rstrip('/')}/rest/v1/social_leads"
    headers = {
        "apikey": SUPABASE_SERVICE_KEY,
        "Authorization": f"Bearer {SUPABASE_SERVICE_KEY}",
        "Content-Type": "application/json",
        "Prefer": "resolution=merge-duplicates",
    }

    req = urllib.request.Request(url, data=json.dumps(records).encode("utf-8"), headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req) as resp:
            print(f"[✓] Successfully synced {len(records)} leads! Status: {resp.status}")
    except urllib.error.HTTPError as e:
        print(f"[x] Sync failed: {e.code} - {e.read().decode('utf-8')}")

if __name__ == "__main__":
    db = sys.argv[1] if len(sys.argv) > 1 else "/home/rakazo/shared/social_leads.sqlite"
    sync_leads_from_sqlite(db)
