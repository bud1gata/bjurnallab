const API_URL = 'http://localhost:5000/api/maintenance';

function formatDate(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatCurrency(n) {
    if (!n || n === 0) return '-';
    return new Intl.NumberFormat('id-ID').format(n);
}

function getStatusBadge(status) {
    const map = {
        'Selesai': 'bg-[#e6f4ea] text-[#137333]',
        'Proses': 'bg-[#fef7e0] text-[#b06000]',
        'Batal': 'bg-[#fce8e6] text-[#c5221f]',
    };
    return map[status] || 'bg-surface-variant text-on-surface-variant';
}

export default async function LaporanView() {
    let records = [];
    try {
        const res = await fetch(API_URL);
        if (res.ok) records = await res.json();
    } catch (e) {
        console.error('Error fetching maintenance:', e);
    }

    const totalCost = records.reduce((sum, r) => sum + (r.cost || 0), 0);
    const totalRepairs = records.length;

    let rowsHTML = '';
    if (records.length === 0) {
        rowsHTML = `<tr><td colspan="6" class="py-8 text-center text-on-surface-variant font-body-md">Belum ada data pemeliharaan.</td></tr>`;
    } else {
        rowsHTML = records.map((r, i) => `
            <tr class="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors ${i % 2 !== 0 ? 'bg-surface-container-lowest/50' : ''}">
                <td class="p-4 text-on-surface whitespace-nowrap">${formatDate(r.date)}</td>
                <td class="p-4 font-semibold text-primary">${r.itemName || '-'}</td>
                <td class="p-4 text-on-surface-variant">${r.type}</td>
                <td class="p-4 text-on-surface">${formatCurrency(r.cost)}</td>
                <td class="p-4 text-on-surface-variant max-w-xs truncate">${r.notes || '-'}</td>
                <td class="p-4">
                    <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${getStatusBadge(r.status)}">${r.status}</span>
                </td>
            </tr>
        `).join('');
    }

    return `
    <div class="mb-stack-lg">
        <h1 class="font-display-lg text-display-lg text-primary mb-2">Laporan &amp; Pemeliharaan</h1>
        <p class="font-body-md text-body-md text-on-surface-variant">Hasilkan laporan komprehensif dan pantau riwayat pemeliharaan aset laboratorium.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        <!-- Left Column -->
        <div class="lg:col-span-4 flex flex-col gap-stack-lg">
            <!-- Report Generator Form -->
            <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md">
                <h3 class="font-headline-sm text-headline-sm text-primary mb-6 flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary">description</span>
                    Generator Laporan
                </h3>
                <form class="space-y-5" onsubmit="event.preventDefault()">
                    <div>
                        <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Jenis Laporan</label>
                        <select class="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors appearance-none">
                            <option>Pilih Jenis Laporan</option>
                            <option>Jurnal Harian</option>
                            <option>Inventaris Alat</option>
                            <option>Peminjaman &amp; Pengembalian</option>
                            <option>Riwayat Pemeliharaan</option>
                        </select>
                    </div>
                    <div class="grid grid-cols-2 gap-3">
                        <div>
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Dari Tanggal</label>
                            <input class="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" type="date"/>
                        </div>
                        <div>
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Sampai Tanggal</label>
                            <input class="w-full bg-surface-container-low border border-outline-variant/50 rounded-lg px-3 py-2 font-body-md text-body-md text-on-surface focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-colors" type="date"/>
                        </div>
                    </div>
                    <div>
                        <label class="block font-label-md text-label-md text-on-surface-variant mb-2">Format Ekspor</label>
                        <div class="flex gap-4">
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input checked="" class="text-secondary focus:ring-secondary h-4 w-4" name="format" type="radio"/>
                                <span class="font-body-md text-body-md text-on-surface">PDF</span>
                            </label>
                            <label class="flex items-center gap-2 cursor-pointer">
                                <input class="text-secondary focus:ring-secondary h-4 w-4" name="format" type="radio"/>
                                <span class="font-body-md text-body-md text-on-surface">Excel (.xlsx)</span>
                            </label>
                        </div>
                    </div>
                    <button class="w-full mt-4 bg-secondary hover:bg-secondary/90 text-on-secondary font-label-md text-label-md py-3 rounded-lg flex items-center justify-center gap-2 transition-colors" type="button">
                        <span class="material-symbols-outlined text-[18px]">download</span>
                        Generate Laporan
                    </button>
                </form>
            </div>
            <!-- Summary -->
            <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md flex-grow">
                <h3 class="font-headline-sm text-headline-sm text-primary mb-4">Tren Pemeliharaan</h3>
                <p class="font-label-md text-label-md text-on-surface-variant mb-6 uppercase tracking-wider">Seluruh Periode</p>
                <div class="space-y-4">
                    <div class="flex justify-between items-end">
                        <div>
                            <p class="font-display-lg text-display-lg text-primary">${totalRepairs}</p>
                            <p class="font-body-md text-body-md text-on-surface-variant">Total Perbaikan</p>
                        </div>
                    </div>
                    <div class="pt-4 border-t border-outline-variant/30">
                        <p class="font-label-md text-label-md text-on-surface-variant mb-2">Estimasi Biaya</p>
                        <p class="font-headline-md text-headline-md text-primary">Rp ${formatCurrency(totalCost)}</p>
                    </div>
                </div>
            </div>
        </div>
        <!-- Right Column: Table -->
        <div class="lg:col-span-8">
            <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden h-full flex flex-col">
                <div class="p-stack-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
                    <h3 class="font-headline-sm text-headline-sm text-primary">Riwayat Pemeliharaan</h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-surface-container-low border-b border-outline-variant/30">
                                <th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase">Tanggal</th>
                                <th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase">Nama Alat</th>
                                <th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase">Jenis</th>
                                <th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase">Biaya (Rp)</th>
                                <th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase">Catatan Teknisi</th>
                                <th class="p-4 font-label-md text-label-md text-on-surface-variant uppercase">Status</th>
                            </tr>
                        </thead>
                        <tbody class="font-body-md text-body-md">
                            ${rowsHTML}
                        </tbody>
                    </table>
                </div>
                <div class="mt-auto p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
                    <span class="font-body-md text-body-md text-on-surface-variant">Menampilkan ${records.length} entri</span>
                </div>
            </div>
        </div>
    </div>
    `;
}
