import React, { useState, useEffect, useRef } from 'react';
import apiClient from './api'; // Import instance Axios

const LandingPage = () => {
  console.log('LandingPage component rendered');

  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchPageContent = async () => {
      console.log('Fetching page content...');
      try {
        setLoading(true);
        const response = await apiClient.get('/pages/home');
        setPageContent(response.data);
        setLoading(false);
        console.log('API Response data:', response.data);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching home page content:", err);
      }
    };
    fetchPageContent();
  }, []);

  useEffect(() => {
    console.log('Slider useEffect running.');
    if (!loading && !error && pageContent) {
      console.log('Slider conditions met. PageContent:', pageContent);
      const heroSectionData = pageContent.sections.find(sec => sec.section_name === 'hero_section')?.content;
      const fetchedSliderImages = [];
      if (heroSectionData) {
        for (let i = 0; i < 10; i++) {
          const key = `slider_image_${i}`;
          if (heroSectionData[key]) {
            fetchedSliderImages.push(heroSectionData[key]);
          } else {
            break;
          }
        }
      }
      const currentSliderImages = fetchedSliderImages.length > 0 ? fetchedSliderImages : [
        'src/assets/landingpage.png', 'src/assets/landingpage2.png',
        'src/assets/landingpage3.png', 'src/assets/landingpage4.png',
      ];

      console.log('Slider images for effect (fetched):', fetchedSliderImages);
      console.log('Slider images for effect (final):', currentSliderImages);

      if (currentSliderImages.length > 1) {
        console.log('Slider has enough images, starting interval.');
        const slideInterval = setInterval(() => {
          setCurrentImageIndex((prevIndex) =>
            (prevIndex + 1) % currentSliderImages.length
          );
        }, 5000);
        return () => clearInterval(slideInterval);
      } else {
        console.log('Slider does NOT have enough images (<=1):', currentSliderImages.length);
        setCurrentImageIndex(0);
      }
    }
  }, [currentImageIndex, loading, error, pageContent]);

  const navigateSlider = (direction) => {
    console.log('navigateSlider called with direction:', direction);
    const heroSectionData = pageContent?.sections.find(sec => sec.section_name === 'hero_section')?.content;
    const fetchedSliderImages = [];
    if (heroSectionData) {
      for (let i = 0; i < 10; i++) {
        const key = `slider_image_${i}`;
        if (heroSectionData[key]) {
          fetchedSliderImages.push(heroSectionData[key]);
        } else {
          break;
        }
      }
    }
    const currentSliderImages = fetchedSliderImages.length > 0 ? fetchedSliderImages : [
      'src/assets/landingpage.png', 'src/assets/landingpage2.png',
      'src/assets/landingpage3.png', 'src/assets/landingpage4.png',
    ];

    if (currentSliderImages.length <= 1) {
      console.warn('Slider navigation disabled: Not enough images.');
      return;
    }

    setCurrentImageIndex((prevIndex) => {
      if (direction === 'next') {
        return (prevIndex + 1) % currentSliderImages.length;
      } else {
        return (prevIndex - 1 + currentSliderImages.length) % currentSliderImages.length;
      }
    });
  };

  const goToSlide = (index) => {
    console.log('goToSlide called with index:', index);
    const heroSectionData = pageContent?.sections.find(sec => sec.section_name === 'hero_section')?.content;
    const fetchedSliderImages = [];
    if (heroSectionData) {
      for (let i = 0; i < 10; i++) {
        const key = `slider_image_${i}`;
        if (heroSectionData[key]) {
          fetchedSliderImages.push(heroSectionData[key]);
        } else {
          break;
        }
      }
    }
    const currentSliderImages = fetchedSliderImages.length > 0 ? fetchedSliderImages : [
      'src/assets/landingpage.png', 'src/assets/landingpage2.png',
      'src/assets/landingpage3.png', 'src/assets/landingpage4.png',
    ];

    if (index >= 0 && index < currentSliderImages.length) {
      setCurrentImageIndex(index);
    } else {
      console.warn('Invalid slide index:', index);
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading website content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for Home page. Please add sections via admin dashboard.</div>;

  const getSectionContent = (sectionName) => {
    return pageContent.sections.find(sec => sec.section_name === sectionName)?.content;
  };

  const heroSectionData = getSectionContent('hero_section');
  const whyWeExistSectionData = getSectionContent('why_we_exist_section');
  const ourProductSectionData = getSectionContent('our_product_section');
  const awardRecognitionSectionData = getSectionContent('award_recognition_section');
  const contactUsSectionData = getSectionContent('contact_us_section');

  const fetchedSliderImagesForRender = [];
  if (heroSectionData) {
    for (let i = 0; i < 10; i++) {
      const key = `slider_image_${i}`;
      if (heroSectionData[key]) {
        fetchedSliderImagesForRender.push(heroSectionData[key]);
      } else {
        break;
      }
    }
  }
  const sliderImagesForRender = fetchedSliderImagesForRender.length > 0 ? fetchedSliderImagesForRender : [
    'src/assets/landingpage.png', 'src/assets/landingpage2.png',
    'src/assets/landingpage3.png', 'src/assets/landingpage4.png',
  ];
  console.log('Slider images for render:', sliderImagesForRender);

  return (
    <div className="landing-page-windowed-container">
      <div className="landing-page-content-wrapper">
        <main className="main-section">
          <div className="content-wrapper">
            <div className="text-section">
              <h1 className="main-heading">{heroSectionData?.main_heading || "Build Your Digital Future Here"}</h1>
            </div>
            <div className="image-slider-section">
              <div className="image-display">
                <img src={sliderImagesForRender[currentImageIndex]} alt="Digital Future" className="main-image" />
                {/* Panah dihapus dari render JSX */}
              </div>
              <div className="slider-dots">
                {sliderImagesForRender.map((_, index) => (
                  <span key={index} className={`dot ${index === currentImageIndex ? 'active' : ''}`} onClick={() => goToSlide(index)}></span>
                ))}
              </div>
            </div>
          </div>
        </main>

        {whyWeExistSectionData && (<WhyWeExist data={whyWeExistSectionData} />)}
        {ourProductSectionData && (<OurProduct data={ourProductSectionData} />)}
        {awardRecognitionSectionData && (<AwardRecognition data={awardRecognitionSectionData} />)}
        {contactUsSectionData && (<ContactUs data={contactUsSectionData} />)}
      </div>

      {/* === Global Styles for Homepage (Adjusted for windowed effect) === */}
      <style jsx="true">{`
        /* GLOBAL RESET & BODY */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body, html {
            overflow-x: hidden; /* Sembunyikan scroll horizontal */
            width: 100%;
            background-color: #f0f0f0; /* Contoh warna background di luar jendela */
            font-family: 'Poppins', sans-serif;
        }

        .landing-page-windowed-container { /* Container paling luar untuk efek windowed */
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center; /* Pusat konten horizontal */
            background-color: #f0f0f0; /* Pastikan background terlihat */
            overflow-x: hidden; /* Sembunyikan overflow di sini juga */
        }

        .landing-page-content-wrapper { /* Wrapper untuk konten utama yang dibatasi lebarnya */
            width: 100%;
            max-width: 1200px; /* Lebar maksimum konten */
            margin: 0 auto; /* Otomatis tengah */
            background-color: #FFFFFF; /* Warna background utama konten halaman */
            box-shadow: 0 0 10px rgba(0,0,0,0.1); /* Tambahkan shadow untuk efek jendela */
            overflow: hidden; /* Sembunyikan overflow di dalam wrapper */
            display: flex; /* Untuk menyusun section secara vertikal */
            flex-direction: column;
            align-items: stretch; /* Agar elemen di dalamnya mengisi lebar wrapper */
        }

        /* Main Section (Hero Section) */
        .main-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 100px 20px 70px 20px;
          width: 100%;
          padding-bottom: 150px; /* Nilai default untuk desktop */
          min-height: 100vh; /* Nilai default untuk desktop */
          background: #196ECD;
          box-sizing: border-box;
        }

        .content-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          max-width: 1100px; /* Konsisten dengan lebar konten utama di dalam wrapper */
          margin: 0 auto; /* Pusatkan konten di dalam hero */
          height: 100%;
          gap: 50px;
          box-sizing: border-box;
        }

        .text-section { flex: 1; display: flex; flex-direction: column; gap: 20px; color: white; justify-content: center; align-items: flex-start; text-align: left; box-sizing: border-box; }

        .main-heading { font-size: 48px; font-weight: bold; line-height: 1.2; margin: 0; width: 100%; word-break: break-word; }

        /* --- START: Image Slider Section --- */
        .image-slider-section { flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: center; gap: 20px; max-width: 721px; width: 100%; box-sizing: border-box; }
        .image-display { position: relative; display: flex; justify-content: center; align-items: center; width: 100%; max-width: 542px; height: 398.5px; overflow: hidden; border-radius: 12px; }
        .main-image { width: 100%; height: 100%; object-fit: cover; border-radius: 12px; transition: opacity 0.5s ease-in-out; }
        .overlay-arrow {
            /* Panah ini sekarang disembunyikan */
            display: none;
        }
        .slider-dots { display: flex; gap: 8px; margin-top: 10px; }
        .dot { width: 10px; height: 10px; background: rgba(255, 255, 255, 0.5); border-radius: 50%; cursor: pointer; transition: background 0.3s ease; }
        .dot.active { background: white; }
        /* --- END: Image Slider Section --- */

        /* Responsive Design for LandingPage (Applies to all sections) */
        @media (max-width: 1440px) {
          .main-section { padding: 100px 20px 70px 20px; padding-bottom: 120px; }
          .content-wrapper { gap: 30px; max-width: 90%; }
          .image-slider-section { max-width: 500px; }
          .image-display { height: 300px; }
        }

        @media (max-width: 1024px) { /* Tablet / iPad Breakpoint */
          .main-section {
            padding: 80px 15px 40px 15px; /* **Diperbaiki**: Kurangi padding-bottom untuk mendekat Why We Exist */
            min-height: auto;
          }
          .content-wrapper {
            flex-direction: column;
            gap: 20px;
            max-width: 100%;
            padding: 0 15px;
          }
          .text-section { align-items: center; text-align: center; width: 100%; }
          .main-heading { font-size: 40px; text-align: center; }
          .image-slider-section {
            max-width: 90%; /* Memberi lebih banyak ruang */
            width: 100%; /* Pastikan mengisi lebar yang tersedia */
          }
          .image-display {
            height: 380px; /* **Diperbaiki**: Tingkatkan tinggi agar ilustrasi lebih terlihat di iPad */
            max-width: 100%;
          }
          .main-image {
            object-fit: contain; /* **Diperbaiki**: Menggunakan 'contain' agar seluruh ilustrasi terlihat */
          }
        }

        @media (max-width: 768px) {
          .main-section {
            padding: 60px 10px 20px 10px; /* Diperbaiki: Kurangi padding-bottom secara signifikan */
            min-height: auto;
          }
          .main-heading { font-size: 32px; }
          .image-display {
            height: 280px; /* **Diperbaiki**: Sesuaikan tinggi untuk layar mobile yang lebih kecil */
          }
          .main-image {
            object-fit: contain; /* Menggunakan 'contain' juga di mobile */
          }
        }

        @media (max-width: 480px) {
          .main-heading { font-size: 24px; }
          .image-display { height: 180px; /* Diperbaiki: Sesuaikan tinggi untuk ponsel sangat kecil */ }
        }
      `}</style>

    </div>
  );
};

// =========================================================
// Komponen Anak yang Menerima Data dari Prop 'data'
// =========================================================

const WhyWeExist = ({ data }) => {
  console.log('WhyWeExist component rendered with data:', data);

  const cardsContainerRef = useRef(null); // Ref untuk elemen cards-container
  const [currentCardIndex, setCurrentCardIndex] = useState(0); // State untuk melacak indeks kartu aktif
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const slideIntervalRef = useRef(null); // Ref untuk menyimpan ID interval

  // === PERBAIKAN INI MEMBUAT KOTAK DINAMIS SESUAI DATA DARI ADMIN ===
  const fetchedCardData = [];
  // Loop untuk mencoba mengambil hingga 10 kartu (Anda bisa sesuaikan batas ini)
  for (let i = 0; i < 10; i++) {
    const iconKey = `card_${i}_icon`;
    const titleKey = `card_${i}_title`;
    const descriptionKey = `card_${i}_description`;

    if (data?.[iconKey] && data?.[titleKey] && data?.[descriptionKey]) {
      fetchedCardData.push({
        icon: data[iconKey],
        title: data[titleKey],
        description: data[descriptionKey],
      });
    } else {
      // Berhenti jika tidak ada lagi kartu dalam urutan
      break;
    }
  }

  const finalCardData = fetchedCardData.length > 0 ? fetchedCardData : [
      { icon: 'src/assets/book.png', title: 'National Training Standards (Default)', description: 'Default description 1.' },
      { icon: 'src/assets/aprove.png', title: 'Industry Recognized Certification (Default)', description: 'Default description 2.' },
      { icon: 'src/assets/bag.png', title: 'Career & Internship Opportunities (Default)', description: 'Default description 3.' },
  ];
  console.log('Final cardData for WhyWeExist (after fallback):', finalCardData);

  // MODIFIKASI INI: slider aktif hanya jika ada lebih dari 3 kartu
  const enableSlider = finalCardData.length > 3; 

  // Fungsi untuk reset interval
  const resetSlideInterval = () => {
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
    if (enableSlider && cardsContainerRef.current) { 
      slideIntervalRef.current = setInterval(() => {
        const container = cardsContainerRef.current;
        const cardElements = Array.from(container.children);
        if (cardElements.length === 0) return; 

        // Hitung lebar rata-rata satu kartu (termasuk gap)
        let slideWidth = 0;
        if (cardElements.length > 1) {
            const firstCardRect = cardElements[0].getBoundingClientRect();
            const secondCardRect = cardElements[1].getBoundingClientRect();
            const gap = secondCardRect.left - (firstCardRect.left + firstCardRect.width);
            slideWidth = firstCardRect.width + gap;
        } else if (cardElements.length === 1) {
            slideWidth = cardElements[0].getBoundingClientRect().width; // Jika hanya 1 kartu (walaupun enableSlider=false, ini untuk jaga-jaga)
        } else {
            return; // Tidak ada kartu
        }
        
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        
        let nextIndex = (currentCardIndex + 1) % finalCardData.length;
        let targetScrollLeft = nextIndex * slideWidth; 

        // Atur targetScrollLeft agar tidak melewati batas akhir
        if (targetScrollLeft > maxScrollLeft) {
             targetScrollLeft = 0; // Kembali ke awal
             nextIndex = 0;
        }

        container.scroll({
            left: targetScrollLeft,
            behavior: 'smooth'
        });
        setCurrentCardIndex(nextIndex);

      }, 3000); 
    }
  };


  // Efek untuk slide otomatis dan cleanup
  useEffect(() => {
    if (enableSlider) { // Hanya jalankan efek jika slider aktif
        // MODIFIKASI: Force initial snap to position 0 immediately
        if (cardsContainerRef.current) {
            cardsContainerRef.current.scroll({
                left: 0,
                behavior: 'auto' // Set instantly to the start
            });
            setCurrentCardIndex(0); // Ensure index is 0
        }
        resetSlideInterval();
    } else { // Jika slider tidak aktif, pastikan interval bersih
        if (slideIntervalRef.current) {
            clearInterval(slideIntervalRef.current);
            slideIntervalRef.current = null;
        }
    }

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [enableSlider, finalCardData.length]); // Hapus currentCardIndex dari dependency, agar tidak re-trigger interval setiap slide.


  // Fungsi navigasi manual (panah)
  const navigateCards = (direction) => {
    if (!cardsContainerRef.current || !enableSlider) return; // Hanya navigasi jika slider aktif

    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null;
    }

    const container = cardsContainerRef.current;
    const cardElements = Array.from(container.children);
    if (cardElements.length === 0) return;

    let slideWidth = 0;
    if (cardElements.length > 1) {
        const firstCardRect = cardElements[0].getBoundingClientRect();
        const secondCardRect = cardElements[1].getBoundingClientRect();
        const gap = secondCardRect.left - (firstCardRect.left + firstCardRect.width);
        slideWidth = firstCardRect.width + gap;
    } else if (cardElements.length === 1) {
        slideWidth = cardElements[0].getBoundingClientRect().width;
    } else {
        return;
    }


    let newIndex = currentCardIndex;
    if (direction === 'next') {
      newIndex = (currentCardIndex + 1) % finalCardData.length;
    } else { // direction === 'prev'
      newIndex = (currentCardIndex - 1 + finalCardData.length) % finalCardData.length;
    }

    const targetScrollLeft = newIndex * slideWidth;

    container.scroll({
        left: targetScrollLeft,
        behavior: 'smooth'
    });
    setCurrentCardIndex(newIndex);
    
    resetSlideInterval(); // Reset interval setelah navigasi manual
  };


  // --- Fungsi Drag/Swipe ---
  const handleMouseDown = (e) => {
    if (!enableSlider || !cardsContainerRef.current) return; // Hanya drag jika slider aktif
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX); 
    setScrollLeft(cardsContainerRef.current.scrollLeft);
    cardsContainerRef.current.style.cursor = 'grabbing';
    cardsContainerRef.current.style.scrollBehavior = 'auto'; 

    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
      slideIntervalRef.current = null; 
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !enableSlider || !cardsContainerRef.current) return; // Hanya drag jika slider aktif
    e.preventDefault(); 
    const x = (e.pageX || e.touches[0].pageX); 
    const walk = (x - startX) * 1.5; 
    cardsContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!enableSlider || !cardsContainerRef.current) return; // Hanya drag jika slider aktif
    setIsDragging(false);
    cardsContainerRef.current.style.cursor = 'grab';
    cardsContainerRef.current.style.scrollBehavior = 'smooth'; 

    const container = cardsContainerRef.current;
    const currentScrollLeft = container.scrollLeft;
    const cardElements = Array.from(container.children);
    if (cardElements.length === 0) {
        resetSlideInterval();
        return;
    }
    
    let slideWidth = 0;
    if (cardElements.length > 1) {
        const firstCardRect = cardElements[0].getBoundingClientRect();
        const secondCardRect = cardElements[1].getBoundingClientRect();
        const gap = secondCardRect.left - (firstCardRect.left + firstCardRect.width);
        slideWidth = firstCardRect.width + gap;
    } else if (cardElements.length === 1) {
        slideWidth = cardElements[0].getBoundingClientRect().width;
    } else {
        return;
    }


    const nearestCardIndex = Math.round(currentScrollLeft / slideWidth);
    const targetScrollLeft = nearestCardIndex * slideWidth;

    container.scroll({
        left: targetScrollLeft,
        behavior: 'smooth'
    });
    setCurrentCardIndex(nearestCardIndex);

    resetSlideInterval();
  };

  const handleMouseLeave = () => {
    if (isDragging && enableSlider) { // Hanya jika sedang dragging dan slider aktif
      handleMouseUp(); 
    }
  };
  // --- Akhir Fungsi Drag/Swipe ---

  return (
    <section className="why-we-exist-section">
      <div className="container">
        <h2 className="section-title">{data?.section_title || "Why We Exist"}</h2>
        <p className="section-description">{data?.section_description || "Default description for Why We Exist."}</p>
        <div className="slider-wrapper"> {/* Wrapper baru untuk slider dan panah */}
          {enableSlider && ( // Panah hanya muncul jika slider aktif
            <div className="slider-arrow left-arrow" onClick={() => navigateCards('prev')}>
              <span>&lt;</span>
            </div>
          )}
          {/* Conditional rendering for non-slider vs. slider layout */}
          {!enableSlider && finalCardData.length <= 3 ? (
              // Layout statis jika 3 kartu atau kurang
              <div className="cards-container non-slider-cards-layout">
                  {finalCardData.map((card, index) => (
                      <div key={index} className="card non-slider-card">
                          <div className="icon-wrapper">
                              <img src={card.icon} alt={card.title} className="card-icon" />
                          </div>
                          <h3 className="card-title">{card.title}</h3>
                          <p className="card-description">{card.description}</p>
                      </div>
                  ))}
              </div>
          ) : (
              // Layout slider jika lebih dari 3 kartu
              <div
                  className="cards-container"
                  ref={cardsContainerRef}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleMouseDown}
                  onTouchMove={handleMouseMove}
                  onTouchEnd={handleMouseUp}
              >
                  {finalCardData.map((card, index) => (
                      <div key={index} className="card">
                          <div className="icon-wrapper">
                              <img src={card.icon} alt={card.title} className="card-icon" />
                          </div>
                          <h3 className="card-title">{card.title}</h3>
                          <p className="card-description">{card.description}</p>
                      </div>
                  ))}
              </div>
          )}
          {enableSlider && ( // Panah hanya muncul jika slider aktif
            <div className="slider-arrow right-arrow" onClick={() => navigateCards('next')}>
              <span>&gt;</span>
            </div>
          )}
        </div>
        {enableSlider && ( // Hanya tampilkan dots jika slider aktif
          <div className="slider-dots">
            {finalCardData.map((_, index) => (
              <span key={index} 
                    className={`dot ${index === currentCardIndex ? 'active' : ''}`} 
                    onClick={() => {
                        const container = cardsContainerRef.current;
                        const cardElements = Array.from(container.children);
                        if (cardElements.length === 0) return;
                        
                        let slideWidth = 0;
                        if (cardElements.length > 1) {
                            const firstCardRect = cardElements[0].getBoundingClientRect();
                            const secondCardRect = cardElements[1].getBoundingClientRect();
                            const gap = secondCardRect.left - (firstCardRect.left + firstCardRect.width);
                            slideWidth = firstCardRect.width + gap;
                        } else if (cardElements.length === 1) {
                            slideWidth = cardElements[0].getBoundingClientRect().width;
                        } else {
                            return;
                        }

                        container.scroll({
                            left: index * slideWidth,
                            behavior: 'smooth'
                        });
                        setCurrentCardIndex(index);
                        resetSlideInterval(); 
                    }}
              ></span>
            ))}
          </div>
        )}
        <button className="learn-more-button">{data?.button_text || "Learn More"}</button>
      </div>
      <style jsx="true">{`
        .why-we-exist-section { 
            background-color: #F0F8FF; 
            padding: 60px 0; 
            display: flex; 
            justify-content: center; 
            border-top-left-radius: 80px; 
            border-top-right-radius: 80px; 
            margin-top: -80px; 
            position: relative; 
            z-index: 1; 
            width: 100%; 
        }
        .container { 
            max-width: 1100px;
            width: 90%;
            padding: 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 auto;
        }
        .section-title { font-size: 2.5rem; color: #196ECD; font-weight: bold; margin-bottom: 20px; text-align: center; }
        .section-description { color: #333; font-size: 1rem; line-height: 1.6; margin-bottom: 40px; text-align: center; }

        /* --- Slider Wrapper --- */
        .slider-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden; 
            margin-bottom: 30px;
            display: flex; 
            align-items: center;
        }

        .cards-container {
            display: flex; 
            gap: 20px;
            width: 100%;
            /* default state for slider */
            overflow-x: scroll; 
            scroll-snap-type: x mandatory; 
            -webkit-overflow-scrolling: touch; 
            cursor: grab; 
            user-select: none; 
            padding-bottom: 0; 
            scrollbar-width: none; 
        }
        .cards-container::-webkit-scrollbar {
            display: none;
        }

        /* Gaya untuk layout non-slider (jika kurang dari 4 kotak) */
        .non-slider-cards-layout {
            overflow-x: hidden; /* Sembunyikan scroll jika tidak slider */
            cursor: default; /* Kursor normal */
            justify-content: center; /* Pusatkan kartu */
            flex-wrap: wrap; /* Izinkan wrap jika di layar kecil */
        }
        .cards-container.non-slider-cards-layout .card {
            flex-shrink: 1; /* Biarkan kartu mengecil jika ruang sempit */
            min-width: unset; /* Hapus min-width */
        }


        .card {
            flex-shrink: 0; /* Mencegah kartu mengecil saat slider aktif */
            width: calc((100% / 3) - (40px / 3)); /* 3 kartu per baris di desktop */
            min-width: 300px; /* Minimal lebar kartu */
            background: #B2CFEE;
            border-radius: 30px;
            padding: 50px 45px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 24px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
            scroll-snap-align: start; 
            min-height: 350px; 
        }

        /* Gaya khusus untuk kartu di non-slider layout */
        .card.non-slider-card {
            flex-basis: calc(33.33% - 13.33px); /* Untuk 3 kolom */
            max-width: 426.67px; 
            width: auto; 
            scroll-snap-align: none; 
        }


        /* --- Slider Arrows --- */
        .slider-arrow {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: rgba(25, 110, 205, 0.7); 
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
            background-color: #0E5CB8; 
        }
        .slider-arrow.left-arrow { left: -50px; } 
        .slider-arrow.right-arrow { right: -50px; } 

        /* --- Slider Dots --- */
        .slider-dots { display: flex; gap: 8px; margin-top: 20px; justify-content: center; }
        .dot { width: 10px; height: 10px; background: rgba(25, 110, 205, 0.3); border-radius: 50%; cursor: pointer; transition: background 0.3s ease; }
        .dot.active { background: #196ECD; }

        .icon-wrapper { background-color: #E1F0FF; border-radius: 50%; width: 80px; height: 80px; display: flex; justify-content: center; align-items: center; margin: 0 auto; }
        .card-icon { width: 40px; height: 40px; object-fit: contain; }
        .card-title { font-size: 1.2rem; color: #333; font-weight: bold; }
        .card-description { color: #666; font-size: 0.9rem; line-height: 1.5; }
        .learn-more-button { display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 6px 16px; gap: 4px; width: 173px; height: 52px; background: #196ECD; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12); border-radius: 12px; color: white; border: none; font-size: 1rem; cursor: pointer; transition: background-color 0.3s ease; }
        .learn-more-button:hover { background-color: #0E5CB8; }

        /* Responsive */
        @media (max-width: 1440px) {
            .slider-arrow.left-arrow { left: -30px; }
            .slider-arrow.right-arrow { right: -30px; }
        }
        @media (max-width: 1024px) { /* Tablet / iPad Breakpoint */
          .why-we-exist-section {
              margin-top: -40px;
          }
          .card {
              width: calc((100% / 2) - 10px); /* 2 kartu per baris di tablet */
              min-width: unset; 
          }
          /* Perbaiki agar non-slider card juga 2 kolom di tablet */
          .card.non-slider-card {
              flex-basis: calc(50% - 10px); /* 2 kartu per baris */
              max-width: calc(50% - 10px);
              width: auto;
          }
          .slider-arrow.left-arrow { left: 5px; } 
          .slider-arrow.right-arrow { right: 5px; } 
        }
        @media (max-width: 768px) {
          .why-we-exist-section {
            padding-top: 30px;
            margin-top: -10px;
            border-top-left-radius: 40px;
            border-top-right-radius: 40px;
          }
          .container { padding: 0 15px; }
          .cards-container { flex-direction: row; align-items: stretch; } 
          .card {
              width: 90%; /* 1 kartu per baris di mobile */
              min-width: unset;
          }
          .card.non-slider-card { 
              flex-basis: 90%; /* 1 kartu per baris */
              width: 90%;
              max-width: 400px; 
          }
          .section-title { font-size: 2rem; }
          .section-description { font-size: 0.9rem; }
          .learn-more-button { width: 150px; height: 48px; padding: 5px 12px; }
          .slider-arrow {
            width: 30px;
            height: 30px;
            font-size: 18px;
          }
        }
        @media (max-width: 480px) {
            .slider-arrow { display: none; } 
        }
      `}</style>
    </section>
  );
};

