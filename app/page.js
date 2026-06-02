"use client";
import { useState } from "react";

const jurusan = [
  {
    id: "kayu",
    nama: "Kriya Kayu",
    singkatan: "KK",
    tagline: "Membentuk Kayu, Menciptakan Karya",
    desc: "Furniture, ukir, finishing — teknik pengolahan kayu dari tradisional hingga modern.",
    warna: "#8B5A2B",
    aksen: "#D4A373",
    bg: "#FFF8F0",
    image: "/images/gambar1.png",
  },
  {
    id: "keramik",
    nama: "Kriya Keramik",
    singkatan: "KR",
    tagline: "Membentuk Tanah, Merawat Tradisi",
    desc: "Teknik pilin, putar, jiger, dan cetak tuang untuk karya keramik profesional.",
    warna: "#2C5F8A",
    aksen: "#6BB5E0",
    bg: "#F0F8FF",
    image: "/images/gambar6.png",
  },
  {
    id: "tekstil",
    nama: "Kriya Tekstil",
    singkatan: "KT",
    tagline: "Dari Benang ke Kain Bermakna",
    desc: "Batik tulis, batik cap, tenun ATBM, sablon, sulam, dan kewirausahaan tekstil.",
    warna: "#C0392B",
    aksen: "#E67E22",
    bg: "#FFF5F0",
    image: "/images/tekstil.png",
  },
  {
    id: "busana",
    nama: "Tata Busana",
    singkatan: "TB",
    tagline: "Merancang Busana, Merajut Impian",
    desc: "Desain mode, menjahit, draping, dan finishing busana berkualitas tinggi.",
    warna: "#6C3483",
    aksen: "#BB8FCE",
    bg: "#F5F0FF",
    image: "/images/busana.png",
  },
  {
    id: "animasi",
    nama: "Animasi",
    singkatan: "AN",
    tagline: "Bergerak. Bercerita. Berdampak.",
    desc: "Animasi 2D & 3D, game art, motion graphics, storyboard, dan desain karakter.",
    warna: "#E67E22",
    aksen: "#F39C12",
    bg: "#FFF8F0",
    image: "/images/gambar2.png",
  },
  {
    id: "tjkt",
    nama: "TJKT",
    singkatan: "TJ",
    tagline: "Membangun Jaringan, Menghubungkan Dunia",
    desc: "Instalasi jaringan, CCTV, rakit komputer, server, dan telekomunikasi.",
    warna: "#1E8449",
    aksen: "#27AE60",
    bg: "#F0FFF4",
    image: "/images/gambar3.png",
  },
  {
    id: "pplg",
    nama: "PPLG",
    singkatan: "PP",
    tagline: "Coding Masa Kini, Solusi Masa Depan",
    desc: "Web development, database, server, game, dan IoT untuk era digital.",
    warna: "#2980B9",
    aksen: "#5DADE2",
    bg: "#F0F8FF",
    image: "/images/gambar4.png",
  },
  {
    id: "dkv",
    nama: "DKV",
    singkatan: "DK",
    tagline: "Desain yang Bicara Tanpa Kata",
    desc: "Desain grafis, branding, ilustrasi, tipografi, dan komunikasi visual.",
    warna: "#D35400",
    aksen: "#E67E22",
    bg: "#FFF8F0",
    image: "/images/gambar5.png",
  },
];

