"use client";
import { useEffect, useState } from "react";
import { db } from "../../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const defaultData = {
  hero: {
    tagline: "Membentuk Kayu,",
    tagline2: "Menciptakan Furniture",
    subtitle: "Jurusan Kriya Kayu — SMK Negeri 5 Malang",
    heroImage: "/images/kayu/gambar1.jpg",
  },
  sejarah: {
    tahun: "1999",
    judul: "Warisan Keahlian Sejati",
    teks: "Jurusan Kriya Kayu SMK Negeri 5 Malang telah berdiri sejak 1999, menempa generasi pengrajin kayu profesional yang menguasai teknik furniture, kerja mesin, kerja bangku, ukir, dan finishing. Kami percaya bahwa kayu bukan sekadar bahan — ia adalah medium ekspresi dan keahlian.",
    image: "/images/kayu/gambar2.jpg",
  },
  stats: [
    { angka: "27+", label: "Tahun Berdiri" },
    { angka: "200+", label: "Alumni Profesional" },
    { angka: "30+", label: "Penghargaan" },
    { angka: "3", label: "Guru Ahli" },
  ],
  karya: [
    { judul: "Tempat Alat Tulis", tahun: "2024", image: "/images/kayu/karya1.jpeg" },
    { judul: "Meja Pojok Minimalis", tahun: "2024", image: "/images/kayu/karya2.jpeg" },
    { judul: "Kotak Tisu Batik", tahun: "2023", image: "/images/kayu/karya3.jpeg" },
    { judul: "Miniatur Diorama Suasana", tahun: "2023", image: "/images/kayu/karya4.jpeg" },
  ],
  prestasi: [
    { judul: "Juara 1 LKS Kabupaten Bidang Furniture", tahun: "2024", tingkat: "Kabupaten" },
    { judul: "Harapan 1 LKS Provinsi Jawa Timur", tahun: "2024", tingkat: "Provinsi" },
    { judul: "Juara 2 LKS Kabupaten Bidang Ukir Kayu", tahun: "2023", tingkat: "Kabupaten" },
    { judul: "Partisipan LKS Nasional", tahun: "2023", tingkat: "Nasional" },
  ],
  guru: [
    { nama: "Bapak Dwi Purnomo", jabatan: "Kepala Bengkel & Guru Teknik Dasar Kriya/Finishing", image: "/images/kayu/guru1.jpg" },
    { nama: "Bapak Hariadi", jabatan: "Guru Teknik Kerja Mesin & Kerja Bangku", image: "/images/kayu/guru2.jpg" },
    { nama: "Bapak Salahuddin Hassani", jabatan: "Guru Teknik Kerja Ukir Dasar", image: "/images/kayu/guru3.jpg" },
  ],
  fasilitas: [
    { nama: "Workshop Kayu", desc: "Ruang praktik dengan peralatan mesin modern dan kerja bangku" },
    { nama: "Lab Finishing", desc: "Area khusus pengecatan dan pelapisan produk furniture" },
    { nama: "Ruang Ukir", desc: "Tempat khusus pembelajaran teknik ukir kayu tradisional" },
    { nama: "Showroom", desc: "Galeri pameran karya furniture siswa terbaik" },
  ],
  contact: {
    alamat: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142",
    telepon: "(0341) 478195",
    email: "kriyakayu@smkn5malang.sch.id",
    jamOperasional: "Senin – Jumat: 07.00 – 16.00 WIB",
  },
};

