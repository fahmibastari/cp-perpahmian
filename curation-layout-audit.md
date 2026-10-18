# Audit layout dan kurasi proyek — 18 Oktober 2026

Status: analisis dan rekomendasi; tidak mengubah HTML, CSS, JavaScript, gambar sumber, atau deployment. Desain hijau/hitam/putih, Manrope, dan logo dipertahankan. Skill redesign-existing-projects lalu design-taste-frontend dipakai untuk menilai komposisi, bukan mengganti identitas.

## Kesimpulan

Masalah utama bukan pilihan warna atau font. Hierarki proyek, ukuran gambar di dalam wadah, ruang kosong berulang, dan hubungan jarak antarelemen belum terasa sengaja disusun. Lolos tes overflow tidak membuktikan komposisi sudah matang.

## Prioritas layout

1. **Pembuka belum membawa bukti terkuat.** Hero memakai dashboard SiCater, kemudian langsung disambung panggung Magic Pin dengan bobot berbeda. Dua pengenalan ini belum terasa sebagai satu cerita. Pilih Magic Pin sebagai pembuka tunggal, kemudian tampilkan sistem operasional yang saling melengkapi.
2. **Wadah gambar lebih dominan daripada produknya.** Hero SiCater menggunakan sumber 1895×947 (sekitar 2:1) di frame 16:10 dengan `contain` dan padding 16px. Letterboxing memperkecil UI. Aset bukan file kecil, tetapi teks antarmuka menjadi kecil dan terlihat lunak setelah diskalakan. Layout kartu juga memberi inset tambahan. Gunakan presentasi landscape mendekati rasio asli, tanpa berulang kali membungkus screenshot dengan padding.
3. **Batas media dan batas teks tidak selalu sama.** Header, hero, copy showcase, dan kartu mempunyai aturan inset berbeda. Tetapkan satu gutter halaman; sumbu kolom yang sama untuk judul, media, caption dan tautan. Panel berwarna boleh punya inset, tetapi jangan menambah inset lagi pada isi screenshot.
4. **Pengelompokan ruang belum jelas.** Screenshot mobile memperlihatkan jarak panjang setelah caption hero, antara judul selected work dan isi, serta antara deskripsi layanan dan tautan buktinya. Desktop mempunyai copy showcase yang pendek di bidang tinggi. Jangan mengurangi semua margin: pisahkan spacing dalam komponen dari spacing antarseksi.
5. **Showcase menyembunyikan proyek penting.** Merbaoe dan Flamboys sebaiknya terlihat langsung, bukan hanya sesudah klik selector. Pertahankan satu interaksi bermakna untuk berpindah layar dalam satu proyek, bila diperlukan; jangan menggantungkan seluruh kurasi pada carousel proyek.
6. **Gerak harus mempertahankan grid.** Audit sebelumnya masih mencatat horizontal travel pada principles About. Untuk perapian lintas halaman, nonaktifkan perpindahan horizontal copy dan pastikan kondisi diam maupun tengah scroll sama-sama rapi.

Target awal implementasi: gutter desktop 32px/mobile 16–20px; gap kolom 32px; nama–deskripsi 8px; gambar–caption 16px; judul section–isi 24–32px; pergantian section 96–120px desktop dan 64–80px mobile. Ini titik awal, bukan hasil pengujian perubahan. Nilai optik harus diuji pada screenshot baru. Tidak mengganti font/palet atau menambahkan dekorasi.

## Urutan homepage yang disarankan

