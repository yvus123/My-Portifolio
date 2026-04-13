import { useEffect, useState, useRef } from 'react';

/* ─────────────────────────────────────────────
   DATA — ISHIMWE YVES
───────────────────────────────────────────── */
const NAV_LINKS = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];

const SKILLS = [
  // Frontend & Design
  { name: 'HTML5',       icon: '🌐', cat: 'design',   level: 90 },
  { name: 'CSS3',        icon: '🎨', cat: 'design',   level: 88 },
  { name: 'JavaScript',  icon: '⚡', cat: 'design',   level: 80 },
  { name: 'React',       icon: '⚛',  cat: 'design',   level: 75 },
  { name: 'Figma/UX',   icon: '✏️', cat: 'design',   level: 85 },
  { name: 'Photoshop',  icon: '🖼️', cat: 'design',   level: 82 },
  // Backend & Dev
  { name: 'Python',      icon: '🐍', cat: 'dev',      level: 72 },
  { name: 'Java',        icon: '☕', cat: 'dev',      level: 68 },
  { name: 'Node.js',     icon: '🟢', cat: 'dev',      level: 70 },
  { name: 'REST APIs',   icon: '🔌', cat: 'dev',      level: 75 },
  { name: 'MySQL',       icon: '🗄️', cat: 'dev',      level: 78 },
  { name: 'Django',      icon: '🏗️', cat: 'dev',      level: 65 },
  // IT & Systems
  { name: 'Networking',  icon: '🌐', cat: 'it',       level: 80 },
  { name: 'CCTV / IoT',  icon: '📷', cat: 'it',       level: 85 },
  { name: 'Hardware',    icon: '🔧', cat: 'it',       level: 88 },
  { name: 'MS Office',   icon: '📊', cat: 'it',       level: 90 },
  { name: 'Video Edit',  icon: '🎬', cat: 'it',       level: 78 },
  { name: 'Data Mgmt',   icon: '📋', cat: 'it',       level: 83 },
];

const SKILL_CATS = [
  { key: 'all',    label: 'All Skills' },
  { key: 'design', label: 'Design & Frontend' },
  { key: 'dev',    label: 'Backend & Dev' },
  { key: 'it',     label: 'IT & Systems' },
];

const PROJECTS = [
  {
    title: 'Digital Literacy Training Platform',
    emoji: '📡',
    tags: ['Community Tech', 'ICT Awareness', 'Rswitch Ltd'],
    desc: 'Led community sessions on digital literacy, online government services, and digital payment systems for Rwandan citizens under Rswitch Ltd — reaching dozens of participants.',
    gradient: 'from-teal-400 to-cyan-600',
    year: '2025',
  },
  {
    title: 'CCTV & Smart Security Setup',
    emoji: '🔒',
    tags: ['CCTV', 'IoT', 'Networking'],
    desc: 'Installed and configured CCTV surveillance systems and networking infrastructure during internship at Kigali Vision Technology — ensuring secure, reliable coverage.',
    gradient: 'from-slate-600 to-teal-700',
    year: '2024',
  },
  {
    title: 'Bizi Homes Booking System',
    emoji: '🏠',
    tags: ['Web App', 'Property Tech', 'Management'],
    desc: 'Managed real-time room bookings through a web platform — handling client negotiations, price approvals, and reservation coordination for Bizi Homes company.',
    gradient: 'from-amber-500 to-orange-600',
    year: '2024–2025',
  },
  {
    title: 'Content Moderation Dashboard',
    emoji: '🛡️',
    tags: ['Data Moderation', 'ISON Co.', 'Content QA'],
    desc: 'Reviewing, flagging, and moderating user-generated content at ISON Company — maintaining platform integrity through systematic quality-control workflows.',
    gradient: 'from-violet-500 to-purple-700',
    year: '2025–Now',
  },
  {
    title: 'Brand Identity & Graphic Design',
    emoji: '🎨',
    tags: ['UI/UX', 'Solvit Africa', 'Adobe PS'],
    desc: 'Completed a 3-month UX/UI and Graphic Design intensive at Solvit Africa — producing wireframes, prototypes, high-fidelity mockups, and brand identity assets.',
    gradient: 'from-pink-500 to-rose-600',
    year: '2024',
  },
  {
    title: 'TJP Media Content Hub',
    emoji: '📰',
    tags: ['Data', 'TJPtrend.com', 'Editorial'],
    desc: 'Served as Data Moderator at TJP Media — curating and managing editorial content on TJPtrend.com with accuracy, consistency, and alignment to brand standards.',
    gradient: 'from-blue-500 to-indigo-700',
    year: '2023–2024',
  },
];

