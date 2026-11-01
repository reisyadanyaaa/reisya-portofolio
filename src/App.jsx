import { useEffect, useRef, useState } from 'react';
import './index.css';

const ASSET = '/assets/';
const SOCIAL = {
  instagram: 'https://www.instagram.com/reisyaaadt/',
  github: 'https://github.com/reisyadanyaaa',
  email: 'mailto:reisyadanya10@gmail.com',
  whatsapp: 'https://wa.me/6282114073372',
};

const education = [
  { years: '2017 — 2020', degree: 'Junior High School', school: 'SMP Islam Al Azhar 20 Cianjur', logo: 'logo-smp.png', desc: 'Built a foundation in academic learning, discipline, and personal development.' },
  { years: '2021 — 2024', degree: 'Natural Sciences (IPA)', school: 'SMA Negeri 1 Sukaresmi', logo: 'logo-sma.png', desc: 'Explored mathematics and natural sciences, strengthening analytical and problem-solving skills.' },
  { years: '2024 — Present', degree: 'B.Sc. Computer Engineering', school: 'Telkom University', logo: 'logo-telkom.png', desc: 'Exploring software, data analytics, embedded systems, and IoT through coursework and hands-on projects.' },
];

// EXPERIENCE: setiap kegiatan boleh memiliki beberapa foto.
// Masukkan file tambahan ke public/assets/ dengan nama yang tercantum di photos.
// Foto yang belum ada akan menampilkan placeholder (bukan gambar palsu).
const experiences = [
  {
    date: '2025 — Present', title: 'Cadre Development Division',
    place: 'Computer Engineering Student Association', category: 'Organization',
    desc: 'Contribute to student development activities and initiatives that encourage collaboration and engagement.',
    photos: ['experience-himpunan.webp', 'experience-himpunan-2.webp'],
  },
  {
    date: '2025', title: 'Liaison Officer',
    place: 'PKKMB — University Orientation', category: 'Organization',
    desc: 'Supported participant communication and coordination during the university orientation program.',
    photos: ['experience-pkkmb.webp', 'experience-pkkmb-2.webp', 'experience-pkkmb-3.webp'],
  },
  {
    date: '2026', title: 'Core Treasurer',
    place: 'Overclock — Department Orientation', category: 'Organization',
    desc: 'Supported financial planning, fund administration, and documentation for a department-level event.',
    photos: ['experience-students.webp'],
  },
  {
    date: '2026', title: 'Public Relations Staff',
    place: 'Centurion — Department Sports Competition', category: 'Organization',
    desc: 'Supported outreach and information-sharing for a sports competition within the department.',
    photos: ['experience-centurion-1.webp'],
  },
  {
    date: '2025', title: 'Study Group Participant',
    place: 'EVCON Laboratory — Telkom University', category: 'Technical',
    desc: 'Participated in collaborative study activities and discussions to expand technical understanding.',
    photos: [], // Studi EVCON tidak memiliki foto; kegiatan tetap tampil sebagai slide informasi.
  },
  {
    date: 'Various Events', title: 'Master of Ceremony',
    place: 'Event Hosting & Public Speaking', category: 'Creative',
    desc: 'Hosted events while practicing public speaking, audience engagement, and adaptability.',
    photos: ['experience-mc.webp', 'experience-mc-2.webp', 'experience-mc-3.webp'],
  },
  {
    date: '2021 — Present', title: 'Modeling Experience',
    place: 'Creative Activities', category: 'Creative',
    desc: 'Developed confidence, self-presentation, and adaptability through creative activities.',
    photos: ['experience-modeling-1.webp'],
  },
];