| Posisi | Proyek | Bukti yang dibawa | Pilihan visual |
| --- | --- | --- | --- |
| Pembuka utama | Magic Pin | Produk kolektor lintas web/mobile; atribusi kolaboratif tetap | `Web - Map Tiles - List Map.png` sebagai gambar besar; mobile map menjadi layar alternatif, bukan duplikat mini yang selalu berdampingan |
| Featured operasional | Kopi Merbaoe | UI kasir, bahan/resep, HPP, shift, laporan dan audit | Layar cashier untuk pengenal; rekonsiliasi inventory dan shift untuk pendalaman. Perlu capture bersih dan konfirmasi status/kontribusi sebelum publikasi |
| Featured operasional | Flamboys | Workflow roasting yang spesifik, bukan dashboard generik | `Admin - LogRORDetails.png` sebagai visual utama; mobile roasting untuk penjelasan proses di case study |
| Selected work | 2Watuju | Front-end arsitektur dan eksplorasi proyek | `DashboardCatalog.png` untuk variasi bangunan atau `ProjectReview.png` untuk fokus pada satu rumah; hindari `ProjectDetail.png` sebagai cover karena gambar bangunannya terpotong |
| Selected work | JustSpeak | Platform belajar; kontribusi tercatat back-end | `Dashboard.png` menarik sebagai cover konteks produk. Jangan mengklaim desain UI sebagai kontribusi pengguna. `Quiz.png` mengandung Testing/Lorem ipsum, bukan pilihan publik utama |
| Supporting work | DIGIVASS | Workflow lapangan, validasi dan koordinasi | Jangan memakai `AdminValidation.png` mentah: terlihat identitas, koordinat dan dokumen. Perlu screenshot aman; dashboard saat ini minim isi dan poster mobile punya banyak teks/mockup |
| Supporting work | SpekHP | Discovery dan perbandingan perangkat | `Main.png` lebih terbaca untuk cover; bagian atas `Dashboard-HPCompare.png` untuk bukti fitur, bukan mengecilkan seluruh capture sepanjang 5188px |
| Produk sendiri, terpisah | Phera | POS modular yang sedang dikembangkan, menurut pengguna | Label jelas “In development”. Belum ada screenshot Phera yang ditinjau dalam audit ini. Jangan memakai gambar Merbaoe sebagai pengganti atau menyatakan hubungan keduanya tanpa konfirmasi |
| Arsip/case study | SiCater, UBM, CCED, proyek lain | Tetap menjaga kelengkapan bukti | Turun dari pembuka, bukan dihapus atau dinilai buruk secara teknis |

Usulan komposisi: intro ringkas + Magic Pin besar; Merbaoe dan Flamboys sebagai dua cerita pendek yang terlihat langsung; selected work dengan baseline caption konsisten; bagian Phera in-development; services ringkas dan contact. Bukan semua proyek dibuat sama besar. Homepage memilih, Work mengarsipkan.

## Merbaoe: potensi dan batas bukti

Folder berisi 22 PNG. Sebelas file dibuka langsung: cashier, admin dashboard, products, inventory report, profit report, admin shifts, audit versi 22:59, cashier shift, dan tiga file Screenshot 22:30/22:31/22:32. File lain baru diinventarisasi, bukan dinilai secara visual.

Kekuatan yang benar-benar terlihat:

- Bahasa visual merek menyambung antara kasir dan administrasi: logo rumah, judul serif, warna merah kecokelatan.
- Kasir memperlihatkan pilihan produk, keranjang, diskon, pajak, metode pembayaran dan uang kembali.
- Menu memperlihatkan HPP, margin dan hubungan resep/bahan.
- Laporan inventory memperlihatkan mutasi persediaan dan rekonsiliasi; laporan laba membedakan HPP, beban operasional dan pembelian persediaan.
- Shift membandingkan kas seharusnya dan aktual; audit memperlihatkan perubahan sebelum/sesudah.

Ini bahan narasi sistem yang lebih spesifik daripada sekadar “dashboard modern”. Screenshot hanya membuktikan tampilan dan alur yang ditampilkan, bukan kebenaran perhitungan, implementasi backend, penggunaan produksi, omzet, atau outcome bisnis.

Kesiapan aset:

