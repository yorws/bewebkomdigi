import React, { useState, useEffect, useRef } from 'react'; // Import semua hooks yang dibutuhkan
import apiClient from './api'; // Import instance Axios (path disesuaikan)

// Komponen utama untuk halaman "About Us"
export default function Aboutuslandingpage() {
  console.log('Aboutuslandingpage component rendered');

  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      console.log('Fetching About Us page content...');
      try {
        setLoading(true);
        const response = await apiClient.get('/pages/about-us'); // Mengambil data untuk slug 'about-us'
        setPageContent(response.data);
        setLoading(false);
        console.log('API Response data for About Us:', response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching about us page content:", err);
      }
    };
    fetchPageContent();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading About Us content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for About Us page. Please add sections via admin dashboard.</div>;

  // Helper function to extract section content
  const getSectionContent = (sectionName) => {
    return pageContent.sections.find(sec => sec.section_name === sectionName)?.content;
  };

  // Ekstrak data untuk setiap section di halaman About Us
  const heroAboutSectionData = getSectionContent('hero_about_section');
  const aboutTeamSectionData = getSectionContent('about_team_section');
  const whyWeExistAboutSectionData = getSectionContent('why_we_exist_section_about'); // Nama unik untuk About Us
  const ourValuesSectionData = getSectionContent('our_values_section');

  console.log('Aboutuslandingpage is rendering main content.'); // Diagnostic log

  return (
    <div className="about-us-windowed-container"> {/* Container paling luar untuk efek windowed */}
      <div className="about-us-content-wrapper"> {/* Wrapper untuk konten utama yang dibatasi lebarnya */}
        {heroAboutSectionData && <HeroAboutLandingPage data={heroAboutSectionData} />}
        {aboutTeamSectionData && <AboutTeamSection data={aboutTeamSectionData} />}
        {whyWeExistAboutSectionData && <WhyWeExistSection data={whyWeExistAboutSectionData} />}
        {ourValuesSectionData && <OurValuesSection data={ourValuesSectionData} />}
      </div>
      <style jsx="true">{`
          /* GLOBAL STYLES FOR ABOUT US PAGE */
          * { margin: 0; padding: 0; box-sizing: border-box; } /* Pastikan box-sizing di apply ke semua */
          body, html {
            overflow-x: hidden; /* Sembunyikan scroll horizontal di level global */
            width: 100%;
            background-color: #f0f0f0; /* Contoh warna background di luar jendela */
          }
          .about-us-windowed-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center; /* Pusat konten horizontal */
            background-color: #f0f0f0; /* Pastikan background terlihat */
            overflow-x: hidden; /* Sembunyikan scroll horizontal untuk seluruh halaman */
          }
          .about-us-content-wrapper {
            width: 100%;
            max-width: 1200px; /* Lebar maksimum konten seperti di Homelandingpage */
            margin: 0 auto; /* Otomatis tengah */
            background-color: #FFFFFF; /* Warna background utama konten halaman */
            box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Tambahkan shadow untuk efek jendela */
            overflow: hidden; /* Sembunyikan overflow di dalam wrapper */
            display: flex;
            flex-direction: column;
            align-items: stretch; /* Agar elemen di dalamnya mengisi lebar wrapper */
            font-family: 'Poppins', sans-serif; /* Asumsi font Poppins untuk halaman ini */
          }
          /* Placeholders for missing sections */
          .section-placeholder {
            padding: 50px;
            text-align: center;
            color: #888;
            background-color: #f9f9f9;
            border: 1px dashed #ccc;
            margin: 20px auto; /* auto untuk memusatkan */
            width: 90%;
            max-width: 1100px; /* Konsisten dengan lebar konten */
            box-sizing: border-box;
          }
      `}</style>
    </div>
  );
}

