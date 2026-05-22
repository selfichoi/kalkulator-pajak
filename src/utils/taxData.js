export const taxData = {
  bkp_umum: {
    label: "Jenis BKP Umum",
    items: [
      {n:"Barang dagangan / perdagangan umum",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% standar atas seluruh nilai BKP",hk:"UU HPP No.7/2021 Ps.7"},
      {n:"Bahan baku & bahan penolong industri",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Barang modal / mesin & peralatan pabrik",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%; dapat fasilitas di KEK/kawasan tertentu",hk:"PP 40/2021"},
      {n:"Peralatan kantor & furnitur",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Pakaian & tekstil",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Kosmetik & produk perawatan diri",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Obat-obatan non-resep (OTC)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Bahan bakar minyak (BBM) non-subsidi",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% atas penyerahan BBM non-subsidi",hk:"PMK 196/2021"},
      {n:"Pupuk non-bersubsidi",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%; pupuk bersubsidi dibebaskan",hk:"PMK 44/2022"},
      {n:"Material bangunan (semen, bata, besi, pasir)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Suku cadang kendaraan",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
    ]
  },
  minuman_alkohol: {
    label: "Golongan Minuman Beralkohol",
    items: [
      {n:"Golongan A — kadar ≤5% (bir, cider ringan)",ppn:12,ppnbm:10,dpp:100,note:"PPN 12% + PPnBM 10%",hk:"PMK 62/2023"},
      {n:"Golongan B — kadar 5–20% (wine, sake)",ppn:12,ppnbm:20,dpp:100,note:"PPN 12% + PPnBM 20%",hk:"PMK 62/2023"},
      {n:"Golongan C — kadar >20% (spirits, whisky, vodka)",ppn:12,ppnbm:40,dpp:100,note:"PPN 12% + PPnBM 40%",hk:"PMK 62/2023"},
      {n:"Minuman fermentasi tradisional (tuak, arak lokal)",ppn:12,ppnbm:10,dpp:100,note:"PPnBM 10% — produk tradisional Gol. A",hk:"PMK 62/2023"},
    ]
  },
  kendaraan: {
    label: "Jenis Kendaraan Bermotor",
    items: [
      {n:"Kendaraan listrik (EV) LCGC roda 4",ppn:1,ppnbm:0,dpp:100,note:"PPN DTP efektif 1%, PPnBM 0% — insentif EV pemerintah",hk:"PP 74/2021 + PMK 38/2023"},
      {n:"Kendaraan listrik (EV) non-LCGC roda 4",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%, PPnBM 0% — insentif PPnBM EV berlaku",hk:"PP 74/2021"},
      {n:"Sedan / station wagon — mesin ≤1.500 cc",ppn:12,ppnbm:15,dpp:100,note:"PPN 12% + PPnBM 15%",hk:"PMK 141/2021"},
      {n:"Sedan / station wagon — mesin 1.500–3.000 cc",ppn:12,ppnbm:40,dpp:100,note:"PPN 12% + PPnBM 40%",hk:"PMK 141/2021"},
      {n:"Sedan / station wagon — mesin >3.000 cc",ppn:12,ppnbm:125,dpp:100,note:"PPN 12% + PPnBM 125% (tarif tertinggi)",hk:"PMK 141/2021"},
      {n:"SUV / MPV — mesin ≤1.500 cc",ppn:12,ppnbm:15,dpp:100,note:"PPN 12% + PPnBM 15%",hk:"PMK 141/2021"},
      {n:"SUV / MPV — mesin 1.500–2.500 cc",ppn:12,ppnbm:20,dpp:100,note:"PPN 12% + PPnBM 20%",hk:"PMK 141/2021"},
      {n:"SUV / MPV — mesin >2.500 cc",ppn:12,ppnbm:40,dpp:100,note:"PPN 12% + PPnBM 40%",hk:"PMK 141/2021"},
      {n:"MPV / minibus angkutan umum",ppn:12,ppnbm:0,dpp:100,note:"Tidak kena PPnBM — kendaraan angkutan umum",hk:"PMK 141/2021"},
      {n:"Pickup / kabin ganda / truk niaga",ppn:12,ppnbm:0,dpp:100,note:"Tidak kena PPnBM — kendaraan niaga",hk:"PMK 141/2021"},
      {n:"Bus & angkutan umum besar",ppn:12,ppnbm:0,dpp:100,note:"Tidak kena PPnBM",hk:"PMK 141/2021"},
      {n:"Ambulans / pemadam kebakaran / mobil jenazah",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — kendaraan kepentingan sosial",hk:"PMK 44/2022"},
      {n:"Sepeda motor — mesin ≤250 cc",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%, tidak kena PPnBM",hk:"PMK 141/2021"},
      {n:"Sepeda motor — mesin 250–500 cc",ppn:12,ppnbm:60,dpp:100,note:"PPN 12% + PPnBM 60%",hk:"PMK 141/2021"},
      {n:"Sepeda motor mewah — mesin >500 cc",ppn:12,ppnbm:95,dpp:100,note:"PPN 12% + PPnBM 95%",hk:"PMK 141/2021"},
      {n:"Yacht / kapal pesiar penumpang",ppn:12,ppnbm:75,dpp:100,note:"PPN 12% + PPnBM 75%",hk:"PMK 141/2021"},
      {n:"Pesawat terbang pribadi / jet",ppn:12,ppnbm:50,dpp:100,note:"PPN 12% + PPnBM 50%",hk:"PMK 141/2021"},
    ]
  },
  elektronik: {
    label: "Jenis Elektronik & Barang Mewah",
    items: [
      {n:"Smartphone / tablet / laptop",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%, tidak kena PPnBM",hk:"UU HPP"},
      {n:"Televisi, kulkas, mesin cuci (konsumen umum)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"AC komersial kapasitas besar (>2 PK)",ppn:12,ppnbm:10,dpp:100,note:"PPN 12% + PPnBM 10%",hk:"PMK 141/2021"},
      {n:"Kamera & peralatan fotografi profesional",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Perhiasan emas & berlian (toko perhiasan)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%; ada mekanisme pemungutan khusus toko emas",hk:"PMK 48/2023"},
      {n:"Jam tangan mewah",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Senjata api & amunisi (non-pemerintah)",ppn:12,ppnbm:50,dpp:100,note:"PPN 12% + PPnBM 50%",hk:"PMK 141/2021"},
      {n:"Kapal selam / kapal perang (non-negara)",ppn:12,ppnbm:75,dpp:100,note:"PPN 12% + PPnBM 75%",hk:"PMK 141/2021"},
    ]
  },
  properti: {
    label: "Jenis Properti",
    items: [
      {n:"Rumah tapak / rukan harga ≤Rp 2 M",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% — fasilitas DTP telah berakhir 2023",hk:"PMK 120/2023"},
      {n:"Rumah tapak / rukan harga >Rp 2 M",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Apartemen / kondominium harga ≤Rp 2 M",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Apartemen / kondominium harga Rp 2–30 M",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Apartemen / kondominium super mewah >Rp 30 M",ppn:12,ppnbm:20,dpp:100,note:"PPN 12% + PPnBM 20%",hk:"PMK 86/2021"},
      {n:"Sewa ruang kantor / ruko / gudang",ppn:12,ppnbm:0,dpp:100,note:"JKP sewa — PPN 12%",hk:"UU HPP"},
      {n:"Sewa apartemen / hunian jangka panjang",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Tanah kosong (jual beli murni)",ppn:0,ppnbm:0,dpp:100,note:"BUKAN objek PPN — tanah bukan BKP",hk:"Ps.4A(2) UU PPN"},
      {n:"Rumah sederhana bersubsidi (FLPP)",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — program rumah subsidi pemerintah",hk:"PMK 44/2022"},
    ]
  },
  makmin: {
    label: "Jenis Makanan & Minuman",
    items: [
      {n:"Makanan / minuman di restoran, kafe, warung makan",ppn:0,ppnbm:0,dpp:100,note:"Tidak kena PPN Pusat — dikenakan PBJT Daerah 10% (UU HKPD)",hk:"UU HKPD No.1/2022"},
      {n:"Makanan kemasan pabrik (snack, mie instan, dll)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% — BKP makanan olahan kemasan pabrik",hk:"UU HPP"},
      {n:"Beras & gabah",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — bahan pangan pokok",hk:"PMK 44/2022"},
      {n:"Jagung & kedelai",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — bahan pangan pokok",hk:"PMK 44/2022"},
      {n:"Gula konsumsi / gula pasir",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — sembako",hk:"PMK 44/2022"},
      {n:"Susu segar (sebelum diolah)",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Daging segar (tidak diolah)",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — sembako",hk:"PMK 44/2022"},
      {n:"Ikan, udang & hasil laut segar",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Telur ayam / itik",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — sembako",hk:"PMK 44/2022"},
      {n:"Sayuran & buah-buahan segar",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Minyak goreng curah bersubsidi",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Minuman energi / kesehatan kemasan non-alkohol",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% — produk olahan kemasan",hk:"UU HPP"},
    ]
  },
  jkp: {
    label: "Jenis Jasa Kena Pajak (JKP)",
    items: [
      {n:"Jasa konsultansi (hukum, bisnis, IT, manajemen)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% atas seluruh nilai jasa",hk:"UU HPP"},
      {n:"Jasa konstruksi — perencana / pengawas",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% (PPh final konstruksi terpisah)",hk:"PP 9/2022"},
      {n:"Jasa konstruksi — pelaksana semua kualifikasi",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"PP 9/2022"},
      {n:"Jasa biro perjalanan / agen wisata",ppn:12,ppnbm:0,dpp:50,note:"DPP = 50% dari tagihan (Nilai Lain). PPN efektif = 6%",hk:"PMK 71/2022"},
      {n:"Jasa pengiriman paket / kurir",ppn:12,ppnbm:0,dpp:10,note:"DPP = 10% dari tagihan. PPN efektif = 1,2%",hk:"PMK 71/2022"},
      {n:"Jasa tenaga kerja outsourcing",ppn:12,ppnbm:0,dpp:20,note:"DPP = 20% dari nilai kontrak. PPN efektif = 2,4%",hk:"PMK 71/2022"},
      {n:"Jasa iklan & periklanan",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Jasa pemeliharaan & servis (bengkel, servis AC)",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Jasa hiburan — karaoke, nightclub, diskotek",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% + PBJT Daerah 40–75% (terpisah dari PPN)",hk:"UU HKPD + UU HPP"},
      {n:"Jasa parkir kendaraan",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Jasa kebersihan / cleaning service",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Jasa keamanan / security",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Jasa persewaan kendaraan",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
      {n:"Jasa internet & telekomunikasi",ppn:12,ppnbm:0,dpp:100,note:"PPN 12%",hk:"UU HPP"},
    ]
  },
  ekspor: {
    label: "Jenis Ekspor",
    items: [
      {n:"Ekspor BKP berwujud (barang fisik ke luar negeri)",ppn:0,ppnbm:0,dpp:100,note:"PPN 0% — Pajak Masukan tetap dapat dikreditkan",hk:"UU HPP Ps.7(2)"},
      {n:"Ekspor BKP tidak berwujud (hak, lisensi, paten)",ppn:0,ppnbm:0,dpp:100,note:"PPN 0%",hk:"UU HPP"},
      {n:"Ekspor JKP (jasa dikonsumsi di luar Indonesia)",ppn:0,ppnbm:0,dpp:100,note:"PPN 0% — syarat: pemanfaatan di luar wilayah RI",hk:"PMK 32/2019"},
    ]
  },
  impor: {
    label: "Jenis Impor",
    items: [
      {n:"Impor BKP umum",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% × Nilai Impor (harga CIF + bea masuk + cukai)",hk:"UU HPP Ps.7"},
      {n:"Impor kendaraan CBU mewah (sedan/SUV >3.000 cc)",ppn:12,ppnbm:125,dpp:100,note:"PPN 12% + PPnBM 125% + bea masuk hingga 40%",hk:"PMK 141/2021"},
      {n:"Impor barang bawaan penumpang >USD 500",ppn:12,ppnbm:0,dpp:100,note:"PPN 12% atas kelebihan threshold USD 500",hk:"PMK 203/2017"},
      {n:"Impor bahan baku industri dengan fasilitas",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN — harus memiliki izin fasilitas impor",hk:"PMK 44/2022"},
    ]
  },
  bebas: {
    label: "Jenis BKP/JKP yang Dibebaskan",
    items: [
      {n:"Vaksin & obat tertentu (daftar pemerintah)",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Alat kesehatan tertentu (tercantum dalam daftar PMK)",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Buku pelajaran & buku ilmu pengetahuan",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Kitab suci semua agama",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Pupuk bersubsidi",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Listrik rumah tangga ≤6.600 VA",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Air bersih / air minum PDAM",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN",hk:"PMK 44/2022"},
      {n:"Kapal laut / pesawat udara — keperluan negara/TNI",ppn:0,ppnbm:0,dpp:100,note:"Dibebaskan PPN atas pengadaan pertahanan negara",hk:"PMK 44/2022"},
    ]
  },
  tidak_kena: {
    label: "Jenis yang Tidak Kena PPN",
    items: [
      {n:"Jasa pendidikan — sekolah, universitas formal",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak masuk objek PPN sama sekali",hk:"Ps.4A(3) UU PPN"},
      {n:"Jasa kesehatan medik (dokter, RS, klinik, bidan)",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak kena PPN",hk:"Ps.4A(3) UU PPN"},
      {n:"Jasa keuangan & perbankan",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak kena PPN",hk:"Ps.4A(3) UU PPN"},
      {n:"Jasa asuransi",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak kena PPN",hk:"Ps.4A(3) UU PPN"},
      {n:"Jasa angkutan umum darat, laut & udara",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak kena PPN",hk:"Ps.4A(3) UU PPN"},
      {n:"Jasa tenaga kerja / ketenagakerjaan",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak kena PPN",hk:"Ps.4A(3) UU PPN"},
      {n:"Jasa sosial & keagamaan nirlaba",ppn:0,ppnbm:0,dpp:100,note:"BUKAN JKP — tidak kena PPN",hk:"Ps.4A(3) UU PPN"},
      {n:"Uang, emas batangan investasi, surat berharga",ppn:0,ppnbm:0,dpp:100,note:"BUKAN BKP — tidak kena PPN",hk:"Ps.4A(2) UU PPN"},
      {n:"Barang hasil pertambangan langsung dari sumber (bahan mentah)",ppn:0,ppnbm:0,dpp:100,note:"BUKAN BKP — tidak kena PPN",hk:"Ps.4A(2) UU PPN"},
      {n:"Tanah (termasuk tanah + bangunan jika jual tanah murni)",ppn:0,ppnbm:0,dpp:100,note:"BUKAN BKP — penyerahan tanah bukan objek PPN",hk:"Ps.4A(2) UU PPN"},
    ]
  }
};