export default function JurusanKayu() {
  const [data, setData] = useState(defaultData);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const snap = await getDoc(doc(db, "jurusan", "kayu"));
        if (snap.exists()) {
          setData({ ...defaultData, ...snap.data() });
        }
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
    const text = `Halo Kriya Kayu SMK Negeri 5 Malang!%0A%0A*Nama:* ${nama}%0A*No. HP:* ${hp}%0A*Keperluan:* ${keperluan || "-"}%0A*Pesan:* ${pesan || "-"}`;
    window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
  };

  if (loading)
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#FAFAF8" }}>
        <p style={{ color: "#8B6914", letterSpacing: "0.2em", fontSize: "13px" }}>MEMUAT...</p>
      </div>
    );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#FAFAF8", color: "#2C1A0E", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .nav-link { color: #2C1A0E; text-decoration: none; font-size: 13px; letter-spacing: 0.08em; opacity: 0.7; transition: opacity 0.2s; }
        .nav-link:hover { opacity: 1; }
        .btn-primary { background: #2C1A0E; color: #DABC87; border: none; padding: 14px 32px; font-size: 13px; letter-spacing: 0.12em; cursor: pointer; transition: background 0.2s; }
        .btn-primary:hover { background: #4A2E1A; }
        .btn-outline { background: transparent; color: #2C1A0E; border: 1px solid #2C1A0E; padding: 13px 32px; font-size: 13px; letter-spacing: 0.12em; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: #2C1A0E; color: #FAFAF8; }
        .section { padding: 100px 0; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 40px; }
        .label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #8B6914; margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .label::before { content: ''; display: block; width: 32px; height: 1px; background: #8B6914; }
        .divider { width: 40px; height: 2px; background: #DABC87; margin: 24px 0; }
        .karya-card:hover .karya-overlay { opacity: 1; }
        .karya-overlay { opacity: 0; transition: opacity 0.3s; }
        @media (max-width: 768px) {
          .container { padding: 0 20px; }
          .section { padding: 60px 0; }
          .hero-title { font-size: 48px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .karya-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .guru-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .fasilitas-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .nav-links { display: none; }
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
          background: "rgba(250,250,248,0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid #E8DCC8",
          padding: "0 40px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ width: "28px", height: "28px", background: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px" }}>
            <span style={{ color: "#DABC87", fontSize: "14px", fontFamily: "'Playfair Display', serif" }}>K</span>
          </div>
          <span style={{ fontSize: "13px", letterSpacing: "0.12em", fontWeight: "500" }}>KRIYA KAYU</span>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: "36px" }}>
          {["Sejarah", "Karya", "Prestasi", "Guru", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a href="/admin/login?jurusan=kayu" style={{ fontSize: "12px", letterSpacing: "0.1em", color: "#8B6914", textDecoration: "none", border: "1px solid #DABC87", padding: "7px 16px" }}>
          ADMIN
        </a>
      </nav>

      {/* HERO */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingTop: "64px",
          position: "relative",
          overflow: "hidden",
          backgroundImage: `linear-gradient(to right, rgba(44,26,14,0.92) 55%, rgba(44,26,14,0.6) 100%), url('${data.hero.heroImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: "45%", background: "rgba(61,37,16,0.4)", clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}></div>
        <div style={{ position: "absolute", right: "5%", top: "50%", transform: "translateY(-50%)", fontSize: "200px", color: "rgba(218,188,135,0.08)", fontFamily: "'Playfair Display', serif", lineHeight: 1, userSelect: "none" }}>木</div>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ maxWidth: "640px" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.25em", color: "#8B6914", marginBottom: "32px" }}>SMK NEGERI 5 MALANG — KRIYA KAYU & FURNITURE</p>
            <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "72px", color: "#FAFAF8", lineHeight: 1.1, fontWeight: 700, marginBottom: "8px" }}>
              {data.hero.tagline}
            </h1>
            <h1 className="hero-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "72px", color: "#DABC87", lineHeight: 1.1, fontWeight: 400, fontStyle: "italic", marginBottom: "32px" }}>
              {data.hero.tagline2}
            </h1>
            <p style={{ color: "rgba(250,250,248,0.65)", fontSize: "16px", lineHeight: 1.7, marginBottom: "48px", maxWidth: "480px" }}>{data.hero.subtitle}</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}>
                LIHAT KARYA KAMI
              </button>
              <button className="btn-outline" style={{ color: "#FAFAF8", borderColor: "rgba(250,250,248,0.3)" }} onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}>
                HUBUNGI KAMI
              </button>
            </div>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(250,250,248,0.4)" }}>SCROLL</span>
          <div style={{ width: "1px", height: "40px", background: "rgba(218,188,135,0.4)" }}></div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#F5F0E8", padding: "60px 0" }}>
        <div className="container">
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "#E8DCC8" }}>
            {data.stats.map((s, i) => (
              <div key={i} style={{ background: "#F5F0E8", padding: "40px 32px", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", fontWeight: 700, color: "#2C1A0E", lineHeight: 1 }}>{s.angka}</p>
                <p style={{ fontSize: "11px", letterSpacing: "0.15em", color: "#8B6914", marginTop: "8px" }}>{s.label.toUpperCase()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section id="sejarah" className="section">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div>
              <p className="label">Tentang Kami</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", lineHeight: 1.2, marginBottom: "24px" }}>{data.sejarah.judul}</h2>
              <div className="divider"></div>
              <p style={{ color: "#5C3D2E", lineHeight: 1.8, fontSize: "16px" }}>{data.sejarah.teks}</p>
              <p style={{ marginTop: "32px", fontSize: "11px", letterSpacing: "0.15em", color: "#8B6914" }}>BERDIRI SEJAK {data.sejarah.tahun}</p>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ background: "#E8DCC8", height: "400px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "4px", overflow: "hidden" }}>
                {data.sejarah.image ? (
                  <img src={data.sejarah.image} alt="Sejarah" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "120px", color: "rgba(44,26,14,0.15)" }}>木</span>
                )}
              </div>
              <div style={{ position: "absolute", bottom: "-20px", right: "-20px", width: "120px", height: "120px", background: "#DABC87", zIndex: -1 }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* KARYA */}
      <section id="karya" className="section" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px" }}>
            <div>
              <p className="label">Portofolio</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px" }}>Karya Furniture</h2>
            </div>
          </div>
          <div className="karya-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
            {data.karya.map((k, i) => (
              <div key={i} className="karya-card" style={{ position: "relative", aspectRatio: "3/4", background: "#E8DCC8", overflow: "hidden" }}>
                {k.image ? (
                  <img src={k.image} alt={k.judul} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: i % 2 === 0 ? "#E8DCC8" : "#D4C4A8" }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "rgba(44,26,14,0.2)" }}>木</span>
                  </div>
                )}
                <div className="karya-overlay" style={{ position: "absolute", inset: 0, background: "rgba(44,26,14,0.85)", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "20px" }}>
                  <p style={{ color: "#DABC87", fontSize: "11px", letterSpacing: "0.15em" }}>{k.tahun}</p>
                  <p style={{ color: "#FAFAF8", fontFamily: "'Playfair Display', serif", fontSize: "18px", marginTop: "4px" }}>{k.judul}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRESTASI */}
      <section id="prestasi" className="section">
        <div className="container">
          <p className="label">Pencapaian</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", marginBottom: "48px" }}>Prestasi LKS Kami</h2>
          <div style={{ borderTop: "1px solid #E8DCC8" }}>
            {data.prestasi.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", padding: "24px 0", borderBottom: "1px solid #E8DCC8", gap: "24px" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "#DABC87", minWidth: "48px" }}>{String(i + 1).padStart(2, "0")}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: "500", fontSize: "16px" }}>{p.judul}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <span style={{ fontSize: "11px", padding: "4px 12px", background: "#F5F0E8", color: "#8B6914", letterSpacing: "0.1em" }}>{p.tingkat.toUpperCase()}</span>
                  <p style={{ fontSize: "12px", color: "#8B6914", marginTop: "4px" }}>{p.tahun}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GURU */}
      <section id="guru" className="section" style={{ background: "#2C1A0E" }}>
        <div className="container">
          <p className="label" style={{ color: "#8B6914" }}>
            Tim Pengajar
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", color: "#FAFAF8", marginBottom: "48px" }}>Guru Pengajar</h2>
          <div className="guru-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2px", maxWidth: "900px", margin: "0 auto" }}>
            {data.guru.map((g, i) => (
              <div key={i} style={{ background: "#3D2510" }}>
                <div style={{ aspectRatio: "3/4", background: "#4A2E1A", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {g.image ? (
                    <img src={g.image} alt={g.nama} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                  ) : (
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "48px", color: "rgba(218,188,135,0.3)" }}>{g.nama?.charAt(0) || "?"}</span>
                  )}
                </div>
                <div style={{ padding: "16px" }}>
                  <p style={{ color: "#FAFAF8", fontWeight: "500", fontSize: "14px" }}>{g.nama}</p>
                  <p style={{ color: "#8B6914", fontSize: "12px", marginTop: "4px", letterSpacing: "0.05em" }}>{g.jabatan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FASILITAS */}
      <section id="fasilitas" className="section">
        <div className="container">
          <p className="label">Sarana</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", marginBottom: "48px" }}>Fasilitas</h2>
          <div className="fasilitas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "2px", background: "#E8DCC8" }}>
            {data.fasilitas.map((f, i) => (
              <div key={i} style={{ background: "#FAFAF8", padding: "40px" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", color: "rgba(218,188,135,0.5)", marginBottom: "16px" }}>{String(i + 1).padStart(2, "0")}</p>
                <p style={{ fontWeight: "500", fontSize: "18px", marginBottom: "8px" }}>{f.nama}</p>
                <p style={{ color: "#5C3D2E", fontSize: "14px", lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="kontak" className="section" style={{ background: "#F5F0E8" }}>
        <div className="container">
          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px" }}>
            <div>
              <p className="label">Bergabunglah</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "44px", lineHeight: 1.2, marginBottom: "16px" }}>
                Tertarik menjadi bagian dari <em style={{ color: "#8B6914" }}>keluarga Kriya Kayu?</em>
              </h2>
              <p style={{ color: "#5C3D2E", fontSize: "15px", lineHeight: 1.7, marginBottom: "32px" }}>Hubungi kami untuk informasi pendaftaran, kunjungan workshop, atau sekadar bertanya.</p>
              {[
                { icon: "📍", label: "ALAMAT", val: data.contact.alamat },
                { icon: "📞", label: "TELEPON", val: data.contact.telepon },
                { icon: "🕐", label: "JAM OPERASIONAL", val: data.contact.jamOperasional },
                { icon: "✉️", label: "EMAIL", val: data.contact.email },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: "16px", marginBottom: "20px" }}>
                  <div style={{ width: "36px", height: "36px", background: "#2C1A0E", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0, borderRadius: "4px" }}>{c.icon}</div>
                  <div>
                    <p style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#8B6914", marginBottom: "2px" }}>{c.label}</p>
                    <p style={{ fontSize: "14px", color: "#2C1A0E" }}>{c.val}</p>
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
                  <label style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#8B6914", display: "block", marginBottom: "8px" }}>{f.label}</label>
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={formData[f.key]}
                    onChange={(e) => setFormData((prev) => ({ ...prev, [f.key]: e.target.value }))}
                    style={{ width: "100%", padding: "12px 16px", border: "1px solid #E8DCC8", background: "#FAFAF8", fontSize: "14px", outline: "none", fontFamily: "inherit" }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: "10px", letterSpacing: "0.15em", color: "#8B6914", display: "block", marginBottom: "8px" }}>PESAN</label>
                <textarea
                  placeholder="Tulis pesan Anda di sini..."
                  rows={4}
                  value={formData.pesan}
                  onChange={(e) => setFormData((prev) => ({ ...prev, pesan: e.target.value }))}
                  style={{ width: "100%", padding: "12px 16px", border: "1px solid #E8DCC8", background: "#FAFAF8", fontSize: "14px", outline: "none", fontFamily: "inherit", resize: "vertical" }}
                />
              </div>
              <button className="btn-primary" style={{ marginTop: "8px" }} onClick={handleKirimWA}>
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1A0E07", padding: "32px 40px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
        <p style={{ color: "rgba(250,250,248,0.4)", fontSize: "12px", letterSpacing: "0.1em" }}>© 2026 KRIYA KAYU — SMK NEGERI 5 MALANG</p>
        <p style={{ color: "rgba(250,250,248,0.4)", fontSize: "12px", letterSpacing: "0.1em" }}>FURNITURE • MESIN • BANGKU • UKIR • FINISHING</p>
      </footer>
    </div>
  );
}
