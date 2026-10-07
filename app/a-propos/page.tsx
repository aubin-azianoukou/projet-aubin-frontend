"use client";

import Link from 'next/link';

export default function AProposPage() {
  return (
    <main className="a-propos-container">

      <div className="spacer-a-propos"></div>

      {/* ===== HERO ===== */}
      <section className="hero-a-propos">
        <div className="hero-a-propos-container">
          <div className="hero-a-propos-content">
            <span className="badge-gold">À PROPOS</span>
            <h1 className="hero-a-propos-title">Un accompagnement de terrain pour des décisions plus solides</h1>
            <p className="hero-a-propos-subtitle">Depuis Ouagadougou, au service des entrepreneurs, des entreprises et des institutions en Afrique.</p>
            <p className="hero-a-propos-description">
              Je crois que la meilleure façon d'accompagner, c'est de comprendre le terrain, les contraintes et les aspirations de celles et ceux qui entreprennent. Mon approche allie rigueur, pédagogie et expérience concrète.
            </p>
          </div>
          <div className="hero-a-propos-right">
            <span className="badge-gold">MON PARCOURS</span>
            <div className="mission-box-a-propos">
              <h2 className="mission-a-propos-title">De l'expérience de terrain à la transmission</h2>
              <p className="mission-a-propos-text">20 ans d'expérience à accompagner des organisations, à former des équipes et à structurer des projets. Une conviction : la performance durable passe par le développement des compétences et la clarté des objectifs.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-a-propos"></div>

      {/* ===== PARCOURS + STATISTIQUES ===== */}
      <section className="section-a-propos-white">
        <div className="container-a-propos">
          <div className="about-grid-a-propos">
            <div className="about-text-a-propos">
              <span className="badge-gold">MON PARCOURS</span>
              <h2>Une vision claire, une expérience ancrée</h2>
              <p>
                Mon parcours m'a conduit à travers plusieurs pays d'Afrique, à accompagner des PME, des institutions et des entrepreneurs dans leur développement. J'ai appris que chaque projet est unique et que la rigueur, l'écoute et la pédagogie sont les clés d'un accompagnement réussi.
              </p>
              <p>
                Aujourd'hui, je mets cette expérience au service de celles et ceux qui veulent structurer leurs projets, former leurs équipes et construire une réussite durable.
              </p>
              <Link href="/contact" className="btn-dark-a-propos">Travaillons ensemble</Link>
            </div>
            <div className="about-stats-a-propos">
              <div className="stat-card-a-propos">
                <div className="number">20+</div>
                <div className="label">années d'expérience</div>
              </div>
              <div className="stat-card-a-propos">
                <div className="number">5 000+</div>
                <div className="label">personnes formées</div>
              </div>
              <div className="stat-card-a-propos">
                <div className="number">100+</div>
                <div className="label">entreprises accompagnées</div>
              </div>
              <div className="stat-card-a-propos">
                <div className="number">Afrique</div>
                <div className="label">plusieurs pays d'intervention</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-a-propos"></div>

      {/* ===== VALEURS ===== */}
      <section className="section-a-propos-light">
        <div className="container-a-propos">
          <div className="section-header-a-propos">
            <span className="badge-gold">MES VALEURS</span>
            <h2 className="section-title-a-propos">Ce qui guide mon accompagnement</h2>
            <p className="section-subtitle-a-propos">Des principes qui structurent ma manière de travailler et d'accompagner.</p>
          </div>
          <div className="values-grid-a-propos">
            <div className="value-card-a-propos">
              <div className="icon"><i className="fas fa-handshake"></i></div>
              <h3>Rigueur</h3>
              <p>Une méthode structurée pour des résultats concrets et mesurables.</p>
            </div>
            <div className="value-card-a-propos">
              <div className="icon"><i className="fas fa-graduation-cap"></i></div>
              <h3>Transmission</h3>
              <p>Partager l'expérience pour permettre à chacun de progresser.</p>
            </div>
            <div className="value-card-a-propos">
              <div className="icon"><i className="fas fa-seedling"></i></div>
              <h3>Impact durable</h3>
              <p>Construire des solutions qui perdurent au-delà de l'accompagnement.</p>
            </div>
            <div className="value-card-a-propos">
              <div className="icon"><i className="fas fa-map-pin"></i></div>
              <h3>Proximité terrain</h3>
              <p>Comprendre les réalités locales pour mieux accompagner.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-a-propos"></div>

      {/* ===== MISSION ===== */}
      <section className="section-a-propos-white">
        <div className="container-a-propos">
          <div className="mission-section-a-propos">
            <span className="badge-gold">MA MISSION</span>
            <h2>Développer les compétences, structurer les entreprises et accompagner la réussite durable.</h2>
            <p>Formations, conseil, publications et développement du potentiel humain : quatre piliers pour une même ambition.</p>
            <Link href="/formations" className="btn-primary-a-propos">
              <i className="fas fa-arrow-right"></i> Découvrir les formations
            </Link>
          </div>
        </div>
      </section>

      <div className="spacer-a-propos"></div>

      {/* ===== CTA WHATSAPP ===== */}
      <section className="cta-final-a-propos">
        <div className="container-cta-a-propos">
          <h2 className="cta-title-a-propos">Travaillons ensemble</h2>
          <p className="cta-text-a-propos">Un échange pour clarifier votre projet, vos besoins ou la prochaine étape adaptée à votre objectif.</p>
          <div className="cta-group-a-propos">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta-a-propos">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-a-propos"></div>

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
        .a-propos-container { background-color: var(--color-cream); }
        .spacer-a-propos { height: 36px; background-color: var(--color-cream); }
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
        .btn-dark-a-propos {
          background-color: var(--color-navy);
          color: var(--color-white);
          padding: 12px 18px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 13px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .btn-dark-a-propos:hover { background-color: #0a1f3d; }

        .btn-primary-a-propos {
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
        .btn-primary-a-propos:hover { background-color: #e1bb43; }

        .btn-gold-cta-a-propos {
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
        .btn-gold-cta-a-propos:hover { background-color: #e1bb43; }

        /* ===== HERO ===== */
        .hero-a-propos {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-a-propos-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-a-propos-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }
        .hero-a-propos-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero-a-propos-subtitle {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          opacity: 0.8;
          margin: 0;
        }
        .hero-a-propos-description {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.65;
          max-width: 700px;
          margin: 0;
        }
        .hero-a-propos-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
        .mission-box-a-propos {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-a-propos-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .mission-a-propos-text {
          margin-top: 12px;
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== SECTIONS ===== */
        .section-a-propos-white { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .section-a-propos-light { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-cream); }
        .container-a-propos { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .section-header-a-propos { text-align: center; margin-bottom: 30px; }
        .section-title-a-propos {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .section-subtitle-a-propos {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        /* ===== ABOUT GRID ===== */
        .about-grid-a-propos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .about-text-a-propos {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .about-text-a-propos h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .about-text-a-propos p {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }
        .about-text-a-propos .btn-dark-a-propos { align-self: flex-start; }

        .about-stats-a-propos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .stat-card-a-propos {
          background-color: var(--color-cream);
          padding: 20px;
          border-radius: 16px;
          text-align: center;
        }
        .stat-card-a-propos .number {
          font-family: var(--font-serif);
          font-size: 36px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1;
        }
        .stat-card-a-propos .label {
          color: var(--color-gray);
          font-size: 13px;
          margin-top: 4px;
        }

        /* ===== VALUES ===== */
        .values-grid-a-propos {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .value-card-a-propos {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .value-card-a-propos:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .value-card-a-propos .icon { font-size: 28px; color: var(--color-gold); margin-bottom: 10px; }
        .value-card-a-propos h3 { font-size: 16px; font-weight: 700; color: var(--color-navy); margin-bottom: 6px; }
        .value-card-a-propos p { color: var(--color-gray); font-size: 13px; line-height: 1.5; margin: 0; }

        /* ===== MISSION ===== */
        .mission-section-a-propos {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        .mission-section-a-propos h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-top: 6px;
        }
        .mission-section-a-propos p {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin-top: 16px;
        }
        .mission-section-a-propos .btn-primary-a-propos { margin-top: 24px; }

        /* ===== CTA ===== */
        .cta-final-a-propos {
          background-color: var(--color-navy);
          padding: 50px 20px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-a-propos { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-a-propos {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .cta-text-a-propos {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-group-a-propos {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-a-propos-title { font-size: 32px !important; }
          .mission-a-propos-title { font-size: 24px !important; }
          .about-grid-a-propos { grid-template-columns: 1fr !important; gap: 30px !important; }
          .about-text-a-propos h2 { font-size: 24px !important; }
          .values-grid-a-propos { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .mission-section-a-propos h2 { font-size: 24px !important; }
          .spacer-a-propos { height: 16px !important; }
        }

        @media (max-width: 768px) {
          .spacer-a-propos { height: 12px !important; }

          .hero-a-propos { padding: 30px 16px 25px 16px !important; }
          .hero-a-propos-container { gap: 22px !important; }
          .hero-a-propos-title { font-size: 26px !important; }
          .hero-a-propos-subtitle { font-size: 14px !important; }
          .hero-a-propos-description { font-size: 14px !important; }
          .mission-box-a-propos { padding: 18px !important; }
          .mission-a-propos-title { font-size: 22px !important; }
          .mission-a-propos-text { font-size: 14px !important; }

          .section-a-propos-white,
          .section-a-propos-light { padding: 35px 16px !important; }
          .section-title-a-propos { font-size: 22px !important; }
          .section-subtitle-a-propos { font-size: 14px !important; }

          .about-grid-a-propos { gap: 25px !important; }
          .about-text-a-propos h2 { font-size: 22px !important; }
          .about-text-a-propos p { font-size: 14px !important; }
          .about-stats-a-propos { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .stat-card-a-propos { padding: 14px !important; }
          .stat-card-a-propos .number { font-size: 28px !important; }
          .stat-card-a-propos .label { font-size: 12px !important; }

          .values-grid-a-propos { grid-template-columns: 1fr !important; gap: 12px !important; }
          .value-card-a-propos { padding: 18px 16px !important; }

          .mission-section-a-propos h2 { font-size: 22px !important; }
          .mission-section-a-propos p { font-size: 14px !important; }

          .cta-final-a-propos { padding: 35px 16px !important; }
          .cta-title-a-propos { font-size: 22px !important; }
          .cta-text-a-propos { font-size: 14px !important; }
          .btn-gold-cta-a-propos,
          .btn-primary-a-propos {
            width: 100% !important;
            justify-content: center !important;
            font-size: 13px !important;
            padding: 12px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .spacer-a-propos { height: 10px !important; }

          .hero-a-propos { padding: 20px 12px 16px 12px !important; }
          .hero-a-propos-title { font-size: 22px !important; }
          .hero-a-propos-subtitle { font-size: 13px !important; }
          .hero-a-propos-description { font-size: 13px !important; }
          .mission-a-propos-title { font-size: 19px !important; }
          .mission-a-propos-text { font-size: 13px !important; }

          .section-a-propos-white,
          .section-a-propos-light { padding: 28px 12px !important; }
          .section-title-a-propos { font-size: 20px !important; }
          .section-subtitle-a-propos { font-size: 13px !important; }

          .about-text-a-propos h2 { font-size: 20px !important; }
          .about-text-a-propos p { font-size: 13px !important; }
          .about-stats-a-propos { grid-template-columns: 1fr !important; }
          .stat-card-a-propos .number { font-size: 26px !important; }
          .stat-card-a-propos .label { font-size: 12px !important; }

          .value-card-a-propos h3 { font-size: 15px !important; }
          .value-card-a-propos p { font-size: 12px !important; }

          .mission-section-a-propos h2 { font-size: 20px !important; }
          .mission-section-a-propos p { font-size: 13px !important; }

          .cta-final-a-propos { padding: 28px 12px !important; }
          .cta-title-a-propos { font-size: 20px !important; }
          .cta-text-a-propos { font-size: 13px !important; }
          .btn-gold-cta-a-propos,
          .btn-primary-a-propos {
            font-size: 12px !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>
    </main>
  );
}