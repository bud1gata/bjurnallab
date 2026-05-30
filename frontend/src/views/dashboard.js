const API_URL = 'http://localhost:5000/api/stats';

function formatDate(d) {
    if (!d) return '-';
    return new Date(d).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function formatCurrency(n) {
    if (!n || n === 0) return '-';
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(n);
}

export default async function DashboardView() {
    let stats = {
        totalInventory: 0, rusak: 0, dipinjam: 0, tersedia: 0, perbaikan: 0,
        totalLoan: 0, totalMaintenance: 0, maintenanceCost: 0,
        recentJournals: [], recentLoans: []
    };

    try {
        const res = await fetch(API_URL);
        if (res.ok) stats = await res.json();
    } catch (e) {
        console.error('Error fetching stats:', e);
    }

    const pctTersedia = stats.totalInventory > 0 ? Math.round((stats.tersedia / stats.totalInventory) * 100) : 0;
    const pctDipinjam = stats.totalInventory > 0 ? Math.round((stats.dipinjam / stats.totalInventory) * 100) : 0;
    const pctRusak = stats.totalInventory > 0 ? Math.round((stats.rusak / stats.totalInventory) * 100) : 0;

    // Build recent activity rows from journals and loans combined
    let activityRows = '';
    const activities = [
        ...stats.recentJournals.map(j => ({
            type: 'Praktikum',
            icon: 'science',
            badgeClass: 'bg-secondary-fixed text-on-secondary-fixed',
            detail: `${j.subject} — ${j.topic}`,
            user: j.className,
            time: formatDate(j.createdAt)
        })),
        ...stats.recentLoans.map(l => ({
            type: l.status === 'Menunggu' ? 'Peminjaman' : l.status,
            icon: 'handshake',
            badgeClass: 'bg-tertiary-fixed text-on-tertiary-fixed',
            detail: l.itemName || '-',
            user: l.borrowerName || '-',
            time: formatDate(l.createdAt)
        }))
    ].slice(0, 5);

    if (activities.length === 0) {
        activityRows = `<tr><td colspan="4" class="py-6 text-center text-on-surface-variant font-body-md">Belum ada aktivitas terkini.</td></tr>`;
    } else {
        activityRows = activities.map(a => `
            <tr class="hover:bg-surface-container-lowest transition-colors">
                <td class="p-4">
                    <div class="w-fit px-2.5 py-1 rounded-full ${a.badgeClass} font-label-md text-[10px] uppercase tracking-wider flex items-center gap-1">
                        <span class="material-symbols-outlined text-[14px]">${a.icon}</span> ${a.type}
                    </div>
                </td>
                <td class="p-4 font-medium text-primary">${a.detail}</td>
                <td class="p-4 text-on-surface-variant">${a.user}</td>
                <td class="p-4 text-right text-on-surface-variant font-label-md">${a.time}</td>
            </tr>
        `).join('');
    }

    return `
    <div class="max-w-[1440px] mx-auto flex flex-col gap-stack-lg">
        <!-- Page Header -->
        <div>
            <h2 class="font-display-lg text-display-lg text-primary">Overview Sistem</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">Ringkasan status laboratorium komputer dan jaringan hari ini.</p>
        </div>
        <!-- Hero Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Inventaris</span>
                    <div class="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                        <span class="material-symbols-outlined text-[20px]">devices</span>
                    </div>
                </div>
                <div>
                    <span class="font-display-lg text-display-lg text-primary">${stats.totalInventory}</span>
                    <span class="font-body-md text-body-md text-on-surface-variant ml-2">Unit</span>
                </div>
            </div>
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Alat Rusak</span>
                    <div class="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
                        <span class="material-symbols-outlined text-[20px]">build</span>
                    </div>
                </div>
                <div>
                    <span class="font-display-lg text-display-lg text-error">${stats.rusak}</span>
                </div>
            </div>
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Sedang Dipinjam</span>
                    <div class="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                        <span class="material-symbols-outlined text-[20px]">handshake</span>
                    </div>
                </div>
                <div>
                    <span class="font-display-lg text-display-lg text-primary">${stats.totalLoan}</span>
                    <span class="font-body-md text-body-md text-on-surface-variant ml-2">Alat</span>
                </div>
            </div>
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Pemeliharaan</span>
                    <div class="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                        <span class="material-symbols-outlined text-[20px]">engineering</span>
                    </div>
                </div>
                <div>
                    <span class="font-display-lg text-display-lg text-tertiary">${stats.totalMaintenance}</span>
                    <span class="font-body-md text-body-md text-on-surface-variant ml-2">${formatCurrency(stats.maintenanceCost)}</span>
                </div>
            </div>
        </div>
        <!-- Main Bento Grid Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
            <!-- Left Column: Activities (Span 2) -->
            <div class="lg:col-span-2 flex flex-col gap-stack-lg">
                <!-- Aktivitas Terkini -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant flex justify-between items-center bg-surface/50">
                        <h3 class="font-headline-sm text-headline-sm text-primary">Aktivitas Terkini</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-surface-container-low border-b border-outline-variant text-on-surface-variant">
                                    <th class="p-4 font-label-md text-label-md uppercase font-semibold">Tipe</th>
                                    <th class="p-4 font-label-md text-label-md uppercase font-semibold">Detail</th>
                                    <th class="p-4 font-label-md text-label-md uppercase font-semibold">User/Kelas</th>
                                    <th class="p-4 font-label-md text-label-md uppercase font-semibold text-right">Waktu</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-outline-variant/30 font-body-md text-body-md">
                                ${activityRows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Right Column: Status (Span 1) -->
            <div class="flex flex-col gap-stack-lg">
                <!-- Status Summary -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex-1 flex flex-col">
                    <h3 class="font-headline-sm text-headline-sm text-primary mb-6">Status Perangkat</h3>
                    <div class="flex-1 flex flex-col justify-center gap-6">
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-end">
                                <span class="font-label-md text-label-md text-on-surface-variant uppercase">Baik / Tersedia</span>
                                <span class="font-body-md text-body-md font-semibold text-primary">${pctTersedia}%</span>
                            </div>
                            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div class="h-full bg-secondary rounded-full" style="width:${pctTersedia}%"></div>
                            </div>
                            <span class="font-label-md text-[10px] text-on-surface-variant">${stats.tersedia} Unit</span>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-end">
                                <span class="font-label-md text-label-md text-on-surface-variant uppercase">Sedang Dipinjam</span>
                                <span class="font-body-md text-body-md font-semibold text-primary">${pctDipinjam}%</span>
                            </div>
                            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div class="h-full bg-tertiary-fixed-dim rounded-full" style="width:${pctDipinjam}%"></div>
                            </div>
                            <span class="font-label-md text-[10px] text-on-surface-variant">${stats.dipinjam} Unit</span>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-end">
                                <span class="font-label-md text-label-md text-on-surface-variant uppercase">Rusak / Perbaikan</span>
                                <span class="font-body-md text-body-md font-semibold text-error">${pctRusak}%</span>
                            </div>
                            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div class="h-full bg-error rounded-full" style="width:${pctRusak}%"></div>
                            </div>
                            <span class="font-label-md text-[10px] text-on-surface-variant">${stats.rusak} Unit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
