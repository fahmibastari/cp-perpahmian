# Portfolio repair — 17 Oktober 2026

Perbaikan mengikuti audit detail sebelumnya, bukan rebrand baru. Vanilla HTML/CSS/JavaScript, Manrope, hijau #8BCF6A, hitam #111111, putih, logo, aset asli, dan data proyek dipertahankan. `projects.js` tidak diubah. Tidak menambahkan client, testimonial, metrik, atau hasil bisnis.

## Perubahan utama

- Home: pulihkan showcase tiga proyek dengan pemilih manual. Hentikan pemuatan transformer scroll-story yang mengganti lalu menyembunyikan showcase. SiCater menjadi bukti visual untuk positioning operasional di hero.
- Kontras: perbaiki pewarisan warna teks pada proses Services, detail implementasi case study, panel kapabilitas, dan pengantar About. Warna role founder kembali ke tinta utama.
- Layout: hilangkan tinggi minimum berlebihan pada hero, kartu Work, studio note, proses, dan footer; hilangkan kolom diagram proses yang sudah disembunyikan. Perbaiki judul prinsip About yang terpotong pada tablet dan rasio kotak logo yang meninggalkan ruang kosong.
- Typography/copy: ringkas headline Services, Contact, dan 404; judul utama Home/Services/Contact terverifikasi dua baris pada 1440/768/390px. Bukan klaim bahwa seluruh heading di setiap proyek sudah dua baris.
- Bukti: tampilkan kembali ringkasan proyek Work. Gunakan `contain` untuk screenshot antarmuka, sehingga bukti tidak terpotong. Atribusi, batas kontribusi, konteks deployment, dan tautan ke layar case study tetap ada.
- Interaksi: pemilih showcase, filter, menu, viewer, dan reduced-motion dipertahankan; hapus observer counter yang berisiko memicu dirinya sendiri. FAQ memakai satu indikator plus/minus.

## Verifikasi

- Browser inspector skill dijalankan pada delapan template, dengan screenshot desktop 1440px, tablet 768px, dan mobile 390px. Browser Chromium lokal, bukan pengujian perangkat fisik/Safari.
- Tes regresi presentasi mencakup delapan template pada tiga viewport, ditambah seluruh 18 proyek pada 320px dan 1440px: 60 kombinasi. Tes memeriksa overflow, clipping heading, kontras komponen yang diperbaiki, screenshot contain, gambar rusak, dan konten yang sebelumnya tersembunyi. Ini bukan audit WCAG menyeluruh.
- Interaksi diuji: tiga pilihan showcase, menu Escape dan pengembalian fokus, filter 5 R&D / 13 client / 18 total, viewer next/Escape/fokus, dan perubahan preferensi reduced-motion saat halaman terbuka.
- Tes source lulus: site, case study, services, editorial, public links, contact (8 kelompok dengan provider stub), dan intent. Pemeriksaan sintaks JavaScript serta `git diff --check` lulus.
- Tidak melakukan pengiriman form nyata, push, atau deploy.

## Belum bersih

Lint gaya skill masih melaporkan **45 FAIL / 13 WARN** pada 21 source yang dipindai: terutama deklarasi monospace, aturan garis tipis, dekorasi/penomoran, dan kode gaya lama. Sebagian ditimpa oleh CSS aktif, tetapi source tetap belum bersih. Tidak menggunakan ignore/allow untuk membuat hasil tampak lulus.

Inspector juga belum sepenuhnya lulus:

| Template | FAIL terakhir | Catatan |
| --- | ---: | --- |
| Home | 1 | Tautan bukti baris sebelumnya terdeteksi sebagai label di atas heading berikutnya. |
| Work | 0 | Peringatan repetisi kartu dan tidak ada footage. |
| Services | 1 | Catatan engagement sebelum baris berikutnya terdeteksi sebagai label heading. |
| About | 1 | Pola kartu prinsip; kontras pengantar telah diperbaiki. |
| Case study SiCater | 1 | Label navigasi “Next project”. |
| Contact | 2 | Jumlah gambar dan motion di bawah batas skill. |
| Privacy | 3 | Pola kartu, jumlah gambar, dan motion. |
| 404 | 2 | Jumlah gambar dan label “404 / Off route”. |

Sisa visual: terlalu banyak variasi ukuran teks, beberapa metadata kecil, susunan kartu yang berulang, dan jarak antarbagian yang belum sepenuhnya konsisten. Tidak menambahkan gambar/video generik ke halaman form atau legal hanya untuk memenuhi jumlah minimum. Peringatan ini tetap dicatat sebagai belum lulus, bukan dikecualikan diam-diam.

## Arah dan penilaian

Tetap memakai **The well-kept board**, seed **1952153374**, tanpa redraw. Antarmuka nyata studio menjadi kumpulan bukti proyek; elemen interaktif utamanya adalah pemilih proyek manual. Tidak ada gambar baru, gambar pengganti, atau contoh data yang perlu diganti sebelum launch.

Setelah tiga putaran perbaikan, penilaian mandiri: design 6.5, usability 7.5, creativity 6, content 8; overall **6.0/10 setelah cap skill** karena masih ada FAIL inspector. Ini hasil perbaikan masalah terbesar, bukan klaim hasil final yang sudah sempurna atau seluruh gate lulus.

Screenshot dan hasil mesin ada di `.taste-skill/repair-r3-*` dan `.taste-skill/repair-browser/report.json`. Catatan putaran ada di `.taste-skill/repair-notes.md`.