const OurProduct = ({ data }) => {
  // === Mengumpulkan semua produk secara dinamis dari data API ===
  const fetchedProducts = [];
  // Main product (Digitalent)
  if (data?.main_product_image && data?.main_product_title && data?.main_product_description) {
    fetchedProducts.push({
      image: data.main_product_image,
      title: data.main_product_title,
      description: data.main_product_description,
    });
  }
  // Side products (Diploy, Stankomdigi, dll.)
  for (let i = 0; i < 10; i++) { // Batasi hingga 10 side products, bisa disesuaikan
    const imageKey = `side_product_${i}_image`;
    const titleKey = `side_product_${i}_title`;
    const descriptionKey = `side_product_${i}_description`;

    if (data?.[imageKey] && data?.[titleKey] && data?.[descriptionKey]) {
      fetchedProducts.push({
        image: data[imageKey],
        title: data[titleKey],
        description: data[descriptionKey],
      });
    } else {
      // Berhenti jika tidak ada lagi produk sampingan dalam urutan
      break;
    }
  }

  // Fallback data jika tidak ada produk dari API sama sekali
  const products = fetchedProducts.length > 0 ? fetchedProducts : [
    { image: 'src/assets/digitalent.png', title: 'Digitalent (Default)', description: 'Digital platform for AI, programming, and data science certification (Default).' },
    { image: 'src/assets/diploy.png', title: 'Diploy (Default)', description: 'From training to career — connecting talent with opportunity (Default).' },
    { image: 'src/assets/stankomdigi.png', title: 'Stankomdigi (Default)', description: 'A platform to build and access Indonesia\'s digital competency standards (Default).' },
  ];

  console.log('Final products for OurProduct (after fallback):', products);

  // === HAPUS SEMUA LOGIKA SLIDER (STATE, REF, USEEFFECT, FUNGSI NAVIGASI) ===
  // Karena sekarang layout akan selalu grid statis

  return (
    <div>
      <section className="our-product-section">
        <div className="container">
          <h2 className="product-section-title">{data?.section_title || "Our Product"}</h2>
          {/* Hapus slider-wrapper dan panah */}
          <div className="product-cards-grid"> {/* Selalu gunakan kelas ini */}
              {products.map((product, index) => (
                <div key={index} className="product-card">
                    <div className="product-image-container">
                        <img
                        src={product.image}
                        alt={product.title}
                        className="product-card-image"
                        />
                    </div>
                    <div className="product-card-overlay-text">
                        <h3>{product.title}</h3>
                        <p>{product.description}</p>
                    </div>
                </div>
              ))}
          </div>
          {/* Hapus slider-dots */}
          <button className="view-product-button">{data?.button_text || "View Our Product"}</button>
        </div>
      </section>
      <style jsx="true">{`
        .our-product-section {
          background: #D1E2F5;
          padding: 50px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          width: 100%;
          min-height: 749px; /* Bisa disesuaikan lagi setelah layout 3 kolom */
          position: relative;
          z-index: 0;
          margin-top: 0;
        }

        .our-product-section .container {
          max-width: 1100px;
          width: 100%;
          padding: 0 20px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 60px;
          margin: 0 auto;
        }

        .product-section-title {
          font-size: 2.5rem;
          color: #196ECD;
          font-weight: bold;
          margin-bottom: 0;
          text-align: center;
          width: 100%;
        }

        /* === PERUBAHAN UTAMA UNTUK LAYOUT GRID STATIS === */
        .product-cards-grid {
            display: grid; /* Selalu gunakan Grid */
            /* Logika kolom adaptif berdasarkan jumlah item */
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Kolom akan menyesuaikan */
            gap: 25px; /* Jarak antar kartu */
            width: 100%;
            max-width: 100%; /* Pastikan mengisi lebar container */
            height: auto;
            justify-items: center; /* Pusatkan item di dalam grid cell */
            align-items: stretch; /* Penting untuk membuat tinggi kartu sama */
            overflow-x: hidden; /* Sembunyikan scroll horizontal secara default */
            scrollbar-width: none; /* Firefox */
        }
        /* Sembunyikan scrollbar Webkit */
        .product-cards-grid::-webkit-scrollbar {
            display: none;
        }

        /* Khusus untuk 3 item, paksa 3 kolom */
        .product-cards-grid:has(> .product-card:nth-child(3):last-child) {
            grid-template-columns: repeat(3, 1fr);
        }
        /* Untuk 4 item, paksa 2x2 */
        .product-cards-grid:has(> .product-card:nth-child(4):last-child) {
            grid-template-columns: repeat(2, 1fr);
        }
        /* Untuk 5 atau 6 item, paksa 3 kolom per baris */
        .product-cards-grid:has(> .product-card:nth-child(5)),
        .product-cards-grid:has(> .product-card:nth-child(6)) {
            grid-template-columns: repeat(3, 1fr);
        }
        /* Default untuk > 6 atau jumlah lainnya, biarkan auto-fit */
        /* Cuma perlu override jika auto-fit tidak sesuai dengan keinginan Anda untuk jumlah tertentu */


        .product-card {
          max-width: 350px; /* Batasi lebar untuk tampilan 3 kolom */
          min-width: unset; /* Hapus min-width agar flexibel mengikuti grid */
          background: #B2CFEE;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          position: relative; /* Penting untuk positioning overlay */
          height: 450px; /* Tinggi Fix untuk Our Product Card */
        }

        /* === Kontainer untuk gambar agar teks overlay tidak bertindihan === */
        .product-image-container {
            width: 100%;
            height: 300px; /* Atur tinggi gambar secara eksplisit */
            overflow: hidden; /* Pastikan gambar tidak keluar dari container */
            border-radius: 20px 20px 0 0; /* Hanya sudut atas yang melengkung */
            position: relative; /* Untuk gambar mengisi penuh */
        }

        .product-card-image {
          width: 100%;
          height: 100%; /* Akan mengisi tinggi product-image-container */
          object-fit: cover; /* Pastikan gambar mengisi area tanpa terdistorsi */
        }

        .product-card-overlay-text {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%);
          color: white;
          padding: 20px; /* Padding yang cukup */
          border-bottom-left-radius: 20px;
          border-bottom-right-radius: 20px;
          box-sizing: border-box; /* Pastikan padding tidak menambah lebar */
          display: flex; 
          flex-direction: column; 
          /* MENGHAPUS justify-content: flex-end; UNTUK MEMBUAT TEKS SEJAJAR DI BAGIAN ATAS OVERLAY */
          /* justify-content: flex-end; */ 
          height: 150px; /* Tinggi overlay teks (450px card - 300px image = 150px) */

          /* TAMBAHKAN padding-top AGAR JUDUL DAN DESKRIPSI DIMULAI DARI BAGIAN ATAS OVERLAY SECARA KONSISTEN */
          padding-top: 20px; 
        }

        .product-card-overlay-text h3 {
          font-size: 1.5rem; /* Sesuaikan font-size untuk keamanan */
          margin-bottom: 5px;
          font-weight: bold;
          line-height: 1.2; /* Untuk kontrol baris */
        }

        .product-card-overlay-text p {
          font-size: 0.9rem; /* Sesuaikan font-size untuk keamanan */
          line-height: 1.3; /* Untuk kontrol baris */
        }
        /* === AKHIR PERUBAHAN UTAMA === */

        .view-product-button {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 6px 16px;
          gap: 4px;
          width: 173px;
          height: 52px;
          background: #196ECD;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          color: white;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 0;
          margin-left: auto;
          margin-right: auto;
        }

        .view-product-button:hover {
          background-color: #0E5CB8;
        }

        /* Responsive adjustments for OurProduct section */
        @media (max-width: 1440px) { /* Untuk layar yang lebih lebar dari 1024px */
            .product-cards-grid {
                grid-template-columns: repeat(3, 1fr); /* Default 3 kolom */
            }
        }
        @media (max-width: 1024px) {
          .our-product-section .container {
            padding: 0 15px;
          }
          .product-cards-grid {
            grid-template-columns: repeat(2, 1fr); /* 2 kolom di tablet */
          }
          .product-card {
            width: 100%; /* Disesuaikan oleh grid-template-columns */
            max-width: unset; /* Hapus max-width agar flexibel mengikuti grid */
            height: 380px; /* Sesuaikan tinggi Fix untuk Our Product Card di tablet */
          }
          .product-image-container {
              height: 250px; /* Sesuaikan tinggi gambar untuk tablet */
          }
          .product-card-overlay-text {
              height: 130px; /* Tinggi overlay teks (380px card - 250px image = 130px) */
              padding-top: 15px; /* Sesuaikan padding-top untuk responsif */
          }

          .product-card-overlay-text h3 {
            font-size: 1.3rem; /* Sesuaikan font-size */
          }
          .product-card-overlay-text p {
            font-size: 0.8rem; /* Sesuaikan font-size */
          }
          .view-product-button {
            width: 150px;
            height: 48px;
            padding: 5px 12px;
            margin-top: 30px;
          }
        }

        @media (max-width: 768px) {
          .our-product-section {
            padding: 40px 0;
            min-height: auto;
          }
          .product-section-title {
            font-size: 2rem;
            padding-left: 0;
          }
          .product-cards-grid {
            grid-template-columns: 1fr; /* 1 kolom di mobile */
          }
          .product-card {
            width: 90%; /* 1 kartu per baris di mobile, isi hampir penuh */
            max-width: 400px; /* Batasi lebar card di mobile agar tidak terlalu lebar */
            margin: 0 auto; /* Pusatkan card */
            height: 300px; /* Sesuaikan tinggi Fix untuk Our Product Card di mobile */
          }
          .product-image-container {
              height: 180px; /* Sesuaikan tinggi gambar untuk mobile */
          }
          .product-card-overlay-text {
              height: 120px; /* Tinggi overlay teks (300px card - 180px image = 120px) */
              padding-top: 10px; /* Sesuaikan padding-top untuk responsif */
          }

          .product-card-overlay-text h3 {
            font-size: 1.1rem; /* Sesuaikan font-size */
          }
          .product-card-overlay-text p {
            font-size: 0.75rem; /* Sesuaikan font-size */
          }
          .view-product-button {
            width: 130px;
            height: 44px;
            font-size: 0.9rem;
            margin-top: 20px;
          }
        }

        @media (max-width: 480px) {
          .product-section-title {
            font-size: 1.8rem;
          }
          .product-card-overlay-text {
            padding: 15px;
            padding-top: 10px; /* Sesuaikan padding-top untuk responsif */
          }
          .product-card-overlay-text h3 {
            font-size: 1rem;
          }
          .product-card-overlay-text p {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};

const AwardRecognition = ({ data }) => {
  // === MODIFIKASI: Mengumpulkan gambar penghargaan secara dinamis ===
  const fetchedAwardImages = [];
  for (let i = 0; i < 10; i++) { // Coba ambil hingga 10 gambar penghargaan
    const imageKey = `award_image_${i}`;
    if (data?.[imageKey]) {
      fetchedAwardImages.push(data[imageKey]);
    } else {
      break; // Berhenti jika tidak ada lagi gambar dalam urutan
    }
  }

  // Fallback data jika tidak ada gambar penghargaan dari API sama sekali
  const awardImages = fetchedAwardImages.length > 0 ? fetchedAwardImages : [
    'https://placehold.co/571x377/EDEDED/FFFFFF?text=Award+Image+1', // Fallback 1
    'https://placehold.co/571x377/EDEDED/FFFFFF?text=Award+Image+2', // Fallback 2
  ];

  return (
    <section className="award-recognition-section">
      <div className="award-container">
        <h2 className="award-title">{data?.section_title || "Award & Recognition"}</h2>
        <p className="award-description">{data?.section_description || "Acknowledged nationally and globally for innovation in digital talent development."}</p>
        <div className="award-images-grid"> {/* Ubah dari award-images-container ke award-images-grid */}
          {awardImages.map((imgSrc, index) => (
            <div key={index} className="award-image-box">
              <img src={imgSrc} alt={`Award Image ${index + 1}`} className="award-image" />
            </div>
          ))}
        </div>
        <button className="view-all-button">{data?.button_text || "View All"}</button>
      </div>
      <style jsx="true">{`
        .award-recognition-section {
          background: #FFFFFF;
          padding: 108px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          width: 100%;
          min-height: 826px;
          position: relative;
          z-index: 0;
        }

        .award-container {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 20px;
          gap: 50px;
          width: 100%;
          max-width: 1100px;
          margin: 0 auto;
        }

        .award-title {
          font-size: 2.5rem;
          color: #196ECD;
          font-weight: bold;
          text-align: center;
          margin-bottom: 0;
        }

        .award-description {
          color: #333;
          font-size: 1rem;
          line-height: 1.6;
          text-align: center;
          margin-bottom: 0;
        }

        /* === MODIFIKASI: Layout Grid Dinamis untuk Award Images === */
        .award-images-grid { /* Menggantikan .award-images-container */
          display: grid;
          /* Gunakan auto-fit untuk responsifitas, minmax agar lebar min 300px */
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          width: 100%;
          justify-items: center; /* Pusatkan gambar di dalam grid cell */
          align-items: stretch; /* Untuk tinggi yang sama jika perlu */
          flex-wrap: wrap; /* Pastikan wrapping */
        }
        /* Jika hanya ada 1 gambar, buat dia mengisi lebar penuh */
        .award-images-grid:has(> .award-image-box:nth-child(1):last-child) {
            grid-template-columns: 1fr;
        }
        /* Jika ada 2 gambar, buat dia 2 kolom */
        .award-images-grid:has(> .award-image-box:nth-child(2):last-child) {
            grid-template-columns: repeat(2, 1fr);
        }

        .award-image-box {
          width: 100%; /* Akan disesuaikan oleh grid */
          max-width: 571px; /* Batasan maksimum lebar setiap gambar */
          height: 377px; /* Tinggi yang konsisten untuk setiap box gambar */
          background: #EDEDED;
          border-radius: 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        .award-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .view-all-button {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 6px 16px;
          gap: 4px;
          width: 173px;
          height: 52px;
          background: #196ECD;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          color: white;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 0;
          margin-left: auto;
          margin-right: auto;
        }

        .view-all-button:hover {
          background-color: #0E5CB8;
        }

        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .award-recognition-section {
            padding: 80px 0;
            align-items: center;
          }
          .award-container {
            width: 100%;
            gap: 40px;
            align-items: center;
            padding: 0 15px;
          }
          .award-title, .award-description {
            text-align: center;
          }
          .award-images-grid { /* Menggantikan .award-images-container */
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* 2 kolom atau 1 kolom di tablet/mobile */
            justify-content: center;
            flex-direction: row; /* Pastikan flex-direction tidak mengganggu grid */
          }
          /* Override khusus untuk 2 gambar di tablet agar tetap 2 kolom */
          .award-images-grid:has(> .award-image-box:nth-child(2):last-child) {
            grid-template-columns: repeat(2, 1fr);
          }
          .award-image-box {
            max-width: 450px; /* Batas lebar di tablet */
            height: 300px;
          }
          .view-all-button {
            width: 150px;
            height: 48px;
            font-size: 0.9rem;
            margin: 0 auto;
          }
        }

        @media (max-width: 768px) {
          .award-recognition-section {
            padding: 60px 0;
            min-height: auto;
          }
          .award-container {
            gap: 30px;
            padding: 0 10px;
          }
          .award-title {
            font-size: 2rem;
          }
          .award-description {
            font-size: 0.9rem;
          }
          .award-images-grid { /* Menggantikan .award-images-container */
            grid-template-columns: 1fr; /* 1 kolom di mobile */
            gap: 20px;
          }
          .award-image-box {
            height: 250px;
            width: 90%; /* Isi hampir penuh di mobile */
            max-width: 400px; /* Batasan maksimum untuk ponsel */
          }
          .view-all-button {
            width: 150px;
            height: 48px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .award-title {
            font-size: 1.8rem;
          }
          .award-image-box {
            height: 180px;
          }
        }
      `}</style>

    </section>
  );
};

const ContactUs = ({ data }) => {
  return (
    <section className="contact-us-section">
      <div className="contact-container">
        <div className="contact-text-content">
          <h2 className="contact-title">{data?.contact_title || "Got a question or want to collaborate?"}</h2>
          <p className="contact-description">{data?.contact_description || "Reach out to us and let's create impactful digital solutions — together."}</p>
        </div>
        <button className="contact-button">{data?.button_text || "Contact Us"}</button>
      </div>
      <style jsx="true">{`
        .contact-us-section {
          background: #D1E2F5;
          padding: 51px 0;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          height: 303px;
          position: relative;
          z-index: 0;
          border-radius: 25px;
          margin: 0 auto;
          max-width: 1100px; /* Konsisten dengan lebar konten utama */
          box-shadow: 0px 4px 10px rgba(0,0,0,0.1);
          transform: translateY(-80px);
          z-index: 2;
        }

        .contact-container {
          max-width: 1060px; /* Sedikit lebih kecil dari wrapper utama untuk padding internal */
          width: 100%;
          padding: 0 20px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          gap: 50px;
          flex-wrap: wrap;
          min-height: 200px;
          margin: 0 auto;
        }

        .contact-text-content {
          flex: 1;
          min-width: 280px;
          text-align: left;
          color: #196ECD;
        }

        .contact-title {
          font-size: 2.5rem;
          font-weight: bold;
          margin-bottom: 15px;
          line-height: 1.2;
        }

        .contact-description {
          font-size: 1.1rem;
          line-height: 1.5;
          opacity: 0.8;
        }

        .contact-button {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          padding: 6px 16px;
          gap: 4px;
          width: 173px;
          height: 52px;
          background: #196ECD;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
          border-radius: 12px;
          color: white;
          border: none;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
          flex-shrink: 0;
        }

        .contact-button:hover {
          background-color: #0E5CB8;
        }

        @media (max-width: 1366px) {
           .contact-us-section {
             padding: 40px 0;
             max-width: 90%;
             height: auto;
           }
           .contact-container {
             gap: 50px;
             max-width: 90%;
             padding: 0 20px;
           }
        }

        @media (max-width: 1024px) {
          .contact-us-section {
            padding: 30px 0;
            max-width: 90%;
          }
          .contact-container {
            gap: 30px;
            flex-direction: column;
            align-items: center;
            text-align: center;
            padding: 0 15px;
          }
          .contact-text-content {
            text-align: center;
          }
          .contact-title {
            font-size: 2.2rem;
          }
          .contact-description {
            font-size: 1rem;
          }
          .contact-button {
            margin-top: 20px;
          }
        }

        @media (max-width: 768px) {
          .contact-us-section {
            padding: 25px 0;
            border-bottom-left-radius: 40px;
            border-bottom-right-radius: 40px;
            height: auto;
            transform: translateY(-40px);
          }
          .contact-container {
            padding: 0 10px;
            gap: 20px;
            min-height: unset;
          }
          .contact-title {
            font-size: 2rem;
          }
          .contact-description {
            font-size: 0.9rem;
          }
          .contact-button {
            width: 150px;
            height: 48px;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .contact-title {
            font-size: 1.8rem;
          }
          .contact-description {
            font-size: 0.8rem;
          }
          .contact-button {
            width: 130px;
            height: 44px;
            font-size: 0.8rem;
          }
        }
      `}</style>

    </section>
  );
};

export default LandingPage;