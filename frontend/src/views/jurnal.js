const API_URL = 'http://localhost:5000/api/journal';

function formatDate(d) {
    return new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

export default async function JurnalView() {
    let journals = [];
    try {
        const res = await fetch(API_URL);
        if (res.ok) journals = await res.json();
    } catch (e) {
        console.error('Error fetching journals:', e);
    }

    const today = formatDate(new Date());

    // Build recent journal entries for the timeline
    const timelineHTML = journals.length === 0
        ? `<p class="text-on-surface-variant font-body-md p-4">Belum ada catatan jurnal.</p>`
        : journals.slice(0, 5).map((j, i) => {
            const isFirst = i === 0;
            return `
            <div class="relative">
                <div class="absolute -left-[31px] top-1 w-4 h-4 rounded-full ${isFirst ? 'bg-secondary' : 'bg-surface-tint'} border-4 border-surface-container-lowest"></div>
                <div class="bg-surface-container-low p-3 rounded-lg border border-outline-variant/50 ${!isFirst ? 'opacity-70' : ''}">
                    <span class="font-label-md text-label-md ${isFirst ? 'text-secondary' : 'text-on-surface-variant'} block mb-1">${j.className}</span>
                    <h4 class="font-headline-sm text-body-lg font-semibold text-primary">${j.subject}</h4>
                    <p class="font-body-md text-body-md text-on-surface-variant">${j.topic}</p>
                    <div class="mt-2 flex items-center gap-3 text-on-surface-variant">
                        <span class="font-label-md text-[10px] flex items-center gap-1"><span class="material-symbols-outlined text-[14px]">group</span> ${j.studentCount} siswa</span>
                    </div>
                </div>
            </div>`;
        }).join('');

    return `
    <header class="mb-stack-lg flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
            <h2 class="font-display-lg text-display-lg md:text-display-lg text-primary">Jurnal Harian Guru</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-2">Catat aktivitas dan penggunaan alat laboratorium hari ini.</p>
        </div>
        <div class="text-right">
            <p class="font-headline-sm text-headline-sm text-primary">${today}</p>
        </div>
    </header>
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        <!-- Left Column: Recent Journals Timeline -->
        <section class="lg:col-span-4 flex flex-col gap-stack-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-md">
                <h3 class="font-headline-sm text-headline-sm text-primary border-b border-outline-variant pb-3 mb-4 flex items-center gap-2">
                    <span class="material-symbols-outlined text-secondary">history</span> Jurnal Terbaru
                </h3>
                <div class="relative pl-6 border-l-2 border-surface-variant space-y-6">
                    ${timelineHTML}
                </div>
            </div>
        </section>
        <!-- Right Column: Entry Form -->
        <section class="lg:col-span-8 flex flex-col gap-stack-md">
            <div class="bg-surface-container-lowest border border-outline-variant rounded-xl p-stack-lg shadow-[0_4px_12px_rgba(0,0,0,0.02)]">
                <h3 class="font-headline-md text-headline-md text-primary mb-6">Buat Jurnal Baru</h3>
                <form class="space-y-6" onsubmit="window._submitJournal(event)">
                    <!-- Basic Info Grid -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Kelas</label>
                            <select name="className" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20 appearance-none" required>
                                <option value="">Pilih Kelas</option>
                                <option>X MM 1</option>
                                <option>XI RPL 2</option>
                                <option>XII TKJ 1</option>
                                <option>XII TKJ 2</option>
                            </select>
                        </div>
                        <div>
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Mata Pelajaran</label>
                            <input name="subject" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20" placeholder="Contoh: Pemrograman Web" type="text" required/>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div class="sm:col-span-1">
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Jumlah Siswa Hadir</label>
                            <input name="studentCount" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20" placeholder="0" type="number" required/>
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Materi Praktik</label>
                            <textarea name="topic" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary/20" placeholder="Deskripsikan materi praktik hari ini..." rows="3" required></textarea>
                        </div>
                    </div>
                    <hr class="border-outline-variant"/>
                    <!-- Laporan Kerusakan -->
                    <div>
                        <h4 class="font-headline-sm text-headline-sm text-error mb-3 flex items-center gap-2">
                            <span class="material-symbols-outlined text-error text-lg">warning</span> Laporan Kerusakan (Opsional)
                        </h4>
                        <div class="bg-error-container/20 border border-error/30 rounded-lg p-4">
                            <div>
                                <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Keterangan Kerusakan</label>
                                <textarea name="damageReport" class="w-full bg-surface-container-lowest border border-outline-variant rounded px-3 py-2 font-body-md focus:outline-none focus:border-error focus:ring-1 focus:ring-error/20" placeholder="Jelaskan detail kerusakan jika ada..." rows="2"></textarea>
                            </div>
                        </div>
                    </div>
                    <!-- Submit Actions -->
                    <div class="flex justify-end gap-3 pt-4">
                        <button class="px-4 py-2 font-label-md text-label-md text-on-surface-variant hover:bg-surface-variant rounded-DEFAULT transition-colors" type="button">Batal</button>
                        <button class="px-6 py-2 bg-primary text-on-primary font-label-md text-label-md rounded-DEFAULT hover:bg-primary-container transition-colors shadow-sm" type="submit">Simpan Jurnal</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
    `;
}
