import { StudioNavbar } from "../components/StudioNavbar";
import { HeroSpecimen } from "../components/HeroSpecimen";
import { LoanWorkbench } from "../components/LoanWorkbench";
import { CorridorBento } from "../components/CorridorBento";
import { ServiceSwitcher } from "../components/ServiceSwitcher";
import { AdvisoryBand } from "../components/AdvisoryBand";
import { FaqIndex } from "../components/FaqIndex";
import { MastFooter } from "../components/MastFooter";
import { RevealObserver } from "../components/RevealObserver";

export default function LandingPage() {
  const whatsappNumber = "601158683907";
  const generalWhatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Hai Afif, saya lihat website anda. Saya berminat untuk dapatkan konsultasi hartanah di Kuala Lumpur / Selangor."
  )}`;

  return (
    <div id="top">
      <RevealObserver />
      <StudioNavbar whatsappUrl={generalWhatsappUrl} />
      <main id="main">
        {/* 1. Hero Section */}
        <HeroSpecimen generalWhatsappUrl={generalWhatsappUrl} />
        {/* 2. Calculator moved immediately below Hero per layout specification */}
        <LoanWorkbench />
        {/* 3. Coverage Corridors */}
        <CorridorBento whatsappUrl={generalWhatsappUrl} />
        {/* 4. Real Estate Services */}
        <ServiceSwitcher />
        {/* 5. Professional Advisory Band */}
        <AdvisoryBand />
        {/* 6. FAQ */}
        <FaqIndex whatsappUrl={generalWhatsappUrl} />
      </main>
      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
