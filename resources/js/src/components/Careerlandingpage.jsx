import React, { useState, useEffect } from 'react';
import apiClient from './api'; // Import instance Axios. PERBAIKAN: Pastikan path ini benar.

// PERBAIKAN: Hapus baris * { margin: 0; padding: 0; box-sizing: border-box; }
// dan body, html { ... } dari sini. Gaya ini harus di index.css atau app.css.
// Jika tidak dihapus, mereka akan dicetak berulang kali di setiap render dan tidak efektif.

// ==============================================
// Careerlandingpage (Komponen Utama)
// ==============================================
export default function Careerlandingpage() {
  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        setLoading(true);
        // PERBAIKAN: Pastikan URL API prefix '/api' sudah benar jika route ada di api.php
        const response = await apiClient.get('/api/pages/career');
        setPageContent(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching career page content:", err);
      }
    };
    fetchPageContent();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading Career content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent || !pageContent.sections) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for Career page. Please add sections via admin dashboard.</div>;

  const getSectionContent = (sectionName) => {
    return pageContent.sections.find(sec => sec.section_name === sectionName)?.content;
  };

  const careerHeroData = getSectionContent('career_hero_section');
  const benefitPerksSectionData = getSectionContent('benefit_perks_section');
  const exploreJobsSectionData = getSectionContent('explore_jobs_section');

  return (
    <div className="career-page-windowed-container">
      <div className="career-page-content-wrapper">
        {/* PERBAIKAN: Tambahkan fallback placeholder jika data section tidak ada */}
        {careerHeroData ? <CareerHero data={careerHeroData} /> : <div className="section-placeholder">Career Hero Section missing content.</div>}
        {benefitPerksSectionData ? <BenefitPerksSection data={benefitPerksSectionData} /> : <div className="section-placeholder">Benefit & Perks Section missing content.</div>}
        {exploreJobsSectionData ? <ExploreJobsSection data={exploreJobsSectionData} /> : <div className="section-placeholder">Explore Jobs Section missing content.</div>}
      </div>
      <style jsx="true">{`
        /* PERBAIKAN: Gaya global dihapus dari sini. Biarkan hanya gaya untuk kontainer utama */
        .career-page-windowed-container {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          /* background-color: #f0f0f0;  Ini harusnya di CSS global (index.css/app.css) atau di body element. */
          overflow-x: hidden;
        }
        .career-page-content-wrapper {
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
          /* PERBAIKAN: Berikan padding vertikal ke wrapper utama, bukan di setiap section */
          padding-top: 50px;
          padding-bottom: 50px;
          /* PERBAIKAN: Beri gap antar section di sini jika setiap section tidak punya margin-top/bottom sendiri */
          /* gap: 50px; */
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
      `}</style>
    </div>
  );
}