// === Komponen Bagian Hero About Us ===
const HeroAboutLandingPage = ({ data }) => {
  // Menggunakan URL dari data atau fallback
  const imageUrl = data?.illustration_url || 'src/assets/Aboutuslandingpage.png';
  const title = data?.title || "Strengthening Indonesia's National Digital Talent Ecosystem";

  return (
    <section className="hero-about-section">
      <div className="container"> {/* Tambahkan container baru untuk membatasi lebar konten */}
        <div className="hero-left-illustration-container" style={{ backgroundImage: `url(${imageUrl})` }}>
        </div>
        <div className="hero-text-container">
          <h1 className="hero-title">{title}</h1>
        </div>
      </div>
      <style jsx="true">
        {`
          .hero-about-section {
            display: flex; flex-direction: row; align-items: center; padding: 0px; /* Padding diatur di container */ gap: 40px;
            width: 100%; min-height: 721.52px; background: #196ECD; color: white; box-sizing: border-box;
            position: relative; overflow: hidden; justify-content: center; font-family: 'Inter', sans-serif;
          }
          .hero-about-section .container { /* Container untuk Hero Section */
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 50px 20px; /* Padding internal konsisten */
            gap: 40px;
            width: 100%;
            max-width: 1100px; /* Konsisten dengan lebar konten Homelandingpage */
            margin: 0 auto; /* Pusatkan konten */
            box-sizing: border-box;
            justify-content: space-between; /* Untuk mendorong ilustrasi dan teks ke ujung */
          }
          .hero-left-illustration-container {
            flex-shrink: 0;
            width: 55%; /* Gunakan persentase untuk responsivitas */
            max-width: 700px; /* Batasan maksimum */
            height: 560px; /* Tinggi asli, bisa disesuaikan di media query */
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
            overflow: hidden;
            background-size: contain; /* Agar ilustrasi selalu terlihat penuh */
            background-position: center;
            background-repeat: no-repeat;
          }
          .hero-text-container {
            flex-shrink: 0;
            width: 40%; /* Gunakan persentase untuk responsivitas */
            max-width: 500px; /* Batasan maksimum */
            text-align: right;
            box-sizing: border-box;
            background: none;
            color: white;
          }
          .hero-title {
            font-size: 3.5rem; font-weight: bold; line-height: 1.1; margin: 0; text-align: right; word-break: break-word;
          }
          @media (max-width: 1200px) {
            .hero-about-section .container { flex-direction: column; padding: 40px 30px; gap: 30px; justify-content: center; /* Pusatkan konten di tengah jika kolom */ }
            .hero-left-illustration-container { order: 2; width: 100%; max-width: 550px; height: 440px; margin-bottom: 0; }
            .hero-text-container { order: 1; width: 100%; text-align: center; padding: 0; }
            .hero-title { font-size: 3rem; text-align: center; }
          }
          @media (max-width: 768px) {
            .hero-about-section .container { padding: 30px 15px; }
            .hero-title { font-size: 2.5rem; text-align: center; }
            .hero-left-illustration-container { max-width: 420px; height: 340px; }
          }
          @media (max-width: 480px) {
            .hero-title { font-size: 2rem; text-align: center; }
            .hero-left-illustration-container { max-width: 350px; height: 280px; }
          }
        `}
      </style>
    </section>
  );
};

