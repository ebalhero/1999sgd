import React, { useState, useEffect } from "react";
import { siteConfig, getWhatsAppUrl } from "./config/siteConfig";
import { X } from "lucide-react";

const EDITORIAL_SERIF = {
  fontFamily:
    "'Cormorant Garamond', 'Playfair Display', 'Instrument Serif', Georgia, serif",
};

const DISPLAY_SERIF = {
  fontFamily:
    "'Playfair Display', 'Cormorant Garamond', 'Instrument Serif', Georgia, serif",
};

const BODY_SANS = {
  fontFamily:
    "'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif",
};

/**
 * 7-Day Evergreen Countdown Hook
 * - Starts at 07 Hari 23 Jam 59 Minit 59 Saat
 * - Counts down across 7 days (07 -> 06 -> 05 -> 04 -> 03 -> 02 -> 01)
 * - Resets automatically to a new 7-day cycle right before hitting 00 Hari (never shows 0 days)
 */
function useCountdown() {
  const STORAGE_KEY = "lxfilmspro_rm3499_7days_v1";
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

      // Reset to a brand-new 7-day cycle right before days ever reaches 0
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
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/30 font-semibold tracking-tight whitespace-nowrap">
        {timeLeft.days} <span className="font-light italic text-white/80">Hari</span>
      </span>
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/30 font-semibold tracking-tight whitespace-nowrap">
        {timeLeft.hours} <span className="font-light italic text-white/80">Jam</span>
      </span>
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-white/[0.08] border border-white/30 font-semibold tracking-tight whitespace-nowrap">
        {timeLeft.minutes} <span className="font-light italic text-white/80">Minit</span>
      </span>
      <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-[#cf0540] border border-white/40 text-white font-bold tracking-tight shadow-sm whitespace-nowrap">
        {timeLeft.seconds} <span className="font-light italic">Saat</span>
      </span>
    </div>
  );
}

function PromoCountdownSection({ timeLeft, note }) {
  const units = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Minit" },
    { value: timeLeft.seconds, label: "Saat", highlight: true },
  ];

  return (
    <div className="w-full px-6 sm:px-8 flex flex-col items-center">
      <div className="w-full grid grid-cols-4 gap-2.5 sm:gap-3">
        {units.map((unit) => (
          <div
            key={unit.label}
            className={`relative rounded-[22px] py-3.5 sm:py-4 px-2 flex flex-col items-center justify-center backdrop-blur-md transition-all ${
              unit.highlight
                ? "border border-white/85 bg-gradient-to-b from-[#cf0540]/85 to-[#8f042c]/90 shadow-[0_0_26px_rgba(207,5,64,0.5),inset_0_1px_1px_rgba(255,255,255,0.75)]"
                : "border border-white/55 bg-gradient-to-b from-[#2c3035]/90 to-[#17191c]/95 shadow-[0_10px_28px_rgba(0,0,0,0.65),inset_0_1px_1px_rgba(255,255,255,0.45)]"
            }`}
          >
            <span className="text-[34px] sm:text-[40px] font-bold text-white lining-nums tabular-nums leading-none tracking-tight">
              {unit.value}
            </span>
            <span
              style={EDITORIAL_SERIF}
              className="text-[15px] sm:text-[17px] italic font-normal text-white/90 mt-1 leading-none"
            >
              {unit.label}
            </span>
          </div>
        ))}
      </div>

      {note && (
        <p className="mt-3.5 text-center text-[12.5px] sm:text-[13.5px] font-light text-white/85 tracking-tight">
          {note}
        </p>
      )}
    </div>
  );
}

/**
 * Animated Repeating Ticker Ribbon: "RM 1500 OFF"
 * Moves smoothly and endlessly to the left at 60fps on GPU
 */
function RepeatedDiscountRibbon({ angle = "-4.72deg", className = "" }) {
  const segment = (
    <div className="inline-flex items-center shrink-0">
      <span className="font-light tracking-[-0.03em] px-3.5 sm:px-4">
        RM1500 OFF
      </span>
      <span className="font-extrabold tracking-[-0.035em] px-3.5 sm:px-4">
        RM 1500 OFF
      </span>
      <span className="font-light tracking-[-0.03em] px-3.5 sm:px-4">
        RM1500 OFF
      </span>
      <span className="font-extrabold tracking-[-0.035em] px-3.5 sm:px-4">
        RM 1500 OFF
      </span>
    </div>
  );

  return (
    <div
      style={{ transform: `rotate(${angle})` }}
      className={`absolute inset-x-[-20%] pointer-events-none select-none z-10 overflow-hidden bg-[#cf0540] py-2 sm:py-2.5 text-white text-[20px] sm:text-[23px] leading-none whitespace-nowrap shadow-[0_4px_16px_rgba(0,0,0,0.7)] ${className}`}
    >
      <div className="animate-marquee-left">
        {segment}
        {segment}
      </div>
    </div>
  );
}

