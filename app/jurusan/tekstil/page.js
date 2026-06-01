"use client";
import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────────────────

const teachers = [
  {
    nama: "Bu Risdwi",
    image: "/images/tekstil/guru1.jpg",
    mapel: ["Mulok", "Jahit"],
    color: "#C4622D",
    desc: "Ahli jahit dan muatan lokal tekstil tradisional Jawa Timur.",
  },
  {
    nama: "Pak Nur Kholis",
    image: "/images/tekstil/guru2.jpg",
    mapel: ["Batik", "Sablon", "Tenun", "Mapil Sablon"],
    color: "#8B6914",
    desc: "Pengampu teknik batik, sablon, tenun, dan mata pelajaran industri sablon.",
  },
  {
    nama: "Pak Suroso",
    image: "/images/tekstil/guru3.jpg",
    mapel: ["Batik", "KIK", "Mapil Batik"],
    color: "#5C4A1E",
    desc: "Spesialis batik, kreasi inovasi kewirausahaan, dan mata pelajaran industri batik.",
  },
];

const karya = [
  {
    id: "karya1",
    judul: "Batik Selendang Motif Malangan",
    kategori: "Batik Tulis",
    tahun: "2024",
    image: "/images/tekstil/karya1.jpeg",
    desc: "Selendang batik dengan motif khas Malangan — perpaduan ornamen lokal dan kehalusan tangan.",
  },
  {
    id: "karya2",
    judul: "Batik Cap",
    kategori: "Batik Cap",
    tahun: "2024",
    image: "/images/tekstil/karya2.jpeg",
    desc: "Eksplorasi batik cap dengan pola repetitif yang presisi dan konsisten.",
  },
  {
    id: "karya3",
    judul: "Sulam Jahit",
    kategori: "Sulam & Jahit",
    tahun: "2024",
    image: "/images/tekstil/karya3.jpeg",
    desc: "Karya sulam jahit dengan teknik bordir manual yang detail dan penuh kesabaran.",
  },
  {
    id: "karya4",
    judul: "Batik Tulis",
    kategori: "Batik Tulis",
    tahun: "2023",
    image: "/images/tekstil/karya5.jpeg",
    desc: "Batik tulis dengan canting tangan, mengikuti pakem motif klasik Jawa.",
  },
  {
    id: "karya5",
    judul: "Sablon",
    kategori: "Sablon",
    tahun: "2024",
    image: "/images/tekstil/karya6.jpeg",
    desc: "Teknik cetak sablon pada kain dengan desain kontemporer berbasis motif lokal.",
  },
  {
    id: "karya6",
    judul: "Kreativitas Inovasi Kewirausahaan",
    kategori: "KIK",
    tahun: "2024",
    image: "/images/tekstil/karya8.jpeg",
    desc: "Produk inovatif berbasis tekstil siap jual — dari desain hingga packaging wirausaha.",
  },
  {
    id: "karya7",
    judul: "Tenun",
    kategori: "Tenun",
    tahun: "2023",
    image: "/images/tekstil/karya10.jpeg",
    desc: "Kain tenun dengan pola geometris tradisional menggunakan ATBM.",
  },
];

const teknik = [
  { icon: "〰", nama: "Batik Tulis", desc: "Teknik membatik menggunakan canting tangan dengan malam panas di atas kain mori." },
  { icon: "◫", nama: "Batik Cap", desc: "Pembatikan massal menggunakan cap tembaga untuk pola yang konsisten dan rapi." },
  { icon: "⟋", nama: "Tenun ATBM", desc: "Menenun kain secara manual menggunakan Alat Tenun Bukan Mesin tradisional." },
  { icon: "⬡", nama: "Sablon", desc: "Teknik cetak saring untuk mengaplikasikan desain pada permukaan kain." },
  { icon: "✁", nama: "Sulam & Jahit", desc: "Keterampilan menjahit dan menyulam untuk produk tekstil fungsional maupun dekoratif." },
  { icon: "◈", nama: "KIK — Kewirausahaan", desc: "Kreativitas, inovasi, dan kewirausahaan berbasis produk tekstil siap pasar." },
];

