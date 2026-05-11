export default function handler(req, res) {
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
  res.status(200).json({
    campaignIdeas: [
      'Pakai konten before/after: screenshot chat calon pengantin sebelum dan sesudah lihat demo undangan.',
      'Kasih promo bundling: undangan + website gift registry + QR check-in.',
      'Bikin referral: client lama bawa 1 client baru dapat upgrade tema premium gratis.'
    ],
    hooks: [
      'Undangan kamu masih PDF? Saatnya upgrade ke undangan digital interaktif.',
      'Cuma 1 link, semua info acara langsung beres.',
      'Buka di HP tamu, tampil mewah dalam hitungan detik.'
    ]
  });
}
