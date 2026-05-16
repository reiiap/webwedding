# Serenara Studio - Web Undangan Digital

Landing page profesional bertema hitam untuk jasa undangan digital Serenara Studio, lengkap dengan slider hero, paket harga, tombol preview langsung per paket, dummy link tamu, dan panduan cara memesan.

## Jalankan lokal

Install dependency lalu jalankan Next.js:

```bash
npm install
npm run dev
```

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Import project di Vercel.
3. Framework preset: **Next.js**.
4. Build command: `npm run build`.
5. Output directory: `.next` (default Vercel).
6. Tambahkan environment variable `NEXT_PUBLIC_SITE_URL` jika domain produksi berbeda dari `https://undangan.serenarastudio.com`.
7. Deploy.

## Preview dummy

Tombol preview pada katalog paket langsung membuka halaman sesuai template, misalnya `/serenara-clean/Bapak-Andi`. Nama tamu dummy diambil dari segmen terakhir URL atau query `?to=Nama%20Tamu`. Paket Basic mencantumkan masa aktif 6 bulan, sedangkan paket Signature dan Royal mencantumkan masa aktif 1 tahun. Masa aktif bisa ditambah per 6 bulan melalui add-on.


Harga katalog menampilkan harga awal dicoret dan harga promo sebagai harga yang dipakai untuk tombol pembayaran. Add-on juga memakai format yang sama agar promo terlihat jelas.


## SEO Next.js

Project ini memakai Next.js App Router Metadata API untuk title, description, keyword, canonical URL, Open Graph, Twitter Card, `sitemap.xml`, `robots.txt`, dan JSON-LD bisnis/website. Semua halaman katalog, QRIS, dan preview tema dibuat crawlable agar siap deploy ke Vercel dan index Google.
