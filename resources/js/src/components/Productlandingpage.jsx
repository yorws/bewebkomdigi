import React, { useState, useEffect } from 'react';
import apiClient from './api'; // Import instance Axios

// Main component for the Product page
export default function Productlandingpage() { // Mengubah nama komponen utama ke Productlandingpage
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/pages/products'); // Mengambil data untuk slug 'products'
        setPageContent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching products page content:", err);
      }
    };
    fetchPageContent();
  }, []); // [] agar hanya dijalankan sekali saat komponen mount

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading Products content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for Products page. Please add sections via admin dashboard.</div>;

  const getSectionContent = (sectionName) => {
    return pageContent.sections.find(sec => sec.section_name === sectionName)?.content;
  };

  // Ekstrak data untuk setiap section di halaman Products
  const productHeroSectionData = getSectionContent('product_hero_section');
  const productFeaturesSectionData = getSectionContent('product_features_section');
  const digitalTalentScholarshipSectionData = getSectionContent('digital_talent_scholarship_section');
  const diploySectionData = getSectionContent('diploy_section');
  const stankomdigiSectionData = getSectionContent('stankomdigi_section');

  return (
    <div className="product-page-windowed-container"> {/* Container paling luar untuk efek windowed */}
      <div className="product-page-content-wrapper"> {/* Wrapper untuk konten utama yang dibatasi lebarnya */}
        {productHeroSectionData && <ProductHeroSection data={productHeroSectionData} />}
        {productFeaturesSectionData && <ProductFeaturesSection data={productFeaturesSectionData} />}
        {digitalTalentScholarshipSectionData && <DigitalTalentScholarshipSection data={digitalTalentScholarshipSectionData} />}
        {diploySectionData && <DiploySection data={diploySectionData} />}
        {stankomdigiSectionData && <StankomdigiSection data={stankomdigiSectionData} />}
      </div>
      <style jsx="true">{`
          /* GLOBAL STYLES FOR PRODUCT PAGE (FOR BOXED LAYOUT) */
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html {
            overflow-x: hidden;
            width: 100%;
            background-color: #f0f0f0; /* Background di luar kotak */
          }
          .product-page-windowed-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center; /* Pusatkan konten horizontal */
            background-color: #f0f0f0;
            overflow-x: hidden;
          }
          .product-page-content-wrapper {
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

// === Component for the hero section of the Product page ===
const ProductHeroSection = ({ data }) => { // Menerima data dari prop
  const heroIllustration = data?.illustration_url || 'src/assets/product.png'; // Menggunakan URL dari data atau fallback
  const mainTitle = data?.main_title || "Empowering Indonesia’s Digital Talents";
  const subtitle = data?.subtitle || "An integrated ecosystem to accelerate skill development, certification, and career access — all in one platform.";

  return (
    <section className="product-hero-section-container">
      <div className="container"> {/* Tambahkan container baru untuk membatasi lebar konten */}
        <div className="product-hero-content-wrapper">
          <div className="product-hero-left-content">
            <h1 className="hero-main-title">{mainTitle}</h1>
            <p className="hero-subtitle">{subtitle}</p>
          </div>
          <div className="product-hero-right-illustration">
            <img src={heroIllustration} alt="Digital Talents Illustration" className="hero-graphic" />
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* product-hero-section-container (Frame 3 - Background) */
          .product-hero-section-container {
            display: flex; flex-direction: column; align-items: flex-start; padding: 0; /* Padding diatur oleh .container */ gap: 10px;
            width: 100%; max-width: 100%; height: auto; min-height: 500px; padding-bottom: 250px;
            background: #196ECD;
            color: white; box-sizing: border-box; position: relative; z-index: 0; overflow: hidden;
          }
          .product-hero-section-container .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: row; align-items: center; padding: 26px 20px; /* Padding internal konsisten */ width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            height: auto; box-sizing: border-box; flex-grow: 0; margin: auto; justify-content: space-between;
          }
          .product-hero-content-wrapper {
            display: flex; flex-direction: row; align-items: center; padding: 0px; width: 100%; max-width: 1280px; /* Lebar tidak perlu terlalu besar, diatur oleh parent */
            height: auto; box-sizing: border-box; flex-grow: 0; margin: auto; /* Margin auto untuk memusatkan di dalam container */
          }
          .product-hero-left-content {
            display: flex; flex-direction: column; align-items: flex-start; padding: 0px; padding-top: 50px; /* Tambahkan padding-top untuk menggeser teks ke bawah */ gap: 30px; width: 50%; /* Sesuaikan lebar */
            flex-grow: 0; flex-shrink: 0; text-align: left; box-sizing: border-box;
          }
          .hero-main-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 60px; line-height: 120%; color: #FFFFFF; margin: 0; box-sizing: border-box; word-break: break-word;
          }
          .hero-subtitle {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500;
            font-size: 32px; line-height: 120%; color: #FFFFFF; margin: 0; box-sizing: border-box; word-break: break-word;
          }
          .product-hero-right-illustration {
            width: 50%; height: auto; flex-grow: 1; display: flex; justify-content: center; align-items: center;
          }
          .hero-graphic {
            width: 100%; height: auto; max-width: 600px; display: block; object-fit: contain;
          }
          @media (max-width: 1200px) {
            .product-hero-section-container { padding-bottom: 150px; }
            .product-hero-section-container .container { padding: 20px 30px; flex-direction: column; align-items: center; gap: 30px; }
            .product-hero-content-wrapper { flex-direction: column; align-items: center; gap: 30px; }
            .product-hero-left-content { width: 100%; text-align: center; align-items: center; gap: 20px; padding-top: 30px; }
            .hero-main-title { font-size: 48px; width: 100%; max-width: 600px; }
            .hero-subtitle { font-size: 24px; width: 100%; max-width: 600px; }
            .product-hero-right-illustration { order: -1; width: 80%; max-width: 500px; }
          }
          @media (max-width: 768px) {
            .product-hero-section-container { padding-bottom: 100px; }
            .product-hero-section-container .container { padding: 20px 20px; }
            .product-hero-left-content { padding-top: 20px; }
            .hero-main-title { font-size: 36px; } .hero-subtitle { font-size: 18px; }
            .product-hero-right-illustration { max-width: 350px; }
          }
          @media (max-width: 480px) {
            .product-hero-section-container { padding-bottom: 80px; }
            .product-hero-section-container .container { padding: 15px 15px; }
            .product-hero-left-content { padding-top: 15px; }
            .hero-main-title { font-size: 28px; } .hero-subtitle { font-size: 16px; }
            .product-hero-right-illustration { max-width: 280px; }
          }
        `}
      </style>
    </section>
  );
};

