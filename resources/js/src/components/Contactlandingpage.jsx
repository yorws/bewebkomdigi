import React, { useState, useEffect } from 'react';
import apiClient from './api'; // Import instance Axios

// Komponen utama untuk halaman "Contact"
export default function Contactlandingpage() {
  console.log('Contactlandingpage component rendered'); // DEBUG

  const [pageContent, setPageContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPageContent = async () => {
      console.log('Fetching contact page content...'); // DEBUG
      try {
        setLoading(true);
        const response = await apiClient.get('/pages/contact');
        console.log('API Response data:', response.data); // DEBUG: Lihat data yang diterima
        setPageContent(response.data);
        setLoading(false);
        console.log('Page content set successfully.'); // DEBUG
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching contact page content:", err); // DEBUG: Lihat error API
      }
    };
    fetchPageContent();
  }, []);

  console.log('Current pageContent state:', pageContent); // DEBUG
  console.log('Current loading state:', loading); // DEBUG
  console.log('Current error state:', error); // DEBUG

  if (loading) return <div className="flex justify-center items-center h-screen text-2xl text-blue-600">Loading Contact content...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-xl text-red-600">Error: {error.message}. Please check your backend connection and CORS.</div>;
  if (!pageContent) return <div className="flex justify-center items-center h-screen text-xl text-gray-600">No content found for Contact page. Please add sections via admin dashboard.</div>;

  const getSectionContent = (sectionName) => {
    const section = pageContent.sections.find(sec => sec.section_name === sectionName);
    console.log(`Getting section content for "${sectionName}":`, section?.content); // DEBUG
    return section?.content;
  };

  const contactHeroSectionData = getSectionContent('contact_hero_section');
  const contactDetailsAndFormSectionData = getSectionContent('contact_details_form_section');
  const mapSectionData = getSectionContent('map_section');

  return (
    <div className="contact-page-windowed-container"> {/* Container paling luar untuk efek windowed */}
      <div className="contact-page-content-wrapper"> {/* Wrapper untuk konten utama yang dibatasi lebarnya */}
        {contactHeroSectionData && <ContactHeroSection data={contactHeroSectionData} />}
        {contactDetailsAndFormSectionData && <ContactDetailsAndFormSection data={contactDetailsAndFormSectionData} />}
        {mapSectionData && <MapSection data={mapSectionData} />}
      </div>
      <style jsx="true">{`
          /* GLOBAL STYLES FOR CONTACT PAGE (FOR BOXED LAYOUT) */
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body, html {
            overflow-x: hidden;
            width: 100%;
            background-color: #f0f0f0; /* Background di luar kotak */
          }
          .contact-page-windowed-container {
            width: 100%;
            min-height: 100vh;
            display: flex;
            justify-content: center; /* Pusatkan konten horizontal */
            background-color: #f0f0f0;
            overflow-x: hidden;
          }
          .contact-page-content-wrapper {
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

function ContactHeroSection({ data }) {
  console.log('ContactHeroSection data received:', data); // DEBUG
  const illustration = data?.illustration_url || 'src/assets/contactilustrasi.png';
  const title = data?.title || "Reach Out. Collaborate. Grow Together.";
  const buttonText = data?.button_text || "Contact Us";
  console.log('ContactHeroSection buttonText:', buttonText); // DEBUG

  return (
    <section className="contact-hero-section">
      <div className="contact-hero-background-layout" style={{ backgroundImage: `url(${illustration})` }}>
        {/* Latar belakang biru bisa menjadi overlay atau bagian dari background-image */}
      </div>
      <div className="container"> {/* Gunakan .container untuk membatasi lebar konten */}
        <div className="contact-text-button-overlay">
          <h1 className="contact-title">{title}</h1>
          {/* Tombol hanya muncul jika ada buttonText dari admin (nilai non-empty string) */}
          {buttonText && buttonText !== '' && <button className="contact-us-button">{buttonText}</button>}
        </div>
      </div>
      <style jsx="true">{`
          /* Kontainer utama untuk bagian hero */
          .contact-hero-section {
            position: relative;
            width: 100%; /* Mengisi lebar content-wrapper */
            height: 584px; /* Tinggi tetap */
            overflow: hidden;
            margin-top: 0; /* Margin atas akan diatur oleh layout box */
            background-color: #196ECD; /* Default background biru */
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center; /* Untuk memusatkan .container secara horizontal */
            color: white;
          }
          .contact-hero-background-layout {
            position: absolute;
            width: 100%; /* Mengisi lebar penuh section */
            height: 100%;
            top: 0;
            left: 0;
            z-index: 0;
            background-color: #196ECD; /* Background biru solid */
            background-size: auto 100%; /* Ilustrasi mengisi tinggi */
            background-position: right center; /* Ilustrasi di kanan */
            background-repeat: no-repeat;
            /* Tambahkan gradient overlay untuk memastikan teks terbaca di atas gambar */
            background-image: linear-gradient(to right, #196ECD 40%, rgba(25, 100, 205, 0.8) 60%, rgba(25, 100, 205, 0) 100%), var(--illustration-url, url(${illustration}));
          }
          .contact-hero-section .container { /* Kontainer internal untuk membatasi lebar teks dan tombol */
            position: relative; /* Agar z-index bekerja */
            z-index: 1; /* Pastikan di atas background */
            width: 100%;
            max-width: 1100px; /* Konsisten dengan lebar konten */
            padding: 115px 20px; /* Padding internal */
            margin: 0 auto; /* Pusatkan */
            display: flex;
            flex-direction: column; /* Konten teks dan tombol akan di sini */
            align-items: flex-start; /* Rata kiri */
            justify-content: center; /* Pusatkan vertikal */
            height: 100%; /* Mengisi tinggi container */
            box-sizing: border-box;
          }
          .contact-text-button-overlay {
            display: flex; flex-direction: column; align-items: flex-start; padding: 0px; gap: 15px;
            width: 50%; /* Mengambil setengah lebar container untuk teks */
            height: auto;
            color: white; text-align: left; box-sizing: border-box;
            max-width: 450px; /* Batasan agar teks tidak terlalu lebar */
          }
          .contact-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 60px; line-height: 120%; color: #FFFFFF; margin: 0;
          }
          .contact-us-button {
            box-sizing: border-box; display: flex; flex-direction: row; justify-content: center; align-items: center;
            padding: 6px 16px; gap: 4px; width: 139px; height: 52px; background: #FFFFFF; border: 1px solid #E0E0E0;
            box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12); border-radius: 12px; color: #0A0A0A; font-family: 'Poppins', sans-serif;
            font-weight: 600; font-size: 16px; line-height: 125%; border: none; cursor: pointer; transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
          }
          .contact-us-button:hover { background-color: #F0F0F0; border-color: #B2CFEE; box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15); }

          /* Responsive Adjustments */
          @media (max-width: 1200px) {
            .contact-hero-section {
              height: auto; min-height: 500px; padding: 0; margin-top: 0; flex-direction: column; align-items: center; justify-content: center; padding-bottom: 50px;
            }
            .contact-hero-background-layout {
              position: relative; /* Ganti ke relative agar tidak mengganggu layout saat di kolom */
              height: 250px; /* Sesuaikan tinggi gambar background */
              background-size: contain; /* Agar ilustrasi tetap terlihat penuh */
              background-position: center center; /* Pusatkan ilustrasi */
              background-image: linear-gradient(to bottom, #196ECD 0%, rgba(25, 100, 205, 0.8) 50%, rgba(25, 100, 205, 0) 100%), var(--illustration-url, url(${illustration})); /* Gradient vertikal */
            }
            .contact-hero-section .container {
              padding: 40px 30px; flex-direction: column; align-items: center; text-align: center; height: auto;
            }
            .contact-text-button-overlay {
              width: 90%; max-width: 600px; margin-top: -150px; padding: 30px; background: #196ECD; border-radius: 20px;
              box-shadow: 0px 4px 10px rgba(0,0,0,0.2); align-items: center; text-align: center; z-index: 2;
            }
            .contact-title { font-size: 50px; }
            .contact-us-button { margin-top: 20px; }
          }
          @media (max-width: 768px) {
            .contact-hero-section { min-height: 400px; padding-bottom: 40px; }
            .contact-hero-background-layout { height: 200px; }
            .contact-text-button-overlay { margin-top: -120px; padding: 20px; }
            .contact-title { font-size: 40px; }
            .contact-us-button { width: 120px; height: 48px; font-size: 14px; }
          }
          @media (max-width: 480px) {
            .contact-hero-section { min-height: 350px; padding-bottom: 30px; }
            .contact-hero-background-layout { height: 180px; }
            .contact-text-button-overlay { margin-top: -100px; padding: 15px; }
            .contact-title { font-size: 32px; }
            .contact-us-button { width: 100px; height: 40px; font-size: 12px; }
          }
        `}
      </style>
    </section>
  );
}

function ContactDetailsAndFormSection({ data }) { // Menerima data dari prop
  console.log('ContactDetailsAndFormSection data received:', data); // DEBUG
  const geoAltIcon = data?.location_icon || 'src/assets/iconbuttonlokasi.png';
  const phoneIcon = data?.phone_icon || 'src/assets/iconbuttonhp.png';
  const envelopeIcon = data?.email_icon || 'src/assets/iconbuttonemail.png';

  return (
    <section className="contact-details-form-section-background">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="contact-details-form-content-wrapper">
          <div className="get-in-touch-form-container">
            <h2 className="get-in-touch-title">{data?.title || "Get In Touch"}</h2>
            <div className="form-fields">
              <div className="form-row">
                <input type="text" placeholder={data?.name_placeholder || "Name"} className="form-input-field half-width" />
                <input type="email" placeholder={data?.email_placeholder || "Email"} className="form-input-field half-width" />
              </div>
              <input type="text" placeholder={data?.subject_placeholder || "Subject"} className="form-input-field full-width" />
              <textarea placeholder={data?.message_placeholder || "Message"} className="form-textarea-field full-width"></textarea>
            </div>
            <button className="send-message-button">{data?.send_button_text || "Send Message"}</button>
          </div>

          <div className="contact-us-details-container">
            <h2 className="contact-us-details-title">{data?.details_title || "Contact Us"}</h2>
            <div className="contact-details-list">
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <img src={geoAltIcon} alt="Location Icon" className="contact-detail-icon" />
                </div>
                <p className="contact-detail-text" dangerouslySetInnerHTML={{ __html: data?.location_text || "Badan Pengembangan SDM Komdigi<br />Kementerian Komunikasi dan Digital RI<br />Jl. Medan Merdeka Barat No. 9, Jakarta Pusat, 10110" }}></p>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <img src={phoneIcon} alt="Phone Icon" className="contact-detail-icon" />
                </div>
                <p className="contact-detail-text">{data?.phone_text || "+3279976508"}</p>
              </div>
              <div className="contact-detail-item">
                <div className="contact-icon-wrapper">
                  <img src={envelopeIcon} alt="Envelope Icon" className="contact-detail-icon" />
                </div>
                <p className="contact-detail-text">{data?.email_text || "Lorem ipsum dolor sit amet consectetur."}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx="true">{`
          /* Section Background (Rectangle 932) */
          .contact-details-form-section-background {
            display: flex; flex-direction: column; align-items: center; padding: 0; /* Padding diatur oleh .container */ gap: 10px;
            width: 100%; max-width: 100%; height: auto; min-height: 711px; background: #FFFFFF; box-sizing: border-box;
            margin-top: 50px;
          }
          .contact-details-form-section-background .container { /* Kontainer internal untuk membatasi lebar konten */
            display: flex; flex-direction: column; align-items: center; padding: 56px 20px; /* Padding internal konsisten */ gap: 50px;
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */
            height: auto; box-sizing: border-box; margin: 0 auto;
          }

          /* Inner Container (Frame 3) */
          .contact-details-form-content-wrapper {
            display: flex; flex-direction: row; align-items: flex-start; justify-content: space-between;
            padding: 0px; gap: 40px; width: 100%; max-width: 100%; /* Lebar diatur oleh parent .container */ height: auto; box-sizing: border-box;
          }

          /* Get In Touch Form Container (Frame 3) */
          .get-in-touch-form-container {
            display: flex; flex-direction: column; align-items: flex-start; padding: 0px; gap: 35px;
            width: 50%; /* **Diperbaiki**: Proporsi 50/50 */ height: auto; box-sizing: border-box; flex-shrink: 0;
          }

          /* Get In Touch Title */
          .get-in-touch-title {
            width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600;
            font-size: 40px; line-height: 120%; color: #000000; margin: 0; text-align: left;
          }

          .form-fields { display: flex; flex-direction: column; gap: 25px; width: 100%; }
          .form-row { display: flex; flex-direction: row; gap: 38px; width: 100%; }
          .form-input-field { box-sizing: border-box; width: 100%; height: 64px; background: #FFFFFF; border: 1px solid #C2C2C2; box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.12); border-radius: 6px; padding: 6px 12px; font-family: 'Poppins', sans-serif; font-size: 16px; line-height: 24px; color: #0A0A0A; }
          .form-input-field::placeholder, .form-textarea-field::placeholder { color: #757575; }
          .form-textarea-field { box-sizing: border-box; width: 100%; height: 220px; background: #FFFFFF; border: 1px solid #C2C2C2; box-shadow: inset 1px 2px 2px rgba(0, 0, 0, 0.12); border-radius: 6px; padding: 6px 12px; font-family: 'Poppins', sans-serif; font-size: 16px; line-height: 24px; color: #0A0A0A; resize: vertical; }

          .form-input-field.half-width { flex-basis: calc(50% - 19px); }
          .form-input-field.full-width { flex-basis: 100%; }

          /* Send Message Button */
          .send-message-button {
            display: flex; flex-direction: row; justify-content: center; align-items: center; padding: 16px 24px; gap: 10px;
            width: 151px; height: 52px; background: #196ECD; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12);
            border-radius: 12px; color: #FFFFFF; font-family: 'Poppins', sans-serif; font-weight: 600;
            font-size: 16px; line-height: 125%; border: none; cursor: pointer; transition: background 0.3s ease, transform 0.3s ease;
          }
          .send-message-button:hover { background: #155CAB; transform: translateY(-2px); }

          /* Contact Us Details Container */
          .contact-us-details-container {
            display: flex; flex-direction: column; align-items: flex-start; padding: 0px; gap: 25px;
            width: 45%; /* **Diperbaiki**: Proporsi 50/50, dengan sedikit ruang */ height: auto; box-sizing: border-box; flex-shrink: 0;
          }
          /* Contact Us Details Title */
          .contact-us-details-title { width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 600; font-size: 40px; line-height: 120%; color: #000000; margin: 0; text-align: left; }
          .contact-details-list { display: flex; flex-direction: column; gap: 10px; width: 100%; }
          .contact-detail-item { display: flex; flex-direction: row; align-items: flex-start; gap: 10px; width: 100%; }
          .contact-icon-wrapper { box-sizing: border-box; display: flex; justify-content: center; align-items: center; width: 48px; height: 48px; background: #FFFFFF; border: 1px solid #E0E0E0; box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.12); border-radius: 100px; flex-shrink: 0; }
          .contact-detail-icon { width: 20px; height: 20px; object-fit: contain; }
          .contact-detail-text { width: 100%; height: auto; font-family: 'Poppins', sans-serif; font-style: normal; font-weight: 500; font-size: 16px; line-height: 150%; color: #404040; margin: 0; text-align: left; }

          /* Responsive Adjustments */
          @media (max-width: 1200px) {
            .contact-details-form-section-background .container { padding: 40px 30px; min-height: auto; }
            .contact-details-form-content-wrapper { flex-direction: column; gap: 60px; align-items: center; }
            .get-in-touch-form-container, .contact-us-details-container { width: 100%; max-width: 600px; align-items: center; text-align: center; }
            .get-in-touch-title, .contact-us-details-title { font-size: 36px; text-align: center; }
            .form-row { flex-direction: column; gap: 20px; align-items: center; }
            .form-input-field.half-width { width: 100%; flex-basis: auto; }
            .form-textarea-field { height: 150px; }
            .send-message-button { align-self: center; }
            .contact-details-list { align-items: center; }
            .contact-detail-item { flex-direction: column; align-items: center; }
            .contact-detail-text { text-align: center; }
          }
          @media (max-width: 768px) {
            .contact-details-form-section-background .container { padding: 30px 20px; }
            .contact-details-form-content-wrapper { gap: 40px; }
            .get-in-touch-title, .contact-us-details-title { font-size: 30px; }
            .form-input-field, .form-textarea-field { font-size: 14px; }
            .send-message-button { font-size: 14px; width: 120px; height: 48px; }
            .contact-detail-text { font-size: 14px; }
          }
          @media (max-width: 480px) {
            .contact-details-form-section-background .container { padding: 20px 15px; }
            .contact-details-form-content-wrapper { gap: 30px; }
            .get-in-touch-title, .contact-us-details-title { font-size: 24px; }
            .form-input-field, .form-textarea-field { font-size: 12px; }
            .send-message-button { font-size: 12px; width: 100px; height: 40px; }
            .contact-detail-text { font-size: 12px; }
          }
        `}
      </style>
    </section>
  );
}

function MapSection({ data }) { // Menerima data dari prop
  const mapImage = data?.map_image_url || 'src/assets/figmap.jpg'; // Path to your map image asset

  return (
    <section className="map-section-background">
      <div className="container"> {/* Gunakan .container untuk membatasi lebar */}
        <div className="map-container">
          <img src={mapImage} alt="Map of location" className="map-graphic" />
        </div>
      </div>
      <style jsx="true">{`
          /* Map Section Background */
          .map-section-background {
            width: 100%; max-width: 100%; height: auto; min-height: 446px; background: #FFFFFF; box-sizing: border-box;
            margin-top: 50px; display: flex; justify-content: center; align-items: center; padding: 0; /* Padding diatur oleh .container */
          }
          .map-section-background .container { /* Kontainer internal untuk membatasi lebar konten */
            width: 100%; max-width: 1100px; /* Konsisten dengan lebar konten utama */ height: auto; box-sizing: border-box;
            margin: 0 auto; padding: 20px; /* Padding internal */
            display: flex; /* **Diperbaiki**: Menjadikan flex container */
            justify-content: center; /* **Diperbaiki**: Pusatkan gambar peta */
            align-items: center; /* Pusatkan secara vertikal juga */
          }

          .map-container {
            width: 100%; max-width: 847px; height: 446px; overflow: hidden; display: flex; justify-content: center; align-items: center;
          }

          .map-graphic {
            width: 100%; height: 100%; object-fit: contain; display: block;
          }

          /* Responsive Adjustments for Map Section */
          @media (max-width: 1200px) {
            .map-section-background .container { padding: 40px; }
            .map-container { max-width: 700px; height: 350px; }
          }

          @media (max-width: 768px) {
            .map-section-background .container { padding: 30px; }
            .map-container { max-width: 500px; height: 280px; }
          }

          @media (max-width: 480px) {
            .map-section-background .container { padding: 20px; }
            .map-container { max-width: 100%; height: 200px; }
          }
        `}
      </style>
    </section>
  );
}