// ==============================================
// CareerHero Component
// ==============================================
function CareerHero({ data }) {
  // PERBAIKAN: Pastikan path aset dimulai dengan '/' untuk merujuk ke root public Vite
  const illustration = data?.illustration_url || '/src/assets/careerilustrator.png';
  const title = data?.title || "Launch Your Digital Career with Confidence";
  const subtitle = data?.subtitle || "Access a range of digital operator opportunities directly here.";

  return (
    <section className="career-hero">
      {/* PERBAIKAN: Gunakan class yang lebih spesifik untuk kontainer dalam. Hindari ".container" umum */}
      <div className="career-hero-inner-container">
        <div className="career-content">
          <div className="career-text">
            <h1 className="career-title">{title}</h1>
            <p className="career-subtitle">{subtitle}</p>
          </div>
          <div className="career-illustration">
            <img src={illustration} alt="Person working on laptop with job opportunities floating around" className="career-image" />
          </div>
        </div>
      </div>
      <style jsx="true">{`
        .career-hero {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #1e40af 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          width: 100%;
          /* PERBAIKAN: Jika Careerlandingpage-content-wrapper memiliki padding, ini tidak perlu padding atas/bawah */
          padding: 0;
          /* PERBAIKAN: Jarak antar section, sesuaikan dengan padding di wrapper utama */
          /* margin-bottom: 50px; */
        }

        .career-hero-inner-container { /* PERBAIKAN: Nama class yang lebih spesifik */
          max-width: 1100px; /* Lebar konten internal */
          margin: 0 auto;
          padding: 80px 20px; /* Padding internal konsisten */
          width: 100%;
          box-sizing: border-box;
        }

        .career-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 600px;
        }

        .career-text {
          color: white;
          z-index: 2;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .career-title {
          width: 100%; height: auto;
          font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 700;
          font-size: 48px; line-height: 120%; color: #FFFFFF;
          margin: 0; box-sizing: border-box; word-break: break-word;
        }

        .career-subtitle {
          width: 100%; height: auto;
          font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
          font-size: 32px; line-height: 120%; color: #FFFFFF;
          margin: 0; box-sizing: border-box; word-break: break-word;
        }

        .career-illustration {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .career-image {
          width: 100%; height: auto; max-width: 600px; object-fit: contain;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .career-hero-inner-container { padding: 60px 30px; }
          .career-content { grid-template-columns: 1fr; gap: 40px; text-align: center; min-height: auto; }
          .career-text { align-items: center; }
          .career-title { font-size: 44px; }
          .career-subtitle { font-size: 28px; }
          .career-illustration { order: -1; }
        }

        @media (max-width: 768px) {
          .career-hero { min-height: auto; padding: 60px 0; }
          .career-hero-inner-container { padding: 40px 20px; }
          .career-content { gap: 30px; }
          .career-title { font-size: 40px; }
          .career-subtitle { font-size: 24px; }
          .career-image { max-width: 500px; }
        }

        @media (max-width: 480px) {
          .career-hero { padding: 40px 0; }
          .career-hero-inner-container { padding: 30px 15px; }
          .career-content { gap: 20px; }
          .career-title { font-size: 32px; }
          .career-subtitle { font-size: 20px; }
          .career-image { max-width: 100%; }
        }

        @media (max-width: 360px) {
          .career-title { font-size: 28px; }
          .career-subtitle { font-size: 18px; }
        }
      `}</style>
    </section>
  );
}

