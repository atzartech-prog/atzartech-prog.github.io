# WaktunyaKerja Productivity Hub 🚀

Sebuah portal aplikasi mikro berbasis web yang dirancang khusus untuk meningkatkan efisiensi dan efektivitas pekerjaan kantor harian, khususnya staf administrasi keuangan (Tenaga Kependidikan). 

Aplikasi ini dirancang dengan estetika premium gelap, efek glassmorphism modern, dan animasi mikro yang halus, memberikan pengalaman pengguna yang menyenangkan dan profesional.

## 🔒 Fitur Keamanan (Login System)

Aplikasi ini dilengkapi dengan modul otentikasi sederhana untuk membatasi akses:
*   **Username**: `admin`
*   **Password Default**: `bismillah`
*   **Ganti Password**: Anda dapat mengubah kata sandi masuk secara dinamis melalui formulir "Ganti Password" yang terletak di halaman Dashboard utama. Kata sandi yang baru akan disimpan dengan aman di penyimpanan lokal peramban Anda (`localStorage`).

## 🛠️ Fitur Utama (Aplikasi Mikro)

1.  **Dashboard Utama**: Ringkasan jumlah tugas aktif, sesi fokus yang telah diselesaikan hari ini, saldo keuangan harian, jalan pintas aktivitas, dan formulir perubahan kata sandi.
2.  **Pomodoro Focus Timer**: Pengatur waktu fokus 25 menit (dapat disesuaikan ke istirahat pendek atau panjang) yang dilengkapi dengan suara latar meditasi (White, Pink, Brown Noise) yang disintesis langsung menggunakan Web Audio API (tanpa file eksternal).
3.  **Task Manager (To-Do List)**: Pencatatan tugas dengan prioritas (Tinggi, Sedang, Rendah), kategori (Pekerjaan, Rapat, Keuangan, Personal), batas waktu, dan penyaringan (Semua, Aktif, Selesai) yang tersinkronisasi dengan penyimpanan lokal.
4.  **Catatan (Notes)**: Aplikasi pencatat dengan fitur pembuat catatan baru, pencarian instan, penanda penyimpanan otomatis (auto-save), dan opsi hapus.
5.  **Notulensi Rapat**: Pembuat risalah rapat terformat instan secara live-preview. Lengkap dengan fitur "Salin ke Clipboard" dan "Unduh Berkas (.txt)".
6.  **Tracker Keuangan**: Pencatat pemasukan dan pengeluaran operasional kantor yang menghitung saldo secara otomatis lengkap dengan filter kategori spesifik administrasi perkantoran.
7.  **QR Code Generator**: Generator QR Code instan berbasis client-side untuk mengubah teks atau URL menjadi kode QR. Dilengkapi dengan pengaturan piksel/ukuran, penyesuaian warna foreground & background, pratinjau dinamis, dan unduhan berkas gambar (.png).
8.  **Shortener Link (Penyingkat Tautan)**: Fitur penyingkat tautan ganda: penyingkat **Lokal/Offline** (mengarahkan otomatis menggunakan sistem interceptor parameter URL aplikasi dan data LocalStorage) serta penyingkat **Online/Internet** (melalui integrasi TinyURL API menggunakan CORS Proxy). Dilengkapi pencatatan riwayat penyingkatan dan salin tautan instan.

## 💻 Teknologi yang Digunakan

*   **HTML5**: Struktur semantik dan antarmuka.
*   **CSS3**: Desain kustom, variabel CSS, transisi, media queries, dan efek glassmorphism.
*   **JavaScript (ES6+)**: Manajemen state lokal, otentikasi, sinkronisasi password, dan penanganan alur intercept URL (routing/redirect).
*   **Web Audio API**: Generator suara sintetis (Noise Synthesizer) untuk Pomodoro Timer secara real-time.
*   **QRCode.js**: Pustaka eksternal (CDN) untuk generator visual kode QR langsung dari sisi peramban.
*   **TinyURL API & CORS Proxy**: Layanan eksternal untuk penyingkatan URL global online.

## 📂 Struktur Proyek

```text
├── index.html   # Kerangka antarmuka utama, Form Login & Generator Audio
├── styles.css   # Desain styling, variabel, responsivitas & Login styling
├── app.js       # Logika aplikasi, otentikasi, penggantian password & data lokal
└── README.md    # Dokumentasi proyek
```

## 🚀 Cara Menjalankan

1.  Unduh atau klon repositori ini.
2.  Buka berkas `index.html` langsung di peramban web (browser) Anda.
3.  Masukkan username `admin` dan password `bismillah`.
4.  Tidak memerlukan instalasi server atau dependensi tambahan!

---
*Dibuat untuk meningkatkan produktivitas administrasi kantor.*