function SoloOrOneEventPackageCard({ pkg }) {
  return (
    <div className="w-full px-3 sm:px-3.5">
      {/* Cream Card with Colored Top Banner */}
      <div className="w-full rounded-[26px] overflow-hidden bg-[#f4f2ed] text-[#1e1e1e] shadow-[0_16px_44px_rgba(0,0,0,0.75)]">
        {/* Top Colored Banner */}
        <div
          style={{ backgroundColor: pkg.bannerBg, color: pkg.bannerTextColor }}
          className="w-full py-2.5 px-4 text-center font-medium text-[11.5px] sm:text-[13px] tracking-tight leading-snug"
        >
          {pkg.topBanner}
        </div>

        {/* Inner Card Body */}
        <div className="relative px-6 sm:px-8 pt-6 pb-6">
          {/* Header Row: Title + Price */}
          <div className="flex items-start justify-between gap-2 mb-5">
            <div>
              <h3
                style={EDITORIAL_SERIF}
                className="text-[28px] sm:text-[32px] leading-[0.98] font-normal text-[#231f20]"
              >
                <span className="italic">{pkg.titleItalic}</span>
                <span>{pkg.titleRegular1}</span>
                {pkg.titleBoldConnector && (
                  <strong className="font-sans font-bold text-[21px] sm:text-[24px]">
                    {pkg.titleBoldConnector}
                  </strong>
                )}
                <br />
                <span>{pkg.titleLine2}</span>
              </h3>
              <p
                style={EDITORIAL_SERIF}
                className="text-[13.5px] sm:text-[15px] italic text-[#231f20]/90 mt-1"
              >
                {pkg.subtitle}
              </p>
            </div>

            <div className="text-right shrink-0 flex flex-col items-end">
              <div
                style={EDITORIAL_SERIF}
                className="text-[30px] sm:text-[35px] leading-none font-normal text-[#231f20] tracking-tight lining-nums"
              >
                {pkg.price}
              </div>
              <div
                style={EDITORIAL_SERIF}
                className="text-[12.5px] sm:text-[14px] text-[#ff3b3b] font-normal mt-0.5 lining-nums"
              >
                {pkg.normalPriceLabel}
                <span className="line-through decoration-[#ff3b3b] decoration-[1.5px]">
                  {pkg.normalPriceValue}
                </span>
              </div>
              <img
                src="./images/sg/s12_money_back_badge.webp"
                alt="100% Money Back Guarantee"
                loading="lazy"
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain mt-2 select-none"
              />
            </div>
          </div>

          {/* PHOTOGRAPHY */}
          <div className="-mt-6 mb-4 pr-14">
            <h4
              style={EDITORIAL_SERIF}
              className="text-[13px] sm:text-[14px] tracking-[0.26em] uppercase text-[#231f20] font-normal mb-2"
            >
              PHOTOGRAPHY
            </h4>
            <ul
              style={EDITORIAL_SERIF}
              className="space-y-0.5 text-[14px] sm:text-[15.5px] leading-[1.28] italic text-[#231f20]"
            >
              {pkg.photographyItems.map((item, idx) => (
                <li key={idx}>
                  {item.boldPrefix && (
                    <strong className="font-bold text-black">
                      {item.boldPrefix}
                    </strong>
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Optional "or" Divider */}
          {pkg.showOrDivider ? (
            <div className="flex items-center gap-3 my-3.5">
              <div className="h-[1px] flex-1 bg-[#231f20]/40" />
              <span
                style={EDITORIAL_SERIF}
                className="text-[13px] italic text-[#231f20]/80"
              >
                or
              </span>
              <div className="h-[1px] flex-1 bg-[#231f20]/40" />
            </div>
          ) : (
            <div className="my-4" />
          )}

          {/* VIDEOGRAPHY */}
          <div className="mb-4">
            <h4
              style={EDITORIAL_SERIF}
              className="text-[13px] sm:text-[14px] tracking-[0.26em] uppercase text-[#231f20] font-normal mb-2"
            >
              VIDEOGRAPHY
            </h4>
            <ul
              style={EDITORIAL_SERIF}
              className="space-y-0.5 text-[14px] sm:text-[15.5px] leading-[1.28] italic text-[#231f20]"
            >
              {pkg.videographyItems.map((item, idx) => (
                <li key={idx}>
                  {item.boldPrefix && (
                    <strong className="font-bold text-black">
                      {item.boldPrefix}
                    </strong>
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FREEGIFT */}
          <div className="pt-2 border-t border-[#231f20]/30 mb-5">
            <h4
              style={EDITORIAL_SERIF}
              className="text-[13px] sm:text-[14px] tracking-[0.26em] uppercase text-[#231f20] font-normal mb-2"
            >
              FREEGIFT :
            </h4>
            <ul
              style={EDITORIAL_SERIF}
              className="space-y-0.5 text-[14px] sm:text-[15.5px] leading-[1.28] italic text-[#231f20]"
            >
              {pkg.freeGiftItems.map((item, idx) => (
                <li key={idx}>
                  {item.boldPrefix && (
                    <strong className="font-bold text-black">
                      {item.boldPrefix}
                    </strong>
                  )}
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {pkg.footnote && (
            <p
              style={EDITORIAL_SERIF}
              className="text-[12.5px] sm:text-[13.5px] italic text-[#231f20]/85 mb-5"
            >
              {pkg.footnote}
            </p>
          )}

          <div className="flex justify-center pt-1">
            <img
              src="./images/my/logo_exclusive_lxfilms_dark.webp"
              alt="exclusive by lxFILMS"
              loading="lazy"
              className="h-5 sm:h-5.5 w-auto object-contain select-none"
            />
          </div>
        </div>
      </div>

      {/* Summary Text Below Card */}
      <div className="px-6 sm:px-7 pt-5 pb-7 text-white space-y-2">
        <p className="text-[20px] sm:text-[22px] font-extrabold tracking-tight leading-tight">
          {pkg.summaryPriceBold}
        </p>
        <p className="text-[20px] sm:text-[22px] font-light tracking-tight leading-tight">
          {pkg.summaryLine1Parts.map((part, i) => (
            <span
              key={i}
              className={`${part.bold ? "font-extrabold" : "font-light"} ${
                part.italic ? "italic" : ""
              }`}
            >
              {part.text}
            </span>
          ))}
        </p>
        <p className="text-[20px] sm:text-[22px] font-light tracking-tight leading-snug whitespace-pre-line">
          {pkg.summaryLine2Parts.map((part, i) => (
            <span
              key={i}
              className={part.bold ? "font-extrabold" : "font-light"}
            >
              {part.text}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [showUrgencyModal, setShowUrgencyModal] = useState(false);
  const timeLeft = useCountdown();
  const waUrl = getWhatsAppUrl();

  useEffect(() => {
    if (!siteConfig.urgencyPopup?.enabled) return;
    const timer = setTimeout(() => {
      setShowUrgencyModal(true);
    }, 450);
    return () => clearTimeout(timer);
  }, []);

  const handleCloseUrgencyModal = () => {
    setShowUrgencyModal(false);
  };

  const {
    urgencyPopup,
    hero,
    coverageIntro,
    deliverables,
    freeGifts,
    albumShowcase,
    promoValue,
    discountOffer,
    mainPackage,
    depositSection,
    rsvpPromo,
    testimonials,
    faqSection,
    soloPackagesSection,
  } = siteConfig;

  const deliverablePositions = [
    { top: "18.2%", left: "12.8%" },
    { top: "19.8%", left: "55.6%" },
    { top: "39.0%", left: "13.8%" },
    { top: "39.0%", left: "58.0%" },
    { top: "58.8%", left: "13.8%" },
    { top: "58.8%", left: "58.0%" },
    { top: "78.5%", left: "13.8%" },
    { top: "78.5%", left: "58.8%" },
  ];

  const freeGiftSlotTops = ["3.0%", "21.8%", "41.2%", "60.2%", "79.6%"];

  return (
    <div
      style={BODY_SANS}
      className="min-h-screen w-full overflow-x-hidden bg-black text-white antialiased selection:bg-white/20 selection:text-white"
    >
      {/* MINIMALIST URGENCY POP-OUT SCREEN MODAL (Matches Original Design, Closes Completely) */}
      {showUrgencyModal && urgencyPopup && (
        <div
          onClick={handleCloseUrgencyModal}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-5 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[376px] rounded-[32px] bg-[#16181b]/95 backdrop-blur-2xl border border-white/55 shadow-[0_28px_80px_rgba(0,0,0,0.95),inset_0_1px_1.5px_rgba(255,255,255,0.55)] px-6 sm:px-7 pt-9 pb-7 text-center overflow-hidden"
          >
            {/* Subtle Top Glass Highlight */}
            <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />

            {/* Minimalist Close Button */}
            <button
              type="button"
              onClick={handleCloseUrgencyModal}
              aria-label="Tutup"
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/[0.07] hover:bg-white/[0.15] border border-white/25 text-white/80 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Editorial Serif Headline (Besar, Bold & Elegant) */}
            <h2
              style={EDITORIAL_SERIF}
              className="text-[42px] sm:text-[46px] leading-[0.95] tracking-[-0.02em] font-normal text-white mt-1 mb-5"
            >
              <span className="italic">{urgencyPopup.headlineItalic}</span>
              <br />
              <span>{urgencyPopup.headlineRegular}</span>
            </h2>

            {/* Editable Urgency Body Text */}
            <p className="text-[14px] sm:text-[15px] leading-[1.38] font-light text-white/90 tracking-[-0.015em] mb-7">
              {urgencyPopup.bodyText}
            </p>

            {/* Primary Minimalist Glassmorphic Pill Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCloseUrgencyModal}
              className="w-full py-4 px-5 rounded-full bg-gradient-to-b from-white/[0.22] to-white/[0.08] hover:from-white/[0.28] hover:to-white/[0.14] border border-white/75 text-white font-extrabold text-[16px] sm:text-[17px] tracking-[-0.02em] shadow-[0_10px_28px_rgba(0,0,0,0.65),inset_0_1px_1.5px_rgba(255,255,255,0.75)] active:scale-[0.99] transition-all flex items-center justify-center"
            >
              <span>{urgencyPopup.buttonText}</span>
            </a>

            {/* Secondary Dismiss Link */}
            <button
              type="button"
              onClick={handleCloseUrgencyModal}
              className="mt-4 text-[12.5px] font-light text-white/65 hover:text-white transition-colors"
            >
              {urgencyPopup.dismissText}
            </button>

            {/* Subtle Brand Signature */}
            <div className="mt-5 pt-3 border-t border-white/10 flex justify-center">
              <img
                src="./images/my/logo_exclusive_lxfilms_white.webp"
                alt="exclusive by lxFILMS"
                className="h-4 w-auto select-none pointer-events-none opacity-85 mix-blend-screen"
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Mobile-First Editorial Canvas */}
      <main className="mx-auto w-full max-w-[440px] bg-black shadow-[0_0_90px_rgba(0,0,0,0.95)] overflow-hidden pb-12">
        {/* ===================================================================
            SLIDE 1: HERO ("Hari Besar, Kenangan Selamanya" + RM 3499)
        =================================================================== */}
        <section className="relative w-full bg-black">
          <img
            src="./images/my/s1_hero_bg.webp"
            alt="Hari Besar, Kenangan Selamanya — RM 3499"
            fetchPriority="high"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Top Glassmorphic Frame Text */}
          <div className="pointer-events-none absolute left-[8%] right-[8%] top-[1.5%] h-[22.8%] flex flex-col items-center justify-center text-center">
            <h1
              style={EDITORIAL_SERIF}
              className="text-[42px] sm:text-[45px] leading-[0.92] tracking-[-0.02em] text-white font-normal"
            >
              <span className="italic">{hero.titleLine1Italic}</span>
              <br />
              <span>{hero.titleLine2Regular}</span>
              <br />
              <span className="italic">{hero.titleLine3Italic}</span>
            </h1>
          </div>

          {/* "now it's only" */}
          <div className="pointer-events-none absolute inset-x-0 top-[61.6%] text-center">
            <p
              style={EDITORIAL_SERIF}
              className="text-[28px] sm:text-[30px] leading-none text-white font-normal"
            >
              {hero.priceLabel}
            </p>
          </div>

          {/* Glassmorphic Pill Price: RM 3499 */}
          <div className="pointer-events-none absolute left-[23%] right-[23%] top-[65.9%] h-[9.6%] flex items-center justify-center">
            <span className="text-[36px] sm:text-[40px] font-extrabold tracking-[-0.03em] text-white leading-none">
              {hero.priceValue}
            </span>
          </div>

          {/* Editable Hero Body Paragraphs */}
          <div className="pointer-events-none absolute inset-x-0 top-[75.8%] px-6 text-center space-y-4">
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.32] font-light text-white/95 whitespace-pre-line tracking-[-0.015em]">
              {hero.para1}
            </p>
            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.32] font-light text-white/95 whitespace-pre-line tracking-[-0.015em]">
              {hero.para2}
            </p>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 2: "Nikah & Sanding — 9 jam full coverage" + 3 Overlapping Photos
        =================================================================== */}
        <section className="relative w-full bg-black pt-9">
          <div className="px-7 pb-4 text-center flex flex-col items-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[32px] sm:text-[35px] leading-[0.98] font-normal text-white tracking-[-0.02em] mb-5"
            >
              {coverageIntro.titleLine1Prefix}
              <span className="italic">{coverageIntro.titleLine1Italic}</span>
              <br />
              {coverageIntro.titleLine2Prefix}
              <span className="italic">{coverageIntro.titleLine2Italic}</span>
              {coverageIntro.titleLine2Suffix}
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.3] font-light text-white/95 whitespace-pre-line mb-4 tracking-[-0.015em]">
              {coverageIntro.para1}
            </p>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.3] font-light text-white/95 whitespace-pre-line tracking-[-0.015em]">
              {coverageIntro.para2}
            </p>
          </div>

          <img
            src="./images/my/s2_photos.webp"
            alt="Nikah & Sanding 9 Jam Full Coverage"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />
        </section>

        {/* ===================================================================
            SLIDE 3: "Apa yang korang akan dapat" (8 Glassmorphic Cards)
        =================================================================== */}
        <section className="relative w-full bg-black">
          <img
            src="./images/my/s3_deliverables_bg.webp"
            alt="Apa yang korang akan dapat"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Heading */}
          <div className="pointer-events-none absolute inset-x-0 top-[3.3%] text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[32px] sm:text-[35px] leading-[0.95] font-normal text-white tracking-[-0.02em]"
            >
              {deliverables.titleLine1Prefix}
              <span className="italic">{deliverables.titleLine1Italic}</span>
              <br />
              {deliverables.titleLine2Prefix}
              <span className="italic">{deliverables.titleLine2Italic}</span>
            </h2>
          </div>

          {/* 8 Editable Card Texts */}
          {deliverables.cards.map((cardSpans, idx) => {
            const pos = deliverablePositions[idx] || { top: "0%", left: "0%" };
            return (
              <div
                key={idx}
                style={{ top: pos.top, left: pos.left }}
                className="pointer-events-none absolute w-[34%] text-[14px] sm:text-[15px] leading-[1.22] text-white tracking-[-0.02em] whitespace-pre-line"
              >
                {cardSpans.map((sp, sIdx) => (
                  <span
                    key={sIdx}
                    className={sp.bold ? "font-bold" : "font-light"}
                  >
                    {sp.text}
                  </span>
                ))}
              </div>
            );
          })}

          {/* Bottom Footnote */}
          <div className="pointer-events-none absolute inset-x-0 bottom-[2.2%] px-4 text-center text-[11px] sm:text-[12px] leading-[1.35] text-white/95 font-light">
            <p>{deliverables.footnoteLine1}</p>
            <p>
              {deliverables.footnoteLine2Prefix}
              <strong className="font-bold">
                {deliverables.footnoteLine2Bold}
              </strong>
            </p>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 4: "Dan semua ni kami bagi PERCUMA:" (1–5 Cards)
        =================================================================== */}
        <section className="relative w-full bg-black pt-8 pb-4">
          <div className="px-6 pb-4 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[32px] sm:text-[35px] leading-[0.98] font-normal text-white tracking-[-0.02em]"
            >
              {freeGifts.titleLine1Prefix}
              <span className="italic">{freeGifts.titleLine1Italic}</span>
              {freeGifts.titleLine1Suffix}
              <br />
              <span className="italic">{freeGifts.titleLine2Italic}</span>
            </h2>
          </div>

          {/* 5 Numbered Cards with Editable Text Overlay */}
          <div className="relative w-full">
            <img
              src="./images/my/s4_freegift_cards_bg.webp"
              alt="5 Free Gifts Percuma"
              loading="lazy"
              className="w-full h-auto block select-none"
            />

            {freeGifts.items.map((item, idx) => (
              <div
                key={idx}
                style={{ top: freeGiftSlotTops[idx] }}
                className="pointer-events-none absolute left-[35.1%] right-[7%] h-[17.4%] flex flex-col justify-center"
              >
                <p className="text-[14.5px] sm:text-[15.5px] leading-[1.18] font-normal text-white whitespace-pre-line tracking-[-0.015em]">
                  {item.title}
                </p>
                <p className="text-[12.5px] sm:text-[13.5px] italic font-light text-white/90 mt-1 leading-none">
                  {item.worth}
                </p>
              </div>
            ))}
          </div>

          {/* "Premium Album & Frame Quality" Heading flowing directly into Slide 5 */}
          <div className="pt-8 pb-1 px-6 text-center">
            <h2
              style={EDITORIAL_SERIF}
              className="text-[32px] sm:text-[36px] leading-[0.98] font-normal text-white tracking-[-0.02em]"
            >
              <span className="italic">{freeGifts.albumTitleLine1Italic}</span>
              {freeGifts.albumTitleLine1Suffix}
              <br />
              {freeGifts.albumTitleLine2Prefix}
              <span className="italic">{freeGifts.albumTitleLine2Italic}</span>
            </h2>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 5: Custom Premium Leather Engraved Album + Classic Frame
        =================================================================== */}
        <section className="relative w-full bg-black">
          <img
            src="./images/my/s5_album_frame.webp"
            alt="Custom Premium Leather Engraved Album & Classic Frame"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Top Right Label */}
          <div className="pointer-events-none absolute top-[2.5%] left-[53.5%] right-[3%]">
            <p className="text-[15px] sm:text-[16.5px] leading-[1.18] font-light text-white whitespace-pre-line tracking-[-0.015em]">
              {albumShowcase.topLabel}
            </p>
          </div>

          {/* Bottom Left Label */}
          <div className="pointer-events-none absolute bottom-[2.6%] left-[3.5%]">
            <p className="text-[15px] sm:text-[16.5px] leading-none font-light text-white tracking-[-0.015em]">
              {albumShowcase.bottomLabel}
            </p>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 6: 5 Album Spreads ("12*8 inch + 20 Pages" & "matte paper + glossy")
        =================================================================== */}
        <section className="relative w-full bg-black">
          <img
            src="./images/my/s6_album_spreads.webp"
            alt="12x8 Inch 20 Pages Matte & Glossy Paper Finishing"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Bottom Left Label */}
          <div className="pointer-events-none absolute top-[85.3%] left-[3.3%]">
            <p className="text-[15px] sm:text-[16.5px] leading-none font-light text-white tracking-[-0.015em]">
              {albumShowcase.leftLabel}
            </p>
          </div>

          {/* Bottom Right Label */}
          <div className="pointer-events-none absolute top-[89.2%] left-[54%] right-[3%] text-center">
            <p className="text-[15px] sm:text-[16.5px] leading-[1.22] font-light text-white whitespace-pre-line tracking-[-0.015em]">
              {albumShowcase.rightLabel}
            </p>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 7: Drone Shots + PROMO Watermark + Total Value RM4999 -> RM3499
        =================================================================== */}
        <section className="relative w-full bg-black">
          <img
            src="./images/my/s7_drone_promo_bg.webp"
            alt="Drone Shots & Total Value RM4999 Promo RM3499"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* "drone shots" label under arrow */}
          <div className="pointer-events-none absolute top-[42.6%] left-[4.5%]">
            <p className="text-[15px] sm:text-[16.5px] leading-none font-light text-white tracking-[-0.015em]">
              {promoValue.arrowLabel}
            </p>
          </div>

          {/* Editable Value Copy Over Giant "PROMO" Watermark */}
          <div className="pointer-events-none absolute top-[52.2%] left-[11.1%] right-[7%] space-y-5">
            <h2 className="text-[22px] sm:text-[24px] leading-[1.15] tracking-[-0.025em] text-white">
              <span className="text-[#a6a6a6] font-bold">
                {promoValue.headlineMuted1}
              </span>
              <strong className="font-extrabold text-white whitespace-pre-line">
                {promoValue.headlineBold1}
              </strong>
              <span className="text-[#b4b4b4] font-extrabold whitespace-pre-line">
                {promoValue.headlineMuted2}
              </span>
              <strong className="font-extrabold text-white">
                {promoValue.headlineBold2}
              </strong>
              <span className="inline-block bg-[#cf0540] text-white font-extrabold px-2 py-0.5">
                {promoValue.priceBadge}
              </span>
            </h2>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.32] font-light text-white/95 whitespace-pre-line tracking-[-0.015em]">
              {promoValue.para1}
            </p>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.32] font-light text-white/95 whitespace-pre-line tracking-[-0.015em]">
              {promoValue.para2Prefix}
              <strong className="font-bold text-white">
                {promoValue.para2Bold}
              </strong>
            </p>

            <p className="text-[14.5px] sm:text-[15.5px] leading-[1.32] font-light text-white/95 whitespace-pre-line tracking-[-0.015em]">
              {promoValue.para3Prefix}
              <strong className="font-bold text-white">
                {promoValue.para3Bold}
              </strong>
              {promoValue.para3Suffix}
            </p>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 8 + SLIDE 9: Connected 13-Photo Masonry Grid + RM 1500 OFF Offer
        =================================================================== */}
        <section id="offer" className="relative w-full bg-black">
          {/* Slide 8 Masonry Grid (10 Photos) */}
          <img
            src="./images/my/s8_masonry_top.webp"
            alt="Wedding Moments Masonry Gallery"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Slide 9 Connected Top 3 Photos + RM1500 OFF Ribbons + RM 3499 Pill */}
          <div className="relative w-full overflow-hidden">
            <img
              src="./images/my/s9_offer_bg.webp"
              alt="RM 1500 OFF — RM 4999 kepada RM 3499"
              loading="lazy"
              draggable={false}
              className="w-full h-auto block select-none pointer-events-none"
            />

            {/* Top Animated Repeating Ticker Ribbon: Moving to the left */}
            <RepeatedDiscountRibbon
              angle="-4.72deg"
              className="top-[25.2%]"
            />

            {/* Bottom Animated Repeating Ticker Ribbon: Moving to the left */}
            <RepeatedDiscountRibbon
              angle="4.91deg"
              className="bottom-[14.8%]"
            />

            {/* Editable 3 Body Paragraphs Below RM 3499 Pill */}
            <div className="pointer-events-none absolute top-[55.5%] left-[13.5%] right-[10%] space-y-4 text-[14.5px] sm:text-[15.5px] leading-[1.28] font-light text-white/95 tracking-[-0.015em]">
              <p className="whitespace-pre-line">
                {discountOffer.para1Prefix}
                <strong className="font-bold text-white">
                  {discountOffer.para1Bold}
                </strong>
                {discountOffer.para1Suffix}
              </p>
              <p className="whitespace-pre-line">{discountOffer.para2}</p>
              <p className="whitespace-pre-line">{discountOffer.para3}</p>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 10: Standard Promo RM 3499 Card (100% Editable) + "PROMO ENDS IN"
        =================================================================== */}
        <section id="package-details" className="bg-black pt-4 pb-2">
          {/* Outer Dark Metallic Glassmorphic Frame */}
          <div className="px-1.5 sm:px-2">
            <div className="w-full rounded-[40px] p-[9px] bg-gradient-to-b from-[#3d4147] via-[#1c1e21] to-[#2c3035] border border-white/60 shadow-[0_14px_45px_rgba(0,0,0,0.9),inset_0_1px_2px_rgba(255,255,255,0.75)]">
              {/* Inner Cream Package Card */}
              <div className="w-full rounded-[31px] overflow-hidden bg-[#f4f2ed] text-[#231f20]">
                {/* Yellow Top Header Banner */}
                <div className="w-full bg-[#e8cf58] text-[#231f20] py-2.5 px-4 text-center font-medium text-[13px] sm:text-[14.5px] tracking-tight">
                  {mainPackage.topBanner}
                </div>

                <div className="px-6 sm:px-8 pt-6 pb-6">
                  {/* Package Title + Offer Price */}
                  <div className="flex items-start justify-between gap-2 mb-5">
                    <div>
                      <h2
                        style={EDITORIAL_SERIF}
                        className="text-[28px] sm:text-[32px] leading-[0.98] font-normal text-[#231f20]"
                      >
                        <span className="italic">{mainPackage.titleItalic}</span>
                        <br />
                        <span>{mainPackage.titleRegular}</span>
                      </h2>
                      <p
                        style={EDITORIAL_SERIF}
                        className="text-[13.5px] sm:text-[15px] italic text-[#231f20]/90 mt-1.5"
                      >
                        {mainPackage.subtitle}
                      </p>
                    </div>

                    <div className="text-right shrink-0 pt-0.5">
                      <div
                        style={EDITORIAL_SERIF}
                        className="text-[31px] sm:text-[36px] leading-none font-normal text-[#231f20] tracking-tight lining-nums"
                      >
                        {mainPackage.offerPrice}
                      </div>
                      <div
                        style={EDITORIAL_SERIF}
                        className="text-[13px] sm:text-[14.5px] text-[#ff3b3b] font-normal mt-1 lining-nums"
                      >
                        {mainPackage.normalPriceLabel}
                        <span className="line-through decoration-[#ff3b3b] decoration-[1.5px]">
                          {mainPackage.normalPriceValue}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PHOTOGRAPHY */}
                  <div className="mb-5">
                    <h3
                      style={EDITORIAL_SERIF}
                      className="text-[13.5px] sm:text-[14.5px] tracking-[0.26em] uppercase text-[#231f20] font-normal mb-2"
                    >
                      PHOTOGRAPHY
                    </h3>
                    <ul
                      style={EDITORIAL_SERIF}
                      className="space-y-0.5 text-[14.5px] sm:text-[16px] leading-[1.3] italic text-[#231f20]"
                    >
                      {mainPackage.photographyItems.map((item, idx) => (
                        <li key={idx}>
                          {item.boldPrefix && (
                            <strong className="font-bold text-black">
                              {item.boldPrefix}
                            </strong>
                          )}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* VIDEOGRAPHY */}
                  <div className="mb-5">
                    <h3
                      style={EDITORIAL_SERIF}
                      className="text-[13.5px] sm:text-[14.5px] tracking-[0.26em] uppercase text-[#231f20] font-normal mb-2"
                    >
                      VIDEOGRAPHY
                    </h3>
                    <ul
                      style={EDITORIAL_SERIF}
                      className="space-y-0.5 text-[14.5px] sm:text-[16px] leading-[1.3] italic text-[#231f20]"
                    >
                      {mainPackage.videographyItems.map((item, idx) => (
                        <li key={idx}>
                          {item.boldPrefix && (
                            <strong className="font-bold text-black">
                              {item.boldPrefix}
                            </strong>
                          )}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* FREEGIFT */}
                  <div className="mb-6">
                    <h3
                      style={EDITORIAL_SERIF}
                      className="text-[13.5px] sm:text-[14.5px] tracking-[0.26em] uppercase text-[#231f20] font-normal mb-2"
                    >
                      FREEGIFT :
                    </h3>
                    <ul
                      style={EDITORIAL_SERIF}
                      className="space-y-0.5 text-[14.5px] sm:text-[16px] leading-[1.3] italic text-[#231f20]"
                    >
                      {mainPackage.freeGiftItems.map((item, idx) => (
                        <li key={idx}>
                          {item.boldPrefix && (
                            <strong className="font-bold text-black">
                              {item.boldPrefix}
                            </strong>
                          )}
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Logo */}
                  <div className="flex justify-center pt-1">
                    <img
                      src="./images/my/logo_exclusive_lxfilms_dark.webp"
                      alt="exclusive by lxFILMS"
                      loading="lazy"
                      className="h-5 sm:h-5.5 w-auto object-contain select-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Glowing 3D Silver "PROMO ENDS IN" Graphic */}
          <div className="w-full pt-3">
            <img
              src="./images/my/s10_promo_ends_in.webp"
              alt="PROMO ENDS IN"
              loading="lazy"
              className="w-full h-auto block select-none"
            />
          </div>
        </section>

        {/* ===================================================================
            SLIDE 11: Live 7-Day Countdown + INI TEMPOH PROMOSI BERAKHIR + Deposit RM 300
        =================================================================== */}
        <section id="booking-promo" className="bg-black pt-1">
          {/* 7-Day Auto-Resetting Countdown Timer (Never shows 00 days) */}
          <div className="pb-5">
            <PromoCountdownSection
              timeLeft={timeLeft}
              note={depositSection.countdownNote}
            />
          </div>

          {/* Crimson Banner ">> INI TEMPOH PROMOSI BERAKHIR <<" + Glassmorphic Deposit Card */}
          <div className="relative w-full">
            <img
              src="./images/my/s11_deposit_bg.webp"
              alt="Ini Tempoh Promosi Berakhir — Deposit Serendah RM 300"
              loading="lazy"
              className="w-full h-auto block select-none"
            />

            {/* Editable Deposit Text Inside Dark Glassmorphic Card */}
            <div className="pointer-events-none absolute top-[26.8%] left-[11.1%] right-[10%]">
              <h2 className="text-[28px] sm:text-[31px] leading-[1.08] font-extrabold tracking-[-0.025em] text-white whitespace-pre-line mb-6">
                {depositSection.heading}
              </h2>

              <div className="space-y-4 text-[15px] sm:text-[16.5px] leading-[1.32] font-light text-white/95 tracking-[-0.015em]">
                <p className="whitespace-pre-line">{depositSection.para1}</p>
                <p className="whitespace-pre-line">{depositSection.para2}</p>
                <p className="pt-1">{depositSection.balanceLabel}</p>

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
            </div>

            {/* Interactive Glassmorphic Button: "Nak Book Segera!" */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-[85.3%] left-[10.8%] right-[12.8%] h-[10.2%] rounded-full flex items-center justify-center text-white font-extrabold text-[23px] sm:text-[26px] tracking-[-0.025em] hover:bg-white/10 active:scale-[0.99] transition-all"
            >
              <span>{depositSection.buttonText}</span>
            </a>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 12: "Khas Untuk Promo Kali Ini Sahaja! FREE E-Kad RSVP" + iPhone
        =================================================================== */}
        <section className="relative w-full bg-black">
          <img
            src="./images/my/s12_rsvp_bg.webp"
            alt="FREE E-Kad RSVP Bernilai RM 99"
            loading="lazy"
            draggable={false}
            className="w-full h-auto block select-none pointer-events-none"
          />

          {/* Top Text */}
          <div className="pointer-events-none absolute inset-x-0 top-[6.2%] text-center px-6">
            <p className="text-[22px] sm:text-[24px] leading-[1.18] font-light text-white whitespace-pre-line tracking-[-0.02em]">
              {rsvpPromo.topText}
            </p>
          </div>

          {/* Text Inside Glassmorphic Pill */}
          <div className="pointer-events-none absolute top-[25.9%] left-[15.5%] right-[15.5%] h-[10.3%] flex flex-col items-center justify-center text-center">
            <p className="text-[22px] sm:text-[24px] leading-[1.12] text-white tracking-[-0.02em]">
              <strong className="font-extrabold">{rsvpPromo.pillBold}</strong>
              <br />
              <span className="font-light">{rsvpPromo.pillRegular}</span>
            </p>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 13 & 14: Feedback & Testimoni + No Worries Ramai Lagi We Deliver Tau!
        =================================================================== */}
        <section className="bg-black">
          {/* Slide 13 */}
          <div className="relative w-full">
            <img
              src="./images/my/s13_feedback_bg.webp"
              alt="Feedback & Testimoni Pelanggan 1"
              loading="lazy"
              draggable={false}
              className="w-full h-auto block select-none pointer-events-none"
            />
            <div className="pointer-events-none absolute top-[2.3%] left-[9%] right-[9%] h-[11.8%] flex flex-col items-center justify-center text-center">
              <h2
                style={EDITORIAL_SERIF}
                className="text-[29px] sm:text-[32px] leading-none font-normal text-white tracking-[-0.015em]"
              >
                {testimonials.title1}
              </h2>
              <p className="text-[14px] sm:text-[15.5px] font-light text-white/95 mt-1 tracking-tight">
                {testimonials.subtitle1}
              </p>
            </div>
          </div>

          {/* Slide 14 */}
          <div className="relative w-full">
            <img
              src="./images/my/s14_feedback_bg.webp"
              alt="Feedback & Testimoni Pelanggan 2"
              loading="lazy"
              draggable={false}
              className="w-full h-auto block select-none pointer-events-none"
            />
            <div className="pointer-events-none absolute top-[5.0%] left-[9%] right-[9%] h-[12.2%] flex flex-col items-center justify-center text-center">
              <h2
                style={EDITORIAL_SERIF}
                className="text-[29px] sm:text-[32px] leading-[0.98] font-normal text-white tracking-[-0.015em]"
              >
                {testimonials.title2Line1Prefix}
                <span className="italic">{testimonials.title2Line1Italic}</span>
                {testimonials.title2Line1Suffix}
                <br />
                {testimonials.title2Line2Prefix}
                <span className="italic">{testimonials.title2Line2Italic}</span>
                {testimonials.title2Line2Suffix}
              </h2>
            </div>
          </div>
        </section>

        {/* ===================================================================
            SLIDE 15, 16, 17: "Frequent Ask Question" (All 7 FAQs Seamlessly Connected)
        =================================================================== */}
        <section id="faq" className="bg-black pt-4 pb-8">
          {/* Top Glassmorphic Pill Header */}
          <div className="relative w-full mb-5">
            <img
              src="./images/my/s15_pill_header.webp"
              alt="Frequent Ask Question"
              loading="lazy"
              className="w-full h-auto block select-none"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2
                style={DISPLAY_SERIF}
                className="text-[29px] sm:text-[33px] leading-[0.96] font-normal text-white tracking-[-0.015em]"
              >
                {faqSection.headerLine1}
                <br />
                {faqSection.headerLine2Prefix}
                <span className="italic">{faqSection.headerLine2Italic}</span>
              </h2>
            </div>
          </div>

          {/* All 7 Editable FAQs */}
          <div className="px-8 sm:px-10 divide-y divide-white/80">
            {faqSection.items.map((faq, idx) => (
              <div key={idx} className="py-6 first:pt-2">
                <h3 className="text-[16px] sm:text-[17.5px] font-bold leading-[1.28] text-white whitespace-pre-line mb-3.5 tracking-[-0.02em]">
                  {faq.question}
                </h3>
                <p className="text-[15px] sm:text-[16px] font-light leading-[1.38] text-white/95 whitespace-pre-line tracking-[-0.015em]">
                  {faq.answer}
                </p>
                {faq.bullets && (
                  <ul className="mt-3.5 pl-5 list-disc space-y-1.5 text-[15px] sm:text-[16px] font-light leading-[1.36] text-white/95 tracking-[-0.015em]">
                    {faq.bullets.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ===================================================================
            SLIDE 18, 19, 20: "Promosi Pakej Solo!" + 3 Editable Cards + Final CTA
        =================================================================== */}
        <section id="solo-packages" className="bg-black pt-2 pb-8">
          {/* Top Glassmorphic Pill Header: "Promosi Pakej Solo!" */}
          <div className="relative w-full mb-5">
            <img
              src="./images/my/s15_pill_header.webp"
              alt="Promosi Pakej Solo!"
              loading="lazy"
              className="w-full h-auto block select-none"
            />
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
              <h2 className="text-[27px] sm:text-[30px] leading-[1.08] font-light text-white tracking-[-0.025em]">
                {soloPackagesSection.pillTitleLine1}
                <br />
                {soloPackagesSection.pillTitleLine2}
              </h2>
            </div>
          </div>

          {/* 3 Editable Solo & One-Event Package Cards */}
          <div className="space-y-4">
            {soloPackagesSection.packages.map((pkg) => (
              <SoloOrOneEventPackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>

          {/* Bottom Glossy Pink/Crimson Button: "Tiada Soalan Nak Book Terus!" */}
          <div className="relative w-full mt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative block w-full group active:scale-[0.99] transition-transform"
            >
              <img
                src="./images/my/s20_pink_cta_btn.webp"
                alt="Tiada Soalan Nak Book Terus!"
                loading="lazy"
                className="w-full h-auto block select-none group-hover:brightness-110 transition-all"
              />
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-[19px] sm:text-[21px] leading-[1.12] font-extrabold text-white tracking-[-0.02em]">
                  {soloPackagesSection.finalCtaLine1}
                  <br />
                  {soloPackagesSection.finalCtaLine2}
                </span>
              </div>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
