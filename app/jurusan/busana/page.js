"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const defaultData = {
  hero: {
    tagline: "Merancang Busana,",
    tagline2: "Merajut Impian",
    subtitle: "Jurusan Tata Busana — SMK Negeri 5 Malang",
    heroImage: "/images/busana/awal.jpeg",
  },
  sejarah: {
    tahun: "2001",
    judul: "Dari Jarum ke Panggung Mode",
    teks: "Jurusan Tata Busana SMK Negeri 5 Malang berdiri sejak tahun 2001/2002, hadir untuk menempa generasi perancang dan pembuat busana profesional. Kami mengajarkan teknik menjahit, draping, desain mode, hingga produksi busana — dari karya harian hingga busana panggung bergengsi seperti Malang Fashion Week.",
    image: "/images/busana/sejarah.jpeg",
  },
  stats: [
    { angka: "23+", label: "Tahun Berdiri" },
    { angka: "6", label: "Guru Ahli" },
    { angka: "5+", label: "Prestasi" },
    { angka: "2x", label: "Malang Fashion Week" },
  ],
  karya: [{ image: "/images/busana/karya1.jpeg" }, { image: "/images/busana/karya2.jpeg" }, { image: "/images/busana/karya3.jpeg" }, { image: "/images/busana/karya4.jpeg" }],
  prestasi: [
    { judul: "Juara 3 LKS Tingkat Kota Malang", tahun: "2025", tingkat: "Kota", keterangan: "Bidang Tata Busana" },
    { judul: "Juara 3 LKS Tingkat Kota Malang", tahun: "2022", tingkat: "Kota", keterangan: "Bidang Tata Busana" },
    { judul: "Partisipan Malang Fashion Week", tahun: "2024", tingkat: "Kota", keterangan: "Peragaan Busana" },
    { judul: "Kolaborasi Fashion UM", tahun: "2023", tingkat: "Kota", keterangan: "Universitas Negeri Malang" },
  ],
  guru: [
    { nama: "Bu Herawati", jabatan: "Kaproli Tata Busana", image: "/images/busana/guru1.jpg" },
    { nama: "Bu Nidya", jabatan: "Ketua Bengkel", image: "/images/busana/guru2.jpg" },
    { nama: "Bu Erni", jabatan: "Guru Tata Busana", image: "/images/busana/guru3.jpg" },
    { nama: "Bu Diyarti", jabatan: "Guru Tata Busana", image: "" },
    { nama: "Bu Sulistiarini", jabatan: "Guru Tata Busana", image: "/images/busana/guru5.jpg" },
    { nama: "Bu Elisa", jabatan: "Guru Tata Busana", image: "/images/busana/guru6.jpg" },
  ],
  fasilitas: [
    { nama: "Ruang Jahit", desc: "Laboratorium menjahit dengan mesin jahit industri dan mesin obras modern" },
    { nama: "Studio Desain", desc: "Ruang menggambar dan merancang pola busana dengan peralatan lengkap" },
    { nama: "Ruang Draping", desc: "Area khusus praktik draping dan pembuatan busana di atas dress form" },
    { nama: "Showroom Busana", desc: "Galeri pameran koleksi busana terbaik karya siswa" },
  ],
  contact: {
    alamat: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142",
    telepon: "(0341) 478195",
    email: "busana@smkn5malang.sch.id",
    jamOperasional: "Senin – Jumat: 07.00 – 16.00 WIB",
  },
};

