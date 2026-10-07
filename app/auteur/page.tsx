"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// ============================================================
// MAPPING DES COUVERTURES LOCALES
// ============================================================
const coverImages: Record<string, string> = {
  'le-declic': '/images/auteur/le declic.webp',
  'dominez-votre-journee': '/images/auteur/Dominez votre journée.webp',
  'le-soleil-levant-du-quarantenaire': '/images/auteur/le soleil levant du quarantenaire.webp',
  'mariage-le-grand-examen': '/images/auteur/Mariage le grand examen.webp',
  'secrets-de-vie-prosperite-financiere': '/images/auteur/secrets de vie prospérité financière.webp',
};

function getCoverImage(slug: string, titre?: string): string | null {
  if (coverImages[slug]) {
    return coverImages[slug];
  }
  const lowerTitre = (titre || '').toLowerCase();
  for (const [key, path] of Object.entries(coverImages)) {
    if (lowerTitre.includes(key.replace(/-/g, ' ')) || key.includes(lowerTitre)) {
      return path;
    }
  }
  return null;
}

// ============================================================
// DONNÉES DES LIVRES (STATIQUES)
// ============================================================
const livresData = [
  {
    id: 1,
    slug: 'le-declic',
    titre: 'Le Déclic',
    sous_titre: 'Réussir en Entrepreneuriat à partir de zéro franc',
    description: "Un ouvrage pour provoquer la prise de conscience, clarifier l'action et encourager une progression durable. 100 exemplaires achetés par l'Ambassade des États-Unis.",
    estPhare: true,
    disponible: true
  },
  {
    id: 2,
    slug: 'dominez-votre-journee',
    titre: 'Dominez votre journée',
    sous_titre: 'Maîtrisez votre temps et maximisez votre productivité',
    description: 'Des méthodes pratiques pour organiser vos journées, prioriser vos tâches et atteindre vos objectifs avec sérénité.',
    estPhare: false,
    disponible: true
  },
  {
    id: 3,
    slug: 'le-soleil-levant-du-quarantenaire',
    titre: 'Le Soleil levant du quarantenaire',
    sous_titre: 'Réinventez votre vie après 40 ans',
    description: "Un guide inspirant pour les quarantenaires qui souhaitent donner un nouveau sens à leur vie et à leur carrière.",
    estPhare: false,
    disponible: true
  },
  {
    id: 4,
    slug: 'mariage-le-grand-examen',
    titre: 'Mariage : Le grand examen',
    sous_titre: 'Préparez-vous à une union durable et épanouissante',
    description: 'Un livre qui vous aide à préparer et à vivre un mariage épanouissant, en abordant les clés de la communication et de la compréhension mutuelle.',
    estPhare: false,
    disponible: true
  },
  {
    id: 5,
    slug: 'secrets-de-vie-prosperite-financiere',
    titre: 'Secrets de Vie — Prospérité financière',
    sous_titre: 'Les principes pour une liberté financière durable',
    description: 'Découvrez les principes fondamentaux pour atteindre la prospérité financière et construire un avenir serein.',
    estPhare: false,
    disponible: true
  }
];

