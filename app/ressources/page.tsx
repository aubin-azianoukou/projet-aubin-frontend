"use client";

import Link from 'next/link';

export default function RessourcesPage() {
  const articles = [
    {
      id: 1,
      slug: 'business-plan',                    // ← correspond au nom du fichier HTML
      title: 'Comment réussir son Business Plan',
      category: 'Entrepreneuriat',
      description: 'Les étapes essentielles pour transformer une idée en dossier clair, chiffré et convaincant.',
      date: '15 juin 2026',
      readTime: '8 min',
      icon: 'fa-file-alt'
    },
    {
      id: 2,
      slug: 'erreurs-pme',                      // ← correspond au nom du fichier HTML
      title: '10 erreurs fréquentes des PME',
      category: 'Gestion d\'entreprise',
      description: 'Les pièges de gestion qui ralentissent la croissance des petites et moyennes entreprises.',
      date: '10 juin 2026',
      readTime: '10 min',
      icon: 'fa-exclamation-triangle'
    },
    {
      id: 3,
      slug: 'excel-business',                   // ← correspond au nom du fichier HTML
      title: 'Comment utiliser Excel pour son business',
      category: 'Bureautique',
      description: 'Des usages simples pour suivre vos ventes, vos dépenses et vos décisions avec plus de rigueur.',
      date: '5 juin 2026',
      readTime: '6 min',
      icon: 'fa-chart-bar'
    },
    {
      id: 4,
      slug: 'etude-marche',                     // ← correspond au nom du fichier HTML
      title: 'Comment rédiger une étude de marché',
      category: 'Marketing',
      description: 'Les étapes pour analyser votre marché, identifier les opportunités et valider votre positionnement.',
      date: '30 mai 2026',
      readTime: '9 min',
      icon: 'fa-search'
    },
    {
      id: 5,
      slug: 'entretien-embauche',               // ← correspond au nom du fichier HTML
      title: 'Comment réussir un entretien d\'embauche',
      category: 'Leadership',
      description: 'Les clés pour préparer et réussir vos entretiens de recrutement, du côté candidat comme recruteur.',
      date: '25 mai 2026',
      readTime: '7 min',
      icon: 'fa-users'
    },
    {
      id: 6,
      slug: 'creer-entreprise-burkina',         // ← correspond au nom du fichier HTML
      title: 'Comment créer une entreprise au Burkina Faso',
      category: 'Entrepreneuriat',
      description: 'Les étapes clés, les formalités et les bonnes pratiques pour lancer votre activité.',
      date: '20 mai 2026',
      readTime: '12 min',
      icon: 'fa-flag-checkered'
    }
  ];

  return (
    <main className="ressources-container">

      <div className="spacer-ressources"></div>

      {/* ===== HERO ===== */}
      <section className="hero-ressources">
        <div className="hero-ressources-container">
          <div className="hero-ressources-content">
            <span className="badge-gold">RESSOURCES</span>
            <h1 className="hero-ressources-title">Le centre de connaissances</h1>
            <p className="hero-ressources-subtitle">Guides, articles et conseils pour entrepreneurs et professionnels</p>
            <p className="hero-ressources-description">
              Des contenus pratiques pour vous aider à structurer vos projets, développer vos compétences et prendre des décisions éclairées.
            </p>
          </div>
          <div className="hero-ressources-right">
            <span className="badge-gold">PARTAGE D'EXPERTISE</span>
            <div className="mission-box-ressources">
              <h2 className="mission-ressources-title">Des ressources pour agir</h2>
              <p className="mission-ressources-text">Chaque article est conçu pour vous apporter des solutions concrètes, des méthodes éprouvées et des réflexions utiles pour votre activité.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-ressources"></div>

      {/* ===== CATÉGORIES ET ARTICLES ===== */}
      <section className="section-ressources-white">
        <div className="container-ressources">
          <div className="section-header-ressources">
            <span className="badge-gold">CATÉGORIES</span>
            <h2 className="section-title-ressources">Explorez par thématique</h2>
            <p className="section-subtitle-ressources">Trouvez les articles qui répondent à vos besoins.</p>
          </div>

          <div className="categories-ressources">
            <span className="category-tag-ressources">Toutes</span>
            <span className="category-tag-ressources">Entrepreneuriat</span>
            <span className="category-tag-ressources">Business Plan &amp; Financement</span>
            <span className="category-tag-ressources">Marketing &amp; Digital</span>
            <span className="category-tag-ressources">Productivité</span>
            <span className="category-tag-ressources">Bureautique</span>
            <span className="category-tag-ressources">Finance personnelle</span>
            <span className="category-tag-ressources">Leadership</span>
            <span className="category-tag-ressources">Santé &amp; Bien-être</span>
          </div>

          <div className="articles-grid-ressources">
            {articles.map((article) => (
              <Link key={article.id} href={`/ressources/${article.slug}`} className="article-card-ressources">
                <div className="article-image-ressources">
                  <i className={`fas ${article.icon}`}></i>
                </div>
                <span className="article-category-ressources">{article.category}</span>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="article-meta-ressources">
                  <span><i className="far fa-calendar-alt"></i> {article.date}</span>
                  <span><i className="far fa-clock"></i> {article.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-ressources"></div>

      {/* ===== NEWSLETTER ===== */}
      <section className="section-ressources-light">
        <div className="container-ressources">
          <div className="newsletter-box-ressources">
            <h2>Recevez un conseil business chaque semaine</h2>
            <p>Inscrivez-vous à ma newsletter pour recevoir des articles, des astuces et des outils pour développer votre entreprise.</p>
            <form className="newsletter-form-ressources" action="https://formspree.io/f/mqevvkya" method="POST">
              <input type="hidden" name="_subject" value="Inscription newsletter" />
              <input type="email" name="email" placeholder="Votre adresse email" required />
              <button type="submit" className="btn-primary-ressources">
                <i className="fas fa-envelope"></i> S'inscrire
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="spacer-ressources"></div>

      {/* ===== CTA WHATSAPP ===== */}
      <section className="cta-final-ressources">
        <div className="container-cta-ressources">
          <h2 className="cta-title-ressources">Une question ou un sujet à approfondir ?</h2>
          <p className="cta-text-ressources">Contactez-moi directement sur WhatsApp pour échanger sur vos besoins ou vos projets.</p>
          <div className="cta-group-ressources">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta-ressources">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-ressources"></div>

      {/* ===== STYLES ===== */}
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
        .ressources-container { background-color: var(--color-cream); }
        .spacer-ressources { height: 36px; background-color: var(--color-cream); }
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
        .btn-primary-ressources {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 10px 20px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
        }
        .btn-primary-ressources:hover { background-color: #e1bb43; }

        .btn-gold-cta-ressources {
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
        .btn-gold-cta-ressources:hover { background-color: #e1bb43; }

        /* ===== HERO ===== */
        .hero-ressources {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-ressources-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-ressources-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }
        .hero-ressources-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero-ressources-subtitle {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          opacity: 0.8;
          margin: 0;
        }
        .hero-ressources-description {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.65;
          max-width: 700px;
          margin: 0;
        }
        .hero-ressources-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
        .mission-box-ressources {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-ressources-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .mission-ressources-text {
          margin-top: 12px;
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== SECTIONS ===== */
        .section-ressources-white { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .section-ressources-light { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-cream); }
        .container-ressources { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .section-header-ressources { text-align: center; margin-bottom: 30px; }
        .section-title-ressources {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .section-subtitle-ressources {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        /* ===== CATEGORIES ===== */
        .categories-ressources {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 30px;
        }
        .category-tag-ressources {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-navy);
          transition: background-color 0.3s ease, color 0.3s ease;
          cursor: default;
        }
        .category-tag-ressources:hover {
          background-color: var(--color-gold);
          color: var(--color-navy);
          border-color: var(--color-gold);
        }

        /* ===== ARTICLES ===== */
        .articles-grid-ressources {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .article-card-ressources {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 100%;
          transition: box-shadow 0.3s ease;
          cursor: pointer;
          text-decoration: none;
          color: inherit;
        }
        .article-card-ressources:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .article-image-ressources {
          background-color: var(--color-cream);
          border-radius: 12px;
          height: 140px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 40px;
          color: var(--color-gold);
        }
        .article-category-ressources {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gold);
          background-color: rgba(212, 175, 55, 0.1);
          padding: 3px 10px;
          border-radius: 9999px;
          align-self: flex-start;
        }
        .article-card-ressources h3 {
          font-size: 17px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.25;
          margin: 0;
        }
        .article-card-ressources p {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.6;
          flex-grow: 1;
          margin: 0;
        }
        .article-meta-ressources {
          display: flex;
          gap: 12px;
          font-size: 12px;
          color: var(--color-gray);
          margin-top: 4px;
        }
        .article-meta-ressources span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        /* ===== NEWSLETTER ===== */
        .newsletter-box-ressources {
          background-color: var(--color-navy);
          border-radius: 20px;
          padding: 50px 40px;
          text-align: center;
          color: var(--color-white);
        }
        .newsletter-box-ressources h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .newsletter-box-ressources p {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 600px;
          margin: 0 auto 20px auto;
        }
        .newsletter-form-ressources {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 500px;
          margin: 0 auto;
        }
        .newsletter-form-ressources input {
          flex: 1;
          min-width: 180px;
          padding: 10px 16px;
          border: none;
          border-radius: 9999px;
          font-family: var(--font-sans);
          font-size: 14px;
          background-color: var(--color-white);
          color: var(--color-navy);
        }
        .newsletter-form-ressources input:focus { outline: 2px solid var(--color-gold); }

        /* ===== CTA ===== */
        .cta-final-ressources {
          background-color: var(--color-navy);
          padding: 50px 0px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-ressources { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-ressources {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .cta-text-ressources {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-group-ressources {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-ressources-title { font-size: 32px !important; }
          .mission-ressources-title { font-size: 24px !important; }
          .articles-grid-ressources { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
          .newsletter-box-ressources { padding: 40px 30px !important; }
          .newsletter-box-ressources h2 { font-size: 24px !important; }
          .spacer-ressources { height: 16px !important; }
        }

        @media (max-width: 768px) {
          .spacer-ressources { height: 12px !important; }

          .hero-ressources { padding: 30px 16px 25px 16px !important; }
          .hero-ressources-container { gap: 22px !important; }
          .hero-ressources-title { font-size: 26px !important; }
          .hero-ressources-subtitle { font-size: 14px !important; }
          .hero-ressources-description { font-size: 14px !important; }
          .mission-box-ressources { padding: 18px !important; }
          .mission-ressources-title { font-size: 22px !important; }
          .mission-ressources-text { font-size: 14px !important; }

          .section-ressources-white,
          .section-ressources-light { padding: 35px 16px !important; }
          .section-title-ressources { font-size: 22px !important; }
          .section-subtitle-ressources { font-size: 14px !important; }

          .articles-grid-ressources { grid-template-columns: 1fr !important; gap: 14px !important; }
          .article-card-ressources { padding: 16px !important; }
          .article-image-ressources { height: 120px !important; font-size: 32px !important; }
          .article-card-ressources h3 { font-size: 16px !important; }
          .article-card-ressources p { font-size: 14px !important; }

          .categories-ressources { gap: 6px !important; }
          .category-tag-ressources { font-size: 11px !important; padding: 4px 12px !important; }

          .newsletter-box-ressources { padding: 30px 20px !important; }
          .newsletter-box-ressources h2 { font-size: 22px !important; }
          .newsletter-box-ressources p { font-size: 14px !important; }
          .newsletter-form-ressources { flex-direction: column !important; align-items: center !important; }
          .newsletter-form-ressources input { width: 100% !important; }

          .cta-final-ressources { padding: 35px 16px !important; }
          .cta-title-ressources { font-size: 22px !important; }
          .cta-text-ressources { font-size: 14px !important; }
          .btn-gold-cta-ressources {
            width: 100% !important;
            justify-content: center !important;
            font-size: 13px !important;
            padding: 12px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .spacer-ressources { height: 10px !important; }

          .hero-ressources { padding: 20px 12px 16px 12px !important; }
          .hero-ressources-title { font-size: 22px !important; }
          .hero-ressources-subtitle { font-size: 13px !important; }
          .hero-ressources-description { font-size: 13px !important; }
          .mission-ressources-title { font-size: 19px !important; }
          .mission-ressources-text { font-size: 13px !important; }

          .section-ressources-white,
          .section-ressources-light { padding: 28px 12px !important; }
          .section-title-ressources { font-size: 20px !important; }
          .section-subtitle-ressources { font-size: 13px !important; }

          .article-image-ressources { height: 100px !important; font-size: 28px !important; }
          .article-card-ressources h3 { font-size: 15px !important; }
          .article-card-ressources p { font-size: 13px !important; }

          .newsletter-box-ressources { padding: 24px 16px !important; }
          .newsletter-box-ressources h2 { font-size: 20px !important; }
          .newsletter-box-ressources p { font-size: 13px !important; }

          .cta-final-ressources { padding: 28px 12px !important; }
          .cta-title-ressources { font-size: 20px !important; }
          .cta-text-ressources { font-size: 13px !important; }
          .btn-gold-cta-ressources {
            font-size: 12px !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>
    </main>
  );
}