const fasilitas = [
  { icon: "〰", no: "01", nama: "Studio Batik", desc: "Ruang praktik batik tulis dan cap dilengkapi kompor malam, canting, dan kain mori berkualitas." },
  { icon: "⟋", no: "02", nama: "Workshop Tenun ATBM", desc: "Area tenun manual dengan alat tenun bukan mesin yang otentik dan terawat." },
  { icon: "⬡", no: "03", nama: "Lab Sablon", desc: "Fasilitas cetak sablon lengkap dengan meja afdruk, rakel, dan berbagai jenis cat tekstil." },
  { icon: "✁", no: "04", nama: "Ruang Jahit & Sulam", desc: "Mesin jahit industri dan domestik, beserta perlengkapan sulam dan bordir manual." },
  { icon: "◈", no: "05", nama: "Galeri Karya Tekstil", desc: "Ruang pameran untuk memajang karya terbaik siswa, terbuka untuk umum setiap semester." },
  { icon: "◇", no: "06", nama: "Showroom & Pemasaran", desc: "Ruang display dan penjualan produk tekstil siswa sebagai laboratorium kewirausahaan." },
];

const stats = [
  ["1998", "Berdiri"],
  ["3", "Guru Ahli"],
  ["7", "Teknik Karya"],
  ["26+", "Tahun Mengabdi"],
];

const timeline = [
  ["1998", "Berdiri"],
  ["2005", "Mandiri"],
  ["2015", "Akreditasi A"],
  ["2024", "Masa Kini"],
];

