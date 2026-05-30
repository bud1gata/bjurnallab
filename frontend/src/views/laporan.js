export default function LaporanView() {
    return `
    <div class="mb-stack-lg">
        <h1 class="font-display-lg text-display-lg text-primary mb-2">Laporan &amp; Pemeliharaan</h1>
        <p class="font-body-md text-body-md text-on-surface-variant">Hasilkan laporan komprehensif dan pantau riwayat pemeliharaan aset laboratorium.</p>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-stack-lg">
        <!-- Left Column: Report Generator & Summary -->
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
            <!-- Maintenance Trends Visual Summary -->
            <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl p-stack-md flex-grow">
                <h3 class="font-headline-sm text-headline-sm text-primary mb-4">Tren Pemeliharaan</h3>
                <p class="font-label-md text-label-md text-on-surface-variant mb-6 uppercase tracking-wider">30 Hari Terakhir</p>
                <div class="space-y-4">
                    <div class="flex justify-between items-end">
                        <div>
                            <p class="font-display-lg text-display-lg text-primary">12</p>
                            <p class="font-body-md text-body-md text-on-surface-variant">Total Perbaikan</p>
                        </div>
                        <div class="bg-error-container text-on-error-container px-2 py-1 rounded font-label-md text-label-md flex items-center gap-1">
                            <span class="material-symbols-outlined text-[14px]">trending_up</span>
                            +2 dari bln lalu
                        </div>
                    </div>
                    <div class="pt-4 border-t border-outline-variant/30">
                        <p class="font-label-md text-label-md text-on-surface-variant mb-2">Estimasi Biaya</p>
                        <p class="font-headline-md text-headline-md text-primary">Rp 1.450.000</p>
                    </div>
                    <!-- Dummy Bar Chart representation -->
                    <div class="h-24 flex items-end gap-2 pt-4">
                        <div class="w-1/6 bg-secondary/20 rounded-t h-[30%]"></div>
                        <div class="w-1/6 bg-secondary/40 rounded-t h-[60%]"></div>
                        <div class="w-1/6 bg-secondary/30 rounded-t h-[40%]"></div>
                        <div class="w-1/6 bg-secondary/80 rounded-t h-[90%] relative group cursor-pointer">
                            <!-- Tooltip -->
                            <div class="absolute -top-8 left-1/2 -translate-x-1/2 bg-inverse-surface text-inverse-on-surface text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                                Minggu 4: 5 Perbaikan
                            </div>
                        </div>
                        <div class="w-1/6 bg-secondary/50 rounded-t h-[50%]"></div>
                        <div class="w-1/6 bg-secondary/20 rounded-t h-[20%]"></div>
                    </div>
                    <div class="flex justify-between font-label-md text-[10px] text-on-surface-variant">
                        <span>M1</span>
                        <span>M2</span>
                        <span>M3</span>
                        <span>M4</span>
                        <span>M5</span>
                        <span>M6</span>
                    </div>
                </div>
            </div>
        </div>
        <!-- Right Column: Maintenance Log Table -->
        <div class="lg:col-span-8">
            <div class="bg-surface-container-lowest border border-outline-variant/30 rounded-xl overflow-hidden h-full flex flex-col">
                <div class="p-stack-md border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-lowest">
                    <h3 class="font-headline-sm text-headline-sm text-primary">Riwayat Pemeliharaan</h3>
                    <button class="text-secondary font-label-md text-label-md flex items-center gap-1 hover:underline">
                        Lihat Semua
                        <span class="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
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
                            <tr class="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors">
                                <td class="p-4 text-on-surface whitespace-nowrap">12 Okt 2023</td>
                                <td class="p-4 font-semibold text-primary">Mikroskop Binokuler #04</td>
                                <td class="p-4 text-on-surface-variant">Perbaikan</td>
                                <td class="p-4 text-on-surface">250.000</td>
                                <td class="p-4 text-on-surface-variant max-w-xs truncate">Lensa objektif 40x buram, dibersihkan dan dikalibrasi ulang.</td>
                                <td class="p-4">
                                    <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#137333]">Selesai</span>
                                </td>
                            </tr>
                            <tr class="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors bg-surface-container-lowest/50">
                                <td class="p-4 text-on-surface whitespace-nowrap">08 Okt 2023</td>
                                <td class="p-4 font-semibold text-primary">Neraca Analitik Ohaus</td>
                                <td class="p-4 text-on-surface-variant">Kalibrasi</td>
                                <td class="p-4 text-on-surface">150.000</td>
                                <td class="p-4 text-on-surface-variant max-w-xs truncate">Kalibrasi rutin tahunan, hasil akurat.</td>
                                <td class="p-4">
                                    <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#137333]">Selesai</span>
                                </td>
                            </tr>
                            <tr class="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors">
                                <td class="p-4 text-on-surface whitespace-nowrap">05 Okt 2023</td>
                                <td class="p-4 font-semibold text-primary">Centrifuge 8-hole</td>
                                <td class="p-4 text-on-surface-variant">Penggantian Suku Cadang</td>
                                <td class="p-4 text-on-surface">850.000</td>
                                <td class="p-4 text-on-surface-variant max-w-xs truncate">Motor rotor berdengung keras, perlu ganti bearing. Menunggu sparepart.</td>
                                <td class="p-4">
                                    <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#fef7e0] text-[#b06000]">Proses</span>
                                </td>
                            </tr>
                            <tr class="border-b border-outline-variant/20 hover:bg-surface-container/30 transition-colors bg-surface-container-lowest/50">
                                <td class="p-4 text-on-surface whitespace-nowrap">28 Sep 2023</td>
                                <td class="p-4 font-semibold text-primary">Hot Plate Stirrer</td>
                                <td class="p-4 text-on-surface-variant">Pengecekan</td>
                                <td class="p-4 text-on-surface">-</td>
                                <td class="p-4 text-on-surface-variant max-w-xs truncate">Pemanas tidak berfungsi maksimal, elemen pemanas mulai aus.</td>
                                <td class="p-4">
                                    <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#fce8e6] text-[#c5221f]">Rusak</span>
                                </td>
                            </tr>
                            <tr class="hover:bg-surface-container/30 transition-colors">
                                <td class="p-4 text-on-surface whitespace-nowrap">15 Sep 2023</td>
                                <td class="p-4 font-semibold text-primary">Spektrofotometer UV-Vis</td>
                                <td class="p-4 text-on-surface-variant">Maintenance Rutin</td>
                                <td class="p-4 text-on-surface">200.000</td>
                                <td class="p-4 text-on-surface-variant max-w-xs truncate">Pembersihan kompartemen sampel dan pengecekan lampu. Normal.</td>
                                <td class="p-4">
                                    <span class="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-[#e6f4ea] text-[#137333]">Selesai</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- Pagination -->
                <div class="mt-auto p-4 border-t border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest">
                    <span class="font-body-md text-body-md text-on-surface-variant">Menampilkan 1-5 dari 42 entri</span>
                    <div class="flex gap-1">
                        <button class="w-8 h-8 rounded border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50" disabled="">
                            <span class="material-symbols-outlined text-[18px]">chevron_left</span>
                        </button>
                        <button class="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-body-md text-sm">1</button>
                        <button class="w-8 h-8 rounded border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low font-body-md text-sm">2</button>
                        <button class="w-8 h-8 rounded border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low font-body-md text-sm">3</button>
                        <span class="w-8 h-8 flex items-center justify-center text-on-surface-variant">...</span>
                        <button class="w-8 h-8 rounded border border-outline-variant/50 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low">
                            <span class="material-symbols-outlined text-[18px]">chevron_right</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
}
