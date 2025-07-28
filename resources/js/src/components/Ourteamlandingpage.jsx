import React, { useState, useEffect } from 'react';
import apiClient from './api'; // Pastikan PATH INI BENAR: './api'

// =========================================================
// KOMPONEN UTAMA HALAMAN OUR TEAM
// =========================================================
export default function Ourteamlandingpage() {
  const [pageContent, setPageContent] = useState(null);
  const [allMembers, setAllMembers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageAndMembersContent = async () => {
      try {
        setLoading(true);
        const pageResponse = await apiClient.get('/pages/our-team');
        setPageContent(pageResponse.data);

        const membersResponse = await apiClient.get('/members');
        const sortedMembers = membersResponse.data.sort((a, b) => (a.order || Infinity) - (b.order || Infinity));
        setAllMembers(sortedMembers);

        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching Our Team page or members content:", err);
      }
    };
    fetchPageAndMembersContent();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading Our Team content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for Our Team page. Please add sections via admin dashboard.</div>;

  const getSectionContent = (sectionName) => {
    return pageContent.sections.find(sec => sec.section_name === sectionName)?.content;
  };

  const oneTeamMissionHeroData = getSectionContent('one_team_mission_hero_section');
  const ourApproachSectionData = getSectionContent('our_approach_section');

  const memberOrder1 = allMembers?.find(member => member.order === 1);
  const memberOrder2 = allMembers?.find(member => member.order === 2);
  const coreTeamMembers = allMembers?.filter(member => member.order !== 1 && member.order !== 2) || [];

  return (
    <div className="our-team-page-wrapper">
      <div className="our-team-full-page-container">
        {oneTeamMissionHeroData && <OneTeamMissionHero data={oneTeamMissionHeroData} />}
        {ourApproachSectionData && <OurApproachSection data={ourApproachSectionData} />}
        {memberOrder1 && <TeamMembersSection member={memberOrder1} />}
        {memberOrder2 && <TeamMemberReversedSection member={memberOrder2} />}
        {coreTeamMembers.length > 0 && <OurCoreTeamSection members={coreTeamMembers} pageSectionData={getSectionContent('our_core_team_section')} />}
      </div>
      
      <style>{`
        /* GLOBAL RESET & BODY */
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body, html {
          overflow-x: hidden;
          width: 100%;
          font-family: 'Poppins', sans-serif;
          background-color: #f0f0f0;
        }

        /* --- Wrapper Utama Halaman (untuk efek "boxed") --- */
        .our-team-page-wrapper {
          width: 100%;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          background-color: #f0f0f0;
          overflow-x: hidden;
          /* border: 2px solid purple; */
        }

        /* --- Container untuk konten halaman yang sebenarnya (memiliki background putih dan shadow) --- */
        .our-team-full-page-container {
          background-color: #FFFFFF;
          width: 100%;
          max-width: 1200px;
          min-height: 100vh;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          overflow: hidden;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          /* border: 2px solid red; */
        }

        /* --- Kontainer Internal untuk Konten di Setiap Section --- */
        .section-inner-container {
            width: 100%;
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px;
            box-sizing: border-box;
            /* border: 1px dashed green; */
        }

        /* Responsive adjustments for .section-inner-container */
        @media (max-width: 1024px) {
          .section-inner-container {
            padding: 0 15px;
          }
        }
        @media (max-width: 768px) {
          .section-inner-container {
            padding: 0 10px;
          }
        }
        @media (max-width: 480px) {
          .section-inner-container {
            padding: 0 10px;
          }
        }
      `}</style>
    </div>
  );
}

// =========================================================
// KOMPONEN ANAK-ANAK HALAMAN OUR TEAM
// =========================================================

// === Komponen Bagian One Team, Shared Mission (Hero) ===
const OneTeamMissionHero = ({ data }) => {
  const imageUrl = data?.illustration_url || 'src/assets/ourteamlandingpage.png';
  const title = data?.title || "One Team, Shared Mission";
  const subtitle = data?.subtitle || "We work as one team with a shared goal, relying on synergy and collaboration to achieve success together.";

  return (
    <section className="one-team-mission-container">
      {/* Gunakan section-inner-container untuk kontennya */}
      <div className="section-inner-container">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="team-illustration-container">
          <img src={imageUrl} alt="Team Collaboration Illustration" className="team-graphic" />
        </div>
      </div>
      <style>{`
          /* one-team-mission-container (Banner our team) */
          .one-team-mission-container {
            display: flex; flex-direction: column; align-items: center; padding: 43px 0;
            width: 100%;
            height: 934px; background: #196ECD; color: white; box-sizing: border-box;
            overflow: hidden;
          }
          .one-team-mission-container .hero-title { font-size: 3.5rem; font-weight: bold; margin-bottom: 0; margin-top: 100px; line-height: 1.2; text-align: center; word-break: break-word; }
          .one-team-mission-container .hero-subtitle { font-size: 1.2rem; max-width: 800px; margin: 0 auto; line-height: 1.6; text-align: center; word-break: break-word; }
          .team-illustration-container { display: flex; justify-content: center; align-items: center; width: 100%; max-width: 1000px; height: auto; padding: 20px; box-sizing: border-box; }
          .team-graphic { width: 100%; height: auto; max-width: 900px; display: block; border-radius: 10px; object-fit: contain; }
          
          /* Responsive Adjustments untuk Hero */
          @media (max-width: 1024px) {
            .one-team-mission-container { padding: 40px 0; height: auto; min-height: 700px; }
            .one-team-mission-container .hero-title { font-size: 2.8rem; margin-top: 40px; }
            .one-team-mission-container .hero-subtitle { font-size: 1.1rem; }
            .team-illustration-container { padding: 15px; }
            .team-graphic { max-width: 700px; }
          }
          @media (max-width: 768px) {
            .one-team-mission-container { padding: 30px 0; min-height: 600px; }
            .one-team-mission-container .hero-title { font-size: 2.2rem; margin-top: 30px; }
            .one-team-mission-container .hero-subtitle { font-size: 1rem; }
            .team-illustration-container { padding: 10px; }
            .team-graphic { max-width: 500px; }
          }
          @media (max-width: 480px) {
            .one-team-mission-container { padding: 20px 0; min-height: 500px; }
            .one-team-mission-container .hero-title { font-size: 1.8rem; margin-top: 20px; }
            .one-team-mission-container .hero-subtitle { font-size: 0.9rem; }
            .team-illustration-container { padding: 5px; }
            .team-graphic { max-width: 100%; border-radius: 5px; }
          }
        `}</style>
    </section>
  );
};

// === Komponen Bagian Our Approach ===
const OurApproachSection = ({ data }) => {
  const approachCards = [
    { icon: data?.approach_0_icon, title: data?.approach_0_title, description: data?.approach_0_description },
    { icon: data?.approach_1_icon, title: data?.approach_1_title, description: data?.approach_1_description },
    { icon: data?.approach_2_icon, title: data?.approach_2_title, description: data?.approach_2_description },
    { icon: data?.approach_3_icon, title: data?.approach_3_title, description: data?.approach_3_description },
  ].filter(card => card && card.icon && card.title && card.description);

  const finalApproachCards = approachCards.length > 0 ? approachCards : [
    { icon: 'src/assets/personfill.png', title: 'Human-Centered (Default)', description: 'Tailored to support personal growth and long-term career progression.' },
    { icon: 'src/assets/koper.png', title: 'Industry-Aligned (Default)', description: 'Co-created with stakeholders to meet evolving market demands.' },
    { icon: 'src/assets/diagram.png', title: 'Technology-Driven (Default)', description: 'Leveraging cutting-cutting tools for efficient and impactful solutions.' },
    { icon: 'src/assets/barsignal.png', title: 'Continuous Evaluation (Default)', description: 'Regularly monitored and improved for quality and relevance.' },
  ];

  return (
    <section className="our-approach-section-container">
      {/* Menggunakan section-inner-container untuk kontennya */}
      {/* Tambahkan kelas "text-centered-content" untuk styling khusus ini */}
      <div className="section-inner-container text-centered-content">
        <h2 className="our-approach-title">{data?.title || "Our Approach"}</h2>
        <p className="our-approach-subtitle">{data?.subtitle || "We champion technology integration, partnership strategies, and end-to-end solutions from training to job placement, responsive to industry needs."}</p>
        <div className="approach-cards-grid">
          {finalApproachCards.map((card, index) => (
            <div className="approach-card" key={index}>
              <img src={card.icon} alt={card.title} className="approach-icon" />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
          /* OurApproachSection Container (Frame 14259) */
          .our-approach-section-container {
            display: flex; flex-direction: column; align-items: center; padding: 61px 0;
            width: 100%; min-height: 794px; background: #FFFFFF; box-sizing: border-box;
            font-family: 'Poppins', sans-serif; color: #333; overflow: hidden;
          }

          /* Gaya baru untuk memusatkan teks secara horizontal */
          .text-centered-content {
            display: flex; /* Aktifkan flexbox */
            flex-direction: column; /* Tata item secara vertikal */
            align-items: center; /* Pusatkan item secara horizontal di dalam kontainer flex */
            text-align: center; /* Pusatkan teks di dalam elemen-elemen teks */
          }

          .our-approach-title { font-size: 2.8rem; font-weight: bold; color: #196ECD; margin-bottom: 10px; word-break: break-word; }
          .our-approach-subtitle { font-size: 1.1rem; line-height: 1.6; margin-bottom: 30px; max-width: 700px; color: #555; word-break: break-word; }
          .approach-cards-grid { display: grid; grid-template-columns: repeat(2, 1fr); grid-template-rows: repeat(2, auto); gap: 40px; width: 100%; height: auto; }
          .approach-card { display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; gap: 5px; background: #196ECD; border-radius: 20px; color: white; box-sizing: border-box; height: 217px; width: auto; flex-grow: 1; }
          .approach-card h3 { font-size: 1.4rem; font-weight: bold; margin: 0; word-break: break-word; text-align: center; }
          .approach-card p { font-size: 0.95rem; line-height: 1.5; word-break: break-word; text-align: center; }
          .approach-icon { width: 50px; height: 50px; margin-bottom: 10px; object-fit: contain; }

          /* Responsive Adjustments for OurApproachSection */
          @media (max-width: 1200px) {
            .our-approach-section-container { padding: 50px 0; height: auto; min-height: auto; align-items: center; }
            .our-approach-title { font-size: 2.5rem; } .our-approach-subtitle { font-size: 1rem; }
            .approach-cards-grid { grid-template-columns: 1fr; gap: 30px; }
            .approach-card { width: 100%; height: auto; min-height: 200px; padding: 25px; }
            .approach-icon { width: 45px; height: 45px; } .approach-card h3 { font-size: 1.2rem; } .approach-card p { font-size: 0.85rem; }
          }
          @media (max-width: 768px) {
            .our-approach-section-container { padding: 40px 0; }
            .approach-cards-grid { gap: 25px; }
            .approach-card { min-height: 180px; padding: 20px; }
            .approach-icon { width: 40px; height: 40px; } .approach-card h3 { font-size: 1.1rem; } .approach-card p { font-size: 0.8rem; }
          }
          @media (max-width: 480px) {
            .our-approach-section-container { padding: 30px 0; }
            .approach-cards-grid { gap: 20px; }
            .approach-card { min-height: 160px; padding: 15px; }
            .approach-icon { width: 35px; height: 35px; } .approach-card h3 { font-size: 1rem; } .approach-card p { font-size: 0.75rem; }
          }
        `}</style>
    </section>
  );
};

// === Komponen Bagian Tim Utama (Foto Kiri) ===
const TeamMembersSection = ({ member }) => {
  if (!member) return null;

  return (
    <section className="team-members-section-container">
      <div className="section-inner-container team-member-card-wrapper">
        <div className="member-image-placeholder">
          <img src={member.photo_url || "src/assets/image_d998d9.png"} alt={member.name} className="member-image" />
        </div>
        <div className="member-details">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-position">{member.position}</p>
          <p className="member-bio">{member.bio}</p>
          <p className="member-quote">{member.quote || ""}</p>
          <div className="social-icons">
            {member.linkedin_url && (
              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                <img src="src/assets/linkin.png" alt="LinkedIn" className="social-icon" />
              </a>
            )}
            {member.email_url && (
              <a href={`mailto:${member.email_url}`} target="_blank" rel="noopener noreferrer">
                <img src="src/assets/email.png" alt="Email" className="social-icon" />
              </a>
            )}
          </div>
        </div>
      </div>

      <style>
        {`
            /* team-members-section-container (Frame 3, outer) */
            .team-members-section-container {
              display: flex; flex-direction: column; align-items: center; padding: 40px 0 67px;
              width: 100%;
              height: 757px; background: #FFFFFF; box-sizing: border-box;
              font-family: 'Poppins', sans-serif; color: #333; overflow: hidden;
            }

            /* team-member-card-wrapper (Frame 3, inner) sekarang gabung dengan section-inner-container */
            .team-member-card-wrapper {
              display: flex; flex-direction: row; align-items: center; padding: 50px; gap: 50px;
              /* width: 100%; /* Hapus atau override ini karena section-inner-container sudah mengaturnya */
              height: 650px; background: #D1E2F5; border-radius: 50px; box-sizing: border-box;
            }

            /* member-image-placeholder (Rectangle 1029) */
            .member-image-placeholder {
              width: 426px; height: 550px;
              background: #E0E0E0; flex-shrink: 0; border-radius: 10px; display: flex; justify-content: center;
              align-items: center; overflow: hidden; box-sizing: border-box;
            }
            .member-image {
              width: 100%; height: 100%; object-fit: cover; border-radius: 10px;
            }

            .member-details {
              display: flex; flex-direction: column; justify-content: center; align-items: flex-start;
              padding: 0px; gap: 30px; /* width: 648px; Hapus atau sesuaikan jika perlu */
              height: 346px;
              flex-grow: 1; box-sizing: border-box;
            }

            .member-details .member-name { font-size: 2rem; font-weight: bold; color: #000; margin: 0; word-break: break-word; }
            .member-details .member-position { font-size: 1.2rem; color: #000; margin: 0; word-break: break-word; }
            .member-details .member-bio { font-size: 1rem; line-height: 1.6; color: #000; margin: 0; word-break: break-word; }
            .member-details .member-quote { font-size: 1rem; font-style: italic; color: #000; margin: 0; word-break: break-word; }
            .social-icons { display: flex; gap: 15px; margin-top: 10px; }
            .social-icon { width: 35px; height: 35px; object-fit: contain; }

            /* Responsive Adjustments for TeamMembersSection */
            @media (max-width: 1200px) {
              .team-members-section-container { padding: 30px 0; min-height: auto; height: auto; }
              .team-member-card-wrapper { flex-direction: column; padding: 30px; gap: 40px; width: 100%; min-height: auto; height: auto; border-radius: 30px; }
              .member-image-placeholder { width: 250px; height: 325px; order: -1; }
              .member-details { align-items: center; text-align: center; width: 100%; height: auto; gap: 15px; }
              .member-details .member-name, .member-details .member-position, .member-details .member-bio, .member-details .member-quote { margin: 0; }
              .member-details .member-name { font-size: 1.8rem; } .member-details .member-position { font-size: 1.1rem; } .member-details .member-bio { font-size: 0.95rem; } .member-details .member-quote { font-size: 0.9rem; }
            }
            @media (max-width: 768px) {
              .team-members-section-container { padding: 20px 0; }
              .team-member-card-wrapper { padding: 20px; gap: 30px; border-radius: 20px; }
              .member-image-placeholder { width: 180px; height: 233px; order: -1; }
              .member-details .member-name { font-size: 1.5rem; } .member-details .member-position { font-size: 1rem; } .member-details .member-bio { font-size: 0.9rem; } .member-details .member-quote { font-size: 0.85rem; }
              .social-icon { width: 30px; height: 30px; }
            }
            @media (max-width: 480px) {
              .team-members-section-container { padding: 15px 0; }
              .team-member-card-wrapper { padding: 15px; gap: 20px; border-radius: 15px; }
              .member-image-placeholder { width: 120px; height: 155px; order: -1; }
              .member-details .member-name { font-size: 1.3rem; } .member-details .member-position { font-size: 0.9rem; } .member-details .member-bio { font-size: 0.85rem; } .member-details .member-quote { font-size: 0.8rem; }
              .social-icon { width: 25px; height: 25px; }
            }
          `}
        </style>
    </section>
  );
};

// Komponen baru untuk kotak tim yang dibalik (foto di kanan)
const TeamMemberReversedSection = ({ member }) => {
  if (!member) return null;

  return (
    <section className="team-members-section-container">
      <div className="section-inner-container team-member-card-wrapper reversed">
        <div className="member-details">
          <h3 className="member-name">{member.name}</h3>
          <p className="member-position">{member.position}</p>
          <p className="member-bio">{member.bio}</p>
          <p className="member-quote">{member.quote || ""}</p>
          <div className="social-icons">
            {member.linkedin_url && (
              <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                <img src="src/assets/linkin.png" alt="LinkedIn" className="social-icon" />
              </a>
            )}
            {member.email_url && (
              <a href={`mailto:${member.email_url}`} target="_blank" rel="noopener noreferrer">
                <img src="src/assets/email.png" alt="Email" className="social-icon" />
              </a>
            )}
          </div>
        </div>
        <div className="member-image-placeholder">
          <img src={member.photo_url || "src/assets/image_a73e5c.png"} alt={member.name} className="member-image" />
        </div>
      </div>
      <style>
        {`
            /* Responsive Adjustments for Reversed section image order */
            @media (max-width: 1200px) {
              .team-member-card-wrapper.reversed {
                flex-direction: column;
              }
              .team-member-card-wrapper.reversed .member-image-placeholder {
                order: -1;
              }
            }
          `}
      </style>
    </section>
  );
};

// Komponen untuk bagian "Our Core Team of Excellence" (Grid Anggota Lainnya)
const OurCoreTeamSection = ({ members, pageSectionData }) => {
  const title = pageSectionData?.title || "Our Core Team of Excellence";

  const defaultLinkedinIcon = "src/assets/linkin.png";
  const defaultEmailIcon = "src/assets/email.png";

  const finalCoreTeamMembers = members.length > 0 ? members : [
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 1 (Default)", position: "Posisi 1", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 2 (Default)", position: "Posisi 2", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 3 (Default)", position: "Posisi 3", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 4 (Default)", position: "Posisi 4", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 5 (Default)", position: "Posisi 5", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 6 (Default)", position: "Posisi 6", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 7 (Default)", position: "Posisi 7", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 8 (Default)", position: "Posisi 8", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
    { photo_url: "src/assets/crewilustrasi.png", name: "Nama Anggota 9 (Default)", position: "Posisi 9", bio: "Default bio.", linkedin_url: "https://www.linkedin.com/", email_url: "mailto:default@example.com" },
  ];

  return (
    <section className="core-team-section-container">
      <h2 className="core-team-title">{title}</h2>
      <div className="section-inner-container core-team-content-wrapper-inner">
        <div className="core-team-grid">
          {finalCoreTeamMembers.map((member, index) => (
            <div className="core-team-member-card" key={member.id || index}>
              {/* Konten Default (Image) */}
              <div className="core-team-normal-content">
                <img src={member.photo_url || "src/assets/crewilustrasi.png"} alt={member.name} className="core-team-member-photo" />
                <div className="core-team-info-wrapper">
                  <h3 className="core-team-member-name">{member.name}</h3>
                  <p className="core-team-member-position">{member.position}</p>
                </div>
              </div>

              {/* Konten Hover */}
              <div className="core-team-hover-content">
                <div className="core-team-hover-info-top">
                  <h3 className="core-team-member-name-hover">{member.name}</h3>
                  <p className="core-team-member-position-hover">{member.position}</p>
                </div>
                <p className="core-team-hover-bio">{member.bio}</p>
                <div className="core-team-hover-social-icons">
                  {member.linkedin_url && (
                    <a href={member.linkedin_url} target="_blank" rel="noopener noreferrer">
                      <img src={defaultLinkedinIcon} alt="LinkedIn" className="social-icon-hover" />
                    </a>
                  )}
                  {member.email_url && (
                    <a href={`mailto:${member.email_url}`} target="_blank" rel="noopener noreferrer">
                      <img src={defaultEmailIcon} alt="Email" className="social-icon-hover" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
            /* Our Core Team Section Container (Frame 14216) */
            .core-team-section-container {
              display: flex; flex-direction: column; align-items: center; padding: 120px 0; gap: 10px;
              width: 100%;
              min-height: 800px;
              background: #D1E2F5; box-sizing: border-box;
              font-family: 'Poppins', sans-serif; color: #333; overflow: hidden; justify-content: center;
            }
            .core-team-title { font-size: 2.8rem; font-weight: bold; color: #196ECD; text-align: center; margin-bottom: 50px; word-break: break-word; }
            .core-team-content-wrapper-inner {
                display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 109px; width: 100%; box-sizing: border-box;
            }

            .core-team-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 40px;
              width: 100%;
              justify-content: center;
              align-items: center;
            }

            .core-team-member-card {
              box-sizing: border-box;
              position: relative;
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              padding: 25px 35px;
              padding-top: 50px;
              gap: 10px;
              background: rgba(25, 110, 205, 0.2);
              border-radius: 15px;
              box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
              transition: background 0.3s ease, transform 0.3s ease;
              cursor: pointer;
              max-width: 100%;
              /* Gunakan aspek rasio atau tinggi yang fleksibel */
              height: auto; /* Biarkan tinggi menyesuaikan konten */
              min-height: 400px; /* Memberi tinggi minimum */
            }
            .core-team-member-card:hover { background: #196ECD; transform: translateY(-5px); }

            .core-team-normal-content {
              display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
              width: 100%; height: 100%; position: absolute; top: 0; left: 0; padding: 25px 35px; box-sizing: border-box;
              transition: opacity 0.3s ease, visibility 0.3s ease;
            }
            .core-team-member-card:hover .core-team-normal-content { opacity: 0; visibility: hidden; }
            
            .core-team-member-photo { width: 100%; height: auto; max-height: 300px; border-radius: 0; object-fit: contain; margin-bottom: 15px; border: none; display: block; }
            .core-team-info-wrapper { display: flex; flex-direction: column; align-items: center; padding: 0px; gap: 7px; height: auto; margin-top: 20px; margin-bottom: auto; }
            .core-team-member-name { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 24px; line-height: 28px; text-align: center; color: #196ECD; width: 100%; margin: 0; transition: color 0.3s ease; word-break: break-word; }
            .core-team-member-position { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 20px; line-height: 24px; text-align: center; color: #196ECD; width: 100%; margin: 0; transition: color 0.3s ease; word-break: break-word; }
            .core-team-hover-content { display: flex; flex-direction: column; align-items: flex-start; justify-content: space-between; padding: 40px; gap: 0; width: 100%; height: 100%; background: none; position: absolute; top: 0; left: 0; box-sizing: border-box; color: white; opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease; }
            .core-team-member-card:hover .core-team-hover-content { opacity: 1; visibility: visible; }
            .core-team-hover-info-top { display: flex; flex-direction: column; align-items: flex-start; padding: 0px; gap: 7px; height: auto; flex-shrink: 0; }
            .core-team-member-name-hover { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 24px; line-height: 28px; text-align: left; color: white; width: 100%; margin: 0; word-break: break-word; }
            .core-team-member-position-hover { font-family: 'Poppins', sans-serif; font-weight: 400; font-size: 20px; line-height: 24px; text-align: left; color: white; width: 100%; margin: 0; word-break: break-word; }
            .core-team-hover-bio { font-size: 0.95rem; line-height: 1.5; color: white; text-align: left; margin-top: 50px; margin-bottom: auto; flex-grow: 1; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 5; -webkit-box-orient: vertical; word-break: break-word; }
            .core-team-hover-social-icons { display: flex; gap: 15px; margin-top: auto; align-self: flex-start; }
            .social-icon-hover { width: 35px; height: 35px; object-fit: contain; background-color: white; border-radius: 50%; padding: 5px; box-sizing: border-box; }

            /* Responsive Adjustments for OurCoreTeamSection */
            @media (max-width: 1200px) {
              .core-team-section-container { padding: 80px 0; height: auto; min-height: auto; flex-direction: column; }
              .core-team-title { font-size: 2.2rem; margin-bottom: 40px; }
              .core-team-content-wrapper-inner { gap: 80px; height: auto; min-height: auto; }
              .core-team-grid { grid-template-columns: repeat(2, 1fr); gap: 30px; }
              .core-team-member-card { width: 100%; max-width: 400px; height: auto; min-height: 450px; padding: 20px 30px; padding-top: 40px; }
              .core-team-member-photo { max-height: 250px; }
              .core-team-info-wrapper, .core-team-hover-content { align-items: center; text-align: center; padding: 20px; }
              .core-team-hover-info-top { align-items: center; }
              .core-team-member-name, .core-team-member-position, .core-team-member-name-hover, .core-team-member-position-hover, .core-team-hover-bio { text-align: center; }
              .core-team-hover-social-icons { justify-content: center; align-self: center; }
            }
            @media (max-width: 768px) {
              .core-team-section-container { padding: 60px 0; }
              .core-team-title { font-size: 2rem; }
              .core-team-content-wrapper-inner { gap: 60px; }
              .core-team-grid { grid-template-columns: 1fr; gap: 25px; }
              .core-team-member-card { min-height: 400px; width: 100%; max-width: 350px; height: auto; padding: 20px 25px; padding-top: 30px; }
              .core-team-member-photo { max-height: 200px; }
              .core-team-member-name { font-size: 1.1rem; } .core-team-member-position { font-size: 0.8rem; }
            }
            @media (max-width: 480px) {
              .core-team-section-container { padding: 40px 0; }
              .core-team-title { font-size: 1.8rem; }
              .core-team-content-wrapper-inner { gap: 40px; }
              .core-team-grid { gap: 20px; }
              .core-team-member-card { min-height: 350px; width: 100%; padding: 15px 20px; padding-top: 25px; }
              .core-team-member-photo { max-height: 150px; }
              .core-team-member-name { font-size: 1.0rem; } .core-team-member-position { font-size: 0.75rem; }
            }
          `}
        </style>
    </section>
  );
};