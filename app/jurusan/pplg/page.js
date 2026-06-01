"use client";
import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const teachers = [
  { nama: "Pak Alwan", image: "/images/pplg/guru1.jpg", color: "#00F5FF" },
  { nama: "Pak Dian", image: "/images/pplg/guru2.jpg", color: "#FF3DFF" },
  { nama: "Pak Fandik", image: "/images/pplg/guru3.jpg", color: "#FFD700" },
  { nama: "Pak Mahali", image: "/images/pplg/guru4.jpg", color: "#00FF88" },
  { nama: "Pak Hendra", image: "/images/pplg/guru5.jpg", color: "#FF6B35" },
  { nama: "Bu Sulastri", image: "/images/pplg/guru6.jpg", color: "#A855F7" },
];

const skills = [
  { icon: "</>", nama: "Web Development", desc: "HTML, CSS, JavaScript, React, Laravel — dari frontend sampai backend production-ready.", color: "#00F5FF", glow: "0 0 40px rgba(0,245,255,0.4)" },
  { icon: "🗄", nama: "Database", desc: "Desain, implementasi, dan optimasi basis data relasional maupun NoSQL modern.", color: "#FF3DFF", glow: "0 0 40px rgba(255,61,255,0.4)" },
  { icon: "⚙", nama: "Server & DevOps", desc: "Administrasi server Linux, CI/CD pipeline, containerisasi Docker, dan cloud deployment.", color: "#FFD700", glow: "0 0 40px rgba(255,215,0,0.4)" },
  { icon: "🎮", nama: "Game Development", desc: "Pemrograman game 2D/3D dengan Unity — dari desain level hingga publish ke platform.", color: "#00FF88", glow: "0 0 40px rgba(0,255,136,0.4)" },
  { icon: "📡", nama: "IoT", desc: "Merangkai dan memprogram Arduino & Raspberry Pi untuk solusi Internet of Things nyata.", color: "#FF6B35", glow: "0 0 40px rgba(255,107,53,0.4)" },
  { icon: "📱", nama: "Mobile Dev", desc: "Pengembangan aplikasi Android & iOS cross-platform dengan Flutter dan Dart.", color: "#A855F7", glow: "0 0 40px rgba(168,85,247,0.4)" },
];

const karya = [
  {
    judul: "Florapedia",
    image: "/images/pplg/florapedia.png",
    stack: ["Laravel", "MySQL", "Bootstrap"],
    desc: "Ensiklopedia tumbuhan dengan fitur pencarian dan penyaringan.",
    color: "#00F5FF",
  },
  {
    judul: "Website Batik Indonesia",
    image: "/images/pplg/batik.png",
    stack: ["Next.js", "Node.js", "PHP"],
    desc: "Situs web yang menampilkan budaya batik Indonesia beserta informasinya.",
    color: "#FF3DFF",
  },
  {
    judul: "Math Learning Website",
    image: "/images/pplg/matt.png",
    stack: ["HTML", "PHP", "MySQL"],
    desc: "Platform pendidikan untuk belajar matematika dengan latihan interaktif.",
    color: "#00FF88",
  },
];

const fasilitas = [
  { no: "01", nama: "Lab Komputer Utama", desc: "30 unit PC high-spec dengan dual monitor untuk coding dan game development.", color: "#00F5FF" },
  { no: "02", nama: "Server Room", desc: "Ruang server Linux fisik untuk praktik administrasi dan deployment production.", color: "#FF3DFF" },
  { no: "03", nama: "Lab IoT & Hardware", desc: "Arduino, Raspberry Pi, sensor, dan komponen elektronik lengkap.", color: "#00FF88" },
  { no: "04", nama: "Game Dev Studio", desc: "Workstation berperforma tinggi dengan GPU dedicated untuk rendering & testing game.", color: "#FF6B35" },
  { no: "05", nama: "Ruang Presentasi", desc: "Ruang demo dengan layar besar untuk pitching dan presentasi proyek akhir siswa.", color: "#FFD700" },
  { no: "06", nama: "Perpustakaan Digital", desc: "Akses ke ribuan buku pemrograman, dokumentasi resmi, dan kursus online premium.", color: "#A855F7" },
];

const kontakInfo = [
  { label: "ALAMAT", val: "Jl. Ikan Piranha Atas No.2, Malang, Jawa Timur 65142" },
  { label: "TELEPON", val: "(0341) 478195" },
  { label: "EMAIL", val: "pplg@smkn5malang.sch.id" },
  { label: "OPERASIONAL", val: "Senin – Jumat: 07.00 – 16.00 WIB" },
];

