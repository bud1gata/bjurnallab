import DashboardView from './views/dashboard.js';
import InventarisView from './views/inventaris.js';
import JurnalView from './views/jurnal.js';
import PeminjamanView from './views/peminjaman.js';
import LaporanView from './views/laporan.js';
import LoginView from './views/login.js';

const routes = {
    '/dashboard': DashboardView,
    '/inventaris': InventarisView,
    '/jurnal': JurnalView,
    '/peminjaman': PeminjamanView,
    '/laporan': LaporanView,
    '/login': LoginView,
};

export function initRouter() {
    const routerView = document.getElementById('router-view');
    const navLinks = document.querySelectorAll('.nav-item');

    function updateActiveNav(path) {
        navLinks.forEach(link => {
            if (link.getAttribute('data-path') === path) {
                link.classList.add('bg-secondary-container', 'text-on-secondary-container', 'dark:bg-secondary', 'dark:text-on-secondary', 'translate-x-1');
                link.classList.remove('text-on-surface-variant', 'hover:text-primary', 'hover:bg-surface-variant');
                
                // If it has icon, we can make it filled
                const icon = link.querySelector('.material-symbols-outlined');
                if(icon) icon.style.fontVariationSettings = "'FILL' 1";
            } else {
                link.classList.remove('bg-secondary-container', 'text-on-secondary-container', 'dark:bg-secondary', 'dark:text-on-secondary', 'translate-x-1');
                link.classList.add('text-on-surface-variant', 'hover:text-primary', 'hover:bg-surface-variant');
                
                const icon = link.querySelector('.material-symbols-outlined');
                if(icon) icon.style.fontVariationSettings = "'FILL' 0";
            }
        });
    }

    async function renderView() {
        let path = window.location.hash.slice(1) || '/dashboard';
        
        // Auth Guard
        const token = localStorage.getItem('token');
        if (!token && path !== '/login') {
            window.location.hash = '#/login';
            return;
        }
        if (token && path === '/login') {
            window.location.hash = '#/dashboard';
            return;
        }

        if (!routes[path]) {
            path = '/dashboard';
            window.location.hash = '#/dashboard';
        }

        // Handle Layout visibility (Sidebar/Header)
        const sidebarNav = document.getElementById('sidebar-nav');
        const mainWrapper = document.getElementById('main-wrapper');
        const topHeader = document.getElementById('top-header');

        if (path === '/login') {
            if (sidebarNav) sidebarNav.style.display = 'none';
            if (topHeader) topHeader.style.display = 'none';
            if (mainWrapper) {
                mainWrapper.style.marginLeft = '0';
                mainWrapper.style.maxWidth = '100%';
            }
        } else {
            if (sidebarNav) sidebarNav.style.display = 'flex';
            if (topHeader) topHeader.style.display = 'flex';
            if (mainWrapper) {
                mainWrapper.style.marginLeft = '260px';
                mainWrapper.style.maxWidth = 'calc(100% - 260px)';
            }
        }

        const component = routes[path];
        if (routerView && component) {
            routerView.innerHTML = '<div class="flex justify-center items-center h-64"><span class="material-symbols-outlined animate-spin text-4xl text-secondary">progress_activity</span></div>';
            
            try {
                routerView.innerHTML = await component();
                updateActiveNav(path);
                window.scrollTo(0, 0);
                
                // Trigger an event so components can run JS after DOM is loaded
                document.dispatchEvent(new CustomEvent('viewLoaded', { detail: { path } }));
            } catch (error) {
                console.error("Error loading view:", error);
                routerView.innerHTML = `<div class="p-4 bg-error-container text-on-error-container rounded-lg">Gagal memuat halaman: ${error.message}</div>`;
            }
        }
    }

    window.addEventListener('hashchange', renderView);
    renderView(); // Initial render
}
