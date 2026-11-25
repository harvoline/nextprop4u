"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Phone,
  Home,
  CheckCircle2,
  Clock,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "groups" | "landlords">(
    "leads"
  );
  const [approach, setApproach] = useState<"A" | "B">("A");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const sampleLeads = [
    {
      id: "lead_1",
      name: "@_mztlnatrah",
      platform: "Threads",
      area: "Setapak / Wangsa Maju",
      budget: "RM700 – RM1,000",
      type: "Landed Bebas Banjir",
      isGold: true,
      stage: "Draft Posted",
      originalPost:
        "Hi assalamualaikom, saya mencari rumah sewa area Setapak / Wangsa Maju. Bajet dalam 1K ke bawah. Dah berkahwin dan nak rumah bebas banjir. Nak masuk bulan 11. Pls tolong saya 😁",
      url: "https://www.threads.net/@_mztlnatrah/post/DfDmGDtkrBs",
      matchedUnit:
        "Townhouse Villa Danau Kota Setapak (RM1,500) / PV Condominium",
    },
    {
      id: "lead_2",
      name: "Ezza Adham",
      platform: "Facebook Groups (Warga Setapak & Danau Kota)",
      area: "Ampang / Melawati",
      budget: "RM700 – RM900",
      type: "Landed",
      isGold: true,
      stage: "Draft Posted",
      originalPost:
        "Mencari Rumah Sewa Landed Ampang / Melawati. Bajet RM700-RM900. Awal Jan 2027. Pasangan suami isteri.",
      url: "https://www.facebook.com/groups/1046576693230474/permalink/1857852668769535/",
      matchedUnit: "Landed Teres 2 Tingkat @ Taman Melawati (RM2,800)",
    },
    {
      id: "lead_3",
      name: "Nur Faizah",
      platform: "Facebook Groups (Komuniti Gombak & Wangsa Maju)",
      area: "Gombak / KL Border",
      budget: "Bawah RM900",
      type: "Apartment / House",
      isGold: false,
      stage: "New Match",
      originalPost:
        "Mencari RUMAH SEWA sekitar kawasan Gombak, Wangsa Maju dan KL Border. Bajet: RM900 ke bawah...",
      url: "https://www.facebook.com/groups/1498367340428302/",
      matchedUnit: "Rumah Sewa Landed 4R2B Gombak / KL Border (RM1,000)",
    },
  ];

  const residentGroups = [
    {
      name: "WARGA SETAPAK & DANAU KOTA RESIDENTS",
      members: "115,000",
      url: "https://www.facebook.com/groups/1046576693230474/",
      focus: "Setapak, Danau Kota, Wangsa Maju",
    },
    {
      name: "PENDUDUK WANGSA MAJU & MELAWATI",
      members: "48,000",
      url: "https://www.facebook.com/groups/240093863116518/",
      focus: "Bandar Bukit Raja (Landed & Commercial)",
    },
    {
      name: "Rumah Sewa Kuala Lumpur & Gombak",
      members: "185,000",
      url: "https://www.facebook.com/groups/1498367340428302/",
      focus: "Gombak, Titiwangsa, Keramat, Ampang",
    },
  ];

  const getDraft = (lead: any) => {
    const waUrl = `https://wa.me/601158683907?text=${encodeURIComponent(
      `Salam Afif (Maxxan Realty), saya dari post ${lead.platform} (${lead.name}). Saya mencari rumah sewa di area ${lead.area} bajet sekitar ${lead.budget}. Boleh cadangkan unit yang sesuai?`
    )}`;

    if (approach === "A") {
      return `Salam ${lead.name}. Saya Afif dari Maxxan Realty. Saya mempunyai beberapa pilihan rumah sewa di sekitar area ${lead.area} dalam bajet ${lead.budget}. Boleh saya hubungi ${lead.name} untuk tahu lokasi spesifik supaya saya boleh suggest rumah paling sesuai? Boleh hubungi saya di +601158683907 atau terus WhatsApp: ${waUrl}`;
    } else {
      return `Hi ${lead.name}. Saya Afif dari Maxxan Realty. Boleh saya tahu jika ${lead.name} mencari kawasan atau taman mana di sekitar ${lead.area} untuk saya bantu carikan rumah yang sesuai? Boleh hubungi saya di +601158683907 / WhatsApp: ${waUrl} ya supaya kami boleh propose pilihan sedia ada dan carikan option tambahan. Terima kasih!`;
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-slate-900 text-white px-4 sm:px-6 py-3 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-emerald-500">
            <Image
              src="/afif.jpg"
              alt="Afif"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-sm leading-tight">
              Muhammad Norafif | CRM Hub
            </div>
            <div className="text-[10px] text-emerald-400 font-semibold">
              Maxxan Realty • Lead Matching System
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1 bg-slate-800 px-2.5 py-1.5 rounded-lg"
          >
            <span>Laman Utama</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Keluar</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Total Inquiries
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">44</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              +13 hari ini
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Matched Units
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">56</div>
            <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
              Telegram & Owners
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Direct Landlords
            </div>
            <div className="text-2xl font-extrabold text-slate-900 mt-1">6</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
              Proprietary Stock
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
            <div className="text-[11px] font-semibold text-slate-500 uppercase">
              Gold Alerts
            </div>
            <div className="text-2xl font-extrabold text-amber-600 mt-1">12</div>
            <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
              Exact Match Priority
            </div>
          </div>
        </div>

        {/* Tab & Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "leads"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Social Leads CRM ({sampleLeads.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                activeTab === "groups"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Resident Groups (8)</span>
            </button>
          </div>

          {activeTab === "leads" && (
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-semibold text-slate-500">Draft:</span>
              <button
                onClick={() => setApproach("A")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  approach === "A"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Approach A (Targeted)
              </button>
              <button
                onClick={() => setApproach("B")}
                className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition ${
                  approach === "B"
                    ? "bg-emerald-600 text-white"
                    : "bg-slate-100 text-slate-700"
                }`}
              >
                Approach B (Consultative)
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Social Leads */}
        {activeTab === "leads" && (
          <div className="space-y-4">
            {sampleLeads.map((lead) => {
              const draftText = getDraft(lead);
              const waUrl = `https://wa.me/601158683907?text=${encodeURIComponent(
                `Salam Afif (Maxxan Realty), saya ${lead.name} dari ${lead.platform}. Mencari rumah sewa bajet ${lead.budget}.`
              )}`;

              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-slate-900 text-base">
                        {lead.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
                        {lead.platform}
                      </span>
                      {lead.isGold && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-600" />
                          <span>🔥 GOLD ALERT: EXACT MATCH</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-slate-500">
                        Status:
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                        {lead.stage}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-slate-50 p-3 rounded-xl">
                    <div>
                      <span className="text-slate-500">Kawasan:</span>{" "}
                      <span className="font-bold text-slate-800">{lead.area}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Bajet:</span>{" "}
                      <span className="font-bold text-emerald-700">
                        {lead.budget}
                      </span>
                    </div>
                    <div>
                      <span className="text-slate-500">Jenis:</span>{" "}
                      <span className="font-bold text-slate-800">{lead.type}</span>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 bg-amber-50/40 p-3 rounded-xl border border-amber-100">
                    <span className="font-bold text-amber-900">Post Asal: </span>
                    &ldquo;{lead.originalPost}&rdquo;
                  </div>

                  <div className="text-xs text-slate-600 bg-emerald-50/40 p-3 rounded-xl border border-emerald-100">
                    <span className="font-bold text-emerald-900">
                      Matched Stock:{" "}
                    </span>
                    {lead.matchedUnit}
                  </div>

                  {/* Ready Draft Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">
                        Ready Draft ({approach === "A" ? "Targeted" : "Consultative"}):
                      </span>
                      <button
                        onClick={() => copyToClipboard(draftText, lead.id)}
                        className="inline-flex items-center gap-1 text-emerald-700 font-bold hover:underline"
                      >
                        {copiedId === lead.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Draf</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-slate-100 rounded-xl text-xs text-slate-800 font-mono leading-relaxed select-all">
                      {draftText}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => copyToClipboard(draftText, lead.id)}
                      className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === lead.id ? "Disalin!" : "Salin Draf"}</span>
                    </button>

                    <a
                      href={lead.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-xs flex items-center gap-1.5"
                    >
                      <span>Buka Post Asal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 ml-auto"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Test Pre-filled WhatsApp</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Resident Groups */}
        {activeTab === "groups" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {residentGroups.map((grp, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-3"
              >
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{grp.name}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Kawasan Tumpuan: {grp.focus}
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                    {grp.members} Ahli Komuniti
                  </p>
                </div>
                <a
                  href={grp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs"
                >
                  <span>Buka Kumpulan Facebook</span>
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
