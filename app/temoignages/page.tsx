"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function TemoignagesPage() {
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [counters, setCounters] = useState({
    experience: 0,
    personnes: 0,
    jeunes: 0,
    placement: 0
  });
  const [isCounting, setIsCounting] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // ============================================================
  // DONNÉES DES TÉMOIGNAGES
  // ============================================================
  const temoignages = [
    {
      id: 1,
      nom: 'Mariam O.',
      role: 'Entrepreneure',
      type: 'Formation',
      note: 5,
      texte: '"La formation Business Plan m\'a aidée à clarifier mon projet et à présenter un dossier plus professionnel à mes partenaires."',
      icon: 'fa-user'
    },
    {
      id: 2,
      nom: 'Direction administrative',
      role: 'PME',
      type: 'Consulting',
      note: 5,
      texte: '"L\'accompagnement a permis de mieux organiser nos priorités et de mettre en place des outils de suivi simples mais efficaces."',
      icon: 'fa-building'
    },
    {
      id: 3,
      nom: 'Étudiant en reconversion',
      role: 'Formation Excel',
      type: 'Formation',
      note: 5,
      texte: '"J\'ai gagné en confiance sur Excel et je peux maintenant produire des tableaux utiles pour mon travail."',
      icon: 'fa-user-graduate'
    },
    {
      id: 4,
      nom: 'Jean-Pierre K.',
      role: 'Manager',
      type: 'Consulting',
      note: 5,
      texte: '"Le diagnostic et les recommandations ont été d\'une grande clarté. Nous avons pu identifier nos axes d\'amélioration."',
      icon: 'fa-user'
    },
    {
      id: 5,
      nom: 'Fatima S.',
      role: 'Lectrice',
      type: 'Livre',
      note: 5,
      texte: '"Le Déclic m\'a vraiment fait réfléchir sur ma manière d\'agir. Un livre qui bouscule et qui donne envie de passer à l\'action."',
      icon: 'fa-user'
    },
    {
      id: 6,
      nom: 'ONG Développement',
      role: 'Institution',
      type: 'Consulting',
      note: 5,
      texte: '"La formation du personnel a été très appréciée par nos équipes. Des compétences concrètes et une approche pédagogique adaptée."',
      icon: 'fa-building'
    }
  ];

  // ============================================================
  // DONNÉES DES RÉFÉRENCES
  // ============================================================
  const references = [
    {
      id: 'attestation-cci',
      icon: 'fa-building',
      titre: '🔹 Chambre de Commerce et d\'Industrie du Burkina Faso',
      desc: 'Attestation de bonne fin d\'exécution - Forum International AFRICALLIA 2014',
      detail: 'Sensibilisation, communication, organisation et préparation scientifique des chefs d\'entreprise du Bénin à participer au Forum AFRICALLIA à Ouagadougou.',
      date: '02 mai 2014',
      isAttestation: true,
      badge: '📜 Attestation officielle'
    },
    {
      id: 'attestation-adjahomme',
      icon: 'fa-graduation-cap',
      titre: '🔹 Ministère de l\'Enseignement Secondaire du Bénin',
      desc: 'Attestation de bonne exécution - CFCE Adjahonmè 2014',
      detail: 'Expert formateur en Marketing et communication pour la préparation scientifique, la formation, le suivi et l\'accompagnement des étudiants des CFCE.',
      date: '21-27 mai 2014',
      isAttestation: true,
      badge: '📜 Attestation officielle'
    },
    {
      id: 'attestation-banikoara',
      icon: 'fa-graduation-cap',
      titre: '🔹 Ministère de l\'Enseignement Secondaire du Bénin',
      desc: 'Attestation de bonne exécution - CFCE Banikoara 2015',
      detail: 'Expert formateur en Marketing et communication pour la préparation scientifique, la formation, le suivi et l\'accompagnement des étudiants des CFCE.',
      date: '24-29 mai 2015',
      isAttestation: true,
      badge: '📜 Attestation officielle'
    },
    {
      id: 4,
      icon: 'fa-flag-usa',
      titre: 'Ambassade des États-Unis',
      desc: '100 exemplaires du Déclic achetés pour des programmes d\'entrepreneuriat au Bénin',
      isAttestation: false
    },
    {
      id: 5,
      icon: 'fa-university',
      titre: 'UNESCO / OCD — Liptako-Gourma',
      desc: 'Formation à Ouagadougou, novembre 2022',
      isAttestation: false
    },
    {
      id: 6,
      icon: 'fa-users',
      titre: 'International Youth Fellowship (IYF)',
      desc: 'Plusieurs formations animées dans les camps nationaux des jeunes au Bénin',
      isAttestation: false
    },
    {
      id: 7,
      icon: 'fa-church',
      titre: 'Mission Évangélique de la Foi',
      desc: 'Section Bénin — accompagnement et formations pour les communautés',
      isAttestation: false
    },
    {
      id: 8,
      icon: 'fa-lightbulb',
      titre: 'CIDJ — Centre d\'Innovation et de Développement de la Jeunesse',
      desc: 'Formation des jeunes en 2021 et 2022',
      isAttestation: false
    },
    {
      id: 9,
      icon: 'fa-globe-africa',
      titre: 'Afrique de l\'Ouest',
      desc: 'Interventions au Bénin, Burkina Faso, Togo et dans plusieurs pays de la région',
      isAttestation: false
    }
  ];

  // ============================================================
  // COMPTEURS ANIMÉS
  // ============================================================
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isCounting) {
          setIsCounting(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current);
      }
    };
  }, [isCounting]);

  const animateCounters = () => {
    const targets = [
      { key: 'experience', target: 20, duration: 1500, suffix: '+' },
      { key: 'personnes', target: 5000, duration: 2000, suffix: '+' },
      { key: 'jeunes', target: 100, duration: 1500, suffix: '+' },
      { key: 'placement', target: 95, duration: 1500, suffix: '%' }
    ];

    targets.forEach(({ key, target, duration, suffix }) => {
      const startTime = performance.now();
      const startValue = 0;

      const updateCounter = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(progress * target);

        setCounters(prev => ({
          ...prev,
          [key]: currentValue
        }));

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          setCounters(prev => ({
            ...prev,
            [key]: target
          }));
        }
      };

      requestAnimationFrame(updateCounter);
    });
  };

  // ============================================================
  // FILTRAGE
  // ============================================================
  const filteredTemoignages = activeFilter === 'Tous' 
    ? temoignages 
    : temoignages.filter(t => t.type === activeFilter);

  // Séparer les attestations des autres références
  const attestations = references.filter(r => r.isAttestation);
  const autresReferences = references.filter(r => !r.isAttestation);

  // ============================================================
  // STATISTIQUES
  // ============================================================
  const stats = [
    { key: 'experience', label: "années d'expérience" },
    { key: 'personnes', label: 'personnes formées' },
    { key: 'jeunes', label: 'jeunes formés au CIDJ' },
    { key: 'placement', label: 'taux de placement CV' }
  ];

  return (
    <main className="temoignages-container">

      <div className="spacer-temoignages"></div>

      {/* ===== HERO ===== */}
      <section className="hero-temoignages">
        <div className="hero-temoignages-container">
          <div className="hero-temoignages-content">
            <span className="badge-gold">TÉMOIGNAGES & RÉFÉRENCES</span>
            <h1 className="hero-temoignages-title">Ils ont avancé avec une méthode plus claire</h1>
            <p className="hero-temoignages-subtitle">Des retours concrets de participants, clients et lecteurs</p>
            <p className="hero-temoignages-description">
              Découvrez les expériences vécues et les résultats obtenus par ceux qui ont fait confiance à Aubin Romain AZIANOUKOU pour leurs formations, leur consulting ou leurs lectures.
            </p>
          </div>
          <div className="hero-temoignages-right">
            <span className="badge-gold">PREUVE SOCIALE</span>
            <div className="mission-box-temoignages">
              <h2 className="mission-temoignages-title">Des résultats qui parlent d'eux-mêmes</h2>
              <p className="mission-temoignages-text">Les expériences partagées ici reflètent la diversité des accompagnements et la constance de l'approche : rigueur, pédagogie et résultats.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-temoignages"></div>

      {/* ===== STATISTIQUES AVEC COMPTEURS ANIMÉS ===== */}
      <section className="section-stats-temoignages" ref={statsRef}>
        <div className="container-temoignages">
          <div className="stats-grid-temoignages">
            {stats.map((stat) => (
              <div key={stat.key} className="stat-card-temoignages">
                <div className="stat-number-temoignages">
                  {counters[stat.key as keyof typeof counters]}
                  {stat.key === 'experience' && '+'}
                  {stat.key === 'personnes' && '+'}
                  {stat.key === 'jeunes' && '+'}
                  {stat.key === 'placement' && '%'}
                </div>
                <div className="stat-label-temoignages">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-temoignages"></div>

      {/* ===== TÉMOIGNAGES ===== */}
      <section className="section-temoignages-light">
        <div className="container-temoignages">
          <div className="section-header-temoignages">
            <span className="badge-gold">FILTRER</span>
            <h2 className="section-title-temoignages">Par type d'accompagnement</h2>
            <p className="section-subtitle-temoignages">Retrouvez les témoignages par catégorie.</p>
          </div>

          <div className="categories-temoignages">
            {['Tous', 'Formation', 'Consulting', 'Livre'].map((cat) => (
              <button
                key={cat}
                className={`category-tag-temoignages ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="testimonials-grid-temoignages">
            {filteredTemoignages.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card-temoignages">
                <div className="testimonial-header-temoignages">
                  <div className="avatar-placeholder-temoignages">
                    <i className={`fas ${testimonial.icon}`}></i>
                  </div>
                  <div className="author-info-temoignages">
                    <span className="author-name-temoignages">{testimonial.nom}</span>
                    <span className="author-role-temoignages">{testimonial.role}</span>
                  </div>
                </div>
                <span className="testimonial-tag-temoignages">{testimonial.type}</span>
                <div className="stars-temoignages">
                  {'★'.repeat(testimonial.note)}
                </div>
                <blockquote className="testimonial-text-temoignages">
                  {testimonial.texte}
                </blockquote>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-temoignages"></div>

      {/* ===== ATTESTATIONS OFFICIELLES ===== */}
      <section className="section-attestations-temoignages">
        <div className="container-temoignages">
          <div className="section-header-temoignages">
            <span className="badge-gold">🏛️ ATTESTATIONS OFFICIELLES</span>
            <h2 className="section-title-temoignages">Reconnaissances institutionnelles</h2>
            <p className="section-subtitle-temoignages">Des attestations de bonne fin d'exécution pour des missions d'envergure nationale et internationale.</p>
          </div>

          <div className="attestations-grid">
            {attestations.map((ref) => (
              <div key={ref.id} className="attestation-card">
                <div className="attestation-badge">{ref.badge}</div>
                <div className="attestation-icon">
                  <i className={`fas ${ref.icon}`}></i>
                </div>
                <h3>{ref.titre}</h3>
                <p className="attestation-desc">{ref.desc}</p>
                <div className="attestation-detail">
                  <i className="fas fa-info-circle"></i>
                  <span>{ref.detail}</span>
                </div>
                <div className="attestation-date">
                  <i className="fas fa-calendar-alt"></i>
                  <span>{ref.date}</span>
                </div>
                <div className="attestation-seal">
                  <i className="fas fa-check-circle"></i>
                  <span>Attestation certifiée</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-temoignages"></div>

      {/* ===== AUTRES RÉFÉRENCES ===== */}
      <section className="section-references-temoignages">
        <div className="container-temoignages">
          <div className="section-header-temoignages">
            <span className="badge-gold">RÉFÉRENCES</span>
            <h2 className="section-title-temoignages">Ils m'ont fait confiance</h2>
            <p className="section-subtitle-temoignages">Des institutions et organisations qui ont accompagné mon parcours.</p>
          </div>

          <div className="references-grid-temoignages">
            {autresReferences.map((ref) => (
              <div key={ref.id} className="reference-card-temoignages">
                <div className="reference-icon-temoignages">
                  <i className={`fas ${ref.icon}`}></i>
                </div>
                <div className="reference-titre-temoignages">{ref.titre}</div>
                <div className="reference-desc-temoignages">{ref.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-temoignages"></div>

      {/* ===== CTA WHATSAPP ===== */}
      <section className="cta-final-temoignages">
        <div className="container-cta-temoignages">
          <h2 className="cta-title-temoignages">Vous aussi, faites l'expérience de la méthode</h2>
          <p className="cta-text-temoignages">Contactez-moi pour échanger sur vos besoins et découvrir comment je peux vous accompagner.</p>
          <div className="cta-group-temoignages">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta-temoignages">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-temoignages"></div>

      {/* ============================================================ */}
      {/* ===== STYLES ===== */}
      {/* ============================================================ */}
      <style>{`
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

        .temoignages-container { background-color: var(--color-cream); }
        .spacer-temoignages { height: 36px; background-color: var(--color-cream); }

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

        .btn-gold-cta-temoignages {
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
        .btn-gold-cta-temoignages:hover { background-color: #e1bb43; }

        /* ===== HERO ===== */
        .hero-temoignages {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-temoignages-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-temoignages-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }
        .hero-temoignages-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero-temoignages-subtitle {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          opacity: 0.8;
          margin: 0;
        }
        .hero-temoignages-description {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.65;
          max-width: 700px;
          margin: 0;
        }
        .hero-temoignages-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
        .mission-box-temoignages {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-temoignages-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .mission-temoignages-text {
          margin-top: 12px;
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== STATISTIQUES AVEC COMPTEURS ===== */
        .section-stats-temoignages {
          padding: 40px 20px;
          margin: 0 -20px;
          background-color: var(--color-navy);
        }
        .stats-grid-temoignages {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .stat-card-temoignages {
          text-align: center;
          color: var(--color-white);
          padding: 16px;
        }
        .stat-number-temoignages {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-gold);
          transition: all 0.3s ease;
          min-height: 48px;
        }
        .stat-label-temoignages {
          font-size: 13px;
          color: var(--color-gray-light);
          opacity: 0.8;
          margin-top: 4px;
        }

        /* ===== TÉMOIGNAGES ===== */
        .section-temoignages-light { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-cream); }
        .container-temoignages { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .section-header-temoignages { text-align: center; margin-bottom: 30px; }
        .section-title-temoignages {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .section-subtitle-temoignages {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        .categories-temoignages {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 30px;
        }
        .category-tag-temoignages {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 9999px;
          padding: 6px 16px;
          font-size: 12px;
          font-weight: 600;
          color: var(--color-navy);
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .category-tag-temoignages:hover {
          background-color: var(--color-gold);
          color: var(--color-navy);
          border-color: var(--color-gold);
        }
        .category-tag-temoignages.active {
          background-color: var(--color-gold);
          color: var(--color-navy);
          border-color: var(--color-gold);
        }

        .testimonials-grid-temoignages {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .testimonial-card-temoignages {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          transition: box-shadow 0.3s ease;
        }
        .testimonial-card-temoignages:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }

        .testimonial-header-temoignages {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .avatar-placeholder-temoignages {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background-color: var(--color-cream);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          color: var(--color-gold);
          flex-shrink: 0;
        }
        .author-info-temoignages {
          display: flex;
          flex-direction: column;
        }
        .author-name-temoignages {
          font-weight: 700;
          font-size: 15px;
          color: var(--color-navy);
        }
        .author-role-temoignages {
          font-size: 12px;
          color: var(--color-gray);
        }
        .testimonial-tag-temoignages {
          display: inline-block;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gold);
          background-color: rgba(212, 175, 55, 0.1);
          padding: 3px 10px;
          border-radius: 9999px;
          align-self: flex-start;
        }
        .stars-temoignages {
          color: var(--color-gold);
          font-size: 14px;
          letter-spacing: 2px;
        }
        .testimonial-text-temoignages {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.7;
          font-style: italic;
          margin: 0;
        }

        /* ===== ATTESTATIONS ===== */
        .section-attestations-temoignages {
          padding: 50px 20px;
          margin: 0 -20px;
          background-color: var(--color-white);
          border-top: 2px solid var(--color-gold);
          border-bottom: 2px solid var(--color-gold);
        }
        .attestations-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .attestation-card {
          background-color: var(--color-cream);
          border-radius: 16px;
          padding: 24px;
          text-align: center;
          border: 1px solid rgba(6, 23, 47, 0.08);
          transition: box-shadow 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .attestation-card:hover {
          box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08);
        }
        .attestation-badge {
          display: inline-block;
          background-color: var(--color-gold);
          color: var(--color-navy);
          font-size: 10px;
          font-weight: 700;
          padding: 4px 12px;
          border-radius: 9999px;
          align-self: center;
          letter-spacing: 0.04em;
        }
        .attestation-icon {
          font-size: 32px;
          color: var(--color-gold);
        }
        .attestation-card h3 {
          font-family: var(--font-serif);
          font-size: 17px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0;
          line-height: 1.2;
        }
        .attestation-desc {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.5;
          margin: 0;
        }
        .attestation-detail {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          background-color: var(--color-white);
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 13px;
          color: var(--color-gray);
          text-align: left;
          line-height: 1.5;
          border-left: 3px solid var(--color-gold);
        }
        .attestation-detail i {
          color: var(--color-gold);
          margin-top: 2px;
          flex-shrink: 0;
        }
        .attestation-date {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: var(--color-gray);
          font-weight: 600;
        }
        .attestation-date i {
          color: var(--color-gold);
        }
        .attestation-seal {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 12px;
          color: #28a745;
          font-weight: 600;
          margin-top: 4px;
          padding-top: 10px;
          border-top: 1px solid rgba(6, 23, 47, 0.06);
        }
        .attestation-seal i {
          color: #28a745;
        }

        /* ===== RÉFÉRENCES ===== */
        .section-references-temoignages {
          padding: 50px 20px;
          margin: 0 -20px;
          background-color: var(--color-cream);
        }
        .references-grid-temoignages {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .reference-card-temoignages {
          background-color: var(--color-white);
          border-radius: 14px;
          padding: 18px 16px;
          border: 1px solid rgba(6, 23, 47, 0.06);
          text-align: center;
          transition: box-shadow 0.3s ease;
        }
        .reference-card-temoignages:hover {
          box-shadow: 0 4px 16px rgba(6, 23, 47, 0.06);
        }
        .reference-icon-temoignages {
          font-size: 28px;
          color: var(--color-gold);
          margin-bottom: 6px;
        }
        .reference-titre-temoignages {
          font-weight: 700;
          font-size: 14px;
          color: var(--color-navy);
          margin-bottom: 2px;
        }
        .reference-desc-temoignages {
          font-size: 12px;
          color: var(--color-gray);
          line-height: 1.5;
        }

        /* ===== CTA ===== */
        .cta-final-temoignages {
          background-color: var(--color-navy);
          padding: 50px 20px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-temoignages { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-temoignages {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .cta-text-temoignages {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-group-temoignages {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-temoignages-title { font-size: 32px !important; }
          .mission-temoignages-title { font-size: 24px !important; }
          .testimonials-grid-temoignages { grid-template-columns: 1fr !important; gap: 16px !important; }
          .attestations-grid { grid-template-columns: 1fr !important; }
          .references-grid-temoignages { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .stats-grid-temoignages { grid-template-columns: repeat(2, 2fr) !important; gap: 12px !important; }
          .stat-number-temoignages { font-size: 30px !important; }
          .spacer-temoignages { height: 16px !important; }
        }

        @media (max-width: 768px) {
          .spacer-temoignages { height: 12px !important; }

          .hero-temoignages { padding: 30px 16px 25px 16px !important; }
          .hero-temoignages-container { gap: 22px !important; }
          .hero-temoignages-title { font-size: 26px !important; }
          .hero-temoignages-subtitle { font-size: 14px !important; }
          .hero-temoignages-description { font-size: 14px !important; }
          .mission-box-temoignages { padding: 18px !important; }
          .mission-temoignages-title { font-size: 22px !important; }
          .mission-temoignages-text { font-size: 14px !important; }

          .section-stats-temoignages { padding: 30px 16px !important; }
          .stats-grid-temoignages { grid-template-columns: 1fr 1fr !important; gap: 10px !important; padding: 0 !important; }
          .stat-number-temoignages { font-size: 26px !important; }
          .stat-label-temoignages { font-size: 11px !important; }

          .section-temoignages-light { padding: 35px 16px !important; }
          .section-attestations-temoignages { padding: 35px 16px !important; }
          .section-references-temoignages { padding: 35px 16px !important; }
          .section-title-temoignages { font-size: 22px !important; }
          .section-subtitle-temoignages { font-size: 14px !important; }

          .categories-temoignages { gap: 6px !important; }
          .category-tag-temoignages { font-size: 11px !important; padding: 4px 12px !important; }

          .testimonials-grid-temoignages { grid-template-columns: 1fr !important; gap: 14px !important; }
          .testimonial-card-temoignages { padding: 18px !important; }

          .attestations-grid { grid-template-columns: 1fr !important; }
          .attestation-card { padding: 18px !important; }
          .attestation-card h3 { font-size: 16px !important; }

          .references-grid-temoignages { grid-template-columns: 1fr !important; gap: 12px !important; }
          .reference-card-temoignages { padding: 14px 12px !important; }
          .reference-icon-temoignages { font-size: 22px !important; }
          .reference-titre-temoignages { font-size: 13px !important; }
          .reference-desc-temoignages { font-size: 11px !important; }

          .cta-final-temoignages { padding: 35px 16px !important; }
          .cta-title-temoignages { font-size: 22px !important; }
          .cta-text-temoignages { font-size: 14px !important; }
          .btn-gold-cta-temoignages {
            width: 100% !important;
            justify-content: center !important;
            font-size: 13px !important;
            padding: 12px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .spacer-temoignages { height: 10px !important; }

          .hero-temoignages { padding: 20px 12px 16px 12px !important; }
          .hero-temoignages-title { font-size: 22px !important; }
          .hero-temoignages-subtitle { font-size: 13px !important; }
          .hero-temoignages-description { font-size: 13px !important; }
          .mission-temoignages-title { font-size: 19px !important; }
          .mission-temoignages-text { font-size: 13px !important; }

          .section-stats-temoignages { padding: 24px 12px !important; }
          .stats-grid-temoignages { grid-template-columns: 1fr !important; gap: 8px !important; }
          .stat-number-temoignages { font-size: 22px !important; }
          .stat-label-temoignages { font-size: 10px !important; }

          .section-temoignages-light { padding: 28px 12px !important; }
          .section-attestations-temoignages { padding: 28px 12px !important; }
          .section-references-temoignages { padding: 28px 12px !important; }
          .section-title-temoignages { font-size: 20px !important; }
          .section-subtitle-temoignages { font-size: 13px !important; }

          .testimonial-card-temoignages { padding: 16px !important; }
          .testimonial-header-temoignages { flex-direction: column !important; text-align: center !important; gap: 8px !important; }
          .author-name-temoignages { font-size: 14px !important; }
          .testimonial-text-temoignages { font-size: 13px !important; }
          .testimonial-tag-temoignages { align-self: center !important; }

          .attestation-card h3 { font-size: 15px !important; }
          .attestation-detail { font-size: 12px !important; }

          .cta-final-temoignages { padding: 28px 12px !important; }
          .cta-title-temoignages { font-size: 20px !important; }
          .cta-text-temoignages { font-size: 13px !important; }
          .btn-gold-cta-temoignages {
            font-size: 12px !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>
    </main>
  );
}