export default function PortalPage() {
  const [hoveredId, setHoveredId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    nama: "",
    noHp: "",
    keperluan: "",
    pesan: "",
  });

  const filtered = jurusan.filter((j) => j.nama.toLowerCase().includes(searchQuery.toLowerCase()) || j.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  const goToJurusan = (id) => {
    window.open(`https://smkn5mlg.vercel.app/jurusan/${id}`, "_blank");
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSendWA = () => {
    const message = `Halo SMKN 5 Malang,%0A%0A*Nama:* ${formData.nama}%0A*No. HP/WA:* ${formData.noHp}%0A*Keperluan:* ${formData.keperluan}%0A*Pesan:* ${formData.pesan}%0A%0ATerima kasih.`;
    window.open(`https://wa.me/6281234567890?text=${message}`, "_blank");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
        color: "#1A1A1A",
        fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        .jurusan-card { 
          cursor: pointer; 
          transition: all 0.4s cubic-bezier(0.2, 0.9, 0.4, 1.1); 
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        }
        .jurusan-card:hover { 
          transform: translateY(-8px); 
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .card-img { 
          transition: transform 0.5s ease; 
        }
        .jurusan-card:hover .card-img { 
          transform: scale(1.05); 
        }
        .search-input:focus { 
          outline: none; 
          border-color: #10B981 !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .nav-jurusan { 
          transition: all 0.2s; 
        }
        .nav-jurusan:hover { 
          opacity: 1 !important;
          color: #10B981 !important;
        }
        .contact-input:focus {
          outline: none;
          border-color: #10B981 !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.08);
        }
        @media (max-width: 1024px) {
          .grid-jurusan { grid-template-columns: repeat(3, 1fr) !important; }
          .contact-grid-main { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 48px !important; }
          .grid-jurusan { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .nav-links { display: none !important; }
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (max-width: 640px) {
          .grid-jurusan { grid-template-columns: 1fr !important; }
          .contact-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          height: "70px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 48px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <img
            src="/images/logo.png"
            alt="Logo SMKN 5 Malang"
            style={{
              width: "44px",
              height: "44px",
              objectFit: "contain",
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "14px",
                fontWeight: 800,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
              }}
            >
              SMKN 5 MALANG
            </p>
            <p
              style={{
                fontSize: "9px",
                color: "#10B981",
                letterSpacing: "0.08em",
                fontWeight: 600,
              }}
            >
              PROFIL JURUSAN
            </p>
          </div>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: "32px" }}>
          {jurusan.slice(0, 4).map((j) => (
            <button
              key={j.id}
              onClick={() => goToJurusan(j.id)}
              className="nav-jurusan"
              style={{
                background: "none",
                border: "none",
                color: "#4A4A4A",
                fontSize: "13px",
                fontWeight: 500,
                letterSpacing: "0.02em",
                cursor: "pointer",
                opacity: 0.7,
                fontFamily: "inherit",
              }}
            >
              {j.nama}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#10B981",
              boxShadow: "0 0 0 2px rgba(16,185,129,0.2)",
            }}
          ></div>
          <span
            style={{
              fontSize: "11px",
              color: "#888",
              fontWeight: 500,
              letterSpacing: "0.05em",
            }}
          >
            8 JURUSAN AKTIF
          </span>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "90vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          paddingTop: "70px",
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          <img
            src="/images/sekolah.png"
            alt="SMKN 5 Malang"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: 0.15,
            }}
          />
        </div>

        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        ></div>

        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 48px",
            position: "relative",
            zIndex: 2,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "2px",
                background: "#10B981",
              }}
            ></div>
            <span
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "0.15em",
                color: "#10B981",
                textTransform: "uppercase",
              }}
            >
              Selamat Datang di
            </span>
          </div>

          <h1
            className="hero-title"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "12px",
              color: "#1A1A1A",
              letterSpacing: "-0.03em",
            }}
          >
            SMK NEGERI
          </h1>
          <h1
            className="hero-title"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: "72px",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "48px",
              color: "#10B981",
              letterSpacing: "-0.03em",
            }}
          >
            5 MALANG
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: "80px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ maxWidth: "520px" }}>
              <p
                style={{
                  color: "#4A4A4A",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  marginBottom: "40px",
                  fontWeight: 400,
                }}
              >
                Portal profil 8 jurusan unggulan — temukan jurusan yang sesuai dengan passion dan bakat kamu.
              </p>

              <div style={{ position: "relative", marginBottom: "32px" }}>
                <span
                  style={{
                    position: "absolute",
                    left: "16px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "#AAA",
                    fontSize: "16px",
                  }}
                >
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Cari jurusan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                  style={{
                    width: "100%",
                    padding: "14px 16px 14px 48px",
                    background: "white",
                    border: "1px solid #E2E8F0",
                    color: "#1A1A1A",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    borderRadius: "12px",
                    transition: "all 0.2s",
                  }}
                />
              </div>

              <button
                onClick={() => document.getElementById("jurusan")?.scrollIntoView({ behavior: "smooth" })}
                style={{
                  background: "#1A1A1A",
                  color: "#fff",
                  border: "none",
                  padding: "14px 36px",
                  fontSize: "13px",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  borderRadius: "40px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#10B981")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#1A1A1A")}
              >
                LIHAT SEMUA JURUSAN ↓
              </button>
            </div>

            <div
              className="hero-stats"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
                background: "white",
                borderRadius: "24px",
                padding: "8px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              {[
                { angka: "8", label: "Jurusan Unggulan" },
                { angka: "50+", label: "Guru Profesional" },
                { angka: "1200+", label: "Siswa Aktif" },
                { angka: "42", label: "Tahun Berdiri" },
              ].map((s, i) => (
                <div
                  key={i}
                  style={{
                    background: "#FFFFFF",
                    padding: "28px 20px",
                    textAlign: "center",
                    borderRadius: "16px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "40px",
                      fontWeight: 800,
                      color: "#10B981",
                      lineHeight: 1,
                    }}
                  >
                    {s.angka}
                  </p>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      color: "#888",
                      marginTop: "8px",
                    }}
                  >
                    {s.label.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GRID JURUSAN ── */}
      <section id="jurusan" style={{ padding: "80px 0", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: "48px",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "#10B981",
                  marginBottom: "12px",
                  textTransform: "uppercase",
                }}
              >
                Pilih Jurusanmu
              </p>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "40px",
                  fontWeight: 800,
                  color: "#1A1A1A",
                  lineHeight: 1.2,
                  letterSpacing: "-0.02em",
                }}
              >
                {searchQuery ? `${filtered.length} Jurusan Ditemukan` : "8 Jurusan Unggulan"}
              </h2>
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "none",
                  border: "1px solid #E2E8F0",
                  color: "#666",
                  padding: "8px 20px",
                  fontSize: "12px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  borderRadius: "40px",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#F5F5F5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
              >
                Reset ✕
              </button>
            )}
          </div>

          <div
            className="grid-jurusan"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "24px",
            }}
          >
            {filtered.map((j) => (
              <div
                key={j.id}
                className="jurusan-card"
                onClick={() => goToJurusan(j.id)}
                onMouseEnter={() => setHoveredId(j.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background: "#FFFFFF",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    height: "180px",
                    overflow: "hidden",
                    position: "relative",
                    background: j.bg,
                  }}
                >
                  {j.image && (
                    <img
                      src={j.image}
                      alt={j.nama}
                      className="card-img"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        opacity: 0.85,
                      }}
                    />
                  )}
                </div>

                <div
                  style={{
                    padding: "20px",
                    background: "#FFFFFF",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "18px",
                      fontWeight: 700,
                      color: "#1A1A1A",
                      marginBottom: "6px",
                      lineHeight: 1.3,
                    }}
                  >
                    {j.nama}
                  </h3>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 600,
                      color: j.aksen,
                      letterSpacing: "0.03em",
                      marginBottom: "10px",
                    }}
                  >
                    {j.tagline}
                  </p>
                  <p
                    style={{
                      fontSize: "13px",
                      color: "#666",
                      lineHeight: 1.6,
                      fontWeight: 400,
                      marginBottom: "16px",
                    }}
                  >
                    {j.desc}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "11px",
                        fontWeight: 700,
                        color: j.warna,
                        letterSpacing: "0.08em",
                      }}
                    >
                      KUNJUNGI
                    </span>
                    <span
                      style={{
                        color: j.warna,
                        fontSize: "14px",
                        transition: "transform 0.2s",
                        transform: hoveredId === j.id ? "translateX(4px)" : "translateX(0)",
                      }}
                    >
                      →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div
              style={{
                textAlign: "center",
                padding: "80px 0",
                color: "#888",
              }}
            >
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  marginBottom: "8px",
                  color: "#1A1A1A",
                }}
              >
                Jurusan tidak ditemukan
              </p>
              <p style={{ fontSize: "14px" }}>Coba kata kunci lain</p>
            </div>
          )}
        </div>
      </section>

      {/* ── TENTANG SMKN 5 ── */}
      <section style={{ padding: "80px 0", background: "#F8FAFC" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
          <div
            className="about-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "60px",
              alignItems: "center",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "#10B981",
                  marginBottom: "16px",
                  textTransform: "uppercase",
                }}
              >
                Tentang Sekolah
              </p>
              <h2
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "40px",
                  fontWeight: 800,
                  lineHeight: 1.2,
                  marginBottom: "24px",
                  color: "#1A1A1A",
                  letterSpacing: "-0.02em",
                }}
              >
                SMK Negeri 5 <span style={{ color: "#10B981" }}>Malang</span>
              </h2>
              <div
                style={{
                  width: "60px",
                  height: "3px",
                  background: "#10B981",
                  marginBottom: "28px",
                }}
              ></div>
              <p
                style={{
                  color: "#4A4A4A",
                  lineHeight: 1.8,
                  fontSize: "15px",
                  fontWeight: 400,
                  marginBottom: "20px",
                }}
              >
                SMK Negeri 5 Malang adalah sekolah kejuruan negeri yang berfokus pada bidang seni, kriya, dan teknologi. Berlokasi di Jl. Ikan Piranha Atas No.2, Malang, kami telah menghasilkan ribuan alumni profesional yang berkiprah di
                industri kreatif dan teknologi.
              </p>
              <p
                style={{
                  color: "#666",
                  lineHeight: 1.8,
                  fontSize: "14px",
                  fontWeight: 400,
                }}
              >
                Dengan 8 jurusan unggulan yang terakreditasi A, kami berkomitmen mencetak generasi penerus yang kompeten, kreatif, dan siap bersaing di era global.
              </p>
              <div
                style={{
                  marginTop: "36px",
                  display: "flex",
                  gap: "16px",
                  flexWrap: "wrap",
                }}
              >
                <div
                  style={{
                    padding: "14px 24px",
                    border: "1px solid #E2E8F0",
                    background: "white",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#10B981",
                      marginBottom: "6px",
                    }}
                  >
                    LOKASI
                  </p>
                  <p style={{ fontSize: "13px", color: "#333", fontWeight: 500 }}>Malang, Jawa Timur</p>
                </div>
                <div
                  style={{
                    padding: "14px 24px",
                    border: "1px solid #E2E8F0",
                    background: "white",
                    borderRadius: "12px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: "10px",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      color: "#10B981",
                      marginBottom: "6px",
                    }}
                  >
                    STATUS
                  </p>
                  <p style={{ fontSize: "13px", color: "#333", fontWeight: 500 }}>Negeri — Terakreditasi A</p>
                </div>
              </div>
            </div>

            <div>
              <p
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "11px",
                  fontWeight: 600,
                  letterSpacing: "0.15em",
                  color: "#10B981",
                  marginBottom: "20px",
                  textTransform: "uppercase",
                }}
              >
                Akses Cepat ke Jurusan
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {jurusan.map((j) => (
                  <button
                    key={j.id}
                    onClick={() => goToJurusan(j.id)}
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      padding: "14px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      cursor: "pointer",
                      transition: "all 0.2s",
                      textAlign: "left",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = j.bg;
                      e.currentTarget.style.borderColor = j.aksen;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#FFFFFF";
                      e.currentTarget.style.borderColor = "#E2E8F0";
                    }}
                  >
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        borderRadius: "50%",
                        background: j.warna,
                      }}
                    ></span>
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: "#1A1A1A",
                        flex: 1,
                      }}
                    >
                      {j.nama}
                    </span>
                    <span style={{ fontSize: "14px", color: j.aksen, opacity: 0.7 }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HUBUNGI KAMI & SOSIAL MEDIA ── */}
      <section style={{ padding: "80px 0", background: "#FFFFFF" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 48px" }}>
          {/* Header Section */}
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "16px" }}>
              <div style={{ width: "40px", height: "2px", background: "#10B981", alignSelf: "center" }}></div>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "#10B981",
                  textTransform: "uppercase",
                }}
              >
                Hubungi Kami
              </span>
              <div style={{ width: "40px", height: "2px", background: "#10B981", alignSelf: "center" }}></div>
            </div>
            <h2
              style={{
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontSize: "42px",
                fontWeight: 800,
                color: "#1A1A1A",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Tertarik Menjadi Bagian Dari
              <br />
              <span style={{ color: "#10B981" }}>SMKN 5 Malang?</span>
            </h2>
            <p
              style={{
                color: "#666",
                fontSize: "16px",
                marginTop: "20px",
                maxWidth: "500px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Hubungi kami untuk informasi pendaftaran, kunjungan sekolah, atau sekadar bertanya seputar jurusan kami.
            </p>
          </div>

          {/* Main Contact Grid - 2 Columns */}
          <div className="contact-grid-main" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px" }}>
            {/* Left Side - Contact Info Cards */}
            <div>
              <div className="contact-info-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "20px", marginBottom: "32px" }}>
                <div
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "20px",
                    padding: "24px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(16,185,129,0.1)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                      fontSize: "24px",
                    }}
                  >
                    📍
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#10B981",
                      marginBottom: "8px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    ALAMAT
                  </h3>
                  <p style={{ color: "#4A4A4A", fontSize: "14px", lineHeight: 1.5 }}>
                    Jl. Ikan Piranha Atas No.2
                    <br />
                    Malang, Jawa Timur 65141
                  </p>
                </div>

                <div
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "20px",
                    padding: "24px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(16,185,129,0.1)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                      fontSize: "24px",
                    }}
                  >
                    📞
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#10B981",
                      marginBottom: "8px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    TELEPON
                  </h3>
                  <p style={{ color: "#4A4A4A", fontSize: "14px" }}>(0341) 478195</p>
                  <p style={{ color: "#888", fontSize: "12px", marginTop: "8px" }}>Senin – Jumat: 07.00 – 16.00 WIB</p>
                </div>

                <div
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "20px",
                    padding: "24px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(16,185,129,0.1)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                      fontSize: "24px",
                    }}
                  >
                    ✉️
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#10B981",
                      marginBottom: "8px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    EMAIL
                  </h3>
                  <p style={{ color: "#4A4A4A", fontSize: "13px" }}>info@smkn5malang.sch.id</p>
                  <p style={{ color: "#4A4A4A", fontSize: "13px", marginTop: "4px" }}>humas@smkn5malang.sch.id</p>
                </div>

                <div
                  style={{
                    background: "#F8FAFC",
                    borderRadius: "20px",
                    padding: "24px",
                    transition: "all 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-4px)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
                >
                  <div
                    style={{
                      width: "48px",
                      height: "48px",
                      background: "rgba(16,185,129,0.1)",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "16px",
                      fontSize: "24px",
                    }}
                  >
                    🕒
                  </div>
                  <h3
                    style={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "#10B981",
                      marginBottom: "8px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    JAM KERJA
                  </h3>
                  <p style={{ color: "#4A4A4A", fontSize: "14px" }}>Senin – Jumat</p>
                  <p style={{ color: "#4A4A4A", fontSize: "14px" }}>07.00 – 16.00 WIB</p>
                </div>
              </div>

              {/* Social Media Section */}
              <div
                style={{
                  background: "#F8FAFC",
                  borderRadius: "20px",
                  padding: "28px",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "#10B981",
                    marginBottom: "20px",
                    textTransform: "uppercase",
                  }}
                >
                  Ikuti Kami di Media Sosial
                </p>
                <div style={{ display: "flex", justifyContent: "center", gap: "16px", flexWrap: "wrap" }}>
                  {[
                    { name: "Instagram", icon: "📷", url: "https://instagram.com/smkn5malang", color: "#E4405F" },
                    { name: "Facebook", icon: "📘", url: "https://facebook.com/smkn5malang", color: "#1877F2" },
                    { name: "YouTube", icon: "📺", url: "https://youtube.com/smkn5malang", color: "#FF0000" },
                    { name: "TikTok", icon: "🎵", url: "https://tiktok.com/@smkn5malang", color: "#000000" },
                    { name: "Twitter", icon: "🐦", url: "https://twitter.com/smkn5malang", color: "#1DA1F2" },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        padding: "10px 20px",
                        background: "#FFFFFF",
                        borderRadius: "40px",
                        textDecoration: "none",
                        color: "#1A1A1A",
                        fontSize: "13px",
                        fontWeight: 600,
                        transition: "all 0.2s",
                        border: "1px solid #E2E8F0",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = social.color;
                        e.currentTarget.style.color = "white";
                        e.currentTarget.style.borderColor = social.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#FFFFFF";
                        e.currentTarget.style.color = "#1A1A1A";
                        e.currentTarget.style.borderColor = "#E2E8F0";
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>{social.icon}</span>
                      {social.name}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Side - Contact Form */}
            <div
              style={{
                background: "#F8FAFC",
                borderRadius: "28px",
                padding: "40px",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: "24px",
                  fontWeight: 700,
                  color: "#1A1A1A",
                  marginBottom: "8px",
                }}
              >
                Kirim Pesan
              </h3>
              <p style={{ color: "#888", fontSize: "14px", marginBottom: "28px" }}>Kami akan merespon dalam 1x24 jam</p>

              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "8px", display: "block" }}>NAMA LENGKAP</label>
                  <input
                    type="text"
                    name="nama"
                    value={formData.nama}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama Anda"
                    className="contact-input"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "8px", display: "block" }}>NOMOR HP / WA</label>
                  <input
                    type="tel"
                    name="noHp"
                    value={formData.noHp}
                    onChange={handleInputChange}
                    placeholder="08xxxxxxxxxx"
                    className="contact-input"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                    }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "8px", display: "block" }}>KEPERLUAN</label>
                  <select
                    name="keperluan"
                    value={formData.keperluan}
                    onChange={handleInputChange}
                    className="contact-input"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                      cursor: "pointer",
                    }}
                  >
                    <option value="">Pilih keperluan Anda</option>
                    <option value="Informasi Pendaftaran">Informasi Pendaftaran</option>
                    <option value="Kunjungan Sekolah">Kunjungan Sekolah</option>
                    <option value="Kerjasama">Kerjasama</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "12px", fontWeight: 600, color: "#333", marginBottom: "8px", display: "block" }}>PESAN</label>
                  <textarea
                    name="pesan"
                    value={formData.pesan}
                    onChange={handleInputChange}
                    placeholder="Tulis pesan Anda di sini..."
                    rows="4"
                    className="contact-input"
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      background: "#FFFFFF",
                      border: "1px solid #E2E8F0",
                      borderRadius: "12px",
                      fontSize: "14px",
                      fontFamily: "inherit",
                      transition: "all 0.2s",
                      resize: "vertical",
                    }}
                  />
                </div>

                <button
                  onClick={handleSendWA}
                  style={{
                    background: "#25D366",
                    color: "white",
                    border: "none",
                    padding: "16px 28px",
                    fontSize: "14px",
                    fontWeight: 700,
                    borderRadius: "40px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "12px",
                    transition: "all 0.2s",
                    marginTop: "8px",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#128C7E")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "#25D366")}
                >
                  <span>💬</span>
                  KIRIM VIA WHATSAPP →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          background: "#F8FAFC",
          padding: "40px 48px",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <img
              src="/images/logo.png"
              alt="Logo SMKN 5 Malang"
              style={{
                width: "40px",
                height: "40px",
                objectFit: "contain",
              }}
            />
            <div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "12px",
                  color: "#1A1A1A",
                  letterSpacing: "-0.02em",
                }}
              >
                SMK NEGERI 5 MALANG
              </p>
              <p
                style={{
                  color: "#AAA",
                  fontSize: "10px",
                }}
              >
                © 2026 All Rights Reserved
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {jurusan.slice(0, 6).map((j) => (
              <button
                key={j.id}
                onClick={() => goToJurusan(j.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#888",
                  fontSize: "11px",
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  transition: "color 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = j.warna)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#888")}
              >
                {j.nama}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
