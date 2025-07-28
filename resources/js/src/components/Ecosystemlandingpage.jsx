import React, { useState, useEffect, useRef } from 'react'; // Pastikan semua hooks yang dibutuhkan diimpor
import apiClient from './api'; // Import instance Axios (path disesuaikan)

// Komponen utama untuk halaman "Ecosystem"
export default function Ecosystemlandingpage() { // Ini adalah default export yang benar untuk file ini
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/pages/ecosystem'); // Mengambil data untuk slug 'ecosystem'
        setPageContent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching ecosystem page content:", err);
      }
    };
    fetchPageContent();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading Ecosystem content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for Ecosystem page. Please add sections via admin dashboard.</div>;

  const getSectionContent = (sectionName) => {
    return pageContent.sections.find(sec => sec.section_name === sectionName)?.content;
  };

  // Ekstrak data untuk setiap section di halaman Ecosystem
  const ecosystemSectionData = getSectionContent('ecosystem_section');
  const awardRecognitionEcosystemSectionData = getSectionContent('award_recognition_section_ecosystem'); // Nama unik untuk Ecosystem
  const ourPartnersSectionData = getSectionContent('our_partners_section');
  const testimonialSectionData = getSectionContent('testimonial_section');
  const faqSectionData = getSectionContent('faq_section');

  return (
    <div className="ecosystem-page-windowed-container"> {/* Container paling luar untuk efek windowed */}
      <div className="ecosystem-page-content-wrapper"> {/* Wrapper untuk konten utama yang dibatasi lebarnya */}
        {ecosystemSectionData && <EcosystemSection data={ecosystemSectionData} />}
        {awardRecognitionEcosystemSectionData && <AwardRecognitionSection data={awardRecognitionEcosystemSectionData} />}
        {ourPartnersSectionData && <OurPartnersSection data={ourPartnersSectionData} />}
        {testimonialSectionData && <TestimonialSection data={testimonialSectionData} />} {/* PENTING: Meneruskan prop data */}
        {faqSectionData && <FAQSection data={faqSectionData} />} {/* PENTING: Meneruskan prop data */}
      </div>
      <style jsx="true">{`
          /* GLOBAL STYLES FOR ECOSYSTEM PAGE (FOR BOXED LAYOUT) */
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html {
            overflow-x: hidden;
            width: 100%;
            background-color: #f0f0f0; /* Background di luar kotak */
          }
          .ecosystem-page-windowed-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center; /* Pusatkan konten horizontal */
            background-color: #f0f0f0;
            overflow-x: hidden;
          }
          .ecosystem-page-content-wrapper {
            width: 100%;
            max-width: 1200px; /* Lebar maksimum kotak */
            margin: 0 auto; /* Pusatkan kotak */
            background-color: #FFFFFF; /* Warna background di dalam kotak */
            box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Efek bayangan kotak */
            overflow: hidden; /* Pastikan tidak ada scroll horizontal di dalam kotak */
            display: flex;
            flex-direction: column;
            align-items: stretch; /* Agar elemen child mengisi lebar kotak */
            font-family: 'Poppins', sans-serif;
          }
          /* Placeholders for missing sections */
          .section-placeholder {
            padding: 50px;
            text-align: center;
            color: #888;
            background-color: #f9f9f9;
            border: 1px dashed #ccc;
            margin: 20px auto;
            width: 90%;
            max-width: 1100px; /* Konsisten dengan lebar konten di dalam kotak */
            box-sizing: border-box;
          }
        `}
      </style>
    </div>
  );
}

