"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const defaultData = {
  hero: {
    tagline: "Membentuk Tanah,",
    tagline2: "Merawat Tradisi",
    subtitle: "Jurusan Kriya Keramik — SMK Negeri 5 Malang",
    heroImage: "/images/keramik/awal halaman.jpg",
  },
  sejarah: {
    tahun: "1998",
    judul: "Dari Kriya ke Keramik",
    teks: "Jurusan Kriya Keramik SMK Negeri 5 Malang berdiri sejak 1998, bermula dari jurusan Kriya yang mencakup keramik, kayu, dan tekstil. Kini kami fokus menempa ahli keramik yang menguasai berbagai teknik pembentukan — dari teknik pilin, teknik putar, hingga teknik jiger dan cetak tuang. Kami menghasilkan karya aksesori, suvenir, tableware, hingga piring produksi.",
    image: "/images/keramik/gambar1.jpg",
  },
  stats: [
    { angka: "26+", label: "Tahun Berdiri" },
    { angka: "4", label: "Teknik Keahlian" },
    { angka: "4", label: "Guru Ahli" },
    { angka: "10+", label: "Prestasi Nasional" },
  ],
  karya: [
    { judul: "Teknik Cetak di Tekel Keramik", image: "/images/keramik/karya1.jpeg" },
    { judul: "Teknik Slap Berbentuk Sandal", image: "/images/keramik/karya2.jpeg" },
    { judul: "Teknik Slap Berbentuk Kaki", image: "/images/keramik/karya3.jpeg" },
  ],
  prestasi: [
    { judul: "LKS Harapan 2 Nasional", tahun: "2015", tingkat: "Nasional", kota: "Tangerang" },
    { judul: "LKS Harapan 2 Nasional", tahun: "2014", tingkat: "Nasional", kota: "Palembang" },
    { judul: "LKS Juara 5 Nasional", tahun: "2013", tingkat: "Nasional", kota: "Jakarta" },
    { judul: "LKS Harapan 1 Nasional", tahun: "2011", tingkat: "Nasional", kota: "Jakarta" },
  ],
  guru: [
    { nama: "Pak Aryono", jabatan: "Teknik Pilin", image: "" },
    { nama: "Pak Heri", jabatan: "Teknik Putar", image: "/images/keramik/guru3.jpg" },
    { nama: "Pak Isnur", jabatan: "Teknik Putar & Pilin", image: "/images/keramik/guru2.jpg" },
    { nama: "Pak Icuk", jabatan: "Teknik Jiger, Cetak & Cetak Tuang · Kaproli", image: "" },
  ],
  fasilitas: [
    { nama: "Studio Pembentukan", desc: "Ruang praktik teknik pilin dan putar dengan meja putar profesional" },
    { nama: "Lab Jiger & Cetak", desc: "Area khusus teknik jiger, cetak, dan cetak tuang produk massal" },
    { nama: "Tungku Pembakaran", desc: "Tungku listrik dan gas untuk proses glasir dan pembakaran keramik" },
    { nama: "Galeri Karya", desc: "Ruang pameran dan showroom hasil karya siswa terbaik" },
  ],
  contact: {
    alamat: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142",
    telepon: "(0341) 478195",
    email: "keramik@smkn5malang.sch.id",
    jamOperasional: "Senin – Jumat: 07.00 – 16.00 WIB",
  },
};

