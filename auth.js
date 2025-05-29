// auth.js - File JavaScript untuk handle authentication
class AuthHandler {
    constructor() {
        this.apiBase = 'http://localhost'; // Sesuaikan dengan URL server Anda
        this.init();
    }

    init() {
        // Handle login form
        const loginForm = document.querySelector('.auth-form');
        if (loginForm && window.location.pathname.includes('login.html')) {
            this.handleLoginForm(loginForm);
        }

        // Handle register form
        if (loginForm && window.location.pathname.includes('register.html')) {
            this.handleRegisterForm(loginForm);
        }

        // Handle social login buttons
        this.handleSocialLogin();
    }

    handleLoginForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const remember = document.getElementById('remember').checked;

            if (!email || !password) {
                this.showAlert('Silakan lengkapi semua field.', 'error');
                return;
            }

            try {
                this.showLoading(true);
                const response = await this.makeRequest('login_api.php', {
                    email: email,
                    password: password,
                    remember: remember
                });

                if (response.success) {
                    this.showAlert(response.message, 'success');
                    // Simpan data user di localStorage untuk digunakan di halaman lain
                    localStorage.setItem('user_data', JSON.stringify(response.data.user));
                    
                    // Redirect setelah delay singkat
                    setTimeout(() => {
                        window.location.href = response.data.redirect || 'index.html';
                    }, 1000);
                } else {
                    this.showAlert(response.message, 'error');
                }
            } catch (error) {
                this.showAlert('Terjadi kesalahan koneksi', 'error');
                console.error('Login error:', error);
            } finally {
                this.showLoading(false);
            }
        });
    }

    handleRegisterForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const firstName = document.getElementById('first-name').value;
            const lastName = document.getElementById('last-name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const agreeTerms = document.getElementById('agree-terms').checked;

            // Validasi client-side
            if (!firstName || !lastName || !email || !phone || !password) {
                this.showAlert('Silakan lengkapi semua field.', 'error');
                return;
            }

            if (password !== confirmPassword) {
                this.showAlert('Kata sandi tidak cocok!', 'error');
                return;
            }

            if (password.length < 8) {
                this.showAlert('Kata sandi minimal 8 karakter!', 'error');
                return;
            }

            if (!agreeTerms) {
                this.showAlert('Anda harus menyetujui syarat dan ketentuan!', 'error');
                return;
            }

            try {
                this.showLoading(true);
                const response = await this.makeRequest('register_api.php', {
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                    phone: phone,
                    password: password,
                    confirm_password: confirmPassword,
                    agree_terms: agreeTerms
                });

                if (response.success) {
                    this.showAlert(response.message, 'success');
                    
                    // Redirect ke login atau home
                    setTimeout(() => {
                        window.location.href = response.data.redirect || 'login.html';
                    }, 1500);
                } else {
                    this.showAlert(response.message, 'error');
                }
            } catch (error) {
                this.showAlert('Terjadi kesalahan koneksi', 'error');
                console.error('Register error:', error);
            } finally {
                this.showLoading(false);
            }
        });
    }

    handleSocialLogin() {
        // Handle Google login
        const googleBtn = document.querySelector('.google-btn');
        if (googleBtn) {
            googleBtn.addEventListener('click', () => {
                this.showAlert('Fitur login Google akan segera tersedia', 'info');
            });
        }

        // Handle Facebook login
        const facebookBtn = document.querySelector('.facebook-btn');
        if (facebookBtn) {
            facebookBtn.addEventListener('click', () => {
                this.showAlert('Fitur login Facebook akan segera tersedia', 'info');
            });
        }
    }

    async makeRequest(endpoint, data) {
        const response = await fetch(`${this.apiBase}/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }

    showAlert(message, type = 'info') {
        // Hapus alert yang sudah ada
        const existingAlert = document.querySelector('.custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        // Buat alert baru
        const alert = document.createElement('div');
        alert.className = `custom-alert custom-alert-${type}`;
        alert.innerHTML = `
            <div class="alert-content">
                <span class="alert-message">${message}</span>
                <button class="alert-close">&times;</button>
            </div>
        `;

        // Style untuk alert
        alert.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            font-family: 'Poppins', sans-serif;
            font-size: 14px;
            max-width: 400px;
            animation: slideIn 0.3s ease;
        `;

        // Warna berdasarkan type
        const colors = {
            success: { bg: '#d4edda', border: '#c3e6cb', text: '#155724' },
            error: { bg: '#f8d7da', border: '#f5c6cb', text: '#721c24' },
            info: { bg: '#d1ecf1', border: '#bee5eb', text: '#0c5460' }
        };

        const color = colors[type] || colors.info;
        alert.style.backgroundColor = color.bg;
        alert.style.border = `1px solid ${color.border}`;
        alert.style.color = color.text;

        // Tambahkan CSS animation
        if (!document.querySelector('#alert-styles')) {
            const style = document.createElement('style');
            style.id = 'alert-styles';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                .alert-content {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .alert-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    margin-left: 10px;
                    color: inherit;
                }
            `;
            document.head.appendChild(style);
        }

        document.body.appendChild(alert);

        // Handle close button
        const closeBtn = alert.querySelector('.alert-close');
        closeBtn.addEventListener('click', () => alert.remove());

        // Auto close setelah 5 detik
        setTimeout(() => {
            if (alert.parentNode) {
                alert.remove();
            }
        }, 5000);
    }

    showLoading(show) {
        const submitBtn = document.querySelector('.auth-btn');
        if (submitBtn) {
            if (show) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memproses...';
            } else {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                const isLogin = window.location.pathname.includes('login.html');
                submitBtn.innerHTML = isLogin ? 'Masuk' : 'Daftar Sekarang';
            }
        }
    }

    // Method untuk logout
    static logout() {
        localStorage.removeItem('user_data');
        sessionStorage.clear();
        // Redirect ke login
        window.location.href = 'login.html';
    }

    // Method untuk cek apakah user sudah login
    static isLoggedIn() {
        return localStorage.getItem('user_data') !== null;
    }

    // Method untuk mendapatkan data user
    static getUserData() {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
    }
}

// Initialize ketika DOM loaded
document.addEventListener('DOMContentLoaded', () => {
    new AuthHandler();
});