// === Component for the product features section (4 cards) ===
const ProductFeaturesSection = ({ data }) => { // Menerima data dari prop
  // Mengambil data fitur dari prop atau menggunakan fallback
  // Pola: feature_0_icon, feature_0_title, feature_0_description
  const features = [
    { icon: data?.feature_0_icon, title: data?.feature_0_title, description: data?.feature_0_description },
    { icon: data?.feature_1_icon, title: data?.feature_1_title, description: data?.feature_1_description },
    { icon: data?.feature_2_icon, title: data?.feature_2_title, description: data?.feature_2_description },
    { icon: data?.feature_3_icon, title: data?.feature_3_title, description: data?.feature_3_description },
  ].filter(feature => feature && feature.icon && feature.title && feature.description);

  const finalFeatures = features.length > 0 ? features : [ // Fallback jika data dari backend kosong/tidak lengkap
    { icon: 'src/assets/stepbar.png', title: 'Learning Path & LMS (Default)', description: 'Facilitates targeted upskilling through curated digital learning journeys aligned with industry demands.' },
    { icon: 'src/assets/robot.png', title: 'AI-Powered Assistance (Default)', description: 'Streamlines participant selection and support services with intelligent automation.' },
    { icon: 'src/assets/mortarboard.png', title: 'Verified Digital Certification (Default)', description: 'Ensures participants receive accredited electronic certificates upon course completion.' },
    { icon: 'src/assets/bulleye.png', title: 'Career & Internship Access (Default)', description: 'Connects talents with real industry opportunities through integrated job and internship platforms.' },
  ];

  return (
    <section className="product-features-section-container">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="product-features-grid-wrapper">
          {finalFeatures.map((feature, index) => (
            <div className="feature-card" key={index}>
              <img src={feature.icon} alt={feature.title} className="feature-icon" />
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style jsx="true">{`
          /* product-features-section-container */
          .product-features-section-container {
            display: flex; flex-direction: column; align-items: center; padding: 0; /* Padding diatur oleh .container */ gap: 50px; width: 100%;
            background: transparent; box-sizing: border-box; font-family: 'Poppins', sans-serif; color: #333;
            margin-top: -170px; /* Kembali ke nilai semula */ position: relative; z-index: 2;
            /* Hapus overflow: hidden di sini jika ada, agar kartu bisa keluar saat zoom */
          }
          .product-features-section-container .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 0 20px; /* Padding internal konsisten */ gap: 50px;
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            box-sizing: border-box; margin: 0 auto;
          }
          .product-features-grid-wrapper {
            display: grid; grid-template-columns: repeat(4, 1fr); gap: 30px; width: 100%; max-width: 1360px; padding: 0; /* Padding dihapus, diatur oleh container */ box-sizing: border-box; justify-content: center;
            overflow: visible; /* Pastikan konten grid bisa "meluap" */
          }
          .feature-card {
            display: flex; flex-direction: column; justify-content: flex-start; align-items: center; padding: 41px 43px;
            gap: 10px; width: 100%; max-width: 336px; height: auto; min-height: 340px; background: #FFFFFF;
            border: 1px solid #B2CFEE; border-radius: 50px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); cursor: pointer;
            transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
            box-sizing: border-box;
            text-align: center;
            position: relative; /* Penting untuk z-index agar bekerja */
            z-index: 1; /* Nilai default yang lebih tinggi dari latar belakang, tapi rendah dari hover */
          }
          .feature-card:hover {
            background: #0C3766;
            border-color: #0C3766;
            transform: scale(1.08); /* Sedikit lebih besar untuk efek zoom */
            box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.3); /* Bayangan lebih kuat */
            z-index: 100; /* Pastikan ini sangat tinggi agar selalu di depan */
          }
          .feature-card:hover .feature-icon { filter: brightness(0) invert(1); }
          .feature-card:hover .feature-title, .feature-card:hover .feature-description { color: #FFFFFF; }
          .feature-icon { width: 50px; height: 50px; margin-bottom: 20px; transition: filter 0.3s ease; object-fit: contain; }
          .feature-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 24px; line-height: 120%; color: #196ECD; margin: 0; transition: color 0.3s ease; word-break: break-word; }
          .feature-description { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; overflow: visible; text-overflow: clip; display: block; -webkit-line-clamp: unset; -webkit-box-orient: unset; word-break: break-word; }
          @media (max-width: 1200px) {
            .product-features-section-container { margin-top: -100px; }
            .product-features-section-container .container { padding: 0 30px; }
            .product-features-grid-wrapper { grid-template-columns: repeat(2, 1fr); }
            .feature-card { max-width: none; min-height: 300px; padding: 30px; }
            .feature-title { font-size: 22px; } .feature-description { font-size: 18px; }
          }
          @media (max-width: 768px) {
            .product-features-section-container { margin-top: -80px; }
            .product-features-section-container .container { padding: 0 20px; }
            .product-features-grid-wrapper { grid-template-columns: 1fr; }
            .feature-card { min-height: 280px; padding: 25px; }
            .feature-title { font-size: 20px; } .feature-description { font-size: 16px; }
          }
          @media (max-width: 480px) {
            .product-features-section-container { margin-top: -60px; }
            .product-features-section-container .container { padding: 0 15px; }
            .feature-card { min-height: 250px; padding: 20px; }
            .feature-title { font-size: 18px; } .feature-description { font-size: 14px; }
          }
        `}
      </style>
    </section>
  );
};

// New component for Digital Talent Scholarship Section
const DigitalTalentScholarshipSection = ({ data }) => { // Menerima data dari prop
  const image = data?.image_url || 'src/assets/dtsilustrasi.png'; // Path to the digital talent illustration
  const logo = data?.logo_url || 'src/assets/logodts.png'; // Digitalent Logo
  const title = data?.title || "Digital Talent Scholarship";
  const subtitle = data?.subtitle || "A digital training platform offering certified programs in AI, programming, and data science—empowering Indonesia’s future-ready tech talent.";
  const features = [
    { icon: data?.feature_0_icon, text: data?.feature_0_text },
    { icon: data?.feature_1_icon, text: data?.feature_1_text },
  ].filter(f => f && f.icon && f.text);

  const stats = [
    { number: data?.stat_0_number, label: data?.stat_0_label },
    { number: data?.stat_1_number, label: data?.stat_1_label },
    { number: data?.stat_2_number, label: data?.stat_2_label },
  ].filter(s => s && s.number && s.label);
  const buttonText = data?.button_text || "View products";

  return (
    <section className="digital-talent-section-outer">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="digital-talent-box">
          <div className="digital-talent-content-wrapper">
            <div className="digital-talent-left-image">
              <img src={image} alt="Digital Talent Scholarship Illustration" className="digital-talent-graphic" />
            </div>
            <div className="digital-talent-right-content">
              <img src={logo} alt="Digitalent Logo" className="digitalent-logo" />
              <h2 className="digital-talent-title">{title}</h2>
              <p className="digital-talent-subtitle">{subtitle}</p>
              <div className="digital-talent-features">
                {features.map((feature, index) => (
                  <div className="digital-talent-feature-item" key={index}>
                    <img src={feature.icon} alt={`Check Icon ${index + 1}`} className="feature-check-image" />
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>
              <div className="digital-talent-divider"></div>
              <div className="digital-talent-stats">
                {stats.map((stat, index) => (
                  <div className="stat-item" key={index}>
                    <span className="stat-number">{stat.number}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <button className="view-products-button">{buttonText}</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* Outer container for the Digital Talent Scholarship section */
          .digital-talent-section-outer {
            display: flex; justify-content: center; align-items: center; width: 100%; background-color: #FFFFFF; padding: 0; /* Padding diatur oleh .container */ box-sizing: border-box; margin-top: 50px; overflow: hidden;
          }
          .digital-talent-section-outer .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 50px 20px; /* Padding internal konsisten */ gap: 50px;
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            box-sizing: border-box; margin: 0 auto;
          }
          .digital-talent-box {
            display: flex; flex-direction: column; align-items: flex-start; padding: 93px 143px; gap: 10px; width: 100%; max-width: 100%; /* Lebar diatur oleh parent .container */ height: auto; background: #D1E2F5; border-radius: 50px; box-sizing: border-box; margin: 0 auto; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
          }
          .digital-talent-content-wrapper {
            display: flex; flex-direction: row; align-items: center; padding: 0px; gap: 70px; width: 100%; height: auto; flex: none; order: 0; align-self: stretch; flex-grow: 0; box-sizing: border-box;
          }
          .digital-talent-left-image {
            display: flex; justify-content: center; align-items: center; width: 50%; height: auto;
          }
          .digital-talent-graphic {
            width: 100%; height: auto; max-width: 500px; display: block; object-fit: contain;
          }
          .digital-talent-right-content {
            display: flex; flex-direction: column; align-items: flex-start; gap: 20px; width: 50%; box-sizing: border-box; text-align: left;
          }
          .digitalent-logo {
            width: 120px; height: auto; margin-bottom: 10px; margin-left: 0;
          }
          .digital-talent-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 700; font-size: 40px; line-height: 120%; color: #196ECD; margin: 0; word-break: break-word;
          }
          .digital-talent-subtitle {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; word-break: break-word;
          }
          .digital-talent-features {
            display: flex; flex-direction: column; gap: 10px; width: 100%; margin-top: 10px; align-items: flex-start;
          }
          .digital-talent-feature-item {
            display: flex; align-items: center; gap: 10px;
          }
          .feature-check-image {
            width: 24px; height: 24px; min-width: 24px; object-fit: contain;
          }
          .digital-talent-feature-item p {
            font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; word-break: break-word;
          }
          .digital-talent-divider {
            width: 100%; border-top: 1px solid #C1D9F0; margin: 30px 0;
          }
          .digital-talent-stats {
            display: flex; flex-direction: row; gap: 40px; width: 100%; margin-top: 0; flex-wrap: wrap; justify-content: center; align-self: center;
          }
          .stat-item {
            display: flex; flex-direction: column; align-items: center;
          }
          .stat-number { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: 32px; line-height: 120%; color: #196ECD; }
          .stat-label { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 16px; line-height: 150%; color: #196ECD; }
          .view-products-button { display: inline-flex; flex-direction: row; justify-content: center; align-items: center; padding: 16px 24px; gap: 10px; background: #0C3766; border-radius: 10px; color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height: 150%; border: none; cursor: pointer; margin-top: 40px; transition: background 0.3s ease, transform 0.3s ease; align-self: center; }
          .view-products-button:hover { background: #196ECD; transform: translateY(-2px); }
          @media (max-width: 1200px) {
            .digital-talent-box { padding: 60px 80px; max-width: 95%; }
            .digital-talent-content-wrapper { flex-direction: column; gap: 40px; }
            .digital-talent-left-image { width: 100%; justify-content: center; }
            .digital-talent-right-content { width: 100%; align-items: flex-start; text-align: left; }
            .digitalent-logo { margin: 0 auto 10px auto; }
            .digital-talent-title { font-size: 36px; } .digital-talent-subtitle { font-size: 15px; }
            .digital-talent-features { align-items: flex-start; }
            .digital-talent-feature-item { width: 100%; justify-content: flex-start; }
            .stat-number { font-size: 28px; } .stat-label { font-size: 14px; }
            .view-products-button { margin-top: 30px; }
          }
          @media (max-width: 768px) {
            .digital-talent-box { padding: 40px 30px; border-radius: 30px; }
            .digital-talent-content-wrapper { gap: 30px; }
            .digital-talent-left-image { justify-content: center; }
            .digital-talent-right-content { align-items: flex-start; text-align: left; }
            .digitalent-logo { margin: 0 auto 10px auto; }
            .digital-talent-title { font-size: 28px; } .digital-talent-subtitle { font-size: 14px; }
            .digital-talent-features { align-items: flex-start; }
            .digital-talent-feature-item { justify-content: flex-start; }
            .digital-talent-graphic { max-width: 300px; }
            .digital-talent-view-products-button { padding: 12px 20px; font-size: 16px; margin-top: 20px; }
          }
          @media (max-width: 480px) {
            .digital-talent-box { padding: 25px 20px; border-radius: 20px; }
            .digital-talent-content-wrapper { gap: 20px; }
            .digital-talent-left-image { justify-content: center; }
            .digital-talent-right-content { align-items: flex-start; text-align: left; }
            .digitalent-logo { width: 100px; margin: 0 auto 10px auto; }
            .digital-talent-title { font-size: 24px; } .digital-talent-subtitle { font-size: 13px; }
            .digital-talent-features { align-items: flex-start; }
            .digital-talent-feature-item { justify-content: flex-start; }
            .digital-talent-graphic { max-width: 250px; }
            .digital-talent-view-products-button { padding: 12px 18px; font-size: 14px; }
          }
        `}
      </style>
    </section>
  );
};

// New component for Diploy Section
const DiploySection = ({ data }) => {
  const imageAsset = data?.image_url || 'src/assets/ilustrasidiploy.png'; // Illustration on the right
  const logoAsset = data?.logo_url || 'src/assets/logodiploy.png'; // Diploy logo on the left content
  
  // Mengambil data fitur dari prop atau menggunakan fallback
  const features = [
    { icon: data?.feature_0_icon, text: data?.feature_0_text },
    { icon: data?.feature_1_icon, text: data?.feature_1_text },
    { icon: data?.feature_2_icon, text: data?.feature_2_text },
    { icon: data?.feature_3_icon, text: data?.feature_3_text },
    { icon: data?.feature_4_icon, text: data?.feature_4_text },
  ].filter(f => f && f.icon && f.text);

  const finalFeatures = features.length > 0 ? features : [
    { icon: 'src/assets/2people.png', text: 'Access to 77,000 + trained graduates ready to contribute' },
    { icon: 'src/assets/note.png', text: 'Over 1,000 job vacancies and 500 + virtual internships from top employers' },
    { icon: 'src/assets/ceklis.png', text: 'Profiling and skill tests to match the right talent with your needs' },
    { icon: 'src/assets/mortarboard.png', text: 'Mentor-led classes to support continuous learning and career development' },
    { icon: 'src/assets/globe.png', text: 'Partnerships with corporates , government agencies , startups , academia , and NGOs' },
  ];

  return (
    <section className="diploy-section-outer">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="diploy-box">
          <div className="diploy-content-wrapper">
            <div className="diploy-left-content">
              <img src={logoAsset} alt="Diploy Logo" className="diploy-logo" />
              {/* New container for the line and title */}
              <div className="diploy-title-group">
                <div className="diploy-title-line"></div>
                <h2 className="diploy-title">Diploy</h2>
              </div>
              <p className="diploy-subtitle">Connecting training graduates with job opportunities, projects, and internships directly from businesses, governments, and startups—paving the way to a better career.</p>
              <div className="diploy-features">
                {finalFeatures.map((feature, index) => (
                  <div className="diploy-feature-item" key={index}>
                    <img src={feature.icon} alt={`Feature Icon ${index + 1}`} className="diploy-feature-icon" />
                    <p>{feature.text}</p>
                  </div>
                ))}
              </div>
              <button className="diploy-view-products-button">View products</button>
            </div>
            <div className="diploy-right-image">
              <img src={imageAsset} alt="Diploy Illustration" className="diploy-graphic" />
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* Outer container for the Diploy section */
          .diploy-section-outer {
            display: flex; justify-content: center; align-items: center; width: 100%; background-color: #FFFFFF; padding: 0; /* Padding diatur oleh .container */ box-sizing: border-box; margin-top: 50px; overflow: hidden;
          }
          .diploy-section-outer .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 50px 20px; /* Padding internal konsisten */ gap: 50px;
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            box-sizing: border-box; margin: 0 auto;
          }
          .diploy-box {
            display: flex; flex-direction: column; align-items: flex-start; padding: 95px 116px; gap: 10px; width: 100%; max-width: 100%; /* Lebar diatur oleh parent .container */ height: auto; background: #FFFFFF; border-radius: 50px; box-sizing: border-box; margin: 0 auto; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          .diploy-content-wrapper {
            display: flex; flex-direction: row; align-items: center; padding: 0px; gap: 70px; width: 100%; height: auto; flex: none; order: 0; align-self: stretch; flex-grow: 0; box-sizing: border-box;
          }
          .diploy-left-content {
            display: flex; flex-direction: column; align-items: flex-start; gap: 20px; width: 50%; box-sizing: border-box;
          }
          .diploy-logo {
            width: 120px; height: auto; margin-bottom: 10px; align-self: flex-start;
          }
          .diploy-title-group {
            display: flex; flex-direction: row; align-items: center; gap: 10px; width: 100%; margin-top: 0;
          }
          .diploy-title-line {
            width: 100px; height: 0px; background: #196ECD; border: 4px solid #196ECD; flex-shrink: 0;
          }
          .diploy-title {
            width: auto; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600; font-size: 40px; line-height: 120%; color: #196ECD; margin: 0; text-align: left; flex-grow: 1;
          }
          .diploy-subtitle {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; text-align: left; word-break: break-word;
          }
          .diploy-features {
            display: flex; flex-direction: column; gap: 15px; width: 100%; margin-top: 20px; align-items: flex-start;
          }
          .diploy-feature-item {
            display: flex; align-items: flex-start; gap: 10px;
          }
          .diploy-feature-icon {
            width: 24px; height: 24px; min-width: 24px;
          }
          .diploy-feature-item p {
            font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; text-align: left; word-break: break-word;
          }
          .diploy-right-image {
            display: flex; justify-content: center; align-items: center; width: 50%; height: auto;
          }
          .diploy-graphic {
            width: 100%; height: auto; max-width: 530px; display: block; object-fit: contain;
          }
          .diploy-view-products-button { display: inline-flex; flex-direction: row; justify-content: center; align-items: center; padding: 16px 24px; gap: 10px; background: #0C3766; border-radius: 10px; color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height: 150%; border: none; cursor: pointer; margin-top: 30px; transition: background 0.3s ease, transform 0.3s ease; align-self: flex-start; }
          .diploy-view-products-button:hover { background: #196ECD; transform: translateY(-2px); }
          @media (max-width: 1200px) {
            .diploy-box { padding: 60px 80px; max-width: 95%; }
            .diploy-content-wrapper { flex-direction: column; gap: 40px; }
            .diploy-left-content { width: 100%; align-items: center; text-align: center; }
            .diploy-logo { align-self: center; }
            .diploy-title-group { justify-content: center; gap: 5px; }
            .diploy-title-line { width: 70px; }
            .diploy-title { font-size: 36px; } .diploy-subtitle { font-size: 15px; }
            .diploy-features { align-items: flex-start; }
            .diploy-feature-item { width: 100%; justify-content: flex-start; }
            .diploy-right-image { width: 100%; order: -1; }
            .diploy-graphic { max-width: 400px; }
            .diploy-view-products-button { align-self: center; }
          }
          @media (max-width: 768px) {
            .diploy-box { padding: 40px 30px; border-radius: 30px; }
            .diploy-content-wrapper { gap: 30px; }
            .diploy-left-content { align-items: center; text-align: center; }
            .diploy-logo { align-self: center; }
            .diploy-title-group { justify-content: center; }
            .diploy-title-line { width: 50px; }
            .diploy-title { font-size: 30px; } .diploy-subtitle { font-size: 14px; }
            .diploy-features { align-items: flex-start; }
            .diploy-feature-item { justify-content: flex-start; }
            .diploy-graphic { max-width: 300px; }
            .diploy-view-products-button { align-self: center; }
          }
          @media (max-width: 480px) {
            .diploy-box { padding: 25px 20px; border-radius: 20px; }
            .diploy-content-wrapper { gap: 20px; }
            .diploy-left-content { align-items: center; text-align: center; }
            .diploy-logo { width: 100px; align-self: center; }
            .diploy-title-group { justify-content: center; }
            .diploy-title-line { width: 30px; }
            .diploy-title { font-size: 24px; } .diploy-subtitle { font-size: 13px; }
            .diploy-features { align-items: flex-start; }
            .diploy-feature-item { justify-content: flex-start; }
            .diploy-graphic { max-width: 250px; }
            .diploy-view-products-button { padding: 12px 18px; font-size: 14px; align-self: center; }
          }
        `}
      </style>
    </section>
  );
};

// New component for Stankomdigi Section
const StankomdigiSection = ({ data }) => {
  const imageAsset = data?.image_url || 'src/assets/ilustrasistankomdigi.png'; // Main illustration on the left
  const logoAsset = data?.logo_url || 'src/assets/logostankomdigi.png'; // Stankomdigi logo
  // Mengambil data fitur dari prop atau menggunakan fallback
  const features = [
    { icon: data?.feature_0_icon, title: data?.feature_0_title, description: data?.feature_0_description },
    { icon: data?.feature_1_icon, title: data?.feature_1_title, description: data?.feature_1_description },
  ].filter(f => f && f.icon && f.title && f.description);

  const finalFeatures = features.length > 0 ? features : [
    { icon: 'src/assets/buku1.png', title: 'Online Directory', description: 'Easy access to 46 Competency Standards and 3 Occupational Maps in one centralized platform.' },
    { icon: 'src/assets/workspace.png', title: 'Digital Collaboration Space', description: 'Secure, real-time collaboration to develop and update standards with key stakeholders.' },
  ];

  return (
    <section className="stankomdigi-section-outer">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="stankomdigi-box">
          <div className="stankomdigi-content-wrapper">
            <div className="stankomdigi-left-image"> {/* Image is on the left */}
              <img src={imageAsset} alt="Stankomdigi Illustration" className="stankomdigi-graphic" />
            </div>
            <div className="stankomdigi-right-content"> {/* Content is on the right */}
              <img src={logoAsset} alt="Stankomdigi Logo" className="stankomdigi-logo" />
              <h2 className="stankomdigi-title">Stankomdigi</h2>
              <p className="stankomdigi-subtitle">Stankomdigi is an integrated digital platform that enables structured collaboration among stakeholders to develop, refine, and access national competency standards and occupation maps — ensuring alignment with the evolving needs of Indonesia’s workforce.</p>
              <div className="stankomdigi-features">
                {finalFeatures.map((feature, index) => (
                  <div className="stankomdigi-feature-item" key={index}>
                    <img src={feature.icon} alt={feature.title} className="stankomdigi-feature-icon" />
                    <div>
                      <h3 className="stankomdigi-feature-title">{feature.title}</h3>
                      <p className="stankomdigi-feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="stankomdigi-view-products-button">View products</button>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* Outer container for the Stankomdigi section */
          .stankomdigi-section-outer {
            display: flex; justify-content: center; align-items: center; width: 100%; background-color: #FFFFFF; padding: 0; /* Padding diatur oleh .container */ box-sizing: border-box; margin-top: 50px; overflow: hidden;
          }
          .stankomdigi-section-outer .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 50px 20px; /* Padding internal konsisten */ gap: 50px;
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            box-sizing: border-box; margin: 0 auto;
          }
          .stankomdigi-box {
            display: flex; flex-direction: column; align-items: flex-start; padding: 93px 143px; gap: 10px; width: 100%; max-width: 100%; /* Lebar diatur oleh parent .container */ height: auto; background: #D1E2F5; border-radius: 50px; box-sizing: border-box; margin: 0 auto; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
          }
          .stankomdigi-content-wrapper {
            display: flex; flex-direction: row; align-items: center; padding: 0px; gap: 70px; width: 100%; height: auto; flex: none; order: 0; align-self: stretch; flex-grow: 0; box-sizing: border-box;
          }
          .stankomdigi-left-image {
            display: flex; justify-content: center; align-items: center; width: 50%; height: auto;
          }
          .stankomdigi-graphic {
            width: 100%; height: auto; max-width: 500px; display: block; object-fit: contain;
          }
          .stankomdigi-right-content {
            display: flex; flex-direction: column; align-items: flex-start; gap: 20px; width: 50%; box-sizing: border-box; text-align: left;
          }
          .stankomdigi-logo {
            width: 120px; height: auto; margin-bottom: 10px; align-self: flex-start;
          }
          .stankomdigi-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 700; font-size: 40px; line-height: 120%; color: #196ECD; margin: 0; text-align: left;
          }
          .stankomdigi-subtitle {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; text-align: left;
          }
          .stankomdigi-features {
            display: flex; flex-direction: column; gap: 15px; width: 100%; margin-top: 20px; align-items: flex-start;
          }
          .stankomdigi-feature-item {
            display: flex; align-items: flex-start; gap: 10px;
          }
          .stankomdigi-feature-icon {
            width: 24px; height: 24px; min-width: 24px; object-fit: contain;
          }
          .stankomdigi-feature-item h3 { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 20px; line-height: 120%; color: #196ECD; margin: 0; text-align: left; }
          .stankomdigi-feature-item p { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 16px; line-height: 150%; color: #196ECD; margin: 0; text-align: left; }
          .stankomdigi-view-products-button { display: inline-flex; flex-direction: row; justify-content: center; align-items: center; padding: 16px 24px; gap: 10px; background: #0C3766; border-radius: 10px; color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 18px; line-height: 150%; border: none; cursor: pointer; margin-top: 30px; transition: background 0.3s ease, transform 0.3s ease; align-self: flex-start; }
          .stankomdigi-view-products-button:hover { background: #196ECD; transform: translateY(-2px); }
          @media (max-width: 1200px) {
            .stankomdigi-box { padding: 60px 80px; max-width: 95%; }
            .stankomdigi-content-wrapper { flex-direction: column; gap: 40px; }
            .stankomdigi-left-image { width: 100%; order: -1; }
            .stankomdigi-graphic { max-width: 400px; }
            .stankomdigi-right-content { width: 100%; align-items: flex-start; text-align: left; }
            .stankomdigi-logo { align-self: center; }
            .stankomdigi-title { font-size: 36px; text-align: left; } .stankomdigi-subtitle { font-size: 15px; text-align: left; }
            .stankomdigi-features { align-items: flex-start; }
            .stankomdigi-feature-item { width: 100%; justify-content: flex-start; }
            .stankomdigi-feature-item h3 { font-size: 18px; text-align: left; } .stankomdigi-feature-item p { font-size: 14px; text-align: left; }
            .stankomdigi-view-products-button { align-self: center; }
          }
          @media (max-width: 768px) {
            .stankomdigi-box { padding: 40px 30px; border-radius: 30px; }
            .stankomdigi-content-wrapper { gap: 30px; }
            .stankomdigi-graphic { max-width: 300px; }
            .stankomdigi-right-content { align-items: flex-start; text-align: left; }
            .stankomdigi-logo { align-self: center; }
            .stankomdigi-title { font-size: 30px; } .stankomdigi-subtitle { font-size: 14px; }
            .stankomdigi-features { align-items: flex-start; }
            .stankomdigi-feature-item { justify-content: flex-start; }
            .stankomdigi-graphic { max-width: 300px; }
            .stankomdigi-view-products-button { align-self: center; }
          }
          @media (max-width: 480px) {
            .stankomdigi-box { padding: 25px 20px; border-radius: 20px; }
            .stankomdigi-content-wrapper { gap: 20px; }
            .stankomdigi-graphic { max-width: 250px; }
            .stankomdigi-logo { width: 100px; align-self: center; }
            .stankomdigi-title { font-size: 24px; text-align: left; } .stankomdigi-subtitle { font-size: 13px; text-align: left; }
            .stankomdigi-features { align-items: flex-start; }
            .stankomdigi-feature-item { justify-content: flex-start; }
            .stankomdigi-graphic { max-width: 250px; }
            .stankomdigi-view-products-button { padding: 12px 18px; font-size: 14px; align-self: center; }
          }
        `}
      </style>
    </section>
  );
};