export default function AuteurPage() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const leDeclic = livresData.find(l => l.slug === 'le-declic');

  return (
    <main className="auteur-container">

      <div className="spacer-auteur"></div>

      {/* ============================================================ */}
      {/* SECTION 1 : BIO + PHOTO */}
      {/* ============================================================ */}
      <section className="section-bio-photo">
        <div className="container-bio-photo">
          <div className="bio-photo-grid">
            <div className="bio-content">
              <span className="badge-gold">À PROPOS</span>
              <h2 className="bio-title">Qui suis-je ?</h2>
              <p className="bio-text">
                Je suis <strong>Aubin Romain AZIANOUKOU</strong>, consultant international, 
                formateur exécutif et auteur passionné par le développement personnel 
                et la transformation intérieure.
              </p>
              <p className="bio-text">
                Fort de plus de <strong>20 ans d'expérience</strong> en Afrique de l'Ouest 
                (Bénin, Burkina Faso), j'ai formé plus de <strong>5 000 entrepreneurs</strong> 
                et accompagné des PME dans leur croissance. Chaque livre est le fruit 
                d'une réflexion profonde et d'une expérience vécue sur le terrain.
              </p>
              <div className="bio-quote">
                <i className="fas fa-quote-left"></i>
                <p>Ma mission : Développer les personnes. Structurer les entreprises. Transformer les organisations.</p>
              </div>
              <div className="bio-stats">
                <div className="stat-item">
                  <span className="stat-number">5+</span>
                  <span className="stat-label">Livres publiés</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">5 000+</span>
                  <span className="stat-label">Entrepreneurs formés</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">20+</span>
                  <span className="stat-label">Ans d'expérience</span>
                </div>
              </div>
            </div>

            <div className="bio-photo-wrapper">
              <div className="bio-photo-circle">
                <Image
                  src="/images/auteur/photo-profil.webp"
                  alt="Aubin Romain AZIANOUKOU - Auteur"
                  width={400}
                  height={400}
                  className="bio-photo-img"
                  priority
                  quality={85}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-auteur"></div>

      {/* ============================================================ */}
      {/* SECTION 2 : GRILLE DE COUVERTURES */}
      {/* ============================================================ */}
      <section className="section-covers">
        <div className="container-covers">
          <div className="section-header-covers">
            <span className="badge-gold">MES LIVRES</span>
            <h2 className="section-title-covers">Découvrez mes ouvrages</h2>
            <p className="section-subtitle-covers">Cliquez sur une couverture pour en savoir plus</p>
          </div>

          <div className="covers-grid">
            {livresData.map((livre) => {
              const coverUrl = getCoverImage(livre.slug, livre.titre);
              return (
                <Link
                  key={livre.id}
                  href={`/livres/${livre.slug}`}
                  className={`cover-card ${livre.estPhare ? 'cover-featured' : ''}`}
                >
                  <div className="cover-wrapper">
                    {coverUrl ? (
                      <div className="cover-image-container">
                        <Image
                          src={coverUrl}
                          alt={`Couverture de ${livre.titre}`}
                          width={400}
                          height={600}
                          className="cover-image"
                          quality={80}
                        />
                        <div className="cover-overlay">
                          <span className="cover-overlay-text">
                            <i className="fas fa-eye"></i> Découvrir
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="cover-placeholder">
                        <i className="fas fa-book"></i>
                        <span>{livre.titre}</span>
                      </div>
                    )}
                    {livre.estPhare && (
                      <span className="cover-badge">⭐ Phare</span>
                    )}
                  </div>
                  <p className="cover-title">{livre.titre}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="spacer-auteur"></div>

      {/* ============================================================ */}
      {/* SECTION 3 : HERO AUTEUR */}
      {/* ============================================================ */}
      <section className="hero-auteur">
        <div className="hero-auteur-container">
          <div className="hero-auteur-content">
            <span className="badge-gold">AUTEUR</span>
            <h1 className="hero-auteur-title">Des ouvrages pour éclairer l'action</h1>
            <p className="hero-auteur-subtitle">Partager l'expérience du terrain pour éclairer vos décisions.</p>
            <p className="hero-auteur-description">
              À travers mes écrits, je mets à disposition des entrepreneurs, des professionnels et de tous ceux qui veulent progresser, les enseignements tirés de plus de 20 ans d'accompagnement sur le terrain.
            </p>
          </div>
          <div className="hero-auteur-right">
            <span className="badge-gold">PUBLICATIONS</span>
            <div className="mission-box-auteur">
              <h2 className="mission-auteur-title">De l'expérience à l'écrit</h2>
              <p className="mission-auteur-text">Chaque ouvrage est né d'une observation, d'un besoin ou d'une question rencontrée sur le terrain. Des livres concrets pour des actions concrètes.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-auteur"></div>

      {/* ============================================================ */}
      {/* SECTION 4 : LIVRE PHARE */}
      {/* ============================================================ */}
      {leDeclic && (
        <section className="section-featured">
          <div className="container-featured">
            <div className="section-header-featured">
              <span className="badge-gold">LIVRE PHARE</span>
              <h2 className="section-title-featured">Le Déclic</h2>
              <p className="section-subtitle-featured">Réussir en Entrepreneuriat à partir de zéro franc, c'est plus que possible</p>
            </div>

            <div className="featured-book-box">
              <div className="featured-book-icon">
                <i className="fas fa-book-open"></i>
              </div>
              <h3 className="featured-book-title">{leDeclic.titre}</h3>
              <p className="featured-book-desc">{leDeclic.description}</p>

              <div className="featured-book-support">
                <div className="support-badge">
                  <i className="fas fa-star"></i>
                  <span>Reconnu</span>
                </div>
                <p className="support-text">
                  <strong>L'Ambassade des États-Unis d'Amérique au Bénin</strong> a soutenu cet ouvrage dès sa parution en 2013, avec un achat de 100 exemplaires pour appuyer des programmes d'entrepreneuriat.
                </p>
                <div className="support-flags">
                  <i className="fas fa-flag-usa" title="États-Unis"></i>
                  <i className="fas fa-flag" title="Bénin"></i>
                  <i className="fas fa-globe-africa" title="Afrique"></i>
                </div>
              </div>

              <Link href={`/livres/${leDeclic.slug}`} className="btn-featured">
                <i className="fas fa-book"></i> Découvrir Le Déclic
              </Link>
            </div>
          </div>
        </section>
      )}

      <div className="spacer-auteur"></div>

      {/* ============================================================ */}
      {/* SECTION 5 : TOUS LES LIVRES */}
      {/* ============================================================ */}
      <section className="section-books">
        <div className="container-books">
          <div className="section-header-books">
            <span className="badge-gold">MES OUVRAGES</span>
            <h2 className="section-title-books">Tous mes livres</h2>
            <p className="section-subtitle-books">Découvrez l'ensemble de mes publications disponibles.</p>
          </div>

          <div className="books-grid-auteur">
            {livresData.map((livre) => (
              <Link key={livre.id} href={`/livres/${livre.slug}`} className={`book-card-auteur ${livre.estPhare ? 'featured-highlight' : ''}`}>
                <div className="book-icon-auteur">
                  <i className="fas fa-book"></i>
                </div>
                <h3 className="book-title-auteur">{livre.titre}</h3>
                {livre.sous_titre && (
                  <p className="book-subtitle-auteur">{livre.sous_titre}</p>
                )}
                <span className={`book-status-auteur ${livre.estPhare ? 'featured-status' : 'available'}`}>
                  {livre.estPhare ? '⭐ Livre phare' : 'Disponible'}
                </span>
                <p className="book-desc-auteur">{livre.description}</p>
                <span className="book-link-auteur">
                  <i className="fas fa-arrow-right"></i> Découvrir
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-auteur"></div>

      {/* ============================================================ */}
      {/* SECTION 6 : CTA WHATSAPP */}
      {/* ============================================================ */}
      <section className="cta-final-auteur">
        <div className="container-cta-auteur">
          <h2 className="cta-title-auteur">Une question sur mes ouvrages ?</h2>
          <p className="cta-text-auteur">Contactez-moi directement pour toute question ou pour être informé des prochaines parutions.</p>
          <div className="cta-group-auteur">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-auteur"></div>

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

        .auteur-container { background-color: var(--color-cream); }
        .spacer-auteur { height: 36px; background-color: var(--color-cream); }
        .text-gray { color: var(--color-gray); font-size: 14px; }

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

        .btn-gold-cta {
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
        .btn-gold-cta:hover { background-color: #e1bb43; }

        .btn-featured {
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
        .btn-featured:hover { background-color: #e1bb43; }

        /* ===== BIO + PHOTO ===== */
        .section-bio-photo {
          background-color: var(--color-white);
          padding: 50px 20px;
          margin: 0 -20px;
        }
        .container-bio-photo { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .bio-photo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 50px; align-items: center; }
        .bio-content { display: flex; flex-direction: column; gap: 16px; }
        .bio-title { font-family: var(--font-serif); font-size: 32px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .bio-text { color: var(--color-gray); font-size: 15px; line-height: 1.7; margin: 0; }
        .bio-text strong { color: var(--color-navy); }
        .bio-quote { display: flex; gap: 12px; align-items: flex-start; background-color: var(--color-cream); padding: 16px 20px; border-radius: 12px; border-left: 4px solid var(--color-gold); }
        .bio-quote i { color: var(--color-gold); font-size: 20px; margin-top: 2px; }
        .bio-quote p { color: var(--color-navy); font-style: italic; font-size: 15px; line-height: 1.6; margin: 0; }
        .bio-stats { display: flex; gap: 30px; margin-top: 8px; flex-wrap: wrap; }
        .stat-item { display: flex; flex-direction: column; }
        .stat-number { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: var(--color-gold); }
        .stat-label { font-size: 12px; color: var(--color-gray); font-weight: 500; letter-spacing: 0.04em; }
        .bio-photo-wrapper { display: flex; justify-content: center; align-items: center; }
        .bio-photo-circle { width: 320px; height: 320px; border-radius: 50%; overflow: hidden; border: 6px solid var(--color-gold); box-shadow: 0 12px 40px rgba(6, 23, 47, 0.15); position: relative; transition: transform 0.4s ease, box-shadow 0.4s ease; }
        .bio-photo-circle:hover { transform: scale(1.02); box-shadow: 0 16px 50px rgba(6, 23, 47, 0.2); }
        .bio-photo-img { width: 100%; height: 100%; object-fit: cover; }

        /* ===== COUVERTURES ===== */
        .section-covers {
          background-color: var(--color-white);
          padding: 50px 20px;
          margin: 0 -20px;
        }
        .container-covers { max-width: 1100px; margin: 0 auto; padding: 0 20px; }
        .section-header-covers { text-align: center; margin-bottom: 30px; }
        .section-title-covers { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 8px 0 0 0; }
        .section-subtitle-covers { color: var(--color-gray); font-size: 14px; margin-top: 8px; }
        .covers-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 24px; }
        .cover-card { text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center; gap: 10px; transition: transform 0.3s ease; }
        .cover-card:hover { transform: translateY(-6px); }
        .cover-wrapper { position: relative; width: 100%; aspect-ratio: 2/3; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(6, 23, 47, 0.1); transition: box-shadow 0.3s ease; background-color: var(--color-cream); }
        .cover-card:hover .cover-wrapper { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.2); }
        .cover-image-container { position: relative; width: 100%; height: 100%; }
        .cover-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .cover-card:hover .cover-image { transform: scale(1.05); }
        .cover-overlay { position: absolute; inset: 0; background-color: rgba(6, 23, 47, 0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
        .cover-card:hover .cover-overlay { opacity: 1; }
        .cover-overlay-text { color: var(--color-white); font-weight: 600; font-size: 14px; display: flex; align-items: center; gap: 8px; background-color: rgba(212, 175, 55, 0.9); padding: 8px 16px; border-radius: 9999px; transition: transform 0.3s ease; }
        .cover-card:hover .cover-overlay-text { transform: scale(1.05); }
        .cover-placeholder { width: 100%; height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--color-cream), #e8e3d8); color: var(--color-gray); gap: 8px; }
        .cover-placeholder i { font-size: 40px; color: var(--color-gold); }
        .cover-placeholder span { font-size: 12px; text-align: center; padding: 0 8px; }
        .cover-badge { position: absolute; top: 10px; right: 10px; background-color: var(--color-gold); color: var(--color-navy); font-size: 10px; font-weight: 700; padding: 4px 10px; border-radius: 9999px; letter-spacing: 0.04em; box-shadow: 0 2px 8px rgba(0,0,0,0.15); }
        .cover-title { font-size: 13px; font-weight: 600; color: var(--color-navy); text-align: center; margin: 0; line-height: 1.3; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .cover-card.cover-featured .cover-wrapper { border: 2px solid var(--color-gold); }

        /* ===== HERO ===== */
        .hero-auteur {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-auteur-container { max-width: 900px; margin: 0 auto; padding: 0 20px; display: flex; flex-direction: column; align-items: center; gap: 30px; text-align: center; }
        .hero-auteur-content { display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%; }
        .hero-auteur-title { font-family: var(--font-serif); font-size: 38px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .hero-auteur-subtitle { font-size: 16px; font-weight: 700; color: var(--color-navy); line-height: 1.4; opacity: 0.8; max-width: 700px; margin: 0; }
        .hero-auteur-description { font-size: 14px; color: var(--color-gray); line-height: 1.65; max-width: 700px; margin: 0; }
        .hero-auteur-right { display: flex; flex-direction: column; gap: 14px; align-items: center; width: 100%; }
        .mission-box-auteur { border: 1px solid rgba(6, 23, 47, 0.12); background-color: var(--color-cream); padding: 24px; border-radius: 20px; width: 100%; max-width: 800px; box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06); text-align: center; }
        .mission-auteur-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .mission-auteur-text { margin-top: 12px; color: var(--color-gray); font-size: 14px; line-height: 1.65; margin: 0; }

        /* ===== LIVRE PHARE ===== */
        .section-featured {
          padding: 50px 20px;
          margin: 0 -20px;
          background-color: var(--color-white);
        }
        .container-featured { max-width: 900px; margin: 0 auto; padding: 0 20px; }
        .section-header-featured { text-align: center; margin-bottom: 30px; }
        .section-title-featured { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .section-subtitle-featured { color: var(--color-gray); font-size: 14px; max-width: 760px; margin: 8px auto 0 auto; }
        .featured-book-box { background-color: var(--color-cream); border-radius: 20px; padding: 32px; text-align: center; border: 1px solid rgba(6, 23, 47, 0.08); max-width: 800px; margin: 0 auto; box-shadow: 0 8px 30px rgba(6, 23, 47, 0.06); }
        .featured-book-icon { font-size: 48px; color: var(--color-gold); margin-bottom: 12px; }
        .featured-book-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); margin: 0 0 10px 0; }
        .featured-book-desc { color: var(--color-gray); font-size: 15px; line-height: 1.6; max-width: 600px; margin: 0 auto 20px auto; }
        .featured-book-support { background-color: var(--color-white); border-radius: 16px; padding: 20px; margin: 16px 0 20px 0; border: 1px solid rgba(6, 23, 47, 0.06); }
        .support-badge { display: inline-flex; align-items: center; gap: 6px; background-color: rgba(212, 175, 55, 0.15); padding: 4px 14px; border-radius: 9999px; color: var(--color-gold); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; }
        .support-text { color: var(--color-gray); font-size: 14px; line-height: 1.7; margin: 0 0 12px 0; }
        .support-text strong { color: var(--color-navy); }
        .support-flags { display: flex; justify-content: center; gap: 16px; font-size: 24px; color: var(--color-navy); }

        /* ===== TOUS LES LIVRES ===== */
        .section-books {
          padding: 50px 20px;
          margin: 0 -20px;
          background-color: var(--color-cream);
        }
        .container-books { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-header-books { text-align: center; margin-bottom: 30px; }
        .section-title-books { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .section-subtitle-books { color: var(--color-gray); font-size: 14px; max-width: 760px; margin: 8px auto 0 auto; }
        .books-grid-auteur { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .book-card-auteur { background-color: var(--color-white); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 16px; padding: 24px; transition: box-shadow 0.3s ease; display: flex; flex-direction: column; gap: 12px; height: 100%; text-decoration: none; color: inherit; }
        .book-card-auteur:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .book-card-auteur.featured-highlight { border-color: var(--color-gold); background-color: #fdfaf0; }
        .book-icon-auteur { font-size: 32px; color: var(--color-gold); }
        .book-title-auteur { font-family: var(--font-serif); font-size: 20px; font-weight: 700; color: var(--color-navy); line-height: 1.2; margin: 0; }
        .book-subtitle-auteur { color: var(--color-gray); font-size: 13px; font-style: italic; line-height: 1.4; margin: -4px 0 0 0; }
        .book-status-auteur { display: inline-block; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 12px; border-radius: 9999px; width: fit-content; }
        .book-status-auteur.available { background-color: rgba(6, 23, 47, 0.08); color: var(--color-navy); }
        .book-status-auteur.featured-status { background-color: var(--color-gold); color: var(--color-navy); }
        .book-desc-auteur { color: var(--color-gray); font-size: 14px; line-height: 1.6; flex-grow: 1; margin: 0; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .book-link-auteur { color: var(--color-gold); font-weight: 700; font-size: 13px; display: inline-flex; align-items: center; gap: 6px; transition: gap 0.3s ease; margin-top: 4px; }
        .book-link-auteur:hover { gap: 10px; }

        /* ===== CTA ===== */
        .cta-final-auteur {
          background-color: var(--color-navy);
          padding: 50px 20px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-auteur { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-auteur { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-white); line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 12px; }
        .cta-text-auteur { color: var(--color-gray-light); font-size: 14px; max-width: 680px; margin: 0 auto 30px auto; }
        .cta-group-auteur { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */
        @media (max-width: 1024px) {
          .bio-photo-circle { width: 260px; height: 260px; }
          .covers-grid { grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); }
          .hero-auteur-title { font-size: 32px !important; }
          .mission-auteur-title { font-size: 24px !important; }
          .books-grid-auteur { grid-template-columns: 1fr 1fr !important; gap: 16px !important; }
          .spacer-auteur { height: 16px !important; }
          .featured-book-title { font-size: 24px !important; }
        }

        @media (max-width: 768px) {
          .spacer-auteur { height: 12px !important; }
          .section-bio-photo { padding: 30px 16px !important; }
          .bio-photo-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .bio-content { order: 2; }
          .bio-photo-wrapper { order: 1; }
          .bio-photo-circle { width: 200px; height: 200px; border-width: 4px; }
          .bio-title { font-size: 26px !important; }
          .bio-stats { gap: 20px; }
          .stat-number { font-size: 20px; }
          .covers-grid { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 16px; }
          .section-covers { padding: 30px 16px !important; }
          .section-title-covers { font-size: 22px !important; }
          .hero-auteur { padding: 30px 16px 25px 16px !important; }
          .hero-auteur-container { gap: 22px !important; }
          .hero-auteur-title { font-size: 26px !important; }
          .hero-auteur-subtitle { font-size: 14px !important; }
          .hero-auteur-description { font-size: 14px !important; }
          .mission-box-auteur { padding: 18px !important; }
          .mission-auteur-title { font-size: 22px !important; }
          .mission-auteur-text { font-size: 14px !important; }
          .section-featured { padding: 35px 16px !important; }
          .section-title-featured { font-size: 22px !important; }
          .section-subtitle-featured { font-size: 14px !important; }
          .featured-book-box { padding: 24px !important; }
          .featured-book-title { font-size: 22px !important; }
          .featured-book-desc { font-size: 14px !important; }
          .support-text { font-size: 13px !important; }
          .support-flags { font-size: 20px !important; gap: 14px !important; }
          .section-books { padding: 35px 16px !important; }
          .section-title-books { font-size: 22px !important; }
          .section-subtitle-books { font-size: 14px !important; }
          .books-grid-auteur { grid-template-columns: 1fr !important; gap: 14px !important; }
          .book-card-auteur { padding: 18px !important; }
          .book-title-auteur { font-size: 18px !important; }
          .book-desc-auteur { font-size: 14px !important; }
          .cta-final-auteur { padding: 35px 16px !important; }
          .cta-title-auteur { font-size: 22px !important; }
          .cta-text-auteur { font-size: 14px !important; }
          .btn-gold-cta, .btn-featured { width: 100% !important; justify-content: center !important; font-size: 13px !important; padding: 12px 16px !important; }
        }

        @media (max-width: 480px) {
          .spacer-auteur { height: 10px !important; }
          .bio-photo-circle { width: 160px; height: 160px; }
          .bio-title { font-size: 22px !important; }
          .bio-text { font-size: 14px !important; }
          .bio-quote p { font-size: 14px !important; }
          .bio-stats { gap: 16px; flex-wrap: wrap; }
          .stat-number { font-size: 18px; }
          .covers-grid { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 12px; }
          .cover-title { font-size: 11px; }
          .cover-overlay-text { font-size: 11px; padding: 6px 12px; }
          .hero-auteur { padding: 20px 12px 16px 12px !important; }
          .hero-auteur-title { font-size: 22px !important; }
          .hero-auteur-subtitle { font-size: 13px !important; }
          .hero-auteur-description { font-size: 13px !important; }
          .mission-auteur-title { font-size: 19px !important; }
          .mission-auteur-text { font-size: 13px !important; }
          .section-featured { padding: 28px 12px !important; }
          .section-title-featured { font-size: 20px !important; }
          .section-subtitle-featured { font-size: 13px !important; }
          .featured-book-box { padding: 18px !important; }
          .featured-book-title { font-size: 20px !important; }
          .featured-book-desc { font-size: 13px !important; }
          .support-text { font-size: 12px !important; }
          .support-flags { font-size: 18px !important; gap: 12px !important; }
          .section-covers { padding: 28px 12px !important; }
          .section-title-covers { font-size: 20px !important; }
          .section-subtitle-covers { font-size: 13px !important; }
          .section-books { padding: 28px 12px !important; }
          .section-title-books { font-size: 20px !important; }
          .section-subtitle-books { font-size: 13px !important; }
          .book-title-auteur { font-size: 16px !important; }
          .book-desc-auteur { font-size: 13px !important; }
          .cta-final-auteur { padding: 28px 12px !important; }
          .cta-title-auteur { font-size: 20px !important; }
          .cta-text-auteur { font-size: 13px !important; }
          .btn-gold-cta, .btn-featured { font-size: 12px !important; padding: 10px 14px !important; }
        }
      `}</style>
    </main>
  );
}