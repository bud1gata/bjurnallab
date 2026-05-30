# 🔬 B-JURNALLAB

**Sistem Manajemen Laboratorium Digital** — Aplikasi web untuk mengelola inventaris, jurnal harian, peminjaman alat, dan pemeliharaan aset laboratorium sekolah.

![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-v4-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-v8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-CDN-06B6D4?logo=tailwindcss&logoColor=white)

---

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Arsitektur](#-arsitektur)
- [Prasyarat](#-prasyarat)
- [Instalasi & Menjalankan](#-instalasi--menjalankan)
- [Struktur Proyek](#-struktur-proyek)
- [API Endpoints](#-api-endpoints)
- [Teknologi](#-teknologi)
- [Lisensi](#-lisensi)

---

## ✨ Fitur Utama

| Modul | Deskripsi |
|-------|-----------|
| **Dashboard** | Ringkasan statistik real-time: total inventaris, alat rusak, peminjaman aktif, biaya pemeliharaan, dan log aktivitas terkini. |
| **Manajemen Inventaris** | CRUD data aset tetap dan bahan habis pakai dengan filter kategori dan status (Tersedia/Dipinjam/Rusak/Perbaikan). |
| **Jurnal Harian** | Pencatatan aktivitas praktikum harian oleh guru: kelas, mata pelajaran, materi, jumlah siswa hadir, dan laporan kerusakan opsional. |
| **Peminjaman Alat** | Sistem antrean peminjaman dengan alur persetujuan (Menunggu → Dipinjam → Dikembalikan/Ditolak). |
| **Laporan & Pemeliharaan** | Log riwayat perbaikan, kalibrasi, dan penggantian suku cadang beserta estimasi biaya kumulatif. |

---

## 🏗 Arsitektur

```
┌─────────────────────┐       HTTP/JSON       ┌─────────────────────┐
│                     │ ◄───────────────────► │                     │
│   Frontend (SPA)    │                       │   Backend (API)     │
│   Vite + Vanilla JS │                       │   Express + Mongoose│
│   Port: 5173        │                       │   Port: 5000        │
│                     │                       │                     │
└─────────────────────┘                       └────────┬────────────┘
                                                       │
                                                       ▼
                                              ┌─────────────────┐
                                              │  MongoDB Atlas   │
                                              │  (Cloud DB)      │
                                              └─────────────────┘
```

- **Frontend**: Single Page Application (SPA) dengan hash-based routing, Tailwind CSS via CDN, dan font Inter + Material Symbols.
- **Backend**: RESTful API dengan arsitektur Model–Controller–Route.
- **Database**: MongoDB Atlas (cloud) via Mongoose ODM.

---

## 📦 Prasyarat

- [Node.js](https://nodejs.org/) v18 atau lebih baru
- [npm](https://www.npmjs.com/) v9+
- Akses internet (untuk MongoDB Atlas & Tailwind CDN)

---

## 🚀 Instalasi & Menjalankan

### 1. Clone Repository

```bash
git clone <url-repository>
cd bjurnallab
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Buat file `.env` di folder `backend/`:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database>?retryWrites=true&w=majority
PORT=5000
JWT_SECRET=rahasia_jwt_bjurnallab_2026
```

### 🔑 Akun Demo (Default Admin)

Setelah database terhubung, Anda dapat masuk menggunakan akun default berikut:
* **Email**: `admin@bjurnallab.com`
* **Kata Sandi**: `password123`
* **Role**: `Admin`

Jalankan server backend:

```bash
npm run dev
```

> Server berjalan di `http://localhost:5000` dengan hot-reload (nodemon).

### 3. Setup Frontend

Buka terminal baru:

```bash
cd frontend
npm install
npm run dev
```

> Aplikasi berjalan di `http://localhost:5173`.

### 4. Akses dari Jaringan Lokal

Frontend sudah dikonfigurasi dengan `--host`, sehingga dapat diakses dari perangkat lain di jaringan yang sama melalui IP lokal:

```
http://<IP-ANDA>:5173
```

---

## 📁 Struktur Proyek

```
bjurnallab/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                 # Koneksi MongoDB
│   │   ├── controllers/
│   │   │   ├── authController.js      # Controller otentikasi
│   │   │   ├── inventoryController.js
│   │   │   ├── journalController.js
│   │   │   ├── loanController.js
│   │   │   └── maintenanceController.js
│   │   ├── middlewares/
│   │   │   └── authMiddleware.js     # Middleware validasi JWT
│   │   ├── models/
│   │   │   ├── User.js               # Skema pengguna (Admin/Guru/Siswa)
│   │   │   ├── Inventory.js          # Skema inventaris
│   │   │   ├── Journal.js            # Skema jurnal harian
│   │   │   ├── Loan.js               # Skema peminjaman
│   │   │   └── Maintenance.js        # Skema pemeliharaan
│   │   ├── routes/
│   │   │   ├── authRoutes.js         # Rute otentikasi
│   │   │   ├── inventoryRoutes.js
│   │   │   ├── journalRoutes.js
│   │   │   ├── loanRoutes.js
│   │   │   └── maintenanceRoutes.js
│   │   └── app.js                    # Express app + route mounting
│   ├── server.js                     # Entry point
│   ├── .env                          # Environment variables
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── views/
│   │   │   ├── login.js              # Halaman Login
│   │   │   ├── dashboard.js          # Halaman Dashboard
│   │   │   ├── inventaris.js         # Halaman Inventaris
│   │   │   ├── jurnal.js             # Halaman Jurnal Harian
│   │   │   ├── peminjaman.js         # Halaman Peminjaman
│   │   │   └── laporan.js            # Halaman Laporan
│   │   ├── router.js                 # Client-side hash router
│   │   ├── main.js                   # Entry point + global handlers
│   │   └── style.css                 # Custom styles
│   ├── index.html                    # App shell (sidebar + header)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔌 API Endpoints

### Otentikasi (Auth)

| Method | Endpoint | Deskripsi | Akses |
|--------|----------|-----------|-------|
| `POST` | `/api/auth/register` | Registrasi akun baru | Publik |
| `POST` | `/api/auth/login` | Masuk ke sistem & dapatkan token JWT | Publik |
| `GET` | `/api/auth/me` | Dapatkan data profil pengguna aktif | Privat |
| `PUT` | `/api/auth/update-password` | Perbarui kata sandi pengguna aktif | Privat |

### Inventaris

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/inventory` | Ambil semua data inventaris |
| `GET` | `/api/inventory/:id` | Ambil detail inventaris |
| `POST` | `/api/inventory` | Tambah item baru |
| `PUT` | `/api/inventory/:id` | Update item |
| `DELETE` | `/api/inventory/:id` | Hapus item |

### Jurnal Harian

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/journal` | Ambil semua jurnal |
| `POST` | `/api/journal` | Buat jurnal baru |

### Peminjaman

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/loan` | Ambil semua peminjaman |
| `POST` | `/api/loan` | Buat permintaan peminjaman |
| `PUT` | `/api/loan/:id` | Update status (Setujui/Tolak/Selesai) |

### Pemeliharaan

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/maintenance` | Ambil semua riwayat pemeliharaan |
| `POST` | `/api/maintenance` | Tambah catatan pemeliharaan |

### Dashboard

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET` | `/api/stats` | Agregasi statistik untuk dashboard |

---

## 🛠 Teknologi

| Layer | Teknologi |
|-------|-----------|
| **Frontend** | Vanilla JavaScript, Vite, Tailwind CSS (CDN), Material Symbols, Inter Font |
| **Backend** | Node.js, Express.js, Mongoose |
| **Database** | MongoDB Atlas |
| **Dev Tools** | Nodemon (hot-reload), ES Modules |

---

## 📄 Lisensi

Proyek ini dibuat untuk keperluan internal manajemen laboratorium sekolah.

---

<p align="center">
  Dibuat dengan ❤️ oleh <strong>Tim B-JURNALLAB</strong>
</p>
