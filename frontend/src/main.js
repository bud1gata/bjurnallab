import './style.css';
import { initRouter } from './router.js';

// Global fetch interceptor to append JWT Token to request headers
const originalFetch = window.fetch;
window.fetch = async function (url, options = {}) {
    const token = localStorage.getItem('token');
    if (token) {
        options.headers = options.headers || {};
        // Only set Authorization if not already defined
        if (!options.headers['Authorization']) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return originalFetch(url, options);
};

// Update TopNavBar Profile UI and Sidebar Links based on user role
function updateProfileUI() {
    const userStr = localStorage.getItem('user');
    const profileContainer = document.querySelector('header .flex.items-center.gap-4.ml-auto');
    const navLinks = document.querySelectorAll('.nav-item');
    const ctaWrapper = document.getElementById('sidebar-cta');
    
    if (userStr && profileContainer) {
        const user = JSON.parse(userStr);
        const initials = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
        
        // Find or create profile badge
        let badge = document.getElementById('user-profile-badge');
        if (!badge) {
            // Remove the hardcoded img wrapper (last child)
            const lastChild = profileContainer.lastElementChild;
            if (lastChild) lastChild.remove();
            
            badge = document.createElement('div');
            badge.id = 'user-profile-badge';
            badge.className = 'w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center ml-2 border border-outline-variant font-label-md text-label-md cursor-pointer hover:opacity-90 transition-opacity';
            profileContainer.appendChild(badge);
        }
        badge.innerText = initials;
        badge.title = `${user.name} (${user.role})`;

        // Dynamic Navigation Hiding based on Role
        navLinks.forEach(link => {
            const path = link.getAttribute('data-path');
            const parentLi = link.closest('li');
            if (parentLi) {
                if (user.role === 'Siswa') {
                    // Siswa only sees Dashboard and Peminjaman
                    if (path === '/inventaris' || path === '/jurnal' || path === '/laporan') {
                        parentLi.classList.add('hidden');
                    } else {
                        parentLi.classList.remove('hidden');
                    }
                } else if (user.role === 'Guru') {
                    // Guru sees Dashboard, Inventaris, Jurnal, Peminjaman. Hides Laporan.
                    if (path === '/laporan') {
                        parentLi.classList.add('hidden');
                    } else {
                        parentLi.classList.remove('hidden');
                    }
                } else {
                    // Admin sees all
                    parentLi.classList.remove('hidden');
                }
            }
        });

        // Hide sidebar CTA (Tambah Inventaris) for non-admins
        if (ctaWrapper) {
            if (user.role !== 'Admin') {
                ctaWrapper.classList.add('hidden');
            } else {
                ctaWrapper.classList.remove('hidden');
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    updateProfileUI();
});

// Global handler: Handle login form submission
window._handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const errorBanner = document.getElementById('login-error-banner');
    const submitBtn = document.getElementById('login-submit-btn');

    if (errorBanner) errorBanner.classList.add('hidden');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="material-symbols-outlined animate-spin text-[18px]">progress_activity</span> Memproses...';
    }

    const payload = {
        email: form.email.value,
        password: form.password.value
    };

    try {
        const res = await originalFetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const data = await res.json();

        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({
                _id: data._id,
                name: data.name,
                email: data.email,
                role: data.role
            }));
            
            // Update profile display
            updateProfileUI();

            // Redirect to dashboard
            window.location.hash = '#/dashboard';
        } else {
            if (errorBanner) {
                errorBanner.innerText = data.message || 'Email atau password salah.';
                errorBanner.classList.remove('hidden');
            }
        }
    } catch (err) {
        console.error(err);
        if (errorBanner) {
            errorBanner.innerText = 'Gagal terhubung ke server backend.';
            errorBanner.classList.remove('hidden');
        }
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Masuk ke Sistem <span class="material-symbols-outlined text-[18px]">login</span>';
        }
    }
};

// Global handler: Handle logout
window._handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.hash = '#/login';
};

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

// Global handler: Change password modal controls
window._openChangePasswordModal = () => {
    const modal = document.getElementById('change-password-modal');
    const errBanner = document.getElementById('change-pwd-error-banner');
    if (errBanner) errBanner.classList.add('hidden');
    if (modal) modal.classList.remove('hidden');
};

window._closeChangePasswordModal = () => {
    const modal = document.getElementById('change-password-modal');
    if (modal) {
        modal.classList.add('hidden');
        modal.querySelector('form').reset();
    }
};

window._handleChangePassword = async (e) => {
    e.preventDefault();
    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;
    const errBanner = document.getElementById('change-pwd-error-banner');

    if (errBanner) errBanner.classList.add('hidden');

    if (newPassword !== confirmPassword) {
        if (errBanner) {
            errBanner.innerText = 'Konfirmasi password baru tidak cocok.';
            errBanner.classList.remove('hidden');
        }
        return;
    }

    try {
        const res = await fetch('http://localhost:5000/api/auth/update-password', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ oldPassword, newPassword })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            alert('Password berhasil diganti. Sesi Anda akan berakhir, silakan login kembali.');
            window._closeChangePasswordModal();
            window._handleLogout();
        } else {
            if (errBanner) {
                errBanner.innerText = data.message || 'Gagal mengubah password.';
                errBanner.classList.remove('hidden');
            }
        }
    } catch (err) {
        console.error(err);
        if (errBanner) {
            errBanner.innerText = 'Terjadi kesalahan jaringan.';
            errBanner.classList.remove('hidden');
        }
    }
};
