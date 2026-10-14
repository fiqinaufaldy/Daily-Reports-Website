# Daily Reports — Multi-page personal daily report

## Struktur project
- `index.html` — Dashboard
- `calendar.html` — Calendar interaktif
- `daily-report.html` — Input aktivitas, import Excel/CSV, dan template import
- `analytics.html` — Grafik aktivitas dan ringkasan business unit
- `reminder.html` — Work Order & Reminder
- `documents.html` — Galeri foto dokumentasi dengan opsi **Lihat Full Photo** (tampilan layar penuh, gambar proporsional tanpa crop) dan **Lihat Aktivitas**
- `settings.html` — Profil/foto, jabatan, perusahaan, logo business unit, tema, export/import backup
- `styles.css` — Styling bersama dan light/dark mode
- `app.js` — Logika frontend
- `templates/dailyflow-import-template.xlsx` — Template Excel resmi dengan sheet Aktivitas dan Petunjuk
- `templates/dailyflow-import-template.csv` — Template CSV
- `database/schema.sql` — Skema database cloud dan kebijakan RLS (folder diganti nama menjadi `database`)
- `config.example.js` — Contoh konfigurasi Supabase
- `.gitignore` — Mencegah konfigurasi rahasia masuk GitHub

## Menjalankan lokal
1. Ekstrak folder project.
2. Buka folder menggunakan Visual Studio Code.
3. Jalankan `index.html` dengan Live Server.
4. Data prototype saat ini masih memakai `localStorage` browser. Data tidak disimpan sebagai file di folder project.

## Import data dengan template
1. Buka menu **Daily Report**.
2. Klik **Template Excel (.xlsx)** atau **Template CSV** di bagian Import Center.
3. Isi sheet `Aktivitas`, satu aktivitas per baris. Jangan mengubah nama header pada baris pertama.
4. Kolom wajib: `Date` (format `YYYY-MM-DD`) dan `Activity Name`.
5. Status: `Done`, `On Progress`, atau `Pending`. Priority: `Low`, `Medium`, atau `High`.
6. Upload kembali file yang sudah diisi, periksa preview, lalu klik **Import Data**.
7. Baris contoh bisa dihapus sebelum import. Aktivitas dengan tanggal dan nama sama akan dilewati sebagai kemungkinan duplikat.
8. Foto tidak dimasukkan ke template spreadsheet; upload foto melalui menu Documents atau form aktivitas.

## Pengaturan profil dan logo
- Menu Settings dapat menyimpan nama, foto profil, jabatan, departemen, dan perusahaan utama.
- Setiap business unit dapat memiliki logo yang tampil di daftar unit dan tag aktivitas.
- Foto profil dan logo disimpan sebagai data lokal browser, sehingga belum tersinkron antarperangkat. Backup JSON kini menyertakan profil dan logo.

## GitHub
- Buat repository bernama `dailyflow`, lalu commit/push file project.
- Jangan commit `config.js`, `.env`, password, atau Supabase `service_role` key.
- GitHub menyimpan source code dan riwayat versi, bukan data aktivitas yang dibuat di website.
- GitHub Pages bisa host frontend statis, tetapi bukan database/backend.

## Database cloud (Supabase) — setup cloud (belum aktif sampai dikonfigurasi)
1. Buat project di https://supabase.com/.
2. Buka SQL Editor dan jalankan `database/schema.sql`.
3. Buat bucket Storage bernama `dailyflow-documents` dan atur sebagai **private**.
4. Siapkan Storage policies yang hanya mengizinkan pengguna terautentikasi mengakses folder miliknya.
5. Salin `config.example.js` menjadi `config.js`, lalu isi Project URL dan anon/publishable key.
6. Muat Supabase JS SDK dan implementasikan login, CRUD, sinkronisasi, serta upload/download foto di `app.js` sebelum menganggap cloud aktif.

**Penting:** versi ini menyiapkan skema dan konfigurasi awal, tetapi integrasi Supabase end-to-end belum aktif. UI masih membaca/menulis `localStorage`. Jangan masukkan data sensitif sampai login, RLS, Storage policies, dan sinkronisasi selesai diuji.


## Penyimpanan logo otomatis ke assets/logo

- Jalankan proyek menggunakan VS Code Live Server di Chrome/Edge (localhost/HTTPS).
- Saat upload logo pertama kali, browser meminta kamu memilih folder proyek `daily_reports` dan memberi izin tulis.
- Setelah folder dipilih, setiap upload logo akan otomatis menyimpan file ke `assets/logo/` dengan nama berdasarkan business unit.
- Folder yang dipilih diingat menggunakan IndexedDB. Jika izin dicabut atau folder dipindah, pilih folder proyek lagi dari Settings.
- Browser tidak mengizinkan website menulis ke folder lokal tanpa izin eksplisit. Logo juga tetap disimpan di localStorage sebagai cadangan.

### Penyimpanan dokumentasi ke folder proyek
Di Chrome/Edge melalui localhost atau HTTPS, pilih folder utama proyek sekali melalui **Settings → Pilih Folder Proyek**. Foto yang diunggah dari Daily Report maupun Documents akan disalin ke `assets/work/<NamaBulan>/` (contoh `assets/work/October/`) sambil tetap disimpan di galeri browser. Logo disimpan di `assets/logo/`. Browser akan meminta izin tulis ke folder proyek demi keamanan.