// Komponen untuk bagian Ecosystem Hero
const EcosystemSection = ({ data }) => { // Menerima data dari prop
  const illustration = data?.illustration_url || 'src/assets/ecosystem.png';
  const title = data?.title || "Ecosystem";
  const description = data?.description || "One platform for training, certification and job access.";

  return (
    <section className="ecosystem-section-background">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar konten */}
        <div className="ecosystem-content-wrapper">
          <div className="ecosystem-left-illustration">
            <img src={illustration} alt="Global Ecosystem Illustration" className="ecosystem-graphic" />
          </div>
          <div className="ecosystem-right-text">
            <h1 className="ecosystem-title">{title}</h1>
            <p className="ecosystem-description">{description}</p>
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* Ecosystem Section Background (Frame 3) */
          .ecosystem-section-background {
            display: flex; flex-direction: column; align-items: flex-start; padding: 0; /* Padding diatur oleh .container */ gap: 10px;
            width: 100%;
            height: auto; min-height: 660px; background: #196ECD; box-sizing: border-box;
            color: white; overflow: hidden; /* Pastikan overflow tersembunyi */
          }
          .ecosystem-section-background .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: row; align-items: center; justify-content: space-between; /* Untuk memisahkan konten */
            padding: 66px 20px; /* Padding internal konsisten */ gap: 40px; /* **Diperbaiki**: Mengurangi gap */
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            height: auto; min-height: 500px; /* Tinggi minimum yang lebih responsif */ box-sizing: border-box;
            margin: 0 auto;
          }

          .ecosystem-content-wrapper {
            display: flex; flex-direction: row; align-items: center; justify-content: space-between; /* Memastikan space-between */
            padding: 0px; width: 100%; max-width: 100%; height: auto; box-sizing: border-box; /* max-width 100% dari parent container */
            flex-grow: 1; /* Biarkan mengisi ruang */
          }

          .ecosystem-left-illustration {
            display: flex; justify-content: center; align-items: center;
            width: 55%; /* **Diperbaiki**: Proporsi untuk ilustrasi */ height: auto;
          }

          .ecosystem-graphic {
            width: 100%; height: auto; max-width: 778.71px; /* Max width asli */
            display: block; object-fit: contain;
          }

          .ecosystem-right-text {
            display: flex; flex-direction: column; align-items: flex-end; gap: 15px;
            width: 40%; /* **Diperbaiki**: Proporsi untuk teks */ box-sizing: border-box;
            text-align: right;
          }

          .ecosystem-title {
            width: auto; height: auto;
            font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 60px; line-height: 120%; color: #FFFFFF; margin: 0;
            text-align: right; word-break: break-word;
          }

          .ecosystem-description {
            width: auto; height: auto;
            font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500;
            font-size: 32px; line-height: 120%; color: #FFFFFF; margin: 0;
            text-align: right; word-break: break-word;
          }

          /* Responsive Adjustments */
          @media (max-width: 1200px) {
            .ecosystem-section-background .container { padding: 50px 30px; min-height: auto; flex-direction: column; align-items: center; gap: 40px; }
            .ecosystem-content-wrapper { flex-direction: column; align-items: center; gap: 40px; }
            .ecosystem-left-illustration, .ecosystem-right-text { width: 100%; text-align: center; align-items: center; }
            .ecosystem-graphic { max-width: 450px; }
            .ecosystem-title { font-size: 48px; } .ecosystem-description { font-size: 24px; }
          }

          @media (max-width: 768px) {
            .ecosystem-section-background .container { padding: 40px 20px; gap: 30px; }
            .ecosystem-content-wrapper { gap: 30px; }
            .ecosystem-graphic { max-width: 350px; }
            .ecosystem-title { font-size: 36px; } .ecosystem-description { font-size: 18px; }
          }

          @media (max-width: 480px) {
            .ecosystem-section-background .container { padding: 30px 15px; }
            .ecosystem-content-wrapper { gap: 20px; }
            .ecosystem-graphic { max-width: 280px; }
            .ecosystem-title { font-size: 28px; } .ecosystem-description { font-size: 16px; }
          }
        `}
      </style>
    </section>
  );
}

// Komponen untuk bagian Award & Recognition (Spesifik untuk Ecosystem)
const AwardRecognitionSection = ({ data }) => { // Menerima data dari prop
  const awardsContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentAwardIndex, setCurrentAwardIndex] = useState(0); // State untuk slide otomatis

  // Mengambil data penghargaan dari prop atau menggunakan fallback
  // Pola: award_0_image, award_0_title, award_0_subtitle, award_0_description
  const awards = [];
  if (data) {
    for (let i = 0; i < 20; i++) { // Asumsi max 20 penghargaan
      const award = {
        image: data[`award_${i}_image`],
        title: data[`award_${i}_title`],
        subtitle: data[`award_${i}_subtitle`],
        description: data[`award_${i}_description`],
      };
      if (award.image && award.title) { // Penghargaan dianggap valid jika ada gambar dan judul
        awards.push(award);
      } else {
        break;
      }
    }
  }

  const finalAwards = awards.length > 0 ? awards : [ // Fallback jika data dari backend kosong/tidak lengkap
    { image: 'src/assets/awarducl.png', title: 'Award Title (Default 1)', subtitle: 'Awarding Body - Year', description: 'Default description for award 1.' },
    { image: 'src/assets/awarducl.png', title: 'Award Title (Default 2)', subtitle: 'Awarding Body - Year', description: 'Default description for award 2.' },
    { image: 'src/assets/awarducl.png', title: 'Award Title (Default 3)', subtitle: 'Awarding Body - Year', description: 'Default description for award 3.' },
  ];

  const enableSlider = finalAwards.length >= 4; // Kondisi untuk mengaktifkan slider

  // Efek untuk slide otomatis
  useEffect(() => {
    if (!enableSlider) return;

    const slideInterval = setInterval(() => {
      setCurrentAwardIndex((prevIndex) => {
        const container = awardsContainerRef.current;
        const awardElement = container ? container.firstElementChild : null;
        
        if (!container || !awardElement) {
          console.warn('AwardRecognitionSection: Slider container or first child not found for auto slide.');
          return prevIndex; 
        }

        const awardWidth = awardElement.offsetWidth + 35; // Lebar kartu + gap
        if (awardWidth === 0) {
            console.warn('AwardRecognitionSection: awardWidth is 0, cannot auto slide.');
            return prevIndex;
        }

        const nextIndex = (prevIndex + 1);
        const scrollTarget = nextIndex * awardWidth;

        if (scrollTarget < container.scrollWidth - container.clientWidth + 10) { // +10 untuk toleransi kecil
            container.scroll({
                left: scrollTarget,
                behavior: 'smooth'
            });
        } else {
            // Jika sudah mencapai akhir, kembali ke awal
            container.scroll({
                left: 0,
                behavior: 'smooth'
            });
            return 0; // Kembali ke index 0
        }
        return nextIndex % finalAwards.length;
      });
    }, 3000);

    return () => clearInterval(slideInterval);
  }, [currentAwardIndex, enableSlider, finalAwards.length]);

  // Fungsi navigasi manual (panah)
  const navigateAwards = (direction) => {
    const container = awardsContainerRef.current;
    const awardElement = container ? container.firstElementChild : null;
    
    if (!enableSlider || !container || !awardElement) {
        console.warn('AwardRecognitionSection: Slider elements not ready for manual navigation.');
        return;
    }

    const awardWidth = awardElement.offsetWidth + 35; // Lebar kartu + gap

    if (awardWidth === 0) {
        console.warn('AwardRecognitionSection: awardWidth is 0, cannot navigate.');
        return;
    }

    if (direction === 'next') {
        container.scrollLeft += awardWidth;
        if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
            container.scroll({ left: 0, behavior: 'smooth' });
            setCurrentAwardIndex(0);
        } else {
            setCurrentAwardIndex(prevIndex => (prevIndex + 1) % finalAwards.length);
        }
    } else { // direction === 'prev'
        container.scrollLeft -= awardWidth;
        if (container.scrollLeft <= 10) {
            container.scroll({ left: container.scrollWidth, behavior: 'smooth' });
            setCurrentAwardIndex(finalAwards.length - 1);
        } else {
            setCurrentAwardIndex(prevIndex => (prevIndex - 1 + finalAwards.length) % finalAwards.length);
        }
    }
  };

  const handleMouseDown = (e) => {
    if (!enableSlider || !awardsContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - awardsContainerRef.current.offsetLeft);
    setScrollLeft(awardsContainerRef.current.scrollLeft);
    awardsContainerRef.current.style.cursor = 'grabbing';
    awardsContainerRef.current.style.scrollBehavior = 'auto'; // Nonaktifkan smooth scroll saat dragging
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !enableSlider || !awardsContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - awardsContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Faktor kecepatan geser
    awardsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    const container = awardsContainerRef.current;
    const awardElement = container ? container.firstElementChild : null;
    
    if (!enableSlider || !container || !awardElement) {
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
    const awardWidth = awardElement.offsetWidth + 35; // width + gap

    if (awardWidth === 0) return;

    const nearestAwardIndex = Math.round(currentScrollLeft / awardWidth);
    const targetScrollLeft = nearestAwardIndex * awardWidth;

    container.scroll({
        left: targetScrollLeft,
        behavior: 'smooth'
    });
    setCurrentAwardIndex(nearestAwardIndex % finalAwards.length);
  };

  const handleMouseLeave = () => {
    const container = awardsContainerRef.current;
    if (!enableSlider || !container) return;
    setIsDragging(false);
    container.style.cursor = 'grab';
    container.style.scrollBehavior = 'smooth';
  };

  return (
    <section className="award-section-background">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar konten */}
        <div className="award-content-wrapper">
          <div className="award-header">
            <h2 className="award-title">{data?.title || "Award & Recognition"}</h2>
            <p className="award-description">{data?.description || "Acknowledged nationally and globally for innovation in digital talent development."}</p>
          </div>
          <div className="slider-wrapper"> {/* Wrapper untuk slider dan panah */}
            {enableSlider && (
              <div className="slider-arrow left-arrow" onClick={() => navigateAwards('prev')}>
                <span>&lt;</span>
              </div>
            )}
            <div
              className="award-cards-container"
              ref={awardsContainerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              data-slider-enabled={enableSlider ? 'true' : 'false'}
            >
              {finalAwards.map((award, index) => (
                <div className="award-card" key={index}>
                  <img src={award.image} alt={award.title} className="award-trophy-image" />
                  <h3 className="award-card-title">{award.title}</h3>
                  <p className="award-card-subtitle">{award.subtitle}</p>
                  <p className="award-card-description">{award.description}</p>
                </div>
              ))}
            </div>
            {enableSlider && (
              <div className="slider-arrow right-arrow" onClick={() => navigateAwards('next')}>
                <span>&gt;</span>
              </div>
            )}
          </div>
          {enableSlider && (
              <div className="slider-dots">
                  {Array.from({ length: Math.ceil(finalAwards.length / 3) }).map((_, index) => (
                      <span key={index} className={`dot ${index === currentAwardIndex % Math.ceil(finalAwards.length / 3) ? 'active' : ''}`} onClick={() => {
                          const container = awardsContainerRef.current;
                          const awardElement = container ? container.firstElementChild : null;
                          if (container && awardElement) {
                              const awardWidth = awardElement.offsetWidth + 35; // Lebar kartu + gap
                              container.scroll({ left: index * awardWidth, behavior: 'smooth' });
                          }
                          setCurrentAwardIndex(index);
                      }}></span>
                  ))}
              </div>
          )}
        </div>
      </div>
      <style jsx="true">{`
          /* Award & Recognition Section Background */
          .award-section-background {
            display: flex; flex-direction: column; align-items: center; padding: 0; /* Padding diatur oleh .container */ gap: 10px;
            width: 100%;
            height: auto; min-height: 870px; background: #FFFFFF; box-sizing: border-box; margin-top: 50px;
            overflow: hidden; /* Penting untuk slider */
          }
          .award-section-background .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 83px 20px; /* Padding internal konsisten */ gap: 100px;
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            height: auto; box-sizing: border-box; margin: 0 auto;
          }

          /* Inner Container for Award & Recognition */
          .award-content-wrapper {
            display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 100px;
            width: 100%; max-width: 100%; height: auto; box-sizing: border-box;
          }

          .award-header {
            display: flex; flex-direction: row; align-items: flex-end; justify-content: space-between;
            width: 100%; height: auto; flex-wrap: wrap;
          }

          /* Award Title */
          .award-title {
            flex-grow: 1; max-width: 50%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 40px; line-height: 120%; color: #0C3766; margin: 0; text-align: left; flex-shrink: 0;
          }

          /* Award Description */
          .award-description {
            flex-grow: 1; max-width: 50%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500;
            font-size: 20px; line-height: 120%; text-align: right; color: #0C3766; margin: 0; flex-shrink: 0;
          }

          /* --- Slider Wrapper --- */
          .slider-wrapper {
              position: relative;
              width: 100%;
              overflow: hidden;
              margin-bottom: 0; /* Tidak ada margin bawah jika ada dots */
              display: flex;
              align-items: center;
              justify-content: center; /* Memusatkan kontainer kartu saat panah di luar */
          }
          /* Award Cards Container */
          .award-cards-container {
            display: flex; flex-direction: row; align-items: stretch; /* Memastikan kartu memiliki tinggi yang sama */
            padding: 0px; gap: 35px; /* **Diperbaiki**: Gap antar kartu */ width: 100%; height: auto; flex-wrap: nowrap; /* Penting untuk slider */
            overflow-x: auto; /* Mengizinkan scroll horizontal */
            scroll-snap-type: x mandatory; /* Kartu akan "snap" ke posisi */
            -webkit-overflow-scrolling: touch; /* Meningkatkan pengalaman scroll di iOS */
            cursor: grab; /* Kursor default saat tidak dragging */
            user-select: none; /* Mencegah teks terpilih saat dragging */
            padding-bottom: 0px; /* **Diperbaiki**: Hapus padding-bottom agar dots lebih dekat */
            scrollbar-width: none; /* **Diperbaiki**: Sembunyikan scrollbar untuk Firefox */
            -ms-overflow-style: none;  /* **Diperbaiki**: Sembunyikan scrollbar untuk IE and Edge */
          }
          /* Webkit browsers (Chrome, Safari) scrollbar */
          .award-cards-container::-webkit-scrollbar {
              display: none; /* **Diperbaiki**: Sembunyikan scrollbar untuk Webkit */
          }
          
          /* Individual Award Card */
          .award-card {
            flex: none; /* Mencegah kartu mengecil/membesar */
            width: calc((100% / 3) - 23.33px); /* **Diperbaiki**: 3 kartu per baris dengan gap 35px */
            min-width: 300px; /* Minimal lebar kartu agar tidak terlalu kecil */
            background: #F0F0F0; border-radius: 20px; /* **Diperbaiki**: Sudut membulat */ box-sizing: border-box; text-align: center;
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
            display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
            padding: 20px; gap: 15px; /* Jarak internal kartu */
            height: auto; min-height: 556px; /* Menyesuaikan tinggi agar tidak memotong konten */
            scroll-snap-align: start; /* Kartu akan snap ke awal saat di-scroll */
            transition: width 0.3s ease, flex 0.3s ease, max-width 0.3s ease;
          }

          .award-trophy-image {
            width: 100%; max-width: 200px; height: auto; margin-bottom: 10px; object-fit: contain;
          }

          /* Award Card Title */
          .award-card-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 24px;
            line-height: 117%; color: #0A0A0A; margin: 0; text-align: center; word-break: break-word;
          }

          /* Award Card Subtitle */
          .award-card-subtitle {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 18px; line-height: 133%; color: #0A0A0A; margin: 0; text-align: center; word-break: break-word;
          }

          /* Award Card Description */
          .award-card-description {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 400;
            font-size: 14px; line-height: 143%; color: #0A0A0A; margin: 0; text-align: center; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; /* Batasi baris */ word-break: break-word;
          }

          /* --- Slider Arrows (mirip WhyWeExist/OurProduct) --- */
          .slider-arrow {
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
              background-color: rgba(12, 55, 102, 0.7); /* Biru gelap transparan */
              color: white;
              border-radius: 50%;
              width: 40px;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
              cursor: pointer;
              z-index: 10;
              font-size: 24px;
              user-select: none;
              transition: background-color 0.3s ease;
          }
          .slider-arrow:hover {
              background-color: #0C3766; /* Biru lebih gelap saat hover */
          }
          .slider-arrow.left-arrow { left: -50px; } /* Pindahkan panah ke luar container utama */
          .slider-arrow.right-arrow { right: -50px; } /* Pindahkan panah ke luar container utama */

          /* --- Slider Dots (mirip WhyWeExist/OurProduct) --- */
          .slider-dots { display: flex; gap: 8px; margin-top: 10px; /* **Diperbaiki**: Mengurangi margin-top */ justify-content: center; }
          .dot { width: 10px; height: 10px; background: rgba(12, 55, 102, 0.3); border-radius: 50%; cursor: pointer; transition: background 0.3s ease; }
          .dot.active { background: #0C3766; } /* Dot aktif */


          /* Gaya untuk layout non-slider (jika kurang dari 4 kotak) */
          .award-cards-container[data-slider-enabled='false'] {
              overflow-x: hidden;
              scroll-snap-type: none;
              cursor: default;
              justify-content: center; /* Pusatkan item */
              flex-wrap: wrap; /* Izinkan wrap */
          }
          .award-cards-container[data-slider-enabled='false'] .award-card {
              flex: 1; /* Biarkan flex untuk mendistribusikan ruang */
              max-width: calc(100% / 3); /* Max lebar untuk 3 kartu */
              width: auto; /* Otomatis */
              scroll-snap-align: none; /* Nonaktifkan snap */
              min-height: auto; /* Izinkan tinggi menyesuaikan konten */
          }


          /* Responsive Adjustments for Award Section */
          @media (max-width: 1200px) {
            .award-section-background .container { padding: 60px 30px; min-height: auto; }
            .award-content-wrapper { gap: 60px; }
            .award-header { flex-direction: column; align-items: center; text-align: center; gap: 20px; }
            .award-title, .award-description { width: 100%; max-width: 100%; text-align: center; font-size: 36px; }
            .award-description { font-size: 18px; }
            .award-cards-container { justify-content: center; gap: 25px; }
            .award-card { flex-basis: calc(50% - 17.5px); /* 2 kartu per baris di tablet */ min-height: 450px; border-radius: 15px; }
            .award-card-title { font-size: 22px; } .award-card-subtitle { font-size: 16px; } .award-card-description { font-size: 13px; }
            .slider-arrow.left-arrow { left: 5px; } /* Masukkan panah ke dalam view */
            .slider-arrow.right-arrow { right: 5px; } /* Masukkan panah ke dalam view */
          }

          @media (max-width: 768px) {
            .award-section-background .container { padding: 40px 20px; }
            .award-content-wrapper { gap: 40px; }
            .award-title { font-size: 30px; } .award-description { font-size: 16px; }
            .award-cards-container { flex-direction: row; /* Tetap row untuk slider */ gap: 20px; }
            .award-card { flex-basis: 90%; /* 1 kartu per baris di mobile, isi hampir penuh */ width: 100%; min-height: 380px; padding: 15px; border-radius: 10px; }
            .award-cards-container[data-slider-enabled='false'] .award-card { /* Pastikan untuk non-slider juga 1 kolom */
                width: 100%;
                max-width: 380px; /* Batasan maksimum untuk ponsel */
            }
            .award-trophy-image { max-width: 150px; }
            .award-card-title { font-size: 20px; } .award-card-subtitle { font-size: 14px; } .award-card-description { font-size: 12px; }
            .slider-arrow { width: 30px; height: 30px; font-size: 18px; }
          }

          @media (max-width: 480px) {
            .award-section-background .container { padding: 30px 15px; }
            .award-content-wrapper { gap: 30px; }
            .award-title { font-size: 24px; } .award-description { font-size: 14px; }
            .award-cards-container { gap: 15px; }
            .award-card { min-height: 320px; padding: 15px; border-radius: 8px; }
            .award-trophy-image { max-width: 120px; }
            .award-card-title { font-size: 18px; } .award-card-subtitle { font-size: 13px; } .award-card-description { font-size: 11px; }
            .slider-arrow { display: none; } /* Panah bisa disembunyikan di ponsel sangat kecil */
          }
        `}
      </style>
    </section>
  );
}

// Komponen untuk bagian Our Partners
const OurPartnersSection = ({ data }) => {
  const partnersContainerRef = useRef(null); // Ref untuk container slider partner
  // Tidak perlu isDragging, startX, scrollLeft karena ini hanya marquee otomatis.
  // Jika ingin drag/swipe, tambahkan state dan handler seperti di AwardRecognitionSection.
  
  // Mengambil data partner dari prop atau menggunakan fallback
  const partnerLogos = [];
  if (data) {
    for (let i = 0; i < 20; i++) { // Asumsi max 20 partner
      const partner = {
        src: data[`partner_${i}_src`],
        alt: data[`partner_${i}_alt`],
        name: data[`partner_${i}_name`],
      };
      if (partner.src) { // Partner dianggap valid jika ada src
        partnerLogos.push(partner);
      } else {
        break;
      }
    }
  }

  const finalPartnerLogos = partnerLogos.length > 0 ? partnerLogos : [ // Fallback jika data dari backend kosong/tidak lengkap
    { src: 'src/assets/kemenham.png', alt: 'KEMENHAM (Default 1)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-2.png', alt: 'Partner Logo 2 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-3.png', alt: 'Partner Logo 3 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-4.png', alt: 'Partner Logo 4 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-5.png', alt: 'Partner Logo 5 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-6.png', alt: 'Partner Logo 6 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-7.png', alt: 'Partner Logo 7 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-8.png', alt: 'Partner Logo 8 (Default)', name: 'Logo name' },
    { src: 'src/assets/partner-logo-9.png', alt: 'Partner Logo 9 (Default)', name: 'Logo name' },
  ];

  // Hitung durasi animasi secara dinamis berdasarkan jumlah logo
  // PERUBAHAN: Jika ada kurang dari 4 logo, jangan animasikan (agar tidak duplikasi dan terlihat statis)
  const enableMarquee = finalPartnerLogos.length >= 4; // Aktifkan marquee jika 4 logo atau lebih
  const animationDuration = enableMarquee ? finalPartnerLogos.length * 3 : 0; // Durasi animasi, 0 jika tidak marquee

  return (
    <section className="our-partners-section-background">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="our-partners-content-wrapper">
          <h2 className="our-partners-title">{data?.title || "Our Partners"}</h2>
          <p className="our-partners-description">{data?.description || "Our ecosystem is made possible by collaboration with government agencies, industries, academic institutions, NGOs, and communities."}</p>
          <div className="partners-logo-container">
            {/* Menerapkan animationDuration melalui properti style untuk variabel CSS */}
            <div
              className="partners-logo-track"
              ref={partnersContainerRef} // Ref untuk kontainer marquee
              style={{ '--animation-duration': `${animationDuration}s`, animationPlayState: enableMarquee ? 'running' : 'paused' }} // Kontrol animasi
            >
              {finalPartnerLogos.map((logo, index) => (
                <div className="partner-logo-item" key={`original-${index}`}>
                  <img src={logo.src} alt={logo.alt} className="partner-logo-image" />
                  <p className="partner-logo-name">{logo.name}</p>
                </div>
              ))}
              {/* Duplikasi logo hanya jika marquee diaktifkan */}
              {enableMarquee && finalPartnerLogos.map((logo, index) => (
                <div className="partner-logo-item" key={`duplicate-${index}`}>
                  <img src={logo.src} alt={logo.alt} className="partner-logo-image" />
                  <p className="partner-logo-name">{logo.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* Our Partners Section Background */
          .our-partners-section-background {
            display: flex; flex-direction: column; align-items: center; padding: 0; /* Padding diatur oleh .container */ gap: 10px;
            width: 100%;
            height: auto; min-height: 600px;
            background: #D1E2F5; box-sizing: border-box; margin-top: 50px; overflow: hidden;
          }
          .our-partners-section-background .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 155px 20px; /* Padding internal konsisten */ gap: 64px; /* Disesuaikan agar lebih dekat */
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            height: auto; box-sizing: border-box; margin: 0 auto;
          }

          /* Inner Container for Our Partners */
          .our-partners-content-wrapper {
            display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 64px;
            width: 100%; max-width: 100%; height: auto; box-sizing: border-box;
          }

          /* Our Partners Title */
          .our-partners-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 40px; line-height: 120%; text-align: center; color: #196ECD; margin: 0;
          }

          /* Our Partners Description */
          .our-partners-description {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 400;
            font-size: 20px; line-height: 120%; text-align: center; color: #196ECD; margin: 0;
          }

          /* Partners Logo Container for Marquee Effect */
          .partners-logo-container {
            width: 100%;
            overflow: hidden; /* **Diperbaiki**: Sembunyikan scrollbar bawaan */
            white-space: nowrap;
            box-sizing: border-box;
            /* Tambahkan properti untuk menyembunyikan scrollbar */
            scrollbar-width: none; /* For Firefox */
            -ms-overflow-style: none;  /* For IE and Edge */
          }
          .partners-logo-container::-webkit-scrollbar {
            display: none; /* For Chrome, Safari, and Opera */
          }

          /* Partners Logo Track for Animation */
          .partners-logo-track {
            display: inline-flex;
            animation: marquee var(--animation-duration) linear infinite;
            padding: 0; margin: 0;
            gap: 38px;
            min-width: fit-content;
            /* Ensure it does not wrap */
            white-space: nowrap;
          }

          /* Marquee Animation Keyframes */
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          /* Pause animation on hover for accessibility */
          .partners-logo-container:hover .partners-logo-track {
            animation-play-state: paused;
          }

          /* Individual Partner Logo Item */
          .partner-logo-item {
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            flex-shrink: 0; width: 110px; height: 110px;
            background: #FFFFFF; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.05);
            box-sizing: border-box; vertical-align: middle;
          }

          .partner-logo-image {
            max-width: 80%; max-height: 80%; height: auto;
          }

          .partner-logo-name {
            font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 14px; color: #196ECD;
            margin-top: 5px; text-align: center; display: none; /* Sembunyikan nama logo secara default */
          }

          /* Responsive Adjustments */
          @media (max-width: 1200px) {
            .our-partners-section-background .container { padding: 100px 30px; min-height: auto; }
            .our-partners-content-wrapper { gap: 40px; }
            .our-partners-title { font-size: 36px; } .our-partners-description { font-size: 18px; }
            .partners-logo-track { gap: 25px; }
            .partner-logo-item { width: 90px; height: 90px; }
          }

          @media (max-width: 768px) {
            .our-partners-section-background .container { padding: 60px 20px; }
            .our-partners-content-wrapper { gap: 30px; }
            .our-partners-title { font-size: 30px; } .our-partners-description { font-size: 16px; }
            .partners-logo-track { gap: 20px; }
            .partner-logo-item { width: 70px; height: 70px; }
          }

          @media (max-width: 480px) {
            .our-partners-section-background .container { padding: 40px 15px; }
            .our-partners-content-wrapper { gap: 20px; }
            .our-partners-title { font-size: 24px; } .our-partners-description { font-size: 14px; }
            .partners-logo-track { gap: 15px; }
            .partner-logo-item { width: 60px; height: 60px; }
            .partner-logo-name { font-size: 12px; }
          }
        `}
      </style>
    </section>
  );
}