// ─── TYPING ANIMATION ────────────────────────────────────────────────────────

const TypingText = ({ lines }) => {
  const [displayed, setDisplayed] = useState("");
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const current = lines[lineIdx];
    if (charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + current[charIdx]);
        setCharIdx((c) => c + 1);
      }, 36);
      return () => clearTimeout(t);
    } else if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setDisplayed((p) => p + "\n");
        setLineIdx((l) => l + 1);
        setCharIdx(0);
      }, 160);
      return () => clearTimeout(t);
    } else {
      setDone(true);
    }
  }, [charIdx, lineIdx, done, lines]);

  return (
    <pre style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "clamp(11px,1.3vw,14px)", lineHeight: 1.8, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
      {displayed.split("\n").map((line, i) => {
        let color = "#94a3b8";
        if (line.startsWith("$")) color = "#00F5FF";
        if (line.startsWith(">")) color = "#00FF88";
        if (line.startsWith("//")) color = "#555";
        return (
          <span key={i} style={{ color, display: "block" }}>
            {line || " "}
          </span>
        );
      })}
      {!done && <span style={{ display: "inline-block", width: 8, height: "1em", background: "#00F5FF", verticalAlign: "text-bottom", animation: "blink 1s step-end infinite" }} />}
    </pre>
  );
};

// ─── KARYA CARD ──────────────────────────────────────────────────────────────