export default function JurusanKeramik() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "jurusan", "keramik"));
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
    const nomorWA = "85732453696";
    const text = `Halo Kriya Keramik SMK Negeri 5 Malang!%0A%0A*Nama:* ${nama}%0A*No. HP:* ${hp}%0A*Keperluan:* ${keperluan || "-"}%0A*Pesan:* ${pesan || "-"}`;
    window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
  };

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#F8FBFF" }}>
        <p style={{ color: "#005B8E", letterSpacing: "0.2em", fontSize: "12px", fontFamily: "Inter, sans-serif" }}>MEMUAT...</p>
      </div>
    );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F8FBFF", color: "#002744", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link { color: #002744; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; opacity: 0.5; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; }
        .section { padding: 100px 0; }
        .container { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
        .label { font-size: 10px; letter-spacing: 0.25em; text-transform: uppercase; color: #005B8E; margin-bottom: 20px; display: block; }
        .btn-primary { background: #002744; color: #F8FBFF; border: none; padding: 14px 36px; font-size: 12px; letter-spacing: 0.15em; cursor: pointer; transition: background 0.2s; font-family: inherit; }
        .btn-primary:hover { background: #005B8E; }
        .btn-ghost { background: transparent; color: #F8FBFF; border: 1px solid rgba(248,251,255,0.3); padding: 13px 36px; font-size: 12px; letter-spacing: 0.15em; cursor: pointer; transition: all 0.2s; font-family: inherit; }
        .btn-ghost:hover { background: rgba(248,251,255,0.1); }
        .karya-card:hover .karya-overlay { opacity: 1; }
        .karya-overlay { opacity: 0; transition: opacity 0.4s; }
        @media (max-width: 768px) {
          .container { padding: 0 24px; }
          .section { padding: 60px 0; }
          .hero-title { font-size: 52px !important; }
          .two-col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: repeat(2,1fr) !important; }
          .guru-grid { grid-template-columns: repeat(2,1fr) !important; }
          .teknik-grid { grid-template-columns: repeat(2,1fr) !important; }
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
          background: "rgba(248,251,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(0,91,142,0.1)",
          padding: "0 48px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p style={{ fontSize: "12px", fontWeight: "500", letterSpacing: "0.15em", color: "#002744" }}>KRIYA KERAMIK</p>
          <p style={{ fontSize: "10px", color: "#7DB8D8", letterSpacing: "0.08em" }}>SMKN 5 MALANG</p>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Sejarah", "Karya", "Prestasi", "Guru", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/admin/login?jurusan=keramik" style={{ fontSize: "11px", letterSpacing: "0.1em", color: "#005B8E", textDecoration: "none", border: "1px solid rgba(0,91,142,0.2)", padding: "7px 16px" }}>
          ADMIN
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "100vh", background: "#002744", display: "flex", alignItems: "center", paddingTop: "60px", position: "relative", overflow: "hidden" }}>
        {data.hero.heroImage && (
          <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
            <img src={data.hero.heroImage} alt="Hero" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.18 }} />
          </div>
        )}
        <div style={{ position: "absolute", right: "-100px", top: "50%", transform: "translateY(-50%)", width: "600px", height: "600px", borderRadius: "50%", border: "1px solid rgba(125,184,216,0.1)", zIndex: 1 }}></div>
        <div style={{ position: "absolute", right: "-60px", top: "50%", transform: "translateY(-50%)", width: "450px", height: "450px", borderRadius: "50%", border: "1px solid rgba(125,184,216,0.08)", zIndex: 1 }}></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ maxWidth: "600px" }}>
            <p style={{ fontSize: "10px", letterSpacing: "0.3em", color: "#7DB8D8", marginBottom: "40px", opacity: 0.7 }}>SMK NEGERI 5 MALANG — KRIYA KERAMIK</p>
            <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "76px", color: "#F8FBFF", lineHeight: 1.05, fontWeight: 300, marginBottom: "8px" }}>
              {data.hero.tagline}
            </h1>
            <h1 className="hero-title" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "76px", color: "#7DB8D8", lineHeight: 1.05, fontWeight: 300, fontStyle: "italic", marginBottom: "40px" }}>
              {data.hero.tagline2}
            </h1>
            <div style={{ width: "40px", height: "1px", background: "#7DB8D8", marginBottom: "28px", opacity: 0.5 }}></div>
            <p style={{ color: "rgba(248,251,255,0.5)", fontSize: "15px", lineHeight: 1.8, marginBottom: "52px", maxWidth: "420px", fontWeight: 300 }}>{data.hero.subtitle}</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}>
                LIHAT KARYA
              </button>
              <button className="btn-ghost" onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}>
                HUBUNGI KAMI
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "36px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 2 }}>
          <div style={{ width: "1px", height: "48px", background: "rgba(125,184,216,0.3)" }}></div>
          <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(125,184,216,0.4)" }}>SCROLL</span>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#F0F7FF", padding: "0" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ padding: "48px 32px", borderRight: i < 3 ? "1px solid rgba(0,91,142,0.1)" : "none", textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", fontWeight: 300, color: "#002744", lineHeight: 1 }}>{s.angka}</p>
                <p style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#005B8E", marginTop: "8px", opacity: 0.7 }}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section id="sejarah" className="section">
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", background: "#D4E8F5", overflow: "hidden" }}>
                {data.sejarah.image ? (
                  <img src={data.sejarah.image} alt="Sejarah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "140px", color: "rgba(0,39,68,0.1)", fontStyle: "italic" }}>陶</span>
                  </div>
                )}
              </div>
              <div style={{ position: "absolute", top: "-16px", left: "-16px", width: "80px", height: "80px", border: "1px solid rgba(0,91,142,0.2)" }}></div>
            </div>
            <div>
              <span className="label">Tentang Kami</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, lineHeight: 1.2, marginBottom: "28px" }}>{data.sejarah.judul}</h2>
              <div style={{ width: "32px", height: "1px", background: "#7DB8D8", marginBottom: "24px" }}></div>
              <p style={{ color: "#335577", lineHeight: 1.9, fontSize: "15px", fontWeight: 300 }}>{data.sejarah.teks}</p>
              <p style={{ marginTop: "36px", fontSize: "10px", letterSpacing: "0.2em", color: "#005B8E", opacity: 0.6 }}>EST. {data.sejarah.tahun}</p>
            </div>
          </div>
        </div>
      </section>

      {/* TEKNIK */}
      <section style={{ background: "#002744", padding: "80px 0" }}>
        <div className="container">
          <span className="label" style={{ color: "#7DB8D8", opacity: 0.6 }}>
            Keahlian
          </span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", fontWeight: 300, color: "#F8FBFF", marginBottom: "48px" }}>Teknik Pembentukan</h2>
          <div className="teknik-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "rgba(125,184,216,0.1)" }}>
            {[
              { teknik: "Teknik Pilin", desc: "Membentuk keramik dengan cara memilih tanah liat menjadi gulungan panjang lalu disusun", icon: "〇" },
              { teknik: "Teknik Putar", desc: "Membentuk keramik di atas meja putar dengan tekanan tangan yang presisi dan terlatih", icon: "◎" },
              { teknik: "Teknik Jiger", desc: "Pembentukan massal menggunakan cetakan jiger untuk menghasilkan produk seragam", icon: "◇" },
              { teknik: "Cetak Tuang", desc: "Menuangkan slip tanah liat ke dalam cetakan gips untuk produk dengan bentuk kompleks", icon: "△" },
            ].map((t, i) => (
              <div key={i} style={{ background: "#002744", padding: "40px 28px", borderTop: "1px solid rgba(125,184,216,0.1)" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", color: "#7DB8D8", marginBottom: "16px", opacity: 0.5 }}>{t.icon}</p>
                <p style={{ color: "#F8FBFF", fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}>{t.teknik}</p>
                <p style={{ color: "rgba(248,251,255,0.4)", fontSize: "13px", lineHeight: 1.7, fontWeight: 300 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="section" style={{ background: "#F0F7FF" }}>
        <div className="container">
          <span className="label">Portofolio</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Hasil Karya</h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "auto auto", gap: "2px" }}>
            <div className="karya-card" style={{ position: "relative", gridRow: "span 2", background: "#D4E8F5", overflow: "hidden", minHeight: "520px" }}>
              {data.karya[0]?.image ? (
                <img src={data.karya[0].image} alt={data.karya[0].judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#C4DCEF" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "80px", color: "rgba(0,39,68,0.1)", fontStyle: "italic" }}>陶</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,39,68,0.88)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "32px" }}>
                <p style={{ color: "#7DB8D8", fontSize: "10px", letterSpacing: "0.18em" }}>{data.karya[0]?.tahun}</p>
                <p style={{ color: "#F8FBFF", fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: 300, marginTop: "6px" }}>{data.karya[0]?.judul}</p>
              </div>
            </div>
            <div className="karya-card" style={{ position: "relative", background: "#D4E8F5", overflow: "hidden", minHeight: "256px" }}>
              {data.karya[1]?.image ? (
                <img src={data.karya[1].image} alt={data.karya[1].judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#D4E8F5" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "64px", color: "rgba(0,39,68,0.1)", fontStyle: "italic" }}>陶</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,39,68,0.88)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
                <p style={{ color: "#7DB8D8", fontSize: "10px", letterSpacing: "0.18em" }}>{data.karya[1]?.tahun}</p>
                <p style={{ color: "#F8FBFF", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, marginTop: "4px" }}>{data.karya[1]?.judul}</p>
              </div>
            </div>
            <div className="karya-card" style={{ position: "relative", background: "#C4DCEF", overflow: "hidden", minHeight: "256px" }}>
              {data.karya[2]?.image ? (
                <img src={data.karya[2].image} alt={data.karya[2].judul} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#BDD4E8" }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "64px", color: "rgba(0,39,68,0.1)", fontStyle: "italic" }}>陶</span>
                </div>
              )}
              <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(0,39,68,0.88)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "24px" }}>
                <p style={{ color: "#7DB8D8", fontSize: "10px", letterSpacing: "0.18em" }}>{data.karya[2]?.tahun}</p>
                <p style={{ color: "#F8FBFF", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 300, marginTop: "4px" }}>{data.karya[2]?.judul}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section id="prestasi" className="section">
        <div className="container">
          <span className="label">Pencapaian</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Prestasi Nasional</h2>
          <div style={{ borderTop: "1px solid rgba(0,91,142,0.12)" }}>
            {data.prestasi.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "28px 0", borderBottom: "1px solid rgba(0,91,142,0.12)", gap: "32px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", color: "rgba(0,91,142,0.2)", fontWeight: 300, minWidth: "56px" }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "16px", fontWeight: "400", marginBottom: "4px" }}>{p.judul}</p>
                  <p style={{ fontSize: "12px", color: "#005B8E", opacity: 0.6 }}>{p.kota}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "10px", padding: "4px 14px", border: "1px solid rgba(0,91,142,0.2)", color: "#005B8E", letterSpacing: "0.1em" }}>{p.tingkat.toUpperCase()}</span>
                  <p style={{ fontSize: "12px", color: "#7DB8D8", marginTop: "6px" }}>{p.tahun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section id="guru" className="section" style={{ background: "#F0F7FF" }}>
        <div className="container">
          <span className="label">Tim Pengajar</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Guru Pengajar</h2>
          <div className="guru-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "2px" }}>
            {data.guru.map((g, i) => (
              <div key={i} style={{ background: "#F8FBFF" }}>
                <div style={{ aspectRatio: "3/4", background: "#D4E8F5", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {g.image ? (
                    <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "52px", color: "rgba(0,39,68,0.15)", fontStyle: "italic" }}>{g.nama.split(" ").pop()?.charAt(0) || "?"}</span>
                  )}
                </div>
                <div style={{ padding: "16px 20px" }}>
                  <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "4px" }}>{g.nama}</p>
                  <p style={{ fontSize: "11px", color: "#005B8E", letterSpacing: "0.04em", opacity: 0.7, lineHeight: 1.5 }}>{g.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" className="section">
        <div className="container">
          <span className="label">Sarana & Prasarana</span>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "46px", fontWeight: 300, marginBottom: "48px" }}>Fasilitas</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1px", background: "rgba(0,91,142,0.1)" }}>
            {data.fasilitas.map((f, i) => (
              <div key={i} style={{ background: "#F8FBFF", padding: "48px" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "40px", color: "rgba(0,91,142,0.12)", fontWeight: 300, marginBottom: "20px" }}>{String(i + 1).padStart(2, "0")}</p>
                <p style={{ fontSize: "16px", fontWeight: "500", marginBottom: "10px" }}>{f.nama}</p>
                <p style={{ color: "#335577", fontSize: "14px", lineHeight: 1.8, fontWeight: 300 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section" style={{ background: "#002744" }}>
        <div className="container">
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <span className="label" style={{ color: "#7DB8D8", opacity: 0.6 }}>
                Bergabunglah
              </span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "44px", fontWeight: 300, color: "#F8FBFF", lineHeight: 1.2, marginBottom: "20px" }}>
                Tertarik menjadi bagian dari <em style={{ color: "#7DB8D8" }}>Kriya Keramik?</em>
              </h2>
              <p style={{ color: "rgba(248,251,255,0.45)", fontSize: "14px", lineHeight: 1.8, marginBottom: "40px", fontWeight: 300 }}>
                Hubungi kami untuk informasi pendaftaran, kunjungan studio, atau sekadar bertanya seputar jurusan kami.
              </p>
              {[
                { icon: "📍", label: "ALAMAT", val: data.contact.alamat },
                { icon: "📞", label: "TELEPON", val: data.contact.telepon },
                { icon: "🕐", label: "JAM OPERASIONAL", val: data.contact.jamOperasional },
                { icon: "✉️", label: "EMAIL", val: data.contact.email },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", border: "1px solid rgba(125,184,216,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize: "9px", letterSpacing: "0.18em", color: "#7DB8D8", marginBottom: "2px", opacity: 0.6 }}>{c.label}</p>
                    <p style={{ fontSize: "14px", color: "rgba(248,251,255,0.7)", fontWeight: 300 }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FORM KONTAK - SUDAH DIPERBAIKI */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7DB8D8", display: "block", marginBottom: "8px", opacity: 0.6 }}>NAMA LENGKAP</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(125,184,216,0.15)", background: "rgba(248,251,255,0.05)", color: "#F8FBFF", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7DB8D8", display: "block", marginBottom: "8px", opacity: 0.6 }}>NOMOR HP / WA</label>
                <input
                  type="text"
                  placeholder="08xxxxxxxxxx"
                  value={formData.hp}
                  onChange={(e) => setFormData({ ...formData, hp: e.target.value })}
                  style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(125,184,216,0.15)", background: "rgba(248,251,255,0.05)", color: "#F8FBFF", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7DB8D8", display: "block", marginBottom: "8px", opacity: 0.6 }}>KEPERLUAN</label>
                <input
                  type="text"
                  placeholder="Informasi pendaftaran / kunjungan / lainnya"
                  value={formData.keperluan}
                  onChange={(e) => setFormData({ ...formData, keperluan: e.target.value })}
                  style={{ width: "100%", padding: "13px 16px", border: "1px solid rgba(125,184,216,0.15)", background: "rgba(248,251,255,0.05)", color: "#F8FBFF", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                />
              </div>
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.18em", color: "#7DB8D8", display: "block", marginBottom: "8px", opacity: 0.6 }}>PESAN</label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                  value={formData.pesan}
                  onChange={(e) => setFormData({ ...formData, pesan: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "13px 16px",
                    border: "1px solid rgba(125,184,216,0.15)",
                    background: "rgba(248,251,255,0.05)",
                    color: "#F8FBFF",
                    fontSize: "14px",
                    outline: "none",
                    fontFamily: "inherit",
                    resize: "vertical",
                  }}
                />
              </div>
              <button onClick={handleKirimWA} style={{ background: "#F8FBFF", color: "#002744", border: "none", padding: "14px", fontSize: "12px", letterSpacing: "0.15em", cursor: "pointer", fontFamily: "inherit", marginTop: "8px" }}>
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#001829", padding: "28px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ color: "rgba(248,251,255,0.25)", fontSize: "11px", letterSpacing: "0.1em" }}>© 2026 KRIYA KERAMIK — SMK NEGERI 5 MALANG</p>
        <p style={{ color: "rgba(248,251,255,0.25)", fontSize: "11px", letterSpacing: "0.1em" }}>陶芸 · SENI KERAMIK</p>
      </footer>
    </div>
  );
}
