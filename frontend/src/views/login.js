export default function LoginView() {
    return `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-primary-container/30 via-background to-secondary-container/20 px-4">
        <!-- Login Card -->
        <div class="w-full max-w-md bg-surface-container-lowest/80 backdrop-blur-xl border border-outline-variant rounded-2xl p-8 shadow-2xl flex flex-col gap-6">
            
            <!-- Branding Header -->
            <div class="text-center">
                <div class="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-on-primary mb-4 shadow-md shadow-primary/20">
                    <span class="material-symbols-outlined text-[32px]" style="font-variation-settings: 'FILL' 1;">science</span>
                </div>
                <h2 class="font-display-lg text-display-lg text-primary">B-JURNALLAB</h2>
                <p class="font-body-md text-body-md text-on-surface-variant mt-1">Sistem Manajemen Laboratorium Sekolah</p>
            </div>

            <!-- Error Banner -->
            <div id="login-error-banner" class="hidden p-3 bg-error-container text-on-error-container rounded-lg border border-error/20 font-body-md text-body-md text-center">
            </div>

            <!-- Login Form -->
            <form id="loginForm" class="flex flex-col gap-4" onsubmit="window._handleLogin(event)">
                <div>
                    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Alamat Email</label>
                    <div class="relative flex items-center">
                        <span class="material-symbols-outlined absolute left-3 text-on-surface-variant">mail</span>
                        <input name="email" type="email" required placeholder="name@school.sch.id" 
                            class="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/60 rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"/>
                    </div>
                </div>

                <div>
                    <label class="block font-label-md text-label-md text-on-surface-variant mb-1">Kata Sandi</label>
                    <div class="relative flex items-center">
                        <span class="material-symbols-outlined absolute left-3 text-on-surface-variant">lock</span>
                        <input name="password" type="password" required placeholder="••••••••" 
                            class="w-full pl-10 pr-4 py-3 bg-surface-container-low border border-outline-variant/60 rounded-xl font-body-md text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all"/>
                    </div>
                </div>

                <div class="flex items-center justify-between mt-1">
                    <label class="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" class="rounded text-primary focus:ring-primary/20 border-outline-variant h-4 w-4"/>
                        <span class="font-body-md text-body-md text-on-surface-variant">Ingat Saya</span>
                    </label>
                    <a href="#" class="font-label-md text-label-md text-primary hover:underline">Lupa Password?</a>
                </div>

                <button type="submit" id="login-submit-btn"
                    class="w-full mt-2 bg-primary hover:bg-primary/90 text-on-primary font-label-md text-label-md py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-primary/10">
                    Masuk ke Sistem
                    <span class="material-symbols-outlined text-[18px]">login</span>
                </button>
            </form>

            <div class="text-center font-body-md text-body-md text-on-surface-variant pt-2 border-t border-outline-variant/30">
                Belum memiliki akun? <a href="#" class="text-primary font-semibold hover:underline">Hubungi Admin Lab</a>
            </div>

        </div>
    </div>
    `;
}