// ==============================================
// BenefitPerksSection Component
// ==============================================
function BenefitPerksSection({ data }) {
  const benefits = [
    { icon: data?.benefit_0_icon, title: data?.benefit_0_title, description: data?.benefit_0_description },
    { icon: data?.benefit_1_icon, title: data?.benefit_1_title, description: data?.benefit_1_description },
    { icon: data?.benefit_2_icon, title: data?.benefit_2_title, description: data?.benefit_2_description },
    { icon: data?.benefit_3_icon, title: data?.benefit_3_title, description: data?.benefit_3_description },
    { icon: data?.benefit_4_icon, title: data?.benefit_4_title, description: data?.benefit_4_description },
    { icon: data?.benefit_5_icon, title: data?.benefit_5_title, description: data?.benefit_5_description },
  ].filter(benefit => benefit && benefit.icon && benefit.title && benefit.description);

  const finalBenefits = benefits.length > 0 ? benefits : [
    // PERBAIKAN: Tambahkan ID unik ke fallback data untuk key prop
    { id: 'bp1', icon: '/src/assets/career1.png', title: 'Verified Career Opportunities (Default)', description: 'Access curated job, internship from trusted partners.' },
    { id: 'bp2', icon: '/src/assets/career2.png', title: 'Flexible Internship Programs (Default)', description: 'Participate in hybrid or remote internships tailored to talent readiness.' },
    { id: 'bp3', icon: '/src/assets/career3.png', title: '300+ Institutional & Industry Partners (Default)', description: 'Collaborations with leading companies, ministries, and educational institutions.' },
    { id: 'bp4', icon: '/src/assets/career4.png', title: 'Unified Learning & Credential System (Default)', description: 'Track your training history and certifications in one integrated portfolio.' },
    { id: 'bp5', icon: '/src/assets/career5.png', title: 'AI-Driven Career Matching (Default)', description: 'Intelligent job matches based on your profile and achievements.' },
    { id: 'bp6', icon: '/src/assets/career6.png', title: 'Secure Digital Identity (Default)', description: 'Ensure trusted verification for career access and professional recognition.' },
  ];

  return (
    <section className="benefit-perks-section-background">
      {/* PERBAIKAN: Gunakan class yang lebih spesifik untuk kontainer dalam. Hindari ".container" umum */}
      <div className="benefit-perks-inner-container">
        <div className="benefit-perks-content-wrapper">
          <div className="benefit-perks-header">
            <h1 className="benefit-perks-title">{data?.title || "Benefit & Perks"}</h1>
            <p className="benefit-perks-subtitle">{data?.subtitle || "Great work deserves great perks—from learning to lifestyle support."}</p>
          </div>
          <div className="benefit-perks-cards-container">
            {finalBenefits.map((benefit, index) => (
              // PERBAIKAN: Tambahkan key prop. Gunakan benefit.id jika ada, atau index sebagai fallback.
              <div className="benefit-card" key={benefit.id || index}>
                <div className="benefit-icon-wrapper">
                  <img src={benefit.icon} alt={benefit.title} className="benefit-icon" />
                </div>
                <div className="benefit-text-content">
                  <h3 className="benefit-card-title">{benefit.title}</h3>
                  <p className="benefit-card-description">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx="true">{`
        /* Benefit & Perks Section Background */
        .benefit-perks-section-background {
          display: flex; flex-direction: column; align-items: center;
          padding: 0;
          width: 100%; max-width: 100%;
          height: auto; min-height: 660px; background: #FFFFFF; box-sizing: border-box;
          /* PERBAIKAN: Jarak antar section. Atur di sini atau di parent wrapper */
          margin-top: 50px;
          margin-bottom: 50px;
        }
        .benefit-perks-inner-container { /* PERBAIKAN: Nama class yang lebih spesifik */
          display: flex; flex-direction: column; align-items: center; padding: 65px 20px;
          gap: 70px;
          width: 100%; max-width: 1100px;
          height: auto; box-sizing: border-box; margin: 0 auto;
        }

        /* Inner Container for Benefit & Perks */
        .benefit-perks-content-wrapper {
          display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 70px;
          width: 100%; max-width: 100%; height: auto; box-sizing: border-box;
        }

        .benefit-perks-header {
          display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 20px;
          width: 100%; max-width: 803px; height: auto;
        }

        /* Benefit & Perks Title */
        .benefit-perks-title {
          width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
          font-size: 48px; line-height: 120%; text-align: center; color: #0A0A0A; margin: 0; word-break: break-word;
        }

        /* Benefit & Perks Subtitle */
        .benefit-perks-subtitle {
          width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 400;
          font-size: 24px; line-height: 117%; text-align: center; color: #404040; margin: 0; word-break: break-word;
        }

        /* Benefit Cards Container */
        .benefit-perks-cards-container {
          display: flex; flex-direction: row; flex-wrap: wrap; justify-content: center; align-items: flex-start;
          padding: 0px; gap: 40px;
          width: 100%; max-width: 100%; height: auto;
        }

        /* Individual Benefit Card */
        .benefit-card {
          display: flex; flex-direction: row; align-items: center;
          padding: 15px 20px; gap: 18px;
          /* PERBAIKAN: Untuk 3 kolom dengan gap 40px */
          width: calc((100% / 3) - (2 * 40px / 3));
          height: auto; min-height: 150px;
          background: #D1E2F5; border-radius: 8px; box-sizing: border-box; flex-shrink: 0;
        }

        .benefit-icon-wrapper {
          width: 100px; height: 120px; background: #FFFFFF; border-radius: 8px;
          display: flex; justify-content: center; align-items: center; flex-shrink: 0;
        }

        .benefit-icon {
          width: 100%; height: 100%; object-fit: contain;
        }

        .benefit-text-content {
          display: flex; flex-direction: column; align-items: flex-start; gap: 9px;
          width: auto; flex-grow: 1;
        }

        /* Benefit Card Title */
        .benefit-card-title {
          width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
          font-size: 20px; line-height: 120%; color: #0A0A0A; margin: 0; text-align: left; word-break: break-word;
        }

        /* Benefit Card Description */
        .benefit-card-description {
          width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 400;
          font-size: 14px; line-height: 143%; color: #404040; margin: 0; text-align: left; word-break: break-word;
        }

        /* --- Responsive Adjustments --- */
        @media (max-width: 1024px) {
          .benefit-perks-section-background .benefit-perks-inner-container { padding: 50px 30px; }
          .benefit-perks-content-wrapper { gap: 50px; }
          .benefit-perks-title { font-size: 42px; } .benefit-perks-subtitle { font-size: 20px; }
          .benefit-perks-cards-container { gap: 30px; }
          /* PERBAIKAN: 2 kartu per baris */
          .benefit-card { width: calc(50% - 15px); height: auto; min-height: 150px; }
          .benefit-icon-wrapper { width: 80px; height: 100px; }
          .benefit-card-title { font-size: 18px; } .benefit-card-description { font-size: 13px; }
        }

        @media (max-width: 768px) {
          .benefit-perks-section-background .benefit-perks-inner-container { padding: 40px 20px; }
          .benefit-perks-content-wrapper { gap: 40px; }
          .benefit-perks-title { font-size: 36px; } .benefit-perks-subtitle { font-size: 18px; }
          .benefit-perks-cards-container { gap: 20px; }
          /* PERBAIKAN: 1 kartu per baris, tumpuk konten */
          .benefit-card { width: 100%; flex-direction: column; align-items: center; justify-content: center; height: auto; min-height: 150px; padding: 15px; }
          .benefit-icon-wrapper { width: 70px; height: 80px; margin-bottom: 10px; }
          .benefit-text-content { text-align: center; align-items: center; }
          .benefit-card-title { font-size: 16px; text-align: center; }
          .benefit-card-description { font-size: 12px; text-align: center; }
        }

        @media (max-width: 480px) {
          .benefit-perks-section-background .benefit-perks-inner-container { padding: 30px 15px; }
          .benefit-perks-content-wrapper { gap: 30px; }
          .benefit-perks-title { font-size: 28px; } .benefit-perks-subtitle { font-size: 16px; }
          .benefit-perks-cards-container { gap: 15px; }
          .benefit-card { min-height: 140px; padding: 12px; }
          .benefit-icon-wrapper { width: 60px; height: 70px; }
          .benefit-card-title { font-size: 14px; } .benefit-card-description { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}

// ==============================================
// ExploreJobsSection Component
// ==============================================
function ExploreJobsSection({ data }) {
  // PERBAIKAN: Pastikan path aset dimulai dengan '/' untuk merujuk ke root public Vite
  const iconPaths = {
    building: data?.icon_building || '/src/assets/icongedung.png',
    location: data?.icon_location || '/src/assets/iconlokasi.png',
    briefcase: data?.icon_briefcase || '/src/assets/iconkoper.png',
    clock: data?.icon_clock || '/src/assets/iconjam.png',
  };

  const jobListings = [];
  if (data) {
    for (let i = 0; i < 20; i++) {
      const job = {
        id: data[`job_${i}_id`] || `job-${i}`, // PERBAIKAN: Tambahkan ID unik untuk key prop
        companyLogo: data[`job_${i}_companyLogo`],
        jobTitle: data[`job_${i}_jobTitle`],
        companyName: data[`job_${i}_companyName`],
        location: data[`job_${i}_location`],
        jobType: data[`job_${i}_jobType`],
        deadline: data[`job_${i}_deadline`],
      };
      if (job.jobTitle && job.companyName) {
        jobListings.push(job);
      } else {
        // PERBAIKAN: Lanjutkan iterasi jika job tidak ditemukan, jangan break.
        // Ini memastikan kita menemukan semua lowongan, meskipun ada gap di index.
        continue;
      }
    }
  }

  const finalJobListings = jobListings.length > 0 ? jobListings : [
    // PERBAIKAN: Tambahkan ID unik ke fallback data untuk key prop
    { id: 'ej1', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'Content Creator (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Full-time', deadline: '15 Jun 2025' },
    { id: 'ej2', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'UI/UX Designer (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Part-time', deadline: '20 Jun 2025' },
    { id: 'ej3', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'Data Scientist (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Full-time', deadline: '25 Jun 2025' },
    { id: 'ej4', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'Front-end Developer (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Internship', deadline: '30 Jun 2025' },
    { id: 'ej5', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'Back-end Developer (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Full-time', deadline: '05 Jul 2025' },
    { id: 'ej6', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'Digital Marketer (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Part-time', deadline: '10 Jul 2025' },
    { id: 'ej7', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'Product Manager (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Full-time', deadline: '15 Jul 2025' },
    { id: 'ej8', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'QA Engineer (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Full-time', deadline: '20 Jul 2025' },
    { id: 'ej9', companyLogo: '/src/assets/company-logo-placeholder.png', jobTitle: 'DevOps Engineer (Default)', companyName: 'Nama Perusahaan', location: 'Lokasi', jobType: 'Full-time', deadline: '25 Jul 2025' },
  ];

  return (
    <section className="explore-jobs-section-background">
      <div className="explore-jobs-inner-container"> {/* PERBAIKAN: Ubah nama class .container */}
        <h1 className="explore-jobs-title">{data?.title || "Explore Jobs"}</h1>
        <div className="explore-jobs-grid">
          {finalJobListings.map((job) => (
            <div className="job-card" key={job.id}> {/* PERBAIKAN: Tambahkan key prop */}
              <div className="job-card-header">
                <div className="company-logo-placeholder">
                  <img src={job.companyLogo || "/placeholder.svg"} alt="Company Logo" />
                </div>
                <h3 className="job-title-card">{job.jobTitle}</h3>
              </div>
              <div className="job-details">
                <div className="detail-item">
                  <img src={iconPaths.building} alt="Company Icon" className="detail-icon" />
                  <p className="detail-text">{job.companyName}</p>
                </div>
                <div className="detail-item">
                  <img src={iconPaths.location} alt="Location Icon" className="detail-icon" />
                  <p className="detail-text">{job.location}</p>
                </div>
                <div className="detail-item">
                  <img src={iconPaths.briefcase} alt="Job Type Icon" className="detail-icon" />
                  <p className="detail-text">{job.jobType}</p>
                </div>
                <div className="job-card-divider"></div>
                <div className="detail-item">
                  <img src={iconPaths.clock} alt="Clock Icon" className="detail-icon" />
                  <p className="detail-text-bold">Akhir Pendaftaran {job.deadline}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="see-more-button">{data?.button_text || "See More"}</button>
      </div>
      <style jsx="true">{`
        /* Explore Jobs Section Background */
        .explore-jobs-section-background {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0;
          gap: 10px;
          width: 100%; max-width: 100%;
          height: auto;
          min-height: 1170px;
          background: #D1E2F5;
          box-sizing: border-box;
          margin-top: 50px; /* PERBAIKAN: Jarak dari section sebelumnya */
          overflow: hidden;
        }
        .explore-jobs-inner-container { /* PERBAIKAN: Menggunakan nama class baru */
          display: flex; flex-direction: column; align-items: center; padding: 56px 20px;
          gap: 59px;
          width: 100%; max-width: 1100px;
          height: auto; box-sizing: border-box; margin: 0 auto;
        }

        /* Explore Jobs Title */
        .explore-jobs-title {
          width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
          font-size: 48px; line-height: 120%; text-align: center; color: #196ECD; margin: 0; word-break: break-word;
        }

        /* Explore Jobs Grid (for job cards) */
        .explore-jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          width: 100%;
          height: auto;
          justify-content: center;
        }

        /* Individual Job Card */
        .job-card {
          display: flex; flex-direction: column; align-items: flex-start; padding: 20px; gap: 10px;
          width: 100%;
          height: auto; min-height: 240px; background: #FFFFFF; border: 1px solid #E0E0E0;
          box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12); border-radius: 20px; box-sizing: border-box;
          flex-shrink: 0;
        }

        .job-card-header {
          display: flex; flex-direction: column; align-items: flex-start; padding: 0px; gap: 25px;
          width: 100%; height: auto;
        }

        .company-logo-placeholder {
          width: 60px; height: 60px; background: #D9D9D9; border-radius: 5px; display: flex;
          justify-content: center; align-items: center; flex-shrink: 0; overflow: hidden;
        }
        .company-logo-placeholder img {
          width: 100%; height: 100%; object-fit: contain;
        }

        .job-title-card {
          width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
          font-size: 16px; line-height: 150%; color: #000000; margin: 0; text-align: left;
        }

        .job-details {
          display: flex; flex-direction: column; align-items: flex-start; padding: 0px; gap: 10px;
          width: 100%; height: auto; flex-grow: 1;
        }

        .detail-item {
          display: flex; flex-direction: row; align-items: center; padding: 0px; gap: 7px;
          width: 100%; height: auto;
        }

        .detail-icon {
          width: 15px; height: 15px; flex-shrink: 0; object-fit: contain;
        }

        .detail-text {
          flex-grow: 1; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500;
          font-size: 12px; line-height: 18px; color: #616161; margin: 0; text-align: left;
          white-space: normal; overflow-wrap: break-word;
        }

        .job-card-divider {
          width: 100%; height: 0px; border-top: 1px solid #9E9E9E; margin: 0;
        }

        .detail-text-bold {
          flex-grow: 1; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
          font-size: 12px; line-height: 150%; color: #0A0A0A; margin: 0; text-align: left;
          white-space: normal; overflow-wrap: break-word;
        }

        .see-more-button {
          display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 16px 24px; gap: 10px;
          width: 139px; height: 52px; background: #196ECD; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
          border-radius: 12px; color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: 16px; line-height: 125%; border: none; cursor: pointer; margin-top: 40px;
          transition: background 0.3s ease, transform 0.3s ease;
        }

        .see-more-button:hover { background: #155CAB; transform: translateY(-2px); }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .explore-jobs-section-background .explore-jobs-inner-container { padding: 40px 30px; }
          .explore-jobs-title { font-size: 36px; }
          .explore-jobs-grid { grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 30px; }
          .job-card { max-width: none; }
        }

        @media (max-width: 768px) {
          .explore-jobs-section-background { margin-top: 30px; }
          .explore-jobs-section-background .explore-jobs-inner-container { padding: 30px 20px; }
          .explore-jobs-title { font-size: 28px; }
          .explore-jobs-grid { grid-template-columns: 1fr; gap: 20px; }
          .job-card { padding: 16px; }
          .see-more-button { width: 120px; height: 48px; font-size: 14px; padding: 12px 20px; margin-top: 30px; }
        }

        @media (max-width: 480px) {
          .explore-jobs-section-background { padding: 20px 15px; }
          .explore-jobs-title { font-size: 24px; }
          .job-card { padding: 12px; }
          .job-title-card { font-size: 14px; }
          .detail-text, .detail-text-bold { font-size: 11px; }
        }
      `}</style>
    </section>
  );
}