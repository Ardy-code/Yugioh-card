## 🃏 Yu-Gi-Oh! cardyugioh

**cardyugioh** Card Explorer adalah aplikasi berbasis web yang memungkinkan pengguna untuk menjelajahi berbagai kartu Yu-Gi-Oh!. Aplikasi ini dibangun menggunakan React.js dan JavaScript, serta terhubung langsung dengan API publik dari:

[https://db.ygoprodeck.com/api/v7/cardinfo.php]

Melalui aplikasi ini, pengguna dapat melakukan pencarian kartu Yu-Gi-Oh! dan menyusun deck kartu mereka sendiri secara interaktif dan efisien.

---

## Deskripsi Proyek

Aplikasi ini merupakan bagian dari proyek UAS pada mata kuliah _Kerangka Kerja Pengembangan Antarmuka Website_. Aplikasi ini memungkinkan pengguna untuk mencari berbagai macam kartu Yu-Gi-Oh! serta menyusun sebuah deck dari kartu-kartu tersebut.

---

## API yang digunakan

Data kartu Yu-Gi-Oh diambil dari API publik:
[https://db.ygoprodeck.com/api/v7/cardinfo.php]

---

## Fitur-Fitur Utama Pada Aplikasi cardyugioh

- Pencarian kartu sesuai dengan nama dan kategori yang telah disiapkan
- Membuat deck kartu dengan menambahkan kartu Yu-Gi-Oh di halaman utama (Redux + localstorage)
- Autentikasi pengguna (login & Register) dengan mendaftarkan secara mandiri
- Detail informasi mengenai kartu Yu-Gi-Oh
- Desain responsif dalam tampilan dekstop maupun mobile

---

## Struktur Halaman & Routing

- `/` – Halaman utama (Browse Cards) Menampilkan daftar kartu Yu-Gi-Oh! yang diambil dari API publik.
- `/Search` - Pencarian & Filter Kartu Menyediakan fitur pencarian kartu berdasarkan nama, serta filter berdasarkan tipe dan ras
- `/Decks` – Koleksi Deck yang Menampilkan seluruh deck yang telah dibuat oleh user, lengkap dengan fitur edit, lihat, dan hapus
- `/Login` - Halaman Login untuk Autentikasi user berdasarkan email dan password.
- `/Register` - Halaman Registrasi Mendaftarkan user baru ke sistem lokal (disimpan di localStorage).

---

## Cara Menjalankan Secara Lokal

1. **Clone repository:**

   ```bash
   git clone https://github.com/Ardy-code/Yugioh-card.git
   cd Yugioh-card
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Jalankan development server:**
   ```bash
   npm start
   ```
   Aplikasi akan berjalan di `http://localhost:3000`.

---

## Link Live Demo

- **https://cardyugioh.vercel.app/**
