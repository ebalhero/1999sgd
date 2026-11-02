# Laman Web Jualan Wedding Photo & Video Singapore — 2499 SGD (lxFILMS)

Laman jualan satu halaman (*single-page sales landing page*) untuk pakej **Priority Premium Wedding Photo & Video Coverage (2499 SGD)** oleh **lxFILMS**, dibina 100% mengikut reka bentuk asal (33 seksyen penuh) dengan fungsi **Countdown 7 Hari Auto-Reset** dan butang tempahan **WhatsApp**.

---

## 🎯 Ciri-Ciri Utama

1. **100% Sama Reka Bentuk Asal (`1.svg` – `33.svg`)**
   - Kesemua 33 seksyen dirender pada resolusi tinggi Retina (`828 x 1792` WebP tanpa sempadan putih) supaya setiap tipografi, bingkai emas/perak, kolaj gambar, testimoni WhatsApp, jadual pakej, dan garis masa kelihatan 100% sama seperti reka bentuk asal.
2. **Countdown 7 Hari Auto-Reset (Tidak Pernah Menjadi `00 Hari`)**
   - Bermula pada `07 Hari : 23 Jam : 59 Minit : 59 Saat` dan mengira turun selama 7 hari (`07` → `06` → `05` → `04` → `03` → `02` → `01` Hari).
   - Sebaik sahaja baki masa menghampiri bawah 1 hari (sebelum menjadi `00 Hari`), sistem secara automatik *reset* semula ke kitaran 7 hari baharu (`07 Hari : 23 Jam : 59 Minit : 59 Saat`).
   - Dipaparkan pada **Sticky Top Bar** dan pada **Seksyen 27** (menggantikan kotak placeholder merah di bawah *"PROMO ENDS IN"*).
3. **Butang CTA WhatsApp Interaktif & Lightbox Gambar**
   - Butang **"Nak Book Segera!"** pada Seksyen 27 serta **Sticky Bottom WhatsApp Bar** terus membuka pautan WhatsApp dengan mesej tempahan.
   - Klik pada mana-mana seksyen galeri/testimoni untuk melihat paparan penuh (*Fullscreen Lightbox*).

---

## 📱 Panduan Konfigurasi WhatsApp

Buka fail [`src/config/siteConfig.js`](file:///Users/test/Downloads/website%20baru/src/config/siteConfig.js) untuk mengubah nombor telefon atau mesej WhatsApp:

```javascript
export const siteConfig = {
  whatsapp: {
    phoneNumber: "601156270484", // Format antarabangsa tanpa '+' atau '-'
    defaultMessage:
      "Hai lxFILMS! Saya berminat nak book Promo Priority Premium Wedding Photo & Video (2499 SGD). Boleh saya tahu slot kosong untuk 2026/2027?",
    buttonLabel: "Nak Book Segera!",
  },
  // ...
};
```

---

## 🚀 Cara Menjalankan Projek

```bash
# 1. Jalankan server pembangunan
npm run dev

# 2. Bina untuk produksi (folder dist/)
npm run build
```