const KaryaCard = ({ k, height = 340, style = {} }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} onClick={() => setHovered((v) => !v)} style={{ position: "relative", height, overflow: "hidden", cursor: "pointer", background: "#0d0d1a", ...style }}>
      <img
        src={k.image}
        alt={k.judul}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.6s ease", transform: hovered ? "scale(1.08)" : "scale(1)", filter: "brightness(0.45) saturate(0.7)" }}
      />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${k.color}, transparent)`, zIndex: 2 }} />
      <div style={{ position: "absolute", top: 16, left: 16, zIndex: 3 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, background: "rgba(0,0,0,0.7)", color: "#666", padding: "4px 10px", border: "1px solid #222", backdropFilter: "blur(4px)" }}>{k.id}</span>
      </div>
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 3 }}>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, background: k.color, color: "#000", padding: "4px 10px", fontWeight: 700 }}>{k.kategori}</span>
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          background: `linear-gradient(135deg, rgba(0,0,0,0.96) 0%, rgba(13,13,26,0.96) 100%)`,
          backdropFilter: "blur(4px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 28,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
          borderTop: hovered ? `2px solid ${k.color}` : "2px solid transparent",
        }}
      >
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
          {k.stack.map((s) => (
            <span key={s} style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, padding: "2px 8px", border: `1px solid ${k.color}44`, color: k.color, background: `${k.color}11` }}>
              {s}
            </span>
          ))}
        </div>
        <h3 style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 8, lineHeight: 1.2, textShadow: `0 0 20px ${k.color}66` }}>{k.judul}</h3>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.65, marginBottom: 12 }}>{k.desc}</p>
        <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: k.color }}>{k.tahun}</span>
      </div>
    </div>
  );
};

// ─── MAIN PAGE ────────────────────────────────────────────────────────────────

export default function PPLGPage() {
  const [form, setForm] = useState({ nama: "", hp: "", keperluan: "", pesan: "" });
  const [mouse, setMouse] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const move = (e) => setMouse({ x: (e.clientX / window.innerWidth) * 100, y: (e.clientY / window.innerHeight) * 100 });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const handleKirimWA = () => {
    if (!form.nama || !form.hp) {
      alert("Nama dan nomor HP wajib diisi.");
      return;
    }
    const text = `Halo PPLG SMKN 5 Malang!%0A%0A*Nama:* ${form.nama}%0A*No. HP:* ${form.hp}%0A*Keperluan:* ${form.keperluan || "-"}%0A*Pesan:* ${form.pesan || "-"}`;
    window.open(`https://wa.me/6281234567890?text=${text}`, "_blank");
  };

  const heroLines = [
    "$ whoami",
    "> PPLG — SMKN 5 Malang",
    "",
    "$ cat mission.txt",
    "> Mencetak developer, game maker,",
    "> server engineer & IoT builder",
    "> yang siap tempur sejak 2008.",
    "",
    "$ ls skills/",
    "> web  db  server  game  iot  mobile",
    "",
    "// Ready to build something great?",
  ];

  return (
    <div style={{ background: "#080810", color: "#e2e8f0", minHeight: "100vh", fontFamily: "'Outfit',sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:#00F5FF; color:#000; }
        .mono { font-family:'JetBrains Mono',monospace; }

        @keyframes blink    { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes float    { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes spin     { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes gradient-shift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes scanline { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        .glow-cyan   { box-shadow: 0 0 30px rgba(0,245,255,0.3); }
        .glow-pink   { box-shadow: 0 0 30px rgba(255,61,255,0.3); }
        .glow-green  { box-shadow: 0 0 30px rgba(0,255,136,0.3); }

        .nav-link { color:#64748b; text-decoration:none; font-size:12px; letter-spacing:0.08em; font-family:'JetBrains Mono',monospace; transition:color 0.2s; }
        .nav-link:hover { color:#00F5FF; }

        .skill-card { transition: all 0.3s; cursor:default; }
        .skill-card:hover { transform:translateY(-4px) !important; }

        .guru-card { transition: all 0.3s; }
        .guru-card:hover { transform:translateY(-6px) !important; }

        .fasilitas-card { transition: all 0.3s; }
        .fasilitas-card:hover { transform:translateY(-3px) !important; }

        .btn-main {
          background: linear-gradient(135deg, #00F5FF, #A855F7, #FF3DFF);
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
          color:#000; border:none; padding:15px 36px;
          font-family:'JetBrains Mono',monospace; font-size:12px;
          letter-spacing:0.15em; cursor:pointer; font-weight:700;
          transition:transform 0.2s, box-shadow 0.2s;
        }
        .btn-main:hover { transform:scale(1.04); box-shadow:0 0 40px rgba(0,245,255,0.5); }

        .btn-outline {
          background:transparent; color:#fff; border:1px solid #333;
          padding:14px 36px; font-family:'JetBrains Mono',monospace;
          font-size:12px; letter-spacing:0.15em; cursor:pointer;
          transition: all 0.3s;
        }
        .btn-outline:hover { border-color:#00F5FF; color:#00F5FF; box-shadow:0 0 20px rgba(0,245,255,0.2); }

        .input-field {
          width:100%; padding:14px 16px;
          background:rgba(255,255,255,0.04);
          border:1px solid rgba(255,255,255,0.08);
          color:#fff; font-size:13px; outline:none;
          font-family:'JetBrains Mono',monospace;
          transition: border-color 0.2s, box-shadow 0.2s;
          backdrop-filter: blur(8px);
        }
        .input-field:focus { border-color:#00F5FF; box-shadow:0 0 20px rgba(0,245,255,0.15); }
        .input-field::placeholder { color:#334155; }

        @media (max-width:768px) {
          .two-col        { grid-template-columns:1fr !important; gap:40px !important; }
          .teacher-grid   { grid-template-columns:1fr !important; }
          .skills-grid    { grid-template-columns:1fr !important; }
          .fasilitas-grid { grid-template-columns:1fr !important; }
          .karya-2col     { grid-template-columns:1fr !important; }
          .karya-3col     { grid-template-columns:1fr !important; }
          .nav-links      { display:none !important; }
          .hero-split     { grid-template-columns:1fr !important; }
          .stats-row      { grid-template-columns:repeat(2,1fr) !important; }
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
          background: "rgba(8,8,16,0.85)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "0 48px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: 8,
              overflow: "hidden",
              background: "linear-gradient(135deg,#00F5FF,#A855F7,#FF3DFF)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 20px rgba(0,245,255,0.4)",
            }}
          >
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "#000" }}>{"/>"}</span>
          </div>
          <div>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 13, fontWeight: 700, color: "#fff", lineHeight: 1 }}>PPLG</p>
            <p className="mono" style={{ fontSize: 9, color: "#475569", letterSpacing: "0.15em" }}>
              SMKN5 MALANG
            </p>
          </div>
        </div>
        <div className="nav-links" style={{ display: "flex", gap: 32 }}>
          {["Tentang", "Guru", "Keahlian", "Karya", "Fasilitas", "Kontak"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
              {item}
            </a>
          ))}
        </div>
        <a
          href="/admin/login?jurusan=pplg"
          className="mono"
          style={{ fontSize: 11, color: "#00F5FF", border: "1px solid rgba(0,245,255,0.3)", padding: "7px 18px", textDecoration: "none", letterSpacing: "0.1em", transition: "all 0.2s", borderRadius: 4 }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(0,245,255,0.1)";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0,245,255,0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          ADMIN
        </a>
      </nav>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 64, position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            background: `radial-gradient(ellipse at ${mouse.x}% ${mouse.y}%, rgba(0,245,255,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse at ${100 - mouse.x}% ${100 - mouse.y}%, rgba(168,85,247,0.08) 0%, transparent 60%),
                      radial-gradient(ellipse at 50% 50%, rgba(255,61,255,0.04) 0%, transparent 70%)`,
            transition: "background 0.3s ease",
          }}
        />
        <div
          style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "linear-gradient(rgba(0,245,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,245,255,0.03) 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "8%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, transparent 70%)",
            animation: "float 6s ease-in-out infinite",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "20%",
            left: "5%",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(0,245,255,0.12) 0%, transparent 70%)",
            animation: "float 8s ease-in-out infinite reverse",
            zIndex: 0,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            right: "25%",
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(255,61,255,0.1) 0%, transparent 70%)",
            animation: "float 7s ease-in-out infinite 2s",
            zIndex: 0,
          }}
        />

        <div style={{ position: "relative", zIndex: 1, padding: "80px 64px", width: "100%", maxWidth: 1300, margin: "0 auto" }}>
          <div className="hero-split" style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: 80, alignItems: "center" }}>
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(0,245,255,0.08)",
                  border: "1px solid rgba(0,245,255,0.2)",
                  borderRadius: 100,
                  padding: "6px 16px",
                  marginBottom: 32,
                  backdropFilter: "blur(8px)",
                }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00F5FF", animation: "pulse-glow 2s ease-in-out infinite", boxShadow: "0 0 8px #00F5FF" }} />
                <span className="mono" style={{ fontSize: 10, color: "#00F5FF", letterSpacing: "0.15em" }}>
                  SMK NEGERI 5 MALANG — EST. 2008
                </span>
              </div>

              <h1 style={{ fontFamily: "'Outfit',sans-serif", fontSize: "clamp(44px,6vw,88px)", fontWeight: 900, lineHeight: 0.95, marginBottom: 12, letterSpacing: "-0.03em" }}>
                <span style={{ display: "block", color: "#fff" }}>Pengembangan</span>
                <span
                  style={{
                    display: "block",
                    background: "linear-gradient(135deg,#00F5FF,#A855F7,#FF3DFF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "200% 200%",
                    animation: "gradient-shift 4s ease infinite",
                  }}
                >
                  Perangkat Lunak
                </span>
                <span style={{ display: "block", color: "rgba(255,255,255,0.2)", fontWeight: 300 }}>dan Gim</span>
              </h1>

              <p style={{ fontSize: 16, color: "#64748b", lineHeight: 1.85, marginBottom: 40, maxWidth: 480, marginTop: 28 }}>
                Bukan sekadar belajar koding — kami mencetak <span style={{ color: "#00F5FF" }}>builder</span> yang membangun produk nyata. Dari web app hingga game, dari server hingga perangkat IoT.
              </p>

              <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 56 }}>
                <button className="btn-main" onClick={() => document.getElementById("karya")?.scrollIntoView({ behavior: "smooth" })}>
                  LIHAT KARYA →
                </button>
                <button className="btn-outline" onClick={() => document.getElementById("kontak")?.scrollIntoView({ behavior: "smooth" })}>
                  HUBUNGI KAMI
                </button>
              </div>

              <div className="stats-row" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "rgba(255,255,255,0.04)", borderRadius: 12, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                {[
                  ["2008", "Berdiri"],
                  ["6", "Guru Ahli"],
                  ["6", "Bidang"],
                  ["16+", "Tahun"],
                ].map(([n, l], i) => (
                  <div key={l} style={{ padding: "20px 16px", textAlign: "center", background: "rgba(255,255,255,0.02)", backdropFilter: "blur(8px)" }}>
                    <p className="mono" style={{ fontSize: 28, fontWeight: 700, color: ["#00F5FF", "#FF3DFF", "#00FF88", "#FFD700"][i], lineHeight: 1, textShadow: `0 0 20px ${["#00F5FF", "#FF3DFF", "#00FF88", "#FFD700"][i]}66` }}>
                      {n}
                    </p>
                    <p className="mono" style={{ fontSize: 9, color: "#475569", letterSpacing: "0.15em", marginTop: 6 }}>
                      {l.toUpperCase()}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -20, background: "radial-gradient(ellipse, rgba(0,245,255,0.08) 0%, transparent 70%)", zIndex: 0, borderRadius: 20 }} />
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  background: "rgba(13,13,26,0.8)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(0,245,255,0.15)",
                  borderRadius: 16,
                  overflow: "hidden",
                  boxShadow: "0 0 60px rgba(0,245,255,0.1), inset 0 1px 0 rgba(255,255,255,0.05)",
                }}
              >
                <div style={{ background: "rgba(0,0,0,0.4)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["#FF5F57", "#FFBC2E", "#28C840"].map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c, opacity: 0.8 }} />
                  ))}
                  <span className="mono" style={{ fontSize: 11, color: "#475569", marginLeft: 8 }}>
                    pplg@smkn5:~
                  </span>
                  <div style={{ marginLeft: "auto", width: 8, height: 8, borderRadius: "50%", background: "#00FF88", boxShadow: "0 0 6px #00FF88", animation: "pulse-glow 2s infinite" }} />
                </div>
                <div style={{ padding: "28px 24px", minHeight: 320 }}>
                  <TypingText lines={heroLines} />
                </div>
              </div>
              <div style={{ position: "absolute", top: -16, right: -16, background: "linear-gradient(135deg,#FF3DFF,#A855F7)", borderRadius: 12, padding: "10px 16px", boxShadow: "0 0 30px rgba(255,61,255,0.4)", zIndex: 2 }}>
                <p className="mono" style={{ fontSize: 10, color: "#fff", fontWeight: 700 }}>
                  🎮 GAME DEV
                </p>
              </div>
              <div style={{ position: "absolute", bottom: -16, left: -16, background: "linear-gradient(135deg,#00FF88,#00F5FF)", borderRadius: 12, padding: "10px 16px", boxShadow: "0 0 30px rgba(0,255,136,0.4)", zIndex: 2 }}>
                <p className="mono" style={{ fontSize: 10, color: "#000", fontWeight: 700 }}>
                  📡 IoT READY
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── TENTANG ──────────────────────────────────────────────────────────── */}
      <section id="tentang" style={{ padding: "120px 64px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: "40%", height: "100%", background: "radial-gradient(ellipse at right, rgba(168,85,247,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(168,85,247,0.1)", border: "1px solid rgba(168,85,247,0.3)", borderRadius: 6, padding: "4px 12px", marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 10, color: "#A855F7", letterSpacing: "0.2em" }}>
                  // TENTANG KAMI
                </span>
              </div>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 52, fontWeight: 900, lineHeight: 1.05, marginBottom: 32, letterSpacing: "-0.02em" }}>
                <span style={{ color: "#fff" }}>Build.</span>
                <br />
                <span style={{ color: "#A855F7", textShadow: "0 0 40px rgba(168,85,247,0.5)" }}>Ship.</span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.2)" }}>Repeat.</span>
              </h2>
              <div style={{ width: 48, height: 3, background: "linear-gradient(90deg,#A855F7,#FF3DFF)", marginBottom: 32, borderRadius: 2 }} />
              <p style={{ fontSize: 15, color: "#94a3b8", lineHeight: 1.9, marginBottom: 20 }}>
                Jurusan PPLG SMKN 5 Malang berdiri sejak <span style={{ color: "#A855F7", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700 }}>2008</span>. Kami mendidik siswa untuk berpikir seperti engineer — memecahkan masalah
                nyata dengan kode yang bersih dan logika yang kuat.
              </p>
              <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.9 }}>
                Dari algoritma dasar hingga deployment production, dari pixel art game hingga sensor IoT — kurikulum kami dirancang agar lulusan langsung siap kerja atau lanjut ke perguruan tinggi teknologi terbaik.
              </p>
              <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12 }}>
                {[
                  ["2008", "Berdiri"],
                  ["2012", "Kurikulum Industri"],
                  ["2018", "Akreditasi A"],
                  ["2024", "Era Digital"],
                ].map(([y, e], i) => (
                  <div
                    key={y}
                    style={{
                      padding: "16px 20px",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.06)",
                      borderRadius: 10,
                      backdropFilter: "blur(8px)",
                      borderLeft: `3px solid ${["#00F5FF", "#A855F7", "#00FF88", "#FFD700"][i]}`,
                    }}
                  >
                    <p className="mono" style={{ fontSize: 22, fontWeight: 700, color: ["#00F5FF", "#A855F7", "#00FF88", "#FFD700"][i] }}>
                      {y}
                    </p>
                    <p className="mono" style={{ fontSize: 10, color: "#475569", marginTop: 4 }}>
                      {e}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ position: "relative" }}>
              <div style={{ position: "absolute", inset: -1, background: "linear-gradient(135deg,rgba(168,85,247,0.3),rgba(0,245,255,0.1),rgba(255,61,255,0.2))", borderRadius: 20, zIndex: 0 }} />
              <div style={{ position: "relative", zIndex: 1, background: "rgba(8,8,16,0.9)", backdropFilter: "blur(20px)", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ background: "rgba(0,0,0,0.3)", padding: "12px 20px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  {["#FF5F57", "#FFBC2E", "#28C840"].map((c, i) => (
                    <div key={i} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                  ))}
                  <span className="mono" style={{ fontSize: 11, color: "#475569", marginLeft: 8 }}>
                    about_pplg.py
                  </span>
                </div>
                <div style={{ padding: "28px 24px" }}>
                  <pre className="mono" style={{ fontSize: 13, lineHeight: 1.9, whiteSpace: "pre-wrap" }}>
                    {[
                      ["# PPLG SMKN 5 Malang\n# Est. 2008\n", "#6b7280"],
                      ["class ", "#00F5FF"],
                      ["Jurusan", "#FFD700"],
                      [":\n", "#fff"],
                      ["  nama  ", "#94a3b8"],
                      ["= ", "#fff"],
                      ['"PPLG"\n', "#00FF88"],
                      ["  tahun ", "#94a3b8"],
                      ["= ", "#fff"],
                      ["2008\n", "#FF6B35"],
                      ["  guru  ", "#94a3b8"],
                      ["= ", "#fff"],
                      ["6\n\n", "#FF3DFF"],
                      ["  keahlian ", "#94a3b8"],
                      ["= [\n", "#fff"],
                      ['    "web_dev", "database",\n    "server", "game_dev",\n    "iot", "mobile",\n', "#00FF88"],
                      ["  ]\n\n", "#fff"],
                      ["  def ", "#00F5FF"],
                      ["misi", "#FFD700"],
                      ["(self):\n", "#fff"],
                      ["    return ", "#A855F7"],
                      ['"Build. Ship. Repeat."', "#00F5FF"],
                    ].map(([text, color], i) => (
                      <span key={i} style={{ color }}>
                        {text}
                      </span>
                    ))}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GURU ─────────────────────────────────────────────────────────────── */}
      <section id="guru" style={{ padding: "100px 64px", background: "rgba(0,0,0,0.3)", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "linear-gradient(rgba(0,245,255,0.02) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.02) 1px,transparent 1px)",
            backgroundSize: "40px 40px",
            pointerEvents: "none",
          }}
        />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{ display: "inline-block", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 6, padding: "4px 12px", marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: 10, color: "#00F5FF", letterSpacing: "0.2em" }}>
              // TIM PENGAJAR
            </span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", marginBottom: 56, lineHeight: 1.05 }}>
            Guru <span style={{ color: "rgba(255,255,255,0.2)" }}>Pengajar</span>
          </h2>
          <div className="teacher-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {teachers.map((g) => (
              <div key={g.nama} className="guru-card" style={{ position: "relative", borderRadius: 20, overflow: "hidden", aspectRatio: "3/4", cursor: "default", border: `1px solid ${g.color}22` }}>
                {/* foto full cover */}
                <img
                  src={g.image}
                  alt={g.nama}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "brightness(0.75) saturate(0.85)", transition: "transform 0.5s ease, filter 0.4s ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.filter = "brightness(0.9) saturate(1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter = "brightness(0.75) saturate(0.85)";
                  }}
                />
                {/* color top bar */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${g.color}, transparent)`, zIndex: 2 }} />
                {/* gradient overlay bottom */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(transparent, rgba(0,0,0,0.92))", zIndex: 2 }} />
                {/* nama */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 3, padding: "20px 22px" }}>
                  <p className="mono" style={{ fontSize: 9, color: g.color, letterSpacing: "0.2em", marginBottom: 6 }}>
                    GURU PENGAJAR
                  </p>
                  <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.2, textShadow: `0 0 20px ${g.color}44` }}>{g.nama}</h3>
                </div>
                {/* glow corner */}
                <div style={{ position: "absolute", top: 12, right: 12, width: 10, height: 10, borderRadius: "50%", background: g.color, boxShadow: `0 0 12px ${g.color}`, zIndex: 3, opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KEAHLIAN ─────────────────────────────────────────────────────────── */}
      <section id="keahlian" style={{ padding: "100px 64px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(255,61,255,0.08)", border: "1px solid rgba(255,61,255,0.2)", borderRadius: 6, padding: "4px 12px", marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: 10, color: "#FF3DFF", letterSpacing: "0.2em" }}>
              // KURIKULUM
            </span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", marginBottom: 56, lineHeight: 1.05 }}>
            Yang <span style={{ color: "rgba(255,255,255,0.2)" }}>Dipelajari</span>
          </h2>
          <div className="skills-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>
            {skills.map((s) => (
              <div
                key={s.nama}
                className="skill-card"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "32px 28px", backdropFilter: "blur(12px)", position: "relative", overflow: "hidden" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.border = `1px solid ${s.color}44`;
                  e.currentTarget.style.boxShadow = s.glow;
                  e.currentTarget.style.background = `${s.color}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.border = "1px solid rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <span style={{ fontSize: 28, lineHeight: 1 }}>{s.icon}</span>
                  <span className="mono" style={{ fontSize: 28, fontWeight: 700, color: `${s.color}22` }}>
                    {"0" + (skills.indexOf(s) + 1)}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{s.nama}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.75 }}>{s.desc}</p>
                <div style={{ marginTop: 20, height: 2, background: `linear-gradient(90deg,${s.color}44,transparent)`, borderRadius: 2 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KARYA ────────────────────────────────────────────────────────────── */}
      <section id="karya" style={{ padding: "100px 64px", background: "rgba(0,0,0,0.3)", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.2)", borderRadius: 6, padding: "4px 12px", marginBottom: 20 }}>
                <span className="mono" style={{ fontSize: 10, color: "#00FF88", letterSpacing: "0.2em" }}>
                  // PORTFOLIO
                </span>
              </div>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", lineHeight: 1.05 }}>
                Karya <span style={{ color: "rgba(255,255,255,0.2)" }}>Siswa</span>
              </h2>
            </div>
            <p className="mono" style={{ fontSize: 11, color: "#475569", maxWidth: 260, lineHeight: 1.8 }}>
              {"// hover kartu untuk detail\n// proyek & tech stack"}
            </p>
          </div>
          {/* Row 1: 1 kartu landscape penuh */}
          <div style={{ marginBottom: 3 }}>
            <KaryaCard k={karya[0]} height={420} />
          </div>
          {/* Row 2: 2 kartu landscape sejajar */}
          <div className="karya-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
            <KaryaCard k={karya[1]} height={320} />
            <KaryaCard k={karya[2]} height={320} />
          </div>
        </div>
      </section>

      {/* ── FASILITAS ────────────────────────────────────────────────────────── */}
      <section id="fasilitas" style={{ padding: "100px 64px", position: "relative" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "inline-block", background: "rgba(255,215,0,0.08)", border: "1px solid rgba(255,215,0,0.2)", borderRadius: 6, padding: "4px 12px", marginBottom: 20 }}>
            <span className="mono" style={{ fontSize: 10, color: "#FFD700", letterSpacing: "0.2em" }}>
              // SARANA & PRASARANA
            </span>
          </div>
          <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 52, fontWeight: 900, color: "#fff", marginBottom: 56, lineHeight: 1.05 }}>
            Fasilitas <span style={{ color: "rgba(255,255,255,0.2)" }}>Kami</span>
          </h2>
          <div className="fasilitas-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 16 }}>
            {fasilitas.map((f) => (
              <div
                key={f.nama}
                className="fasilitas-card"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: "32px 28px", backdropFilter: "blur(12px)", borderLeft: `3px solid ${f.color}66` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderLeftColor = f.color;
                  e.currentTarget.style.boxShadow = `0 0 30px ${f.color}15`;
                  e.currentTarget.style.background = `${f.color}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderLeftColor = `${f.color}66`;
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <span className="mono" style={{ fontSize: 11, color: "#475569" }}>
                    _{f.no}
                  </span>
                  <span className="mono" style={{ fontSize: 28, fontWeight: 700, color: `${f.color}22` }}>
                    {f.no}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 17, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{f.nama}</h3>
                <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── KONTAK ───────────────────────────────────────────────────────────── */}
      <section id="kontak" style={{ padding: "100px 64px", background: "rgba(0,0,0,0.4)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)", width: 600, height: 300, background: "radial-gradient(ellipse, rgba(0,245,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <div style={{ display: "inline-block", background: "rgba(0,245,255,0.08)", border: "1px solid rgba(0,245,255,0.2)", borderRadius: 6, padding: "4px 12px", marginBottom: 24 }}>
                <span className="mono" style={{ fontSize: 10, color: "#00F5FF", letterSpacing: "0.2em" }}>
                  // BERGABUNGLAH
                </span>
              </div>
              <h2 style={{ fontFamily: "'Outfit',sans-serif", fontSize: 48, fontWeight: 900, lineHeight: 1.1, marginBottom: 20 }}>
                <span style={{ color: "#fff" }}>Siap jadi</span>
                <br />
                <span style={{ color: "rgba(255,255,255,0.3)" }}>bagian dari </span>
                <span style={{ color: "#00F5FF", textShadow: "0 0 30px rgba(0,245,255,0.5)" }}>PPLG?</span>
              </h2>
              <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.9, marginBottom: 40 }}>Hubungi kami untuk informasi pendaftaran, kunjungan lab, atau pertanyaan seputar jurusan PPLG SMKN 5 Malang.</p>
              {kontakInfo.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start", padding: "14px 16px", background: "rgba(255,255,255,0.02)", borderRadius: 10, border: "1px solid rgba(255,255,255,0.04)" }}>
                  <div style={{ width: 2, minHeight: 36, background: `linear-gradient(${["#00F5FF", "#FF3DFF", "#00FF88", "#FFD700"][i]}, transparent)`, borderRadius: 2, flexShrink: 0 }} />
                  <div>
                    <p className="mono" style={{ fontSize: 9, letterSpacing: "0.2em", color: ["#00F5FF", "#FF3DFF", "#00FF88", "#FFD700"][i], marginBottom: 4 }}>
                      {c.label}
                    </p>
                    <p style={{ fontSize: 13, color: "#94a3b8" }}>{c.val}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                { label: "NAMA_LENGKAP", placeholder: "masukkan nama Anda", key: "nama" },
                { label: "NOMOR_HP", placeholder: "08xxxxxxxxxx", key: "hp" },
                { label: "KEPERLUAN", placeholder: "pendaftaran | kunjungan | lainnya", key: "keperluan" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="mono" style={{ fontSize: 10, color: "#475569", display: "block", marginBottom: 8, letterSpacing: "0.1em" }}>
                    <span style={{ color: "#00F5FF" }}>$ </span>
                    {f.label}
                  </label>
                  <input type="text" placeholder={f.placeholder} value={form[f.key]} onChange={(e) => setForm((p) => ({ ...p, [f.key]: e.target.value }))} className="input-field" style={{ borderRadius: 10 }} />
                </div>
              ))}
              <div>
                <label className="mono" style={{ fontSize: 10, color: "#475569", display: "block", marginBottom: 8, letterSpacing: "0.1em" }}>
                  <span style={{ color: "#00F5FF" }}>$ </span>PESAN
                </label>
                <textarea rows={4} placeholder="tulis pesan Anda..." value={form.pesan} onChange={(e) => setForm((p) => ({ ...p, pesan: e.target.value }))} className="input-field" style={{ resize: "vertical", borderRadius: 10 }} />
              </div>
              <button onClick={handleKirimWA} className="btn-main" style={{ marginTop: 8, borderRadius: 10 }}>
                KIRIM VIA WHATSAPP →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "rgba(0,0,0,0.6)",
          padding: "28px 64px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          borderTop: "1px solid rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#00F5FF,#A855F7)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(0,245,255,0.4)" }}>
            <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#000" }}>
              {"/>"}
            </span>
          </div>
          <span className="mono" style={{ fontSize: 11, color: "#334155" }}>
            PPLG — SMKN 5 MALANG
          </span>
        </div>
        <span className="mono" style={{ fontSize: 10, color: "#1e293b" }}>
          © 2026 · BUILD SOMETHING GREAT
        </span>
      </footer>
    </div>
  );
}
