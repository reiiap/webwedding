# Serenara Studio - Web Undangan Digital

Landing page profesional bertema hitam untuk jasa undangan digital Serenara Studio, lengkap dengan slider hero, paket harga, tombol preview langsung per paket, dummy link tamu, dan panduan cara memesan.

## Jalankan lokal

Cukup buka `index.html` langsung di browser, atau pakai server statis:

```bash
npx serve .
```

## Deploy ke Vercel

1. Push repo ini ke GitHub.
2. Import project di Vercel.
3. Framework preset: **Other**.
4. Build command: kosongkan.
5. Output directory: `.`
6. Deploy.

## Preview dummy

Tombol preview pada katalog paket langsung membuka halaman sesuai template, misalnya `/serenara-clean/Bapak-Andi`. Nama tamu dummy diambil dari segmen terakhir URL atau query `?to=Nama%20Tamu`. Paket Basic mencantumkan masa aktif 6 bulan, sedangkan paket Signature dan Royal mencantumkan masa aktif 1 tahun. Masa aktif bisa ditambah per 6 bulan melalui add-on.