const kontak = [
  { icon: "📍", label: "ALAMAT", val: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142" },
  { icon: "📞", label: "TELEPON", val: "(0341) 478195" },
  { icon: "✉️", label: "EMAIL", val: "tekstil@smkn5malang.sch.id" },
  { icon: "🕐", label: "OPERASIONAL", val: "Senin – Jumat: 07.00 – 16.00 WIB" },
];

// ─── SUB-COMPONENTS ──────────────────────────────────────────────────────────

const BatikPattern = () => (
  <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", opacity: 0.04 }}>
    <circle cx="60" cy="60" r="40" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="60" r="28" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="60" cy="60" r="16" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="60" r="4" fill="currentColor" />
    <line x1="20" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.5" />
    <line x1="60" y1="20" x2="60" y2="100" stroke="currentColor" strokeWidth="0.5" />
    <line x1="32" y1="32" x2="88" y2="88" stroke="currentColor" strokeWidth="0.5" />
    <line x1="88" y1="32" x2="32" y2="88" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="20" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="20" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="20" cy="100" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
    <circle cx="100" cy="100" r="6" fill="none" stroke="currentColor" strokeWidth="0.5" />
  </svg>
);

const WeaveBg = () => (
  <svg width="100%" height="100%" style={{ position: "absolute", inset: 0 }}>
    {[...Array(16)].map((_, i) => (
      <line key={`v${i}`} x1={`${i * 6.5}%`} y1="0" x2={`${i * 6.5}%`} y2="100%" stroke="#C4622D" strokeWidth="0.3" opacity="0.06" />
    ))}
    {[...Array(16)].map((_, i) => (
      <line key={`h${i}`} x1="0" y1={`${i * 6.5}%`} x2="100%" y2={`${i * 6.5}%`} stroke="#C4622D" strokeWidth="0.3" opacity="0.04" />
    ))}
  </svg>
);

const KaryaCard = ({ k, height = 320 }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setHovered((v) => !v)} style={{ position: "relative", height, overflow: "hidden", cursor: "pointer", background: "#2C1A0E" }}>
      <img
        src={k.image}
        alt={k.judul}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          transition: "transform 0.5s ease",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />
      <div style={{ position: "absolute", top: 16, left: 16 }}>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, background: "rgba(44,26,14,0.75)", color: "#C4622D", padding: "4px 10px", letterSpacing: "0.1em" }}>{k.id.toUpperCase()}</span>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(44,26,14,0.88)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 28,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.35s ease",
        }}
      >
        <span
          style={{
            display: "inline-block",
            marginBottom: 10,
            padding: "3px 12px",
            borderRadius: 100,
            fontFamily: "'DM Mono', monospace",
            fontSize: 10,
            letterSpacing: "0.06em",
            background: "rgba(196,98,45,0.25)",
            color: "#C4622D",
            border: "1px solid rgba(196,98,45,0.4)",
            alignSelf: "flex-start",
          }}
        >
          {k.kategori}
        </span>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#FAF6F0", marginBottom: 8, lineHeight: 1.2 }}>{k.judul}</h3>
        <p style={{ fontSize: 13, color: "rgba(250,246,240,0.6)", lineHeight: 1.65, marginBottom: 12 }}>{k.desc}</p>
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: "#C4622D", opacity: 0.7 }}>{k.tahun}</span>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function TekstilPage() {
  const [form, setForm] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });

  const handleKirimWA = () => {
    if (!form.nama || !form.hp) {
      alert("Nama dan nomor HP wajib diisi.");
      return;
    }
    const text = `Halo Kriya Tekstil SMKN 5 Malang!%0A%0A*Nama:* ${form.nama}%0A*No. HP:* ${form.hp}%0A*Keperluan:* ${form.keperluan || "-"}%0A*Pesan:* ${form.pesan || "-"}`;
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  return (
    <div style={{ background: "#FAF6F0", color: "#2C1A0E", minHeight: "100vh", fontFamily: "'Lora', Georgia, serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #C4622D; color: #FAF6F0; }
        html { scroll-behavior: smooth; }
        .serif  { font-family: 'Playfair Display', serif; }
        .mono   { font-family: 'DM Mono', monospace; }
        .nav-link { color: #5C3D1E; text-decoration: none; font-size: 12px; letter-spacing: 0.1em; font-family: 'DM Mono', monospace; opacity: 0.6; transition: opacity 0.2s, color 0.2s; }
        .nav-link:hover { opacity: 1; color: #C4622D; }
        @keyframes weave { 0%,100% { opacity: 0.03; } 50% { opacity: 0.06; } }
        .weave-bg { animation: weave 8s ease-in-out infinite; }
        @media (max-width: 768px) {
          .two-col       { grid-template-columns: 1fr !important; gap: 40px !important; }
          .teacher-grid  { grid-template-columns: 1fr !important; }
          .teknik-grid   { grid-template-columns: 1fr !important; }
          .fasilitas-grid{ grid-template-columns: 1fr !important; }
          .nav-links     { display: none !important; }
        }
      `}</style>

      {/* ── NAV ─────────────────────────────────────────────────────────────── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(250,246,240,0.94)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(196,98,45,0.12)",
          padding: "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <p className="serif" style={{ fontSize: 16, fontWeight: 700, color: "#2C1A0E", letterSpacing: "0.02em" }}>
            Kriya Tekstil
          </p>
          <p className="mono" style={{ fontSize: 10, color: "#C4622D", letterSpacing: "0.12em", opacity: 0.7 }}>
            SMKN 5 MALANG
          </p>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 28 }}>
          {["Sejarah", "Guru", "Karya", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/admin/login?jurusan=tekstil" className="mono" style={{ fontSize: 11, letterSpacing: "0.1em", color: "#C4622D", border: "1px solid rgba(196,98,45,0.3)", padding: "7px 16px", textDecoration: "none" }}>
          ADMIN
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", background: "#2C1A0E", display: "flex", alignItems: "center", paddingTop: 64, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, opacity: 0.3 }}>
          <img src="/images/tekstil/gambar1.jpg" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div className="weave-bg" style={{ position: "absolute", inset: 0, color: "#C4622D", display: "grid", gridTemplateColumns: "repeat(8,1fr)", gridTemplateRows: "repeat(6,1fr)", pointerEvents: "none", zIndex: 1 }}>
          {[...Array(48)].map((_, i) => (
            <BatikPattern key={i} />
          ))}
        </div>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(44,26,14,0.97) 0%, rgba(44,26,14,0.85) 50%, rgba(80,40,10,0.9) 100%)", zIndex: 2 }} />

        <div style={{ position: "relative", zIndex: 3, padding: "0 64px", width: "100%" }}>
          <div style={{ maxWidth: 700 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 40 }}>
              <div style={{ width: 32, height: 1, background: "#C4622D", opacity: 0.6 }} />
              <span className="mono" style={{ fontSize: 11, color: "#C4622D", letterSpacing: "0.25em", opacity: 0.8 }}>
                SMK NEGERI 5 MALANG — EST. 1998
              </span>
            </div>
            <h1 className="serif" style={{ fontSize: "clamp(56px, 9vw, 108px)", lineHeight: 0.92, fontWeight: 900, color: "#FAF6F0", marginBottom: 12, letterSpacing: "-0.02em" }}>
              Kriya
            </h1>
            <h1 className="serif" style={{ fontSize: "clamp(56px, 9vw, 108px)", lineHeight: 0.92, fontWeight: 400, fontStyle: "italic", color: "#C4622D", marginBottom: 44, letterSpacing: "-0.02em" }}>
              Tekstil
            </h1>
            <div style={{ width: 48, height: 2, background: "#C4622D", marginBottom: 28, opacity: 0.7 }} />
            <p style={{ fontSize: 17, color: "rgba(250,246,240,0.55)", lineHeight: 1.85, maxWidth: 480, marginBottom: 52 }}>
              Dari helai benang ke kain bermakna — menghidupkan tradisi batik, tenun, dan sulam Nusantara melalui tangan-tangan terampil generasi muda.
            </p>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <button
                onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "#C4622D", color: "#FAF6F0", border: "none", padding: "14px 36px", fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.15em", cursor: "pointer" }}
              >
                LIHAT KARYA
              </button>
              <button
                onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}
                style={{ background: "transparent", color: "#FAF6F0", border: "1px solid rgba(250,246,240,0.25)", padding: "13px 36px", fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.15em", cursor: "pointer" }}
              >
                HUBUNGI KAMI
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid rgba(196,98,45,0.2)", background: "rgba(44,26,14,0.7)", backdropFilter: "blur(8px)", zIndex: 3 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", maxWidth: 900, margin: "0 auto" }}>
            {stats.map(([num, lab], i) => (
              <div key={lab} style={{ padding: "24px 32px", textAlign: "center", borderRight: i < 3 ? "1px solid rgba(196,98,45,0.15)" : "none" }}>
                <p className="serif" style={{ fontSize: 36, fontWeight: 700, color: "#C4622D", lineHeight: 1 }}>
                  {num}
                </p>
                <p className="mono" style={{ fontSize: 10, color: "rgba(250,246,240,0.4)", letterSpacing: "0.15em", marginTop: 6 }}>
                  {lab.toUpperCase()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SEJARAH ──────────────────────────────────────────────────────────── */}
      <section id="sejarah" style={{ padding: "120px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#C4622D", marginBottom: 20, display: "block", opacity: 0.8 }}>
                // TENTANG KAMI
              </span>
              <h2 className="serif" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.05, marginBottom: 28, letterSpacing: "-0.01em" }}>
                Lebih dari
                <br />
                <em style={{ color: "#C4622D", fontWeight: 400 }}>Dua Dekade</em>
                <br />
                Berkarya
              </h2>
              <div style={{ width: 40, height: 2, background: "#C4622D", marginBottom: 28, opacity: 0.6 }} />
              <p style={{ fontSize: 16, color: "#5C3D1E", lineHeight: 1.9, marginBottom: 20 }}>
                Jurusan Kriya Tekstil SMKN 5 Malang berdiri sejak <strong>1998</strong>, bermula dari jurusan Kriya yang menyatukan keramik, kayu, dan tekstil dalam satu atap pendidikan seni terapan.
              </p>
              <p style={{ fontSize: 15, color: "#7A5535", lineHeight: 1.9 }}>
                Kini berfokus penuh pada dunia tekstil — mulai dari batik tulis, batik cap, tenun ATBM, sablon manual, hingga sulam dan jahit — menjadi wadah kreativitas yang menjaga warisan budaya Nusantara tetap hidup dan relevan.
              </p>
              <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid rgba(196,98,45,0.15)", display: "flex", gap: 40, flexWrap: "wrap" }}>
                {timeline.map(([y, e]) => (
                  <div key={y}>
                    <p className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#C4622D" }}>
                      {y}
                    </p>
                    <p className="mono" style={{ fontSize: 10, color: "#999", marginTop: 4 }}>
                      {e}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ aspectRatio: "4/5", background: "#2C1A0E", overflow: "hidden", position: "relative" }}>
                <img src="/images/tekstil/gambar1.jpg" alt="Kriya Tekstil workshop" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", bottom: 32, left: 32, right: 32 }}>
                  <div style={{ background: "rgba(196,98,45,0.9)", padding: "20px 24px" }}>
                    <p className="serif" style={{ fontStyle: "italic", fontSize: 15, color: "#FAF6F0", lineHeight: 1.6, opacity: 0.95 }}>
                      "Tekstil bukan sekadar kain — ia adalah bahasa budaya yang berbicara tanpa kata."
                    </p>
                  </div>
                </div>
              </div>
              <div style={{ position: "absolute", top: -12, right: -12, width: 60, height: 60, border: "2px solid rgba(196,98,45,0.3)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -12, left: -12, width: 60, height: 60, border: "2px solid rgba(196,98,45,0.2)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── GURU ─────────────────────────────────────────────────────────────── */}
      <section id="guru" style={{ padding: "100px 64px", background: "#2C1A0E", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <WeaveBg />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#C4622D", marginBottom: 16, display: "block", opacity: 0.7 }}>
            // TIM PENGAJAR
          </span>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 900, color: "#FAF6F0", marginBottom: 60, lineHeight: 1.05 }}>
            Guru
            <br />
            <em style={{ fontWeight: 400, color: "#C4622D" }}>Pengajar</em>
          </h2>
          <div className="teacher-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2 }}>
            {teachers.map((g) => (
              <div
                key={g.nama}
                style={{ background: "#3A2210", border: "1px solid rgba(196,98,45,0.15)", padding: "40px 32px", position: "relative", overflow: "hidden", transition: "transform 0.3s", cursor: "default" }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
              >
                <div style={{ height: 3, background: g.color, position: "absolute", top: 0, left: 0, right: 0 }} />
                <div style={{ width: 64, height: 64, borderRadius: "50%", border: `2px solid ${g.color}66`, marginBottom: 24, overflow: "hidden" }}>
                  <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
                <h3 className="serif" style={{ fontSize: 22, fontWeight: 700, color: "#FAF6F0", marginBottom: 6 }}>
                  {g.nama}
                </h3>
                <p style={{ fontSize: 13, color: "rgba(250,246,240,0.45)", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>{g.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {g.mapel.map((m) => (
                    <span
                      key={m}
                      style={{
                        display: "inline-block",
                        padding: "3px 12px",
                        borderRadius: 100,
                        fontSize: 10,
                        fontFamily: "'DM Mono', monospace",
                        letterSpacing: "0.06em",
                        background: `${g.color}22`,
                        color: g.color,
                        border: `1px solid ${g.color}44`,
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEKNIK ───────────────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 64px", background: "#F5EFE6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#C4622D", marginBottom: 16, display: "block", opacity: 0.8 }}>
            // KURIKULUM
          </span>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 900, marginBottom: 56, lineHeight: 1.05 }}>
            Yang <em style={{ color: "#C4622D" }}>Dipelajari</em>
          </h2>
          <div className="teknik-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "rgba(196,98,45,0.12)" }}>
            {teknik.map((t, i) => (
              <div
                key={t.nama}
                style={{ background: "#FAF6F0", padding: "36px 32px", borderBottom: "3px solid transparent", transition: "border-color 0.3s", cursor: "default" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderBottomColor = "#C4622D")}
                onMouseLeave={(e) => (e.currentTarget.style.borderBottomColor = "transparent")}
              >
                <span className="mono" style={{ fontSize: 24, color: "#C4622D", opacity: 0.6, display: "block", marginBottom: 16 }}>
                  {t.icon}
                </span>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  {t.nama}
                </h3>
                <p style={{ fontSize: 14, color: "#7A5535", lineHeight: 1.75 }}>{t.desc}</p>
                <div style={{ marginTop: 20, display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="mono" style={{ fontSize: 10, color: "#C4622D", opacity: 0.4 }}>
                    0{i + 1}
                  </span>
                  <div style={{ flex: 1, height: 1, background: "rgba(196,98,45,0.15)" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KARYA ────────────────────────────────────────────────────────────── */}
      <section id="karya" style={{ padding: "100px 64px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <div>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#C4622D", marginBottom: 16, display: "block", opacity: 0.8 }}>
                // PORTFOLIO
              </span>
              <h2 className="serif" style={{ fontSize: 52, fontWeight: 900, lineHeight: 1.05 }}>
                Karya
                <br />
                <em style={{ color: "#C4622D", fontWeight: 400 }}>Siswa</em>
              </h2>
            </div>
            <p style={{ maxWidth: 320, fontSize: 14, color: "#7A5535", lineHeight: 1.7, fontStyle: "italic" }}>Setiap helai adalah cerita — hasil kerja keras, kesabaran, dan cinta pada tradisi.</p>
          </div>

          {/* Row 1: 2 kartu besar */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3, marginBottom: 3 }}>
            <KaryaCard k={karya[0]} height={400} />
            <KaryaCard k={karya[1]} height={400} />
          </div>

          {/* Row 2: 3 kartu sedang */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 3, marginBottom: 3 }}>
            <KaryaCard k={karya[2]} height={280} />
            <KaryaCard k={karya[3]} height={280} />
            <KaryaCard k={karya[4]} height={280} />
          </div>

          {/* Row 3: 1 lebar + 1 kecil */}
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 3 }}>
            <KaryaCard k={karya[5]} height={320} />
            <KaryaCard k={karya[6]} height={320} />
          </div>
        </div>
      </section>

      {/* ── FASILITAS ────────────────────────────────────────────────────────── */}
      <section id="fasilitas" style={{ padding: "100px 64px", background: "#F5EFE6" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#C4622D", marginBottom: 16, display: "block", opacity: 0.8 }}>
            // SARANA & PRASARANA
          </span>
          <h2 className="serif" style={{ fontSize: 52, fontWeight: 900, marginBottom: 56, lineHeight: 1.05 }}>
            Fasilitas
            <br />
            <em style={{ color: "#C4622D", fontWeight: 400 }}>Kami</em>
          </h2>
          <div className="fasilitas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 1, background: "rgba(196,98,45,0.12)" }}>
            {fasilitas.map((f) => (
              <div
                key={f.nama}
                style={{ background: "#FAF6F0", padding: "44px 40px", transition: "background 0.3s", cursor: "default" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#FFF4EC")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#FAF6F0")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span className="mono" style={{ fontSize: 28, color: "#C4622D", opacity: 0.5 }}>
                    {f.icon}
                  </span>
                  <span className="serif" style={{ fontSize: 40, fontWeight: 900, color: "rgba(196,98,45,0.1)" }}>
                    {f.no}
                  </span>
                </div>
                <h3 className="serif" style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  {f.nama}
                </h3>
                <p style={{ fontSize: 14, color: "#7A5535", lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAK ───────────────────────────────────────────────────────────── */}
      <section id="kontak" style={{ padding: "100px 64px", background: "#2C1A0E", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0 }}>
          <WeaveBg />
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <span className="mono" style={{ fontSize: 10, letterSpacing: "0.25em", color: "#C4622D", marginBottom: 20, display: "block", opacity: 0.7 }}>
                // BERGABUNGLAH
              </span>
              <h2 className="serif" style={{ fontSize: 52, fontWeight: 900, color: "#FAF6F0", lineHeight: 1.05, marginBottom: 20 }}>
                Tertarik menjadi
                <br />
                bagian <em style={{ color: "#C4622D" }}>Kriya Tekstil?</em>
              </h2>
              <p style={{ color: "rgba(250,246,240,0.45)", fontSize: 14, lineHeight: 1.85, marginBottom: 40 }}>
                Hubungi kami untuk informasi pendaftaran, kunjungan workshop, atau sekadar bertanya seputar jurusan Kriya Tekstil SMKN 5 Malang.
              </p>
              {kontak.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 18 }}>
                  <div style={{ width: 36, height: 36, border: "1px solid rgba(196,98,45,0.25)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>{c.icon}</div>
                  <div>
                    <p className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", color: "#C4622D", marginBottom: 2, opacity: 0.6 }}>
                      {c.label}
                    </p>
                    <p style={{ fontSize: 14, color: "rgba(250,246,240,0.65)" }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "NAMA LENGKAP", placeholder: "Masukkan nama Anda", key: "nama" },
                { label: "NOMOR HP / WA", placeholder: "08xxxxxxxxxx", key: "hp" },
                { label: "KEPERLUAN", placeholder: "Pendaftaran / kunjungan / lainnya", key: "keperluan" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#C4622D", display: "block", marginBottom: 8, opacity: 0.6 }}>
                    {f.label}
                  </label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={form[f.key]}
                    onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", background: "rgba(250,246,240,0.05)", border: "1px solid rgba(196,98,45,0.2)", color: "#FAF6F0", fontSize: 14, outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label className="mono" style={{ fontSize: 10, letterSpacing: "0.18em", color: "#C4622D", display: "block", marginBottom: 8, opacity: 0.6 }}>
                  PESAN
                </label>
                <textarea
                  rows={4}
                  placeholder="Tulis pesan Anda..."
                  value={form.pesan}
                  onChange={(e) => setForm((p) => ({ ...p, pesan: e.target.value }))}
                  style={{ width: "100%", padding: "12px 16px", background: "rgba(250,246,240,0.05)", border: "1px solid rgba(196,98,45,0.2)", color: "#FAF6F0", fontSize: 14, outline: "none", resize: "vertical", fontFamily: "inherit" }}
                />
              </div>
              <button onClick={handleKirimWA} style={{ background: "#C4622D", color: "#FAF6F0", border: "none", padding: 14, fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: "0.15em", cursor: "pointer", marginTop: 8 }}>
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer style={{ background: "#1C0E06", padding: "28px 64px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, background: "#C4622D", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="serif" style={{ fontSize: 11, fontWeight: 700, color: "#FAF6F0" }}>
              KT
            </span>
          </div>
          <span className="mono" style={{ fontSize: 12, color: "rgba(250,246,240,0.3)" }}>
            KRIYA TEKSTIL — SMKN 5 MALANG
          </span>
        </div>
        <span className="mono" style={{ fontSize: 11, color: "rgba(250,246,240,0.2)" }}>
          © 2026 · WARISAN TEKSTIL NUSANTARA
        </span>
      </footer>
    </div>
  );
}
