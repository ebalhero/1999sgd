import React, { useState, useEffect } from "react";
import { siteConfig, getWhatsAppUrl } from "./config/siteConfig";
import { X, MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";

const EDITORIAL_SERIF = {
  fontFamily:
    "'Cormorant Garamond', 'Instrument Serif', 'Playfair Display', Georgia, serif",
};

const DISPLAY_SERIF = {
  fontFamily:
    "'Instrument Serif', 'Cormorant Garamond', 'Playfair Display', Georgia, serif",
};

/**
 * 7-Day Evergreen Countdown Hook
 * - Starts at 07 Hari 23 Jam 59 Minit 59 Saat
 * - Counts down across 7 days (07 -> 06 -> 05 -> 04 -> 03 -> 02 -> 01)
 * - Resets automatically to a new 7-day cycle right before hitting 00 Hari (never 0 days)
 */
function useCountdown() {
  const STORAGE_KEY = "lxfilms_sg2499_7days_v1";
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const SEVEN_DAYS_MS = 7 * ONE_DAY_MS;
  const INITIAL_SPAN_MS = SEVEN_DAYS_MS + ONE_DAY_MS - 1000;

  const [timeLeft, setTimeLeft] = useState({
    days: "07",
    hours: "23",
    minutes: "59",
    seconds: "59",
  });

  useEffect(() => {
    let deadline = Number(localStorage.getItem(STORAGE_KEY));
    const now = Date.now();

    if (
      !deadline ||
      Number.isNaN(deadline) ||
      deadline - now < ONE_DAY_MS ||
      deadline - now > INITIAL_SPAN_MS
    ) {
      deadline = now + INITIAL_SPAN_MS;
      localStorage.setItem(STORAGE_KEY, String(deadline));
    }

    const tick = () => {
      const current = Date.now();
      let diff = deadline - current;

      // Reset to a brand-new 7-day cycle before days ever reaches 0
      if (diff < ONE_DAY_MS) {
        deadline = current + INITIAL_SPAN_MS;
        localStorage.setItem(STORAGE_KEY, String(deadline));
        diff = INITIAL_SPAN_MS;
      }

      const d = Math.floor(diff / ONE_DAY_MS);
      const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(hrs).padStart(2, "0"),
        minutes: String(mins).padStart(2, "0"),
        seconds: String(secs).padStart(2, "0"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return timeLeft;
}

function TopBarCountdown({ timeLeft }) {
  return (
    <div className="inline-flex items-center gap-1 font-sans text-[10px] sm:text-xs text-white tabular-nums shrink-0">
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/30 font-semibold tracking-tight whitespace-nowrap">
        {timeLeft.days} <span className="font-light italic text-white/80">Hari</span>
      </span>
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/30 font-semibold tracking-tight whitespace-nowrap">
        {timeLeft.hours} <span className="font-light italic text-white/80">Jam</span>
      </span>
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/10 border border-white/30 font-semibold tracking-tight whitespace-nowrap">
        {timeLeft.minutes} <span className="font-light italic text-white/80">Minit</span>
      </span>
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#f8da45] text-[#2e1b11] font-bold tracking-tight shadow-sm whitespace-nowrap">
        {timeLeft.seconds} <span className="font-medium italic">Saat</span>
      </span>
    </div>
  );
}

function PromoCountdownSection({ timeLeft }) {
  const units = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Minit" },
    { value: timeLeft.seconds, label: "Saat", highlight: true },
  ];

  return (
    <div className="w-full px-7 sm:px-9 flex flex-col items-center">
      <div className="w-full grid grid-cols-4 gap-2.5 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={`relative rounded-[20px] py-3.5 sm:py-4 px-2 flex flex-col items-center justify-center backdrop-blur-md transition-all ${
              unit.highlight
                ? "border border-white/85 bg-white/[0.14] shadow-[0_0_24px_rgba(255,255,255,0.22),inset_0_1px_1px_rgba(255,255,255,0.65)]"
                : "border border-white/45 bg-white/[0.06] shadow-[0_8px_24px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.35)]"
            }`}
          >
            <span
              style={EDITORIAL_SERIF}
              className="text-[38px] sm:text-[44px] font-normal text-white lining-nums tabular-nums leading-none tracking-tight"
            >
              {unit.value}
            </span>
            <span
              style={EDITORIAL_SERIF}
              className="text-[15px] sm:text-[17px] italic font-normal text-white/90 mt-1.5 leading-none"
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[13.5px] sm:text-[15px] font-light text-white/90 tracking-tight">
        Tawaran terhad 7 hari — harga kembali ke{" "}
        <strong className="font-bold text-white">3999 SGD</strong> selepas tamat
      </p>
    </div>
  );
}

function FourPointStarIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      className="w-8 h-8 sm:w-9 sm:h-9 shrink-0 stroke-white fill-none"
      strokeWidth="1.4"
    >
      <path d="M18 2 C19.5 13, 23 16.5, 34 18 C23 19.5, 19.5 23, 18 34 C16.5 23, 13 19.5, 2 18 C13 16.5, 16.5 13, 18 2 Z" />
      <line x1="18" y1="0" x2="18" y2="36" strokeWidth="0.6" opacity="0.6" />
      <line x1="0" y1="18" x2="36" y2="18" strokeWidth="0.6" opacity="0.6" />
    </svg>
  );
}

function AngledRedRibbon({ text, direction = "left" }) {
  return (
    <div className="relative w-[112%] -ml-[6%] py-2 bg-[#cf0540] text-white overflow-hidden shadow-lg select-none"
      style={{
        transform: direction === "left" ? "rotate(-4.5deg)" : "rotate(4.5deg)",
      }}
    >
      <div className="flex items-center justify-around gap-4 whitespace-nowrap text-[16px] sm:text-[18px] tracking-tight">
        <span className="font-light opacity-95">{text}</span>
        <span className="font-extrabold">{text}</span>
        <span className="font-light opacity-95">{text}</span>
      </div>
    </div>
  );
}

export default function App() {
  const [lightboxImg, setLightboxImg] = useState(null);
  const [showUrgencyPopup, setShowUrgencyPopup] = useState(false);
  const timeLeft = useCountdown();
  const waUrl = getWhatsAppUrl();

  useEffect(() => {
    if (!siteConfig.urgencyPopup?.enabled) return;
    const showTimer = setTimeout(() => {
      setShowUrgencyPopup(true);
    }, 500);
    return () => clearTimeout(showTimer);
  }, []);

  const {
    urgencyPopup,
    hero,
    classicVibes,
    trustedCouples,
    visualMemory,
    royalFamilies,
    ourApproach,
    gardenToHall,
    whyChooseUs,
    simplePricing,
    freeGiftsWorth,
    albumShowcase,
    promoValueSection,
    discountBanner,
    singaporeMastery,
    package: pkg,
    depositSection,
    rsvpPromo,
    testimonials,
    processTimeline,
    faqs,
  } = siteConfig;

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#1a0f09] text-white font-sans antialiased selection:bg-[#f8da45] selection:text-[#2e1b11]">
      {/* Sticky Top Urgency Countdown Bar */}
      <div className="sticky top-0 z-40 w-full bg-[#24140c]/90 backdrop-blur-xl border-b border-white/15">
        <div className="mx-auto w-full max-w-[480px] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-1">
          <a
            href="#booking-promo"
            className="text-[11px] sm:text-[13px] font-medium tracking-tight text-white/95 whitespace-nowrap hover:text-[#f8da45] transition-colors shrink-0"
          >
            Promo <span className="font-bold text-[#f8da45]">{pkg.offerPrice}</span>
          </a>
          <TopBarCountdown timeLeft={timeLeft} />
        </div>
      </div>

      {/* First-Visit Small Urgency Pop-Out */}
      {showUrgencyPopup && urgencyPopup && (
        <div className="fixed top-14 inset-x-0 z-50 px-4 pointer-events-none flex justify-center animate-fade-in">
          <div className="pointer-events-auto w-full max-w-[410px] rounded-2xl bg-[#24140c]/95 backdrop-blur-xl border border-[#f8da45]/60 shadow-[0_14px_38px_rgba(0,0,0,0.85)] px-4 py-3 flex items-center justify-between gap-3">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShowUrgencyPopup(false)}
              className="flex items-center gap-3 flex-1 min-w-0 group"
            >
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#cf0540] opacity-85" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff2e63]" />
              </span>
              <p
                style={EDITORIAL_SERIF}
                className="text-[16px] sm:text-[17.5px] leading-[1.15] text-white lining-nums tracking-tight"
              >
                <strong className="font-bold text-[#f8da45] italic">
                  {urgencyPopup.highlight}
                </strong>{" "}
                <span>{urgencyPopup.message}</span>
              </p>
            </a>
            <button
              type="button"
              onClick={() => setShowUrgencyPopup(false)}
              aria-label="Tutup notifikasi"
              className="w-6 h-6 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center shrink-0 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Mobile-First Editorial Canvas */}
      <main className="mx-auto w-full max-w-[480px] bg-[#2e1b11] shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden pb-24">
        {/* ===================================================================
            SECTION 1: HERO (Editable Heading & Copy + Photo Collage & Lace)
        =================================================================== */}
        <section className="relative w-full bg-[#f4efe8] text-white">
          <div className="relative w-full">
            <img
              src="./images/sg/s1_hero_bg.webp"
              alt="Exclusive 10 Hours Wedding Photo & Video Coverage"
              fetchPriority="high"
              className="w-full h-auto block select-none"
            />

            {/* Editable Hero Text Overlay */}
            <div className="absolute inset-x-0 top-[9%] px-8 flex flex-col items-center text-center">
              <h1
                style={DISPLAY_SERIF}
                className="text-[42px] sm:text-[48px] leading-[0.94] tracking-[-0.01em] text-white font-normal"
              >
                Exclusive 10
                <br />
                <span className="italic">Hours Wedding</span>
                <br />
                Photo &amp; Video
                <br />
                <span className="italic">Coverage</span>
              </h1>
            </div>

            {/* Editable Hero Body Paragraphs */}
            <div className="absolute left-[23%] right-[16%] top-[53%] space-y-4 text-[14px] sm:text-[15.5px] leading-[1.18] font-light text-white/95 tracking-tight">
              <p className="whitespace-pre-line">{hero.para1}</p>
              <p>
                {hero.para2Prefix}
                <strong className="font-extrabold text-white">
                  {hero.priceHighlight}
                </strong>
                ,
              </p>
              <p className="whitespace-pre-line text-justify">{hero.para3}</p>
              <p className="whitespace-pre-line">{hero.para4}</p>
            </div>
          </div>

          {/* Bottom Cream Banner flowing seamlessly into Section 2 */}
          <div className="bg-[#f4efe8] text-[#2e1b11] pt-3 pb-4 px-6 flex flex-col items-center text-center">
            <h2
              style={DISPLAY_SERIF}
              className="text-[31px] sm:text-[35px] leading-[1.02] text-[#2e1b11] font-normal whitespace-pre-line"
            >
              {hero.bannerTitlePrefix}
              <span className="italic">{hero.bannerTitleItalic}</span>
            </h2>
            <img
              src="./images/sg/logo_exclusive_lxfilms.webp"
              alt="exclusive by lxFILMS"
              className="h-5 sm:h-6 w-auto mt-3 select-none"
            />
          </div>
        </section>

        {/* ===================================================================
            SECTION 2: "Premium Tailored," (Custom Script + 3 Photos + Lace)
        =================================================================== */}
        <section className="relative w-full bg-[#f4efe8]">
          <img
            src="./images/sg/s2_tailored_collage.webp"
            alt="Premium Tailored Wedding Portfolio"
            onClick={() => setLightboxImg("./images/sg/s2_tailored_collage.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 3: White Lace Oval + "CLASSICAL FILMS moments & times"
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s3_classical_oval.webp"
            alt="Classical Films Moments & Times"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s3_classical_oval.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 4: "Premium Films Classic Vibes" + 6-Photo Masonry Grid
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-8 pb-4">
          <div className="px-8 pb-7 text-center flex flex-col items-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[32px] sm:text-[36px] leading-[1.02] font-normal text-white tracking-tight mb-4"
            >
              {classicVibes.titleLine1}
              <br />
              {classicVibes.titleLine2}
            </h2>
            <p className="text-[13.5px] sm:text-[15px] leading-[1.35] font-light text-white/90 whitespace-pre-line max-w-[320px]">
              {classicVibes.description}
            </p>
          </div>

          <img
            src="./images/sg/s4_photo_grid.webp"
            alt="Premium Films Classic Vibes Gallery"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s4_photo_grid.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 5: "Trusted by 100+ Couples" + 4 Widescreen Film Strips
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-7 pb-6">
          <div className="px-7 pb-6 text-center flex flex-col items-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[30px] sm:text-[34px] leading-[1.08] font-normal text-white mb-3.5"
            >
              {trustedCouples.titlePrefix}
              <span className="italic">{trustedCouples.titleItalic}</span>
            </h2>
            <p className="text-[13.5px] sm:text-[14.5px] leading-[1.35] font-light text-white/90 whitespace-pre-line max-w-[310px]">
              {trustedCouples.description}
            </p>
          </div>

          <img
            src="./images/sg/s5_film_strips.webp"
            alt="Trusted by 100+ Couples Film Stills"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s5_film_strips.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 6: "Visual diberi rasa dan kekal sebagai memori" + Gold Oval
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s6_gold_oval_bg.webp"
            alt="Visual diberi rasa dan kekal sebagai memori"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s6_gold_oval_bg.webp")}
            className="w-full h-auto block cursor-pointer"
          />

          <div className="pointer-events-none absolute inset-x-0 top-[6%] px-6 text-center">
            <h2
              style={DISPLAY_SERIF}
              className="text-[34px] sm:text-[38px] leading-[0.98] font-normal text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.65)]"
            >
              {visualMemory.line1Prefix}
              <span className="italic">{visualMemory.line1Italic}</span>
              <br />
              {visualMemory.line2Prefix}
              <span className="italic">{visualMemory.line2Italic}</span>
              {visualMemory.line2Suffix}
              <br />
              <span className="italic">{visualMemory.line3Italic}</span>
            </h2>
          </div>
        </section>

        {/* ===================================================================
            SECTION 7: 5-Photo Cake & Portrait Collage
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s7_cake_collage.webp"
            alt="Koleksi Potret & Acara Potong Kek"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s7_cake_collage.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 8: "Experienced In Royal Families Moments" + Green Envelope
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11] pt-2 pb-2">
          <img
            src="./images/sg/s8_royal_medallion.webp"
            alt="Experienced In Royal Families Moments"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s8_royal_medallion.webp")}
            className="w-full h-auto block cursor-pointer"
          />

          <div className="pointer-events-none absolute inset-x-0 top-[18.5%] sm:top-[19%] flex flex-col items-center text-center px-6">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[46px] sm:text-[52px] leading-[1.14] tracking-[-0.015em] text-[#554632] font-normal"
            >
              <span className="italic">{royalFamilies.line1Italic}</span>
              <br />
              <span className="italic">{royalFamilies.line2Italic}</span>
              {royalFamilies.line2Regular}
              <br />
              {royalFamilies.line3Regular}
              <br />
              <span className="italic">{royalFamilies.line4Italic}</span>
            </h2>
          </div>
        </section>

        {/* ===================================================================
            SECTION 9: 4 Stacked Royal Family Wedding Photos
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s9_royal_photos.webp"
            alt="Majlis Diraja & VIP"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s9_royal_photos.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 10: "Our Approach" + Couple by Car Photo
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-7">
          <div className="px-7 pb-6 text-center flex flex-col items-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[31px] sm:text-[35px] leading-none font-normal text-white mb-4"
            >
              <span className="italic">{ourApproach.titleItalic}</span>
              {ourApproach.titleRegular}
            </h2>
            <p className="text-[13.5px] sm:text-[15px] leading-[1.3] font-light text-white/90 whitespace-pre-line mb-3.5">
              {ourApproach.subtitle1}
            </p>
            <p className="text-[13.5px] sm:text-[15px] leading-[1.3] font-light text-white/90 whitespace-pre-line">
              {ourApproach.subtitle2}
            </p>
          </div>

          <img
            src="./images/sg/s10_couple_car.webp"
            alt="Our Approach — Minimal Direction, Natural Flow"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s10_couple_car.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 11: "From Garden Concepts To Big Elegant Hall..."
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-7">
          <div className="px-6 pb-4 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[29px] sm:text-[33px] leading-[1.05] font-normal text-white"
            >
              <span className="italic">{gardenToHall.line1Italic}</span>
              <br />
              {gardenToHall.line2Prefix}
              <span className="italic">{gardenToHall.line2Italic}</span>
              {gardenToHall.line2Suffix}
            </h2>
          </div>

          <img
            src="./images/sg/s11_garden_hall.webp"
            alt="From Garden Concepts To Big Elegant Hall"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s11_garden_hall.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 12: "Why Choose Us Instead of Others?" (100% Editable HTML)
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-9 pb-8 px-7 sm:px-9">
          <h2
            style={EDITORIAL_SERIF}
            className="text-center text-[31px] sm:text-[35px] leading-[1.04] font-normal text-white whitespace-pre-line mb-7"
          >
            {whyChooseUs.titlePrefix}
            <span className="italic">{whyChooseUs.titleItalic}</span>
            {whyChooseUs.titleSuffix}
          </h2>

          <div className="space-y-5 mb-8">
            {whyChooseUs.points.map((pt, idx) => (
              <div key={idx} className="flex items-start gap-3.5">
                <FourPointStarIcon />
                <p className="text-[13.5px] sm:text-[14.5px] leading-[1.28] font-light text-white/95 pt-0.5">
                  {pt}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center text-[14.5px] sm:text-[15.5px] leading-[1.28] font-light text-white whitespace-pre-line mb-6">
            {whyChooseUs.guaranteeIntro}
            <strong className="font-bold">{whyChooseUs.guaranteeBold}</strong>
          </p>

          <div className="flex items-center justify-center gap-4 mb-3">
            <img
              src="./images/sg/s12_money_back_badge.webp"
              alt="100% Money Back Guarantee"
              loading="lazy"
              className="w-16 h-16 sm:w-[70px] sm:h-[70px] object-contain shrink-0 select-none"
            />
            <p className="text-[13.5px] sm:text-[14.5px] leading-[1.25] font-bold text-white whitespace-pre-line">
              {whyChooseUs.guaranteePromise}
            </p>
          </div>

          <p className="text-center text-[9.5px] sm:text-[10.5px] text-white/75 font-light">
            {whyChooseUs.guaranteeFootnote}
          </p>
        </section>

        {/* ===================================================================
            SECTION 13: "Simple pricing. Thoughtful wedding coverage." Table
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-6 pb-8">
          <div className="px-7 pb-6 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[31px] sm:text-[35px] leading-[1.04] font-normal text-white"
            >
              {simplePricing.line1Prefix}
              <span className="italic">{simplePricing.line1Italic}</span>
              {simplePricing.line1Suffix}
              <br />
              {simplePricing.line2Prefix}
              <span className="italic">{simplePricing.line2Italic}</span>
            </h2>
          </div>

          <div className="border-t border-white/25">
            {simplePricing.gridRows.map((row, rIdx) => (
              <div
                key={rIdx}
                className="grid grid-cols-2 border-b border-white/25"
              >
                <div className="p-4 sm:p-5 pl-6 sm:pl-8 border-r border-white/25 flex items-center">
                  <p className="text-[13.5px] sm:text-[14.5px] leading-[1.25] font-light text-white/95 whitespace-pre-line">
                    {row[0]}
                  </p>
                </div>
                <div className="p-4 sm:p-5 pl-5 sm:pl-6 flex items-center">
                  <p className="text-[13.5px] sm:text-[14.5px] leading-[1.25] font-light text-white/95 whitespace-pre-line">
                    {row[1]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-5 px-6 text-center text-[11px] sm:text-[12px] leading-[1.35] text-white/90 font-light">
            <p>{simplePricing.footnoteLine1}</p>
            <p>
              {simplePricing.footnoteLine2Prefix}
              <strong className="font-bold text-white">
                {simplePricing.footnoteLine2Bold}
              </strong>
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECTION 14: "beyond standard coverage, & semua ini FREEGIFT"
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-5 pb-6">
          <div className="px-6 pb-5 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[29px] sm:text-[33px] leading-[1.06] font-normal text-white"
            >
              <span className="italic">{freeGiftsWorth.line1Italic}</span>
              {freeGiftsWorth.line1Suffix}
              <br />
              {freeGiftsWorth.line2Prefix}
              <span className="italic">{freeGiftsWorth.line2Italic}</span>
            </h2>
          </div>

          <div className="border-t border-white/25">
            {freeGiftsWorth.items.map((item, idx) => (
              <div
                key={idx}
                className="px-7 sm:px-9 py-3.5 border-b border-white/25 flex items-center justify-between gap-4"
              >
                <h3
                  style={DISPLAY_SERIF}
                  className="text-[22px] sm:text-[25px] leading-[0.92] tracking-[0.02em] uppercase text-white font-normal whitespace-pre-line"
                >
                  {item.title}
                </h3>
                <span className="text-[13px] sm:text-[14px] italic font-light text-white/90 shrink-0">
                  {item.worth}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-7 pb-2 px-6 text-center">
            <h3
              style={EDITORIAL_SERIF}
              className="text-[29px] sm:text-[33px] leading-[1.05] font-normal text-white"
            >
              <span className="italic">
                {freeGiftsWorth.albumHeadingLine1Italic}
              </span>
              {freeGiftsWorth.albumHeadingLine1Suffix}
              <br />
              {freeGiftsWorth.albumHeadingLine2Prefix}
              <span className="italic">
                {freeGiftsWorth.albumHeadingLine2Italic}
              </span>
            </h3>
          </div>
        </section>

        {/* ===================================================================
            SECTION 15 & 16: Engraved Album, Classic Frame & Matte/Glossy Pages
        =================================================================== */}
        <section className="bg-[#2e1b11] space-y-2 pb-4">
          {/* Custom Premium Engraved Album */}
          <div
            onClick={() => setLightboxImg("./images/sg/s15_album.webp")}
            className="relative w-full cursor-pointer overflow-hidden"
          >
            <img
              src="./images/sg/s15_album.webp"
              alt="Custom Premium Engraved Album"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="pointer-events-none absolute left-5 bottom-4">
              <p className="text-[14px] sm:text-[15.5px] leading-[1.1] tracking-wide uppercase text-white font-light whitespace-pre-line drop-shadow">
                {albumShowcase.badge1Line1}
                <span className="italic">{albumShowcase.badge1Italic}</span>
                {albumShowcase.badge1Suffix}
              </p>
            </div>
          </div>

          {/* + Premium Classic Frame */}
          <div
            onClick={() => setLightboxImg("./images/sg/s15_frame.webp")}
            className="relative w-full cursor-pointer overflow-hidden"
          >
            <img
              src="./images/sg/s15_frame.webp"
              alt="Premium Classic Frame"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="pointer-events-none absolute left-5 bottom-4">
              <p className="text-[14px] sm:text-[15.5px] leading-[1.1] tracking-wide uppercase text-white font-light whitespace-pre-line drop-shadow">
                {albumShowcase.badge2Line1}
                <span className="italic">{albumShowcase.badge2Italic}</span>
                {albumShowcase.badge2Suffix}
              </p>
            </div>
          </div>

          {/* Matte Paper + Glossy Paper Finishing & 12*8 Inch + 20 Pages */}
          <div
            onClick={() => setLightboxImg("./images/sg/s16_spreads.webp")}
            className="relative w-full pt-2 cursor-pointer overflow-hidden"
          >
            <img
              src="./images/sg/s16_spreads.webp"
              alt="Matte Paper + Glossy Paper Finishing 12x8 Inch 20 Pages"
              loading="lazy"
              className="w-full h-auto block"
            />
            <div className="pointer-events-none absolute left-6 top-5">
              <p
                style={DISPLAY_SERIF}
                className="text-[28px] sm:text-[32px] leading-[0.88] uppercase text-white font-normal whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
              >
                {albumShowcase.finishingText}
              </p>
            </div>
            <div className="pointer-events-none absolute right-10 top-[57%]">
              <p
                style={DISPLAY_SERIF}
                className="text-[28px] sm:text-[32px] leading-[0.88] uppercase text-white font-normal whitespace-pre-line drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]"
              >
                {albumShowcase.sizeText}
              </p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 17: Drone Cards + "Total value pakej ni lebih 3999 SGD..."
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s17_bg_notext.webp"
            alt="Drone Shots & Promo Value"
            loading="lazy"
            className="w-full h-auto block select-none"
          />

          <div className="absolute inset-x-0 bottom-[6%] px-8 space-y-4">
            <h2 className="text-[21px] sm:text-[23px] leading-[1.2] tracking-tight text-white">
              <span className="text-white/75 font-bold">
                Total value pakej ni{" "}
              </span>
              <strong className="font-extrabold text-white">
                lebih
                <br />
                {promoValueSection.normalValue}{" "}
              </strong>
              <span className="text-white/75 font-extrabold">
                tapi sekarang
              </span>
              <br />
              <strong className="font-extrabold text-white">hanya </strong>
              <span className="inline-block bg-[#cf0540] text-white font-extrabold px-2 py-0.5">
                {promoValueSection.promoPrice}
              </span>
            </h2>

            <p className="text-[13.5px] sm:text-[15px] leading-[1.35] font-light text-white/90 whitespace-pre-line">
              {promoValueSection.para2}
            </p>

            <p className="text-[13.5px] sm:text-[15px] leading-[1.35] font-light text-white/90 whitespace-pre-line">
              {promoValueSection.para3Prefix}
              <strong className="font-bold text-white">
                {promoValueSection.para3Bold}
              </strong>
            </p>

            <p className="text-[13.5px] sm:text-[15px] leading-[1.35] font-light text-white/90 whitespace-pre-line">
              <strong className="font-bold text-white">
                {promoValueSection.para4Bold}
              </strong>
              {promoValueSection.para4Suffix}
            </p>
          </div>
        </section>

        {/* ===================================================================
            SECTION 18: 13-Photo Merged Collage Grid (Slide 18 + Slide 19 Top 3)
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s18_collage.webp"
            alt="Wedding Moments Collage"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s18_collage.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 19: 1500SGD OFF Ribbons + 3999 SGD -> 2499 SGD
        =================================================================== */}
        <section id="offer" className="bg-[#2e1b11] pt-6 pb-6 overflow-hidden">
          <AngledRedRibbon text={discountBanner.ribbonText} direction="left" />

          <div className="px-7 pt-8 pb-7">
            <div className="relative inline-block mb-1">
              <span
                className="text-[38px] sm:text-[44px] font-extrabold tracking-tight leading-none select-none"
                style={{
                  color: "transparent",
                  WebkitTextStroke: "1.5px #ff2e63",
                }}
              >
                {discountBanner.oldPrice}
              </span>
              <span className="absolute left-0 right-0 top-1/2 h-[2.5px] bg-[#ff2e63] -translate-y-1/2" />
            </div>

            <div className="text-[54px] sm:text-[64px] font-extrabold text-white leading-none tracking-tight mb-5">
              {discountBanner.newPrice}
            </div>

            <div className="space-y-4 text-[15px] sm:text-[16.5px] leading-[1.3] font-light text-white/95">
              <p className="whitespace-pre-line">
                {discountBanner.para1Prefix}
                <strong className="font-bold text-white">
                  {discountBanner.para1Bold}
                </strong>
                {discountBanner.para1Suffix}
              </p>
              <p className="whitespace-pre-line">{discountBanner.para2}</p>
              <p className="whitespace-pre-line">{discountBanner.para3}</p>
            </div>
          </div>

          <AngledRedRibbon text={discountBanner.ribbonText} direction="right" />
        </section>

        {/* ===================================================================
            SECTION 20: "Make Wedding Fine Art And Fun" + Staggered Collage
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11] pt-2 pb-2">
          <img
            src="./images/sg/s20_fine_art.webp"
            alt="Make Wedding Fine Art And Fun"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s20_fine_art.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 21: "Mastered Through Years of Shooting in Singapore..."
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-6 pb-6">
          <div className="px-6 pb-5 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[26px] sm:text-[30px] leading-[1.06] font-normal text-white whitespace-pre-line"
            >
              <span className="italic">{singaporeMastery.heading.italic1}</span>
              {singaporeMastery.heading.text1}
              <span className="italic">{singaporeMastery.heading.italic2}</span>
              {singaporeMastery.heading.text2}
              <span className="italic">{singaporeMastery.heading.italic3}</span>
              {singaporeMastery.heading.text3}
            </h2>
          </div>

          <img
            src="./images/sg/s21_gold_rect_frame.webp"
            alt="Mastered Through Years of Shooting in Singapore"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s21_gold_rect_frame.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 22: 15-Photo Grid + Silver Ornate Oval Frame
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11] pb-4">
          <img
            src="./images/sg/s22_grid_silver_oval.webp"
            alt="Koleksi Majlis Kahwin & Cincin"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s22_grid_silver_oval.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 23: "Where Our Stories Have Unfolded" (9 SG Venues Grid)
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-6 pb-8">
          <div className="px-6 pb-6 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[29px] sm:text-[33px] leading-[1.05] font-normal text-white whitespace-pre-line"
            >
              <span className="italic">
                {singaporeMastery.venuesTitleItalic}
              </span>
              {singaporeMastery.venuesTitleSuffix}
            </h2>
          </div>

          <div className="border-t border-white/40">
            {[0, 1, 2].map((rowIdx) => (
              <div
                key={rowIdx}
                className="grid grid-cols-3 border-b border-white/40 px-3"
              >
                {singaporeMastery.venues
                  .slice(rowIdx * 3, rowIdx * 3 + 3)
                  .map((venue, cIdx) => (
                    <div
                      key={venue.name}
                      onClick={() => setLightboxImg(venue.img)}
                      className={`px-2 pt-0 pb-3 flex flex-col cursor-pointer group ${
                        cIdx < 2 ? "border-r border-white/40" : ""
                      }`}
                    >
                      <div className="aspect-[224/300] w-full overflow-hidden bg-black/20">
                        <img
                          src={venue.img}
                          alt={venue.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <span className="mt-1.5 text-[10.5px] sm:text-[11.5px] font-light text-white/95 tracking-tight leading-tight">
                        {venue.name}
                      </span>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 24: 5 Widescreen Film Stills
        =================================================================== */}
        <section className="relative w-full bg-[#2e1b11]">
          <img
            src="./images/sg/s24_widescreen_stills.webp"
            alt="Cinematic Wedding Widescreen Stills"
            loading="lazy"
            onClick={() =>
              setLightboxImg("./images/sg/s24_widescreen_stills.webp")
            }
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 25: "Where magic breathes a masterpiece" + 5 Film Polaroids
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-8 pb-4">
          <div className="px-6 pb-3 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[29px] sm:text-[33px] leading-[1.05] font-normal text-white whitespace-pre-line"
            >
              {singaporeMastery.magicTitlePrefix}
              <span className="italic">
                {singaporeMastery.magicTitleItalic}
              </span>
              {singaporeMastery.magicTitleSuffix}
            </h2>
          </div>

          <img
            src="./images/sg/s25_film_polaroids.webp"
            alt="Where Magic Breathes A Masterpiece"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s25_film_polaroids.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 26: "Package Details" (100% Editable HTML Card) + "PROMO ENDS IN"
        =================================================================== */}
        <section id="package-details" className="bg-[#2e1b11] pt-6">
          <div className="px-6 pb-5 text-center">
            <h2
              style={DISPLAY_SERIF}
              className="text-[38px] sm:text-[42px] leading-none font-normal text-white"
            >
              <span className="italic">{pkg.sectionTitleItalic}</span>
              {pkg.sectionTitleSuffix}
            </h2>
          </div>

          {/* Yellow Top Banner */}
          <div className="w-full bg-[#f8da45] text-[#2e1b11] py-2.5 px-4 text-center font-medium text-[15px] sm:text-[16px] tracking-tight">
            {pkg.topBanner}
          </div>

          {/* Cream Package Details Card (100% Editable Text) */}
          <div className="w-full bg-[#f5f2eb] text-[#231f20] px-7 sm:px-9 py-8">
            <div className="flex items-start justify-between gap-2 mb-6">
              <div>
                <h3
                  style={EDITORIAL_SERIF}
                  className="text-[31px] sm:text-[35px] leading-[0.98] font-normal text-[#231f20] whitespace-pre-line"
                >
                  <span className="italic">{pkg.nameItalic}</span>
                  {pkg.nameRegular}
                </h3>
                <p
                  style={EDITORIAL_SERIF}
                  className="text-[14.5px] sm:text-[16px] italic text-[#231f20]/90 mt-1.5"
                >
                  {pkg.subtitle}
                </p>
              </div>

              <div className="text-right shrink-0 pt-1">
                <div
                  style={EDITORIAL_SERIF}
                  className="text-[32px] sm:text-[38px] leading-none font-normal text-[#231f20]"
                >
                  {pkg.cardPrice}
                </div>
                <div className="text-[13px] sm:text-[14px] text-[#ff4d4d] font-light mt-1">
                  {pkg.normalPriceLabel}
                  <span className="line-through decoration-[#ff4d4d] decoration-[1.5px]">
                    {pkg.normalPriceValue}
                  </span>
                </div>
              </div>
            </div>

            {/* PHOTOGRAPHY */}
            <div className="mb-6">
              <h4
                style={EDITORIAL_SERIF}
                className="text-[15px] sm:text-[16px] tracking-[0.28em] uppercase text-[#231f20] font-normal mb-2.5"
              >
                PHOTOGRAPHY
              </h4>
              <ul
                style={EDITORIAL_SERIF}
                className="space-y-0.5 text-[15px] sm:text-[16.5px] leading-[1.32] italic text-[#231f20]"
              >
                {pkg.photographyItems.map((item, idx) => (
                  <li
                    key={idx}
                    className={
                      item.bold ? "font-bold text-black" : "font-normal"
                    }
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* VIDEOGRAPHY */}
            <div className="mb-6">
              <h4
                style={EDITORIAL_SERIF}
                className="text-[15px] sm:text-[16px] tracking-[0.28em] uppercase text-[#231f20] font-normal mb-2.5"
              >
                VIDEOGRAPHY
              </h4>
              <ul
                style={EDITORIAL_SERIF}
                className="space-y-0.5 text-[15px] sm:text-[16.5px] leading-[1.32] italic text-[#231f20]"
              >
                {pkg.videographyItems.map((item, idx) => (
                  <li
                    key={idx}
                    className={
                      item.bold ? "font-bold text-black" : "font-normal"
                    }
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            {/* FREEGIFT */}
            <div className="mb-7">
              <h4
                style={EDITORIAL_SERIF}
                className="text-[15px] sm:text-[16px] tracking-[0.28em] uppercase text-[#231f20] font-normal mb-2.5"
              >
                FREEGIFT :
              </h4>
              <ul
                style={EDITORIAL_SERIF}
                className="space-y-0.5 text-[15px] sm:text-[16.5px] leading-[1.32] italic text-[#231f20]"
              >
                {pkg.freeGiftItems.map((item, idx) => (
                  <li key={idx}>
                    <strong className="font-bold text-black">
                      {item.boldPrefix}
                    </strong>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex justify-center pt-1">
              <img
                src="./images/sg/logo_exclusive_lxfilms.webp"
                alt="exclusive by lxFILMS"
                className="h-5 sm:h-6 w-auto select-none"
              />
            </div>
          </div>

          {/* Custom Glowing "PROMO ENDS IN" Graphic */}
          <div className="w-full bg-[#2e1b11] pt-2">
            <img
              src="./images/sg/s26_promo_ends_in.webp"
              alt="PROMO ENDS IN"
              loading="lazy"
              className="w-full h-auto block select-none"
            />
          </div>
        </section>

        {/* ===================================================================
            SECTION 27: Live 7-Day Countdown + Editable Deposit SGD 300 + CTA
        =================================================================== */}
        <section id="booking-promo" className="bg-[#2e1b11] pt-1 pb-8">
          {/* 7-Day Auto-Resetting Countdown Timer */}
          <div className="mb-8">
            <PromoCountdownSection timeLeft={timeLeft} waUrl={waUrl} />
          </div>

          {/* Deposit Serendah SGD 300 Heading */}
          <div className="px-9 sm:px-11 pb-4">
            <h2 className="text-[28px] sm:text-[32px] leading-[1.1] font-extrabold tracking-tight text-white whitespace-pre-line">
              {depositSection.heading}
            </h2>
          </div>

          {/* Framed Deposit Details + "Nak Book Segera!" + FREE E-Kad RSVP with Continuous Vertical Line */}
          <div className="relative border-t border-white/80">
            <div className="relative pl-[7.488%]">
              {/* Continuous Vertical Line from top border down through RSVP text */}
              <div className="pointer-events-none absolute left-[7.488%] top-0 bottom-0 w-[1.5px] bg-white/80" />

              <div className="px-6 sm:px-8 pt-6 pb-8">
                <div className="space-y-5 text-[16px] sm:text-[17.5px] leading-[1.35] font-light text-white/95 mb-8">
                  <p className="whitespace-pre-line">{depositSection.para1}</p>
                  <p className="whitespace-pre-line">{depositSection.para2}</p>
                  <p>{depositSection.balanceLabel}</p>
                  <div className="space-y-1">
                    <p>
                      <strong className="font-extrabold text-white">
                        {depositSection.term1Bold1}
                      </strong>
                      {depositSection.term1Mid}
                      <strong className="font-extrabold text-white">
                        {depositSection.term1Bold2}
                      </strong>
                    </p>
                    <p className="whitespace-pre-line">
                      <strong className="font-extrabold text-white">
                        {depositSection.term2Bold1}
                      </strong>
                      {depositSection.term2Mid1}
                      <strong className="font-extrabold text-white">
                        {depositSection.term2Bold2}
                      </strong>
                      {depositSection.term2Mid2}
                      <strong className="font-extrabold text-white">
                        {depositSection.term2Bold3}
                      </strong>
                    </p>
                  </div>
                </div>

                <div className="pr-4">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 px-6 border border-white/85 text-white hover:bg-white hover:text-[#2e1b11] font-light text-[22px] sm:text-[25px] tracking-tight flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                  >
                    <span>{depositSection.buttonText}</span>
                  </a>
                </div>
              </div>

              {/* "Khas Untuk Promo Kali Ini Sahaja! FREE E-Kad RSVP" */}
              <div className="pt-4 pb-3 pr-[7.488%] flex flex-col items-center text-center">
                <p className="text-[20px] sm:text-[22px] leading-[1.2] font-light text-white whitespace-pre-line mb-2">
                  {rsvpPromo.topText}
                </p>

                <img
                  src="./images/sg/s28_free_glow.webp"
                  alt="FREE"
                  loading="lazy"
                  className="w-[68%] max-w-[270px] h-auto block select-none my-1"
                />

                <p className="text-[20px] sm:text-[22px] leading-[1.2] text-white mt-1">
                  <strong className="font-extrabold">
                    {rsvpPromo.subtitleBold}
                  </strong>
                  <br />
                  <span className="font-light">{rsvpPromo.subtitleRegular}</span>
                </p>
              </div>
            </div>

            {/* Phone RSVP Image with continuation of vertical line down to the hand */}
            <div className="relative w-full">
              <div className="pointer-events-none absolute left-[7.488%] top-0 h-[40.2%] w-[1.5px] bg-white/80 z-10" />
              <img
                src="./images/sg/s28_phone_rsvp.webp"
                alt="FREE E-Kad RSVP Bernilai 99 SGD"
                loading="lazy"
                onClick={() => setLightboxImg("./images/sg/s28_phone_rsvp.webp")}
                className="w-full h-auto block cursor-pointer"
              />
            </div>
          </div>
        </section>

        {/* ===================================================================
            SECTION 29 & 30: WhatsApp Feedbacks & Testimonials
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-8 pb-4">
          <div className="px-6 pb-3 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[30px] sm:text-[34px] leading-none font-normal text-white"
            >
              {testimonials.title1}
            </h2>
            <p className="text-[13px] sm:text-[14px] font-light text-white/90 mt-1">
              {testimonials.subtitle1}
            </p>
          </div>

          <img
            src="./images/sg/s29_wa_feedbacks.webp"
            alt="Feedback & Testimoni Pelanggan 1"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s29_wa_feedbacks.webp")}
            className="w-full h-auto block cursor-pointer"
          />

          <div className="px-6 pt-7 pb-3 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[30px] sm:text-[34px] leading-[1.05] font-normal text-white whitespace-pre-line"
            >
              <span className="italic">{testimonials.title2Italic1}</span>
              {testimonials.title2Mid}
              <span className="italic">{testimonials.title2Italic2}</span>
              {testimonials.title2End}
            </h2>
          </div>

          <img
            src="./images/sg/s30_wa_feedbacks.webp"
            alt="Feedback & Testimoni Pelanggan 2"
            loading="lazy"
            onClick={() => setLightboxImg("./images/sg/s30_wa_feedbacks.webp")}
            className="w-full h-auto block cursor-pointer"
          />
        </section>

        {/* ===================================================================
            SECTION 31: "How we process your photos & video?" + S-Curve Timeline
        =================================================================== */}
        <section className="bg-[#2e1b11] pt-7 pb-4">
          <div className="px-6 pb-2 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[30px] sm:text-[34px] leading-[1.04] font-normal text-white"
            >
              {processTimeline.titleLine1Prefix}
              <span className="italic">{processTimeline.titleLine1Italic}</span>
              <br />
              {processTimeline.titleLine2Prefix}
              <span className="italic">{processTimeline.titleLine2Italic}</span>
            </h2>
          </div>

          <div className="relative w-full aspect-[310/560]">
            <img
              src="./images/sg/s31_timeline_curve.svg"
              alt="Timeline Process"
              className="w-full h-full block select-none"
            />
            {processTimeline.steps.map((step, idx) => (
              <span
                key={idx}
                style={{ top: step.top, left: step.left }}
                className="absolute text-[12.5px] sm:text-[14px] font-light text-white/95 tracking-tight whitespace-nowrap"
              >
                {step.label}
              </span>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SECTION 32 & 33: "Frequent Ask Question" (All 6 FAQs Seamlessly)
        =================================================================== */}
        <section id="faq" className="bg-[#2e1b11] pt-6 pb-10 px-8 sm:px-10">
          <h2 className="text-center text-[25px] sm:text-[28px] font-bold leading-[1.15] tracking-tight text-white mb-8">
            Frequent
            <br />
            Ask Question
          </h2>

          <div className="divide-y divide-white/70 border-b border-white/70">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6 first:pt-2">
                <h3 className="text-[14.5px] sm:text-[16px] font-bold leading-[1.3] text-white whitespace-pre-line mb-3">
                  {faq.question}
                </h3>
                <p className="text-[13.5px] sm:text-[15px] font-light leading-[1.42] text-white/90 whitespace-pre-line">
                  {faq.answer}
                </p>
                {faq.bullets && (
                  <ul className="mt-3 pl-5 list-disc space-y-1.5 text-[13.5px] sm:text-[15px] font-light leading-[1.38] text-white/90">
                    {faq.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Sticky Bottom WhatsApp Booking Bar */}
      <div className="fixed bottom-4 inset-x-0 z-40 px-4 pointer-events-none flex justify-center">
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-full max-w-[430px] rounded-full bg-[#25D366] text-black font-bold py-3.5 px-5 sm:px-6 shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex items-center justify-between hover:brightness-105 active:scale-[0.99] transition-all"
        >
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-5 h-5 fill-black stroke-black shrink-0" />
            <span className="text-sm sm:text-[15px] tracking-tight">
              {siteConfig.whatsapp.buttonLabel}{" "}
              <span className="font-normal text-black/80 text-xs sm:text-[13px]">
                (Lock Slot SGD 300)
              </span>
            </span>
          </div>
          <span className="text-xs font-extrabold uppercase tracking-wider bg-black/15 px-3 py-1 rounded-full whitespace-nowrap">
            WhatsApp →
          </span>
        </a>
      </div>

      {/* Fullscreen Image Lightbox */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <button
            onClick={() => setLightboxImg(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={lightboxImg}
            alt="Preview Penuh"
            className="max-h-[90vh] max-w-[94vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
