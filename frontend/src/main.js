import './style.css'
import { initRouter } from './router.js'

document.addEventListener('DOMContentLoaded', () => {
    initRouter();
});

// Global handler: Update loan status (Setujui/Tolak/Selesai)
window._updateLoan = async (id, status) => {
    try {
        const body = { status };
        if (status === 'Dikembalikan') {
            body.returnCondition = 'Baik';
            body.actualReturnDate = new Date().toISOString();
        }
        const res = await fetch(`http://localhost:5000/api/loan/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            // Re-render the current view
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        } else {
            alert('Gagal memperbarui status peminjaman.');
        }
    } catch (e) {
        console.error(e);
        alert('Terjadi kesalahan jaringan.');
    }
};

// Global handler: Submit journal form
window._submitJournal = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
        teacher: '000000000000000000000000', // placeholder ObjectId
        className: form.className.value,
        subject: form.subject.value,
        topic: form.topic.value,
        studentCount: Number(form.studentCount.value),
        damageReport: form.damageReport?.value || '',
    };
    try {
        const res = await fetch('http://localhost:5000/api/journal', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            alert('Jurnal berhasil disimpan!');
            window.dispatchEvent(new HashChangeEvent('hashchange'));
        } else {
            const data = await res.json();
            alert('Gagal menyimpan jurnal: ' + (data.message || 'Unknown error'));
        }
    } catch (err) {
        console.error(err);
        alert('Terjadi kesalahan jaringan.');
    }
};
