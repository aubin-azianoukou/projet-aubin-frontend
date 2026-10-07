"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    objet: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pré-remplissage du formulaire depuis les paramètres URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const formation = urlParams.get('formation');
    const sujet = urlParams.get('sujet');
    const message = urlParams.get('message');

    if (formation) {
      setFormData(prev => ({
        ...prev,
        objet: 'formation',
        message: `Je souhaite m'inscrire à la formation : ${formation}\n\n`
      }));
    }

    if (sujet) {
      setFormData(prev => ({ ...prev, objet: sujet }));
    }

    if (message) {
      setFormData(prev => ({ ...prev, message: message + (prev.message ? '\n\n' + prev.message : '') }));
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mqevvkya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Nouveau message depuis le site'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          objet: '',
          message: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="contact-container">

      <div className="spacer-contact"></div>

      {/* ===== HERO ===== */}
      <section className="hero-contact">
        <div className="hero-contact-container">
          <div className="hero-contact-content">
            <span className="badge-gold">CONTACT</span>
            <h1 className="hero-contact-title">Parlons de votre projet</h1>
            <p className="hero-contact-subtitle">Une réponse rapide pour clarifier vos besoins, votre projet ou la prochaine étape adaptée à votre objectif.</p>
            <p className="hero-contact-description">
              Que vous soyez entrepreneur, professionnel, organisation ou institution, je vous accompagne avec une approche concrète et personnalisée.
            </p>
          </div>
          <div className="hero-contact-right">
            <span className="badge-gold">PRISE DE CONTACT</span>
            <div className="mission-box-contact">
              <h2 className="mission-contact-title">Un échange, des solutions durables</h2>
              <p className="mission-contact-text">Chaque projet est unique. Je prends le temps d'écouter, de comprendre et de proposer une réponse adaptée à vos besoins et à votre contexte.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-contact"></div>

      {/* ===== CANAUX DIRECTS ===== */}
      <section className="section-contact-white">
        <div className="container-contact">
          <div className="section-header-contact">
            <span className="badge-gold">CONTACT RAPIDE</span>
            <h2 className="section-title-contact">Trois façons de me joindre</h2>
            <p className="section-subtitle-contact">Choisissez le canal qui vous convient le mieux. Je vous réponds dans les meilleurs délais.</p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="icon"><i className="fab fa-whatsapp"></i></div>
              <h3>WhatsApp</h3>
              <p>Le moyen le plus rapide pour échanger directement.</p>
              <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-contact">
                <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
              </a>
            </div>

            <div className="contact-card">
              <div className="icon"><i className="fas fa-phone"></i></div>
              <h3>Téléphone</h3>
              <p>Pour un échange plus direct, appelez-moi.</p>
              <a href="tel:+22667739734" className="btn-outline-contact">
                <i className="fas fa-phone"></i> +226 67 73 97 34
              </a>
            </div>

            <div className="contact-card">
              <div className="icon"><i className="fas fa-envelope"></i></div>
              <h3>Email</h3>
              <p>Pour un message détaillé ou un document à partager.</p>
              <a href="mailto:aubinromainfirst@gmail.com" className="btn-outline-contact" style={{ wordBreak: 'break-all', textAlign: 'center' }}>
                <i className="fas fa-envelope"></i> aubinromainfirst@gmail.com
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-contact"></div>

      {/* ===== FORMULAIRE ===== */}
      <section className="section-contact-light">
        <div className="container-contact">
          <div className="section-header-contact">
            <span className="badge-gold">ENVOYER UN MESSAGE</span>
            <h2 className="section-title-contact">Écrivez-moi directement</h2>
            <p className="section-subtitle-contact">Je vous réponds dans les meilleurs délais.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">Nom complet *</label>
                  <input
                    type="text"
                    id="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone</label>
                  <input
                    type="tel"
                    id="telephone"
                    value={formData.telephone}
                    onChange={handleChange}
                    placeholder="+226 XX XX XX XX"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="objet">Objet</label>
                  <select id="objet" value={formData.objet} onChange={handleChange}>
                    <option value="">Sélectionnez un sujet</option>
                    <option value="formation">Demande de formation</option>
                    <option value="consulting">Demande de consulting</option>
                    <option value="livre">Question sur un livre</option>
                    <option value="partenariat">Proposition de partenariat</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, votre besoin ou votre question..."
                  required
                ></textarea>
              </div>

              {submitStatus === 'success' && (
                <div style={{ textAlign: 'center', color: '#28a745', marginBottom: '16px', fontWeight: 600 }}>
                  ✅ Message envoyé avec succès ! Je vous répondrai rapidement.
                </div>
              )}
              {submitStatus === 'error' && (
                <div style={{ textAlign: 'center', color: '#dc3545', marginBottom: '16px', fontWeight: 600 }}>
                  ❌ Une erreur s'est produite. Veuillez réessayer ou me contacter directement sur WhatsApp.
                </div>
              )}

              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn-primary-contact" disabled={isSubmitting}>
                  <i className="fas fa-paper-plane"></i> {isSubmitting ? 'Envoi...' : 'Envoyer le message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="spacer-contact"></div>

      {/* ===== LOCALISATION ===== */}
      <section className="section-contact-white">
        <div className="container-contact">
          <div className="section-header-contact">
            <span className="badge-gold">LOCALISATION</span>
            <h2 className="section-title-contact">Basé à Ouagadougou, disponible partout</h2>
            <p className="section-subtitle-contact">Interventions au Burkina Faso et dans plusieurs pays d'Afrique.</p>
          </div>

          <div className="map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d3857.919033416325!2d-1.525141!3d12.371428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sfr!2sbf!4v1700000000000"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Carte de localisation"
            ></iframe>
          </div>
        </div>
      </section>

      <div className="spacer-contact"></div>

      {/* ===== RÉSEAUX SOCIAUX ===== */}
      <section className="section-contact-light">
        <div className="container-contact">
          <div className="section-header-contact">
            <span className="badge-gold">SUIVEZ-MOI</span>
            <h2 className="section-title-contact">Restez connecté</h2>
            <p className="section-subtitle-contact">Suivez mon actualité, mes publications et mes interventions.</p>
          </div>

          <div className="social-links">
            <a href="https://www.linkedin.com/in/aubinromainazianoukou" target="_blank" rel="noopener noreferrer" className="social-link linkedin">
              <i className="fab fa-linkedin-in"></i> LinkedIn
            </a>
            <a href="https://www.facebook.com/nomutilisateur" target="_blank" rel="noopener noreferrer" className="social-link facebook">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-contact"></div>

      {/* ===== CTA WHATSAPP ===== */}
      <section className="cta-final-contact">
        <div className="container-cta-contact">
          <h2 className="cta-title-contact">Une question urgente ?</h2>
          <p className="cta-text-contact">WhatsApp est le moyen le plus rapide pour échanger directement.</p>
          <div className="cta-group-contact">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta-contact">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-contact"></div>

      {/* ============================================================ */}
      {/* ===== STYLES ===== */}
      {/* ============================================================ */}
      <style>{`
        /* ===== VARIABLES ===== */
        :root {
          --color-navy: #06172f;
          --color-gold: #d4af37;
          --color-cream: #f8f5ee;
          --color-white: #ffffff;
          --color-gray: #6c7280;
          --color-gray-light: #dde3ee;
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Inter', 'Poppins', sans-serif;
        }

        /* ===== STYLES DE BASE ===== */
        .contact-container { background-color: var(--color-cream); }
        .spacer-contact { height: 36px; background-color: var(--color-cream); }
        .badge-gold {
          display: inline-block;
          background-color: rgba(6, 23, 47, 0.06);
          padding: 5px 14px;
          border-radius: 9999px;
          color: var(--color-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        /* ===== BOUTONS ===== */
        .btn-gold-contact {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-gold-contact:hover { background-color: #e1bb43; }

        .btn-outline-contact {
          border: 1px solid rgba(6, 23, 47, 0.25);
          color: var(--color-navy);
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 12px;
          transition: background-color 0.3s ease, color 0.3s ease;
          background: transparent;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
        }
        .btn-outline-contact:hover {
          background-color: var(--color-navy);
          color: var(--color-white);
        }

        .btn-primary-contact {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .btn-primary-contact:hover { background-color: #e1bb43; }
        .btn-primary-contact:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-gold-cta-contact {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
        }
        .btn-gold-cta-contact:hover { background-color: #e1bb43; }

        /* ===== HERO ===== */
        .hero-contact {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-contact-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-contact-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }
        .hero-contact-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero-contact-subtitle {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          opacity: 0.8;
          margin: 0;
        }
        .hero-contact-description {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.65;
          max-width: 700px;
          margin: 0;
        }
        .hero-contact-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
        .mission-box-contact {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-contact-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .mission-contact-text {
          margin-top: 12px;
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== SECTIONS ===== */
        .section-contact-white { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .section-contact-light { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-cream); }
        .container-contact { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .section-header-contact { text-align: center; margin-bottom: 30px; }
        .section-title-contact {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .section-subtitle-contact {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        /* ===== CONTACT CARDS ===== */
        .contact-cards {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .contact-card {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 28px 24px;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .contact-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .contact-card .icon { font-size: 32px; color: var(--color-gold); margin-bottom: 10px; }
        .contact-card h3 { font-size: 17px; font-weight: 700; color: var(--color-navy); margin-bottom: 6px; }
        .contact-card p { color: var(--color-gray); font-size: 13px; margin-bottom: 14px; }

        /* ===== FORMULAIRE ===== */
        .form-group { margin-bottom: 16px; }
        .form-group label {
          display: block;
          font-weight: 600;
          font-size: 13px;
          color: var(--color-navy);
          margin-bottom: 4px;
        }
        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid rgba(6, 23, 47, 0.15);
          border-radius: 12px;
          font-family: var(--font-sans);
          font-size: 14px;
          transition: border-color 0.3s ease;
          background-color: var(--color-white);
          color: var(--color-navy);
        }
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
          outline: none;
          border-color: var(--color-gold);
        }
        .form-group textarea { min-height: 120px; resize: vertical; }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* ===== MAP ===== */
        .map-container {
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(6, 23, 47, 0.1);
        }
        .map-container iframe {
          width: 100%;
          height: 350px;
          border: none;
          display: block;
        }

        /* ===== SOCIAL ===== */
        .social-links {
          display: flex;
          justify-content: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .social-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 9999px;
          padding: 10px 20px;
          font-weight: 600;
          font-size: 13px;
          color: var(--color-navy);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
          text-decoration: none;
        }
        .social-link:hover {
          box-shadow: 0 4px 16px rgba(6, 23, 47, 0.1);
          transform: translateY(-2px);
        }
        .social-link i { font-size: 18px; }
        .social-link.linkedin i { color: #0A66C2; }
        .social-link.facebook i { color: #1877F2; }

        /* ===== CTA ===== */
        .cta-final-contact {
          background-color: var(--color-navy);
          padding: 50px 20px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-contact { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-contact {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .cta-text-contact {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-group-contact {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-contact-title { font-size: 32px !important; }
          .mission-contact-title { font-size: 24px !important; }
          .contact-cards { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .spacer-contact { height: 16px !important; }
          .map-container iframe { height: 300px !important; }
        }

        @media (max-width: 768px) {
          .spacer-contact { height: 12px !important; }

          .hero-contact { padding: 30px 16px 25px 16px !important; }
          .hero-contact-container { gap: 22px !important; }
          .hero-contact-title { font-size: 26px !important; }
          .hero-contact-subtitle { font-size: 14px !important; }
          .hero-contact-description { font-size: 14px !important; }
          .mission-box-contact { padding: 18px !important; }
          .mission-contact-title { font-size: 22px !important; }
          .mission-contact-text { font-size: 14px !important; }

          .section-contact-white,
          .section-contact-light { padding: 35px 16px !important; }
          .section-title-contact { font-size: 22px !important; }
          .section-subtitle-contact { font-size: 14px !important; }

          .contact-cards { grid-template-columns: 1fr !important; gap: 14px !important; }
          .contact-card { padding: 20px 16px !important; }

          .form-row { grid-template-columns: 1fr !important; gap: 0 !important; }

          .social-links { flex-direction: column !important; align-items: center !important; }

          .cta-final-contact { padding: 35px 16px !important; }
          .cta-title-contact { font-size: 22px !important; }
          .cta-text-contact { font-size: 14px !important; }
          .btn-gold-cta-contact,
          .btn-primary-contact {
            width: 100% !important;
            justify-content: center !important;
            font-size: 13px !important;
            padding: 12px 16px !important;
          }

          .map-container iframe { height: 220px !important; }
        }

        @media (max-width: 480px) {
          .spacer-contact { height: 10px !important; }

          .hero-contact { padding: 20px 12px 16px 12px !important; }
          .hero-contact-title { font-size: 22px !important; }
          .hero-contact-subtitle { font-size: 13px !important; }
          .hero-contact-description { font-size: 13px !important; }
          .mission-contact-title { font-size: 19px !important; }
          .mission-contact-text { font-size: 13px !important; }

          .section-contact-white,
          .section-contact-light { padding: 28px 12px !important; }
          .section-title-contact { font-size: 20px !important; }
          .section-subtitle-contact { font-size: 13px !important; }

          .contact-card h3 { font-size: 16px !important; }

          .cta-final-contact { padding: 28px 12px !important; }
          .cta-title-contact { font-size: 20px !important; }
          .cta-text-contact { font-size: 13px !important; }
          .btn-gold-cta-contact,
          .btn-primary-contact {
            font-size: 12px !important;
            padding: 10px 14px !important;
          }

          .map-container iframe { height: 180px !important; }
        }
      `}</style>
    </main>
  );
}