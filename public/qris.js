const params = new URLSearchParams(window.location.search);
const packageName = params.get('paket') || 'Paket Serenara';
const nominal = params.get('nominal') || '';
const packageInput = document.getElementById('packageName');
const nominalInput = document.getElementById('nominal');
const form = document.getElementById('paymentForm');

if (packageInput) packageInput.value = packageName;
if (nominalInput) nominalInput.value = nominal;

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const buyerName = document.getElementById('buyerName')?.value.trim();
  const selectedPackage = packageInput?.value.trim();
  const selectedNominal = nominalInput?.value.trim();
  const note = document.getElementById('note')?.value.trim();
  const message = [
    'Halo Admin Serenara Studio, saya sudah melakukan pembayaran QRIS.',
    `Nama: ${buyerName}`,
    `Paket: ${selectedPackage}`,
    `Nominal: Rp ${Number(selectedNominal || 0).toLocaleString('id-ID')}`,
    note ? `Catatan: ${note}` : '',
    'Mohon dibantu proses undangan saya ya.',
  ].filter(Boolean).join('\n');
  window.open(`https://wa.me/6281995452717?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
});