const EXPERIENCES = [
  {
    tab: 'ISON Company',
    role: 'Data Moderator',
    org: 'ISON Company — Kigali, Rwanda',
    period: '2025 – Present',
    badge: 'Current',
    items: [
      'Review and moderate user-generated content to ensure compliance with platform standards.',
      'Flag, escalate, and resolve content policy violations in a timely and accurate manner.',
      'Maintain data quality and content classification consistency across workflows.',
      'Collaborate with team leads to implement and improve moderation best practices.',
    ],
  },
  {
    tab: 'Rswitch Ltd',
    role: 'IT Awareness & Digital Skills Trainee',
    org: 'Rswitch Ltd — Kigali, Rwanda',
    period: '2025',
    badge: null,
    items: [
      'Conducted community training sessions on digital literacy and ICT adoption.',
      'Promoted awareness of online government services and digital payment systems.',
      'Strengthened communication and public engagement skills.',
      'Supervised by Mr. Eric Sebasore, Rswitch Ltd.',
    ],
  },
  {
    tab: 'Bizi Homes',
    role: 'Property & Bookings Manager',
    org: 'Bizi Homes — Kigali, Rwanda',
    period: '2024 – 2025',
    badge: null,
    items: [
      'Managed room bookings through the company web platform.',
      'Handled client negotiations on pricing and confirmed reservations upon approval.',
      'Ensured smooth coordination between clients and management teams.',
    ],
  },
  {
    tab: 'Kigali Vision',
    role: 'IT Technician Intern',
    org: 'Kigali Vision Technology — Kigali, Rwanda',
    period: '2024',
    badge: null,
    items: [
      'Assisted in the installation and maintenance of CCTV and networking systems.',
      'Attended professional training in studio setup, customer service, and IT troubleshooting.',
      'Contributed to software development tasks under senior technician guidance.',
    ],
  },
  {
    tab: 'Solvit Africa',
    role: 'UX/UI & Graphic Design Trainee',
    org: 'Solvit Africa — Kigali, Rwanda',
    period: '2024 (3 Months)',
    badge: 'Certified',
    items: [
      'Completed 3-month intensive in UX/UI design and graphic design principles.',
      'Produced wireframes, prototypes, and high-fidelity mockups using industry tools.',
      'Applied typography, colour theory, layout, and brand identity techniques.',
      'Delivered real-world design projects in a collaborative studio environment.',
    ],
  },
  {
    tab: 'Radio Maria',
    role: 'Youth Volunteer IT Technician',
    org: 'Radio Maria Rwanda — Kigali, Rwanda',
    period: '2022 – 2023',
    badge: null,
    items: [
      'Maintained studio equipment and IT infrastructure for live broadcasts.',
      'Provided technical assistance ensuring uninterrupted radio operations.',
      'Completed intensive training in Networking, CCTV, Studio Ops, and Customer Care.',
    ],
  },
];

/* ─────────────────────────────────────────────
   HOOKS & HELPERS
───────────────────────────────────────────── */
function useScrollSpy() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const onScroll = () => {
      for (const id of [...NAV_LINKS].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return active;
}

function useInView(ref) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setSeen(true); }, { threshold: 0.15 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return seen;
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }) {
  const ref = useRef(null);
  const seen = useInView(ref);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: seen ? 1 : 0,
        transform: seen ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ text }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      background: 'rgba(13,124,124,0.10)', color: '#0D7C7C',
      fontSize: 11, fontWeight: 700, letterSpacing: '0.12em',
      textTransform: 'uppercase', padding: '6px 16px', borderRadius: 999,
      border: '1px solid rgba(13,124,124,0.25)', marginBottom: 14,
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#0D7C7C', display: 'inline-block' }} />
      {text}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────────── */