export default function JurusanBusana() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "jurusan", "busana"));
        if (snap.exists()) setData({ ...defaultData, ...snap.data() });
      } catch (e) {
        console.log("Menggunakan data default");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleKirimWA = () => {
    const { nama, hp, keperluan, pesan } = formData;
    if (!nama || !hp) {
      alert("Nama dan nomor HP wajib diisi.");
      return;
    }
    const nomorWA = "6285732453696";
    const text = `Halo Tata Busana SMK Negeri 5 Malang!%0A%0A*Nama:* ${nama}%0A*No. HP:* ${hp}%0A*Keperluan:* ${keperluan || "-"}%0A*Pesan:* ${pesan || "-"}`;
    window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
  };

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAFF" }}>
        <p style={{ color: "#7B5EA7", letterSpacing: "0.2em", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>MEMUAT...</p>
      </div>
    );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAFAFF", color: "#1A1028", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link { color: #1A1028; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; opacity: 0.5; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; }
        .section { padding: 100px 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
        .label { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: #7B5EA7; margin-bottom: 20px; display: block; }
        .karya-card:hover .karya-overlay { opacity: 1; }
        .karya-overlay { opacity: 0; transition: opacity 0.4s; }
        @media (max-width: 768px) {
          .container { padding: 0 24px; }
          .section { padding: 60px 0; }
          .hero-title { font-size: 52px !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .karya-grid { grid-template-columns: repeat(2,1fr) !important; }
          .guru-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(250,250,255,0.95)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(123,94,167,0.1)",
          padding: "0 48px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", fontWeight: "500", letterSpacing: "0.18em", color: "#1A1028" }}>TATA BUSANA</p>
          <p style={{ fontSize: "10px", color: "#A78BCA", letterSpacing: "0.08em" }}>SMKN 5 MALANG</p>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Sejarah", "Karya", "Prestasi", "Guru", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/admin/login?jurusan=busana" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#7B5EA7", textDecoration: "none", border: "1px solid rgba(123,94,167,0.3)", padding: "7px 16px" }}>
          ADMIN
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "#1A1028", display: "flex", alignItems: "center", paddingTop: "60px", position: "relative", overflow: "hidden" }}>
        {data.hero.heroImage && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={data.hero.heroImage} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.15 }} />
          </div>
        )}
        {/* Dekorasi ungu gradient */}
        <div style={{ position: "absolute", right: "-200px", top: "-200px", width: "700px", height: "700px", borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,202,0.12) 0%, transparent 70%)", zIndex: 1 }}></div>
        <div style={{ position: "absolute", left: "-100px", bottom: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(123,94,167,0.08) 0%, transparent 70%)", zIndex: 1 }}></div>
        {/* Dekorasi garis vertikal */}
        <div style={{ position: "absolute", right: "20%", top: 0, bottom: 0, width: "1px", background: "rgba(167,139,202,0.1)", zIndex: 1 }}></div>
        <div style={{ position: "absolute", right: "38%", top: 0, bottom: 0, width: "1px", background: "rgba(167,139,202,0.06)", zIndex: 1 }}></div>
        {/* Dekorasi teks besar */}
        <div style={{ position: "absolute", right: "3%", bottom: "5%", fontSize: "200px", color: "rgba(167,139,202,0.04)", fontFamily: "'Cormorant Garamond', serif", lineHeight: 1, userSelect: "none", zIndex: 1 }}>MODE</div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "620px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#A78BCA", marginBottom: "40px", opacity: 0.8 }}>SMK NEGERI 5 MALANG — TATA BUSANA</p>
            <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "78px", color: "#FAFAFF", lineHeight: 1.0, fontWeight: 300, marginBottom: "8px" }}>
              {data.hero.tagline}
            </h1>
            <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "78px", color: "#C4A8E0", lineHeight: 1.0, fontWeight: 300, fontStyle: "italic", marginBottom: "40px" }}>
              {data.hero.tagline2}
            </h1>
            <div style={{ width: "48px", height: "1px", background: "rgba(167,139,202,0.5)", marginBottom: "28px" }}></div>
            <p style={{ color: "rgba(250,250,255,0.5)", fontSize: "15px", lineHeight: 1.85, marginBottom: "52px", maxWidth: "440px", fontWeight: 300 }}>{data.hero.subtitle}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#7B5EA7", color: "#FAFAFF", border: "none", padding: "14px 36px", fontSize: "11px", letterSpacing: "0.18em", cursor: "pointer", fontFamily: "inherit" }}
              >
                LIHAT KOLEKSI
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#FAFAFF", border: "1px solid rgba(250,250,255,0.2)", padding: "13px 36px", fontSize: "11px", letterSpacing: "0.18em", cursor: "pointer", fontFamily: "inherit" }}
              >
                HUBUNGI KAMI
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2 }}>
          <div style={{ width: "1px", height: "48px", background: "rgba(167,139,202,0.3)" }}></div>
          <span style={{ fontSize: "9px", letterSpacing: "0.22em", color: "rgba(167,139,202,0.5)" }}>SCROLL</span>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#F2EEFF", padding: "0" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ padding: "48px 32px", borderRight: i < 3 ? "1px solid rgba(123,94,167,0.1)" : "none", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", fontWeight: 300, color: "#1A1028", lineHeight: 1 }}>{s.angka}</p>
                <p style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7B5EA7", marginTop: "8px", opacity: 0.8 }}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section id="sejarah" className="section">
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <span className="label">Tentang Kami</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, lineHeight: 1.2, marginBottom: "24px" }}>{data.sejarah.judul}</h2>
              <div style={{ width: "36px", height: "1px", background: "#A78BCA", marginBottom: "24px" }}></div>
              <p style={{ color: "#3D2D5C", lineHeight: 1.9, fontSize: "15px", fontWeight: 300 }}>{data.sejarah.teks}</p>
              <p style={{ marginTop: "36px", fontSize: "10px", letterSpacing: "0.22em", color: "#7B5EA7", opacity: 0.7 }}>BERDIRI SEJAK {data.sejarah.tahun}</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "3/4", background: "#E8E0F5", overflow: "hidden" }}>
                {data.sejarah.image ? (
                  <img src={data.sejarah.image} alt="Sejarah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "100px", color: "rgba(123,94,167,0.12)", fontStyle: "italic" }}>✦</span>
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", bottom: "-16px", right: "-16px", width: "100px", height: "100px", border: "1px solid rgba(167,139,202,0.3)", zIndex: -1 }}></div>
              <div style={{ position: "absolute", top: "-16px", left: "-16px", width: "60px", height: "60px", background: "rgba(167,139,202,0.1)" }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* KEAHLIAN */}
      <section style={{ background: "#1A1028", padding: "80px 0" }}>
        <div className="container">
          <span className="label" style={{ color: "#A78BCA", opacity: 0.7 }}>
            Kompetensi
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 300, color: "#FAFAFF", marginBottom: "48px" }}>Keahlian Kami</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(167,139,202,0.1)" }}>
            {[
              { keahlian: "Desain Mode", desc: "Merancang pola dan sketsa busana dari konsep hingga produk jadi", icon: "✦" },
              { keahlian: "Teknik Jahit", desc: "Menjahit dengan mesin industri dan teknik jahit tangan yang presisi", icon: "◈" },
              { keahlian: "Draping", desc: "Membentuk busana langsung di atas dress form dengan teknik draping", icon: "◇" },
              { keahlian: "Finishing", desc: "Sentuhan akhir busana meliputi obras, pressing, dan quality control", icon: "○" },
            ].map((t, i) => (
              <div key={i} style={{ background: "#1A1028", padding: "40px 28px", borderTop: "1px solid rgba(167,139,202,0.08)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", color: "#A78BCA", marginBottom: "16px", opacity: 0.6 }}>{t.icon}</p>
                <p style={{ color: "#FAFAFF", fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}>{t.keahlian}</p>
                <p style={{ color: "rgba(250,250,255,0.4)", fontSize: "13px", lineHeight: 1.7, fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="section" style={{ background: "#F2EEFF" }}>
        <div className="container">
          <span className="label">Koleksi</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Hasil Karya</h2>
          <div className="karya-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "3px" }}>
            {data.karya.map((k, i) => (
              <div key={i} className="karya-card" style={{ position: "relative", aspectRatio: i % 2 === 0 ? "2/3" : "3/4", background: "#DDD0F0", overflow: "hidden" }}>
                {k.image ? (
                  <img src={k.image} alt={k.judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? "#D4C4EC" : "#DDD0F0" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "48px", color: "rgba(26,16,40,0.1)", fontStyle: "italic" }}>✦</span>
                  </div>
                )}
                <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(26,16,40,0.9)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px" }}>
                  <p style={{ color: "#C4A8E0", fontSize: "10px", letterSpacing: "0.18em" }}>{k.tahun}</p>
                  <p style={{ color: "#FAFAFF", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, marginTop: "4px" }}>{k.judul}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section id="prestasi" className="section">
        <div className="container">
          <span className="label">Pencapaian</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Prestasi & Kegiatan</h2>
          <div style={{ borderTop: "1px solid rgba(123,94,167,0.12)" }}>
            {data.prestasi.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "28px 0", borderBottom: "1px solid rgba(123,94,167,0.12)", gap: "32px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "rgba(167,139,202,0.3)", fontWeight: 300, minWidth: "56px" }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "16px", fontWeight: "400", marginBottom: "4px" }}>{p.judul}</p>
                  <p style={{ fontSize: "12px", color: "#7B5EA7", opacity: 0.7 }}>{p.keterangan}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "10px", padding: "4px 14px", border: "1px solid rgba(123,94,167,0.2)", color: "#7B5EA7", letterSpacing: "0.1em" }}>{p.tingkat.toUpperCase()}</span>
                  <p style={{ fontSize: "12px", color: "#A78BCA", marginTop: "6px" }}>{p.tahun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section id="guru" className="section" style={{ background: "#F2EEFF" }}>
        <div className="container">
          <span className="label">Tim Pengajar</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Guru Pengajar</h2>
          <div className="guru-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "3px" }}>
            {data.guru.map((g, i) => (
              <div key={i} style={{ background: "#FAFAFF" }}>
                <div style={{ aspectRatio: "3/4", background: "#DDD0F0", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {g.image ? (
                    <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", color: "rgba(123,94,167,0.2)", fontStyle: "italic" }}>{g.nama.split(" ").pop().charAt(0)}</span>
                  )}
                </div>
                <div style={{ padding: "16px 20px", borderTop: i < 2 ? "2px solid #7B5EA7" : "2px solid transparent" }}>
                  <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "4px" }}>{g.nama}</p>
                  <p style={{ fontSize: "11px", color: "#7B5EA7", letterSpacing: "0.04em", opacity: 0.8, lineHeight: 1.5 }}>{g.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: "11px", color: "#7B5EA7", marginTop: "16px", opacity: 0.5, letterSpacing: "0.05em" }}>* Garis ungu menandakan Kaproli dan Ketua Bengkel</p>
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" className="section">
        <div className="container">
          <span className="label">Sarana & Prasarana</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Fasilitas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(123,94,167,0.1)" }}>
            {data.fasilitas.map((f, i) => (
              <div key={i} style={{ background: "#FAFAFF", padding: "48px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", color: "rgba(167,139,202,0.2)", fontWeight: 300, marginBottom: "20px" }}>{String(i + 1).padStart(2, "0")}</p>
                <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "10px" }}>{f.nama}</p>
                <p style={{ color: "#3D2D5C", fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section" style={{ background: "#1A1028" }}>
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <span className="label" style={{ color: "#A78BCA", opacity: 0.7 }}>
                Bergabunglah
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "44px", fontWeight: 300, color: "#FAFAFF", lineHeight: 1.2, marginBottom: "20px" }}>
                Tertarik menjadi bagian dari <em style={{ color: "#C4A8E0" }}>keluarga Tata Busana?</em>
              </h2>
              <p style={{ color: "rgba(250,250,255,0.45)", fontSize: "14px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>Hubungi kami untuk informasi pendaftaran, kunjungan studio, atau bertanya seputar jurusan kami.</p>
              {[
                { icon: "📍", label: "ALAMAT", val: data.contact.alamat },
                { icon: "📞", label: "TELEPON", val: data.contact.telepon },
                { icon: "🕐", label: "JAM OPERASIONAL", val: data.contact.jamOperasional },
                { icon: "✉️", label: "EMAIL", val: data.contact.email },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", border: "1px solid rgba(167,139,202,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#A78BCA", marginBottom: "2px", opacity: 0.6 }}>{c.label}</p>
                    <p style={{ fontSize: "14px", color: "rgba(250,250,255,0.7)", fontWeight: 300 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[
                { label: "NAMA LENGKAP", placeholder: "Masukkan nama Anda", key: "nama" },
                { label: "NOMOR HP / WA", placeholder: "08xxxxxxxxxx", key: "hp" },
                { label: "KEPERLUAN", placeholder: "Informasi pendaftaran / kunjungan / lainnya", key: "keperluan" },
              ].map((f) => (
                <div key={f.key}>
                  <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#A78BCA", display: "block", marginBottom: "8px", opacity: 0.6 }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(167,139,202,0.15)", background: "rgba(250,250,255,0.05)", color: "#FAFAFF", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#A78BCA", display: "block", marginBottom: "8px", opacity: 0.6 }}>PESAN</label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                  value={formData.pesan}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pesan: e.target.value }))}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    border: "1px solid rgba(167,139,202,0.15)",
                    background: "rgba(250,250,255,0.05)",
                    color: "#FAFAFF",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>
              <button onClick={handleKirimWA} style={{ background: "#7B5EA7", color: "#FAFAFF", border: "none", padding: "14px", fontSize: "11px", letterSpacing: "0.18em", cursor: "pointer", fontFamily: "inherit", marginTop: "8px" }}>
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#0F0A1A", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ color: "rgba(250,250,255,0.25)", fontSize: "11px", letterSpacing: "0.1em" }}>© 2026 TATA BUSANA — SMK NEGERI 5 MALANG</p>
        <p style={{ color: "rgba(250,250,255,0.25)", fontSize: "11px", letterSpacing: "0.1em" }}>FASHION · DESAIN · KREATIF</p>
      </footer>
    </div>
  );
}