// Komponen untuk bagian Testimoni
const TestimonialSection = ({ data }) => { // Menerima data dari prop
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null) // Untuk Testimonial Section

  // Mengambil data testimoni dari prop atau menggunakan fallback
  // Pola: testimonial_0_quoteIcon, testimonial_0_text, testimonial_0_name
  const testimonials = [];
  if (data) {
    for (let i = 0; i < 20; i++) { // Asumsi max 20 testimoni
      const testimonial = {
        quoteIcon: data[`testimonial_${i}_quoteIcon`],
        text: data[`testimonial_${i}_text`],
        name: data[`testimonial_${i}_name`],
      };
      if (testimonial.text && testimonial.name) { // Testimoni dianggap valid jika ada teks dan nama
        testimonials.push(testimonial);
      } else {
        break;
      }
    }
  }

  const finalTestimonials = testimonials.length > 0 ? testimonials : [ // Fallback jika data dari backend kosong/tidak lengkap
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 1 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 2 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 3 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 4 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 5 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 6 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 7 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 8 (Default)" },
    { quoteIcon: "src/assets/quot.png", text: "Lorem ipsum dolor sit amet consectetur. Elementum nisl duis tortor sed. Suspendisse lobortis vitae quis vehicula pellentesque sit id.", name: "Name 9 (Default)" },
  ];

  const totalSlides = Math.ceil(finalTestimonials.length / 3) // Hitung total slide berdasarkan finalTestimonials

  // Auto slide functionality
  useEffect(() => {
    if (totalSlides > 1) { // Hanya aktifkan jika ada lebih dari 1 slide
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [currentSlide, totalSlides]); // currentSlide ditambahkan untuk re-run effect saat slide berubah

  const handleDotClick = (index) => {
    setCurrentSlide(index)
  }

  return (
    <section className="testimonial-section-outer">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="testimonial-box">
          <div className="testimonial-content-wrapper">
            <h2 className="testimonial-title">{data?.title || "Testimonials"}</h2>
            <div className="testimonial-cards-container">
              <div className="testimonial-cards-track" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                {/* Pastikan menggunakan finalTestimonials */}
                {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                  <div className="testimonial-slide" key={slideIndex}>
                    {finalTestimonials.slice(slideIndex * 3, (slideIndex + 1) * 3).map((testimonial, index) => (
                      <div className="testimonial-card" key={slideIndex * 3 + index}>
                        <img src={testimonial.quoteIcon || "/placeholder.svg"} alt="Quote Icon" className="quote-icon" />
                        <p className="testimonial-text">{testimonial.text}</p>
                        <p className="testimonial-name">{testimonial.name}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Dots */}
            <div className="testimonial-dots">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  className={`testimonial-dot ${index === currentSlide ? "active" : ""}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
/* Reset dan Base */
* {
  box-sizing: border-box;
}

/* Testimonial Section Outer Background */
.testimonial-section-outer {
  display: flex; justify-content: center; align-items: center; padding: 0; /* Padding diatur oleh .container */
  width: 100%; min-height: 100vh; background: #D1E2F5; box-sizing: border-box;
}
.testimonial-section-outer .container { /* Kontainer internal untuk membatasi lebar konten */
  display: flex; flex-direction: column; align-items: center; padding: 80px 20px; /* Padding internal konsisten */ gap: 50px;
  width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
  box-sizing: border-box; margin: 0 auto;
}

/* Testimonial Box (White Box inside) */
.testimonial-box {
  display: flex; flex-direction: column; align-items: center;
  justify-content: center; padding: 80px 60px;
  width: 100%; max-width: 100%; /* Lebar diatur oleh parent .container */ background: #FFFFFF;
  border-radius: 20px; box-sizing: border-box; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

/* Testimonial Content Wrapper */
.testimonial-content-wrapper {
  display: flex; flex-direction: column; align-items: center; gap: 60px;
  width: 100%; max-width: 1200px; /* Kontrol lebar konten slider di sini */
}

/* Testimonial Title */
.testimonial-title {
  font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 40px; text-align: center;
  color: #0C3766; margin: 0; padding: 0;
}

/* Testimonial Cards Container */
.testimonial-cards-container {
  width: 100%; /* Mengisi lebar content-wrapper */ max-width: 1148px; /* Batasan maksimum dari Figma, bisa jadi masalah */
  overflow: hidden; position: relative;
}

/* Testimonial Cards Track */
.testimonial-cards-track {
  display: flex;
  transition: transform 0.6s ease-in-out;
  width: 100%; /* Mengisi lebar container */
}

/* Individual Slide Container */
.testimonial-slide {
  display: flex; flex-direction: row; align-items: stretch; /* **Diperbaiki**: Menjaga tinggi kartu sama */ padding: 0px; gap: 30px; /* Jarak antar kartu */
  min-width: 100%; /* Setiap slide mengambil 100% lebar container */
  width: 100%; /* Mengisi min-width */ height: auto; flex-shrink: 0; justify-content: center;
}

/* Individual Testimonial Card */
.testimonial-card {
  display: flex; flex-direction: column; justify-content: space-between; padding: 25px; gap: 12px;
  width: calc((100% / 3) - 20px); /* **Diperbaiki**: 3 kartu per slide dengan gap */
  height: auto; min-height: 234px; /* Tinggi minimum, akan menyesuaikan */
  background: #0C3766; border-radius: 12px; color: #FFFFFF; flex: none; align-self: stretch; /* Memastikan tinggi sama */
  flex-grow: 1; box-shadow: 0 4px 12px rgba(12, 55, 102, 0.2); overflow: hidden;
}

.quote-icon {
  width: 28px; height: 28px; flex-shrink: 0;
}

.testimonial-text {
  font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 14px; line-height: 1.4;
  color: #FFFFFF; margin: 0; flex: 1; overflow: hidden; display: -webkit-box;
  -webkit-line-clamp: 4; -webkit-box-orient: vertical;
}

.testimonial-name {
  font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 16px; color: #FFFFFF;
  margin: 0; flex-shrink: 0; margin-top: auto;
}

/* Navigation Dots */
.testimonial-dots {
  display: flex; gap: 16px; justify-content: center; align-items: center;
}

.testimonial-dot {
  width: 14px; height: 14px; border-radius: 50%; border: 2px solid #0C3766;
  background: transparent; cursor: pointer; transition: all 0.3s ease; padding: 0; outline: none;
}

.testimonial-dot:hover {
  transform: scale(1.2); border-width: 3px;
}

.testimonial-dot.active {
  background: #0C3766;
}

/* Responsive Design */
@media (max-width: 1400px) {
  .testimonial-cards-container { width: 100%; max-width: 1000px; }
  .testimonial-slide { width: 100%; height: auto; gap: 25px; padding: 0 15px; }
  .testimonial-card { width: calc((100% - 50px) / 3); height: 220px; padding: 25px; }
  .testimonial-text { font-size: 13px; -webkit-line-clamp: 3; }
  .testimonial-name { font-size: 15px; }
}

@media (max-width: 1200px) {
  .testimonial-section-outer .container { padding: 50px 25px; min-height: auto; }
  .testimonial-box { padding: 50px 30px; max-width: 1000px; }
  .testimonial-content-wrapper { gap: 50px; }
  .testimonial-title { font-size: 36px; }
  .testimonial-cards-container { max-width: 100%; }
  .testimonial-slide { gap: 20px; }
  .testimonial-card { width: calc((100% / 2) - 10px); /* **Diperbaiki**: 2 kartu per slide di tablet */ min-height: 200px; padding: 20px; }
  .testimonial-text { font-size: 13px; -webkit-line-clamp: 3; }
  .testimonial-name { font-size: 14px; }
}

@media (max-width: 992px) {
  .testimonial-section-outer .container { padding: 40px 20px; }
  .testimonial-box { padding: 40px 25px; }
  .testimonial-content-wrapper { gap: 40px; }
  .testimonial-title { font-size: 32px; }
  .testimonial-cards-container { width: 100%; max-width: 700px; }
  .testimonial-slide { gap: 15px; }
  .testimonial-card { width: calc((100% / 2) - 7.5px); /* Sesuaikan gap */ min-height: 180px; padding: 18px; }
  .testimonial-text { font-size: 12px; }
  .testimonial-name { font-size: 13px; }
  .quote-icon { width: 24px; height: 24px; }
}

@media (max-width: 768px) {
  .testimonial-section-outer .container { padding: 40px 20px; }
  .testimonial-box { padding: 35px 20px; }
  .testimonial-content-wrapper { gap: 35px; }
  .testimonial-title { font-size: 28px; }
  .testimonial-cards-container { width: 100%; max-width: 100%; }
  .testimonial-slide {
    flex-direction: column; /* **Diperbaiki**: 1 kolom di mobile */
    align-items: center;
    gap: 20px; /* **Diperbaiki**: Jarak antar kartu di mobile */
    width: 100%; height: auto;
  }
  .testimonial-card {
    width: 100%; /* **Diperbaiki**: 100% lebar di mobile */
    max-width: 400px; /* Batasi lebar maksimum */
    height: auto; min-height: 180px; padding: 25px;
  }
  .testimonial-text {
    font-size: 15px;
    line-height: 1.4;
    -webkit-line-clamp: unset; /* Hapus batasan baris di mobile */
    display: block;
  }
  .testimonial-name { font-size: 17px; }
  .testimonial-dots { gap: 15px; margin-top: 10px; }
  .testimonial-dot { width: 14px; height: 14px; }
}

@media (max-width: 480px) {
  .testimonial-section-outer .container { padding: 30px 15px; }
  .testimonial-box { padding: 25px 15px; border-radius: 15px; }
  .testimonial-content-wrapper { gap: 30px; }
  .testimonial-title { font-size: 24px; }
  .testimonial-slide { gap: 15px; }
  .testimonial-card { max-width: 100%; min-height: 160px; padding: 20px; border-radius: 8px; }
  .testimonial-text { font-size: 14px; line-height: 1.3; }
  .testimonial-name { font-size: 16px; }
  .quote-icon { width: 25px; height: 25px; }
  .testimonial-dots { gap: 12px; }
  .testimonial-dot { width: 12px; height: 12px; }
}

@media (max-width: 360px) {
  .testimonial-section-outer .container { padding: 25px 10px; }
  .testimonial-box { padding: 20px 12px; }
  .testimonial-title { font-size: 22px; }
  .testimonial-card { padding: 18px; min-height: 150px; }
  .testimonial-text { font-size: 13px; }
  .testimonial-name { font-size: 15px; }
}
`}
      </style>
    </section>
  );
}

// Komponen untuk bagian FAQ (Frequently Asked Questions)
function FAQSection({ data }) { // PENTING: Menerima prop data
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  // Mengambil data FAQ dari prop atau menggunakan fallback
  // Pola: faq_0_question, faq_0_answer
  const faqs = [];
  if (data) {
    for (let i = 0; i < 20; i++) { // Asumsi max 20 FAQ
      const faq = {
        question: data[`faq_${i}_question`],
        answer: data[`faq_${i}_answer`],
      };
      if (faq.question && faq.answer) { // FAQ dianggap valid jika ada pertanyaan dan jawaban
        faqs.push(faq);
      } else {
        break;
      }
    }
  }

  const finalFaqs = faqs.length > 0 ? faqs : [ // Fallback jika data dari backend kosong/tidak lengkap
    { question: 'Apa itu Testimoni?', answer: 'Testimoni adalah pernyataan atau rekomendasi tentang kualitas, manfaat, atau kinerja suatu produk, layanan, atau individu, biasanya diberikan oleh pelanggan atau pengguna yang puas.' },
    { question: 'Bagaimana cara menambahkan testimoni?', answer: 'Anda dapat menambahkan testimoni dengan menghubungi tim kami melalui formulir kontak atau email yang tersedia di situs web. Kami akan dengan senang hati membantu Anda.' },
    { question: 'Apakah testimoni bisa diedit?', answer: 'Untuk menjaga integritas, testimoni yang sudah dipublikasikan biasanya tidak dapat diedit secara langsung oleh pengguna. Namun, Anda dapat menghubungi kami jika ada koreksi yang perlu dilakukan.' },
    { question: 'Apakah ada batasan panjang testimoni?', answer: 'Kami merekomendasikan testimoni yang ringkas namun informatif, sekitar 50-150 kata, agar mudah dibaca oleh pengunjung lain. Namun, tidak ada batasan ketat.' },
    { question: 'Bagaimana jika saya ingin menghapus testimoni?', answer: 'Jika Anda ingin menghapus testimoni, silakan kirimkan permintaan kepada kami melalui email yang terdaftar. Kami akan memproses permintaan Anda sesegera mungkin.' },
  ];

  const toggleFAQ = (index) => {
    setOpenFAQIndex(openFAQIndex === index ? null : index);
  };

  return (
    <section className="faq-section-outer">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="faq-content-wrapper">
          <h2 className="faq-title">{data?.title || "Frequently Asked Questions"}</h2> {/* Judul FAQ dari data */}
          <div className="faq-items-container">
            {finalFaqs.map((faq, index) => ( // Gunakan finalFaqs
              <div key={index} className="faq-item-group">
                <div
                  className={`faq-question-box ${openFAQIndex === index ? 'open' : ''}`}
                  onClick={() => toggleFAQ(index)}
                >
                  <p className="faq-question-text">{faq.question}</p>
                  <span className="faq-toggle-icon">
                    {openFAQIndex === index ? '-' : '+'}
                  </span>
                </div>
                {openFAQIndex === index && (
                  <div className="faq-answer-box">
                    <p className="faq-answer-text">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* FAQ Section Outer Background */
          .faq-section-outer {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0; /* Padding diatur oleh .container */
            gap: 10px;
            width: 100%;
            height: auto;
            min-height: 846px; /* Minimum height as per Figma */
            background: #FFFFFF; /* White background */
            box-sizing: border-box;
            margin-top: 50px; /* Spasi dari bagian sebelumnya */
          }
          .faq-section-outer .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 112px 20px; /* Padding internal konsisten */
            gap: 34px; /* Spasi antara judul dan item FAQ */
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            box-sizing: border-box; margin: 0 auto;
          }

          /* Inner Container for FAQ */
          .faq-content-wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 0px;
            gap: 34px; /* Spasi antara judul dan item FAQ */
            width: 100%;
            max-width: 948px; /* Lebar maksimum wadah dalam */
            height: auto;
            box-sizing: border-box;
          }

          /* FAQ Title */
          .faq-title {
            width: 100%;
            height: auto;
            font-family: 'Poppins', sans-serif;
            font-style: normal;
            font-weight: 600;
            font-size: 40px;
            line-height: 120%;
            text-align: center;
            color: #155CAB; /* Primary/pr/Hover */
            margin: 0;
          }

          /* Container for all FAQ items */
          .faq-items-container {
            display: flex;
            flex-direction: column;
            gap: 15px; /* Spasi antara kelompok item FAQ individu */
            width: 100%;
          }

          /* Individual FAQ item group (question + answer) */
          .faq-item-group {
            width: 100%;
          }

          /* FAQ Question Box */
          .faq-question-box {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            padding: 20px 30px;
            width: 100%;
            height: auto; /* **Diperbaiki**: Tinggi otomatis untuk responsivitas teks */ min-height: 68px; /* Tinggi minimum */
            background: #155CAB; /* Primary/pr/Hover */
            border-radius: 15px;
            cursor: pointer;
            box-sizing: border-box;
            color: #FFFFFF;
            font-family: 'Poppins', sans-serif;
            font-size: 18px;
            font-weight: 500;
            transition: border-radius 0.3s ease; /* Transisi halus untuk border-radius */
          }

          .faq-question-box.open {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }

          .faq-question-text {
            margin: 0;
            flex-grow: 1;
            text-align: left;
          }

          .faq-toggle-icon {
            font-size: 24px;
            font-weight: bold;
            margin-left: 20px;
            flex-shrink: 0;
          }

          /* FAQ Answer Box */
          .faq-answer-box {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            padding: 20px 30px;
            width: 100%;
            background: #D1E2F5; /* Primary/pr/Surface */
            border-radius: 0px 0px 15px 15px;
            box-sizing: border-box;
            color: #0C3766; /* Warna teks untuk jawaban */
            font-family: 'Poppins', sans-serif;
            font-size: 16px;
            line-height: 150%;
            animation: fadeIn 0.3s ease-out; /* Animasi fade in untuk jawaban */
          }

          .faq-answer-text {
            margin: 0;
            text-align: left;
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Responsive Adjustments */
          @media (max-width: 1200px) {
            .faq-section-outer .container { padding: 80px 30px; min-height: auto; }
            .faq-content-wrapper { gap: 25px; }
            .faq-title { font-size: 36px; }
            .faq-question-box { height: auto; }
            .faq-question-text { font-size: 16px; }
            .faq-answer-box { padding: 15px 25px; }
            .faq-answer-text { font-size: 14px; }
          }

          @media (max-width: 768px) {
            .faq-section-outer .container { padding: 50px 20px; }
            .faq-content-wrapper { gap: 20px; }
            .faq-title { font-size: 30px; }
            .faq-question-box { padding: 15px 20px; }
            .faq-question-text { font-size: 15px; }
            .faq-toggle-icon { font-size: 20px; }
            .faq-answer-box { padding: 12px 20px; }
            .faq-answer-text { font-size: 13px; }
          }

          @media (max-width: 480px) {
            .faq-section-outer .container { padding: 30px 15px; }
            .faq-content-wrapper { gap: 15px; }
            .faq-title { font-size: 24px; }
            .faq-question-box { padding: 10px 15px; }
            .faq-question-text { font-size: 14px; }
            .faq-toggle-icon { font-size: 18px; }
            .faq-answer-box { padding: 10px 15px; }
            .faq-answer-text { font-size: 12px; }
          }
        `}
      </style>
    </section>
  );
}