const skills = [
  {
    category: 'Programming',
    items: [
      { name: 'Python', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/python/python-original.svg', desc: 'Python scripts, notebooks & exploratory analysis', fallback: 'Py' },
      { name: 'C++', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/cplusplus/cplusplus-original.svg', desc: 'Programming fundamentals & logic', fallback: 'C++' },
      { name: 'MATLAB', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/matlab/matlab-original.svg', desc: 'Numerical computing & calculations', fallback: 'M' },
      { name: 'HTML', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/html5/html5-original.svg', desc: 'Web page structure & semantics', fallback: 'H' },
      { name: 'CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/css3/css3-original.svg', desc: 'Responsive layout & styling', fallback: 'CSS' },
      { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/javascript/javascript-original.svg', desc: 'Interactive website behavior', fallback: 'JS' },
    ],
  },
  {
    category: 'Data & Visualization',
    items: [
      { name: 'Pandas', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/pandas/pandas-original.svg', desc: 'Data cleaning & tabular exploration', fallback: 'Pd' },
      { name: 'Matplotlib', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/matplotlib/matplotlib-original.svg', desc: 'Charts & visual data exploration', fallback: 'Mp' },
      { name: 'Kaggle', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/kaggle/kaggle-original.svg', desc: 'Datasets, notebooks & Python learning', fallback: 'Kg' },
    ],
  },
  {
    category: 'Development Tools',
    items: [
      { name: 'VS Code', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/vscode/vscode-original.svg', desc: 'Editor for development & analysis', fallback: 'VS' },
      { name: 'GitHub', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/github/github-original.svg', desc: 'Source repositories & version control', fallback: 'GH' },
      { name: 'Figma', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/figma/figma-original.svg', desc: 'UI layouts & visual prototyping', fallback: 'Fg' },
      { name: 'MySQL', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/mysql/mysql-original.svg', desc: 'Relational database fundamentals', fallback: 'SQL' },
    ],
  },
  {
    category: 'Hardware & Networking',
    items: [
      { name: 'Arduino IDE', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/arduino/arduino-original.svg', desc: 'Microcontroller sketches & prototyping', fallback: 'Ar' },
      { name: 'Proteus', logo: 'https://www.google.com/s2/favicons?domain=labcenter.com&sz=128', desc: 'Circuit simulation & schematic design', fallback: 'Pr' },
      { name: 'Raspberry Pi', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/raspberrypi/raspberrypi-original.svg', desc: 'Hardware projects & basic computing', fallback: 'RPi' },
      { name: 'Cisco Packet Tracer', logo: 'https://commons.wikimedia.org/wiki/Special:FilePath/Icons8-cisco-packet-tracer.svg', desc: 'Network topologies & packet simulation', fallback: 'PT' },
      { name: 'LaTeX', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.17.0/icons/latex/latex-original.svg', desc: 'Structured academic & technical documents', fallback: 'TeX' },
    ],
  },
];

const certificates = [
  { title: 'EVCON Laboratory', type: 'Study Group · Certificate of Appreciation', image: 'cert-evcon.webp', year: '2025', desc: 'Recognition for participation in EVCON Laboratory study group activities at Telkom University, supporting collaborative technical learning.' },
  { title: 'Python — Kaggle', type: 'Programming Fundamentals', image: 'cert-kaggle.webp', year: '2025', desc: 'Completed the Kaggle Python course, covering programming foundations and techniques useful for data analysis.' },
  { title: 'RCNA — Ruijie', type: 'Routing & Switching', image: 'cert-rcna.webp', year: '2026', desc: 'Earned the Ruijie Certified Network Associate certification in Routing & Switching.' },
];

const projects = [
  { id: 'traffic-eda', number: '01', title: 'Traffic Flow & Occupancy Analysis', kicker: 'DATA & ANALYTICS', tags: ['Python', 'EDA', 'Visualization'], category: 'Data', image: 'eda-graph.webp', gallery: ['eda-graph.webp', 'eda-code.webp'], desc: 'Explored traffic flow and road occupancy data to identify patterns, visualize changing conditions, and investigate relationships between important traffic indicators.', detail: 'This project uses Python to explore traffic flow and road occupancy, including visual analysis of time-dependent patterns and the relationship between flow and occupancy. The EDA provides groundwork for possible forecasting models; it does not claim finalized prediction accuracy.' },
  { id: 'meloverde', number: '02', title: 'MeloVerde Greenhouse Dashboard', kicker: 'WEB · IOT CONCEPT', tags: ['React', 'Dashboard', 'IoT'], category: 'Software', image: 'meloverde.webp', gallery: ['meloverde.webp'], desc: 'Designed a smart greenhouse dashboard interface to visualize temperature, humidity, pH, and TDS for hydroponic melon cultivation.', detail: 'A React-based monitoring dashboard concept for hydroponic melon growing. It includes charts, status indicators, and navigation to architecture, history, and sensor details. Measurements shown in the frontend are simulated, not verified live hardware data.' },
  { id: 'kas-rw', number: '03', title: 'RW Cash Management Website', kicker: 'WEB DEVELOPMENT', tags: ['Web App', 'Finance', 'Community'], category: 'Software', image: 'kas-rw.webp', gallery: ['kas-rw.webp'], desc: 'Created a web-based system to organize community cash transactions and support more structured neighborhood financial records.', detail: 'A neighborhood financial record-keeping web project designed to simplify the organization of cash transactions and support administrative work at RW level. Screenshots and additional technical details can be added as documentation becomes available.' },
  { id: 'solar', number: '04', title: 'Solar-Powered Power Bank', kicker: 'HARDWARE · RENEWABLE ENERGY', tags: ['Solar Energy', 'Prototype'], category: 'Hardware', image: 'solar-build.webp', gallery: ['solar-build.webp', 'solar-circuit.webp'], desc: 'Built a portable charging prototype that explores solar energy as an alternative power source.', detail: 'A hardware prototype exploring how solar energy can be converted and used for portable charging. The project involved developing and documenting a physical prototype.' },
  { id: 'water', number: '05', title: 'Water Tank Level Alert System', kicker: 'EMBEDDED SYSTEMS', tags: ['Sensors', 'Monitoring', 'Alerts'], category: 'Hardware', image: 'water-tank.webp', gallery: ['water-tank.webp', 'water-tank-2.webp'], desc: 'Developed a prototype to monitor water levels and indicate empty, full, and overflow conditions.', detail: 'A water tank level monitoring and alert system intended to help users identify water-level conditions and reduce the risk of overflow. Sensor/component details can be added once project records are confirmed.' },
  { id: 'gas', number: '06', title: 'Gas Leakage Detection System', kicker: 'SAFETY · EMBEDDED', tags: ['Gas Sensor', 'Safety', 'Prototype'], category: 'Hardware', image: 'gas-team.webp', gallery: ['gas-team.webp'], desc: 'Developed a sensor-based gas leakage detection prototype designed to provide early warnings of potentially hazardous conditions.', detail: 'A sensor-based safety prototype developed to detect signs of a potential gas leak and support early warning. Specific hardware components and test results will be described when documentation is available.' },
  { id: 'cquet', number: '07', title: 'CQUET — YOLO & Raspberry Pi', kicker: 'COMPETITION · COMPUTER VISION', tags: ['YOLO', 'Raspberry Pi', 'Teamwork'], category: 'Competition', image: 'cquet-photo.webp', gallery: ['cquet-photo.webp', 'cquet-presentation.webp'], desc: 'Participated in CQUET as part of a team exploring object detection using the YOLO algorithm and Raspberry Pi.', detail: 'A competition experience involving computer vision concepts, embedded hardware, problem-solving, and team collaboration. Individual responsibilities and verified project outcomes can be added later.' },
];

const filters = ['All', 'Software', 'Data', 'Hardware', 'Competition'];
const navItems = [
  ['Home', 'home'], ['About', 'about'], ['Experience', 'experience'],
  ['Skills', 'skills'], ['Projects', 'projects'], ['Certificates', 'certificates'], ['Contact', 'contact'],
];

function Icon({ name, size = 20, ...props }) {
  const lines = {
    arrow: <><path d="M5 12h14M12 5l7 7-7 7" /></>,
    arrowUp: <><path d="M7 17 17 7M7 7h10v10" /></>,
    chevronLeft: <path d="m15 18-6-6 6-6" />,
    chevronRight: <path d="m9 18 6-6-6-6" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
    github: <><path d="M9 19c-5 2-5-3-7-3m14 6v-3.9c0-1.1-.2-1.7-.7-2.2 2.5-.3 5.2-1.2 5.2-5.5 0-1.2-.4-2.2-1.1-3 .1-.4.5-1.7-.2-3.4 0 0-1 0-3.3 1.8A11 11 0 0 0 12 5.4a11 11 0 0 0-3.9.5C5.8 4.1 4.8 4.1 4.8 4.1c-.7 1.7-.3 3-.2 3.4-.7.8-1.1 1.8-1.1 3 0 4.3 2.7 5.2 5.2 5.5-.5.5-.7 1.1-.7 2.2V22" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></>,
    download: <><path d="M12 3v12m-5-5 5 5 5-5M5 17v4h14v-4" /></>,
    expand: <><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5" /></>,
    arrowDown: <><path d="M12 3v17m-7-7 7 7 7-7" /></>,
    graduation: <><path d="M2 10 12 5l10 5-10 5-10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5M22 10v6"/></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{lines[name] || lines.arrowUp}</svg>;
}

// Word-by-word reveal: scroll masuk => play, scroll keluar => reset.
// Menggunakan posisi viewport agar tidak terpicu terlalu awal saat parent masih tersembunyi.
function Words({ text, interval = 190, start = 0 }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const parts = String(text).trim().split(/\s+/);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    // Hormati pengaturan aksesibilitas pengguna.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    let frame = 0;
    let shown = false;
    const checkPosition = () => {
      frame = 0;
      const rect = target.getBoundingClientRect();
      const shouldShow = rect.width > 0 && rect.height > 0 &&
        rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
      if (shouldShow === shown) return;

      shown = shouldShow;
      if (shouldShow) {
        // Pastikan ancestor tidak tetap opacity:0 ketika kata mulai bergerak.
        target.closest('.reveal')?.classList.add('visible');
      }
      setInView(shouldShow);
    };

    const scheduleCheck = () => {
      if (!frame) frame = window.requestAnimationFrame(checkPosition);
    };
    window.addEventListener('scroll', scheduleCheck, { passive: true });
    window.addEventListener('resize', scheduleCheck);
    scheduleCheck();

    return () => {
      window.removeEventListener('scroll', scheduleCheck);
      window.removeEventListener('resize', scheduleCheck);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <span ref={ref} className={`words-reveal${inView ? ' is-visible' : ''}`}>
      {parts.map((word, i) => (
        <span className="word-wrapper" key={`${i}-${word}`}>
          <span className="word-piece" style={{ '--word-delay': `${(start + i) * interval}ms` }}>
            {word}
          </span>
          {i < parts.length - 1 ? ' ' : null}
        </span>
      ))}
    </span>
  );
}

function SectionTitle({ eyebrow, title, accent, desc }) {
  return <div className="section-head reveal">
    <span className="eyebrow"><i className="tiny-square" /> {eyebrow}</span>
    <h2><Words text={title} /> <em><Words text={accent} start={title.trim().split(/\s+/).length} /></em></h2>
    {desc && <p><Words text={desc} interval={100} /></p>}
  </div>;
}

// EXPERIENCE SWIPE: satu drag/swipe = satu foto.
// Setelah foto terakhir, swipe berikutnya berganti kegiatan dengan transisi penuh.
// Kategori Organization / Technical / Creative diganti dengan klik tab, tidak ikut swipe.
const EXPERIENCE_GROUPS = ['Organization', 'Technical', 'Creative'];

function ExperienceMedia({ file, title, index, total, direction }) {
  const [failed, setFailed] = useState(false);
  useEffect(() => setFailed(false), [file]);

  return (
    <div className={`exp-media exp-media--${direction}`} key={file}>
      {!failed ? (
        <img
          src={`${ASSET}${file}`}
          alt={`Dokumentasi ${title}, foto ${index + 1}`}
          draggable={false}
          onError={() => setFailed(true)}
          loading="lazy"
        />
      ) : (
        <div className="exp-photo-placeholder" aria-label={`Foto ${index + 1} belum diunggah`}>
          <Icon name="expand" size={40} />
          <strong>Tempat foto kegiatan</strong>
          <span>Tambahkan <code>{file}</code> ke public/assets</span>
        </div>
      )}
      <span className="exp-media-count">PHOTO {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
  );
}

function ExperienceSwipeShowcase() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [direction, setDirection] = useState('next');
  const [dragX, setDragX] = useState(0);
  const pointerStart = useRef(null);
  const lastWheelAt = useRef(0);

  const selectCategory = (index) => {
    if (index === categoryIndex) return;
    setCategoryIndex(index);
    setActivityIndex(0);
    setPhotoIndex(0);
    setDirection('next');
    setDragX(0);
    pointerStart.current = null;
  };

  const activities = experiences.filter(e => e.category === EXPERIENCE_GROUPS[categoryIndex]);
  const activity = activities[activityIndex];
  const images = activity.photos?.length ? activity.photos : [];

  const move = (step) => {
    const nextPhoto = photoIndex + step;
    setDirection(step > 0 ? 'next' : 'prev');

    // Geser di dalam foto-foto kegiatan yang sama.
    if (images.length && nextPhoto >= 0 && nextPhoto < images.length) {
      setPhotoIndex(nextPhoto);
      return;
    }

    const nextActivity = activityIndex + step;
    // Ketika foto habis, satu swipe berikutnya berpindah kegiatan.
    if (nextActivity >= 0 && nextActivity < activities.length) {
      setActivityIndex(nextActivity);
      setPhotoIndex(step > 0 ? 0 : Math.max(0, activities[nextActivity].photos.length - 1));
      return;
    }

    // Sudah berada di kegiatan pertama/terakhir kategori ini.
    // Jangan berpindah bidang melalui swipe; pindah bidang hanya dengan klik tab.
    return;
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    pointerStart.current = { x: event.clientX, y: event.clientY, id: event.pointerId };
    // Pointer capture menjaga drag tetap aktif saat kursor keluar dari kartu.
    if (event.pointerType === 'mouse') event.currentTarget.setPointerCapture(event.pointerId);
  };
  const handlePointerMove = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    if (Math.abs(dx) > Math.abs(dy)) setDragX(Math.max(-72, Math.min(72, dx * 0.24)));
  };
  const handlePointerUp = (event) => {
    if (!pointerStart.current || pointerStart.current.id !== event.pointerId) return;
    const dx = event.clientX - pointerStart.current.x;
    const dy = event.clientY - pointerStart.current.y;
    pointerStart.current = null;
    setDragX(0);
    if (Math.abs(dx) >= 55 && Math.abs(dx) > Math.abs(dy) * 1.2) move(dx < 0 ? 1 : -1);
  };
  const handlePointerCancel = () => { pointerStart.current = null; setDragX(0); };
  const handleWheel = (event) => {
    // Trackpad horizontal saja. Scroll vertikal tetap menggeser halaman seperti biasa.
    if (Math.abs(event.deltaX) < 32 || Math.abs(event.deltaX) <= Math.abs(event.deltaY)) return;
    const now = Date.now();
    if (now - lastWheelAt.current < 650) return;
    lastWheelAt.current = now;
    move(event.deltaX > 0 ? 1 : -1);
  };

  const sceneKey = `${categoryIndex}-${activityIndex}`;
  const photoKey = `${sceneKey}-${photoIndex}`;
  return (
    <div className="exp-showcase">
      <div className="exp-category-track" role="group" aria-label="Pilih bidang pengalaman">
        {EXPERIENCE_GROUPS.map((name, index) => (
          <button
            type="button"
            key={name}
            className={`exp-category-mark${index === categoryIndex ? ' is-active' : ''}`}
            aria-pressed={index === categoryIndex}
            onClick={() => selectCategory(index)}
          >
            <span className="exp-category-line" aria-hidden="true" />
            <span>{String(index + 1).padStart(2, '0')} / {name}</span>
          </button>
        ))}
      </div>

      <div className="exp-stage-heading">
        <div>
          <span className="exp-stage-kicker">EXPERIENCE CATEGORY {String(categoryIndex + 1).padStart(2, '0')} / 03</span>
          <h3>{EXPERIENCE_GROUPS[categoryIndex]}</h3>
        </div>
        <div className="exp-swipe-hint" aria-hidden="true"><span>←</span> SWIPE / DRAG <span>→</span></div>
      </div>

      <div
        className="exp-gesture-surface"
        role="group"
        tabIndex={0}
        aria-label={`Swipe pengalaman ${activity.title}; gunakan geser kiri kanan atau tombol panah keyboard`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onWheel={handleWheel}
        onKeyDown={(event) => {
          if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
            event.preventDefault();
            move(event.key === 'ArrowRight' ? 1 : -1);
          }
        }}
      >
        <div
          className={`exp-scene exp-scene--${direction}`}
          key={sceneKey}
          style={{ '--drag-x': `${dragX}px` }}
        >
          <div className="exp-photo-pane">
            {images.length > 0 ? (
              <>
                <ExperienceMedia
                  key={photoKey}
                  file={images[photoIndex]}
                  title={activity.title}
                  index={photoIndex}
                  total={images.length}
                  direction={direction}
                />
                {images.length > 1 && (
                  <div className="exp-photo-dots" aria-label={`Foto ${photoIndex + 1} dari ${images.length}`}>
                    {images.map((image, i) => (
                      <span key={`${image}-${i}`} className={i === photoIndex ? 'is-active' : ''} />
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className="exp-no-photo" aria-label="Kegiatan Study Group tanpa dokumentasi foto">
                <div className="exp-no-photo-icon" aria-hidden="true"><Icon name="graduation" size={64} /></div>
                <span>TECHNICAL EXPERIENCE</span>
                <strong>EVCON Laboratory</strong>
                <p>Study Group · Telkom University</p>
              </div>
            )}
          </div>

          <div className="exp-detail-pane">
            <span className="exp-activity-number">ACTIVITY {String(activityIndex + 1).padStart(2, '0')} / {String(activities.length).padStart(2, '0')}</span>
            <span className="exp-detail-date">{activity.date}</span>
            <h4>{activity.title}</h4>
            <span className="exp-detail-place">{activity.place}</span>
            <div className="exp-detail-rule" />
            <p>{activity.desc}</p>
            <div className="exp-detail-footer">
              <span>0{activityIndex + 1} <span>/ 0{activities.length}</span></span>
              <small>{photoIndex < images.length - 1
                ? 'Swipe untuk foto selanjutnya'
                : activityIndex < activities.length - 1
                  ? 'Swipe lagi untuk kegiatan berikutnya'
                  : 'Akhir bidang ini · pilih bidang lain di atas'}</small>
            </div>
          </div>
        </div>
      </div>
      <p className="exp-mobile-hint">Klik Organization, Technical, atau Creative untuk memilih bidang. Geser kiri/kanan untuk melihat foto dan kegiatan dalam bidang itu.</p>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('home');
  const [projectFilter, setProjectFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [certIndex, setCertIndex] = useState(0);
  const [certFlipped, setCertFlipped] = useState(false);
  const [previewCertificate, setPreviewCertificate] = useState(false);
  const [progress, setProgress] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const galleryDragStart = useRef(null);
  const moveProjectPhoto = (direction) => {
    if (!selectedProject || selectedProject.gallery.length < 2) return;
    setGalleryIndex((current) => (current + direction + selectedProject.gallery.length) % selectedProject.gallery.length);
  };
  const openProject = (project) => {
    setGalleryIndex(0);
    setSelectedProject(project);
  };

  // Scroll reveal: one observer for existing elements, including newly filtered cards.
  // Every reveal element gets the "visible" class when it reaches the viewport.
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal:not(.visible)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -35px 0px',
    });

    elements.forEach((element) => {
      // Stagger cards within a grid, without delaying unrelated sections.
      const parent = element.parentElement;
      if (parent?.matches('.edu-list, .experience-grid, .skills-list, .project-grid, .specialties-grid')) {
        const siblings = [...parent.children];
        element.style.transitionDelay = `${Math.min(siblings.indexOf(element) % 4, 3) * 110}ms`;
      }
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [projectFilter, certIndex, selectedProject, previewCertificate]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max * 100 : 0);
      const current = [...navItems].reverse().find(([, id]) => {
        const el = document.getElementById(id);
        return el && el.getBoundingClientRect().top <= window.innerHeight * .4;
      });
      if (current) setActiveNav(current[1]);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const isOpen = !!selectedProject || previewCertificate;
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e) => {
      if (e.key === 'Escape') { setSelectedProject(null); setPreviewCertificate(false); }
      if (selectedProject && e.key === 'ArrowRight' && selectedProject.gallery.length > 1) {
        setGalleryIndex((current) => (current + 1) % selectedProject.gallery.length);
      }
      if (selectedProject && e.key === 'ArrowLeft' && selectedProject.gallery.length > 1) {
        setGalleryIndex((current) => (current - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; document.removeEventListener('keydown', onKey); };
  }, [selectedProject, previewCertificate]);

  const selectedCert = certificates[certIndex];
  const filteredProjects = projectFilter === 'All' ? projects : projects.filter(p => p.category === projectFilter);
  const jumpTo = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const moveCert = (dir) => { setCertFlipped(false); setCertIndex(i => (i + dir + certificates.length) % certificates.length); };

  return <div className="site">
    <style>{`
      /* Kata tampil bergiliran ketika scroll mencapai teks. */
      .words-reveal { display: inline; }
      .words-reveal .word-wrapper { display: inline; }
      .words-reveal .word-piece {
        display: inline-block;
        opacity: 0;
        transform: translate3d(0,1em,0);
        filter: blur(7px);
        will-change: opacity, transform, filter;
      }
      .words-reveal.is-visible .word-piece {
        animation: reisya-word-enter 950ms cubic-bezier(.22,1,.36,1) both;
        animation-delay: var(--word-delay, 0ms);
      }
      @keyframes reisya-word-enter {
        from { opacity: 0; transform: translate3d(0,1em,0); filter: blur(7px); }
        to { opacity: 1; transform: translate3d(0,0,0); filter: blur(0); }
      }
      @media (prefers-reduced-motion: reduce) {
        .words-reveal .word-piece {
          opacity: 1 !important;
          transform: none !important;
          filter: none !important;
          animation: none !important;
        }
      }
      /* THE JOURNEY — kartu vertikal besar dengan logo dominan.
         Gelap secara default, berwarna saat hover/focus saja. */
      .education-section .edu-list {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: stretch;
        gap: 22px;
        border-top: 0;
      }
      .education-section .edu-row {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 0;
        min-width: 0;
        padding: 0;
        position: relative;
        overflow: hidden;
        isolation: isolate;
        border: 1px solid rgba(245, 142, 156, .15);
        border-radius: 24px;
        background: #181820;
        color: #eee9ee;
        text-align: left;
        cursor: default;
        box-shadow: 0 20px 44px rgba(0,0,0,.12);
        transition: background .38s ease, border-color .38s ease,
          box-shadow .38s ease, transform .38s ease,
          opacity .7s ease;
      }
      .education-section .edu-row:hover,
      .education-section .edu-row:focus-visible {
        transform: translateY(-8px);
        border-color: rgba(255,130,149,.65);
        background: #30202c;
        box-shadow: 0 24px 56px rgba(225,77,111,.16);
      }
      .education-section .edu-row:focus-visible {
        outline: 2px solid #ff8a99;
        outline-offset: 3px;
      }
      .education-section .edu-logo-stage {
        position: relative;
        height: clamp(205px, 21vw, 255px);
        display: grid;
        place-items: center;
        overflow: hidden;
        background:
          radial-gradient(circle at 50% 48%,rgba(130,69,92,.2),transparent 68%),
          linear-gradient(140deg,#20202b,#161720);
        border-bottom: 1px solid rgba(255,255,255,.07);
        transition: background .38s ease, border-color .38s ease;
      }
      .education-section .edu-logo-stage::before {
        content: '';
        width: 190px;
        height: 190px;
        position: absolute;
        border: 1px solid rgba(255,138,158,.14);
        border-radius: 50%;
        transition: border-color .38s ease, transform .38s ease;
      }
      .education-section .edu-logo-stage::after {
        content: '';
        position: absolute;
        inset: auto 18% 0;
        height: 2px;
        background: linear-gradient(90deg,transparent,#f36b82,transparent);
        opacity: .14;
        transition: opacity .38s ease;
      }
      .education-section .edu-row:hover .edu-logo-stage,
      .education-section .edu-row:focus-visible .edu-logo-stage {
        background:
          radial-gradient(circle at 50% 48%,rgba(238,101,132,.38),transparent 66%),
          linear-gradient(135deg,#402838,#281c2b);
        border-color: rgba(255,142,159,.25);
      }
      .education-section .edu-row:hover .edu-logo-stage::before,
      .education-section .edu-row:focus-visible .edu-logo-stage::before {
        border-color: rgba(255,149,167,.48);
        transform: scale(1.08);
      }
      .education-section .edu-row:hover .edu-logo-stage::after,
      .education-section .edu-row:focus-visible .edu-logo-stage::after { opacity: .85; }
      .education-section .edu-logo-fallback {
        display: grid;
        place-items: center;
        position: relative;
        z-index: 1;
        width: 118px;
        height: 118px;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.12);
        background: rgba(255,255,255,.035);
        color: #987685;
        transition: color .38s ease, border-color .38s ease, transform .38s ease;
      }
      .education-section .edu-row:hover .edu-logo-fallback,
      .education-section .edu-row:focus-visible .edu-logo-fallback {
        color: #ff9cab;
        border-color: rgba(255,145,168,.4);
        transform: scale(1.04);
      }
      .education-section .edu-logo-img {
        position: absolute;
        z-index: 2;
        width: min(66%, 174px);
        height: 174px;
        max-width: 174px;
        object-fit: contain;
        object-position: center;
        filter: grayscale(1) brightness(.78);
        opacity: .78;
        transition: filter .38s ease, opacity .38s ease, transform .38s ease;
      }
      .education-section .edu-row:hover .edu-logo-img,
      .education-section .edu-row:focus-visible .edu-logo-img {
        filter: grayscale(0) brightness(1);
        opacity: 1;
        transform: scale(1.06);
      }
      .education-section .edu-card-content {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 0;
        padding: 28px 26px 30px;
      }
      .education-section .edu-card-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        margin-bottom: 17px;
      }
      .education-section .edu-index {
        font-family: 'Space Grotesk', sans-serif;
        font-size: 13px;
        color: #c7778b;
        font-weight: 700;
        letter-spacing: 2px;
      }
      .education-section .edu-years {
        font-size: 11px;
        color: #b68d9b;
        font-weight: 700;
        letter-spacing: .4px;
      }
      .education-section .edu-school-name {
        display: block;
        min-height: 2.5em;
        font-family: 'Space Grotesk',sans-serif;
        font-weight: 700;
        font-size: clamp(20px, 2vw, 25px);
        line-height: 1.25;
        letter-spacing: -.8px;
        color: #f0e8ee;
      }
      .education-section .edu-degree {
        display: block;
        margin-top: 10px;
        color: #e18a9d;
        font-size: 12px;
        font-weight: 700;
        line-height: 1.5;
      }
      .education-section .edu-description {
        display: block;
        flex: 1;
        margin-top: 20px;
        padding-top: 18px;
        border-top: 1px solid rgba(255,255,255,.09);
        font-size: 13px;
        line-height: 1.8;
        color: #a9a3af;
        transition: color .38s ease, border-color .38s ease;
      }
      .education-section .edu-row:hover .edu-description,
      .education-section .edu-row:focus-visible .edu-description {
        color: #e7d4df;
        border-color: rgba(255,157,178,.28);
      }
      @media (max-width: 990px) {
        .education-section .edu-list { gap: 14px; }
        .education-section .edu-logo-stage { height: 205px; }
        .education-section .edu-logo-img { height: 145px; }
        .education-section .edu-card-content { padding: 22px 18px 25px; }
        .education-section .edu-school-name { font-size: 20px; }
      }
      @media (max-width: 740px) {
        .education-section .edu-list { grid-template-columns: 1fr; gap: 18px; }
        .education-section .edu-logo-stage { height: 230px; }
        .education-section .edu-logo-img { height: 166px; }
        .education-section .edu-card-content { padding: 25px 24px 27px; }
        .education-section .edu-school-name { min-height: 0; font-size: 23px; }
      }
      @media (prefers-reduced-motion: reduce) {
        .education-section .edu-row,
        .education-section .edu-logo-img,
        .education-section .edu-logo-fallback,
        .education-section .edu-logo-stage { transition: none; }
      }

      /* EXPERIENCE — geser foto > geser kegiatan > geser kategori */
      .experience-section { overflow: hidden; }
      .exp-showcase { width: 100%; max-width: 1180px; margin: 0 auto; }
      .exp-category-track { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; margin-bottom: 36px; }
      .exp-category-mark { display: flex; flex-direction: column; gap: 11px; color: #86808e; font-size: 10px; font-weight: 800; letter-spacing: 1.7px; text-transform: uppercase; transition: color .25s, transform .25s, background .25s; padding: 12px 10px 14px; border: 1px solid transparent; border-radius: 12px; background: transparent; text-align: left; cursor: pointer; }
      .exp-category-mark:hover { color: #f5d1d9; background: rgba(248,115,147,.075); }
      .exp-category-mark:focus-visible { outline: 2px solid #ff8395; outline-offset: 2px; }
      .exp-category-line { height: 3px; width: 100%; border-radius: 6px; background: #34313b; transition: background .45s, box-shadow .45s; }
      .exp-category-mark.is-active { color: #ffa5b1; }
      .exp-category-mark.is-active .exp-category-line { background: #fa7187; box-shadow: 0 0 18px #fa71875e; }
      .exp-stage-heading { display: flex; justify-content: space-between; align-items: end; gap: 22px; margin-bottom: 22px; }
      .exp-stage-kicker { color: #c37f92; font-size: 10px; letter-spacing: 2.4px; font-weight: 800; }
      .exp-stage-heading h3 { font-family: 'Space Grotesk', sans-serif; font-weight: 700; font-size: clamp(29px,4vw,46px); letter-spacing: -2px; margin: 7px 0 0; }
      .exp-swipe-hint { color: #c9b6c4; font-size: 10px; letter-spacing: 2px; font-weight: 700; white-space: nowrap; }
      .exp-swipe-hint span { color: #ff8395; font-size: 18px; vertical-align: -1px; margin: 0 6px; }
      .exp-gesture-surface { display: block; outline: none; overflow: hidden; border-radius: 26px; border: 1px solid #ffffff24; background: #191720; box-shadow: 0 22px 70px #0004; cursor: grab; touch-action: pan-y; user-select: none; -webkit-user-select: none; }
      .exp-gesture-surface:active { cursor: grabbing; }
      .exp-gesture-surface:focus-visible { outline: 2px solid #ff8395; outline-offset: 5px; }
      .exp-scene { display: grid; grid-template-columns: minmax(0,1.13fr) minmax(0,.87fr); min-height: 465px; transform: translateX(var(--drag-x, 0px)); animation-duration: .55s; animation-timing-function: cubic-bezier(.22,1,.36,1); animation-fill-mode: both; }
      .exp-scene--next { animation-name: exp-scene-next; }
      .exp-scene--prev { animation-name: exp-scene-prev; }
      @keyframes exp-scene-next { from { opacity:.4; translate: 50px 0; filter:blur(5px); } to {opacity:1; translate:0 0; filter:blur(0);} }
      @keyframes exp-scene-prev { from { opacity:.4; translate: -50px 0; filter:blur(5px); } to {opacity:1; translate:0 0; filter:blur(0);} }
      .exp-photo-pane { position: relative; background: #291f2b; min-height: 465px; overflow: hidden; }
      .exp-media { position:absolute; inset:0; animation-duration: .52s; animation-timing-function: cubic-bezier(.22,1,.36,1); animation-fill-mode: both; }
      .exp-media--next { animation-name: exp-photo-next; }
      .exp-media--prev { animation-name: exp-photo-prev; }
      @keyframes exp-photo-next {from {opacity:.45; transform: translateX(38px) scale(1.025)} to {opacity:1; transform:translateX(0) scale(1)} }
      @keyframes exp-photo-prev {from {opacity:.45; transform: translateX(-38px) scale(1.025)} to {opacity:1; transform:translateX(0) scale(1)} }
      .exp-media img { height: 100%; width: 100%; object-fit: cover; object-position: center; pointer-events: none; -webkit-user-drag: none; }
      .exp-media::after { content:''; position:absolute; inset: 48% 0 0; background:linear-gradient(transparent, #0e0b11a8); pointer-events:none; }
      .exp-photo-placeholder { width:100%; height:100%; display:flex; flex-direction:column; justify-content:center; align-items:center; gap:13px; padding:30px; text-align:center; background:radial-gradient(circle at 55% 42%, #523044, #211d2c 72%); color:#f8a0ad; }
      .exp-photo-placeholder strong {font-family:'Space Grotesk',sans-serif; font-size:20px; color:#efc3d0; }
      .exp-photo-placeholder span {font-size:11px; color:#c4adbb; line-height:1.7; overflow-wrap:anywhere; }
      .exp-photo-placeholder code {color:#ffc4d0; background:#ffffff13; border-radius:4px; padding:3px 5px; }
      /* No-photo activity is an information slide, never a broken image. */
      .exp-no-photo { position:absolute; inset:0; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; padding:32px; gap:12px; background:radial-gradient(circle at 52% 35%,#63384d,#271d2c 64%,#1b1b25); animation:exp-photo-next .55s cubic-bezier(.22,1,.36,1) both; }
      .exp-no-photo-icon { display:grid; place-items:center; width:116px; height:116px; border-radius:50%; color:#f3a4ba; border:1px solid #f3a4ba65; background:#ffffff0b; margin-bottom:8px; }
      .exp-no-photo > span { color:#ec93ab; font-size:10px; font-weight:800; letter-spacing:2.5px; }
      .exp-no-photo > strong { color:#fff; font-family:'Space Grotesk',sans-serif; font-size:clamp(24px,3vw,38px); }
      .exp-no-photo > p { color:#c2aaba; font-size:13px; margin:0; }
      .exp-media-count { position:absolute; z-index:2; left:25px; top:24px; padding:9px 12px; border:1px solid #ffffff40; border-radius:30px; color:#fff; background:#0c0b13b3; backdrop-filter:blur(10px); font-size:10px; font-weight:800; letter-spacing:1.5px; }
      .exp-photo-dots { position:absolute; z-index:3; bottom:25px; left:50%; transform:translateX(-50%); display:flex; gap:7px; align-items:center; }
      .exp-photo-dots span { width:7px; height:7px; border-radius:10px; background:#ffffff85; transition:width .25s, background .25s; }
      .exp-photo-dots span.is-active { width:26px; background:#ff8495; }
      .exp-detail-pane { min-width:0; padding:clamp(28px,4vw,56px); display:flex; flex-direction:column; align-items:flex-start; background:radial-gradient(ellipse at 100% 0%, #362331, #1b1923 63%); }
      .exp-activity-number {color:#ff8b9d; font-size:10px; letter-spacing:1.8px; font-weight:800; margin-bottom:30px; }
      .exp-detail-date {font-size:12px; color:#c9abb7; font-weight:700; }
      .exp-detail-pane h4 {font-family:'Space Grotesk',sans-serif; font-size:clamp(27px,3vw,42px); letter-spacing:-1.4px; line-height:1.16; margin:12px 0; color:#fff; }
      .exp-detail-place {font-size:13px; font-weight:700; color:#fc8da3; line-height:1.6; }
      .exp-detail-rule {width:70px; height:2px; background:#f1728b; margin:27px 0 20px; }
      .exp-detail-pane p {color:#bdb6c3; font-size:14px; line-height:1.85; margin:0 0 30px; }
      .exp-detail-footer {display:flex; gap:20px; width:100%; margin-top:auto; border-top:1px solid #ffffff20; padding-top:20px; justify-content:space-between; align-items:center; }
      .exp-detail-footer > span {font-family:'Space Grotesk',sans-serif; font-size:25px; color:#ffa0ad; font-weight:700; white-space:nowrap; }
      .exp-detail-footer > span span {font-size:12px; color:#8c818f; }
      .exp-detail-footer small {color:#aaa0af; font-size:11px; text-align:right; line-height:1.55; }
      .exp-mobile-hint {color:#9e929f; font-size:12px; text-align:center; line-height:1.7; margin:19px 0 0; }
      @media(max-width:820px) {
        .exp-scene {grid-template-columns:1fr; min-height:0;}
        .exp-photo-pane {height:clamp(270px,55vw,460px); min-height:0;}
        .exp-detail-pane {min-height:280px; padding:30px 28px;}
        .exp-activity-number {margin-bottom:16px;}
        .exp-detail-rule {margin:18px 0 14px;}
      }
      @media(max-width:520px) {
        .exp-category-track {gap:7px; margin-bottom:24px;}
        .exp-category-mark {font-size:8px; letter-spacing:.7px; gap:8px;}
        .exp-stage-heading {align-items:start; gap:12px; margin-bottom:15px;}
        .exp-stage-heading h3 {font-size:31px;}
        .exp-swipe-hint {font-size:8px; margin-top:15px; letter-spacing:0;}
        .exp-swipe-hint span {font-size:13px; margin:0 2px;}
        .exp-gesture-surface {border-radius:18px;}
        .exp-photo-pane {height:275px;}
        .exp-detail-pane {min-height:310px; padding:26px 22px;}
        .exp-detail-pane h4 {font-size:29px;}
        .exp-detail-pane p {font-size:13px;}
        .exp-mobile-hint {font-size:11px;}
      }
      @media(prefers-reduced-motion:reduce) {
        .exp-scene, .exp-media {animation:none!important; transform:none!important;}
      }

      /* MY TOOLBOX — all 18 tools have a logo and a short description. */
      .skills-section .skills-layout { display:block; }
      .skills-section .section-head { max-width:790px; margin-bottom:42px; }
      .skills-section .skills-list {
        display:grid;
        grid-template-columns:repeat(2, minmax(0,1fr));
        gap:20px;
      }
      .skills-section .skill-group {
        min-width:0;
        padding:27px;
        border:1px solid rgba(255,255,255,.1);
        background:linear-gradient(155deg,#1c1a25,#14151d);
        border-radius:22px;
      }
      .skills-section .skill-heading {
        margin-bottom:22px;
        padding-bottom:18px;
        border-bottom:1px solid rgba(255,255,255,.1);
        align-items:baseline;
      }
      .skills-section .skill-heading h3 { flex:1; font-size:22px; }
      .skills-section .skill-heading small { color:#857e8d; font-size:10px; font-weight:800; letter-spacing:1.4px; white-space:nowrap; }
      .skills-section .skill-chip-grid {
        display:grid;
        grid-template-columns:repeat(2,minmax(0,1fr));
        gap:11px;
      }
      .skills-section .tool-card {
        min-height:91px;
        display:flex;
        gap:13px;
        align-items:center;
        padding:14px 13px;
        border-radius:15px;
        background:#24222d;
        border:1px solid rgba(255,255,255,.07);
        transition:background .28s ease,border-color .28s ease,transform .28s ease,box-shadow .28s ease;
      }
      .skills-section .tool-card:hover {
        background:#342432;
        border-color:rgba(255,129,151,.57);
        transform:translateY(-4px);
        box-shadow:0 12px 24px rgba(0,0,0,.16);
      }
      .skills-section .tool-icon-box {
        position:relative;
        display:grid;
        flex:0 0 48px;
        width:48px;
        height:48px;
        place-items:center;
        border-radius:13px;
        background:#f3f0f2;
        overflow:hidden;
      }
      .skills-section .tool-icon-fallback {
        color:#814157;
        font-family:'Space Grotesk',sans-serif;
        font-size:15px;
        font-weight:800;
        text-align:center;
        letter-spacing:-.6px;
      }
      .skills-section .tool-icon-img {
        position:absolute;
        inset:8px;
        width:calc(100% - 16px);
        height:calc(100% - 16px);
        object-fit:contain;
      }
      .skills-section .tool-text { min-width:0; display:flex; flex-direction:column; gap:5px; }
      .skills-section .tool-text strong { color:#f7f3f6; font-size:13px; line-height:1.35; }
      .skills-section .tool-text small { color:#aaa3b2; font-size:11px; line-height:1.48; }
      .skills-section .toolbox-note { font-size:12px; color:#928b9b; margin:20px 0 0; line-height:1.65; }
      @media(max-width:920px) {
        .skills-section .skills-list { grid-template-columns:1fr; }
        .skills-section .skill-chip-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
      }
      @media(max-width:520px) {
        .skills-section .skill-group { padding:20px 16px; }
        .skills-section .skill-heading h3 { font-size:19px; }
        .skills-section .skill-chip-grid { grid-template-columns:1fr; gap:9px; }
        .skills-section .tool-card { min-height:75px; }
        .skills-section .tool-icon-box { width:44px; height:44px; flex-basis:44px; }
      }
      @media(prefers-reduced-motion:reduce) {
        .skills-section .tool-card { transition:none; }
        .skills-section .tool-card:hover { transform:none; }
      }

      /* SELECTED PROJECTS — gallery only; other sections are unchanged. */
      .project-section .project-grid { align-items:stretch; gap:20px; }
      .project-section .project-card {
        background:#191922; border:1px solid rgba(255,255,255,.12);
        border-radius:22px; overflow:hidden; transform:translateZ(0);
        transition:transform .32s ease,border-color .32s ease,box-shadow .32s ease,opacity .7s ease;
      }
      .project-section .project-card:hover,
      .project-section .project-card:focus-visible {
        transform:translateY(-7px); border-color:rgba(250,113,135,.7);
        box-shadow:0 22px 50px rgba(0,0,0,.33);
      }
      .project-section .project-image { height:245px; background:#24232d; }
      .project-section .project-featured .project-image { height:320px; }
      .project-section .project-image img { width:100%; height:100%; object-fit:cover; }
      .project-section .project-image-overlay {
        background:linear-gradient(180deg,rgba(8,8,14,.28) 0%,transparent 45%,rgba(8,8,14,.72) 100%);
      }
      .project-section .project-numeral { z-index:1; }
      .project-section .project-photo-count {
        position:absolute; top:15px; right:16px; z-index:1;
        display:flex; align-items:center; gap:6px;
        border:1px solid rgba(255,255,255,.28);
        background:rgba(13,13,23,.72); border-radius:30px;
        padding:8px 11px; font-size:10px; font-weight:800; letter-spacing:.7px;
        color:#f9eaf0; backdrop-filter:blur(8px);
      }
      .project-section .project-info { display:flex; flex-direction:column; flex:1; }
      .project-section .project-info p { flex:1; }
      .project-section .project-explore {
        display:inline-flex; align-items:center; gap:8px; align-self:flex-start;
        color:#ff91a0; font-size:10px; letter-spacing:1.15px;
        font-weight:800; margin-top:20px;
      }
      .project-section .project-gallery-hint {
        margin:25px 0 0; color:#928e9c; font-size:12px; line-height:1.65;
      }
      .project-backdrop { padding:20px; }
      .project-modal {
        grid-template-columns:minmax(0,1.12fr) minmax(0,.88fr);
        gap:0; width:min(1040px,100%); max-height:min(90vh,860px);
        overflow:auto; background:#1a1922; border:1px solid rgba(255,255,255,.15);
      }
      .project-modal .modal-close { position:sticky; grid-column:1/-1; justify-self:end; margin:15px 16px -57px 0; z-index:5; }
      .project-modal .project-media-panel { min-width:0; background:#12121a; padding:18px; }
      .project-modal .modal-gallery {
        min-height:0; aspect-ratio:31/20; width:100%; position:relative;
        border-radius:17px; overflow:hidden; background:#292532;
        touch-action:pan-y; cursor:grab; user-select:none;
      }
      .project-modal .modal-gallery:active { cursor:grabbing; }
      .project-modal .modal-gallery>img {
        display:block; width:100%; height:100%; max-height:none;
        object-fit:cover; object-position:center; pointer-events:none;
        animation:project-photo-enter .3s ease both;
      }
      .project-modal .project-gallery-counter {
        position:absolute; top:14px; left:14px; padding:9px 11px;
        border-radius:10px; background:rgba(16,16,25,.78);
        color:#fff; font-size:11px; font-weight:800; letter-spacing:1.2px;
      }
      .project-modal .gallery-controls {
        position:absolute; display:flex; bottom:14px; left:50%; transform:translateX(-50%);
        border:1px solid rgba(255,255,255,.23); border-radius:32px;
        background:rgba(17,17,23,.84); backdrop-filter:blur(10px);
        padding:7px; gap:8px; box-shadow:0 12px 30px #0008;
      }
      .project-modal .gallery-controls button {
        background:rgba(255,255,255,.12); width:34px; height:34px;
        transition:background .2s; color:#fff;
      }
      .project-modal .gallery-controls button:hover { background:#ef5965; }
      .project-modal .gallery-controls span { font-size:9px; letter-spacing:1.2px; font-weight:800; color:#e9dfe6; }
      .project-modal .project-thumbnails { display:flex; gap:10px; margin-top:13px; overflow-x:auto; padding:2px; }
      .project-modal .project-thumbnail {
        border:2px solid transparent; padding:0; border-radius:10px;
        background:#302d39; width:78px; height:58px; flex:0 0 auto; overflow:hidden; opacity:.55;
        transition:opacity .2s,border-color .2s;
      }
      .project-modal .project-thumbnail.is-active,
      .project-modal .project-thumbnail:hover { opacity:1; border-color:#f77589; }
      .project-modal .project-thumbnail img { width:100%; height:100%; object-fit:cover; }
      .project-modal .modal-copy { min-width:0; padding:70px 38px 38px; align-self:start; }
      .project-modal .modal-copy h2 { font-size:clamp(26px,3vw,40px); }
      .project-modal .project-detail-label {
        display:block; margin:26px 0 10px; color:#fa8191;
        font-size:10px; font-weight:800; letter-spacing:1.8px;
      }
      .project-modal .modal-copy>p { color:#c3bdc9; line-height:1.85; }
      .project-modal .project-tags { margin-top:5px; }
      .project-modal .modal-note { color:#948c9c; font-size:11px!important; }
      @keyframes project-photo-enter { from { opacity:.5; transform:scale(.985); } to { opacity:1; transform:scale(1); } }
      @media(max-width:760px) {
        .project-section .project-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }
        .project-section .project-featured { grid-column:span 2; }
        .project-modal { display:block; max-height:90dvh; }
        .project-modal .modal-close { position:sticky; top:12px; float:right; margin:10px 11px -55px 0; }
        .project-modal .project-media-panel { padding:14px; }
        .project-modal .modal-copy { padding:20px 23px 30px; }
      }
      @media(max-width:560px) {
        .project-section .project-grid { grid-template-columns:1fr; gap:15px; }
        .project-section .project-featured { grid-column:auto; }
        .project-section .project-image,
        .project-section .project-featured .project-image { height:230px; }
        .project-backdrop { padding:10px; }
        .project-modal .modal-gallery { aspect-ratio:4/3; }
        .project-modal .modal-copy h2 { font-size:27px; }
      }
      @media(prefers-reduced-motion:reduce) {
        .project-modal .modal-gallery>img { animation:none; }
        .project-section .project-card { transition:none; }
      }
    `}</style>
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    <header className="site-header">
      <a href="#home" className="logo" onClick={() => setMenuOpen(false)}>REISYA<span>✳</span></a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navItems.map(([label, id]) => <a key={id} href={`#${id}`} className={activeNav === id ? 'active' : ''}>{label}</a>)}
      </nav>
      <div className="nav-actions">
        <a className="nav-connect" href={SOCIAL.email}>Let's talk <Icon name="arrowUp" size={15}/></a>
        <button className="menu-btn" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(o => !o)}><Icon name={menuOpen ? 'close' : 'menu'}/></button>
      </div>
    </header>

    {menuOpen && <nav className="mobile-menu" aria-label="Mobile navigation">{navItems.map(([label,id],i)=><a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><small>0{i+1}</small>{label}<Icon name="arrowUp" size={19}/></a>)}</nav>}

    <main>
      <section id="home" className="hero">
        <div className="hero-noise" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="overline hero-intro"><span className="pulse-dot"/> AVAILABLE FOR NEW OPPORTUNITIES</div>
            <div className="hero-kicker"><Words text="HELLO, I'M" /></div>
            <h1><Words text="Reisya" /><span className="heading-light"> <Words text="Danya" start={1} /></span><span className="hero-last"><Words text="Tahhira" start={2} /><span className="colored-dot">.</span></span></h1>
            <p className="hero-subtitle"><Words text="Computer Engineering undergraduate at" /> <strong><Words text="Telkom University" start={4} /></strong>. <Words text="Curious about building things where" start={6} /> <strong><Words text="technology, data & creativity" start={12} /></strong> <Words text="meet." start={16} /></p>
            <div className="hero-buttons">
              <button className="btn btn-primary" onClick={() => jumpTo('projects')}>Explore my work <Icon name="arrowUp" size={17}/></button>
              <button className="btn btn-ghost" onClick={() => jumpTo('about')}>Get to know me <Icon name="arrowDown" size={17}/></button>
              <a href="/Reisya_CV_ATS.pdf" download className="btn btn-ghost">DOWNLOAD CV <Icon name="download" size={16}/></a>
            </div>
          </div>
          <div className="hero-visual" aria-label="Portrait of Reisya Danya Tahhira">
            <div className="portrait-halo"/><div className="portrait-orbit"><span>✦</span><span>✳</span></div>
            <div className="portrait-outline"/><img src={`${ASSET}portrait.png`} alt="Reisya Danya Tahhira" className="hero-portrait"/>
            <div className="floating-label label-one"><span>✦</span> LEARN • BUILD • GROW</div>
            <div className="floating-label label-two"><span className="label-dot"/> BASED IN INDONESIA</div>
          </div>
        </div>
        <div className="hero-bottom container"><span>SCROLL TO DISCOVER</span><span>01 / 08</span><Icon name="arrowDown" size={17}/></div>
      </section>

      <div className="specialties-strip">
        <div className="specialties-title reveal">AREAS OF INTEREST</div>
        <div className="specialties-grid">
          {['Software Development', 'Data Analytics', 'Embedded Systems', 'Creative Exploration'].map((item, index) => (
            <div className="specialty-item reveal" key={item}>
              <span className="specialty-number">0{index + 1}</span>
              <span>{item}</span>
              <span className="specialty-star">✳</span>
            </div>
          ))}
        </div>
      </div>

      <section id="about" className="section about-section">
        <div className="container about-new">
          <div className="about-photo reveal">
            <img src={`${ASSET}about-photo.png`} alt="Reisya Danya Tahhira" loading="lazy" />
          </div>
          <div className="about-content reveal">
            <span className="eyebrow"><i className="tiny-square" /> 01 / ABOUT ME</span>
            <h2><Words text="Beyond" /> <em><Words text="the code." start={1} /></em></h2>
            <h3><Words text="Curious by nature, always learning." /></h3>
            <p><Words text="Hi, I'm" /> <strong><Words text="Reisya Danya Tahhira" start={2} /></strong>, <Words text="a Computer Engineering undergraduate at Telkom University. I enjoy learning about web development, data analytics, embedded systems, and IoT through coursework and projects." interval={90} /></p>
            <p><Words text="Outside academics, I'm active in student organizations, event committees, public speaking, and creative experiences. These activities help me grow in teamwork, communication, and confidence." interval={90} /></p>
            <div className="about-details">
              <div><span>EDUCATION</span><strong>Telkom University</strong></div>
              <div><span>MAJOR</span><strong>Computer Engineering</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section id="education" className="section education-section">
        <div className="container"><SectionTitle eyebrow="02 / THE JOURNEY" title="Where it" accent="started." desc="A few milestones in my learning journey, from the classroom to hands-on engineering projects."/>
          <div className="edu-list">
            {education.map((e, i) => (
              <article className="edu-row reveal" key={e.school} tabIndex={0}>
                <div className="edu-logo-stage" aria-hidden="true">
                  <span className="edu-logo-fallback"><Icon name="graduation" size={58} /></span>
                  <img
                    className="edu-logo-img"
                    src={`${ASSET}${e.logo}`}
                    alt=""
                    loading="lazy"
                    onLoad={(event) => { event.currentTarget.previousElementSibling.style.display = 'none'; }}
                    onError={(event) => { event.currentTarget.style.display = 'none'; }}
                  />
                </div>
                <div className="edu-card-content">
                  <div className="edu-card-top">
                    <span className="edu-index">0{i + 1}</span>
                    <span className="edu-years">{e.years}</span>
                  </div>
                  <span className="edu-school-name"><Words text={e.school} /></span>
                  <span className="edu-degree">{e.degree}</span>
                  <span className="edu-description"><Words text={e.desc} interval={90} /></span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="section experience-section">
        <div className="container">
          <SectionTitle eyebrow="03 / OUTSIDE THE CLASSROOM" title="Learning by" accent="doing." desc="The activities, teams, and creative spaces that shaped how I collaborate and communicate."/>
          <ExperienceSwipeShowcase />
        </div>
      </section>

      <section id="skills" className="section skills-section">
        <div className="container skills-layout">
          <SectionTitle
            eyebrow="04 / MY TOOLBOX"
            title="Tools of"
            accent="the trade."
            desc="A closer look at the languages, software, and engineering tools I have explored through coursework, projects, and self-learning."
          />
          <div className="skills-list">
            {skills.map((group, groupIndex) => (
              <article className="skill-group reveal" key={group.category}>
                <div className="skill-heading">
                  <span>0{groupIndex + 1}</span>
                  <h3><Words text={group.category} /></h3>
                  <small>{String(group.items.length).padStart(2,'0')} TOOLS</small>
                </div>
                <div className="skill-chip-grid">
                  {group.items.map((item) => (
                    <div className="tool-card" key={item.name}>
                      <span className="tool-icon-box" aria-hidden="true">
                        <span className="tool-icon-fallback">{item.fallback}</span>
                        <img
                          className="tool-icon-img"
                          src={item.logo}
                          alt=""
                          loading="lazy"
                          onError={(event) => { event.currentTarget.style.display = 'none'; }}
                        />
                      </span>
                      <span className="tool-text">
                        <strong>{item.name}</strong>
                        <small>{item.desc}</small>
                      </span>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <p className="toolbox-note">These are tools I've encountered or explored—not a claim of advanced proficiency in every one.</p>
        </div>
      </section>

      <section id="projects" className="section project-section">
        <div className="container">
          <div className="section-heading-row">
            <SectionTitle
              eyebrow="05 / SELECTED WORK"
              title="Things I've"
              accent="created."
              desc="A collection of software, data, hardware, and competition projects. Tap a card to explore the story and photos."
            />
            <span className="project-count">{String(projects.length).padStart(2, '0')} PROJECTS</span>
          </div>
          <div className="filter-row project-filters reveal" role="group" aria-label="Filter projects by category">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setProjectFilter(filter)}
                className={projectFilter === filter ? 'filter active' : 'filter'}
                aria-pressed={projectFilter === filter}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {filteredProjects.map((project, index) => (
              <button
                type="button"
                className={`project-card reveal ${index === 0 && projectFilter === 'All' ? 'project-featured' : ''}`}
                key={project.id}
                onClick={() => openProject(project)}
                aria-label={`Open details and gallery for ${project.title}`}
              >
                <div className="project-image">
                  <img src={`${ASSET}${project.image}`} alt={`Preview of ${project.title}`} loading="lazy" />
                  <div className="project-image-overlay" />
                  <span className="project-numeral">PROJECT {project.number}</span>
                  {project.gallery.length > 1 && (
                    <span className="project-photo-count"><Icon name="expand" size={14}/> {project.gallery.length} PHOTOS</span>
                  )}
                  <span className="project-arrow"><Icon name="arrowUp" size={22}/></span>
                </div>
                <div className="project-info">
                  <span className="project-kicker">{project.kicker}</span>
                  <h3><Words text={project.title}/></h3>
                  <p><Words text={project.desc} interval={70}/></p>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <span className="project-explore">EXPLORE PROJECT <Icon name="arrowUp" size={15}/></span>
                </div>
              </button>
            ))}
          </div>
          <p className="project-gallery-hint">Select any project to see its details and available documentation.</p>
        </div>
      </section>

      <section id="certificates" className="section certificate-section">
        <div className="container"><SectionTitle eyebrow="06 / LEARNING MILESTONES" title="Always" accent="learning." desc="Credentials and recognition collected along the way. Navigate through the cards or flip one to read more."/>
          <div className="certificate-layout"><div className="certificate-stage reveal"><div className="certificate-ambient"/>
            <button key={selectedCert.title} className={`certificate-card ${certFlipped?'flipped':''}`} onClick={()=>setCertFlipped(v=>!v)} aria-label={certFlipped?'Show certificate image':'Flip certificate to details'}>
              <div className="cert-front"><img src={`${ASSET}${selectedCert.image}`} alt={`${selectedCert.title} certificate`}/></div>
              <div className="cert-back"><span className="eyebrow">CERTIFICATE · {selectedCert.year}</span><h3><Words key={selectedCert.title} text={selectedCert.title} /></h3><p><Words key={selectedCert.title} text={selectedCert.desc} interval={90} /></p><small>CLICK TO FLIP BACK ↻</small></div>
            </button>
            <div className="cert-hint">↻ CLICK TO FLIP</div>
          </div>
            <div className="certificate-copy reveal"><span className="cert-number">0{certIndex+1} <span>/ 0{certificates.length}</span></span><div className="cert-line"/><h3><Words key={selectedCert.title} text={selectedCert.title} /></h3><p className="cert-type">{selectedCert.type}</p><p><Words key={selectedCert.title} text={selectedCert.desc} interval={90} /></p><div className="cert-actions"><button className="round-arrow" onClick={()=>moveCert(-1)} aria-label="Previous certificate"><Icon name="chevronLeft"/></button><button className="round-arrow" onClick={()=>moveCert(1)} aria-label="Next certificate"><Icon name="chevronRight"/></button><button className="view-cert" onClick={()=>setPreviewCertificate(true)}>View certificate <Icon name="expand" size={17}/></button></div>
              <div className="cert-dots">{certificates.map((c,i)=><button aria-label={`Show ${c.title}`} key={c.title} onClick={()=>{setCertIndex(i);setCertFlipped(false)}} className={i===certIndex?'active':''}/>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact-section"><div className="container contact-wrap reveal"><span className="eyebrow"><i className="tiny-square"/> 07 / GET IN TOUCH</span><p className="contact-small"><Words text="Have an idea, opportunity, or just want to say hello?" /></p><h2><Words text="Let's create" /><br/><em><Words text="something good." start={2} /></em></h2><a className="contact-email" href={SOCIAL.email}>reisyadanya10@gmail.com <Icon name="arrowUp" size={25}/></a><div className="contact-links"><a href={SOCIAL.github} target="_blank" rel="noreferrer"><Icon name="github"/> GitHub <Icon name="arrowUp" size={16}/></a><a href={SOCIAL.instagram} target="_blank" rel="noreferrer"><Icon name="instagram"/> Instagram <Icon name="arrowUp" size={16}/></a><a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer">WhatsApp <Icon name="arrowUp" size={16}/></a></div></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-flex"><a href="#home" className="logo">REISYA<span>✳</span></a><p>Made with curiosity, code & a little creativity.</p><span>© {new Date().getFullYear()} Reisya Danya Tahhira</span><button aria-label="Back to top" onClick={()=>jumpTo('home')}><Icon name="arrowUp"/></button></div></footer>

    {selectedProject && (
      <div className="modal-backdrop project-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedProject.title} project gallery`}
          onClick={(event) => event.stopPropagation()}
        >
          <button type="button" className="modal-close" onClick={() => setSelectedProject(null)} aria-label="Close project details"><Icon name="close"/></button>
          <div className="project-media-panel">
            <div
              className="modal-gallery"
              onPointerDown={(event) => {
                galleryDragStart.current = { x: event.clientX, y: event.clientY };
              }}
              onPointerUp={(event) => {
                const start = galleryDragStart.current;
                galleryDragStart.current = null;
                if (!start) return;
                const deltaX = event.clientX - start.x;
                const deltaY = event.clientY - start.y;
                if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
                  moveProjectPhoto(deltaX < 0 ? 1 : -1);
                }
              }}
              onPointerCancel={() => { galleryDragStart.current = null; }}
            >
              <img
                key={`${selectedProject.id}-${galleryIndex}`}
                src={`${ASSET}${selectedProject.gallery[galleryIndex]}`}
                alt={`${selectedProject.title} — documentation photo ${galleryIndex + 1} of ${selectedProject.gallery.length}`}
                draggable="false"
              />
              <span className="project-gallery-counter">{String(galleryIndex + 1).padStart(2, '0')} / {String(selectedProject.gallery.length).padStart(2, '0')}</span>
              {selectedProject.gallery.length > 1 && (
                <div className="gallery-controls">
                  <button type="button" onClick={() => moveProjectPhoto(-1)} aria-label="Previous project photo"><Icon name="chevronLeft" size={19}/></button>
                  <span>SWIPE PHOTOS</span>
                  <button type="button" onClick={() => moveProjectPhoto(1)} aria-label="Next project photo"><Icon name="chevronRight" size={19}/></button>
                </div>
              )}
            </div>
            {selectedProject.gallery.length > 1 && (
              <div className="project-thumbnails" aria-label="Project photo thumbnails">
                {selectedProject.gallery.map((file, index) => (
                  <button
                    type="button"
                    key={file}
                    className={`project-thumbnail ${galleryIndex === index ? 'is-active' : ''}`}
                    onClick={() => setGalleryIndex(index)}
                    aria-label={`Show photo ${index + 1}`}
                    aria-pressed={galleryIndex === index}
                  >
                    <img src={`${ASSET}${file}`} alt="" loading="lazy"/>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="modal-copy">
            <span className="project-kicker">{selectedProject.kicker} · PROJECT {selectedProject.number}</span>
            <h2>{selectedProject.title}</h2>
            <span className="project-detail-label">PROJECT OVERVIEW</span>
            <p>{selectedProject.detail}</p>
            <span className="project-detail-label">TOOLS & TOPICS</span>
            <div className="project-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <p className="modal-note">More documentation or repository links can be added when available.</p>
          </div>
        </div>
      </div>
    )}
    {previewCertificate && <div className="modal-backdrop" onClick={()=>setPreviewCertificate(false)} role="presentation"><div className="certificate-modal" role="dialog" aria-modal="true" aria-label={selectedCert.title} onClick={e=>e.stopPropagation()}><button className="modal-close" aria-label="Close certificate" onClick={()=>setPreviewCertificate(false)}><Icon name="close"/></button><img src={`${ASSET}${selectedCert.image}`} alt={`${selectedCert.title} certificate enlarged`}/><h3><Words key={selectedCert.title} text={selectedCert.title} /></h3></div></div>}
  </div>;
}

export default App;
