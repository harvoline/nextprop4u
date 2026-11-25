# NextProp4U — Architectural Design Specification

## Design Tokens

**Palette** (`studio`, hue `215` blue-black in OKLCH):
- `--color-paper`: `#F5F3EF` / `oklch(97.2% 0.006 215)` (Cool studio-white proof paper)
- `--color-paper-2`: `#EBEAE5` (Secondary proof tint)
- `--color-paper-hi`: `#FAF8F5` (Elevated folio sheet)
- `--color-ink`: `#09141C` (Primary ink text & dark structural band)
- `--color-ink-2`: `#2F3A44` (Secondary editorial copy)
- `--color-muted`: `#63696E` (Technical readouts & metadata)
- `--color-accent`: `#DD5B1E` (Cadmium drafting orange — primary CTA & 1px specimen construction lines)
- `--color-rule`: `#D8D6CF` (Hairline architectural dividers)

**Typography**:
- Display & Section Headings: **Hedvig Letters Serif** (`400` normal / italic accents, tight `-0.024em` display tracking)
- UI & Technical Copy: **Geist** (`400` / `500` / `600`, `tabular-nums` for RM figures & loan readouts)
- Scale Anchor: Display `68px` desktop (`clamp(2rem, 4.6vw, 4.25rem)`), body `16px–17px` (`1.6` line-height)

**Elevation & Chrome**:
- `Studio Proof` dot-grid (`24px`) & subtle SVG speckle grain across Hero banner and Mast footer only, masked cleanly before content below
- Single-level `.sheet` cards using subtle directional shadow (`--shadow-sheet`), zero stacked card borders + shadows, zero card-in-card nesting
- 8-tick `.crop` registration marks on Hero folio sheets and CTA buttons
- Double-ruled bordered chrome (`.btn`) with crisp 2px radius; solid fill reserved strictly for the primary `--color-accent` CTA rhythm (`WhatsApp Afif`)

## Macro-Structure (Draw `4bc7b6`)

1. **Navigation**: Announcement banner (`+6011-5868 3907` & Maxxan Realty coverage) over retracting proof-paper sticky navbar (`StudioNavbar`).
2. **Hero Stage**: Live typographic specimen ruler (`Muhammad Norafif`) with interactive pointer caliper + `5/7` editorial split pairing value proposition & dual CTAs with crop-marked architectural plate and Principal Dossier strip (`HeroSpecimen`).
3. **Corridor Bento (`shape: Bento Grid`)**: Asymmetric `12-column` portfolio showcase covering Setapak, Wangsa Maju & Kuala Lumpur alongside Selangor coverage (Petaling Jaya, Subang, Damansara, Shah Alam, Klang, Ampang, Cheras, Kajang, Bangi, Gombak, Selayang, Rawang) and live JPPH owner listing valuation (`CorridorBento`).
4. **Service Switcher Dossier**: Tabbed architectural dossier covering *Jual Hartanah*, *Beli Rumah*, and *Sewa Rumah* with hairline scope lists and direct WhatsApp triggers (`ServiceSwitcher`).
5. **Advisory Band (`surface-ink`)**: Full-bleed dark `#09141C` structural band presenting four LPPEH & JPPH advisory pillars (`AdvisoryBand`).
6. **Mortgage & Mandate Workbench (`#kalkulator`)**: Client-side PMT + 60% DSR calculator and direct WhatsApp dossier builder (`LoanWorkbench`).
7. **FAQ Index**: Sticky editorial header beside hairline accordion rows (`FaqIndex`).
8. **Mast Footer**: Monumental display wordmark on proof paper with direct contacts, `/login` CRM access, and LPPEH statutory disclosure (`MastFooter`).
