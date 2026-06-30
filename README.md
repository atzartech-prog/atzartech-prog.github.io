# 🚀 Atzartech Hub | Welcome Portal (PWA)

Atzartech Hub adalah portal web/landing page modern dan berkinerja tinggi yang didesain untuk menjadi pusat kendali (control center) bagi seluruh aplikasi web, utilitas, catatan, dan repositori buatan **[atzartech-prog.github.io](https://atzartech-prog.github.io/)**. 

Portal ini kini telah mendukung fitur **Progressive Web App (PWA)**, yang memungkinkan pengguna untuk menginstalnya langsung di desktop atau ponsel cerdas mereka seperti aplikasi native, lengkap dengan dukungan mode offline.

---

## ✨ Fitur Utama

*   **📱 Progressive Web App (PWA) Support**: Portal dapat diinstal di perangkat Windows, macOS, Android, dan iOS. Menyediakan ikon modern (termasuk *maskable icons* adaptif) dan berjalan mandiri tanpa bilah URL peramban.
*   **📶 Dukungan Akses Offline**: Menggunakan *Service Worker* dengan strategi *Stale-While-Revalidate* untuk mengamankan dan memuat aset statis langsung dari *cache* lokal saat perangkat kehilangan koneksi internet.
*   **🌓 Persisted Theme Toggle**: Beralih mulus antara Mode Gelap (Dark Mode) dan Mode Terang (Light Mode). Pilihan tema disimpan dalam `localStorage` peramban sehingga tidak berubah saat halaman dimuat ulang.
*   **🔍 Live Search Filter**: Kolom pencarian real-time yang memfilter kartu aplikasi secara instan berdasarkan judul, deskripsi, kategori, dan jalur tautan.
*   **🏷️ Kategori Dinamis**: Filter kategori (Utilitas, Aplikasi, Personal, Referensi, dll.) digenerasikan secara otomatis berdasarkan data yang terdaftar di berkas JavaScript.
*   **💎 Desain Premium & Glassmorphism**: Antarmuka transparan modern (*backdrop blur*) dengan efek animasi hover yang halus dan pendaran bayangan (*glowing drop-shadow*) sesuai warna aksen masing-masing kartu.
*   **📱 Responsif & Ringan**: Skala grid dirancang responsif mulai dari layar ponsel hingga monitor ultra-lebar menggunakan Vanilla CSS tanpa library berat.

---

## 📂 Struktur Berkas Proyek

```bash
atzartech-prog.github.io-main/
├── index.html              # Struktur HTML utama dengan tautan manifes PWA & meta-tag seluler
├── style.css               # Desain sistem, token warna, tema gelap, dan animasi glassmorphism
├── script.js               # Konfigurasi data kartu, logika filter pencarian, dan registrasi Service Worker
├── sw.js                   # Service Worker untuk manajemen cache aset & dukungan offline
├── manifest.json           # Manifes Web App untuk identitas PWA, orientasi, warna tema, & ikon
├── icon.svg                # Ikon vektor master (SVG) beresolusi tajam
├── icon-192.png            # Ikon PWA standar (192x192) untuk shortcut peluncuran
├── icon-512.png            # Ikon PWA standar (512x512) untuk splash screen awal
├── icon-192-maskable.png   # Ikon PWA adaptif/maskable (192x192) untuk antarmuka OS seluler
├── icon-512-maskable.png   # Ikon PWA adaptif/maskable (512x512) untuk antarmuka OS seluler
└── README.md               # Dokumentasi lengkap petunjuk pengembangan ini
```

---

## 🛠️ Panduan Kustomisasi Konten

Seluruh data tautan kartu aplikasi dikelola secara terpusat di berkas JavaScript untuk memudahkan pemeliharaan jangka panjang.

### 1. Mengubah Domain Utama (Base URL)
Secara bawaan, tautan relatif akan digabungkan dengan domain GitHub Pages Anda. Untuk mengubahnya ke domain kustom milik Anda sendiri, buka berkas [script.js](file:///C:/Users/imron/Downloads/atzartech-prog.github.io-main/script.js) dan ubah nilai konstanta `BASE_URL` di bagian paling atas:
```javascript
const BASE_URL = 'https://atzartech-prog.github.io/';
```

### 2. Menambah atau Mengubah Kartu Aplikasi
Untuk memperbarui daftar kartu yang tampil di grid, ubah array objek `PAGES_DATA` pada [script.js](file:///C:/Users/imron/Downloads/atzartech-prog.github.io-main/script.js). Struktur datanya adalah sebagai berikut:
```javascript
{
    title: "Nama Aplikasi Anda",
    path: "nama-folder/",               // Menggabungkan dengan BASE_URL (misal: domain.com/nama-folder/)
    // ATAU absolute: "https://tautan-luar.com", // Gunakan jika tautan mengarah ke luar domain
    description: "Tuliskan deskripsi singkat mengenai fungsi dan kegunaan aplikasi.",
    icon: "lucide-icon-name",           // Nama ikon dari perpustakaan Lucide Icons
    category: "Utility",                // Kategori aplikasi (contoh: Utility, App, Personal, Reference, Web)
    accentColor: "indigo"               // Warna aksen: 'indigo', 'violet', 'cyan', 'emerald', 'amber', 'rose', 'blue'
}
```
> [!TIP]
> Jika Anda mendaftarkan kategori baru yang belum pernah ada sebelumnya (misalnya: `"Education"`), tombol filter kategori baru akan otomatis dibuat di antarmuka web tanpa perlu mengubah struktur HTML atau CSS!

### 3. Pustaka Ikon Lucide
Proyek ini terintegrasi dengan [Lucide Icons](https://lucide.dev/icons). Untuk mengganti ikon, kunjungi pustaka web mereka dan masukkan nama ikon yang ditulis dalam huruf kecil dan dipisahkan tanda hubung (seperti: `rocket`, `file-text`, `sprout`, `calendar`, `terminal`).

---

## 📶 Manajemen Cache PWA (Update Konten)

Karena aplikasi PWA menyimpan aset di media penyimpanan lokal peramban (*cache*), apabila Anda memperbarui isi berkas kode (seperti `index.html`, `style.css`, atau `script.js`), Anda perlu memberi tahu peramban untuk memperbarui cache tersebut.

Caranya, buka berkas [sw.js](file:///C:/Users/imron/Downloads/atzartech-prog.github.io-main/sw.js) dan ubah versi string `CACHE_NAME` di baris pertama:
```javascript
// Naikkan versi jika Anda mengupdate berkas web (contoh: v1 -> v2)
const CACHE_NAME = 'atzartech-hub-v2';
```
Peramban pengguna akan mendeteksi perubahan versi ini secara otomatis, mengunduh berkas terbaru di latar belakang, dan menginstalnya ketika semua tab aplikasi ditutup.

---

## 💻 Cara Menjalankan & Menguji Lokal

Agar PWA dapat berjalan, peramban mengharuskan situs diakses melalui protokol **HTTPS** atau **`localhost`**. Membuka berkas langsung dengan double-click (`file://`) tidak akan meregistrasikan Service Worker.

### Menggunakan Python (Praktis)
Buka Command Prompt atau PowerShell di folder proyek ini, kemudian jalankan perintah:
```powershell
python -m http.server 8080
```
Buka peramban dan akses [http://localhost:8080](http://localhost:8080).

### Menggunakan Node.js (npm/npx)
Buka terminal di folder proyek ini, kemudian jalankan:
```powershell
npx http-server -p 8080
```
Buka peramban dan akses [http://localhost:8080](http://localhost:8080).

---

## 🚀 Langkah Publikasi ke GitHub Pages

1.  Salin atau masukkan seluruh berkas di direktori ini ke dalam repositori lokal Git Anda (misalnya repositori `atzartech-prog.github.io`).
2.  Commit dan Push perubahan tersebut ke GitHub:
    ```bash
    git add .
    git commit -m "feat: implement Progressive Web App (PWA) with offline capabilities"
    git push origin main
    ```
3.  Aktifkan fitur **GitHub Pages** di tab *Settings -> Pages* pada repositori GitHub Anda jika belum aktif.
4.  PWA Anda akan aktif secara instan dan aman (HTTPS) di alamat **`https://atzartech-prog.github.io/`**. Pengguna yang membuka situs melalui ponsel pintar atau komputer akan melihat opsi untuk "Add to Home Screen" atau "Install".