- Cashier dan dashboard berisi label “UJI QA”, produk tanpa foto, dan catatan pengujian. Jangan menjadikannya hero final tanpa penjelasan.
- Laporan, transaksi dan pengguna mengandung nama serta angka operasional. Konfirmasi apakah data demo atau data yang diizinkan untuk publik.
- Capture ulang dari environment demo dengan data yang memang ditandai sebagai contoh; jangan mengedit angka screenshot agar terlihat sebagai hasil klien.
- Pilih tiga sampai lima layar yang membentuk cerita: kasir → resep/stok → rekonsiliasi/shift. Login, formulir akun, dan daftar panjang tidak perlu memenuhi homepage.

Riset publik menemukan artikel **IDN Times Lampung, 3 Mei 2026**, tentang Kopi Merbaoe di Bandar Lampung dengan bangunan rumah panggung kayu dan taman. Nama dan konteksnya selaras dengan branding screenshot, tetapi artikel tersebut tidak membuktikan siapa pembuat software atau status implementasinya. Hasil “Ikan Bakar Merbaoe” tidak dipakai karena bisa merujuk usaha berbeda.

Sumber: https://lampung.idntimes.com/news/lampung/suasana-syahdu-kopi-merbaoe-di-bandar-lampung-00-jf67w-gpdhwx

Tidak ada foto internet yang diunduh atau digunakan pada situs.

## Pemeriksaan saat audit

- Skill lint pada 11 file home/shared: **0 FAIL, 4 WARN** (tiga frasa copy lama dan penggunaan em dash). Bukan sertifikasi visual.
- Skill inspector homepage pada 1440/768/390px: **0 FAIL, 1 WARN**, yakni tanpa video. Screenshot produk nyata lebih relevan daripada menambah footage yang tidak berkaitan.
- Ketujuh output screenshot inspector dibuka: desktop fold dan dua page sheets; tablet fold/page; mobile fold/page. Bukti di `.taste-skill/curation-audit/`.
- Tidak ada perubahan aplikasi atau pengujian interaksi baru dalam audit ini. Pemeriksaan lintas route dari pekerjaan sebelumnya tidak diklaim sebagai pengujian baru.

ROUND 1 — audit, tanpa implementasi
Seen in one second: headline besar dan dashboard SiCater yang kecil di dalam bidang pucat.
Idea (one sentence): bukti software nyata seharusnya membentuk kurasi kemampuan studio, tetapi pembukanya belum menunjukkan pilihan terkuat.
Live thing: selector proyek Magic Pin / SiCater / UBM.
Layout words by section: hero=split / showcase=stage / selected=archive / capabilities=rows / lab=colour field / studio=note / footer=statement.
Scores: design 6.5 · usability 7.5 · creativity 6 · content 7.5 → overall 6.8.
Caps applied: kreativitas maksimal 6 karena komposisi pembuka masih kategori generik. Nilai subjektif, bukan penilaian independen.
Top three problems (most visible first), each with the screenshot it shows in and the fix:
1. desktop-fold.jpg: hero SiCater lebih tampak sebagai dashboard yang dikecilkan daripada bukti unggulan. Ganti hierarki pembuka dengan Magic Pin dan besarkan bagian antarmuka yang relevan.
2. desktop-page-01.jpg: inset artboard dan rasio screenshot mengurangi ukuran produk; copy showcase singkat mengisi bidang tinggi. Satukan aturan media dan gunakan proporsi alami serta caption di luar gambar.
3. mobile-page-01.jpg: ruang besar antarpotongan yang berkaitan memutus ritme pembacaan. Terapkan jarak bertingkat dan kelompokkan judul–deskripsi–tautan sebagai satu unit.

Direction context: The well-kept board, seed 1952153374, diteruskan tanpa redraw karena pengguna menyukai gaya yang ada. Audit ini menggunakan prinsip shared edges, proximity, factual imagery dan visual critique dari skill; bukan alasan untuk redesign dari nol.

## Fakta yang perlu dikonfirmasi sebelum menambah case study Merbaoe

Peran pengguna (solo/full-stack/kolaborasi), status (dipakai operasional/pilot/demo), dan apakah nama/angka pada screenshot merupakan data demo atau aman dipublikasikan. Durasi, stack, outcome dan kaitan dengan Phera belum ditetapkan dari screenshot.
