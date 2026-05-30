const API_URL = 'http://localhost:5000/api/loan';

function getStatusBadge(status) {
    const map = {
        'Menunggu': 'bg-tertiary-fixed text-on-tertiary-fixed',
        'Dipinjam': 'bg-primary-fixed text-on-primary-fixed',
        'Dikembalikan': 'bg-[#e6f4ea] text-[#137333]',
        'Ditolak': 'bg-[#fce8e6] text-[#c5221f]',
    };
    return map[status] || 'bg-surface-variant text-on-surface-variant';
}

function getInitials(name) {
    return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

export default async function PeminjamanView() {
    let loans = [];
    try {
        const res = await fetch(API_URL);
        if (res.ok) loans = await res.json();
    } catch (e) {
        console.error('Error fetching loans:', e);
    }

    const stats = {
        menunggu: loans.filter(l => l.status === 'Menunggu').length,
        dipinjam: loans.filter(l => l.status === 'Dipinjam').length,
        jatuhTempo: loans.filter(l => {
            if (l.status !== 'Dipinjam') return false;
            const exp = new Date(l.expectedReturnDate);
            const today = new Date();
            return exp.toDateString() === today.toDateString() || exp < today;
        }).length
    };

    let rowsHTML = '';
    if (loans.length === 0) {
        rowsHTML = `<tr><td colspan="6" class="py-8 text-center text-on-surface-variant font-body-md">Belum ada data peminjaman.</td></tr>`;
    } else {
        rowsHTML = loans.map((loan, i) => {
            const name = loan.borrowerName || 'Pengguna';
            const role = loan.borrowerRole || '';
            const itemName = loan.itemName || 'Alat';

            let actionHTML = '';
            if (loan.status === 'Menunggu') {
                actionHTML = `
                    <div class="flex justify-end gap-2">
                        <button onclick="window._updateLoan('${loan._id}', 'Dipinjam')" class="bg-secondary text-on-secondary font-label-md text-label-md px-3 py-1.5 rounded-lg hover:bg-secondary/90 transition-colors">Setujui</button>
                        <button onclick="window._updateLoan('${loan._id}', 'Ditolak')" class="bg-surface border border-outline text-on-surface font-label-md text-label-md px-3 py-1.5 rounded-lg hover:bg-surface-variant transition-colors">Tolak</button>
                    </div>`;
            } else if (loan.status === 'Dipinjam') {
                actionHTML = `<button onclick="window._updateLoan('${loan._id}', 'Dikembalikan')" class="bg-surface border border-secondary text-secondary font-label-md text-label-md px-3 py-1.5 rounded-lg hover:bg-secondary-fixed transition-colors">Selesai</button>`;
            } else {
                actionHTML = `<span class="text-on-surface-variant font-label-md text-label-md">—</span>`;
            }

            return `
            <tr class="border-b border-surface-variant hover:bg-surface-container-lowest/50 transition-colors ${i % 2 !== 0 ? 'bg-surface-container-lowest' : ''}">
                <td class="py-4 px-stack-md">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed font-label-md text-label-md">${getInitials(name)}</div>
                        <div>
                            <p class="font-semibold text-on-background">${name}</p>
                            <p class="text-on-surface-variant text-xs">${role}</p>
                        </div>
                    </div>
                </td>
                <td class="py-4 px-stack-md text-on-background">${itemName}</td>
                <td class="py-4 px-stack-md text-on-surface-variant">${formatDate(loan.requestDate)}</td>
                <td class="py-4 px-stack-md text-on-surface-variant">${formatDate(loan.expectedReturnDate)}</td>
                <td class="py-4 px-stack-md">
                    <span class="inline-flex items-center px-2 py-1 rounded-md ${getStatusBadge(loan.status)} font-label-md text-label-md uppercase tracking-wider text-[10px]">${loan.status}</span>
                </td>
                <td class="py-4 px-stack-md text-right">${actionHTML}</td>
            </tr>`;
        }).join('');
    }

    return `
    <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-stack-lg">
        <div>
            <h2 class="font-display-lg text-display-lg text-on-background">Manajemen Peminjaman</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">Kelola permintaan dan status alat yang sedang dipinjam.</p>
        </div>
    </div>
    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-stack-md mb-stack-lg">
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex items-center justify-between">
            <div>
                <p class="font-label-md text-label-md text-on-surface-variant uppercase">Permintaan Baru</p>
                <p class="font-headline-md text-headline-md text-on-background mt-1">${stats.menunggu}</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">pending_actions</span>
            </div>
        </div>
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex items-center justify-between">
            <div>
                <p class="font-label-md text-label-md text-on-surface-variant uppercase">Sedang Dipinjam</p>
                <p class="font-headline-md text-headline-md text-on-background mt-1">${stats.dipinjam}</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">science</span>
            </div>
        </div>
        <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md flex items-center justify-between">
            <div>
                <p class="font-label-md text-label-md text-on-surface-variant uppercase">Jatuh Tempo Hari Ini</p>
                <p class="font-headline-md text-headline-md text-error mt-1">${stats.jatuhTempo}</p>
            </div>
            <div class="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-on-error-container">
                <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">warning</span>
            </div>
        </div>
    </div>
    <!-- Table -->
    <div class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden flex flex-col">
        <div class="bg-surface-container-low px-stack-md py-4 border-b border-outline-variant flex justify-between items-center">
            <h3 class="font-headline-sm text-headline-sm text-on-background">Daftar Peminjaman</h3>
        </div>
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-surface-container-low border-b border-outline-variant">
                        <th class="py-3 px-stack-md font-label-md text-label-md text-on-surface-variant uppercase">Peminjam</th>
                        <th class="py-3 px-stack-md font-label-md text-label-md text-on-surface-variant uppercase">Nama Alat</th>
                        <th class="py-3 px-stack-md font-label-md text-label-md text-on-surface-variant uppercase">Tgl Pinjam</th>
                        <th class="py-3 px-stack-md font-label-md text-label-md text-on-surface-variant uppercase">Estimasi Kembali</th>
                        <th class="py-3 px-stack-md font-label-md text-label-md text-on-surface-variant uppercase">Status</th>
                        <th class="py-3 px-stack-md font-label-md text-label-md text-on-surface-variant uppercase text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="font-body-md text-body-md">
                    ${rowsHTML}
                </tbody>
            </table>
        </div>
    </div>
    `;
}
