/**
 * ==============================================================================
 * KONFIGURASI LAMAN WEB WEDDING SINGAPORE — lxFILMS PRO (PAKEJ 1999 SGD)
 * 100% Mengikut Rekaan Asal Canva "1999 SGD(4)" (Slide 1 hingga Slide 26)
 * Semua teks di seluruh halaman boleh diubah terus di dalam fail ini.
 * ==============================================================================
 */

export const siteConfig = {
  whatsapp: {
    phoneNumber: "601120732058",
    defaultMessage:
      "Hai lxFILMS! Saya berminat dengan Pakej Promo Singapore Wedding 1999 SGD!",
    buttonLabel: "Nak Book Segera!",
  },

  // Bar Countdown Di Atas Sekali (Non-Sticky)
  topCountdownBar: {
    enabled: true,
    label: "PROMO 1999 SGD TAMAT DALAM:",
    daysLabel: "Hari",
    hoursLabel: "Jam",
    minutesLabel: "Min",
    secondsLabel: "Saat",
  },

  // Pop-Out Screen Urgency (Tinggal 5 Slot Sahaja Lagi Available + Animasi Pusing ke 5)
  urgencyPopup: {
    enabled: true,
    topLabel: "LIMITED SLOT",
    prefixText: "Tinggal",
    targetNumber: 5,
    slotWord: "Slot",
    suffixText: "Sahaja Lagi Available!",
    subText:
      "Lock tarikh majlis korang sekarang dengan deposit serendah 300 SGD sebelum kuota penuh.",
    buttonText: "Book Now",
    dismissText: "Tutup & Lihat Pakej",
  },

  // Slide 1: Hero Section
  hero: {
    titleLine1Regular: "Exclusive ",
    titleLine1Italic: "9 Hours",
    titleLine2Regular: "Wedding",
    titleLine3Italic: "Photo & Video",
    titleLine4Regular: "Coverage",
    priceLabel: "no hidden charge,\nno extra charge",
    priceValue: "1999 SGD",
    para1:
      "Bila hari tu tiba... kita tak nak terlepas satu\npun detik penting.",
    para2:
      "Kita nak setiap pelukan, setiap senyuman,\nsetiap air mata bahagia — dirakam cantik\ndan kekal selamanya",
    exclusiveBy: "exclusive by",
  },

  // Slide 2: Premium Films Classic Vibes
  classicVibes: {
    titleLine1: "Premium Films",
    titleLine2: "Classic Vibes",
    body: "A touch of soft shadow with\nPhoto & video sekali, menyulam kisah\ncinta jadi kenangan yang tak pernah\npudar.",
  },

  // Slide 3: Trusted by 100+ Couples
  trustedCouples: {
    titleRegular: "Trusted by ",
    titleItalic: "100+ Couples",
    body: "Not because we promise big things,\nbut because we show up —\ncalm, prepared, and fully present.",
  },

  // Slide 4: Why Choose Us Instead of Others?
  whyChooseUs: {
    titleLine1Prefix: "Why ",
    titleLine1Italic: "Choose Us",
    titleLine1Suffix: " Instead of",
    titleLine2Regular: "Others?",
    items: [
      {
        top: "19.0%",
        segments: [
          { text: "Every moment is ", bold: false },
          { text: "carefully captured,", bold: true },
          { text: "\ncurated, and preserved, ", bold: false },
          { text: "nothing\nrushed, nothing forced.", bold: true },
        ],
      },
      {
        top: "29.0%",
        segments: [
          { text: "We meet, we plan, and we move\n", bold: true },
          { text: "with complete transparency.", bold: false },
        ],
      },
      {
        top: "36.6%",
        segments: [
          {
            text: "Jika sesuatu itu tidak selari dengan\nyour dreams & moodboard,\nkami ",
            bold: false,
          },
          { text: "akan jujur dari awal.", bold: true },
        ],
      },
      {
        top: "46.5%",
        segments: [
          {
            text: "Setiap client bagi kami adalah sebuah\namanah. ",
            bold: false,
          },
          { text: "A responsibility we carry\nwith pride.", bold: true },
        ],
      },
      {
        top: "56.4%",
        segments: [
          { text: "Starting 2026 onwards, we\n", bold: false },
          { text: "personally handle every wedding", bold: true },
          { text: ",\nno 3rd shooters.", bold: false },
        ],
      },
    ],
    reassurancePrefix: "dont worry and be nervous, ",
    reassuranceBold: "we got\nmoney back guarantee policy!",
    guaranteeBold:
      "we promise to deliver on\ntime*, if late, We will refund\n10% back to you!",
    footnote:
      "*jika tidak melibatkan kemalangan, kematian, penyakit yang teruk",
  },

  // Slide 5: Our Approach
  ourApproach: {
    titleItalic: "Our",
    titleRegular: " Approach",
    para1: "Minimal direction, Natural flow.\nHonest moments.",
    para2:
      "Kami biarkan hari itu berlaku,\nsementara kami simpan apa yang penting",
  },

  // Slide 6: Apa yang korang akan dapat (8 Glassmorphic Cards)
  deliverables: {
    titleLine1Prefix: "Apa ",
    titleLine1Italic: "yang",
    titleLine1Suffix: " korang",
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
        { text: "3 hari\nbekerja", bold: true },
      ],
      [
        { text: "Full deliverable\n", bold: true },
        { text: "photo, video &\nalbum in ", bold: false },
        { text: "90 hari\nbekerja", bold: true },
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

  // Slide 7: If You Book Today! Semua ni FREE Je (5 Free Gifts)
  freeGifts: {
    titleLine1Prefix: "If You ",
    titleLine1Italic: "Book",
    titleLine1Suffix: " Today!",
    titleLine2Prefix: "Semua ni ",
    titleLine2Italic: "FREE",
    titleLine2Suffix: " Je",
    items: [
      {
        line1: "Premium Leather",
        line2: "Engraved Album + Frame",
        worth: "Worth 50 SGD",
      },
      {
        line1: "4 bulan link warranty",
        line2: "+ 2x amendment",
        worth: "Worth 200 SGD",
      },
      {
        line1: "Transportation",
        line2: "Fee",
        worth: "Worth 100 SGD",
      },
      {
        line1: "Drone Shots",
        line2: "(untuk intro/outro)",
        worth: "Worth 400 SGD",
      },
      {
        line1: "Nikah & Sanding",
        line2: "preparation session",
        worth: "Worth 400 SGD",
      },
    ],
  },

  // Slides 8 & 9: Album & Frame Showcase
  albumShowcase: {
    topLabel: "custom premium\nleather engraved",
    bottomLabel: "+ premium classic frame",
    leftLabel: "12*8 inch + 20 Pages",
    rightLabel: "matte paper + glossy\npaper finishing",
  },

  // Slide 10: Drone Shots & Promo Value (3499 SGD -> 1999 SGD)
  promoValue: {
    arrowLabel: "drone shots",
    headlineMuted1: "Total value pakej ",
    headlineBold1: "ni lebih\n3499 SGD, ",
    headlineMuted2: "tapi sekarang\n",
    headlineBold2: "hanya ",
    headlineHighlight: "1999 SGD.",
    para1:
      "Slot sangat terhad — kami hanya ambil\nbeberapa wedding setiap bulan supaya\nsetiap kerja dijaga 100%.",
    para2Muted: "Promo ni cuma berjalan dalam ",
    para2Bold: "tempoh\nterhad sahaja, dan bila tempoh tu habis",
    para3Prefix: "— ",
    para3Bold: "harga akan kembali ke asal",
    para3Suffix: " dan semua\nfree gift ni tak lagi termasuk.",
  },

  // Slide 12: Price Offer (3999 SGD -> 1999 SGD) & Ticker Ribbon
  priceOffer: {
    ribbonText: "2000 SGD OFF",
    para1Prefix: "Bila ",
    para1Bold: "promo tamat,",
    para1Suffix: " harga akan\nkembali ke asal.",
    para2: "Kalau sekarang masih ada ruang\n— ini masa terbaik untuk grab.",
    para3:
      "Not for photos alone.\nBut for peace of mind,\nand memories that won’t feel\nstaged ten years from now.",
  },

  // Slide 14: Gold Frame Quotes
  emotionalQuote: {
    line1Italic: "Mastered Through ",
    line1Regular: "Years of",
    line2Regular: "Shooting in ",
    line2Italic: "Singapore",
    line2Suffix: " —",
    line3Italic: "Results ",
    line3Regular: "That Couples",
    line4Italic: "Truly Adore.",
  },

  // Slide 16: Where Our Stories Have Unfolded (9 Singapore Venues)
  venues: {
    titleLine1Italic: "Where Our Stories ",
    titleLine1Regular: "Have",
    titleLine2Regular: "Unfolded",
    row1: ["Masjid Yusof Ishak", "HomeTeam NS Villa", "Tiara Waterfront"],
    row2: ["Masjid al-Islah", "SG Botanic Garden", "Gillman Barracks"],
    row3: ["Fort Canning Park", "Istana, Kinex Mall", "National Gallery SG"],
  },

  // Slide 18: Film Frame Polaroids Heading
  polaroidsQuote: {
    line1Regular: "where ",
    line1Italic: "magic breathes",
    line1Suffix: " a",
    line2Regular: "masterpiece",
  },

  // Slide 19: Package Details
  packageDetails: {
    sectionTitleItalic: "Package",
    sectionTitleRegular: " Details",
    topBanner: "Exclusive for 2026 Booking!",
    titleItalic: "Priority",
    titleRegular1: " Premium",
    titleLine2: "Photo & Video",
    subtitleItalic: "Nikah Session + Sanding + Outdoor",
    price: "SGD 1999",
    normalPriceLabel: "NP : ",
    normalPriceValue: "SGD 3999",
    photographyHeading: "P H O T O G R A P H Y",
    photographyItems: [
      { text: "8 Hours Of Coverage", bold: false },
      { text: "Nikah : 3 Hours Coverage", bold: false },
      {
        text: "Sanding : 5 Hours Coverage + Free 1 Hour Outdoor Session",
        bold: false,
      },
      { text: "1 Senior Photographer", bold: true },
      { text: "Films Classic Tone ( Indoor & Outdoor )", bold: false },
      {
        text: "Clean Bright Tone ( Group Photos & Pelamin Potraiture )",
        bold: false,
      },
      { text: "Min 300 Edited Per Events ( Nikah/Sanding )", bold: true },
      { text: "1x Signature Leather Cover Album", bold: true },
      { text: "1x Signature Classic Frame", bold: true },
    ],
    videographyHeading: "V I D E O G R A P H Y",
    videographyItems: [
      { text: "8 Hours Of Coverage", bold: false },
      { text: "Nikah : 3 Hours Coverage", bold: false },
      {
        text: "Sanding : 5 Hours Coverage + Free 1 Hour Outdoor Session",
        bold: false,
      },
      { text: "1 Senior Videographer", bold: true },
      { text: "Clean & Classic Vibes Tone", bold: false },
      { text: "4 Month Link Warranty With Zero Cost", bold: false },
      { text: "1 Nikah Highlight", bold: true },
      { text: "1 Sanding Highlight", bold: true },
      { text: "1 Teaser", bold: true },
    ],
    freeGiftHeading: "F R E E G I F T   :",
    freeGiftItems: [
      { boldPrefix: "Free", text: " Transportation Fee ( 200 SGD )" },
      { boldPrefix: "Free", text: " Premium RSVP E-Card" },
      { boldPrefix: "Free", text: " 1 Hour Outdoor Session ( 300 SGD )" },
      { boldPrefix: "Free", text: " Nikah Short Outdoor Session ( 300 SGD )" },
      { boldPrefix: "Free", text: " Raw videos Upon Request ( 500 SGD )" },
    ],
  },

  // Slide 20: Countdown & Deposit Section
  depositSection: {
    bannerLine1: "ini tempoh promosi",
    bannerLine2: "akan berakhir!",
    titleLine1: "Deposit Serendah",
    titleLine2: "300 SGD",
    para1: "Untuk tempahan, korang tak perlu bayar\npenuh.",
    para2: "Deposit hanya 300 SGD sahaja untuk\nlock slot.",
    para3Label: "Baki bayaran:",
    paymentLine1Bold1: "80% ",
    paymentLine1Regular: "dibayar ",
    paymentLine1Bold2: "3 hari sebelum majlis",
    paymentLine2Bold1: "20% ",
    paymentLine2Regular1: "dibayar ",
    paymentLine2Bold2: "7 hari selepas ",
    paymentLine2Regular2: "korang\nterima ",
    paymentLine2Bold3: "teaser",
    ctaButtonText: "Nak Book Segera!",
  },

  // Slide 21: Bonus Free E-Kad RSVP
  rsvpOffer: {
    topLine1: "Khas Untuk Promo",
    topLine2: "Kali Ini Sahaja!",
    pillLine1Bold: "E-Kad RSVP",
    pillLine2Light: "Bernilai 20 SGD!",
  },

  // Slides 22 & 24: Feedback & Testimoni Headers
  testimonials: {
    slide22TitleBold: "Feedback & Testimoni",
    slide22Subtitle: "& banyak lagi di instagram !",
    slide24Line1Prefix: "No ",
    slide24Line1Italic: "Worries",
    slide24Line1Suffix: " Ramai",
    slide24Line2Prefix: "Lagi We ",
    slide24Line2Italic: "Deliver",
    slide24Line2Suffix: " Tau!",
  },

  // Slides 25 & 26: Frequent Ask Question (Open Layout with Divider Lines)
  faq: {
    headerLine1: "Frequent",
    headerLine2: "Ask Question",
    items: [
      {
        question: "Berapa nak add-on photographer /\nvideographer?",
        answer:
          "1 event: 400 SGD\n2 event: 400 SGD\n1 jam tambahan: 100 SGD (photo/video)\nFast Editing; 100 SGD (Min. 3 Hours Gap)",
      },
      {
        question: "Boleh refund tak deposit?",
        answer: "Deposit tidak refundable kecuali dalam\nsituasi berikut:",
        bullets: [
          "Putus, sponsored by kawan/family,\ntak jadi kahwin → Tiada refund\nmelainkan dibatalkan dalam masa 3\nminggu selepas booking",
          "Sakit, kecederaan, kemalangan →\n50% refund jika event tinggal 1 bulan\natau 3 minggu. 100% refund jika event\nmasih 7 bulan ke atas",
          "Pasangan berlaku kematian → 100%\nrefund",
          "Hot Date ( High Demand Date ) - No\nRefund",
        ],
      },
      {
        question: "Pakej ni cover dua hari ke?",
        answer:
          "Tak cover dua hari.\nTapi korang boleh add-on 400 SGD\nuntuk coverage dua hari.",
      },
      {
        question: "Ada cas tersembunyi tak?",
        answer:
          "Tiada hidden charge. Apa yang korang\ntengok ialah apa yang korang bayar.",
      },
      {
        question: "Ada office ke?",
        answer:
          "Kami masih home-based office\nBoleh set meeting secara online atau\noffline ikut keselesaan korang.",
      },
      {
        question: "Ada Money Back Guarantee Ke?",
        answer:
          "Yup! Jika lewat delivery online product,\nkita akan refund 10% dari pembayaran!",
      },
    ],
  },
};

export function getWhatsAppUrl(customMessage) {
  const phone = siteConfig.whatsapp.phoneNumber;
  const message = customMessage || siteConfig.whatsapp.defaultMessage;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
