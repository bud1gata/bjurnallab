export default function JurnalView() {
    return `
    <header class="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 class="font-display-lg text-display-lg md:text-display-lg text-primary">Jurnal Harian Guru</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2">Catat aktivitas dan penggunaan alat laboratorium hari ini.</p>
        </div>
        <div class="text-right">
            <p class="font-headline-sm text-headline-sm text-primary">Kamis, 24 Oktober 2023</p>
        </div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <!-- Left Column: Timeline & Schedule -->
        <section class="lg:col-span-4 flex flex-col gap-stack-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
                <h3 class="font-headline-sm text-headline-sm text-primary border-b border-outline-variant pb-3 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary">calendar_today</span> Jadwal Hari Ini
                </h3>
                <div class="relative pl-6 border-l-2 border-surface-variant space-y-6">
                    <!-- Timeline Item 1 -->
                    <div class="relative">
                        <div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-secondary border-4 border-surface-container-lowest"></div>
                        <div class="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50">
                            <span class="font-label-md text-label-md text-secondary block mb-1">08:00 - 09:30</span>
                            <h4 class="font-headline-sm text-body-lg font-semibold text-primary">XII TKJ 1</h4>
                            <p class="font-body-md text-body-md text-on-surface-variant">Instalasi Jaringan LAN</p>
                            <div class="mt-2 inline-flex items-center gap-1 bg-surface-container-high px-2 py-1 rounded-sm">
                                <span class="material-symbols-outlined text-[14px] text-primary">check_circle</span>
                                <span class="font-label-md text-[10px] text-primary">Selesai</span>
                            </div>
                        </div>
                    </div>
                    <!-- Timeline Item 2 (Active) -->
                    <div class="relative">
                        <div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-error border-4 border-surface-container-lowest animate-pulse"></div>
                        <div class="bg-surface-container-lowest p-3 rounded-lg border-2 border-secondary shadow-[0_4px_12px_rgba(0,0,0,0.05)]">
                            <span class="font-label-md text-label-md text-error block mb-1">10:00 - 11:30</span>
                            <h4 class="font-headline-sm text-body-lg font-semibold text-primary">XI RPL 2</h4>
                            <p class="font-body-md text-body-md text-on-surface-variant">Pemrograman Web Dasar</p>
                            <div class="mt-2 inline-flex items-center gap-1 bg-secondary/10 px-2 py-1 rounded-sm border border-secondary/20">
                                <span class="material-symbols-outlined text-[14px] text-secondary" style="font-variation-settings: 'FILL' 1;">play_circle</span>
                                <span class="font-label-md text-[10px] text-secondary">Sedang Berlangsung</span>
                            </div>
                        </div>
                    </div>
                    <!-- Timeline Item 3 -->
                    <div class="relative">
                        <div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-surface-tint border-4 border-surface-container-lowest"></div>
                        <div class="bg-surface-container-lowest p-3 rounded-lg border border-outline-variant/50 opacity-60">
                            <span class="font-label-md text-label-md text-on-surface-variant block mb-1">13:00 - 14:30</span>
                            <h4 class="font-headline-sm text-body-lg font-semibold text-primary">X MM 1</h4>
                            <p class="font-body-md text-body-md text-on-surface-variant">Desain Grafis</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Right Column: Entry Form -->
        <section class="lg:col-span-8 flex flex-col gap-stack-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                <h3 class="font-headline-md text-headline-md text-primary mb-6">Buat Jurnal Baru</h3>
                <form class="space-y-6" onsubmit="event.preventDefault()">
                    <!-- Check In/Out Row -->
                    <div class="flex flex-col sm:flex-row gap-4 p-4 bg-surface-container-low rounded-lg border border-outline-variant/50">
                        <div class="flex-1 flex flex-col items-center justify-center gap-2 p-4 bg-surface-container-lowest rounded border border-outline-variant hover:border-secondary transition-colors cursor-pointer group">
                            <span class="material-symbols-outlined text-3xl text-secondary group-hover:scale-110 transition-transform">login</span>
                            <span class="font-label-md text-label-md text-primary">Check-In</span>
                            <span class="font-body-md text-xs text-on-surface-variant">--:--</span>
                        </div>
                        <div class="flex-1 flex flex-col items-center justify-center gap-2 p-4 bg-surface-container-lowest rounded border border-outline-variant opacity-50 cursor-not-allowed">
                            <span class="material-symbols-outlined text-3xl text-on-surface-variant">logout</span>
                            <span class="font-label-md text-label-md text-primary">Check-Out</span>
                            <span class="font-body-md text-xs text-on-surface-variant">Menunggu Check-in</span>
                        </div>
                    </div>
                    <!-- Basic Info Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Kelas</label>
                            <select class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 appearance-none">
                                <option>Pilih Kelas</option>
                                <option>XI RPL 2</option>
                                <option>XII TKJ 1</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Mata Pelajaran</label>
                            <input class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20" placeholder="Contoh: Pemrograman Web" type="text"/>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="sm:col-span-1">
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Jumlah Siswa Hadir</label>
                            <input class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20" placeholder="0" type="number"/>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Materi Praktik</label>
                            <textarea class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20" placeholder="Deskripsikan materi praktik hari ini..." rows="3"></textarea>
                        </div>
                    </div>
                    <hr class="border-outline-variant"/>
                    <!-- Penggunaan Bahan -->
                    <div>
                        <h4 class="font-headline-sm text-headline-sm text-primary mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined text-secondary text-lg">science</span> Penggunaan Bahan / Alat Habis Pakai
                        </h4>
                        <div class="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden">
                            <table class="w-full text-left font-body-md">
                                <thead class="bg-surface-container-low border-b border-outline-variant font-label-md text-label-md">
                                    <tr>
                                        <th class="p-3">Nama Barang</th>
                                        <th class="p-3 w-24">Jumlah</th>
                                        <th class="p-3 w-16"></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-outline-variant/50">
                                    <tr class="hover:bg-surface-container-lowest transition-colors">
                                        <td class="p-3">
                                            <select class="w-full bg-transparent border-0 p-0 focus:ring-0 font-body-md">
                                                <option>Konektor RJ45</option>
                                                <option>Kabel UTP (meter)</option>
                                            </select>
                                        </td>
                                        <td class="p-3">
                                            <input class="w-full bg-transparent border border-outline-variant rounded px-2 py-1 text-center font-body-md" type="number" value="5"/>
                                        </td>
                                        <td class="p-3 text-center">
                                            <button class="text-error hover:bg-error-container p-1 rounded transition-colors" type="button"><span class="material-symbols-outlined text-[18px]">delete</span></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="p-2 border-t border-outline-variant bg-surface-container-lowest">
                                <button class="text-secondary font-label-md text-label-md flex items-center gap-1 hover:underline p-1" type="button"><span class="material-symbols-outlined text-[16px]">add</span> Tambah Baris</button>
                            </div>
                        </div>
                    </div>
                    <hr class="border-outline-variant"/>
                    <!-- Laporan Kerusakan -->
                    <div>
                        <h4 class="font-headline-sm text-headline-sm text-error mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined text-error text-lg">warning</span> Laporan Kerusakan (Opsional)
                        </h4>
                        <div class="bg-error-container/20 border border-error/30 rounded-lg p-4">
                            <div class="mb-3">
                                <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Pilih Alat/Inventaris Bermasalah</label>
                                <select class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-error focus:ring-1 focus:ring-error/20 appearance-none">
                                    <option>Tidak ada kerusakan</option>
                                    <option>PC Client 04 - Monitor Mati</option>
                                    <option>Switch Hub Utama - Port Error</option>
                                </select>
                            </div>
                            <div>
                                <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Keterangan Kerusakan</label>
                                <textarea class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-error focus:ring-1 focus:ring-error/20" placeholder="Jelaskan detail kerusakan jika ada..." rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- Submit Actions -->
                    <div class="flex justify-end gap-3 pt-4">
                        <button class="px-4 py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant rounded-DEFAULT transition-colors" type="button">Batal</button>
                        <button class="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-DEFAULT hover:bg-primary-container transition-colors shadow-sm" type="button">Simpan Jurnal</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    `
}
