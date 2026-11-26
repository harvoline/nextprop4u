"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "../../lib/supabase/client";
import portalData from "../../data/portal_data.json";
import {
  MessageCircle,
  Copy,
  ExternalLink,
  Check,
  Search,
  Filter,
  Users,
  Building,
  Sparkles,
  LogOut,
  Home,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  Phone,
  RefreshCw,
  Tag,
  MapPin,
  Calendar,
  Layers,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    "leads" | "inventory" | "landlords" | "groups"
  >("leads");
  const [approach, setApproach] = useState<"A" | "B">("A");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Status overrides stored in localStorage
  const [leadStatuses, setLeadStatuses] = useState<Record<string, string>>({});
  const [ownerStatuses, setOwnerStatuses] = useState<Record<string, string>>({});
  const [invStatuses, setInvStatuses] = useState<Record<string, string>>({});
  const [matchStatuses, setMatchStatuses] = useState<Record<string, string>>({});

  // Filters for Leads (Default: active_only)
  const [leadSearch, setLeadSearch] = useState("");
  const [leadPlatformFilter, setLeadPlatformFilter] = useState("all");
  const [leadStatusFilter, setLeadStatusFilter] = useState("active_only");
  const [leadPage, setLeadPage] = useState(1);

  // Filters for Telegram Inventory (Default: available)
  const [invSearch, setInvSearch] = useState("");
  const [invStatusFilter, setInvStatusFilter] = useState("available");
  const [invSortOrder, setInvSortOrder] = useState<"desc" | "asc">("desc");
  const [invPage, setInvPage] = useState(1);
  const [expandedInvId, setExpandedInvId] = useState<number | null>(null);

  // Filters for Landlords (Default: active_only)
  const [ownerSearch, setOwnerSearch] = useState("");
  const [ownerStatusFilter, setOwnerStatusFilter] = useState("active_only");
  const [ownerPage, setOwnerPage] = useState(1);

  const PAGE_SIZE = 10;

  // Load status overrides from localStorage on client mount
  useEffect(() => {
    try {
      const savedLeads = localStorage.getItem("nextprop_lead_statuses");
      if (savedLeads) setLeadStatuses(JSON.parse(savedLeads));

      const savedOwners = localStorage.getItem("nextprop_owner_statuses");
      if (savedOwners) setOwnerStatuses(JSON.parse(savedOwners));

      const savedInv = localStorage.getItem("nextprop_inv_statuses");
      if (savedInv) setInvStatuses(JSON.parse(savedInv));

      const savedMatches = localStorage.getItem("nextprop_match_statuses");
      if (savedMatches) setMatchStatuses(JSON.parse(savedMatches));
    } catch (e) {
      console.error("Failed to load local storage status:", e);
    }
  }, []);

  // Update handlers with persistent storage
  const updateLeadStatus = (leadId: string, newStatus: string) => {
    setLeadStatuses((prev) => {
      const next = { ...prev, [leadId]: newStatus };
      try {
        localStorage.setItem("nextprop_lead_statuses", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateOwnerStatus = (ownerId: string, newStatus: string) => {
    setOwnerStatuses((prev) => {
      const next = { ...prev, [ownerId]: newStatus };
      try {
        localStorage.setItem("nextprop_owner_statuses", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateInvStatus = (invId: string | number, newStatus: string) => {
    setInvStatuses((prev) => {
      const next = { ...prev, [String(invId)]: newStatus };
      try {
        localStorage.setItem("nextprop_inv_statuses", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const updateMatchStatus = (matchId: string, newStatus: string) => {
    setMatchStatuses((prev) => {
      const next = { ...prev, [matchId]: newStatus };
      try {
        localStorage.setItem("nextprop_match_statuses", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  // Helper status resolution and active checks
  const getLeadStatus = (lead: any) => {
    if (leadStatuses[lead.id]) return leadStatuses[lead.id];
    const raw = (lead.status || "").toLowerCase();
    if (raw.includes("close") || raw.includes("selesai") || raw.includes("closed")) return "selesai";
    if (raw.includes("drop") || raw.includes("batal") || raw.includes("tak berminat")) return "tak_berminat";
    if (raw.includes("follow")) return "follow_up";
    if (raw.includes("view")) return "viewing";
    return "baru";
  };

  const isLeadActive = (status: string) => {
    return ["baru", "draf_disalin", "follow_up", "viewing"].includes(status);
  };

  const getOwnerStatus = (owner: any) => {
    if (ownerStatuses[owner.id]) return ownerStatuses[owner.id];
    const raw = (owner.status || "").toLowerCase();
    const priceRaw = (owner.price || "").toLowerCase();
    if (raw.includes("rented") || raw.includes("disewa") || priceRaw.includes("rented") || priceRaw.includes("disewa")) return "rented";
    if (raw.includes("sold") || raw.includes("terjual") || priceRaw.includes("sold") || priceRaw.includes("terjual")) return "sold";
    if (raw.includes("runding") || raw.includes("nego")) return "negotiating";
    if (raw.includes("inactive") || raw.includes("batal")) return "inactive";
    return "available";
  };

  const isOwnerActive = (status: string) => {
    return ["available", "negotiating"].includes(status);
  };

  const getInvStatus = (item: any) => {
    if (invStatuses[String(item.id)]) return invStatuses[String(item.id)];
    const isBooked =
      (item.title && item.title.toUpperCase().includes("BOOKED")) ||
      (item.status && item.status.toUpperCase().includes("BOOKED"));
    return isBooked ? "booked" : "available";
  };

  const isInvActive = (status: string) => {
    return status === "available";
  };

  // Match lookup map - HANYA PADANKAN UNIT YANG MASIH AKTIF
  const matchesByInquiryId = useMemo(() => {
    const map = new Map<string, any[]>();
    for (const match of portalData.matches || []) {
      const inqId = match.inquiry_id;

      // 1. Direct match status check
      const mStatus = matchStatuses[match.id] || "available";
      if (mStatus === "inactive" || mStatus === "rented" || mStatus === "booked") {
        continue;
      }

      // 2. Filter out if matched owner listing is no longer active
      if (match.contact_person || match.source_url) {
        const matchingOwner = (portalData.owner_listings || []).find(
          (o: any) =>
            (match.source_url && o.source_url === match.source_url) ||
            (o.author && match.contact_person && match.contact_person.toLowerCase().includes(o.author.toLowerCase()))
        );
        if (matchingOwner) {
          const oStatus = getOwnerStatus(matchingOwner);
          if (!isOwnerActive(oStatus)) {
            continue; // Owner is already rented / sold / inactive!
          }
        }
      }

      // 3. Filter out if matched Telegram inventory item is booked
      if (match.property_title) {
        const matchingInv = (portalData.inventory || []).find(
          (inv: any) =>
            inv.title &&
            (match.property_title.toLowerCase().includes(inv.title.toLowerCase()) ||
              inv.title.toLowerCase().includes(match.property_title.toLowerCase()))
        );
        if (matchingInv) {
          const iStatus = getInvStatus(matchingInv);
          if (!isInvActive(iStatus)) {
            continue; // Inventory item is booked or expired!
          }
        }
      }

      if (!map.has(inqId)) {
        map.set(inqId, []);
      }
      map.get(inqId)!.push(match);
    }
    return map;
  }, [matchStatuses, ownerStatuses, invStatuses]);

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return (portalData.inquiries || []).filter((item: any) => {
      const q = leadSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        (item.location_target && item.location_target.toLowerCase().includes(q)) ||
        (item.raw_text && item.raw_text.toLowerCase().includes(q)) ||
        (item.property_type && item.property_type.toLowerCase().includes(q));

      const matchPlatform =
        leadPlatformFilter === "all" ||
        (item.platform &&
          item.platform.toLowerCase().includes(leadPlatformFilter.toLowerCase()));

      const currentStatus = getLeadStatus(item);
      const matchStatus =
        leadStatusFilter === "all" ||
        (leadStatusFilter === "active_only" && isLeadActive(currentStatus)) ||
        leadStatusFilter === currentStatus;

      return matchSearch && matchPlatform && matchStatus;
    });
  }, [leadSearch, leadPlatformFilter, leadStatusFilter, leadStatuses]);

  // Filtered Telegram Inventory
  const filteredInventory = useMemo(() => {
    const list = (portalData.inventory || []).filter((item: any) => {
      const q = invSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.title && item.title.toLowerCase().includes(q)) ||
        (item.location_line && item.location_line.toLowerCase().includes(q)) ||
        (item.source_excerpt && item.source_excerpt.toLowerCase().includes(q)) ||
        (item.asking_price && item.asking_price.toLowerCase().includes(q));

      const currentStatus = getInvStatus(item);
      const matchStatus =
        invStatusFilter === "all" ||
        (invStatusFilter === "available" && currentStatus === "available") ||
        (invStatusFilter === "booked" && currentStatus === "booked") ||
        invStatusFilter === currentStatus;

      return matchSearch && matchStatus;
    });

    list.sort((a: any, b: any) => {
      const da = new Date(a.sort_date || a.day || a.date).getTime() || 0;
      const db = new Date(b.sort_date || b.day || b.date).getTime() || 0;
      return invSortOrder === "desc" ? db - da : da - db;
    });

    return list;
  }, [invSearch, invStatusFilter, invSortOrder, invStatuses]);

  // Filtered Direct Landlords
  const filteredOwners = useMemo(() => {
    return (portalData.owner_listings || []).filter((item: any) => {
      const q = ownerSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        (item.author && item.author.toLowerCase().includes(q)) ||
        (item.location && item.location.toLowerCase().includes(q)) ||
        (item.property_type && item.property_type.toLowerCase().includes(q)) ||
        (item.price && item.price.toLowerCase().includes(q));

      const currentStatus = getOwnerStatus(item);
      const matchStatus =
        ownerStatusFilter === "all" ||
        (ownerStatusFilter === "active_only" && isOwnerActive(currentStatus)) ||
        ownerStatusFilter === currentStatus;

      return matchSearch && matchStatus;
    });
  }, [ownerSearch, ownerStatusFilter, ownerStatuses]);

  // Curated Resident Groups & Telegram Channels
  const residentGroups = [
    {
      name: "Telegram Maxxan Subsale & Rental Co-Broke",
      platform: "Telegram Channel",
      region: "Kuala Lumpur, Selangor & Klang Valley",
      members: "2,400+ Ejen & Perunding",
      focus: "Stok terkini, Co-broke, dan carian unit terus dari ejen Maxxan",
      url: "https://t.me/sharelistingmaxxan",
    },
    {
      name: "WARGA SETAPAK & DANAU KOTA RESIDENTS",
      platform: "Facebook Group",
      region: "Setapak, Danau Kota, Wangsa Maju",
      members: "115,000",
      focus: "Sewa, beli rumah & isu komuniti Setapak",
      url: "https://www.facebook.com/groups/1046576693230474/",
    },
    {
      name: "PENDUDUK WANGSA MAJU & MELAWATI",
      platform: "Facebook Group",
      region: "Wangsa Maju, Taman Melawati & Keramat",
      members: "48,000",
      focus: "Sewa landed, kondominium LRT Wangsa Maju",
      url: "https://www.facebook.com/groups/240093863116518/",
    },
    {
      name: "Rumah Sewa Kuala Lumpur & Gombak",
      platform: "Facebook Group",
      region: "Gombak, Titiwangsa, Sentul & KL Border",
      members: "185,000",
      focus: "Pertanyaan harian rumah sewa bajet RM800-RM2,000",
      url: "https://www.facebook.com/groups/1498367340428302/",
    },
    {
      name: "MERU KLANG RESIDENTS OFFICIAL®️",
      platform: "Facebook Group",
      region: "Klang, Meru, Bukit Raja & Kapar",
      members: "92,000",
      focus: "Penyewa mencari landed bebas banjir dan rumah sewa berpatutan",
      url: "https://www.facebook.com/groups/414832269485120/",
    },
    {
      name: "WARGA SHAH ALAM & SEKSYEN RESIDENTS",
      platform: "Facebook Group",
      region: "Shah Alam (Seksyen 7, 9, 20, 22)",
      members: "140,000",
      focus: "Apartment & landed mampu milik berdekatan UiTM & hospital",
      url: "https://www.facebook.com/groups/wargashahalam/",
    },
  ];

  // Helper to generate ready-to-use WhatsApp drafts
  const getDraft = (lead: any) => {
    const loc = lead.location_target || "Kuala Lumpur / Selangor";
    const author = lead.author || "Tuan/Puan";
    const bMin = lead.budget_min ? `RM${Math.round(lead.budget_min)}` : "RM700";
    const bMax = lead.budget_max ? `RM${Math.round(lead.budget_max)}` : "RM1,200";
    const isBuyer =
      lead.inquiry_type === "buyer_sale" || (lead.budget_max && lead.budget_max > 100000);

    const waCustomText = isBuyer
      ? `Salam Encik Afif (Maxxan Realty), saya ${author} dari ${lead.platform || "media sosial"}. Saya mencari rumah subsale di area ${loc} bajet sekitar ${bMax}. Boleh bantu propose unit yang sesuai?`
      : `Salam Encik Afif (Maxxan Realty), saya ${author} dari ${lead.platform || "media sosial"}. Saya mencari rumah sewa di area ${loc} bajet sekitar ${bMin}–${bMax}. Boleh share pilihan unit?`;

    const waUrl = `https://wa.me/601158683907?text=${encodeURIComponent(waCustomText)}`;

    if (isBuyer) {
      if (approach === "A") {
        return `Salam ${author}. Saya Afif dari Maxxan Realty (+601158683907). Saya mempunyai beberapa pilihan rumah subsale sedia ada di ${loc} dalam lingkungan bajet ${bMax}. Boleh saya kongsikan detail unit & bantu semak kelayakan pinjaman (Bank/LPPSA)? Boleh terus hubungi saya di WhatsApp: ${waUrl}`;
      } else {
        return `Hi ${author}. Saya Afif dari Maxxan Realty (+601158683907). Boleh saya tahu kriteria spesifik (landed / strata) yang ${author} cari di ${loc}? Boleh klik WhatsApp saya di ${waUrl} untuk saya bantu propose senarai unit terbaik dan semak kelayakan pinjaman. Terima kasih!`;
      }
    } else {
      if (approach === "A") {
        return `Salam ${author}. Saya Afif dari Maxxan Realty (+601158683907). Kami mempunyai pilihan rumah untuk disewa di ${loc} dalam lingkungan bajet ${bMin}–${bMax}. Boleh saya hubungi untuk kongsikan gambar unit dan tetapkan masa viewing? Boleh terus WhatsApp saya di ${waUrl} ya. Terima kasih!`;
      } else {
        return `Hi ${author}. Saya Afif dari Maxxan Realty (+601158683907). Boleh saya tahu jika ${author} mencari kawasan atau taman spesifik di ${loc} untuk saya bantu padankan rumah paling sesuai? Boleh klik WhatsApp saya di ${waUrl} ya supaya kami boleh propose pilihan sedia ada. Terima kasih!`;
      }
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);

    // Auto-advance lead to draf_disalin if currently baru
    if (leadStatuses[id] === "baru" || !leadStatuses[id]) {
      updateLeadStatus(id, "draf_disalin");
    }
  };

  // Active counts for KPIs
  const totalActiveLeads = useMemo(() => {
    return (portalData.inquiries || []).filter((l: any) => isLeadActive(getLeadStatus(l))).length;
  }, [leadStatuses]);

  const totalActiveInventory = useMemo(() => {
    return (portalData.inventory || []).filter((i: any) => isInvActive(getInvStatus(i))).length;
  }, [invStatuses]);

  const totalActiveMatches = useMemo(() => {
    let count = 0;
    for (const list of matchesByInquiryId.values()) {
      count += list.length;
    }
    return count;
  }, [matchesByInquiryId]);

  const totalActiveOwners = useMemo(() => {
    return (portalData.owner_listings || []).filter((o: any) => isOwnerActive(getOwnerStatus(o))).length;
  }, [ownerStatuses]);

  return (
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-[var(--color-ink)] text-[var(--color-paper)] px-4 sm:px-6 py-3 border-b border-[color-mix(in_oklab,var(--color-paper)_18%,transparent)] flex items-center justify-between gap-3 sticky top-0 z-30 shadow-sm">
        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[var(--color-accent)] shrink-0">
            <Image
              src="/images/please_follow_my_picture_and_3de36cdc_2K.jpg"
              alt="Muhammad Norafif"
              width={32}
              height={32}
              className="object-cover object-top"
            />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm sm:text-base leading-tight truncate">
              Muhammad Norafif · Portal Ejen &amp; CRM
            </div>
            <div className="text-[11px] text-[var(--color-accent)] font-medium flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span>Maxxan Realty Sdn Bhd</span>
              <span className="hidden sm:inline">·</span>
              <span className="inline-flex items-center gap-1 text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse shrink-0"></span>
                Auto-Sync Rakazo Aktif
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[var(--color-paper)] hover:text-[var(--color-accent)] hidden sm:flex items-center gap-1 border border-[color-mix(in_oklab,var(--color-paper)_25%,transparent)] px-3 py-1.5 rounded-[2px] whitespace-nowrap"
          >
            <span>Laman Utama</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={async () => {
              try {
                const supabase = createClient();
                await supabase.auth.signOut();
              } catch (err) {
                console.error("Signout error:", err);
              }
              window.location.href = "/login";
            }}
            className="text-xs text-[var(--color-paper-2)] hover:text-[var(--color-accent)] flex items-center gap-1.5 cursor-pointer bg-white/10 px-2.5 sm:px-3 py-1.5 rounded-[2px] whitespace-nowrap"
          >
            <LogOut className="w-3.5 h-3.5 shrink-0" />
            <span>Log Keluar</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="sheet p-4 cursor-pointer hover:border-[var(--color-accent)] transition" onClick={() => setActiveTab("leads")}>
            <div className="text-xs font-medium text-[var(--color-muted)] flex items-center justify-between">
              <span>Pertanyaan Leads</span>
              <Users className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            </div>
            <div className="font-display text-2xl sm:text-3xl text-[var(--color-ink)] mt-1 tabular-nums">
              {totalActiveLeads}
            </div>
            <div className="text-xs text-[var(--color-accent)] font-medium mt-0.5">
              {totalActiveLeads} Aktif ({portalData.inquiries?.length || 120} Jumlah)
            </div>
          </div>

          <div className="sheet p-4 cursor-pointer hover:border-[var(--color-accent)] transition" onClick={() => setActiveTab("inventory")}>
            <div className="text-xs font-medium text-[var(--color-muted)] flex items-center justify-between">
              <span>Inventori Telegram</span>
              <Layers className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            </div>
            <div className="font-display text-2xl sm:text-3xl text-[var(--color-ink)] mt-1 tabular-nums">
              {totalActiveInventory}
            </div>
            <div className="text-xs text-[var(--color-accent)] font-medium mt-0.5">
              {totalActiveInventory} Tersedia ({portalData.inventory?.length || 75} Jumlah)
            </div>
          </div>

          <div className="sheet p-4 cursor-pointer hover:border-[var(--color-accent)] transition" onClick={() => setActiveTab("leads")}>
            <div className="text-xs font-medium text-[var(--color-muted)] flex items-center justify-between">
              <span>Unit Dipadankan</span>
              <Sparkles className="w-3.5 h-3.5 text-[var(--color-accent)]" />
            </div>
            <div className="font-display text-2xl sm:text-3xl text-[var(--color-accent)] mt-1 tabular-nums">
              {totalActiveMatches}
            </div>
            <div className="text-xs text-[var(--color-ink-2)] font-medium mt-0.5">
              Hanya Padanan Unit Aktif
            </div>
          </div>

          <div className="sheet p-4 cursor-pointer hover:border-[var(--color-accent)] transition" onClick={() => setActiveTab("landlords")}>
            <div className="text-xs font-medium text-[var(--color-muted)] flex items-center justify-between">
              <span>Pemilik Langsung</span>
              <Home className="w-3.5 h-3.5 text-[var(--color-muted)]" />
            </div>
            <div className="font-display text-2xl sm:text-3xl text-[var(--color-ink)] mt-1 tabular-nums">
              {totalActiveOwners}
            </div>
            <div className="text-xs text-[var(--color-ink-2)] font-medium mt-0.5">
              {totalActiveOwners} Tersedia ({portalData.owner_listings?.length || 44} Jumlah)
            </div>
          </div>
        </div>

        {/* Tab & Filter Bar */}
        <div className="sheet p-3 sm:p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-1.5 w-full lg:w-auto">
            <button
              onClick={() => {
                setActiveTab("leads");
                setLeadPage(1);
              }}
              className={`px-2 sm:px-3 py-2 rounded-[2px] text-[11px] sm:text-xs font-medium border transition flex items-center justify-center sm:justify-start gap-1.5 min-w-0 ${
                activeTab === "leads"
                  ? "bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[inset_0_-2px_0_var(--color-accent)]"
                  : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"
              }`}
            >
              <Users className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Leads ({filteredLeads.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("inventory");
                setInvPage(1);
              }}
              className={`px-2.5 sm:px-3 py-2 rounded-[2px] text-xs font-medium border transition flex items-center justify-center sm:justify-start gap-1.5 min-w-0 ${
                activeTab === "inventory"
                  ? "bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[inset_0_-2px_0_var(--color-accent)]"
                  : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Inventori ({filteredInventory.length})</span>
            </button>

            <button
              onClick={() => {
                setActiveTab("landlords");
                setOwnerPage(1);
              }}
              className={`px-2.5 sm:px-3 py-2 rounded-[2px] text-xs font-medium border transition flex items-center justify-center sm:justify-start gap-1.5 min-w-0 ${
                activeTab === "landlords"
                  ? "bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[inset_0_-2px_0_var(--color-accent)]"
                  : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"
              }`}
            >
              <Home className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Pemilik ({filteredOwners.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("groups")}
              className={`px-2.5 sm:px-3 py-2 rounded-[2px] text-xs font-medium border transition flex items-center justify-center sm:justify-start gap-1.5 min-w-0 ${
                activeTab === "groups"
                  ? "bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[inset_0_-2px_0_var(--color-accent)]"
                  : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"
              }`}
            >
              <Building className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">Komuniti ({residentGroups.length})</span>
            </button>
          </div>

          {activeTab === "leads" && (
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 w-full lg:w-auto lg:justify-end">
              <span className="text-xs font-medium text-[var(--color-muted)] shrink-0">Mod Draf:</span>
              <button
                onClick={() => setApproach("A")}
                className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-[2px] text-xs font-medium border transition text-center ${
                  approach === "A"
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-[var(--color-ink)]"
                    : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)]"
                }`}
              >
                Pendekatan A (Terus)
              </button>
              <button
                onClick={() => setApproach("B")}
                className={`flex-1 sm:flex-initial px-2.5 py-1.5 rounded-[2px] text-xs font-medium border transition text-center ${
                  approach === "B"
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-[var(--color-ink)]"
                    : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)]"
                }`}
              >
                Pendekatan B (Konsultatif)
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: SOCIAL LEADS & TELEGRAM MATCHING */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {/* Search and Filter Row */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari mengikut nama klien, lokasi (contoh: Setapak, Meru, Klang), atau jenis rumah..."
                  value={leadSearch}
                  onChange={(e) => {
                    setLeadSearch(e.target.value);
                    setLeadPage(1);
                  }}
                  className="studio-input studio-input--search w-full text-xs"
                />
              </div>
              <select
                value={leadPlatformFilter}
                onChange={(e) => {
                  setLeadPlatformFilter(e.target.value);
                  setLeadPage(1);
                }}
                className="studio-input text-xs w-full sm:w-auto py-2"
              >
                <option value="all">Semua Platform</option>
                <option value="facebook">Facebook Groups</option>
                <option value="threads">Threads</option>
                <option value="tiktok">TikTok</option>
                <option value="instagram">Instagram</option>
              </select>
              <select
                value={leadStatusFilter}
                onChange={(e) => {
                  setLeadStatusFilter(e.target.value);
                  setLeadPage(1);
                }}
                className="studio-input text-xs w-full sm:w-auto py-2 font-medium"
              >
                <option value="active_only">Status Aktif Sahaja (Default)</option>
                <option value="baru">Baru Sahaja</option>
                <option value="draf_disalin">Draf Disalin / Dihantar</option>
                <option value="follow_up">Perlu Follow-up</option>
                <option value="viewing">Viewing / Temujanji</option>
                <option value="all">Semua Status (Termasuk Arkib)</option>
                <option value="selesai">Arkib: Selesai / Dapat Unit</option>
                <option value="sudah_jumpa">Arkib: Sudah Jumpa Sendiri</option>
                <option value="tak_berminat">Arkib: Tidak Berminat / Batal</option>
              </select>
            </div>

            {/* Leads Cards */}
            <div className="space-y-4">
              {filteredLeads
                .slice((leadPage - 1) * PAGE_SIZE, leadPage * PAGE_SIZE)
                .map((lead: any) => {
                  const draftText = getDraft(lead);
                  const matchedList = matchesByInquiryId.get(lead.id) || [];
                  const author = lead.author || "Klien";
                  const loc = lead.location_target || "Kuala Lumpur / Selangor";
                  const currentLeadStatus = getLeadStatus(lead);
                  const budgetText =
                    lead.budget_max > 100000
                      ? `RM${lead.budget_max.toLocaleString()}`
                      : lead.budget_min && lead.budget_max
                        ? `RM${Math.round(lead.budget_min)} – RM${Math.round(lead.budget_max)}`
                        : lead.budget_max
                          ? `Bawah RM${Math.round(lead.budget_max)}`
                          : "Dalam Bajet Pasaran";

                  const isBuyer =
                    lead.inquiry_type === "buyer_sale" ||
                    (lead.budget_max && lead.budget_max > 100000);

                  const waCustomText = isBuyer
                    ? `Salam Encik Afif (Maxxan Realty), saya ${author} dari ${lead.platform || "media sosial"}. Saya mencari rumah di ${loc} bajet ${budgetText}. Boleh suggest unit yang sesuai?`
                    : `Salam Encik Afif (Maxxan Realty), saya ${author} dari ${lead.platform || "media sosial"}. Saya mencari rumah sewa di ${loc} bajet ${budgetText}. Boleh share pilihan unit?`;

                  const waUrl = `https://wa.me/601158683907?text=${encodeURIComponent(waCustomText)}`;

                  return (
                    <div key={lead.id} className="sheet p-4 sm:p-5 space-y-4 border border-[var(--color-rule)] min-w-0">
                      {/* Top Header of Card */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-3">
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <span className="font-display text-lg text-[var(--color-ink)] break-words">
                            {author}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-[2px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] font-medium">
                            {lead.platform || "Facebook"}
                          </span>
                          {isBuyer ? (
                            <span className="text-xs px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-800 border border-emerald-300 font-semibold flex items-center gap-1">
                              <span>Pembeli Subsale</span>
                            </span>
                          ) : (
                            <span className="text-xs px-2 py-0.5 rounded-[2px] bg-blue-50 text-blue-800 border border-blue-200 font-medium">
                              Penyewa
                            </span>
                          )}
                          {matchedList.length > 0 && (
                            <span className="text-xs px-2 py-0.5 rounded-[2px] bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-medium flex items-center gap-1">
                              <Sparkles className="w-3 h-3" />
                              <span>{matchedList.length} Unit Dipadankan</span>
                            </span>
                          )}
                          {lead.source_url && (
                            <a
                              href={lead.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-ink)] bg-[var(--color-paper-2)] hover:bg-[var(--color-paper-hi)] px-2 py-0.5 rounded-[2px] border border-[var(--color-rule)] hover:border-[var(--color-accent)] transition shrink-0"
                              title="Buka post/komen asal klien di media sosial"
                            >
                              <span>Buka Post Klien</span>
                              <ExternalLink className="w-3 h-3 text-[var(--color-accent)]" />
                            </a>
                          )}
                        </div>

                        {/* Right side: Status Selector & Clock */}
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[11px] text-[var(--color-muted)] font-medium">Status:</span>
                            <select
                              value={currentLeadStatus}
                              onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                              className={`text-xs px-2 py-1 rounded-[2px] font-semibold border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] ${
                                currentLeadStatus === "baru"
                                  ? "bg-amber-100 text-amber-900 border-amber-300"
                                  : currentLeadStatus === "draf_disalin"
                                    ? "bg-sky-100 text-sky-900 border-sky-300"
                                    : currentLeadStatus === "follow_up"
                                      ? "bg-purple-100 text-purple-900 border-purple-300"
                                      : currentLeadStatus === "viewing"
                                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                        : currentLeadStatus === "selesai"
                                          ? "bg-stone-200 text-stone-800 border-stone-400"
                                          : "bg-rose-100 text-rose-900 border-rose-300"
                              }`}
                            >
                              <optgroup label="── Status Aktif ──">
                                <option value="baru">Baru (Belum Dihubungi)</option>
                                <option value="draf_disalin">Draf Disalin / Dihantar</option>
                                <option value="follow_up">Perlu Follow-up</option>
                                <option value="viewing">Viewing / Temujanji</option>
                              </optgroup>
                              <optgroup label="── Selesai / Tidak Aktif ──">
                                <option value="selesai">Selesai (Dapat Unit)</option>
                                <option value="sudah_jumpa">Sudah Jumpa Sendiri</option>
                                <option value="tak_berminat">Tidak Berminat / Batal</option>
                              </optgroup>
                            </select>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] shrink-0">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{lead.first_seen || lead.posted_date || "Baru Sahaja"}</span>
                          </div>
                        </div>
                      </div>

                      {/* Criteria Highlights */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-[var(--color-paper-2)] p-3 rounded-[2px] border border-[var(--color-rule)]">
                        <div>
                          <span className="text-[var(--color-muted)]">Kawasan:</span>{" "}
                          <span className="font-semibold text-[var(--color-ink)]">{loc}</span>
                        </div>
                        <div>
                          <span className="text-[var(--color-muted)]">Bajet:</span>{" "}
                          <span className="font-semibold text-[var(--color-accent)] tabular-nums">
                            {budgetText}
                          </span>
                        </div>
                        <div>
                          <span className="text-[var(--color-muted)]">Jenis:</span>{" "}
                          <span className="font-semibold text-[var(--color-ink)]">
                            {lead.property_type || "Kediaman / Rumah"}
                          </span>
                        </div>
                      </div>

                      {/* Original Post Snippet */}
                      {lead.raw_text && (
                        <div className="text-xs text-[var(--color-ink-2)] bg-[var(--color-paper)] p-3 rounded-[2px] border border-[var(--color-rule)] italic leading-relaxed">
                          <span className="font-semibold text-[var(--color-ink)] not-italic">
                            Catatan Asal Klien:{" "}
                          </span>
                          &ldquo;{lead.raw_text}&rdquo;
                        </div>
                      )}

                      {/* Matched Telegram / Owner Inventory Box */}
                      {matchedList.length > 0 && (
                        <div className="space-y-2">
                          <div className="text-xs font-semibold text-[var(--color-ink)] flex items-center justify-between gap-1.5 flex-wrap">
                            <div className="flex items-center gap-1.5">
                              <Layers className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                              <span>Padanan Unit dari Inventori Telegram &amp; Pemilik:</span>
                            </div>
                            <span className="text-[11px] text-[var(--color-muted)]">
                              {matchedList.length} cadangan unit tersedia
                            </span>
                          </div>
                          <div className="space-y-2.5">
                            {matchedList.map((m: any, mIdx: number) => {
                              const isTelegramSource =
                                (m.match_source && m.match_source.toLowerCase().includes("telegram")) ||
                                (m.source_group && m.source_group.toLowerCase().includes("telegram")) ||
                                (m.source_url && m.source_url.includes("t.me"));

                              const isThreadsSource =
                                (m.match_source && m.match_source.toLowerCase().includes("threads")) ||
                                (m.source_url && m.source_url.includes("threads.net"));

                              const isOwnerDirect =
                                (m.match_source &&
                                  (m.match_source.toLowerCase().includes("owner") ||
                                    m.match_source.toLowerCase().includes("landlord"))) ||
                                (m.contact_person &&
                                  (m.contact_person.toLowerCase().includes("owner") ||
                                    m.contact_person.toLowerCase().includes("landlord")));

                              // Format owner/lister phone for WhatsApp
                              let rawPhone = m.contact_phone
                                ? String(m.contact_phone).replace(/[^0-9]/g, "")
                                : "";
                              if (rawPhone.startsWith("0")) {
                                rawPhone = "60" + rawPhone.slice(1);
                              } else if (rawPhone.length > 0 && !rawPhone.startsWith("60")) {
                                rawPhone = "60" + rawPhone;
                              }

                              const waListerText = `Salam ${m.contact_person || "Tuan/Puan"}, saya Afif dari Maxxan Realty (+601158683907). Saya mempunyai klien berpotensi yang mencari unit di ${m.location || loc} dan berminat dengan unit "${m.property_title}" (${m.asking_price || "sewa"}). Boleh saya tahu jika unit ini masih available untuk viewing?`;
                              const waListerUrl = rawPhone
                                ? `https://wa.me/${rawPhone}?text=${encodeURIComponent(waListerText)}`
                                : null;

                              return (
                                <div
                                  key={m.id || mIdx}
                                  className="p-3.5 bg-amber-50/70 border border-amber-200/90 rounded-[2px] text-xs text-[var(--color-ink)] space-y-2.5 shadow-xs"
                                >
                                  {/* Title & Price */}
                                  <div className="flex items-start sm:items-center justify-between gap-2 flex-wrap">
                                    <div className="font-bold text-amber-950 text-sm leading-snug">
                                      {m.property_title || "Unit Hartanah"}
                                    </div>
                                    <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 tabular-nums shrink-0">
                                      {m.asking_price || "Tanya Harga"}
                                    </span>
                                  </div>

                                  {/* Traceback Origin Badges & Match Details */}
                                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                                    {/* Origin / Source Badge */}
                                    <span
                                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-[2px] font-semibold border ${
                                        isThreadsSource
                                          ? "bg-neutral-900 text-white border-neutral-800"
                                          : isTelegramSource
                                            ? "bg-sky-100 text-sky-900 border-sky-300"
                                            : isOwnerDirect
                                              ? "bg-amber-100 text-amber-900 border-amber-300"
                                              : "bg-stone-100 text-stone-800 border-stone-300"
                                      }`}
                                    >
                                      <span>{m.match_source || "Sumber Unit"}</span>
                                    </span>

                                    {m.match_score && (
                                      <span className="px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-900 border border-emerald-300 font-medium">
                                        Padanan {m.match_score}
                                      </span>
                                    )}

                                    <span className="text-[var(--color-muted)] flex items-center gap-1">
                                      <MapPin className="w-3 h-3 text-[var(--color-muted)]" />
                                      <span>{m.location || loc}</span>
                                    </span>

                                    {m.source_group && (
                                      <span
                                        className="text-[var(--color-muted)] truncate max-w-[220px]"
                                        title={m.source_group}
                                      >
                                        · 📢 {m.source_group}
                                      </span>
                                    )}
                                  </div>

                                  {/* Lister / Contact Person Info & Traceback Action Buttons */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-amber-100/60 p-2.5 rounded-[2px] border border-amber-200">
                                    <div className="flex items-center gap-2 flex-wrap min-w-0">
                                      <span className="text-[var(--color-muted)]">Kontak / Lister:</span>
                                      <span className="font-semibold text-[var(--color-ink)] break-words">
                                        {m.contact_person || "Tiada maklumat nama"}
                                      </span>
                                      {m.contact_phone && (
                                        <span className="font-mono text-emerald-800 bg-emerald-100/90 px-1.5 py-0.5 rounded border border-emerald-300 font-medium">
                                          {m.contact_phone}
                                        </span>
                                      )}
                                    </div>

                                    {/* Action Links */}
                                    <div className="flex items-center gap-1.5 flex-wrap shrink-0">
                                      {/* 1. Direct Link to Original Post/Source */}
                                      {m.source_url && (
                                        <a
                                          href={m.source_url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-[var(--color-paper)] hover:bg-[var(--color-paper-hi)] text-[var(--color-ink)] border border-[var(--color-rule)] hover:border-[var(--color-accent)] rounded-[2px] transition cursor-pointer"
                                          title={`Buka post atau iklan asal di ${m.match_source || "media sosial"}`}
                                        >
                                          <span>Buka Sumber Asal</span>
                                          <ExternalLink className="w-3 h-3 text-[var(--color-accent)]" />
                                        </a>
                                      )}

                                      {/* 2. Direct WhatsApp to Owner/Lister */}
                                      {waListerUrl && (
                                        <a
                                          href={waListerUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold bg-emerald-700 hover:bg-emerald-800 text-white rounded-[2px] transition cursor-pointer"
                                          title={`Hubungi ${m.contact_person || "Lister"} di WhatsApp`}
                                        >
                                          <MessageCircle className="w-3 h-3" />
                                          <span>WhatsApp Lister</span>
                                        </a>
                                      )}

                                      {/* 3. Telegram Inventory Tab Search */}
                                      {isTelegramSource && (
                                        <button
                                          onClick={() => {
                                            setActiveTab("inventory");
                                            setInvSearch(m.property_title || m.location || "");
                                            setInvPage(1);
                                            window.scrollTo({ top: 300, behavior: "smooth" });
                                          }}
                                          className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-300 rounded-[2px] transition cursor-pointer"
                                          title="Cari unit ini dalam tab Inventori Telegram"
                                        >
                                          <Layers className="w-3 h-3 text-sky-600" />
                                          <span>Lihat di Inventori TG</span>
                                        </button>
                                      )}
                                    </div>
                                  </div>

                                  {/* Unit Details Excerpt */}
                                  {m.details && (
                                    <p className="text-[11px] text-[var(--color-ink-2)] pt-1 border-t border-amber-200/70 leading-relaxed font-normal">
                                      <span className="font-semibold text-amber-950">
                                        Spesifikasi &amp; Nota Unit:{" "}
                                      </span>
                                      {m.details}
                                    </p>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Auto Draft Box */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[var(--color-ink)]">
                            Draf Mesej ({approach === "A" ? "Pendekatan Terus" : "Pendekatan Konsultatif"}):
                          </span>
                          <button
                            onClick={() => copyToClipboard(draftText, lead.id)}
                            className="inline-flex items-center gap-1 text-[var(--color-ink)] font-medium underline decoration-[var(--color-accent)] cursor-pointer"
                          >
                            {copiedId === lead.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 font-semibold">Tersalin ke Clipboard!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3.5 h-3.5" />
                                <span>Salin Draf</span>
                              </>
                            )}
                          </button>
                        </div>

                        <div className="p-3 bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-[2px] text-xs text-[var(--color-ink)] font-mono leading-relaxed select-all break-words [overflow-wrap:anywhere]">
                          {draftText}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-[var(--color-rule)]">
                        <button
                          onClick={() => copyToClipboard(draftText, lead.id)}
                          className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                        >
                          <Copy className="w-3.5 h-3.5 shrink-0" />
                          <span>{copiedId === lead.id ? "Disalin" : "Salin Draf"}</span>
                        </button>

                        {lead.source_url && (
                          <a
                            href={lead.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                          >
                            <span>Buka Post Asal</span>
                            <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                          </a>
                        )}

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--primary btn--sm w-full sm:w-auto sm:ml-auto"
                        >
                          <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>WhatsApp Klien Sekarang</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination */}
            {filteredLeads.length > PAGE_SIZE && (
              <div className="sheet p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="text-center sm:text-left">
                  Menunjukkan {(leadPage - 1) * PAGE_SIZE + 1} –{" "}
                  {Math.min(leadPage * PAGE_SIZE, filteredLeads.length)} daripada{" "}
                  {filteredLeads.length} leads
                </div>
                <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <button
                    disabled={leadPage <= 1}
                    onClick={() => setLeadPage((p) => p - 1)}
                    className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                  >
                    Sebelumnya
                  </button>
                  <span className="font-semibold px-2 whitespace-nowrap tabular-nums">
                    {leadPage} / {Math.ceil(filteredLeads.length / PAGE_SIZE)}
                  </span>
                  <button
                    disabled={leadPage >= Math.ceil(filteredLeads.length / PAGE_SIZE)}
                    onClick={() => setLeadPage((p) => p + 1)}
                    className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                  >
                    Seterusnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: TELEGRAM PROPERTY INVENTORY */}
        {activeTab === "inventory" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari unit Telegram (contoh: Shah Alam, Bukit Raja, Klang, Suri Puteri, Bangi, RM390k)..."
                  value={invSearch}
                  onChange={(e) => {
                    setInvSearch(e.target.value);
                    setInvPage(1);
                  }}
                  className="studio-input studio-input--search w-full text-xs"
                />
              </div>

              <select
                value={invStatusFilter}
                onChange={(e) => {
                  setInvStatusFilter(e.target.value);
                  setInvPage(1);
                }}
                className="studio-input text-xs w-full sm:w-auto py-2 font-medium"
              >
                <option value="available">Tersedia Sahaja (Default)</option>
                <option value="all">Semua Status (Termasuk Booked)</option>
                <option value="booked">Booked / Terjual</option>
              </select>

              <select
                value={invSortOrder}
                onChange={(e) => {
                  setInvSortOrder(e.target.value as "desc" | "asc");
                  setInvPage(1);
                }}
                className="studio-input text-xs w-full sm:w-auto py-2"
              >
                <option value="desc">Tarikh Terbaharu</option>
                <option value="asc">Tarikh Terawal</option>
              </select>
            </div>

            {/* Inventory List */}
            <div className="space-y-3">
              {filteredInventory
                .slice((invPage - 1) * PAGE_SIZE, invPage * PAGE_SIZE)
                .map((item: any) => {
                  const isExpanded = expandedInvId === item.id;
                  const currentInvStatus = getInvStatus(item);
                  const isAvailable = currentInvStatus === "available";

                  const waPropUrl = `https://wa.me/601158683907?text=${encodeURIComponent(
                    `Salam Afif, saya berminat nak tanya mengenai unit Telegram: "${item.title || item.location_line}" (Harga: ${item.asking_price}). Boleh semak sama ada masih available?`
                  )}`;

                  return (
                    <div
                      key={item.id}
                      className={`sheet p-5 space-y-3 transition border ${
                        !isAvailable ? "opacity-75 bg-[var(--color-paper-2)] border-dashed" : "border-[var(--color-rule)]"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-2.5">
                        <div className="flex items-center gap-2 flex-wrap min-w-0">
                          <span className="font-display text-base text-[var(--color-ink)] break-words">
                            {item.title || item.location_line || "Unit Hartanah"}
                          </span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="text-[11px] text-[var(--color-muted)] font-medium">Status:</span>
                            <select
                              value={currentInvStatus}
                              onChange={(e) => updateInvStatus(item.id, e.target.value)}
                              className={`text-xs px-2 py-0.5 rounded-[2px] font-semibold border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] ${
                                isAvailable
                                  ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                  : "bg-red-100 text-red-900 border-red-300"
                              }`}
                            >
                              <option value="available">✓ Tersedia (Available)</option>
                              <option value="booked">❌ Booked / Terjual</option>
                              <option value="expired">Tamat Tempoh / Delisted</option>
                            </select>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-[2px] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] border border-[var(--color-rule)] font-mono">
                            TG #{item.message_id || item.id}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-display text-base font-bold text-[var(--color-accent)] tabular-nums">
                            {item.asking_price || "Tanya Harga"}
                          </span>
                        </div>
                      </div>

                      {/* Location line */}
                      {item.location_line && (
                        <div className="text-xs text-[var(--color-ink-2)] flex items-center gap-1.5 font-medium">
                          <MapPin className="w-3.5 h-3.5 text-[var(--color-muted)] shrink-0" />
                          <span>{item.location_line}</span>
                        </div>
                      )}

                      {/* Date */}
                      <div className="text-[11px] text-[var(--color-muted)] flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{item.day || item.date?.split("T")[0] || "Terkini"}</span>
                        </span>
                        <span>·</span>
                        <span>Saluran Telegram Co-Broke</span>
                      </div>

                      {/* Expandable Excerpt / Specs */}
                      {isExpanded && item.source_excerpt && (
                        <div className="mt-3 p-3.5 bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-[2px] text-xs text-[var(--color-ink)] font-mono whitespace-pre-wrap break-words [overflow-wrap:anywhere] leading-relaxed">
                          {item.source_excerpt}
                        </div>
                      )}

                      {/* Bottom actions */}
                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[var(--color-rule)]">
                        <button
                          onClick={() => setExpandedInvId(isExpanded ? null : item.id)}
                          className="inline-flex items-center gap-1 text-xs text-[var(--color-ink)] hover:text-[var(--color-accent)] font-medium cursor-pointer text-left"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-3.5 h-3.5 shrink-0" />
                              <span>Tutup Spesifikasi Penuh</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                              <span>Lihat Spesifikasi &amp; Mesej Asal Telegram</span>
                            </>
                          )}
                        </button>

                        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto sm:ml-auto">
                          <button
                            onClick={() =>
                              updateInvStatus(
                                item.id,
                                isAvailable ? "booked" : "available"
                              )
                            }
                            className={`btn btn--sm text-xs font-medium ${
                              isAvailable
                                ? "btn--quiet text-red-700 hover:text-red-900"
                                : "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                            }`}
                          >
                            <span>{isAvailable ? "Tanda Booked" : "Tanda Tersedia"}</span>
                          </button>
                          <button
                            onClick={() =>
                              copyToClipboard(
                                `${item.title}\n${item.location_line}\nHarga: ${item.asking_price}\n\n${item.source_excerpt || ""}`,
                                `inv_${item.id}`
                              )
                            }
                            className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                          >
                            <Copy className="w-3.5 h-3.5 shrink-0" />
                            <span>{copiedId === `inv_${item.id}` ? "Disalin" : "Salin Info"}</span>
                          </button>
                          <a
                            href={waPropUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--primary btn--sm flex-1 sm:flex-initial"
                          >
                            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>Kongsi ke WhatsApp</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination */}
            {filteredInventory.length > PAGE_SIZE && (
              <div className="sheet p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="text-center sm:text-left">
                  Menunjukkan {(invPage - 1) * PAGE_SIZE + 1} –{" "}
                  {Math.min(invPage * PAGE_SIZE, filteredInventory.length)} daripada{" "}
                  {filteredInventory.length} unit
                </div>
                <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <button
                    disabled={invPage <= 1}
                    onClick={() => setInvPage((p) => p - 1)}
                    className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                  >
                    Sebelumnya
                  </button>
                  <span className="font-semibold px-2 whitespace-nowrap tabular-nums">
                    {invPage} / {Math.ceil(filteredInventory.length / PAGE_SIZE)}
                  </span>
                  <button
                    disabled={invPage >= Math.ceil(filteredInventory.length / PAGE_SIZE)}
                    onClick={() => setInvPage((p) => p + 1)}
                    className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                  >
                    Seterusnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: DIRECT LANDLORD LISTINGS */}
        {activeTab === "landlords" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="relative flex-1 w-full">
                <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Cari pemilik langsung, lokasi rumah, atau bajet sewa..."
                  value={ownerSearch}
                  onChange={(e) => {
                    setOwnerSearch(e.target.value);
                    setOwnerPage(1);
                  }}
                  className="studio-input studio-input--search w-full text-xs"
                />
              </div>

              <select
                value={ownerStatusFilter}
                onChange={(e) => {
                  setOwnerStatusFilter(e.target.value);
                  setOwnerPage(1);
                }}
                className="studio-input text-xs w-full sm:w-auto py-2 font-medium"
              >
                <option value="active_only">Unit Aktif Sahaja (Default)</option>
                <option value="available">Tersedia Sahaja</option>
                <option value="negotiating">Dalam Rundingan</option>
                <option value="all">Semua Status (Termasuk Disewa/Dijual)</option>
                <option value="rented">Sudah Disewa</option>
                <option value="sold">Sudah Dijual</option>
                <option value="inactive">Batal / Delisted</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredOwners
                .slice((ownerPage - 1) * PAGE_SIZE, ownerPage * PAGE_SIZE)
                .map((owner: any, idx: number) => {
                  const currentOwnerStatus = getOwnerStatus(owner);
                  const isAvailable = currentOwnerStatus === "available";

                  const waOwnerUrl = owner.contact_info?.includes("+60")
                    ? `https://wa.me/${owner.contact_info.replace(/[^0-9]/g, "")}`
                    : `https://wa.me/601158683907?text=${encodeURIComponent(
                        `Salam, saya Afif (Maxxan Realty) ingin menyemak unit pemilik ${owner.author}: ${owner.property_type || "Rumah"} di ${owner.location} (${owner.price}).`
                      )}`;

                  return (
                    <div
                      key={owner.id || idx}
                      className={`sheet p-5 flex flex-col justify-between space-y-3 border transition ${
                        !isAvailable ? "opacity-75 bg-[var(--color-paper-2)] border-dashed" : "border-[var(--color-rule)]"
                      }`}
                    >
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-2">
                          <div className="flex items-center gap-2 flex-wrap min-w-0">
                            <span className="font-display text-base text-[var(--color-ink)] break-words min-w-0">
                              {owner.author || "Tuan Rumah"}
                            </span>
                            <div className="flex items-center gap-1.5 shrink-0">
                              <span className="text-[11px] text-[var(--color-muted)] font-medium">Status:</span>
                              <select
                                value={currentOwnerStatus}
                                onChange={(e) => updateOwnerStatus(owner.id, e.target.value)}
                                className={`text-xs px-2 py-0.5 rounded-[2px] font-semibold border cursor-pointer focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] ${
                                  currentOwnerStatus === "available"
                                    ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                                    : currentOwnerStatus === "negotiating"
                                      ? "bg-sky-100 text-sky-900 border-sky-300"
                                      : currentOwnerStatus === "rented"
                                        ? "bg-stone-200 text-stone-800 border-stone-400"
                                        : currentOwnerStatus === "sold"
                                          ? "bg-stone-200 text-stone-800 border-stone-400"
                                          : "bg-rose-100 text-rose-900 border-rose-300"
                                }`}
                              >
                                <optgroup label="── Unit Aktif ──">
                                  <option value="available">✓ Tersedia (Aktif)</option>
                                  <option value="negotiating">Dalam Rundingan</option>
                                </optgroup>
                                <optgroup label="── Selesai / Tidak Aktif ──">
                                  <option value="rented">Sudah Disewa</option>
                                  <option value="sold">Sudah Dijual</option>
                                  <option value="inactive">Batal / Delisted</option>
                                </optgroup>
                              </select>
                            </div>
                          </div>
                          <span className="text-xs px-2 py-0.5 rounded-[2px] bg-emerald-100 text-emerald-800 font-semibold border border-emerald-200 tabular-nums whitespace-nowrap shrink-0">
                            {owner.price || "Sila Hubungi"}
                          </span>
                        </div>

                        <div className="mt-2 space-y-1 text-xs text-[var(--color-ink-2)]">
                          <div>
                            <span className="text-[var(--color-muted)]">Jenis:</span>{" "}
                            <span className="font-medium text-[var(--color-ink)]">
                              {owner.property_type || "Rumah Kediaman"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[var(--color-muted)]">Lokasi:</span>{" "}
                            <span className="font-medium text-[var(--color-ink)]">
                              {owner.location || "Selangor / KL"}
                            </span>
                          </div>
                          <div>
                            <span className="text-[var(--color-muted)]">Sumber:</span>{" "}
                            <span className="font-medium text-[var(--color-ink)]">
                              {owner.platform || "Facebook Group Komuniti"}
                            </span>
                          </div>
                          {owner.contact_info && (
                            <div>
                              <span className="text-[var(--color-muted)]">Kontak:</span>{" "}
                              <span className="font-semibold text-blue-700">
                                {owner.contact_info}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[var(--color-rule)]">
                        <button
                          onClick={() =>
                            updateOwnerStatus(
                              owner.id,
                              isAvailable ? "rented" : "available"
                            )
                          }
                          className={`btn btn--sm flex-1 text-center font-medium ${
                            isAvailable
                              ? "btn--quiet text-amber-900"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-300 hover:bg-emerald-100"
                          }`}
                        >
                          <span>{isAvailable ? "Tanda Sudah Disewa" : "Aktifkan Semula"}</span>
                        </button>
                        {owner.source_url && (
                          <a
                            href={owner.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn--quiet btn--sm flex-1 text-center"
                          >
                            <span>Post Asal</span>
                            <ExternalLink className="w-3 h-3 shrink-0" />
                          </a>
                        )}
                        <a
                          href={waOwnerUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn--primary btn--sm flex-1 text-center"
                        >
                          <Phone className="w-3.5 h-3.5 shrink-0" />
                          <span>Hubungi Pemilik</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Pagination */}
            {filteredOwners.length > PAGE_SIZE && (
              <div className="sheet p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs">
                <div className="text-center sm:text-left">
                  Menunjukkan {(ownerPage - 1) * PAGE_SIZE + 1} –{" "}
                  {Math.min(ownerPage * PAGE_SIZE, filteredOwners.length)} daripada{" "}
                  {filteredOwners.length} pemilik
                </div>
                <div className="flex items-center justify-center gap-2 w-full sm:w-auto">
                  <button
                    disabled={ownerPage <= 1}
                    onClick={() => setOwnerPage((p) => p - 1)}
                    className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                  >
                    Sebelumnya
                  </button>
                  <span className="font-semibold px-2 whitespace-nowrap tabular-nums">
                    {ownerPage} / {Math.ceil(filteredOwners.length / PAGE_SIZE)}
                  </span>
                  <button
                    disabled={ownerPage >= Math.ceil(filteredOwners.length / PAGE_SIZE)}
                    onClick={() => setOwnerPage((p) => p + 1)}
                    className="btn btn--quiet btn--sm flex-1 sm:flex-initial"
                  >
                    Seterusnya
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: MONITORED RESIDENT GROUPS */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residentGroups.map((grp, idx) => (
              <div
                key={idx}
                className="sheet p-5 flex flex-col justify-between space-y-3 border border-[var(--color-rule)]"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-2">
                    <h4 className="font-display text-base text-[var(--color-ink)] min-w-0 break-words">
                      {grp.name}
                    </h4>
                    <span className="text-[11px] px-2 py-0.5 rounded-[2px] bg-[var(--color-paper-2)] border border-[var(--color-rule)] font-medium whitespace-nowrap shrink-0">
                      {grp.platform}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--color-muted)] mt-2">
                    <span className="font-semibold text-[var(--color-ink)]">Kawasan Tumpuan:</span>{" "}
                    {grp.region}
                  </p>
                  <p className="text-xs text-[var(--color-accent)] font-medium mt-1">
                    {grp.members} Ahli / Ejen
                  </p>
                  <p className="text-xs text-[var(--color-ink-2)] mt-1.5 leading-relaxed">
                    {grp.focus}
                  </p>
                </div>
                <a
                  href={grp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--quiet btn--sm w-full text-center"
                >
                  <span>Buka Saluran / Kumpulan</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