// === Komponen Bagian "About the Team" ===
const AboutTeamSection = ({ data }) => {
  // Mengambil data anggota tim dari prop atau menggunakan fallback
  // Pola: member_0_icon, member_0_title, member_0_description
  const teamMembers = [
    {
      icon: data?.member_0_icon, title: data?.member_0_title, description: data?.member_0_description,
    },
    {
      icon: data?.member_1_icon, title: data?.member_1_title, description: data?.member_1_description,
    },
    {
      icon: data?.member_2_icon, title: data?.member_2_title, description: data?.member_2_description,
    },
    {
      icon: data?.member_3_icon, title: data?.member_3_title, description: data?.member_3_description,
    },
  ].filter(member => member && member.icon && member.title && member.description); // Filter data yang tidak lengkap

  const finalTeamMembers = teamMembers.length > 0 ? teamMembers : [ // Fallback jika data dari backend kosong/tidak lengkap
    { icon: 'src/assets/iconaboutus1.png', title: 'How We Started (Default)', description: 'Default description for How We Started.' },
    { icon: 'src/assets/iconaboutus2.png', title: 'Our First Milestone (Default)', description: 'Default description for Our First Milestone.' },
    { icon: 'src/assets/iconaboutus3.png', title: 'Growth & Collaboration (Default)', description: 'Default description for Growth & Collaboration.' },
    { icon: 'src/assets/iconaboutus4.png', title: 'Where We Are Now (Default)', description: 'Default description for Where We Are Now.' },
  ];

  return (
    <section className="about-team-section-container">
      <div className="container"> {/* Tambahkan container baru untuk membatasi lebar konten */}
        <h2 className="about-team-main-title">{data?.main_title || "About the Team"}</h2>
        <p className="about-team-main-description">{data?.main_description || "The Platform Management Team of the Digital Human Resources Ecosystem..."}</p>
        <div className="about-team-cards-grid">
          {finalTeamMembers.map((member, index) => (
            <div className="info-card" key={index}>
              <div className="card-icon-title">
                  <img src={member.icon} alt={member.title} />
                  <h3>{member.title}</h3>
              </div>
              <p>{member.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx="true">
        {`
          .about-team-section-container { display: flex; flex-direction: column; align-items: center; padding: 0px; /* Padding diatur di container */ gap: 70px; width: 100%; max-width: 100%; min-height: 847px; background: #B2CFEE; box-sizing: border-box; font-family: 'Inter', sans-serif; color: #333; text-align: center; }
          .about-team-section-container .container { /* Container untuk About Team Section */
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 74px 20px; /* Padding internal konsisten */
            gap: 70px;
            width: 100%;
            max-width: 1100px; /* Konsisten dengan lebar konten Homelandingpage */
            margin: 0 auto;
            box-sizing: border-box;
          }
          .about-team-main-title { font-size: 2.5rem; font-weight: bold; color: #000; margin-bottom: 10px; word-break: break-word; }
          .about-team-main-description { font-size: 1.1rem; line-height: 1.6; max-width: 800px; color: #555; margin-bottom: 30px; word-break: break-word; }
          .about-team-cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, auto); gap: 40px; width: 100%; /* Mengisi lebar container */ height: auto; box-sizing: border-box; padding: 0px; }
          .info-card { box-sizing: border-box; display: flex; flex-direction: column; align-items: center; padding: 50px; gap: 10px; background: #D1E2F5; border-radius: 20px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); text-align: center; flex-grow: 1; align-self: stretch; justify-content: flex-start; }
          .info-card h3 { font-size: 1.5rem; font-weight: bold; margin: 0; color: #196ECD; word-break: break-word; }
          .info-card p { font-size: 1rem; line-height: 1.5; color: #444; flex-grow: 1; display: flex; align-items: center; justify-content: center; word-break: break-word; }
          .card-icon-title { display: flex; flex-direction: column; align-items: center; gap: 15px; margin-bottom: 10px; }
          .card-icon-title img { width: 60px; height: 60px; object-fit: contain; }
          @media (max-width: 1200px) {
            .about-team-section-container .container { padding: 50px 30px; gap: 50px; min-height: auto; height: auto; }
            .about-team-main-title { font-size: 2.2rem; } .about-team-main-description { font-size: 1rem; }
            .about-team-cards-grid { grid-template-columns: 1fr; height: auto; max-width: 90%; gap: 30px; }
            .info-card { padding: 30px; min-height: auto; } .card-icon-title img { width: 50px; height: 50px; } .info-card h3 { font-size: 1.3rem; } .info-card p { font-size: 0.9rem; }
          }
          @media (max-width: 768px) {
            .about-team-section-container .container { padding: 40px 20px; gap: 40px; }
            .about-team-main-title { font-size: 2rem; } .about-team-main-description { font-size: 0.9rem; }
            .about-team-cards-grid { gap: 25px; } .info-card { padding: 25px; } .card-icon-title img { width: 40px; height: 40px; } .info-card h3 { font-size: 1.1rem; } .info-card p { font-size: 0.85rem; }
          }
          @media (max-width: 480px) {
            .about-team-section-container .container { padding: 30px 15px; gap: 30px; }
            .about-team-main-title { font-size: 1.8rem; } .about-team-main-description { font-size: 0.85rem; }
            .about-team-cards-grid { gap: 20px; } .info-card { padding: 20px; } .card-icon-title img { width: 35px; height: 35px; } .info-card h3 { font-size: 1rem; } .info-card p { font-size: 0.8rem; }
          }
        `}
      </style>
    </section>
  );
};

// === Komponen Bagian "Why We Exist" (Spesifik untuk About Us) ===
const WhyWeExistSection = ({ data }) => {
  // Menggunakan hooks React di sini
  const cardsContainerRef = useRef(null); 
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const title = data?.title || "Why We Exist";
  const subtitle = data?.subtitle || "We exist to ensure structured and scalable digital talent development, aligned with industrial needs and national standards through a comprehensive ecosystem approach.";
  // Pola: card_0_description, card_1_description
  const cards = [
    { description: data?.card_0_description },
    { description: data?.card_1_description },
    { description: data?.card_2_description },
    { description: data?.card_3_description },
  ].filter(card => card && card.description); // Filter data yang tidak lengkap

  const finalCards = cards.length > 0 ? cards : [ // Fallback jika data dari backend kosong/tidak lengkap
    { description: 'Design a national framework for continuous digital skill growth adaptable to future needs.' },
    { description: 'Ensure training, certification, and job placement reflect real industry needs for a competitive workforce.' },
    { description: 'Provide equitable digital skill development for all communities, urban and rural, formal and informal.' },
    { description: 'Connect stakeholders, data, and services in one platform for coordinated digital talent advancement.' },
  ];
  const graphicUrl = data?.graphic_url || 'src/assets/whyweexist.png';

  // Logika slider (mirip dengan Homelandingpage WhyWeExist)
  const enableSlider = finalCards.length >= 4; // Aktifkan slider jika 4 kartu atau lebih

  useEffect(() => {
    if (!enableSlider) return;
    const slideInterval = setInterval(() => {
      setCurrentCardIndex((prevIndex) => {
        const container = cardsContainerRef.current;
        const cardElement = container ? container.firstElementChild : null;
        if (!container || !cardElement) return prevIndex; 

        const cardWidth = cardElement.offsetWidth + 20; // Lebar kartu + gap
        if (cardWidth === 0) return prevIndex;

        const nextIndex = (prevIndex + 1);
        const scrollTarget = nextIndex * cardWidth;

        if (scrollTarget < container.scrollWidth - container.clientWidth + 10) {
            container.scroll({ left: scrollTarget, behavior: 'smooth' });
        } else {
            container.scroll({ left: 0, behavior: 'smooth' });
            return 0;
        }
        return nextIndex % finalCards.length;
      });
    }, 3000);
    return () => clearInterval(slideInterval);
  }, [currentCardIndex, enableSlider, finalCards.length]);

  const navigateCards = (direction) => {
    const container = cardsContainerRef.current;
    const cardElement = container ? container.firstElementChild : null;
    if (!enableSlider || !container || !cardElement) return;

    const cardWidth = cardElement.offsetWidth + 20;
    if (cardWidth === 0) return;

    if (direction === 'next') {
        container.scrollLeft += cardWidth;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scroll({ left: 0, behavior: 'smooth' });
            setCurrentCardIndex(0);
        } else {
            setCurrentCardIndex(prevIndex => (prevIndex + 1) % finalCards.length);
        }
    } else { // direction === 'prev'
        container.scrollLeft -= cardWidth;
        if (container.scrollLeft <= 10) {
            container.scroll({ left: container.scrollWidth, behavior: 'smooth' });
            setCurrentCardIndex(finalCards.length - 1);
        } else {
            setCurrentCardIndex(prevIndex => (prevIndex - 1 + finalCards.length) % finalCards.length);
        }
    }
  };

  const handleMouseDown = (e) => {
    if (!enableSlider || !cardsContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - cardsContainerRef.current.offsetLeft);
    setScrollLeft(cardsContainerRef.current.scrollLeft);
    cardsContainerRef.current.style.cursor = 'grabbing';
    cardsContainerRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !enableSlider || !cardsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - cardsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    cardsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    const container = cardsContainerRef.current;
    const cardElement = container ? container.firstElementChild : null;
    
    if (!enableSlider || !container || !cardElement) {
        setIsDragging(false);
        if(container) {
            container.style.cursor = 'grab';
            container.style.scrollBehavior = 'smooth';
        }
        return;
    }
    
    setIsDragging(false);
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';

    const currentScrollLeft = container.scrollLeft;
    const cardWidth = cardElement.offsetWidth + 20; // width + gap

    if (cardWidth === 0) return;

    const nearestCardIndex = Math.round(currentScrollLeft / cardWidth);
    const targetScrollLeft = nearestCardIndex * cardWidth;

    container.scroll({ left: targetScrollLeft, behavior: 'smooth' });
    setCurrentCardIndex(nearestCardIndex % finalCards.length);
  };

  const handleMouseLeave = () => {
    const container = cardsContainerRef.current;
    if (!enableSlider || !container) return;
    setIsDragging(false);
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';
  };
  // Akhir logika slider

  return (
    <section className="why-we-exist-section-container">
      <div className="container"> {/* Tambahkan container baru untuk membatasi lebar konten */}
        <div className="why-we-exist-content-wrapper">
          <h2 className="why-we-exist-title">{title}</h2>
          <p className="why-we-exist-subtitle">{subtitle}</p>
          <div className="why-we-exist-columns">
            <div className="why-we-exist-left-column">
              {finalCards.map((card, index) => (
                <div className="why-we-exist-card" key={index}>
                  <p>{card.description}</p>
                </div>
              ))}
            </div>
            <div className="why-we-exist-right-column">
              <img src={graphicUrl} alt="Why We Exist Illustration" className="why-we-exist-graphic" />
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">
        {`
          /* why-we-exist-section-container (Frame 3 - outer) */
          .why-we-exist-section-container {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            padding: 0px; /* Padding diatur di container */ gap: 10px; width: 100%; max-width: 100%; min-height: 825px; background: #196ECD;
            box-sizing: border-box; font-family: 'Inter', sans-serif; color: white;
          }
          .why-we-exist-section-container .container { /* Container untuk Why We Exist Section */
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 66px 20px; /* Padding internal konsisten */
            gap: 52px; /* Disesuaikan agar lebih dekat */
            width: 100%;
            max-width: 1100px; /* Konsisten dengan lebar konten Homelandingpage */
            margin: 0 auto;
            box-sizing: border-box;
          }
          .why-we-exist-content-wrapper { display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 52px; width: 100%; max-width: 1230px; min-height: 693px; box-sizing: border-box; text-align: center; }
          .why-we-exist-title { font-size: 3rem; font-weight: bold; line-height: 1.2; margin-bottom: 10px; word-break: break-word; }
          .why-we-exist-subtitle { font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; max-width: 800px; word-break: break-word; }
          .why-we-exist-columns { display: flex; flex-direction: row; align-items: center; justify-content: center; gap: 43px; width: 100%; height: 500px; max-height: 500px; }
          .why-we-exist-left-column { display: flex; flex-direction: column; gap: 20px; flex: none; width: 593.5px; max-width: 100%; }
          .why-we-exist-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 20px;
            gap: 10px;
            width: 100%;
            height: 88px;
            background: #B2CFEE;
            border-radius: 15px; /* PERUBAHAN: Sudut membulat */
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            color: #333;
            box-sizing: border-box;
          }
          .why-we-exist-card p { text-align: center; margin: 0; font-size: 1rem; line-height: 1.5; word-break: break-word; }
          .why-we-exist-right-column { flex: 1; display: flex; justify-content: center; align-items: center; max-width: 500px; height: 412px; }
          .why-we-exist-graphic { width: auto; height: 100%; max-width: 100%; object-fit: contain; }
          @media (max-width: 1200px) {
            .why-we-exist-section-container .container { padding: 50px 30px; gap: 40px; min-height: auto; width: 100%; height: auto; align-items: center; }
            .why-we-exist-content-wrapper { gap: 40px; max-width: 90%; }
            .why-we-exist-title { font-size: 2.5rem; }
            .why-we-exist-subtitle { font-size: 1rem; }
            .why-we-exist-columns { flex-direction: column; gap: 30px; height: auto; max-height: none; }
            .why-we-exist-left-column { width: 100%; max-width: 600px; margin: 0 auto; }
            .why-we-exist-right-column { width: 100%; max-width: 400px; margin: 0 auto; height: auto; }
            .why-we-exist-card { width: 100%; max-width: 500px; padding: 15px; height: auto; min-height: 88px; text-align: center; align-items: center; margin: 0 auto; }
            .why-we-exist-card p { font-size: 0.95rem; }
          }
          @media (max-width: 768px) {
            .why-we-exist-section-container .container { padding: 40px 20px; gap: 30px; }
            .why-we-exist-title { font-size: 2rem; }
            .why-we-exist-subtitle { font-size: 0.9rem; }
            .why-we-exist-columns { gap: 25px; }
            .why-we-exist-left-column, .why-we-exist-right-column { max-width: 400px; }
            .why-we-exist-card { padding: 12px; min-height: 80px; margin: 0 auto; border-radius: 10px; } /* Sesuaikan border-radius di mobile */
            .why-we-exist-card p { font-size: 0.9rem; }
          }
          @media (max-width: 480px) {
            .why-we-exist-section-container .container { padding: 30px 15px; gap: 20px; }
            .why-we-exist-title { font-size: 1.8rem; }
            .why-we-exist-subtitle { font-size: 0.85rem; }
            .why-we-exist-columns { gap: 20px; }
            .why-we-exist-card { padding: 10px; min-height: 70px; margin: 0 auto; border-radius: 8px; } /* Lebih kecil lagi di ponsel */
            .why-we-exist-card p { font-size: 0.85rem; }
          }
        `}
      </style>
    </section>
  );
};

// Komponen baru untuk bagian "Our Values"
const OurValuesSection = ({ data }) => {
  // Mengambil data nilai dari prop atau menggunakan fallback
  // Pola: value_0_icon, value_0_title, value_0_description
  const values = [
    {
      icon: data?.value_0_icon, title: data?.value_0_title, description: data?.value_0_description,
    },
    {
      icon: data?.value_1_icon, title: data?.value_1_title, description: data?.value_1_description,
    },
    {
      icon: data?.value_2_icon, title: data?.value_2_title, description: data?.value_2_description,
    },
  ].filter(value => value && value.icon && value.title && value.description); // Filter data yang tidak lengkap

  const finalValues = values.length > 0 ? values : [ // Fallback jika data dari backend kosong/tidak lengkap
    { icon: 'src/assets/klip.png', title: 'Strategic Collaboration (Default)', description: 'Building long-term partnerships across sectors.' },
    { icon: 'src/assets/shild.png', title: 'Professionalism (Default)', description: 'Commitment to quality, integrity, and public service excellence.' },
    { icon: 'src/assets/notechek.png', title: 'Accountability (Default)', description: 'Transparent and measurable outcomes in every initiative.' },
  ];

  return (
    <section className="our-values-section-container">
      <div className="container"> {/* Tambahkan container baru untuk membatasi lebar konten */}
        <h2 className="our-values-title">{data?.title || "Our Values"}</h2>
        <div className="our-values-content-wrapper">
          {finalValues.map((value, index) => (
            <div className="value-card" key={index}>
              <img src={value.icon} alt={value.title} className="value-icon" />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx="true">
        {`
          /* OurValuesSection Container (Frame 14216) */
          .our-values-section-container {
            display: flex; flex-direction: column; align-items: center; padding: 0px; /* Padding diatur di container */ gap: 85px;
            width: 100%; max-width: 100%; min-height: 581px; background: #F8F8F8; box-sizing: border-box;
            font-family: 'Inter', sans-serif; color: #333; margin: 0 auto;
          }
          .our-values-section-container .container { /* Container untuk Our Values Section */
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 100px 20px; /* Padding internal konsisten */
            gap: 85px;
            width: 100%;
            max-width: 1100px; /* Konsisten dengan lebar konten Homelandingpage */
            margin: 0 auto;
            box-sizing: border-box;
          }
          .our-values-title { font-size: 2.5rem; font-weight: bold; margin-bottom: 20px; color: #196ECD; text-align: center; word-break: break-word; }
          .our-values-content-wrapper { display: flex; flex-direction: row; align-items: stretch; justify-content: center; padding: 0px; gap: 55px; width: 100%; max-width: 100%; box-sizing: border-box; }
          .value-card {
            box-sizing: border-box; display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            padding: 20px 10px; gap: 15px; flex-basis: calc(33.33% - 37px); max-width: 343.33px; width: 100%;
            height: 192px; min-height: 192px; border: 1px solid #0C3766; filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
            border-radius: 10px; background: #FFFFFF; text-align: center;
          }
          .value-icon { width: 30px; height: auto; max-width: 30px; margin-bottom: 10px; object-fit: contain; }
          .value-card h3 { font-size: 1.4rem; font-weight: bold; margin: 0; color: #000; word-break: break-word; }
          .value-card p { font-size: 0.95rem; line-height: 1.5; color: #555; flex-grow: 1; display: flex; align-items: center; justify-content: center; word-break: break-word; }
          @media (max-width: 1200px) {
            .our-values-section-container .container { padding: 80px 30px; gap: 60px; min-height: auto; height: auto; }
            .our-values-title { font-size: 2.2rem; }
            .our-values-content-wrapper { flex-direction: column; gap: 40px; height: auto; max-width: 90%; }
            .value-card { width: 100%; max-width: 400px; padding: 25px; height: auto; min-height: 150px; }
            .value-icon { width: 25px; height: auto; max-width: 25px; }
            .value-card h3 { font-size: 1.2rem; }
            .value-card p { font-size: 0.9rem; }
          }
          @media (max-width: 768px) {
            .our-values-section-container .container { padding: 60px 20px; gap: 30px; }
            .our-values-title { font-size: 2rem; }
            .our-values-content-wrapper { gap: 30px; }
            .value-card { padding: 20px; max-width: 350px; min-height: 140px; }
            .value-icon { width: 20px; height: auto; max-width: 20px; }
            .value-card h3 { font-size: 1.1rem; }
            .value-card p { font-size: 0.85rem; }
          }
          @media (max-width: 480px) {
            .our-values-section-container .container { padding: 40px 15px; gap: 25px; }
            .our-values-title { font-size: 1.8rem; }
            .our-values-content-wrapper { gap: 20px; }
            .value-card { padding: 15px; max-width: 100%; min-height: 130px; }
            .value-icon { width: 15px; height: auto; max-width: 15px; }
            .value-card h3 { font-size: 1rem; }
            .value-card p { font-size: 0.8rem; }
          }
        `}
      </style>
    </section>
  );
};