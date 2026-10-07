'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([0, 1, 2, 3]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  // Catégories et questions
  const faqCategories = [
    // ============================================================
    // 1. FORMATIONS
    // ============================================================
    {
      id: 'formations',
      title: 'Formations',
      icon: 'fa-graduation-cap',
      questions: [
        {
          q: 'Quelles formations sont disponibles actuellement ?',
          a: 'Plus de 15 formations sont disponibles dans les domaines suivants : <strong>Bureautique</strong> (Excel Expert, Microsoft Office, Opérateur de saisie), <strong>Gestion & Administration</strong> (Assistance de Direction, Sage Saari, Perfecto), <strong>Marketing & Digital</strong> (Marketing Digital, Graphisme), <strong>Entrepreneuriat</strong> (Business Plan, Entrepreneuriat, GBSA PARTNERS), <strong>Outils spécialisés</strong> (KoboToolbox, DAO, Infographie) et <strong>Intelligence Artificielle</strong>. Consultez la page <a href="/formations">Formations</a> pour le détail.'
        },
        {
          q: 'Peut-on payer en plusieurs fois ?',
          a: 'Oui, des <strong>facilités de paiement</strong> sont possibles sur demande. Contactez-moi directement sur <a href="https://wa.me/22667739734" target="_blank">WhatsApp</a> pour en discuter. Des formules de paiement échelonné sont disponibles selon le type de formation.'
        },
        {
          q: 'Les cours sont-ils en ligne ou en présentiel ?',
          a: 'Les formations sont proposées à la fois en <strong>présentiel</strong> (à Ouagadougou) et en <strong>ligne</strong> (visioconférence). Choisissez le format qui vous convient le mieux. Certaines formations comme "Marketing Digital" et "Sage Saari" sont disponibles en ligne, tandis que "Excel Expert" et "Assistance de Direction" sont proposées en présentiel.'
        },
        {
          q: 'Y a-t-il un certificat à la fin ?',
          a: 'Oui, à l\'issue de chaque formation, un <strong>certificat de fin de formation</strong> vous est délivré. Il atteste des compétences acquises et peut valoriser votre CV ou votre dossier professionnel. Les formations certifiantes sont reconnues par les entreprises et institutions.'
        },
        {
          q: 'Quel est le niveau requis pour s\'inscrire ?',
          a: 'Chaque formation est adaptée à un niveau spécifique. Les prérequis sont indiqués sur la page de chaque formation. Par exemple, "Excel Expert" nécessite une maîtrise de base d\'Excel, tandis que "Marketing Digital" et "KoboToolbox" sont accessibles sans prérequis. En cas de doute, <a href="/contact">contactez-moi</a> pour un conseil personnalisé.'
        },
        {
          q: 'Puis-je suivre une formation à mon rythme ?',
          a: 'Oui, pour les formations en ligne, vous pouvez suivre les modules à votre rythme avec un accès pendant plusieurs semaines. Pour le présentiel, les sessions sont planifiées sur une durée définie (généralement 5 jours). Des sessions intensives sont également possibles sur demande.'
        },
        {
          q: 'Quels sont les tarifs des formations ?',
          a: 'Les tarifs varient selon la formation : <strong>Opérateur de saisie</strong> (100 000 FCFA), <strong>Marketing Digital</strong> (150 000 FCFA), <strong>Assistance de Direction</strong> (180 000 FCFA), <strong>Business Plan</strong> (200 000 FCFA), <strong>Excel Expert</strong> (250 000 FCFA), <strong>Entrepreneuriat</strong> (250 000 FCFA), <strong>Intelligence Artificielle</strong> (à partir de 75 000 FCFA). Consultez la page <a href="/formations">Formations</a> pour tous les détails.'
        },
        {
          q: 'Y a-t-il des formations en anglais ?',
          a: 'Oui, des <strong>English Training Programs</strong> sont disponibles en individuel ou en groupe, animés par des coachs experts. Ces formations sont conçues pour renforcer vos compétences professionnelles en anglais, la langue internationale des affaires. <a href="/formations">Demandez un devis</a> pour un programme sur mesure.'
        }
      ]
    },

    // ============================================================
    // 2. CONSULTING
    // ============================================================
    {
      id: 'consulting',
      title: 'Consulting',
      icon: 'fa-briefcase',
      questions: [
        {
          q: 'Comment se déroule un accompagnement ?',
          a: 'Un accompagnement suit <strong>4 étapes</strong> : <strong>1. Diagnostic</strong> (analyse de votre situation, vos forces et axes d\'amélioration), <strong>2. Recommandations</strong> (propositions claires et adaptées), <strong>3. Accompagnement</strong> (suivi personnalisé pour mettre en œuvre les solutions), <strong>4. Suivi des résultats</strong> (mesure des progrès et ajustements). Chaque étape est adaptée à votre situation et à vos objectifs.'
        },
        {
          q: 'Quels sont les délais moyens ?',
          a: 'Les délais varient selon la prestation. Un <strong>diagnostic</strong> peut prendre 1 à 2 semaines. Un <strong>Business Plan</strong> est généralement livré en 2 à 4 semaines. Une <strong>étude de marché</strong> complète peut prendre 3 à 6 semaines. Un accompagnement complet s\'étend généralement sur 3 à 6 mois. Un <a href="/contact">échange préalable</a> permet de fixer un calendrier précis.'
        },
        {
          q: 'Travaillez-vous avec les ONG et institutions ?',
          a: 'Oui, j\'accompagne régulièrement des <strong>ONG, des institutions et des organisations internationales</strong> sur des missions de diagnostic, de formation et d\'accompagnement stratégique. J\'ai notamment travaillé avec l\'Ambassade des États-Unis, l\'UNESCO / OCD — Liptako-Gourma, l\'International Youth Fellowship (IYF), le CIDJ et plusieurs universités du Bénin.'
        },
        {
          q: 'Comment obtenir un devis ?',
          a: 'Remplissez le formulaire de devis sur la page <a href="/consulting#devis">Consulting</a> ou contactez-moi directement sur <a href="https://wa.me/22667739734" target="_blank">WhatsApp</a>. Je vous répondrai dans les meilleurs délais (généralement sous 24h).'
        },
        {
          q: 'Proposez-vous des missions à court terme ?',
          a: 'Oui, je propose aussi des <strong>missions ponctuelles</strong> : audit, étude de marché, business plan, formation intra-entreprise, création graphique (logo, charte graphique, supports de communication), rédaction de CV et lettres de motivation, etc. La durée est adaptée à votre besoin, de quelques jours à plusieurs semaines.'
        },
        {
          q: 'Quels sont les domaines de consulting ?',
          a: 'Je propose des services de consulting dans plusieurs domaines : <strong>Conseil stratégique</strong> (Business Plan, Étude de marché, Diagnostic d\'entreprise, Redressement), <strong>Création graphique</strong> (Charte graphique, Logo, Cartes de visite, Kakémono, Brochures, Flyers), <strong>Rédaction & CV</strong> (CV sans photo, CV avec photo, Lettre de motivation), et <strong>Services digitaux</strong> (Création de sites web, Gestion des réseaux sociaux, Création de pages Facebook, Instagram, TikTok, LinkedIn, X).'
        }
      ]
    },

    // ============================================================
    // 3. LIVRES
    // ============================================================
    {
      id: 'livres',
      title: 'Livres & Ouvrages',
      icon: 'fa-book',
      questions: [
        {
          q: 'Quels livres sont disponibles ?',
          a: 'Plusieurs ouvrages sont disponibles : <strong>"Le Déclic"</strong> (100 exemplaires achetés par l\'Ambassade des États-Unis pour des programmes d\'entrepreneuriat au Bénin), <strong>"Dominez votre journée"</strong>, <strong>"Secrets de Vie — Prospérité financière"</strong>, <strong>"Le Soleil levant du quarantenaire"</strong>, <strong>"Mariage : Le grand examen"</strong>. Consultez la page <a href="/auteur">Auteur</a> pour plus d\'informations.'
        },
        {
          q: 'Où puis-je acheter les livres ?',
          a: 'Les livres sont disponibles en <strong>version numérique (PDF)</strong> et en <strong>version papier</strong> sur plusieurs plateformes : <a href="https://www.amazon.fr" target="_blank">Amazon</a>, <a href="https://www.draft2digital.com" target="_blank">Draft2Digital</a>, <a href="https://www.chariow.com" target="_blank">Chariow</a>, <a href="#" target="_blank">Librairie Jeunesse d\'Afrique</a> et <a href="#" target="_blank">Mercury Librairie</a>. Les liens d\'achat sont disponibles sur la page de chaque ouvrage.'
        },
        {
          q: 'Y a-t-il une version numérique ?',
          a: 'Oui, tous les ouvrages sont disponibles en <strong>version numérique (PDF)</strong> sécurisée. La version numérique est généralement moins chère que la version papier et est disponible immédiatement après achat.'
        },
        {
          q: 'Comment être informé des prochaines sorties ?',
          a: 'Inscrivez-vous à la <a href="/ressources">newsletter</a> ou suivez-moi sur les réseaux sociaux pour être informé des prochaines parutions. Vous pouvez aussi me contacter directement sur <a href="https://wa.me/22667739734" target="_blank">WhatsApp</a> pour être tenu informé.'
        },
        {
          q: 'Les livres sont-ils disponibles en librairie ?',
          a: 'Oui, certaines versions papier sont disponibles en librairie : <strong>Librairie Jeunesse d\'Afrique</strong> (Ouagadougou) et <strong>Mercury Librairie</strong>. Les versions numériques sont disponibles sur les plateformes en ligne (Amazon, Draft2Digital, Chariow).'
        },
        {
          q: 'Quels sont les prix des livres ?',
          a: 'Les prix varient selon l\'ouvrage et le format : version numérique (PDF) à partir de 3 000 FCFA, version papier à partir de 7 000 FCFA. Consultez la page <a href="/auteur">Auteur</a> ou les plateformes de vente pour les prix exacts.'
        }
      ]
    },

    // ============================================================
    // 4. GÉNÉRAL
    // ============================================================
    {
      id: 'general',
      title: 'Général',
      icon: 'fa-question-circle',
      questions: [
        {
          q: 'Comment puis-je vous contacter ?',
          a: 'Vous pouvez me contacter de plusieurs façons : <strong>WhatsApp</strong> au <a href="https://wa.me/22667739734" target="_blank">+226 67 73 97 34</a>, par <a href="/contact">formulaire de contact</a>, ou par email. Je réponds généralement sous 24h.'
        },
        {
          q: 'Acceptez-vous les paiements en ligne ?',
          a: 'Oui, les paiements en ligne sont possibles via les plateformes de vente (Amazon, Chariow, etc.) pour les livres. Pour les formations et le consulting, les modalités de paiement sont discutées lors de l\'échange préalable. Des facilités de paiement sont disponibles sur demande.'
        },
        {
          q: 'Proposez-vous des formations en entreprise ?',
          a: 'Oui, je propose des <strong>formations intra-entreprise</strong> sur mesure, adaptées aux besoins spécifiques de votre organisation. Les formations peuvent être dispensées dans vos locaux ou en ligne. Contactez-moi pour un devis personnalisé.'
        },
        {
          q: 'Quelles sont vos zones d\'intervention ?',
          a: 'J\'interviens principalement au <strong>Burkina Faso</strong> (Ouagadougou, Bobo-Dioulasso, etc.), au <strong>Bénin</strong>, au <strong>Togo</strong> et dans plusieurs pays de la sous-région ouest-africaine. Les formations en ligne sont accessibles partout dans le monde.'
        },
        {
          q: 'Proposez-vous des services de création graphique ?',
          a: 'Oui, je propose des services de <strong>création graphique</strong> : charte graphique (à partir de 200 000 FCFA), logo (30 000 – 100 000 FCFA), cartes de visite (à partir de 15 000 FCFA), kakémono et roll-up (à partir de 35 000 FCFA), brochures et catalogues (à partir de 50 000 FCFA), flyers (à partir de 10 000 FCFA). Consultez la page <a href="/consulting">Consulting</a> pour plus d\'informations.'
        }
      ]
    }
  ];

  // Calculer l'index global pour chaque question
  let globalIndex = 0;

  return (
    <main className="faq-container">

      <div className="spacer-faq"></div>

      {/* ===== HERO ===== */}
      <section className="hero-faq">
        <div className="hero-faq-container">
          <div className="hero-faq-content">
            <span className="badge-gold">FAQ</span>
            <h1 className="hero-faq-title">Foire aux questions</h1>
            <p className="hero-faq-subtitle">Les réponses aux questions que vous vous posez</p>
            <p className="hero-faq-description">
              Retrouvez ci-dessous les questions fréquemment posées sur mes formations, mes prestations de consulting, mes ouvrages et mes services.
            </p>
          </div>
          <div className="hero-faq-right">
            <span className="badge-gold">TRANSPARENCE</span>
            <div className="mission-box-faq">
              <h2 className="mission-faq-title">Des réponses claires pour avancer sereinement</h2>
              <p className="mission-faq-text">Je crois que la transparence est la base d'une relation de confiance. Ces réponses vous aideront à y voir plus clair avant de faire un choix.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-faq"></div>

      {/* ===== CATÉGORIES ET FAQ ===== */}
      <section className="section-faq-white">
        <div className="container-faq">
          <div className="section-header-faq">
            <span className="badge-gold">PAR THÈME</span>
            <h2 className="section-title-faq">Questions par catégorie</h2>
            <p className="section-subtitle-faq">Sélectionnez le thème qui vous intéresse.</p>
          </div>

          <div className="categories-faq">
            <span className="category-tag-faq">Toutes</span>
            <span className="category-tag-faq">Formations</span>
            <span className="category-tag-faq">Consulting</span>
            <span className="category-tag-faq">Livres</span>
            <span className="category-tag-faq">Général</span>
          </div>

          <div className="faq-grid">
            {faqCategories.map((category, catIndex) => (
              <div key={catIndex} className={`faq-category ${category.id === 'livres' ? 'full-width' : ''}`}>
                <h3><i className={`fas ${category.icon}`}></i> {category.title}</h3>

                {category.questions.map((item, qIndex) => {
                  const currentIndex = globalIndex++;
                  const isOpen = openItems.includes(currentIndex);

                  return (
                    <div key={qIndex} className="faq-item">
                      <div className="question" onClick={() => toggleItem(currentIndex)}>
                        <i className={`fas ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
                        {item.q}
                      </div>
                      <div className="answer" style={{ display: isOpen ? 'block' : 'none' }}>
                        <span dangerouslySetInnerHTML={{ __html: item.a }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-faq"></div>

      {/* ===== CTA WHATSAPP ===== */}
      <section className="cta-final-faq">
        <div className="container-cta-faq">
          <h2 className="cta-title-faq">Une question qui n'a pas été posée ?</h2>
          <p className="cta-text-faq">Contactez-moi directement sur WhatsApp pour une réponse rapide et personnalisée.</p>
          <div className="cta-group-faq">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta-faq">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-faq"></div>

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
        .faq-container { background-color: var(--color-cream); }
        .spacer-faq { height: 36px; background-color: var(--color-cream); }
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
        .btn-gold-cta-faq {
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
        .btn-gold-cta-faq:hover { background-color: #e1bb43; }

        /* ===== HERO ===== */
        .hero-faq {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-faq-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-faq-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }
        .hero-faq-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero-faq-subtitle {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          opacity: 0.8;
          margin: 0;
        }
        .hero-faq-description {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.65;
          max-width: 700px;
          margin: 0;
        }
        .hero-faq-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
        .mission-box-faq {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-faq-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .mission-faq-text {
          margin-top: 12px;
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== SECTIONS ===== */
        .section-faq-white { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .container-faq { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .section-header-faq { text-align: center; margin-bottom: 30px; }
        .section-title-faq {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .section-subtitle-faq {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        /* ===== CATEGORIES ===== */
        .categories-faq {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
          margin-bottom: 30px;
        }
        .category-tag-faq {
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
        .category-tag-faq:hover {
          background-color: var(--color-gold);
          color: var(--color-navy);
          border-color: var(--color-gold);
        }

        /* ===== FAQ ===== */
        .faq-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .faq-category {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px;
          height: fit-content;
        }
        .faq-category h3 {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--color-navy);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .faq-category h3 i { color: var(--color-gold); }
        .faq-category.full-width {
          grid-column: 1 / -1;
          max-width: 50%;
          justify-self: center;
        }

        .faq-item {
          border-bottom: 1px solid rgba(6, 23, 47, 0.06);
          padding: 14px 0;
        }
        .faq-item:last-child { border-bottom: none; }
        .faq-item .question {
          font-weight: 700;
          font-size: 15px;
          color: var(--color-navy);
          display: flex;
          align-items: flex-start;
          gap: 10px;
          cursor: pointer;
          user-select: none;
        }
        .faq-item .question i {
          color: var(--color-gold);
          font-size: 13px;
          margin-top: 3px;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }
        .faq-item .answer {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin-top: 8px;
          padding-left: 24px;
        }
        .faq-item .answer a {
          color: var(--color-gold);
          font-weight: 600;
          transition: color 0.3s ease;
        }
        .faq-item .answer a:hover {
          color: var(--color-navy);
          text-decoration: underline;
        }

        /* ===== CTA ===== */
        .cta-final-faq {
          background-color: var(--color-navy);
          padding: 50px 20px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-faq { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-faq {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .cta-text-faq {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-group-faq {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-faq-title { font-size: 32px !important; }
          .mission-faq-title { font-size: 24px !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-category.full-width { max-width: 100% !important; }
          .spacer-faq { height: 16px !important; }
        }

        @media (max-width: 768px) {
          .spacer-faq { height: 12px !important; }

          .hero-faq { padding: 30px 16px 25px 16px !important; }
          .hero-faq-container { gap: 22px !important; }
          .hero-faq-title { font-size: 26px !important; }
          .hero-faq-subtitle { font-size: 14px !important; }
          .hero-faq-description { font-size: 14px !important; }
          .mission-box-faq { padding: 18px !important; }
          .mission-faq-title { font-size: 22px !important; }
          .mission-faq-text { font-size: 14px !important; }

          .section-faq-white { padding: 35px 16px !important; }
          .section-title-faq { font-size: 22px !important; }
          .section-subtitle-faq { font-size: 14px !important; }

          .categories-faq { gap: 6px !important; }
          .category-tag-faq { font-size: 11px !important; padding: 4px 12px !important; }

          .faq-grid { grid-template-columns: 1fr !important; }
          .faq-category { padding: 20px !important; }
          .faq-category h3 { font-size: 18px !important; }
          .faq-category.full-width { max-width: 100% !important; }
          .faq-item .answer { padding-left: 0 !important; }

          .cta-final-faq { padding: 35px 16px !important; }
          .cta-title-faq { font-size: 22px !important; }
          .cta-text-faq { font-size: 14px !important; }
          .btn-gold-cta-faq {
            width: 100% !important;
            justify-content: center !important;
            font-size: 13px !important;
            padding: 12px 16px !important;
          }
        }

        @media (max-width: 480px) {
          .spacer-faq { height: 10px !important; }

          .hero-faq { padding: 20px 12px 16px 12px !important; }
          .hero-faq-title { font-size: 22px !important; }
          .hero-faq-subtitle { font-size: 13px !important; }
          .hero-faq-description { font-size: 13px !important; }
          .mission-faq-title { font-size: 19px !important; }
          .mission-faq-text { font-size: 13px !important; }

          .section-faq-white { padding: 28px 12px !important; }
          .section-title-faq { font-size: 20px !important; }
          .section-subtitle-faq { font-size: 13px !important; }

          .faq-category { padding: 16px !important; }
          .faq-category h3 { font-size: 16px !important; }
          .faq-item .question { font-size: 14px !important; }
          .faq-item .answer { font-size: 13px !important; }

          .cta-final-faq { padding: 28px 12px !important; }
          .cta-title-faq { font-size: 20px !important; }
          .cta-text-faq { font-size: 13px !important; }
          .btn-gold-cta-faq {
            font-size: 12px !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>
    </main>
  );
}