/**
 * ==============================================================================
 * KONFIGURASI LAMAN WEB WEDDING — lxFILMS PRO (PAKEJ RM 3499)
 * Semua teks kandungan (body text), harga, butiran pakej, testimoni & FAQ
 * boleh diubah terus di dalam fail ini.
 * ==============================================================================
 */

export const siteConfig = {
  whatsapp: {
    phoneNumber: "601120732058",
    defaultMessage: "Hai lxFILMS! Saya berminat dengan Pakej Promo Wedding RM3499!",
    buttonLabel: "Nak Book Segera!",
  },

  // Pop-Out Screen Urgency (Minimalist — Kurang dari 5 slot)
  urgencyPopup: {
    enabled: true,
    headlineItalic: "Slot Sekarang",
    headlineRegular: "Kurang Dari 5!",
    bodyText:
      "Kami hanya ambil beberapa wedding setiap bulan supaya setiap karya dijaga 100% berkualiti. Lock tarikh majlis korang sekarang dengan deposit RM 300 sebelum kembali ke harga asal.",
    buttonText: "Book Now - Secure Your Slot!",
    dismissText: "Teruskan Lihat Pakej",
  },

  // Slide 1: Hero Section
  hero: {
    titleLine1Italic: "Hari Besar,",
    titleLine2Regular: "Kenangan",
    titleLine3Italic: "Selamanya",
    priceLabel: "now it’s only",
    priceValue: "RM 3499",
    para1: "Bila hari tu tiba... kita tak nak terlepas satu\npun detik penting.",
    para2:
      "Kita nak setiap pelukan, setiap senyuman,\nsetiap air mata bahagia — dirakam cantik\ndan kekal selamanya",
  },

  // Slide 2: Nikah & Sanding 9 Jam Full Coverage
  coverageIntro: {
    titleLine1Prefix: "Nikah & ",
    titleLine1Italic: "Sanding",
    titleLine2Prefix: "— ",
    titleLine2Italic: "9 jam",
    titleLine2Suffix: " full coverage",
    para1:
      "Dari lafaz yang menyatukan hingga\nlangkah terakhir di pelamin, semuanya\ndirakam tanpa terhenti.",
    para2:
      "Photo & video sekali, menyulam kisah\ncinta jadi kenangan yang tak pernah\npudar.",
  },

  // Slide 3: Apa Yang Korang Akan Dapat (8 Glassmorphic Cards)
  deliverables: {
    titleLine1Prefix: "Apa yang ",
    titleLine1Italic: "korang",
    titleLine2Prefix: "akan ",
    titleLine2Italic: "dapat",
    cards: [
      [
        { text: "Full coverage\n", bold: false },
        { text: "9 jam", bold: true },
        { text: " untuk\n", bold: false },
        { text: "Nikah &\nSanding", bold: true },
      ],
      [
        { text: "1 photographer\n", bold: true },
        { text: "dan\n", bold: false },
        { text: "1 videographer", bold: true },
      ],
      [
        { text: "3 Video\nEdited", bold: true },
        { text: " & 300\nMin Photo\nEdited", bold: false },
      ],
      [
        { text: "Teaser", bold: true },
        { text: " siap\ndalam\n", bold: false },
        { text: "7 hari\nbekerja", bold: true },
      ],
      [
        { text: "Full deliverable\n", bold: false },
        { text: "siap dalam\n21 hari\nbekerja", bold: true },
      ],
      [
        { text: "Tone yang\n", bold: false },
        { text: "films,\ntimeless &\ncinematic", bold: true },
      ],
      [
        { text: "Sentuhan tone\nyang\n", bold: false },
        { text: "elegan &\npremium", bold: true },
      ],
      [
        { text: "Jaminan\nPulangan\nDuit", bold: true },
        { text: " Jika Late\nDeliver!*", bold: false },
      ],
    ],
    footnoteLine1: "*untuk produk deliver secara digital sahaja",
    footnoteLine2Prefix: "3 Video : ",
    footnoteLine2Bold: "Teaser, Nikah Highlight & Sanding Highlight",
  },

  // Slide 4: 5 Free Gifts Percuma
  freeGifts: {
    titleLine1Prefix: "Dan ",
    titleLine1Italic: "semua ni",
    titleLine1Suffix: " kami bagi",
    titleLine2Italic: "PERCUMA:",
    items: [
      {
        title: "Album & Frame\n(free delivery)",
        worth: "Worth RM 1000",
      },
      {
        title: "4 bulan link warranty\n+ 2x amendment",
        worth: "Worth RM 900",
      },
      {
        title: "Transportation\nFee",
        worth: "Worth RM 300",
      },
      {
        title: "Drone Shots\n(untuk intro/outro)",
        worth: "Worth RM 500",
      },
      {
        title: "Nikah & Sanding\npreparation session",
        worth: "Worth RM 1000",
      },
    ],
    albumTitleLine1Italic: "Premium",
    albumTitleLine1Suffix: " Album",
    albumTitleLine2Prefix: "& Frame ",
    albumTitleLine2Italic: "Quality",
  },

  // Slides 5 & 6: Album & Frame Showcase
  albumShowcase: {
    topLabel: "custom premium\nleather engraved",
    bottomLabel: "+ premium classic frame",
    leftLabel: "12*8 inch + 20 Pages",
    rightLabel: "matte paper + glossy\npaper finishing",
  },

  // Slide 7: Drone Shots & Promo Value
  promoValue: {
    arrowLabel: "drone shots",
    headlineMuted1: "Total value pakej ",
    headlineBold1: "ni lebih\nRM4999, ",
    headlineMuted2: "tapi sekarang\n",
    headlineBold2: "hanya ",
    priceBadge: "RM3499.",
    para1:
      "Slot sangat terhad — kami hanya ambil\nbeberapa wedding setiap bulan supaya\nsetiap kerja dijaga 100%.",
    para2Prefix: "Promo ni cuma berjalan dalam ",
    para2Bold: "tempoh\nterhad sahaja, dan bila tempoh tu habis",
    para3Prefix: "— ",
    para3Bold: "harga akan kembali ke asal",
    para3Suffix: " dan semua\nfree gift ni tak lagi termasuk.",
  },

  // Slide 9: RM 1500 OFF & Body Text
  discountOffer: {
    para1Prefix: "Bila ",
    para1Bold: "promo tamat,",
    para1Suffix: " harga akan\nkembali ke asal.",
    para2: "Kalau sekarang masih ada ruang\n— ini masa terbaik untuk grab.",
    para3:
      "Sebab hari bahagia cuma sekali...\ntapi kenangan dia akan hidup\nselamanya. ✨",
  },

  // Slide 10: Main Package Card (Standard Promo RM 3499)
  mainPackage: {
    topBanner: "Exclusive only for 2026 Booking!",
    titleItalic: "Standard Promo",
    titleRegular: "Photo & Video",
    subtitle: "Nikah Session + Sanding + Outdoor",
    offerPrice: "RM 3499",
    normalPriceLabel: "NP : ",
    normalPriceValue: "RM 4499",
    photographyItems: [
      { boldPrefix: "9 Hours", text: " Of Coverage" },
      { boldPrefix: "1 Senior Photographer", text: "" },
      { boldPrefix: "", text: "Films Classic Tone ( Indoor & Outdoor )" },
      {
        boldPrefix: "",
        text: "Clean Bright Tone ( Group Photos & Pelamin Potraiture )",
      },
      {
        boldPrefix: "Min 300 Edited Per Events ( Nikah/Sanding )",
        text: "",
      },
      { boldPrefix: "1x Signature Album with Leather Cover", text: "" },
      { boldPrefix: "1x Classic Canvas Frame", text: "" },
    ],
    videographyItems: [
      { boldPrefix: "9 Hours", text: " Of Coverage" },
      { boldPrefix: "1 Senior Videographer", text: "" },
      { boldPrefix: "", text: "Clean & Classic Vibes Tone" },
      {
        boldPrefix: "Free Drone Shots",
        text: " For Establisment Intro/Outro",
      },
      { boldPrefix: "", text: "4-Month Link Warranty With Zero Cost" },
      { boldPrefix: "1 Sanding Highlight", text: "" },
      { boldPrefix: "1 Nikah Highlight", text: "" },
      { boldPrefix: "1 Teaser", text: "" },
    ],
    freeGiftItems: [
      { boldPrefix: "Free", text: " Transportation Fee (Worth RM 200)" },
      { boldPrefix: "Free", text: " Nikah Preparation session (Worth RM 500)" },
      {
        boldPrefix: "Free",
        text: " Nikah Outdoor/Portraiture Session (Worth RM 450)",
      },
      { boldPrefix: "Free", text: " Album and Frame Postage (Worth RM 400)" },
      {
        boldPrefix: "Free",
        text: " Raw Footages upon request (Worth RM 1,000)",
      },
    ],
  },

  // Slide 11: Countdown Subtext & Deposit Serendah RM 300
  depositSection: {
    countdownNote:
      "Tawaran terhad 7 hari — harga kembali ke RM 4999 selepas tamat",
    heading: "Deposit Serendah\nRM 300",
    para1: "Untuk tempahan, korang tak perlu bayar\npenuh.",
    para2: "Deposit hanya RM300 sahaja untuk lock\nslot.",
    balanceLabel: "Baki bayaran:",
    term1Bold1: "80%",
    term1Mid: " dibayar ",
    term1Bold2: "3 hari sebelum majlis",
    term2Bold1: "20%",
    term2Mid1: " dibayar ",
    term2Bold2: "7 hari selepas",
    term2Mid2: " korang\nterima ",
    term2Bold3: "teaser",
    buttonText: "Nak Book Segera!",
  },

  // Slide 12: FREE E-Kad RSVP
  rsvpPromo: {
    topText: "Khas Untuk Promo\nKali Ini Sahaja!",
    pillBold: "E-Kad RSVP",
    pillRegular: "Bernilai RM 99!",
  },

  // Slides 13 & 14: Feedback & Testimoni
  testimonials: {
    title1: "Feedback & Testimoni",
    subtitle1: "& banyak lagi di instagram !",
    title2Line1Prefix: "No ",
    title2Line1Italic: "Worries",
    title2Line1Suffix: " Ramai",
    title2Line2Prefix: "Lagi We ",
    title2Line2Italic: "Deliver",
    title2Line2Suffix: " Tau!",
  },

  // Slides 15, 16, 17: Frequent Ask Question (All 7 Connected)
  faqSection: {
    headerLine1: "Frequent",
    headerLine2Prefix: "Ask ",
    headerLine2Italic: "Question",
    items: [
      {
        question: "Berapa nak add-on photographer /\nvideographer?",
        answer:
          "1 event: RM600\n2 event: RM900\n1 jam tambahan: RM150 (photo/video)\nFast Editing; RM500 (Min. 3 Hours Gap)",
      },
      {
        question: "Boleh refund tak deposit?",
        answer: "Deposit tidak refundable kecuali dalam\nsituasi berikut:",
        bullets: [
          "Putus, sponsored by kawan/family, tak jadi kahwin → Tiada refund melainkan dibatalkan dalam masa 3 minggu selepas booking",
          "Sakit, kecederaan, kemalangan → 50% refund jika event tinggal 1 bulan atau 3 minggu. 100% refund jika event masih 7 bulan ke atas",
          "Pasangan berlaku kematian → 100% refund",
        ],
      },
      {
        question: "Pakej ni cover dua hari ke?",
        answer:
          "Tak cover dua hari.\nTapi korang boleh add-on RM500 untuk\ncoverage dua hari.",
      },
      {
        question: "Ada cas tersembunyi tak?",
        answer:
          "Tiada hidden charge. Apa yang korang\ntengok ialah apa yang korang bayar.",
      },
      {
        question: "Ada Cover Preparation ke?",
        answer:
          "Yup, ada untuk nikah seawal 7:30 AM\n\nif nak request 5:00 AM - 6:00 AM, boleh\ntapi accomodation perlu disediakan\nberdekatan tempat bersiap\n\nNikah - Kita Fokus Bridal Part, Details\nSanding - Flatlay & Groom Part",
      },
      {
        question: "Ada office ke?",
        answer:
          "Kami home-based office di Kajang,\nSelangor.\nBoleh set meeting secara online atau\noffline ikut keselesaan korang.",
      },
      {
        question: "Ada Money Back Guarantee Ke?",
        answer:
          "Yup! Jika lewat delivery online product,\nkita akan refund 20% dari pembayaran!",
      },
    ],
  },

  // Slides 18, 19, 20: Promosi Pakej Solo & One-Event
  soloPackagesSection: {
    pillTitleLine1: "Promosi",
    pillTitleLine2: "Pakej Solo!",
    packages: [
      // Slide 18: Standard Photo or Video RM 2499
      {
        id: "solo-1999",
        bannerBg: "#68bf45",
        bannerTextColor: "#1a1a1a",
        topBanner: "Exclusive only for 2026 Booking!",
        titleItalic: "Standard ",
        titleRegular1: "Photo",
        titleBoldConnector: "",
        titleLine2: "Or Video",
        subtitle: "Nikah Session + Sanding + Outdoor",
        price: "RM 2499",
        normalPriceLabel: "NP : ",
        normalPriceValue: "RM 4999",
        showOrDivider: true,
        photographyItems: [
          { boldPrefix: "9 Hours", text: " Of Coverage" },
          {
            boldPrefix: "1 Senior Photographer + 1 Assist Photographer",
            text: "",
          },
          { boldPrefix: "", text: "Films Classic Tone (Indoor & Outdoor)" },
          {
            boldPrefix: "",
            text: "Clean Bright Tone (Group Photos & Pelamin Potraiture)",
          },
          {
            boldPrefix: "Min 300 Edited Per Events (Nikah/Sanding)",
            text: "",
          },
        ],
        videographyItems: [
          { boldPrefix: "9 Hours", text: " Of Coverage" },
          { boldPrefix: "", text: "Coverage for either Nikah or Sanding" },
          {
            boldPrefix: "1 Senior Videographer + 1 Assist Videographer",
            text: "",
          },
          { boldPrefix: "", text: "Clean & Classic Vibes Tone" },
          {
            boldPrefix: "",
            text: "Free Drone Shots For Establisment Intro/Outro",
          },
          { boldPrefix: "", text: "4 Month Link Warranty With Zero Cost" },
          { boldPrefix: "1 Nikah Highlight (HD)", text: "" },
          { boldPrefix: "1 Sanding Highlight (HD)", text: "" },
          { boldPrefix: "1 Teaser (HD)", text: "" },
        ],
        freeGiftItems: [
          { boldPrefix: "Free", text: " Transportation Fee (Worth RM 200)" },
          {
            boldPrefix: "Free",
            text: " Nikah Preparation session (Worth RM 500)",
          },
          {
            boldPrefix: "Free",
            text: " Nikah Outdoor/Portraiture Session (Worth RM 450)",
          },
          {
            boldPrefix: "Free",
            text: " Album and Frame Postage (Worth RM 400)",
          },
          {
            boldPrefix: "Free",
            text: " Raw Footages upon request (Worth RM 1,000)",
          },
        ],
        footnote: "",
        summaryPriceBold: "RM 2499 ( NP : RM 3999 )",
        summaryLine1Parts: [{ text: "Nikah & Sanding", bold: true }],
        summaryLine2Parts: [
          { text: "Photo Sahaja ", bold: false },
          { text: "atau", bold: true },
          { text: " Video Sahaja", bold: false },
        ],
      },

      // Slide 19: One-Event Photo or Video RM 1999
      {
        id: "one-event-solo-1699",
        bannerBg: "#ea4c89",
        bannerTextColor: "#1a1a1a",
        topBanner:
          "This Package Applicable for Photography Only or Videography Only.",
        titleItalic: "One - Event",
        titleRegular1: "",
        titleBoldConnector: "",
        titleLine2: "Photo Or Video",
        subtitle: "Nikah/Sanding/Tandang + Outdoor",
        price: "RM 1999",
        normalPriceLabel: "NP : ",
        normalPriceValue: "RM 2999",
        showOrDivider: true,
        photographyItems: [
          { boldPrefix: "6 Hours", text: " Of Coverage" },
          {
            boldPrefix: "1 Senior Photographer + 1 Assist Photographer",
            text: "",
          },
          { boldPrefix: "", text: "Films Classic Tone ( Indoor & Outdoor )" },
          {
            boldPrefix: "",
            text: "Clean Bright Tone ( Group Photos & Pelamin Potraiture )",
          },
          { boldPrefix: "Min 300 Edited Per Events", text: "" },
          { boldPrefix: "", text: "7 Days Teaser Highlights" },
          { boldPrefix: "", text: "14 Days Edited Photos Delivered" },
        ],
        videographyItems: [
          { boldPrefix: "6 Hours", text: " Of Coverage" },
          {
            boldPrefix: "1 Senior Videographer + 1 Assist Videographer",
            text: "",
          },
          { boldPrefix: "", text: "Clean & Classic Vibes Tone" },
          {
            boldPrefix: "Free Drone Shots",
            text: " For Establisment Intro/Outro",
          },
          { boldPrefix: "", text: "4 Month Link Warranty With Zero Cost" },
          { boldPrefix: "", text: "7 Days Teaser Highlights" },
          { boldPrefix: "", text: "14 Days Edited Photos Delivered" },
          { boldPrefix: "1 Nikah/Sanding/Tandang Highlight", text: "" },
          { boldPrefix: "1 Teaser", text: "" },
        ],
        freeGiftItems: [
          { boldPrefix: "Free", text: " Transportation Fee ( Worth RM 200 )*" },
          {
            boldPrefix: "Free",
            text: " Outdoor/Portraiture Session ( Worth RM 450 )",
          },
          { boldPrefix: "Free", text: " Postage Album & Frame" },
          { boldPrefix: "Free", text: " Meeting Consultation before Event" },
        ],
        footnote: "*for KL, Selangor & Negeri Sembilan only",
        summaryPriceBold: "RM 1999 ( NP : RM 2999 )",
        summaryLine1Parts: [
          { text: "Nikah ", bold: false },
          { text: "atau ", bold: true, italic: true },
          { text: "Sanding ", bold: false },
          { text: "atau ", bold: true, italic: true },
          { text: "Tandang Sahaja", bold: false },
        ],
        summaryLine2Parts: [
          {
            text: "2 Photographer Sahaja atau\n2 Videographer Sahaja",
            bold: false,
          },
        ],
      },

      // Slide 20: One-Event Photo & Video RM 1999
      {
        id: "one-event-combo-1699",
        bannerBg: "#e8830c",
        bannerTextColor: "#1a1a1a",
        topBanner: "Exclusive only for 2026 Booking!",
        titleItalic: "One-Event",
        titleRegular1: "",
        titleBoldConnector: "",
        titleLine2: "Photo & Video",
        subtitle: "Nikah/Sanding/Tandang + Outdoor",
        price: "RM 1999",
        normalPriceLabel: "NP : ",
        normalPriceValue: "RM 2999",
        showOrDivider: false,
        photographyItems: [
          { boldPrefix: "6 Hours", text: " Of Coverage" },
          { boldPrefix: "1 Senior Photographer", text: "" },
          { boldPrefix: "", text: "Films Classic Tone ( Indoor & Outdoor )" },
          {
            boldPrefix: "",
            text: "Clean Bright Tone ( Group Photos & Pelamin Potraiture )",
          },
          { boldPrefix: "Min 300 Edited Per Events", text: "" },
          { boldPrefix: "", text: "7 Days Teaser Highlights" },
          { boldPrefix: "", text: "14 Days Edited Photos Delivered" },
        ],
        videographyItems: [
          { boldPrefix: "6 Hours", text: " Of Coverage" },
          { boldPrefix: "1 Senior Videographer", text: "" },
          { boldPrefix: "", text: "Clean & Classic Vibes Tone" },
          {
            boldPrefix: "Free Drone Shots",
            text: " For Establisment Intro/Outro",
          },
          { boldPrefix: "", text: "4 Month Link Warranty With Zero Cost" },
          { boldPrefix: "", text: "7 Days Teaser Highlights" },
          { boldPrefix: "", text: "14 Days Edited Photos Delivered" },
          { boldPrefix: "1 Nikah/Sanding/Tandang Highlight", text: "" },
          { boldPrefix: "1 Teaser", text: "" },
        ],
        freeGiftItems: [
          { boldPrefix: "Free", text: " Transportation Fee ( Worth RM 200 )*" },
          {
            boldPrefix: "Free",
            text: " Outdoor/Portraiture Session ( Worth RM 450 )",
          },
          { boldPrefix: "Free", text: " Postage Album & Frame" },
          { boldPrefix: "Free", text: " Meeting Consultation before Event" },
        ],
        footnote: "*for KL, Selangor & Negeri Sembilan only",
        summaryPriceBold: "RM 1999 ( NP : RM 2999 )",
        summaryLine1Parts: [
          { text: "Nikah ", bold: false },
          { text: "atau ", bold: true, italic: true },
          { text: "Sanding ", bold: false },
          { text: "atau ", bold: true, italic: true },
          { text: "Tandang Sahaja", bold: false },
        ],
        summaryLine2Parts: [
          { text: "1 Photographer ", bold: false },
          { text: "& ", bold: true },
          { text: "1 Videographer", bold: false },
        ],
      },
    ],
    finalCtaLine1: "Tiada Soalan",
    finalCtaLine2: "Nak Book Terus!",
  },
};

export function getWhatsAppUrl(customMessage) {
  const phone = siteConfig.whatsapp.phoneNumber;
  const message = customMessage || siteConfig.whatsapp.defaultMessage;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