const Home = () => {
  const [dark, setDark]           = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [skillCat, setSkillCat]   = useState('all');
  const [activeExp, setActiveExp] = useState(0);
  const [typedText, setTypedText] = useState('');
  const activeSection             = useScrollSpy();

  // Typewriter
  const ROLES = ['IT Technician', 'UI/UX Designer', 'Data Moderator', 'Software Developer', 'Digital Skills Trainer'];
  const roleIdx  = useRef(0);
  const charIdx  = useRef(0);
  const deleting = useRef(false);
  useEffect(() => {
    const tick = () => {
      const word = ROLES[roleIdx.current];
      if (!deleting.current) {
        setTypedText(word.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === word.length) { deleting.current = true; return 1800; }
      } else {
        setTypedText(word.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; roleIdx.current = (roleIdx.current + 1) % ROLES.length; return 400; }
      }
      return deleting.current ? 60 : 90;
    };
    let timeout;
    const loop = () => { const delay = tick(); timeout = setTimeout(loop, delay); };
    timeout = setTimeout(loop, 500);
    return () => clearTimeout(timeout);
  }, []);

  const filteredSkills = skillCat === 'all' ? SKILLS : SKILLS.filter(s => s.cat === skillCat);

  // CSS variables via style tag
  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
    :root {
      --teal:   #0D7C7C;
      --teal2:  #0FA8A8;
      --accent: #14E8C0;
      --bg:     #F8FAFA;
      --bg2:    #EEF4F4;
      --card:   #FFFFFF;
      --text:   #0F1F1F;
      --sub:    #4A6060;
      --border: rgba(13,124,124,0.14);
      --nav-bg: rgba(248,250,250,0.88);
    }
    .dark-mode {
      --bg:     #080F0F;
      --bg2:    #0D1A1A;
      --card:   #0F2020;
      --text:   #D6EFEF;
      --sub:    #7AABAB;
      --border: rgba(20,232,192,0.12);
      --nav-bg: rgba(8,15,15,0.92);
    }
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'DM Sans', sans-serif; }
    .syne { font-family: 'Syne', sans-serif; }
    ::selection { background: var(--teal); color: #fff; }
    html { scroll-behavior: smooth; }

    /* scrollbar */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--teal); border-radius: 4px; }

    /* cursor ring */
    .cursor-ring {
      position: fixed; width: 28px; height: 28px; border: 2px solid var(--teal);
      border-radius: 50%; pointer-events: none; z-index: 9999;
      transition: transform 0.08s ease, border-color 0.2s;
      transform: translate(-50%, -50%);
    }

    /* nav link underline */
    .nav-link { position: relative; }
    .nav-link::after {
      content: ''; position: absolute; bottom: -3px; left: 0;
      width: 0; height: 2px; background: var(--teal); border-radius: 2px;
      transition: width 0.3s ease;
    }
    .nav-link.active::after, .nav-link:hover::after { width: 100%; }

    /* skill bar animation */
    @keyframes fillBar { from { width: 0 } }

    /* float chips */
    @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
    @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }

    /* gradient text */
    .grad-text {
      background: linear-gradient(135deg, var(--teal), var(--accent));
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    }

    /* card hover */
    .proj-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }
    .proj-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(13,124,124,0.18); }

    /* exp tab */
    .exp-tab { transition: all 0.2s ease; }
    .exp-tab:hover { background: rgba(13,124,124,0.08); }

    /* hero blob */
    @keyframes blobPulse {
      0%,100%{border-radius:60% 40% 30% 70%/60% 30% 70% 40%}
      50%{border-radius:30% 60% 70% 40%/50% 60% 30% 60%}
    }

    /* noise overlay */
    .noise::after {
      content:''; position:absolute; inset:0; pointer-events:none;
      background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
      border-radius: inherit;
    }
  `;

  return (
    <div
      className={dark ? 'dark-mode' : ''}
      style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", transition: 'background 0.4s, color 0.4s' }}
    >
      <style>{css}</style>

      {/* ── NAV ──────────────────────────────── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: 'var(--nav-bg)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)',
        padding: '0 32px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div className="syne" style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.5px' }}>
          <span className="grad-text">IY</span>
          <span style={{ color: 'var(--text)', opacity: 0.4 }}>.</span>
        </div>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 36, listStyle: 'none', alignItems: 'center' }} className="hide-mobile">
          {NAV_LINKS.map(id => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`nav-link${activeSection === id ? ' active' : ''}`}
                style={{
                  color: activeSection === id ? 'var(--teal)' : 'var(--sub)',
                  textDecoration: 'none', fontSize: 14, fontWeight: 500,
                  textTransform: 'capitalize', transition: 'color 0.2s',
                }}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>

        {/* Right controls */}
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button
            onClick={() => setDark(!dark)}
            style={{
              background: 'var(--bg2)', border: '1px solid var(--border)',
              color: 'var(--sub)', borderRadius: 999,
              padding: '6px 16px', fontSize: 12, cursor: 'pointer', fontWeight: 500,
            }}
          >
            {dark ? '☀ Light' : '🌙 Dark'}
          </button>
          <a
            href="ISHIMWE_YVES_CV.pdf"
            download
            style={{
              background: 'var(--teal)', color: '#fff',
              padding: '8px 20px', borderRadius: 10, fontSize: 13,
              fontWeight: 600, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 6,
            }}
          >
            ↓ CV
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text)', display: 'none' }}
            className="show-mobile"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'fixed', top: 64, left: 0, right: 0, zIndex: 99,
          background: 'var(--bg)', borderBottom: '1px solid var(--border)',
          padding: '16px 0',
        }}>
          {NAV_LINKS.map(id => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'block', padding: '12px 32px',
                color: 'var(--text)', textDecoration: 'none',
                fontSize: 15, textTransform: 'capitalize',
                borderLeft: activeSection === id ? '3px solid var(--teal)' : '3px solid transparent',
              }}
            >
              {id}
            </a>
          ))}
        </div>
      )}

      {/* ── HERO ─────────────────────────────── */}
      <section id="home" style={{ minHeight: '92vh', display: 'flex', alignItems: 'center', padding: '80px 32px 60px', position: 'relative', overflow: 'hidden' }}>
        {/* bg blob */}
        <div style={{
          position: 'absolute', top: -100, right: -120, width: 600, height: 600,
          background: 'radial-gradient(circle, rgba(13,124,124,0.12) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -60, left: -80, width: 400, height: 400,
          background: 'radial-gradient(circle, rgba(20,232,192,0.08) 0%, transparent 70%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', width: '100%', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 60 }}>
          {/* Text */}
          <div style={{ flex: '1 1 400px' }}>
            {/* Available badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(20,232,192,0.10)', border: '1px solid rgba(20,232,192,0.3)',
              color: 'var(--teal)', padding: '6px 16px', borderRadius: 999,
              fontSize: 12, fontWeight: 600, marginBottom: 28,
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#14E8C0', display: 'inline-block', animation: 'floatA 2s infinite' }} />
              Available for opportunities
            </div>

            <div className="syne" style={{ fontSize: 'clamp(40px, 6vw, 72px)', fontWeight: 800, lineHeight: 1.05, marginBottom: 16, letterSpacing: '-1px' }}>
              Hi, I'm<br />
              <span className="grad-text">ISHIMWE</span><br />
              <span style={{ color: 'var(--text)' }}>Yves</span>
            </div>

            {/* Typewriter */}
            <div style={{ height: 36, marginBottom: 24 }}>
              <span style={{ color: 'var(--teal)', fontWeight: 600, fontSize: 20 }}>
                {typedText}
                <span style={{ borderRight: '2px solid var(--teal)', marginLeft: 2, animation: 'floatA 1s step-end infinite' }} />
              </span>
            </div>

            <p style={{ color: 'var(--sub)', fontSize: 16, lineHeight: 1.8, maxWidth: 520, marginBottom: 36 }}>
              A passionate IT professional from <strong style={{ color: 'var(--text)' }}>Kigali, Rwanda</strong> — blending software development, UI/UX design, digital literacy training, and hands-on IT infrastructure work to create real-world impact.
            </p>

            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
              <a href="#projects" style={{
                background: 'var(--teal)', color: '#fff',
                padding: '13px 28px', borderRadius: 12, fontWeight: 700,
                textDecoration: 'none', fontSize: 14, display: 'flex', alignItems: 'center', gap: 8,
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(13,124,124,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                View My Work →
              </a>
              <a href="#contact" style={{
                background: 'transparent', color: 'var(--teal)',
                padding: '13px 28px', borderRadius: 12, fontWeight: 700,
                textDecoration: 'none', fontSize: 14,
                border: '2px solid var(--teal)',
                transition: 'background 0.2s, color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--teal)'; e.currentTarget.style.color = '#fff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--teal)'; }}
              >
                Contact Me ✉
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: 40 }}>
              {[['3+', 'Years Experience'], ['6+', 'Roles & Internships'], ['3', 'Design Certifications']].map(([n, l]) => (
                <div key={l} style={{ textAlign: 'center' }}>
                  <div className="syne" style={{ fontSize: 28, fontWeight: 800, color: 'var(--teal)' }}>{n}</div>
                  <div style={{ fontSize: 11, color: 'var(--sub)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avatar area */}
          <div style={{ flex: '0 0 340px', position: 'relative', display: 'flex', justifyContent: 'center' }}>
            {/* Morphing blob background */}
            <div style={{
              position: 'absolute', inset: -20,
              background: 'linear-gradient(135deg, rgba(13,124,124,0.15), rgba(20,232,192,0.08))',
              animation: 'blobPulse 8s ease-in-out infinite',
              zIndex: 0,
            }} />
            {/* Avatar circle */}
            <div style={{
              width: 280, height: 280, borderRadius: '50%',
            //   background: 'linear-gradient(135deg, var(--teal), var(--accent))',
            //   backgroundImg: url('yves.png'),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 96, zIndex: 1, position: 'relative',
              boxShadow: '0 30px 80px rgba(13,124,124,0.3)',
              border: '4px solid rgba(255,255,255,0.15)',
            }} className='bg-[url("/yves.png")] bg-cover object-cover'>
              {/* <img src="/yves.png" alt="" /> */}
            </div>
            {/* Floating chips */}
            {[
              { label: 'UI/UX', color: '#FF6B6B', style: { top: 10, left: -20, animation: 'floatA 3s ease-in-out infinite' } },
              { label: 'React', color: '#61DAFB', style: { top: 30, right: -20, animation: 'floatB 3.5s ease-in-out infinite' } },
              { label: 'CCTV', color: '#FFB347', style: { bottom: 40, left: -30, animation: 'floatC 4s ease-in-out infinite' } },
              { label: 'Python', color: '#4CAF50', style: { bottom: 20, right: -10, animation: 'floatA 2.8s ease-in-out infinite' } },
            ].map(c => (
              <div key={c.label} style={{
                position: 'absolute', ...c.style,
                background: 'var(--card)', border: '1px solid var(--border)',
                borderRadius: 999, padding: '6px 14px',
                fontSize: 12, fontWeight: 600, color: 'var(--text)',
                display: 'flex', alignItems: 'center', gap: 6, zIndex: 2,
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, display: 'inline-block' }} />
                {c.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BANNER STRIP ─────────────────────── */}
      <div style={{ background: 'var(--teal)', padding: '24px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'space-around', textAlign: 'center' }}>
          {[['Software Dev', 'HTML · CSS · JS · React · Python'], ['UI/UX Design', 'Figma · Photoshop · Prototyping'], ['IT Systems', 'CCTV · Networks · Hardware'], ["Rwanda '25", 'Advanced Diploma — ICT']].map(([n, l]) => (
            <div key={n}>
              <div className="syne" style={{ color: '#fff', fontSize: 18, fontWeight: 700 }}>{n}</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT ────────────────────────────── */}
      <section id="about" style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: 60, alignItems: 'flex-start' }}>
          <FadeIn style={{ flex: '1 1 380px' }}>
            <SectionLabel text="About Me" />
            <h2 className="syne" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Get to know<br /><span className="grad-text">who I am</span>
            </h2>
            <p style={{ color: 'var(--sub)', lineHeight: 1.85, marginBottom: 16, fontSize: 15 }}>
              I'm <strong style={{ color: 'var(--text)' }}>ISHIMWE Yves</strong> — an IT professional and creative technologist based in Kigali, Rwanda. I hold an Advanced Diploma in Information and Communication Technology (Second Class Upper Division) from Rwanda Polytechnic, with hands-on experience spanning software development, UI/UX design, CCTV installation, data moderation, and community digital skills training.
            </p>
            <p style={{ color: 'var(--sub)', lineHeight: 1.85, fontSize: 15, marginBottom: 28 }}>
              I'm driven by the belief that <em style={{ color: 'var(--teal)' }}>technology should serve people</em>. Whether I'm building interfaces, moderating content, or training communities, I bring precision, curiosity, and purpose to every project.
            </p>

            {/* Info grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {[
                { icon: '📍', label: 'Location', val: 'Kigali, Rwanda' },
                { icon: '✉', label: 'Email', val: 'ishimweeyve@gmail.com' },
                { icon: '📞', label: 'Phone', val: '+250 792 039 277' },
                { icon: '✅', label: 'Status', val: '● Open to Work', green: true },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)',
                  borderRadius: 14, padding: '14px 16px',
                }}>
                  <div style={{ color: 'var(--sub)', fontSize: 11, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{item.icon} {item.label}</div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: item.green ? '#14E8C0' : 'var(--text)' }}>{item.val}</div>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150} style={{ flex: '1 1 380px' }}>
            <SectionLabel text="Education" />
            <h2 className="syne" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, marginBottom: 20, letterSpacing: '-0.5px', lineHeight: 1.1 }}>
              Academic<br /><span className="grad-text">Background</span>
            </h2>

            {/* Education cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
              {[
                {
                  title: 'Advanced Diploma in ICT — Information Technology',
                  school: 'College Ngoma, Ngoma District',
                  detail: 'Second Class Upper Division · Certificate No. 20531',
                  years: '2021 – 2024',
                  featured: true,
                },
                {
                  title: 'A2 Certificate in ICT (Software Development)',
                  school: 'Groupe Scolaire Bumba, Rutsiro District',
                  detail: null,
                  years: '2018 – 2021',
                  featured: false,
                },
              ].map(e => (
                <div key={e.title} style={{
                  background: 'var(--card)', border: `1px solid ${e.featured ? 'var(--teal)' : 'var(--border)'}`,
                  borderLeft: `4px solid ${e.featured ? 'var(--teal)' : 'var(--border)'}`,
                  borderRadius: 14, padding: '18px 20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--text)', marginBottom: 4 }}>{e.title}</div>
                      <div style={{ color: 'var(--sub)', fontSize: 13 }}>🎓 {e.school}</div>
                      {e.detail && <div style={{ color: 'var(--teal)', fontSize: 12, marginTop: 4, fontWeight: 600 }}>{e.detail}</div>}
                    </div>
                    <span style={{ background: 'var(--bg2)', color: 'var(--sub)', borderRadius: 999, padding: '4px 12px', fontSize: 11, whiteSpace: 'nowrap' }}>{e.years}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Languages */}
            <div>
              <p style={{ fontSize: 11, color: 'var(--sub)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>Languages</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {[['🇷🇼', 'Kinyarwanda', 'Native'], ['🇬🇧', 'English', 'Proficient']].map(([f, l, lvl]) => (
                  <span key={l} style={{
                    background: 'rgba(13,124,124,0.10)', border: '1px solid var(--border)',
                    color: 'var(--teal)', borderRadius: 999,
                    padding: '6px 14px', fontSize: 12, fontWeight: 500,
                  }}>
                    {f} {l} <span style={{ opacity: 0.6 }}>— {lvl}</span>
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── SKILLS ───────────────────────────── */}
      <section id="skills" style={{ padding: '100px 32px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ textAlign: 'center', marginBottom: 56 }}>
            <SectionLabel text="Tech Stack" />
            <h2 className="syne" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Skills & <span className="grad-text">Technologies</span>
            </h2>
          </FadeIn>

          {/* Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 48 }}>
            {SKILL_CATS.map(c => (
              <button
                key={c.key}
                onClick={() => setSkillCat(c.key)}
                style={{
                  padding: '8px 20px', borderRadius: 999, fontSize: 13, cursor: 'pointer', fontWeight: 600,
                  border: `2px solid ${skillCat === c.key ? 'var(--teal)' : 'var(--border)'}`,
                  background: skillCat === c.key ? 'var(--teal)' : 'var(--card)',
                  color: skillCat === c.key ? '#fff' : 'var(--sub)',
                  transition: 'all 0.2s',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Skill cards with bars */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {filteredSkills.map((s, i) => (
              <FadeIn key={s.name} delay={i * 40}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 16,
                  padding: '20px', transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-3px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 22 }}>{s.icon}</span>
                      <span style={{ fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                    </div>
                    <span style={{ color: 'var(--teal)', fontWeight: 700, fontSize: 13 }}>{s.level}%</span>
                  </div>
                  <div style={{ background: 'var(--bg2)', borderRadius: 999, height: 6, overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', borderRadius: 999,
                      background: 'linear-gradient(90deg, var(--teal), var(--accent))',
                      width: `${s.level}%`,
                      animation: 'fillBar 1.2s ease forwards',
                    }} />
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ─────────────────────────── */}
      <section id="projects" style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ marginBottom: 56 }}>
            <SectionLabel text="Portfolio" />
            <h2 className="syne" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.5px', marginBottom: 12 }}>
              Things I've <span className="grad-text">Worked On</span>
            </h2>
            <p style={{ color: 'var(--sub)', maxWidth: 520, lineHeight: 1.7 }}>
              A selection of real-world work — from community ICT programmes to content moderation, property tech, and UI/UX design projects.
            </p>
          </FadeIn>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={i * 80}>
                <div className="proj-card" style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 20, overflow: 'hidden',
                  display: 'flex', flexDirection: 'column',
                }}>
                  {/* Card header */}
                  <div style={{
                    height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(135deg, ${p.gradient.replace('from-', '').replace(' to-', ', ').replace(/teal-400/,'#2dd4bf').replace(/cyan-600/,'#0891b2').replace(/slate-600/,'#475569').replace(/teal-700/,'#0f766e').replace(/amber-500/,'#f59e0b').replace(/orange-600/,'#ea580c').replace(/violet-500/,'#8b5cf6').replace(/purple-700/,'#7e22ce').replace(/pink-500/,'#ec4899').replace(/rose-600/,'#e11d48').replace(/blue-500/,'#3b82f6').replace(/indigo-700/,'#4338ca')})`,
                    fontSize: 56, position: 'relative',
                  }}>
                    <span>{p.emoji}</span>
                    <span style={{
                      position: 'absolute', top: 12, right: 14,
                      background: 'rgba(0,0,0,0.25)', color: '#fff',
                      fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 999,
                      backdropFilter: 'blur(8px)',
                    }}>{p.year}</span>
                  </div>

                  <div style={{ padding: '20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    {/* Tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 12 }}>
                      {p.tags.map(t => (
                        <span key={t} style={{
                          background: 'rgba(13,124,124,0.10)', color: 'var(--teal)',
                          fontSize: 10, fontWeight: 700, padding: '3px 10px',
                          borderRadius: 999, textTransform: 'uppercase', letterSpacing: '0.06em',
                        }}>{t}</span>
                      ))}
                    </div>
                    <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 8, color: 'var(--text)' }}>{p.title}</h3>
                    <p style={{ color: 'var(--sub)', fontSize: 13, lineHeight: 1.7, flex: 1 }}>{p.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ───────────────────────── */}
      <section id="experience" style={{ padding: '100px 32px', background: 'var(--bg2)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <FadeIn style={{ marginBottom: 56 }}>
            <SectionLabel text="Career" />
            <h2 className="syne" style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, letterSpacing: '-0.5px' }}>
              Work <span className="grad-text">Experience</span>
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {/* Tabs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 180 }}>
              {EXPERIENCES.map((exp, i) => (
                <button
                  key={exp.tab}
                  onClick={() => setActiveExp(i)}
                  className="exp-tab"
                  style={{
                    textAlign: 'left', padding: '12px 18px', borderRadius: 12,
                    background: activeExp === i ? 'var(--teal)' : 'transparent',
                    color: activeExp === i ? '#fff' : 'var(--sub)',
                    fontWeight: activeExp === i ? 700 : 500,
                    border: `1px solid ${activeExp === i ? 'var(--teal)' : 'var(--border)'}`,
                    cursor: 'pointer', fontSize: 13, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8,
                  }}
                >
                  {exp.tab}
                  {exp.badge && (
                    <span style={{
                      background: activeExp === i ? 'rgba(255,255,255,0.25)' : 'var(--teal)',
                      color: activeExp === i ? '#fff' : '#fff',
                      fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 999,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>{exp.badge}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Panel */}
            <div style={{ flex: 1, minWidth: 280 }}>
              <FadeIn key={activeExp}>
                <div style={{
                  background: 'var(--card)', border: '1px solid var(--border)',
                  borderRadius: 20, padding: '32px',
                }}>
                  <div style={{ marginBottom: 20 }}>
                    <h3 className="syne" style={{ fontSize: 22, fontWeight: 800, color: 'var(--text)', marginBottom: 6 }}>{EXPERIENCES[activeExp].role}</h3>
                    <p style={{ color: 'var(--sub)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 6 }}>
                      💼 {EXPERIENCES[activeExp].org}
                    </p>
                    <p style={{ color: 'var(--teal)', fontSize: 12, fontWeight: 600, marginTop: 4 }}>📅 {EXPERIENCES[activeExp].period}</p>
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {EXPERIENCES[activeExp].items.map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, color: 'var(--sub)', fontSize: 14, lineHeight: 1.7 }}>
                        <span style={{ color: 'var(--teal)', fontWeight: 700, marginTop: 2, flexShrink: 0 }}>▸</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────── */}
      <section id="contact" style={{ padding: '100px 32px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <FadeIn>
            <SectionLabel text="Get In Touch" />
            <h2 className="syne" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: 16, lineHeight: 1.1 }}>
              Let's <span className="grad-text">Build Something</span><br />Together
            </h2>
            <p style={{ color: 'var(--sub)', fontSize: 16, maxWidth: 480, margin: '0 auto 56px', lineHeight: 1.75 }}>
              Whether it's a project, collaboration, or just a conversation about tech — I'm always happy to connect.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 48 }}>
              {[
                { icon: '✉', label: 'Email', val: 'ishimweeyve@gmail.com' },
                { icon: '📞', label: 'Phone', val: '+250 792 039 277' },
                { icon: '📍', label: 'Location', val: 'Kigali, Rwanda 🇷🇼' },
                { icon: '💼', label: 'Status', val: 'Open to Opportunities' },
              ].map(item => (
                <div key={item.label} style={{
                  background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16,
                  padding: '24px 20px', transition: 'border-color 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--teal)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
                >
                  <div style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</div>
                  <div style={{ color: 'var(--sub)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>{item.label}</div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: 'var(--text)' }}>{item.val}</div>
                </div>
              ))}
            </div>

            {/* CTA button */}
            <a
              href="mailto:ishimweeyve@gmail.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--teal)', color: '#fff',
                padding: '16px 40px', borderRadius: 14, fontSize: 16, fontWeight: 700,
                textDecoration: 'none', transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(13,124,124,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              ✉ Say Hello
            </a>
          </FadeIn>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────── */}
      <footer style={{
        textAlign: 'center', padding: '40px 32px',
        borderTop: '1px solid var(--border)',
        color: 'var(--sub)', fontSize: 13,
      }}>
        <div className="syne" style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
          <span className="grad-text">ISHIMWE</span> Yves
        </div>
        <p style={{ opacity: 0.6, marginBottom: 4 }}>IT Technician · UI/UX Designer · Software Developer</p>
        <p style={{ opacity: 0.4, fontSize: 11 }}>© {new Date().getFullYear()} · Kigali, Rwanda 🇷🇼 · Advanced Diploma in ICT</p>
      </footer>

      {/* Responsive helper */}
      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Home;
