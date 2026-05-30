export default function DashboardView() {
    return `
    <div class="max-w-[1440px] mx-auto flex flex-col gap-stack-lg">
        <!-- Page Header -->
        <div>
            <h2 class="font-display-lg text-display-lg text-primary">Overview Sistem</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">Ringkasan status laboratorium komputer dan jaringan hari ini.</p>
        </div>
        <!-- Hero Metrics Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-stack-md">
            <!-- Metric 1 -->
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Total Inventaris</span>
                    <div class="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed">
                        <span class="material-symbols-outlined text-[20px]">devices</span>
                    </div>
                </div>
                <div>
                    <span class="font-display-lg text-display-lg text-primary">1,248</span>
                    <span class="font-body-md text-body-md text-on-surface-variant ml-2">Unit</span>
                </div>
            </div>
            <!-- Metric 2 -->
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Alat Rusak</span>
                    <div class="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-on-error-container">
                        <span class="material-symbols-outlined text-[20px]">build</span>
                    </div>
                </div>
                <div class="flex items-baseline gap-2">
                    <span class="font-display-lg text-display-lg text-error">24</span>
                    <span class="font-body-md text-body-md text-error flex items-center"><span class="material-symbols-outlined text-[16px]">arrow_upward</span> 2</span>
                </div>
            </div>
            <!-- Metric 3 -->
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Ruangan Digunakan</span>
                    <div class="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
                        <span class="material-symbols-outlined text-[20px]">meeting_room</span>
                    </div>
                </div>
                <div>
                    <span class="font-display-lg text-display-lg text-primary">85%</span>
                    <span class="font-body-md text-body-md text-on-surface-variant ml-2">3/4 Lab Aktif</span>
                </div>
            </div>
            <!-- Metric 4 -->
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col gap-3">
                <div class="flex justify-between items-start">
                    <span class="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">Stok Bahan Rendah</span>
                    <div class="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed">
                        <span class="material-symbols-outlined text-[20px]">warning</span>
                    </div>
                </div>
                <div class="flex items-baseline gap-2">
                    <span class="font-display-lg text-display-lg text-tertiary">5</span>
                    <span class="font-body-md text-body-md text-on-surface-variant">Item perlu restok</span>
                </div>
            </div>
        </div>
        <!-- Main Bento Grid Area -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-stack-lg">
            <!-- Left Column: Chart & Activities (Span 2) -->
            <div class="lg:col-span-2 flex flex-col gap-stack-lg">
                <!-- Bar Chart Placeholder (Okupansi Lab) -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 h-[340px] flex flex-col">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="font-headline-sm text-headline-sm text-primary">Okupansi Lab Minggu Ini</h3>
                        <button class="text-on-surface-variant hover:text-primary p-1">
                            <span class="material-symbols-outlined">more_vert</span>
                        </button>
                    </div>
                    <!-- Simple CSS Bar Chart Representation -->
                    <div class="flex-1 flex items-end gap-4 px-4 pb-6 pt-2 relative border-b border-l border-outline-variant/50">
                        <!-- Y Axis Labels -->
                        <div class="absolute left-[-20px] top-0 h-full flex flex-col justify-between font-label-md text-label-md text-on-surface-variant/70 pb-6">
                            <span>100%</span>
                            <span>50%</span>
                            <span>0%</span>
                        </div>
                        <!-- Bars -->
                        <div class="flex-1 flex flex-col items-center justify-end gap-2 group">
                            <div class="w-full bg-secondary-fixed group-hover:bg-secondary transition-colors rounded-t-md relative h-[60%]"></div>
                            <span class="font-label-md text-label-md text-on-surface-variant">Sen</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-end gap-2 group">
                            <div class="w-full bg-secondary-fixed group-hover:bg-secondary transition-colors rounded-t-md relative h-[85%]"></div>
                            <span class="font-label-md text-label-md text-on-surface-variant">Sel</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-end gap-2 group">
                            <div class="w-full bg-secondary-fixed group-hover:bg-secondary transition-colors rounded-t-md relative h-[90%] bg-secondary"></div>
                            <span class="font-label-md text-label-md text-primary font-bold">Rab</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-end gap-2 group">
                            <div class="w-full bg-secondary-fixed group-hover:bg-secondary transition-colors rounded-t-md relative h-[70%]"></div>
                            <span class="font-label-md text-label-md text-on-surface-variant">Kam</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-end gap-2 group">
                            <div class="w-full bg-secondary-fixed group-hover:bg-secondary transition-colors rounded-t-md relative h-[40%]"></div>
                            <span class="font-label-md text-label-md text-on-surface-variant">Jum</span>
                        </div>
                    </div>
                </div>
                <!-- Aktivitas Terkini Table/List -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden">
                    <div class="p-5 border-b border-outline-variant flex justify-between items-center bg-surface/50">
                        <h3 class="font-headline-sm text-headline-sm text-primary">Aktivitas Terkini</h3>
                        <a class="font-label-md text-label-md text-secondary hover:underline" href="#">Lihat Semua</a>
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
                                <tr class="hover:bg-surface-container-lowest transition-colors">
                                    <td class="p-4">
                                        <div class="w-fit px-2.5 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-md text-[10px] uppercase tracking-wider flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[14px]">science</span> Praktikum
                                        </div>
                                    </td>
                                    <td class="p-4 font-medium text-primary">Jaringan Komputer Dasar</td>
                                    <td class="p-4 text-on-surface-variant">XI TKJ 1 / Bpk. Budi</td>
                                    <td class="p-4 text-right text-on-surface-variant font-label-md">10:30 AM</td>
                                </tr>
                                <tr class="hover:bg-surface-container-lowest transition-colors">
                                    <td class="p-4">
                                        <div class="w-fit px-2.5 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-[10px] uppercase tracking-wider flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[14px]">handshake</span> Peminjaman
                                        </div>
                                    </td>
                                    <td class="p-4 font-medium text-primary">5x Kabel UTP Cat6, 1x Crimping Tool</td>
                                    <td class="p-4 text-on-surface-variant">Siswa: Andi (XII TKJ 2)</td>
                                    <td class="p-4 text-right text-on-surface-variant font-label-md">09:15 AM</td>
                                </tr>
                                <tr class="hover:bg-surface-container-lowest transition-colors">
                                    <td class="p-4">
                                        <div class="w-fit px-2.5 py-1 rounded-full bg-error-container text-on-error-container font-label-md text-[10px] uppercase tracking-wider flex items-center gap-1">
                                            <span class="material-symbols-outlined text-[14px]">report</span> Laporan Rusak
                                        </div>
                                    </td>
                                    <td class="p-4 font-medium text-primary">Monitor PC-05 (Lab Jaringan) Mati</td>
                                    <td class="p-4 text-on-surface-variant">Laboran</td>
                                    <td class="p-4 text-right text-on-surface-variant font-label-md">Kemarin</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <!-- Right Column: Status & Warnings (Span 1) -->
            <div class="flex flex-col gap-stack-lg">
                <!-- Peringatan Stok (Bento Card Highlighting Action) -->
                <div class="bg-surface-container-lowest border-2 border-tertiary-fixed rounded-xl p-5 shadow-[0_4px_12px_rgba(0,0,0,0.02)] relative overflow-hidden">
                    <!-- Decor -->
                    <div class="absolute top-0 right-0 w-24 h-24 bg-tertiary-fixed/30 rounded-bl-full -z-10"></div>
                    <div class="flex items-center gap-2 mb-4">
                        <span class="material-symbols-outlined text-tertiary">warning</span>
                        <h3 class="font-headline-sm text-headline-sm text-tertiary">Peringatan Stok</h3>
                    </div>
                    <ul class="flex flex-col gap-3">
                        <li class="p-3 border border-outline-variant/50 rounded-lg bg-surface-bright flex justify-between items-center group hover:border-tertiary transition-colors">
                            <div>
                                <p class="font-body-md text-body-md font-semibold text-primary">Konektor RJ45</p>
                                <p class="font-label-md text-label-md text-on-surface-variant">Min. 50 pcs</p>
                            </div>
                            <div class="text-right">
                                <p class="font-headline-sm text-headline-sm text-error">12 <span class="text-body-md font-normal">pcs</span></p>
                            </div>
                        </li>
                        <li class="p-3 border border-outline-variant/50 rounded-lg bg-surface-bright flex justify-between items-center group hover:border-tertiary transition-colors">
                            <div>
                                <p class="font-body-md text-body-md font-semibold text-primary">Timah Solder</p>
                                <p class="font-label-md text-label-md text-on-surface-variant">Min. 5 roll</p>
                            </div>
                            <div class="text-right">
                                <p class="font-headline-sm text-headline-sm text-error">2 <span class="text-body-md font-normal">roll</span></p>
                            </div>
                        </li>
                    </ul>
                    <button class="mt-4 w-full bg-surface border border-outline-variant text-primary py-2 rounded-lg font-label-md text-label-md hover:bg-surface-container-high transition-colors">
                        Buat Permintaan Barang
                    </button>
                </div>
                <!-- Status Summary for Inventory -->
                <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 flex-1 flex flex-col">
                    <h3 class="font-headline-sm text-headline-sm text-primary mb-6">Status Perangkat Keras</h3>
                    <div class="flex-1 flex flex-col justify-center gap-6">
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-end">
                                <span class="font-label-md text-label-md text-on-surface-variant uppercase">Baik / Tersedia</span>
                                <span class="font-body-md text-body-md font-semibold text-primary">92%</span>
                            </div>
                            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div class="h-full bg-secondary w-[92%] rounded-full"></div>
                            </div>
                            <span class="font-label-md text-[10px] text-on-surface-variant">1,148 Unit</span>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-end">
                                <span class="font-label-md text-label-md text-on-surface-variant uppercase">Sedang Dipinjam</span>
                                <span class="font-body-md text-body-md font-semibold text-primary">6%</span>
                            </div>
                            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div class="h-full bg-tertiary-fixed-dim w-[6%] rounded-full"></div>
                            </div>
                            <span class="font-label-md text-[10px] text-on-surface-variant">76 Unit</span>
                        </div>
                        <div class="flex flex-col gap-1.5">
                            <div class="flex justify-between items-end">
                                <span class="font-label-md text-label-md text-on-surface-variant uppercase">Rusak / Perbaikan</span>
                                <span class="font-body-md text-body-md font-semibold text-error">2%</span>
                            </div>
                            <div class="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
                                <div class="h-full bg-error w-[2%] rounded-full"></div>
                            </div>
                            <span class="font-label-md text-[10px] text-on-surface-variant">24 Unit</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}
