export default async function InventarisView() {
    let inventoryData = [];
    let tableBodyHTML = '';
    
    try {
        const response = await fetch('http://localhost:5000/api/inventory');
        if (response.ok) {
            inventoryData = await response.json();
        } else {
            console.error('Failed to fetch inventory');
        }
    } catch (error) {
        console.error('Error fetching inventory:', error);
    }

    if (inventoryData.length === 0) {
        tableBodyHTML = `
            <tr>
                <td colspan="6" class="py-8 text-center text-on-surface-variant font-body-md">
                    Tidak ada data inventaris ditemukan atau gagal memuat data.
                </td>
            </tr>
        `;
    } else {
        tableBodyHTML = inventoryData.map((item, index) => {
            let statusClass = '';
            if (item.status === 'Tersedia') statusClass = 'bg-[#dcfce7] text-[#166534] border-[#bbf7d0]';
            else if (item.status === 'Dipinjam') statusClass = 'bg-[#dbeafe] text-[#1e40af] border-[#bfdbfe]';
            else if (item.status === 'Rusak') statusClass = 'bg-[#fee2e2] text-[#991b1b] border-[#fecaca]';
            else if (item.status === 'Perbaikan') statusClass = 'bg-[#fef3c7] text-[#92400e] border-[#fde68a]';

            return `
            <tr class="hover:bg-surface-container-low/50 transition-colors ${index % 2 !== 0 ? 'bg-surface-container-lowest/30' : ''}">
                <td class="py-4 px-6 font-body-md text-body-md text-on-surface-variant">${index + 1}</td>
                <td class="py-4 px-6">
                    <p class="font-body-md text-body-md font-medium text-primary">${item.name}</p>
                    <p class="font-label-md text-label-md text-on-surface-variant mt-0.5">ID: ${item.code}</p>
                </td>
                <td class="py-4 px-6 font-body-md text-body-md text-on-surface">${item.category}</td>
                <td class="py-4 px-6 font-body-md text-body-md text-on-surface">${item.merk}</td>
                <td class="py-4 px-6">
                    <span class="inline-flex items-center px-2.5 py-1 rounded-full font-label-md text-[10px] uppercase tracking-wider ${statusClass} border">
                        ${item.status}
                    </span>
                </td>
                <td class="py-4 px-6 text-right">
                    <button class="p-2 text-on-surface-variant hover:text-secondary transition-colors"><span class="material-symbols-outlined text-[20px]">edit</span></button>
                    <button class="p-2 text-on-surface-variant hover:text-error transition-colors"><span class="material-symbols-outlined text-[20px]">delete</span></button>
                </td>
            </tr>
            `;
        }).join('');
    }

    return `
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-stack-lg gap-4">
        <div>
            <h2 class="font-display-lg text-display-lg text-primary">Manajemen Inventaris</h2>
            <p class="font-body-md text-body-md text-on-surface-variant mt-1">Kelola dan pantau seluruh aset laboratorium.</p>
        </div>
        <button class="bg-secondary text-on-secondary px-6 py-3 rounded-lg font-label-md text-label-md flex items-center gap-2 hover:bg-secondary/90 transition-all shadow-sm">
            <span class="material-symbols-outlined text-[18px]">add</span>
            Tambah Item Baru
        </button>
    </div>
    <!-- Tabs & Filters -->
    <div class="bg-surface-container-lowest rounded-xl border border-outline-variant p-4 mb-stack-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div class="flex gap-2 w-full md:w-auto p-1 bg-surface-container-low rounded-lg">
            <button class="flex-1 md:flex-none px-6 py-2 rounded-md bg-surface-container-lowest text-primary shadow-sm font-label-md text-label-md transition-all">
                Aset Tetap
            </button>
            <button class="flex-1 md:flex-none px-6 py-2 rounded-md text-on-surface-variant hover:bg-surface-variant font-label-md text-label-md transition-all">
                Bahan Habis Pakai
            </button>
        </div>
        <div class="flex gap-3 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <select class="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary min-w-[140px]">
                <option value="">Semua Kategori</option>
                <option value="komputer">Komputer</option>
                <option value="jaringan">Jaringan</option>
                <option value="alat">Alat Praktik</option>
            </select>
            <select class="px-4 py-2 bg-surface-container-lowest border border-outline-variant rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:border-secondary min-w-[140px]">
                <option value="">Semua Status</option>
                <option value="tersedia">Tersedia</option>
                <option value="dipinjam">Dipinjam</option>
                <option value="rusak">Rusak</option>
                <option value="perbaikan">Perbaikan</option>
            </select>
        </div>
    </div>
    <!-- Data Table Card -->
    <div class="bg-surface-container-lowest rounded-xl border border-outline-variant overflow-hidden">
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead class="bg-surface-container-low border-b border-outline-variant">
                    <tr>
                        <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant">NO</th>
                        <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant">NAMA BARANG</th>
                        <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant">KATEGORI</th>
                        <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant">MERK/MODEL</th>
                        <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant">STATUS</th>
                        <th class="py-4 px-6 font-label-md text-label-md text-on-surface-variant text-right">AKSI</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-outline-variant/50">
                    ${tableBodyHTML}
                </tbody>
            </table>
        </div>
        <!-- Pagination Footer -->
        <div class="px-6 py-4 border-t border-outline-variant flex items-center justify-between bg-surface-container-lowest">
            <span class="font-body-md text-body-md text-on-surface-variant">Menampilkan ${inventoryData.length} item</span>
            <div class="flex gap-2">
                <button class="p-2 border border-outline-variant rounded-md text-on-surface-variant hover:bg-surface-container-low disabled:opacity-50"><span class="material-symbols-outlined text-[18px]">chevron_left</span></button>
                <button class="p-2 border border-outline-variant rounded-md text-on-surface hover:bg-surface-container-low"><span class="material-symbols-outlined text-[18px]">chevron_right</span></button>
            </div>
        </div>
    </div>
    `
}
