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
      focus: "Wangsa Maju, Setapak & Melawati",
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
    <div className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink)] flex flex-col">
      {/* Top Navbar */}
      <nav className="bg-[var(--color-ink)] text-[var(--color-paper)] px-4 sm:px-6 py-3 border-b border-[color-mix(in_oklab,var(--color-paper)_18%,transparent)] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-[2px] overflow-hidden border border-[var(--color-accent)]">
            <Image
              src="/images/afif-editorial-portrait.jpg"
              alt="Afif"
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-display text-base leading-tight">
              Muhammad Norafif, Portal CRM
            </div>
            <div className="text-[11px] text-[var(--color-accent)] font-medium">
              Maxxan Realty Sdn Bhd, Pengurusan Leads
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            target="_blank"
            className="text-xs text-[var(--color-paper)] hover:text-[var(--color-accent)] flex items-center gap-1 border border-[color-mix(in_oklab,var(--color-paper)_25%,transparent)] px-3 py-1.5 rounded-[2px]"
          >
            <span>Laman Utama</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
          <button
            onClick={() => (window.location.href = "/login")}
            className="text-xs text-[var(--color-paper-2)] hover:text-[var(--color-accent)] flex items-center gap-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log Keluar</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="sheet p-4">
            <div className="text-xs font-medium text-[var(--color-muted)]">
              Jumlah Pertanyaan
            </div>
            <div className="font-display text-3xl text-[var(--color-ink)] mt-1 tabular-nums">44</div>
            <div className="text-xs text-[var(--color-accent)] font-medium mt-0.5 tabular-nums">
              +13 hari ini
            </div>
          </div>
          <div className="sheet p-4">
            <div className="text-xs font-medium text-[var(--color-muted)]">
              Unit Dipadankan
            </div>
            <div className="font-display text-3xl text-[var(--color-ink)] mt-1 tabular-nums">56</div>
            <div className="text-xs text-[var(--color-ink-2)] font-medium mt-0.5">
              Telegram &amp; Pemilik
            </div>
          </div>
          <div className="sheet p-4">
            <div className="text-xs font-medium text-[var(--color-muted)]">
              Pemilik Langsung
            </div>
            <div className="font-display text-3xl text-[var(--color-ink)] mt-1 tabular-nums">6</div>
            <div className="text-xs text-[var(--color-ink-2)] font-medium mt-0.5">
              Stok Terus Agensi
            </div>
          </div>
          <div className="sheet p-4">
            <div className="text-xs font-medium text-[var(--color-muted)]">
              Padanan Keutamaan
            </div>
            <div className="font-display text-3xl text-[var(--color-accent)] mt-1 tabular-nums">12</div>
            <div className="text-xs text-[var(--color-ink-2)] font-medium mt-0.5">
              Tindak Balas Segera
            </div>
          </div>
        </div>

        {/* Tab & Controls Bar */}
        <div className="sheet p-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <button
              onClick={() => setActiveTab("leads")}
              className={`px-3.5 py-2 rounded-[2px] text-xs font-medium border transition flex items-center gap-1.5 ${
                activeTab === "leads"
                  ? "bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[inset_0_-2px_0_var(--color-accent)]"
                  : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>Leads Sosial CRM ({sampleLeads.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("groups")}
              className={`px-3.5 py-2 rounded-[2px] text-xs font-medium border transition flex items-center gap-1.5 ${
                activeTab === "groups"
                  ? "bg-[var(--color-paper-2)] text-[var(--color-ink)] border-[var(--color-ink)] shadow-[inset_0_-2px_0_var(--color-accent)]"
                  : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)] hover:bg-[var(--color-paper-2)]"
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              <span>Kumpulan Komuniti (8)</span>
            </button>
          </div>

          {activeTab === "leads" && (
            <div className="flex items-center gap-2 w-full md:w-auto justify-end">
              <span className="text-xs font-medium text-[var(--color-muted)]">Draf:</span>
              <button
                onClick={() => setApproach("A")}
                className={`px-2.5 py-1.5 rounded-[2px] text-xs font-medium border transition ${
                  approach === "A"
                    ? "bg-[var(--color-accent)] text-[var(--color-accent-ink)] border-[var(--color-ink)]"
                    : "bg-[var(--color-paper-hi)] text-[var(--color-ink-2)] border-[var(--color-rule)]"
                }`}
              >
                Pendekatan A (Terus)
              </button>
              <button
                onClick={() => setApproach("B")}
                className={`px-2.5 py-1.5 rounded-[2px] text-xs font-medium border transition ${
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
                  className="sheet p-5 space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--color-rule)] pb-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-lg text-[var(--color-ink)]">
                        {lead.name}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-[2px] border border-[var(--color-rule)] bg-[var(--color-paper-2)] text-[var(--color-ink-2)] font-medium">
                        {lead.platform}
                      </span>
                      {lead.isGold && (
                        <span className="text-xs px-2 py-0.5 rounded-[2px] bg-[var(--color-accent)] text-[var(--color-accent-ink)] font-medium flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          <span>Padanan Keutamaan</span>
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-[var(--color-muted)]">
                        Status:
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded-[2px] bg-[var(--color-paper-2)] text-[var(--color-ink)] font-medium border border-[var(--color-rule)]">
                        {lead.stage}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs bg-[var(--color-paper-2)] p-3 rounded-[2px] border border-[var(--color-rule)]">
                    <div>
                      <span className="text-[var(--color-muted)]">Kawasan:</span>{" "}
                      <span className="font-semibold text-[var(--color-ink)]">{lead.area}</span>
                    </div>
                    <div>
                      <span className="text-[var(--color-muted)]">Bajet:</span>{" "}
                      <span className="font-semibold text-[var(--color-accent)] tabular-nums">
                        {lead.budget}
                      </span>
                    </div>
                    <div>
                      <span className="text-[var(--color-muted)]">Jenis:</span>{" "}
                      <span className="font-semibold text-[var(--color-ink)]">{lead.type}</span>
                    </div>
                  </div>

                  <div className="text-xs text-[var(--color-ink-2)] bg-[var(--color-paper)] p-3 rounded-[2px] border border-[var(--color-rule)]">
                    <span className="font-semibold text-[var(--color-ink)]">Catatan Asal: </span>
                    &ldquo;{lead.originalPost}&rdquo;
                  </div>

                  <div className="text-xs text-[var(--color-ink-2)] bg-[var(--color-paper)] p-3 rounded-[2px] border-l-2 border-[var(--color-accent)]">
                    <span className="font-semibold text-[var(--color-ink)]">
                      Stok Dipadankan:{" "}
                    </span>
                    {lead.matchedUnit}
                  </div>

                  {/* Ready Draft Box */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-[var(--color-ink)]">
                        Draf Jawapan ({approach === "A" ? "Terus" : "Konsultatif"}):
                      </span>
                      <button
                        onClick={() => copyToClipboard(draftText, lead.id)}
                        className="inline-flex items-center gap-1 text-[var(--color-ink)] font-medium underline decoration-[var(--color-accent)]"
                      >
                        {copiedId === lead.id ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Tersalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Salin Draf</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-[var(--color-paper-2)] border border-[var(--color-rule)] rounded-[2px] text-xs text-[var(--color-ink)] font-mono leading-relaxed select-all">
                      {draftText}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <button
                      onClick={() => copyToClipboard(draftText, lead.id)}
                      className="btn btn--quiet btn--sm"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{copiedId === lead.id ? "Disalin" : "Salin Draf"}</span>
                    </button>

                    <a
                      href={lead.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--quiet btn--sm"
                    >
                      <span>Buka Post Asal</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--primary btn--sm ml-auto"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Uji Mesej WhatsApp</span>
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
                className="sheet p-5 flex flex-col justify-between space-y-3"
              >
                <div>
                  <h4 className="font-display text-lg text-[var(--color-ink)]">{grp.name}</h4>
                  <p className="text-xs text-[var(--color-muted)] mt-1">
                    Kawasan Tumpuan: {grp.focus}
                  </p>
                  <p className="text-xs text-[var(--color-accent)] font-medium mt-0.5 tabular-nums">
                    {grp.members} Ahli Komuniti
                  </p>
                </div>
                <a
                  href={grp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--quiet btn--sm"
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
