import React, { useState, useEffect } from "react";
import { siteConfig, getWhatsAppUrl } from "./config/siteConfig";

const COUNTDOWN_STORAGE_KEY = "lxfilms_sg1999_promo_deadline_v1";
const SEVEN_DAYS_MS = 7 * 24 * 60 * 60 * 1000;

const SERIF_STYLE = {
  fontFamily: "'Cormorant Garamond', Georgia, serif",
  fontVariantNumeric: "lining-nums",
};

function getOrCreateDeadline() {
  try {
    const saved = localStorage.getItem(COUNTDOWN_STORAGE_KEY);
    const now = Date.now();
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed) && parsed > now) {
        return parsed;
      }
    }
    const nextDeadline = now + SEVEN_DAYS_MS;
    localStorage.setItem(COUNTDOWN_STORAGE_KEY, String(nextDeadline));
    return nextDeadline;
  } catch {
    return Date.now() + SEVEN_DAYS_MS;
  }
}

function getRemainingParts(deadline) {
  const diff = Math.max(0, deadline - Date.now());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
}

/**
 * Animated Diagonal Ticker Ribbon (2000 SGD OFF)
 * Matches Slide 12 alternating thin/light and heavy/bold "2000 SGD OFF"
 */
function AnimatedPromoRibbon({ angle = -4.7, className = "" }) {
  const items = Array.from({ length: 12 });
  return (
    <div
      className={`pointer-events-none absolute left-1/2 z-20 w-[135%] -translate-x-1/2 overflow-hidden bg-[#d40038] py-[5px] shadow-[0_6px_18px_rgba(0,0,0,0.45)] ${className}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div className="animate-marquee-left flex items-center whitespace-nowrap">
        {items.map((_, idx) => {
          const isBold = idx % 2 === 1;
          return (
            <span
              key={idx}
              className={`mx-3 inline-block font-sans uppercase text-white ${
                isBold
                  ? "text-[18.5px] font-extrabold tracking-[-0.02em]"
                  : "text-[20px] font-light tracking-[-0.01em] text-white/95"
              }`}
            >
              {siteConfig.priceOffer.ribbonText}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Rich Text Renderer helper for inline bold/italic segments
 */
function RichSegments({ segments }) {
  return (
    <>
      {segments.map((seg, i) => (
        <span
          key={i}
          className={`${
            seg.bold ? "font-bold text-white" : "font-light text-white/95"
          } ${seg.italic ? "italic" : ""}`}
        >
          {seg.text}
        </span>
      ))}
    </>
  );
}

/**
 * Slide 19: Package Details Card (100% matching Slide 19 Canva SVG design)
 */
function PackageCard({ pkg }) {
  return (
    <div className="w-full text-[#151515]">
      {/* Top Full-Width Yellow Banner */}
      <div
        className="w-full py-[8px] text-center text-[13.5px] font-bold tracking-[-0.01em]"
        style={{
          ...SERIF_STYLE,
          backgroundColor: "#fae053",
          color: "#151515",
        }}
      >
        {pkg.topBanner}
      </div>

      {/* Main Cream Card Body */}
      <div className="w-full bg-[#f4f2ed] px-[38px] pt-[18px] pb-[20px]">
        {/* Header Row: Left Title & Subtitle | Right Price & Red Strikethrough NP */}
        <div className="flex items-start justify-between">
          {/* Left: Priority Premium Photo & Video */}
          <div className="text-left">
            <h3
              className="text-[23px] leading-[1.04] tracking-[-0.02em] text-[#181818]"
              style={SERIF_STYLE}
            >
              <span className="font-normal italic">{pkg.titleItalic}</span>
              <span className="font-medium">{pkg.titleRegular1}</span>
              <br />
              <span className="font-medium">{pkg.titleLine2}</span>
            </h3>
            <p
              className="mt-[6px] text-[12px] leading-none italic text-[#222222]"
              style={SERIF_STYLE}
            >
              {pkg.subtitleItalic}
            </p>
          </div>

          {/* Right: SGD 1999 & NP : SGD 3999 */}
          <div className="pt-[2px] text-right">
            <div
              className="text-[28px] leading-none font-normal tracking-[-0.02em] text-[#181818]"
              style={SERIF_STYLE}
            >
              {pkg.price}
            </div>
            <div className="mt-[4px] font-sans text-[10.5px] font-normal tracking-[0.01em] text-[#e05245]">
              <span>{pkg.normalPriceLabel}</span>
              <span className="line-through decoration-[#e05245] decoration-[1.2px]">
                {pkg.normalPriceValue}
              </span>
            </div>
          </div>
        </div>

        {/* Single-Column PHOTOGRAPHY Section */}
        <div className="mt-[18px] text-left">
          <h4
            className="text-[10.5px] font-medium tracking-[0.06em] text-[#181818] uppercase"
            style={SERIF_STYLE}
          >
            {pkg.photographyHeading}
          </h4>
          <ul
            className="mt-[6px] space-y-[1.5px] text-[12px] leading-[1.26] text-[#181818]"
            style={SERIF_STYLE}
          >
            {pkg.photographyItems.map((item, idx) => (
              <li
                key={idx}
                className={
                  item.bold ? "font-bold italic text-[#0d0d0d]" : "font-normal italic text-[#222222]"
                }
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Single-Column VIDEOGRAPHY Section */}
        <div className="mt-[16px] text-left">
          <h4
            className="text-[10.5px] font-medium tracking-[0.06em] text-[#181818] uppercase"
            style={SERIF_STYLE}
          >
            {pkg.videographyHeading}
          </h4>
          <ul
            className="mt-[6px] space-y-[1.5px] text-[12px] leading-[1.26] text-[#181818]"
            style={SERIF_STYLE}
          >
            {pkg.videographyItems.map((item, idx) => (
              <li
                key={idx}
                className={
                  item.bold ? "font-bold italic text-[#0d0d0d]" : "font-normal italic text-[#222222]"
                }
              >
                {item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Single-Column FREEGIFT Section */}
        <div className="mt-[18px] text-left">
          <h5
            className="text-[10.5px] font-medium tracking-[0.06em] text-[#181818] uppercase"
            style={SERIF_STYLE}
          >
            {pkg.freeGiftHeading}
          </h5>
          <ul
            className="mt-[6px] pl-[4px] space-y-[1.5px] text-[12px] leading-[1.26] text-[#181818]"
            style={SERIF_STYLE}
          >
            {pkg.freeGiftItems.map((gift, idx) => (
              <li key={idx} className="italic">
                {gift.boldPrefix && (
                  <span className="font-bold text-[#0d0d0d]">
                    {gift.boldPrefix}
                  </span>
                )}
                <span className="font-normal text-[#222222]">{gift.text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Exclusive by lxFILMS Logo */}
        <div className="mt-[18px] flex justify-center">
          <img
            src="images/sg1999/logo_exclusive_lxfilms_dark.webp"
            alt="exclusive by lxFILMS"
            className="h-[19px] w-auto object-contain opacity-90"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

/**
 * Top Non-Sticky Countdown Bar (Atas Sekali, Non-Sticky)
 */
function TopCountdownBar() {
  const [deadline, setDeadline] = useState(() => getOrCreateDeadline());
  const [timeLeft, setTimeLeft] = useState(() => getRemainingParts(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= deadline) {
        const next = getOrCreateDeadline();
        setDeadline(next);
        setTimeLeft(getRemainingParts(next));
      } else {
        setTimeLeft(getRemainingParts(deadline));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  if (!siteConfig.topCountdownBar?.enabled) return null;

  const { label, daysLabel, hoursLabel, minutesLabel, secondsLabel } =
    siteConfig.topCountdownBar;

  const units = [
    { val: timeLeft.days, lbl: daysLabel },
    { val: timeLeft.hours, lbl: hoursLabel },
    { val: timeLeft.minutes, lbl: minutesLabel },
    { val: timeLeft.seconds, lbl: secondsLabel, active: true },
  ];

  return (
    <div className="relative w-full bg-gradient-to-r from-[#140408] via-[#24060e] to-[#140408] px-3 py-2.5 text-center">
      <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
        <span className="font-sans text-[10.5px] font-bold tracking-[0.06em] text-white/90 uppercase">
          {label}
        </span>
        <div className="flex items-center gap-1">
          {units.map((u, idx) => (
            <React.Fragment key={idx}>
              <div
                className={`flex items-baseline gap-0.5 rounded-[6px] px-1.5 py-0.5 font-sans tabular-nums ${
                  u.active
                    ? "bg-[#ce0037] text-white shadow-[0_0_10px_rgba(206,0,55,0.6)]"
                    : "bg-white/10 text-white"
                }`}
              >
                <span className="text-[12px] font-extrabold leading-none">
                  {u.val}
                </span>
                <span className="text-[8.5px] font-medium text-white/80 uppercase">
                  {u.lbl}
                </span>
              </div>
              {idx < units.length - 1 && (
                <span className="text-[10px] font-bold text-white/40">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Spinning / Counting Number Reel Animation that rolls down and lands on targetNumber (5)
 */
function SpinningSlotNumber({ target = 5 }) {
  // Sequence of numbers that spin/roll vertically before landing on 5
  const reelNumbers = [
    24,
    21,
    18,
    15,
    13,
    11,
    10,
    9,
    8,
    7,
    6,
    target,
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    let step = 0;
    const totalSteps = reelNumbers.length - 1;
    let timeoutId;

    const runStep = () => {
      if (step < totalSteps) {
        step += 1;
        setCurrentIndex(step);
        // Gradually slow down like a real spinning wheel / odometer counting down to 5
        const delay = 55 + Math.pow(step / totalSteps, 2.2) * 210;
        timeoutId = setTimeout(runStep, delay);
      } else {
        setSettled(true);
      }
    };

    timeoutId = setTimeout(runStep, 180);
    return () => clearTimeout(timeoutId);
  }, [target]);

  return (
    <div className="my-3 flex items-center justify-center">
      <div
        className={`relative flex h-[88px] w-[88px] items-center justify-center overflow-hidden rounded-[22px] border transition-all duration-300 ${
          settled
            ? "scale-105 border-[#ff4d79]/80 bg-gradient-to-b from-[#ce0037] to-[#820022] shadow-[0_0_32px_rgba(206,0,55,0.65),inset_0_1px_2px_rgba(255,255,255,0.4)]"
            : "border-white/30 bg-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"
        }`}
      >
        {/* Vertical Odometer Drum Strip */}
        <div
          className="absolute inset-x-0 top-0 flex flex-col items-center transition-transform duration-150 ease-out"
          style={{
            transform: `translateY(-${currentIndex * 88}px)`,
          }}
        >
          {reelNumbers.map((num, idx) => (
            <div
              key={idx}
              className="flex h-[88px] w-full items-center justify-center font-sans text-[48px] leading-none font-extrabold tracking-tight text-white tabular-nums"
            >
              {num}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Slide 20 Top: Live 7-Day Countdown Section
 */
function PromoCountdownSection() {
  const [deadline, setDeadline] = useState(() => getOrCreateDeadline());
  const [timeLeft, setTimeLeft] = useState(() => getRemainingParts(deadline));

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now >= deadline) {
        const next = getOrCreateDeadline();
        setDeadline(next);
        setTimeLeft(getRemainingParts(next));
      } else {
        setTimeLeft(getRemainingParts(deadline));
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [deadline]);

  const boxes = [
    { value: timeLeft.days, label: "Hari", highlight: false },
    { value: timeLeft.hours, label: "Jam", highlight: false },
    { value: timeLeft.minutes, label: "Minit", highlight: false },
    { value: timeLeft.seconds, label: "Saat", highlight: true },
  ];

  return (
    <section className="relative w-full bg-[#000000] px-5 pt-6 pb-8 text-center">
      {/* 4 Glassmorphic Countdown Boxes */}
      <div className="mx-auto grid max-w-[356px] grid-cols-4 gap-2.5">
        {boxes.map((b, idx) => (
          <div
            key={idx}
            className={`relative flex flex-col items-center justify-center rounded-[16px] border py-3 backdrop-blur-md transition-all ${
              b.highlight
                ? "border-[#ff4d79]/80 bg-gradient-to-b from-[#d40038] to-[#900024] shadow-[0_0_24px_rgba(212,0,56,0.55)]"
                : "border-white/25 bg-gradient-to-b from-white/[0.15] to-white/[0.05] shadow-[inset_0_1px_1px_rgba(255,255,255,0.25),0_8px_20px_rgba(0,0,0,0.5)]"
            }`}
          >
            <span className="font-sans text-[28px] leading-none font-bold tracking-tight text-white tabular-nums">
              {b.value}
            </span>
            <span className="mt-1.5 font-sans text-[10px] font-medium tracking-[0.08em] text-white/85 uppercase">
              {b.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function App() {
  const [showUrgencyModal, setShowUrgencyModal] = useState(
    () => siteConfig.urgencyPopup?.enabled ?? false
  );
  const waUrl = getWhatsAppUrl();

  // Exact card text positions for Slide 6 (8 Glassmorphic Deliverable Cards)
  const deliverablePositions = [
    { top: "18.8%", left: "15.8%", width: "28%" },
    { top: "19.8%", left: "56.5%", width: "31%" },
    { top: "39.7%", left: "17.2%", width: "28%" },
    { top: "39.7%", left: "59.9%", width: "28%" },
    { top: "59.3%", left: "17.2%", width: "30%" },
    { top: "59.5%", left: "59.9%", width: "28%" },
    { top: "79.2%", left: "17.2%", width: "28%" },
    { top: "79.2%", left: "60.4%", width: "28%" },
  ];

  // Exact positions for Slide 7 (5 Free Gifts)
  const freeGiftTopPositions = ["20.6%", "31.8%", "43.4%", "54.6%", "66.2%"];

  return (
    <div className="min-h-screen w-full bg-[#000000] text-white selection:bg-[#f8da45] selection:text-black">
      {/* Pop-Out Urgency Modal (Tinggal 5 Slot Sahaja Lagi Available + Animasi Pusing ke 5) */}
      {showUrgencyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-md">
          <div className="relative w-full max-w-[350px] overflow-hidden rounded-[24px] border border-white/20 bg-gradient-to-b from-[#1a1c20] to-[#0d0e11] px-6 pt-7 pb-6 text-center shadow-[0_24px_70px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.25)]">
            <button
              type="button"
              onClick={() => setShowUrgencyModal(false)}
              aria-label="Tutup"
              className="absolute top-3.5 right-3.5 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition hover:bg-white/15 hover:text-white"
            >
              ✕
            </button>

            {/* Small Badge Label */}
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#ce0037]/50 bg-[#ce0037]/15 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#ff3366]" />
              <span className="font-sans text-[10px] font-bold tracking-[0.12em] text-[#ff809f] uppercase">
                {siteConfig.urgencyPopup.topLabel}
              </span>
            </div>

            {/* "Tinggal" */}
            <p
              className="mt-3 text-[28px] leading-none font-semibold italic tracking-[-0.03em] text-white/95"
              style={SERIF_STYLE}
            >
              {siteConfig.urgencyPopup.prefixText}
            </p>

            {/* Spinning / Counting Number 5 */}
            <SpinningSlotNumber
              target={siteConfig.urgencyPopup.targetNumber || 5}
            />

            {/* "Slot Sahaja Lagi Available!" */}
            <h2 className="font-sans text-[20px] leading-[1.2] font-bold tracking-[-0.02em] text-white">
              <span className="text-[#ff4d79]">
                {siteConfig.urgencyPopup.slotWord}{" "}
              </span>
              <span>{siteConfig.urgencyPopup.suffixText}</span>
            </h2>

            <p className="mt-2.5 font-sans text-[13px] leading-[1.4] font-light text-white/80">
              {siteConfig.urgencyPopup.subText}
            </p>

            {/* Book Now Button */}
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex w-full items-center justify-center rounded-full border border-white/35 bg-[#ce0037] py-3.5 font-sans text-[16px] font-bold tracking-[-0.01em] text-white shadow-[0_8px_24px_rgba(206,0,55,0.5)] transition-transform hover:brightness-110 active:scale-[0.98]"
            >
              {siteConfig.urgencyPopup.buttonText}
            </a>

            <button
              type="button"
              onClick={() => setShowUrgencyModal(false)}
              className="mt-3 inline-block font-sans text-[12px] font-light text-white/55 underline underline-offset-4 transition hover:text-white/90"
            >
              {siteConfig.urgencyPopup.dismissText}
            </button>
          </div>
        </div>
      )}

      {/* Mobile-First Canvas Container (max-w-[430px] centered, seamless black background) */}
      <main className="mx-auto w-full max-w-[430px] overflow-hidden bg-[#000000]">
        {/* TOP NON-STICKY COUNTDOWN BAR */}
        <TopCountdownBar />
        {/* =====================================================================
            SLIDE 1: HERO SECTION (Exclusive 9 Hours Wedding Photo & Video Coverage — 1999 SGD)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s1_hero_bg.webp"
            alt="Exclusive 9 Hours Wedding Photo & Video Coverage"
            className="block h-auto w-full select-none"
            fetchpriority="high"
          />

          {/* Top 4-Line Editorial Serif Title */}
          <div className="absolute inset-x-0 top-[4.8%] flex flex-col items-center text-center">
            <h1
              className="text-[35px] leading-[0.92] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.hero.titleLine1Regular}
              </span>
              <span className="font-semibold italic">
                {siteConfig.hero.titleLine1Italic}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.hero.titleLine2Regular}
              </span>
              <br />
              <span className="font-semibold italic">
                {siteConfig.hero.titleLine3Italic}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.hero.titleLine4Regular}
              </span>
            </h1>
          </div>

          {/* "no hidden charge, no extra charge" in serif right above the 3D Glass Pill */}
          <div className="absolute inset-x-0 top-[60.3%] text-center">
            <p
              className="text-[16px] leading-[1.05] font-medium tracking-[-0.03em] whitespace-pre-line text-white"
              style={SERIF_STYLE}
            >
              {siteConfig.hero.priceLabel}
            </p>
          </div>

          {/* "1999 SGD" centered inside the 3D Glassmorphic Pill */}
          <div className="absolute inset-x-0 top-[64.7%] flex h-[8.4%] items-center justify-center">
            <span className="font-sans text-[38px] font-black leading-none tracking-[-0.03em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
              {siteConfig.hero.priceValue}
            </span>
          </div>

          {/* Bottom 2 Emotional Paragraphs */}
          <div className="absolute top-[75.3%] right-[6%] left-[6%] space-y-[15px] text-center font-sans text-[13.5px] leading-[1.35] font-light tracking-[-0.015em] text-white/95">
            <p className="whitespace-pre-line">{siteConfig.hero.para1}</p>
            <p className="whitespace-pre-line">{siteConfig.hero.para2}</p>
          </div>

          {/* Bottom "exclusive by" in italic serif next to lxFILMS logo */}
          <span
            className="absolute bottom-[2.6%] left-[35.5%] text-[14.5px] font-normal italic tracking-[-0.02em] text-white/95"
            style={SERIF_STYLE}
          >
            {siteConfig.hero.exclusiveBy}
          </span>
        </section>

        {/* =====================================================================
            SLIDE 2: PREMIUM FILMS CLASSIC VIBES + 6-PHOTO MOSAIC
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s2_classic_bg.webp"
            alt="Premium Films Classic Vibes"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Title (2 upright lines) */}
          <div className="absolute inset-x-0 top-[6.2%] px-4 text-center">
            <h2
              className="text-[35px] leading-[0.94] font-semibold tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span>{siteConfig.classicVibes.titleLine1}</span>
              <br />
              <span>{siteConfig.classicVibes.titleLine2}</span>
            </h2>
          </div>

          {/* Body Paragraph */}
          <div className="absolute top-[18.6%] right-[6%] left-[6%] text-center font-sans text-[14px] leading-[1.32] font-light tracking-[-0.015em] text-white/95">
            <p className="whitespace-pre-line">{siteConfig.classicVibes.body}</p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 3: TRUSTED BY 100+ COUPLES + 4 WIDESCREEN STILLS
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s3_trusted_bg.webp"
            alt="Trusted by 100+ Couples"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Title */}
          <div className="absolute inset-x-0 top-[5.2%] px-4 text-center">
            <h2
              className="text-[34px] leading-[0.96] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.trustedCouples.titleRegular}
              </span>
              <span className="font-semibold italic">
                {siteConfig.trustedCouples.titleItalic}
              </span>
            </h2>
          </div>

          {/* Body Paragraph */}
          <div className="absolute top-[12.2%] right-[6%] left-[6%] text-center font-sans text-[14px] leading-[1.32] font-light tracking-[-0.015em] text-white/95">
            <p className="whitespace-pre-line">
              {siteConfig.trustedCouples.body}
            </p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 4: WHY CHOOSE US INSTEAD OF OTHERS? + 100% MONEY BACK GUARANTEE
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s4_why_bg.webp"
            alt="Why Choose Us Instead of Others"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Title */}
          <div className="absolute inset-x-0 top-[6.6%] px-4 text-center">
            <h2
              className="text-[34px] leading-[0.96] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.whyChooseUs.titleLine1Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.whyChooseUs.titleLine1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.whyChooseUs.titleLine1Suffix}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.whyChooseUs.titleLine2Regular}
              </span>
            </h2>
          </div>

          {/* 5 Checklist Items next to 3D Green Checkmarks */}
          {siteConfig.whyChooseUs.items.map((item, idx) => (
            <div
              key={idx}
              className="absolute right-[3%] left-[25.8%] text-left font-sans text-[13.5px] leading-[1.24] tracking-[-0.015em] whitespace-pre-line text-white"
              style={{ top: item.top }}
            >
              <RichSegments segments={item.segments} />
            </div>
          ))}

          {/* Center Reassurance Paragraph */}
          <div className="absolute top-[70.0%] right-[6%] left-[6%] text-center font-sans text-[13.8px] leading-[1.28] tracking-[-0.015em] whitespace-pre-line text-white">
            <span className="font-light text-white/95">
              {siteConfig.whyChooseUs.reassurancePrefix}
            </span>
            <span className="font-bold text-white">
              {siteConfig.whyChooseUs.reassuranceBold}
            </span>
          </div>

          {/* Bold Guarantee Text next to Gold Seal Badge */}
          <div className="absolute top-[80.6%] right-[4%] left-[39.4%] text-left font-sans text-[12.5px] leading-[1.24] font-bold tracking-[-0.015em] text-white">
            <p className="whitespace-pre-line">
              {siteConfig.whyChooseUs.guaranteeBold}
            </p>
          </div>

          {/* Bottom Footnote */}
          <div className="absolute inset-x-0 top-[93.1%] text-center font-sans text-[8.2px] font-light tracking-[-0.01em] text-white/85">
            <p>{siteConfig.whyChooseUs.footnote}</p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 5: OUR APPROACH + COUPLE BY CLASSIC CAR
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s5_approach_bg.webp"
            alt="Our Approach"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Title */}
          <div className="absolute inset-x-0 top-[4.8%] px-4 text-center">
            <h2
              className="text-[36px] leading-[0.95] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold italic">
                {siteConfig.ourApproach.titleItalic}
              </span>
              <span className="font-semibold">
                {siteConfig.ourApproach.titleRegular}
              </span>
            </h2>
          </div>

          {/* Two Paragraphs */}
          <div className="absolute top-[12.4%] right-[6%] left-[6%] space-y-[16px] text-center font-sans text-[14px] leading-[1.3] font-light tracking-[-0.015em] text-white/95">
            <p className="whitespace-pre-line">
              {siteConfig.ourApproach.para1}
            </p>
            <p className="whitespace-pre-line">
              {siteConfig.ourApproach.para2}
            </p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 6: APA YANG KORANG AKAN DAPAT (8 GLASSMORPHIC CARDS)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s6_deliverables_bg.webp"
            alt="Apa yang korang akan dapat"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Section Heading */}
          <div className="absolute inset-x-0 top-[2.8%] text-center">
            <h2
              className="text-[34px] leading-[0.94] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.deliverables.titleLine1Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.deliverables.titleLine1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.deliverables.titleLine1Suffix}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.deliverables.titleLine2Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.deliverables.titleLine2Italic}
              </span>
            </h2>
          </div>

          {/* 8 Deliverable Card Text Overlays */}
          {siteConfig.deliverables.cards.map((segments, idx) => {
            const pos = deliverablePositions[idx];
            return (
              <div
                key={idx}
                className="absolute text-left font-sans text-[13px] leading-[1.22] tracking-[-0.015em] whitespace-pre-line text-white"
                style={{ top: pos.top, left: pos.left, width: pos.width }}
              >
                <RichSegments segments={segments} />
              </div>
            );
          })}

          {/* Bottom Footnotes */}
          <div className="absolute inset-x-0 bottom-[2.6%] space-y-[2px] text-center font-sans text-[11px] leading-[1.28] tracking-[-0.015em] text-white/95">
            <p className="font-light">
              {siteConfig.deliverables.footnoteLine1}
            </p>
            <p>
              <span className="font-light">
                {siteConfig.deliverables.footnoteLine2Prefix}
              </span>
              <span className="font-bold">
                {siteConfig.deliverables.footnoteLine2Bold}
              </span>
            </p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 7: IF YOU BOOK TODAY! SEMUA NI FREE JE (5 FREE GIFTS)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s7_freegifts_bg.webp"
            alt="If You Book Today Semua ni FREE Je"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Heading */}
          <div className="absolute inset-x-0 top-[5.2%] text-center">
            <h2
              className="text-[34px] leading-[0.96] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.freeGifts.titleLine1Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.freeGifts.titleLine1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.freeGifts.titleLine1Suffix}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.freeGifts.titleLine2Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.freeGifts.titleLine2Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.freeGifts.titleLine2Suffix}
              </span>
            </h2>
          </div>

          {/* 5 Free Gift Card Text Overlays */}
          {siteConfig.freeGifts.items.map((item, idx) => (
            <div
              key={idx}
              className="absolute right-[5%] left-[35.1%] flex flex-col justify-center text-left font-sans tracking-[-0.015em]"
              style={{ top: freeGiftTopPositions[idx] }}
            >
              <p className="text-[13.8px] leading-[1.2] font-normal text-white">
                {item.line1}
              </p>
              <p className="text-[13.8px] leading-[1.2] font-normal text-white">
                {item.line2}
              </p>
              <p className="mt-[3px] text-[11.5px] leading-[1.2] font-light italic text-white/90">
                {item.worth}
              </p>
            </div>
          ))}
        </section>

        {/* =====================================================================
            SLIDE 8: ALBUM & FRAME SHOWCASE 1
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s8_album_frame_bg.webp"
            alt="Custom Premium Leather Engraved Album and Frame"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top-right annotation */}
          <div className="absolute top-[2.9%] left-[52.1%] text-left font-sans text-[14px] leading-[1.25] font-light tracking-[-0.015em] whitespace-pre-line text-white/95">
            {siteConfig.albumShowcase.topLabel}
          </div>

          {/* Bottom-left annotation */}
          <div className="absolute bottom-[2.6%] left-[3.5%] text-left font-sans text-[14px] leading-[1.25] font-light tracking-[-0.015em] text-white/95">
            {siteConfig.albumShowcase.bottomLabel}
          </div>
        </section>

        {/* =====================================================================
            SLIDE 9: ALBUM SPREADS SHOWCASE 2
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s9_album_spreads_bg.webp"
            alt="12x8 Inch 20 Pages Matte & Glossy Finishing"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Bottom-left annotation */}
          <div className="absolute top-[85.2%] left-[3.2%] text-left font-sans text-[13.5px] leading-[1.25] font-light tracking-[-0.015em] text-white/95">
            {siteConfig.albumShowcase.leftLabel}
          </div>

          {/* Bottom-right annotation */}
          <div className="absolute top-[89.2%] right-[3%] left-[55.5%] text-center font-sans text-[13.5px] leading-[1.28] font-light tracking-[-0.015em] whitespace-pre-line text-white/95">
            {siteConfig.albumShowcase.rightLabel}
          </div>
        </section>

        {/* =====================================================================
            SLIDE 10: DRONE SHOTS & PROMO VALUE (3499 SGD -> 1999 SGD)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s10_drone_promo_bg.webp"
            alt="Drone Shots and Total Value Promo"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* "drone shots" label next to arrow */}
          <div className="absolute top-[42.4%] left-[4.5%] font-sans text-[13.5px] font-light tracking-[-0.015em] text-white/95">
            {siteConfig.promoValue.arrowLabel}
          </div>

          {/* Promo Value Copy Overlaid on PROMO Watermark */}
          <div className="absolute top-[52.4%] right-[6%] left-[11.2%] space-y-[20px] text-left font-sans">
            {/* Headline with Crimson Red Highlight Box on 1999 SGD. */}
            <p className="text-[20.5px] leading-[1.18] tracking-[-0.025em] whitespace-pre-line">
              <span className="font-bold text-white/65">
                {siteConfig.promoValue.headlineMuted1}
              </span>
              <span className="font-bold text-white">
                {siteConfig.promoValue.headlineBold1}
              </span>
              <span className="font-bold text-white/65">
                {siteConfig.promoValue.headlineMuted2}
              </span>
              <span className="font-bold text-white">
                {siteConfig.promoValue.headlineBold2}
              </span>
              <span className="inline-block bg-[#ce0037] px-[5px] py-[1px] font-bold text-white">
                {siteConfig.promoValue.headlineHighlight}
              </span>
            </p>

            {/* Paragraph 1 */}
            <p className="text-[13.8px] leading-[1.32] font-light tracking-[-0.015em] whitespace-pre-line text-white/80">
              {siteConfig.promoValue.para1}
            </p>

            {/* Paragraph 2 */}
            <p className="text-[13.8px] leading-[1.32] tracking-[-0.015em] whitespace-pre-line">
              <span className="font-light text-white/80">
                {siteConfig.promoValue.para2Muted}
              </span>
              <span className="font-bold text-white">
                {siteConfig.promoValue.para2Bold}
              </span>
            </p>

            {/* Paragraph 3 */}
            <p className="text-[13.8px] leading-[1.32] tracking-[-0.015em] whitespace-pre-line">
              <span className="font-light text-white/80">
                {siteConfig.promoValue.para3Prefix}
              </span>
              <span className="font-bold text-white">
                {siteConfig.promoValue.para3Bold}
              </span>
              <span className="font-light text-white/80">
                {siteConfig.promoValue.para3Suffix}
              </span>
            </p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 11: 10-PHOTO MASONRY GRID
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s11_masonry_top.webp"
            alt="Wedding Portfolio Masonry Grid"
            className="block h-auto w-full select-none"
            loading="lazy"
          />
        </section>

        {/* =====================================================================
            SLIDE 12: 3999 SGD -> 1999 SGD OFFER + ANIMATED TICKER RIBBONS
           ===================================================================== */}
        <section className="relative w-full overflow-hidden">
          <img
            src="images/sg1999/s12_offer_bg.webp"
            alt="Promo 1999 SGD Offer"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Animated Diagonal Ribbon */}
          <AnimatedPromoRibbon angle={-4.72} className="top-[25.0%]" />

          {/* Left-aligned Description Text below 1999 SGD Pill */}
          <div className="absolute top-[51.2%] right-[8%] left-[13.2%] space-y-[18px] text-left font-sans text-[14.5px] leading-[1.28] font-normal tracking-[-0.015em] text-white/95">
            <p className="whitespace-pre-line">
              <span>{siteConfig.priceOffer.para1Prefix}</span>
              <span className="font-bold text-white">
                {siteConfig.priceOffer.para1Bold}
              </span>
              <span>{siteConfig.priceOffer.para1Suffix}</span>
            </p>
            <p className="whitespace-pre-line">{siteConfig.priceOffer.para2}</p>
            <p className="whitespace-pre-line">{siteConfig.priceOffer.para3}</p>
          </div>

          {/* Bottom Animated Diagonal Ribbon */}
          <AnimatedPromoRibbon angle={4.91} className="bottom-[14.8%]" />
        </section>

        {/* =====================================================================
            SLIDE 13: MAKE WEDDING FINE ART AND FUN (COLLAGE)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s13_fine_art_fun.webp"
            alt="Make Wedding Fine Art And Fun"
            className="block h-auto w-full select-none"
            loading="lazy"
          />
        </section>

        {/* =====================================================================
            SLIDE 14: GOLD BAROQUE FRAME SHOWCASE
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s14_gold_frame_bg.webp"
            alt="Mastered Through Years of Shooting in Singapore Gold Frame"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top 4-Line Editorial Quote */}
          <div className="absolute inset-x-0 top-[4.5%] px-4 text-center">
            <h2
              className="text-[28px] leading-[0.98] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold italic">
                {siteConfig.emotionalQuote.line1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.emotionalQuote.line1Regular}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.emotionalQuote.line2Regular}
              </span>
              <span className="font-semibold italic">
                {siteConfig.emotionalQuote.line2Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.emotionalQuote.line2Suffix}
              </span>
              <br />
              <span className="font-semibold italic">
                {siteConfig.emotionalQuote.line3Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.emotionalQuote.line3Regular}
              </span>
              <br />
              <span className="font-semibold italic">
                {siteConfig.emotionalQuote.line4Italic}
              </span>
            </h2>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 15: SILVER OVAL FRAME & 20-PHOTO GRID
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s15_silver_frame_grid.webp"
            alt="Silver Frame and 20 Photo Portfolio Grid"
            className="block h-auto w-full select-none"
            loading="lazy"
          />
        </section>

        {/* =====================================================================
            SLIDE 16: WHERE OUR STORIES HAVE UNFOLDED (9 SINGAPORE VENUES)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s16_venues_bg.webp"
            alt="Where Our Stories Have Unfolded Singapore Venues"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Heading */}
          <div className="absolute inset-x-0 top-[4.5%] px-4 text-center">
            <h2
              className="text-[31px] leading-[0.96] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold italic">
                {siteConfig.venues.titleLine1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.venues.titleLine1Regular}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.venues.titleLine2Regular}
              </span>
            </h2>
          </div>

          {/* Row 1 Captions */}
          <div className="absolute inset-x-0 top-[31.4%] grid grid-cols-3 px-[4.4%] text-left font-sans text-[11.2px] font-light tracking-[-0.015em] text-white/95">
            {siteConfig.venues.row1.map((name, idx) => (
              <span
                key={idx}
                className={idx === 1 ? "pl-[6%]" : idx === 2 ? "pl-[11%]" : ""}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Row 2 Captions */}
          <div className="absolute inset-x-0 top-[57.4%] grid grid-cols-3 px-[4.4%] text-left font-sans text-[11.2px] font-light tracking-[-0.015em] text-white/95">
            {siteConfig.venues.row2.map((name, idx) => (
              <span
                key={idx}
                className={idx === 1 ? "pl-[6%]" : idx === 2 ? "pl-[11%]" : ""}
              >
                {name}
              </span>
            ))}
          </div>

          {/* Row 3 Captions */}
          <div className="absolute inset-x-0 top-[83.8%] grid grid-cols-3 px-[4.4%] text-left font-sans text-[11.2px] font-light tracking-[-0.015em] text-white/95">
            {siteConfig.venues.row3.map((name, idx) => (
              <span
                key={idx}
                className={idx === 1 ? "pl-[6%]" : idx === 2 ? "pl-[11%]" : ""}
              >
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* =====================================================================
            SLIDE 17: 5 CINEMATIC WIDESCREEN STILLS
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s17_cinematic_stills.webp"
            alt="Cinematic Widescreen Stills"
            className="block h-auto w-full select-none"
            loading="lazy"
          />
        </section>

        {/* =====================================================================
            SLIDE 18: WHERE MAGIC BREATHES A MASTERPIECE (5 FILM POLAROIDS)
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s18_polaroids_bg.webp"
            alt="Where Magic Breathes a Masterpiece Polaroids"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Quote */}
          <div className="absolute inset-x-0 top-[3.5%] px-4 text-center">
            <h2
              className="text-[31px] leading-[0.96] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.polaroidsQuote.line1Regular}
              </span>
              <span className="font-semibold italic">
                {siteConfig.polaroidsQuote.line1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.polaroidsQuote.line1Suffix}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.polaroidsQuote.line2Regular}
              </span>
            </h2>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 19: PACKAGE DETAILS + PROMO ENDS IN GRAPHIC
           ===================================================================== */}
        <section id="pakej" className="relative w-full bg-[#120b07]">
          {/* Top Textured Header with "Package Details" */}
          <div className="relative w-full">
            <img
              src="images/sg1999/s19_top_bg.webp"
              alt="Package Details Header"
              className="block h-auto w-full select-none"
              loading="lazy"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h2
                className="text-[33px] leading-none tracking-[-0.04em] text-white"
                style={SERIF_STYLE}
              >
                <span className="font-semibold italic">
                  {siteConfig.packageDetails.sectionTitleItalic}
                </span>
                <span className="font-semibold">
                  {siteConfig.packageDetails.sectionTitleRegular}
                </span>
              </h2>
            </div>
          </div>

          {/* Editable HTML Package Details Card */}
          <PackageCard pkg={siteConfig.packageDetails} />

          {/* Bottom "PROMO ENDS IN" Glowing 3D Metallic Graphic */}
          <div className="relative w-full bg-[#090909]">
            <img
              src="images/sg1999/s19_promo_ends_in.webp"
              alt="Promo Ends In"
              className="block h-auto w-full select-none"
              loading="lazy"
            />
          </div>
        </section>

        {/* =====================================================================
            SLIDE 20: LIVE COUNTDOWN + DEPOSIT SERENDAH 300 SGD + CTA BUTTON
           ===================================================================== */}
        <PromoCountdownSection />

        <section className="relative w-full bg-[#090909]">
          <img
            src="images/sg1999/s20_deposit_bg.webp"
            alt="Deposit Serendah 300 SGD"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Crimson Banner Text ("ini tempoh promosi akan berakhir!") with Looping Upward Arrows */}
          <div className="absolute inset-x-0 top-[2.2%] flex h-[12.2%] items-center justify-center gap-3.5 px-4 text-center font-sans text-[21px] leading-[1.1] font-bold tracking-[-0.025em] text-white">
            {/* Left Looping Upward Arrow */}
            <div className="relative flex h-11 w-7 flex-col items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-arrow-up-loop h-6 w-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </div>

            <p>
              <span>{siteConfig.depositSection.bannerLine1}</span>
              <br />
              <span>{siteConfig.depositSection.bannerLine2}</span>
            </p>

            {/* Right Looping Upward Arrow */}
            <div className="relative flex h-11 w-7 flex-col items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-arrow-up-loop h-6 w-6 text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
              >
                <path d="M12 19V5" />
                <path d="m5 12 7-7 7 7" />
              </svg>
            </div>
          </div>

          {/* 3D Dark Glass Card Content ("Deposit Serendah 300 SGD") */}
          <div className="absolute top-[24.2%] right-[10%] left-[11.2%] flex flex-col items-start text-left">
            <h2 className="font-sans text-[24px] leading-[1.12] font-bold tracking-[-0.025em] text-white">
              <span>{siteConfig.depositSection.titleLine1}</span>
              <br />
              <span>{siteConfig.depositSection.titleLine2}</span>
            </h2>

            <div className="mt-[22px] space-y-[18px] font-sans text-[14.5px] leading-[1.32] font-light tracking-[-0.015em] text-white/95">
              <p className="whitespace-pre-line">
                {siteConfig.depositSection.para1}
              </p>

              <p className="whitespace-pre-line">
                {siteConfig.depositSection.para2}
              </p>

              <p className="pt-[4px] whitespace-pre-line">
                {siteConfig.depositSection.para3Label}
              </p>

              <p className="whitespace-pre-line">
                <span className="font-bold text-white">
                  {siteConfig.depositSection.paymentLine1Bold1}
                </span>
                <span>{siteConfig.depositSection.paymentLine1Regular}</span>
                <span className="font-bold text-white">
                  {siteConfig.depositSection.paymentLine1Bold2}
                </span>
                <br />
                <span className="font-bold text-white">
                  {siteConfig.depositSection.paymentLine2Bold1}
                </span>
                <span>{siteConfig.depositSection.paymentLine2Regular1}</span>
                <span className="font-bold text-white">
                  {siteConfig.depositSection.paymentLine2Bold2}
                </span>
                <span>{siteConfig.depositSection.paymentLine2Regular2}</span>
                <span className="font-bold text-white">
                  {siteConfig.depositSection.paymentLine2Bold3}
                </span>
              </p>
            </div>
          </div>

          {/* Clickable 3D Glassmorphic Pill Button ("Nak Book Segera!") */}
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-x-[11%] top-[84.6%] flex h-[11.2%] items-center justify-center rounded-full transition-transform active:scale-95"
          >
            <span className="font-sans text-[22px] font-bold tracking-[-0.025em] text-white">
              {siteConfig.depositSection.ctaButtonText}
            </span>
          </a>
        </section>

        {/* =====================================================================
            SLIDE 21: KHAS UNTUK PROMO KALI INI SAHAJA! FREE E-KAD RSVP 20 SGD
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s21_rsvp_bg.webp"
            alt="Free E-Kad RSVP Bernilai 20 SGD"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Heading */}
          <div className="absolute inset-x-0 top-[5.8%] text-center font-sans text-[20px] leading-[1.2] font-light tracking-[-0.02em] text-white/95">
            <p>{siteConfig.rsvpOffer.topLine1}</p>
            <p>{siteConfig.rsvpOffer.topLine2}</p>
          </div>

          {/* 3D Pill Text ("E-Kad RSVP" bold + "Bernilai 20 SGD!" light) */}
          <div className="absolute inset-x-[17%] top-[25.9%] flex h-[10.3%] flex-col items-center justify-center text-center font-sans text-[22px] leading-[1.15] tracking-[-0.025em] text-white">
            <span className="font-bold">
              {siteConfig.rsvpOffer.pillLine1Bold}
            </span>
            <span className="font-light text-white/95">
              {siteConfig.rsvpOffer.pillLine2Light}
            </span>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 22: FEEDBACK & TESTIMONI 1
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s22_feedback_bg.webp"
            alt="Feedback & Testimoni"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Pill Overlay Text (Bold Sans-Serif + Light Subtitle) */}
          <div className="absolute inset-x-[10%] top-[3.3%] flex h-[10.3%] flex-col items-center justify-center text-center font-sans">
            <h2 className="text-[24px] leading-none font-bold tracking-[-0.025em] text-white">
              {siteConfig.testimonials.slide22TitleBold}
            </h2>
            <p className="mt-1.5 text-[15px] leading-none font-light tracking-[-0.015em] text-white/95">
              {siteConfig.testimonials.slide22Subtitle}
            </p>
          </div>
        </section>

        {/* =====================================================================
            SLIDE 23: FEEDBACK & TESTIMONI 2
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s23_feedback_bg.webp"
            alt="Feedback Testimoni WhatsApp 2"
            className="block h-auto w-full select-none"
            loading="lazy"
          />
        </section>

        {/* =====================================================================
            SLIDE 24: NO WORRIES RAMAI LAGI WE DELIVER TAU!
           ===================================================================== */}
        <section className="relative w-full">
          <img
            src="images/sg1999/s24_feedback_bg.webp"
            alt="No Worries Ramai Lagi We Deliver Tau"
            className="block h-auto w-full select-none"
            loading="lazy"
          />

          {/* Top Pill Overlay Text */}
          <div className="absolute inset-x-[10%] top-[3.3%] flex h-[10.3%] flex-col items-center justify-center text-center">
            <h2
              className="text-[28px] leading-[0.98] tracking-[-0.04em] text-white"
              style={SERIF_STYLE}
            >
              <span className="font-semibold">
                {siteConfig.testimonials.slide24Line1Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.testimonials.slide24Line1Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.testimonials.slide24Line1Suffix}
              </span>
              <br />
              <span className="font-semibold">
                {siteConfig.testimonials.slide24Line2Prefix}
              </span>
              <span className="font-semibold italic">
                {siteConfig.testimonials.slide24Line2Italic}
              </span>
              <span className="font-semibold">
                {siteConfig.testimonials.slide24Line2Suffix}
              </span>
            </h2>
          </div>
        </section>

        {/* =====================================================================
            SLIDES 25 & 26: FREQUENT ASK QUESTION (OPEN Q&A WITH WHITE DIVIDERS)
           ===================================================================== */}
        <section className="relative w-full bg-[#000000] pb-16">
          {/* Top 3D Glassmorphic Pill Header */}
          <div className="relative w-full">
            <img
              src="images/sg1999/s25_pill_header.webp"
              alt="Frequent Ask Question"
              className="block h-auto w-full select-none"
              loading="lazy"
            />
            <div className="absolute inset-x-[15%] top-[16%] flex h-[74%] flex-col items-center justify-center text-center">
              <h2 className="font-sans text-[23px] leading-[1.12] font-bold tracking-[-0.025em] text-white">
                <span>{siteConfig.faq.headerLine1}</span>
                <br />
                <span>{siteConfig.faq.headerLine2}</span>
              </h2>
            </div>
          </div>

          {/* Open FAQ Items with Horizontal White Lines */}
          <div className="mx-auto max-w-[360px] divide-y divide-white/80 px-4">
            {siteConfig.faq.items.map((item, idx) => (
              <div key={idx} className="py-6 text-left">
                <h3 className="font-sans text-[16.5px] leading-[1.25] font-bold tracking-[-0.015em] whitespace-pre-line text-white">
                  {item.question}
                </h3>
                <p className="mt-3.5 font-sans text-[14.5px] leading-[1.35] font-light tracking-[-0.015em] whitespace-pre-line text-white/95">
                  {item.answer}
                </p>
                {item.bullets && (
                  <ul className="mt-4 list-disc space-y-2 pl-5 font-sans text-[14.5px] leading-[1.35] font-light tracking-[-0.015em] text-white/95">
                    {item.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="whitespace-pre-line">
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
