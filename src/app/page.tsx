import { StudioNavbar } from "../components/StudioNavbar";
import { HeroSpecimen } from "../components/HeroSpecimen";
import { CorridorBento } from "../components/CorridorBento";
import { ServiceSwitcher } from "../components/ServiceSwitcher";
import { AdvisoryBand } from "../components/AdvisoryBand";
import { LoanWorkbench } from "../components/LoanWorkbench";
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
        <HeroSpecimen generalWhatsappUrl={generalWhatsappUrl} />
        <CorridorBento whatsappUrl={generalWhatsappUrl} />
        <ServiceSwitcher />
        <AdvisoryBand />
        <LoanWorkbench />
        <FaqIndex whatsappUrl={generalWhatsappUrl} />
      </main>
      <MastFooter whatsappUrl={generalWhatsappUrl} />
    </div>
  );
}
