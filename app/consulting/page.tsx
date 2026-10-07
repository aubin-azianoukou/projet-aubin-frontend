"use client";

import { useState, useEffect } from 'react';

export default function ConsultingPage() {
  // ===== STATE =====
  const [isDevisOpen, setIsDevisOpen] = useState(false);
  const [devisService, setDevisService] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ===== CONSTANTES =====
  const WHATSAPP_NUMBER = '22667739734';

  // ===== SIDEBAR =====
  useEffect(() => {
    if (isDevisOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setIsSuccess(false);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDevisOpen]);

  const openDevis = (service: string) => {
    setDevisService(service);
    setIsDevisOpen(true);
  };

  const closeDevis = () => {
    setIsDevisOpen(false);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  // ===== FORMULAIRE =====
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nom = (form.querySelector('#devisNom') as HTMLInputElement)?.value.trim();
    const email = (form.querySelector('#devisEmail') as HTMLInputElement)?.value.trim();
    const telephone = (form.querySelector('#devisTelephone') as HTMLInputElement)?.value.trim();
    const message = (form.querySelector('#devisMessage') as HTMLTextAreaElement)?.value.trim();
    const rgpd = (form.querySelector('#devisRgpd') as HTMLInputElement)?.checked;

    if (!nom || !email || !telephone) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    if (!rgpd) {
      alert('Veuillez accepter d\'être recontacté pour valider votre demande.');
      return;
    }

    setIsSubmitting(true);

    const whatsappMessage = `Bonjour Aubin Romain,

Je souhaite obtenir un devis pour :

🎯 *Service :* ${devisService}

👤 *Nom complet :* ${nom}
📧 *Email :* ${email}
📞 *Téléphone :* ${telephone}
${message ? `💬 *Message :* ${message}` : ''}
✅ *RGPD :* Accepté

Merci de me faire parvenir votre devis.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    try {
      await fetch('https://script.google.com/macros/s/AKfycbyscbtJ9-7CxGQHp2yKNOIbDm2Hg0U7ofeXF2P9-BrW9kUD63hD3slJdYhtGzHKzNA/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom, email, telephone, service: devisService, message,
          rgpd: rgpd ? 'Oui' : 'Non',
          type: 'Devis Consulting'
        })
      });
    } catch (error) {
      console.error('Erreur:', error);
    }

    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      closeDevis();
    }, 5000);
  };

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="left">
            <span className="badge">CONSULTING</span>
            <h1>Structurer, diagnostiquer et faire grandir votre organisation</h1>
            <p className="subtitle">Un accompagnement sur mesure pour entrepreneurs, PME, ONG et institutions</p>
            <p className="description">
              Je vous accompagne dans la structuration de vos projets, le diagnostic de votre organisation, la mise en place de solutions concrètes pour une croissance durable, ainsi que dans la création de vos supports de communication.
            </p>
          </div>
          <div className="right">
            <span className="badge">NOTRE APPROCHE</span>
            <div className="mission-box">
              <h2>Des solutions sur mesure pour des résultats concrets</h2>
              <p>Chaque entreprise est unique. Mon approche combine diagnostic rigoureux, recommandations stratégiques, accompagnement personnalisé et création graphique pour des résultats mesurables.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== SERVICES ===== */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="badge">SERVICES</span>
            <h2>Nos prestations pour accompagner votre entreprise</h2>
            <p>Des services conçus pour répondre aux besoins spécifiques des entreprises et des organisations.</p>
          </div>

          {/* ===== CATÉGORIE 1 : CONSEIL STRATÉGIQUE ===== */}
          <div className="category-divider">
            <span>💼 Conseil stratégique</span>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="icon"><i className="fas fa-file-signature"></i></div>
              <h3>Business Plan</h3>
              <p>Structurez un projet crédible, réaliste et présentable aux partenaires, banques et investisseurs.</p>
              <button onClick={() => openDevis('Business Plan')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-chart-pie"></i></div>
              <h3>Étude de marché</h3>
              <p>Analysez votre marché, identifiez les opportunités et validez votre positionnement stratégique.</p>
              <button onClick={() => openDevis('Étude de marché')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-stethoscope"></i></div>
              <h3>Diagnostic d'entreprise</h3>
              <p>Évaluez la santé de votre organisation et identifiez les leviers de performance à activer.</p>
              <button onClick={() => openDevis('Diagnostic d\'entreprise')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-chart-line"></i></div>
              <h3>Redressement</h3>
              <p>Accompagnement pour les entreprises en difficulté : diagnostic, plan d'action et suivi.</p>
              <button onClick={() => openDevis('Redressement')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-users-cog"></i></div>
              <h3>Formation du personnel</h3>
              <p>Des programmes de formation adaptés aux besoins de vos équipes pour monter en compétences.</p>
              <button onClick={() => openDevis('Formation du personnel')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-digital-tiling"></i></div>
              <h3>Transformation digitale</h3>
              <p>Accompagnement pour intégrer les outils numériques et moderniser vos processus.</p>
              <button onClick={() => openDevis('Transformation digitale')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-sitemap"></i></div>
              <h3>Organisation</h3>
              <p>Optimisez votre structure organisationnelle pour gagner en efficacité et en agilité.</p>
              <button onClick={() => openDevis('Organisation')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
            <div className="service-card">
              <div className="icon"><i className="fas fa-bullhorn"></i></div>
              <h3>Marketing &amp; Communication</h3>
              <p>Développez votre visibilité et votre stratégie de communication pour toucher vos cibles.</p>
              <button onClick={() => openDevis('Marketing & Communication')} className="btn-outline-small">
                <i className="fas fa-info-circle"></i> Voir le détail
              </button>
            </div>
          </div>

          {/* ===== CATÉGORIE 2 : CRÉATION GRAPHIQUE ===== */}
          <div className="category-divider">
            <span>🎨 Création graphique &amp; impression</span>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="icon"><i className="fas fa-palette"></i></div>
              <h3>Charte graphique</h3>
              <span className="price-tag">À partir de 200 000 FCFA</span>
              <p>Identité visuelle complète : couleurs, typographies, déclinaisons et guidelines pour votre marque.</p>
              <button onClick={() => openDevis('Charte graphique')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-pen-fancy"></i></div>
              <h3>Logo</h3>
              <span className="price-tag">30 000 – 100 000 FCFA</span>
              <p>Création d'un logo unique, mémorable et représentatif de votre marque et de vos valeurs.</p>
              <button onClick={() => openDevis('Logo')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-id-card"></i></div>
              <h3>Cartes de visite</h3>
              <span className="price-tag">À partir de 15 000 FCFA</span>
              <p>Design professionnel et élégant pour vos cartes de visite qui marquent les esprits.</p>
              <button onClick={() => openDevis('Cartes de visite')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-file-alt"></i></div>
              <h3>Papier à en-tête</h3>
              <span className="price-tag">À partir de 10 000 FCFA</span>
              <p>Papier à en-tête personnalisé aux couleurs de votre marque pour votre correspondance.</p>
              <button onClick={() => openDevis('Papier à en-tête')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-flag"></i></div>
              <h3>Kakémono &amp; Roll-up</h3>
              <span className="price-tag">À partir de 35 000 FCFA</span>
              <p>Supports de communication visuels pour salons, événements et points de vente.</p>
              <button onClick={() => openDevis('Kakémono & Roll-up')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-book"></i></div>
              <h3>Brochures &amp; catalogues</h3>
              <span className="price-tag">À partir de 50 000 FCFA</span>
              <p>Brochures, dépliants et catalogues professionnels pour présenter vos produits ou services.</p>
              <button onClick={() => openDevis('Brochures & catalogues')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-file-pdf"></i></div>
              <h3>Flyers</h3>
              <span className="price-tag">À partir de 10 000 FCFA</span>
              <p>Flyers publicitaires pour promouvoir vos événements, offres et produits.</p>
              <button onClick={() => openDevis('Flyers')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>
          </div>

          {/* ===== CATÉGORIE 3 : RÉDACTION & CV ===== */}
          <div className="category-divider">
            <span>📝 Rédaction &amp; CV</span>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="icon"><i className="fas fa-file-alt"></i></div>
              <h3>CV (sans photo)</h3>
              <span className="price-tag">À partir de 5 000 FCFA</span>
              <p>CV ATS compatible, optimisé pour les systèmes de recrutement. <strong>95% des clients trouvent du travail.</strong></p>
              <button onClick={() => openDevis('CV sans photo')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Commander
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-user-circle"></i></div>
              <h3>CV (avec photo)</h3>
              <span className="price-tag">À partir de 10 000 FCFA</span>
              <p>CV graphique professionnel avec photo. <strong>95% des clients trouvent du travail.</strong></p>
              <button onClick={() => openDevis('CV avec photo')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Commander
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-envelope-open-text"></i></div>
              <h3>Lettre de motivation</h3>
              <span className="price-tag">À partir de 3 000 FCFA</span>
              <p>Lettre de motivation personnalisée pour maximiser vos chances de décrocher un entretien.</p>
              <button onClick={() => openDevis('Lettre de motivation')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Commander
              </button>
            </div>
          </div>

          {/* ===== CATÉGORIE 4 : SERVICES DIGITAUX ===== */}
          <div className="category-divider">
            <span>💻 Services digitaux</span>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="icon"><i className="fas fa-code"></i></div>
              <h3>Création de sites web</h3>
              <span className="price-tag">Sur devis</span>
              <p>Sites vitrine, e-commerce, institutionnels. Design moderne, responsive et optimisé SEO.</p>
              <button onClick={() => openDevis('Création de site web')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fab fa-facebook"></i></div>
              <h3>Création de page Facebook</h3>
              <span className="price-tag">Sur devis</span>
              <p>Création et optimisation de votre page Facebook professionnelle pour développer votre communauté.</p>
              <button onClick={() => openDevis('Création de page Facebook')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fab fa-instagram"></i></div>
              <h3>Création de compte Instagram</h3>
              <span className="price-tag">Sur devis</span>
              <p>Création et optimisation de votre compte Instagram professionnel pour une présence visuelle forte.</p>
              <button onClick={() => openDevis('Création de compte Instagram')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fab fa-tiktok"></i></div>
              <h3>Création de compte TikTok</h3>
              <span className="price-tag">Sur devis</span>
              <p>Création et optimisation de votre compte TikTok pour toucher un public jeune et engagé.</p>
              <button onClick={() => openDevis('Création de compte TikTok')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fab fa-linkedin"></i></div>
              <h3>Création de page LinkedIn</h3>
              <span className="price-tag">Sur devis</span>
              <p>Création et optimisation de votre page LinkedIn pour renforcer votre marque professionnelle.</p>
              <button onClick={() => openDevis('Création de page LinkedIn')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fab fa-twitter"></i></div>
              <h3>Création de compte X (Twitter)</h3>
              <span className="price-tag">Sur devis</span>
              <p>Création et optimisation de votre compte X (Twitter) pour une présence en temps réel.</p>
              <button onClick={() => openDevis('Création de compte X')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>

            <div className="service-card">
              <div className="icon"><i className="fas fa-share-alt"></i></div>
              <h3>Gestion des réseaux sociaux</h3>
              <span className="price-tag">Sur devis</span>
              <p>Stratégie, création de contenu et community management pour tous vos réseaux sociaux.</p>
              <button onClick={() => openDevis('Gestion des réseaux sociaux')} className="btn-inscrire-small">
                <i className="fab fa-whatsapp"></i> Demander un devis
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== MÉTHODOLOGIE ===== */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <span className="badge">MÉTHODOLOGIE</span>
            <h2>Une méthode en 4 étapes</h2>
            <p>Un processus structuré pour des résultats durables.</p>
          </div>

          <div className="methodology-grid">
            <div className="methodology-step">
              <div className="step-number">01</div>
              <div className="icon"><i className="fas fa-search"></i></div>
              <h4>Diagnostic</h4>
              <p>Analyse approfondie de votre situation, de vos forces et de vos axes d'amélioration.</p>
            </div>
            <div className="methodology-step">
              <div className="step-number">02</div>
              <div className="icon"><i className="fas fa-lightbulb"></i></div>
              <h4>Recommandations</h4>
              <p>Des propositions claires, concrètes et adaptées à votre contexte et à vos objectifs.</p>
            </div>
            <div className="methodology-step">
              <div className="step-number">03</div>
              <div className="icon"><i className="fas fa-handshake"></i></div>
              <h4>Accompagnement</h4>
              <p>Un suivi personnalisé pour mettre en œuvre les solutions et surmonter les obstacles.</p>
            </div>
            <div className="methodology-step">
              <div className="step-number">04</div>
              <div className="icon"><i className="fas fa-chart-simple"></i></div>
              <h4>Suivi des résultats</h4>
              <p>Mesure des progrès, ajustements et capitalisation des acquis pour une amélioration continue.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== CAS CONCRETS ===== */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="badge">CAS CONCRETS</span>
            <h2>Des résultats sur le terrain</h2>
            <p>Quelques exemples d'accompagnement et de résultats obtenus.</p>
          </div>

          <div className="case-studies-grid">
            <div className="case-card">
              <span className="case-tag">PME</span>
              <h4>Redressement d'une entreprise du secteur agro-alimentaire</h4>
              <p>Diagnostic complet, plan de restructuration et accompagnement opérationnel pour retrouver la rentabilité.</p>
              <div className="result">📈 Résultat : Retour à l'équilibre en 6 mois</div>
            </div>
            <div className="case-card">
              <span className="case-tag">Entrepreneuriat</span>
              <h4>Business Plan pour une startup technologique</h4>
              <p>Accompagnement à la structuration du projet, élaboration du business plan et présentation aux investisseurs.</p>
              <div className="result">💰 Résultat : Financement obtenu de 150 millions FCFA</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== DEVIS ===== */}
      <section className="section section-light" id="devis">
        <div className="container">
          <div className="section-header">
            <span className="badge">DEMANDER UN DEVIS</span>
            <h2>Parlons de votre projet</h2>
            <p>Remplissez le formulaire ci-dessous ou contactez-moi directement sur WhatsApp.</p>
          </div>

          <div className="devis-form">
            <form id="devisForm" action="https://formspree.io/f/mqevvkya" method="POST">
              <input type="hidden" name="_subject" value="Demande de devis - Consulting" />
              <input type="hidden" name="_next" value="/contact" />

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nom">Nom complet *</label>
                  <input type="text" id="nom" name="nom" placeholder="Votre nom" required />
                </div>
                <div className="form-group">
                  <label htmlFor="entreprise">Entreprise / Organisation</label>
                  <input type="text" id="entreprise" name="entreprise" placeholder="Nom de votre entreprise" />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input type="email" id="email" name="email" placeholder="votre@email.com" required />
                </div>
                <div className="form-group">
                  <label htmlFor="telephone">Téléphone *</label>
                  <input type="tel" id="telephone" name="telephone" placeholder="+226 XX XX XX XX" required />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="besoin">Décrivez votre besoin *</label>
                <textarea id="besoin" name="besoin" placeholder="Présentez votre projet, vos enjeux et vos attentes..." required></textarea>
              </div>

              <div className="form-group-rgpd">
                <input type="checkbox" id="rgpdDevis" name="rgpd" required />
                <label htmlFor="rgpdDevis">
                  J'accepte d'être recontacté par téléphone, email ou WhatsApp dans le cadre de ma demande.
                  <a href="#" target="_blank">En savoir plus</a>
                </label>
              </div>

              <div style={{ textAlign: 'center' }}>
                <button type="submit" className="btn-primary" style={{ fontSize: '14px', padding: '12px 28px' }}>
                  <i className="fas fa-paper-plane"></i> Envoyer ma demande
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final">
        <div className="container">
          <h2>Un projet ? Une question ?</h2>
          <p>Contactez-moi directement sur WhatsApp pour un échange rapide et personnalisé.</p>
          <div className="cta-group">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ================================================================
      SIDEBAR DEVIS
      ================================================================ */}
      <div className={`sidebar-overlay ${isDevisOpen ? 'active' : ''}`}>
        <div className="sidebar">
          <button className="sidebar-close" onClick={closeDevis}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">📝 DEMANDE DE DEVIS</span>
            <h2>Parlons de votre projet</h2>
            <p>Service : <strong id="devisServiceName">{devisService}</strong></p>
          </div>

          {!isSuccess ? (
            <form className="sidebar-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="devisNom">Nom complet *</label>
                <input type="text" id="devisNom" placeholder="Votre nom et prénom" required />
              </div>

              <div className="form-group">
                <label htmlFor="devisEmail">Email *</label>
                <input type="email" id="devisEmail" placeholder="votre@email.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="devisTelephone">Téléphone *</label>
                <input type="tel" id="devisTelephone" placeholder="+226 70 00 00 00" required />
              </div>

              <div className="form-group">
                <label htmlFor="devisMessage">Message (optionnel)</label>
                <textarea id="devisMessage" rows={3} placeholder="Décrivez votre projet en quelques mots..."></textarea>
              </div>

              <div className="form-group-rgpd">
                <input type="checkbox" id="devisRgpd" required />
                <label htmlFor="devisRgpd">
                  J'accepte d'être recontacté par téléphone, email ou WhatsApp dans le cadre de ma demande.
                  <a href="#" target="_blank">En savoir plus</a>
                </label>
              </div>

              <button type="submit" className="btn-submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <><i className="fas fa-spinner fa-spin"></i> Envoi en cours...</>
                ) : (
                  <><i className="fab fa-whatsapp"></i> Envoyer ma demande</>
                )}
              </button>

              <p className="form-footer">📞 Réponse sous 24h maximum</p>
            </form>
          ) : (
            <div className="form-success active">
              <div className="success-icon"><i className="fas fa-check-circle"></i></div>
              <h3>Demande envoyée !</h3>
              <p>Votre demande de devis a bien été enregistrée.<br />Vous serez recontacté sous 24h.</p>
              <button className="btn-gold-small" style={{ marginTop: '16px', padding: '10px 20px', fontSize: '14px' }} onClick={closeDevis}>
                <i className="fas fa-times"></i> Fermer
              </button>
            </div>
          )}
        </div>
      </div>

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

        /* ===== RESET ===== */
        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
          font-family: var(--font-sans);
          background-color: var(--color-cream);
          color: var(--color-navy);
          line-height: 1.6;
          overflow-x: hidden;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-spacer { height: 36px; background: var(--color-cream); }

        /* ===== HERO ===== */
        .hero { background: var(--color-white); padding: 50px 0 40px 0; }
        .hero .container { display: flex; flex-direction: column; align-items: center; gap: 30px; max-width: 900px; text-align: center; }
        .hero .left { display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%; }
        .hero .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(6, 23, 47, 0.06);
          padding: 5px 14px;
          border-radius: 9999px;
          color: var(--color-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .hero h1 { font-family: var(--font-serif); font-size: 38px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; }
        .hero .subtitle { font-size: 16px; font-weight: 700; color: var(--color-navy); opacity: 0.8; max-width: 700px; }
        .hero .description { font-size: 14px; color: var(--color-gray); max-width: 700px; }
        .hero .right { display: flex; flex-direction: column; gap: 14px; align-items: center; width: 100%; }
        .hero .mission-box {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .hero .mission-box h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; }
        .hero .mission-box p { margin-top: 12px; color: var(--color-gray); font-size: 14px; line-height: 1.65; }

        /* ===== SECTION ===== */
        .section { padding: 50px 0; }
        .section-light { background: var(--color-cream); }
        .section-white { background: var(--color-white); }
        .section-header { text-align: center; margin-bottom: 30px; }
        .section-header .badge { display: inline-block; color: var(--color-gold); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
        .section-header h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; }
        .section-header p { color: var(--color-gray); font-size: 14px; max-width: 760px; margin: 0 auto; }

        /* ===== SERVICES ===== */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .service-card {
          background: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          transition: box-shadow 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 8px;
          height: 100%;
        }
        .service-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .service-card .icon { font-size: 30px; color: var(--color-gold); margin-bottom: 4px; }
        .service-card h3 { font-size: 17px; font-weight: 700; color: var(--color-navy); }
        .service-card .price-tag { font-size: 13px; font-weight: 700; color: var(--color-gold); background: rgba(212, 175, 55, 0.08); padding: 2px 10px; border-radius: 9999px; display: inline-block; margin: 2px auto; }
        .service-card p { color: var(--color-gray); font-size: 14px; line-height: 1.5; flex-grow: 1; }
        .service-card .btn-outline-small {
          border: 1px solid rgba(6, 23, 47, 0.25);
          color: var(--color-navy);
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 12px;
          transition: all 0.3s;
          background: transparent;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
        }
        .service-card .btn-outline-small:hover { background: var(--color-navy); color: var(--color-white); }
        .service-card .btn-inscrire-small {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 12px;
          transition: background 0.3s;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          width: 100%;
        }
        .service-card .btn-inscrire-small:hover { background: #e1bb43; }

        /* ===== CATEGORY DIVIDER ===== */
        .category-divider {
          position: relative;
          text-align: center;
          margin: 40px 0 30px 0;
        }
        .category-divider::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 0;
          right: 0;
          height: 1px;
          background: rgba(6, 23, 47, 0.08);
        }
        .category-divider span {
          background: var(--color-white);
          padding: 0 20px;
          position: relative;
          z-index: 1;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--color-gray);
        }

        /* ===== METHODOLOGY ===== */
        .methodology-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .methodology-step {
          background: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px 20px;
          text-align: center;
          transition: box-shadow 0.3s;
        }
        .methodology-step:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .methodology-step .step-number { font-family: var(--font-serif); font-size: 40px; font-weight: 700; color: var(--color-gold); opacity: 0.2; line-height: 1; }
        .methodology-step .icon { font-size: 28px; color: var(--color-gold); margin: 6px 0; }
        .methodology-step h4 { font-size: 15px; font-weight: 700; color: var(--color-navy); margin-bottom: 4px; }
        .methodology-step p { font-size: 13px; color: var(--color-gray); line-height: 1.5; }

        /* ===== CASE STUDIES ===== */
        .case-studies-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .case-card {
          background: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px;
          transition: box-shadow 0.3s;
        }
        .case-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .case-card .case-tag { display: inline-block; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-gold); background: rgba(212, 175, 55, 0.1); padding: 3px 10px; border-radius: 9999px; margin-bottom: 10px; }
        .case-card h4 { font-size: 17px; font-weight: 700; color: var(--color-navy); margin-bottom: 6px; }
        .case-card p { color: var(--color-gray); font-size: 14px; line-height: 1.6; }
        .case-card .result { margin-top: 10px; font-weight: 700; color: var(--color-navy); font-size: 14px; }

        /* ===== FORM DEVIS ===== */
        .devis-form { max-width: 800px; margin: 0 auto; }
        .form-group { margin-bottom: 14px; }
        .form-group label { display: block; font-weight: 600; font-size: 13px; color: var(--color-navy); margin-bottom: 4px; }
        .form-group input, .form-group textarea, .form-group select {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid rgba(6, 23, 47, 0.15);
          border-radius: 12px;
          font-family: var(--font-sans);
          font-size: 14px;
          transition: border-color 0.3s;
          background: var(--color-white);
          color: var(--color-navy);
        }
        .form-group input:focus, .form-group textarea:focus, .form-group select:focus { outline: none; border-color: var(--color-gold); }
        .form-group textarea { min-height: 100px; resize: vertical; }
        .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .form-group-rgpd { display: flex; align-items: flex-start; gap: 10px; margin-top: 4px; margin-bottom: 14px; }
        .form-group-rgpd input[type="checkbox"] { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: var(--color-gold); cursor: pointer; }
        .form-group-rgpd label { font-size: 13px; color: var(--color-gray); line-height: 1.5; cursor: pointer; }
        .form-group-rgpd label a { color: var(--color-gold); text-decoration: underline; font-weight: 600; }

        /* ===== SIDEBAR ===== */
        .sidebar-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(6, 23, 47, 0.6);
          backdrop-filter: blur(4px);
          z-index: 99999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s, visibility 0.3s;
        }
        .sidebar-overlay.active { opacity: 1; visibility: visible; }
        .sidebar {
          position: fixed;
          top: 0;
          right: 0;
          width: 33.33%;
          max-width: 480px;
          height: 100%;
          background: var(--color-white);
          box-shadow: -8px 0 40px rgba(6, 23, 47, 0.2);
          padding: 32px 28px;
          overflow-y: auto;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
          z-index: 100000;
        }
        .sidebar-overlay.active .sidebar { transform: translateX(0); }
        .sidebar-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--color-gray);
          cursor: pointer;
          transition: color 0.3s;
          padding: 4px 8px;
        }
        .sidebar-close:hover { color: var(--color-navy); }
        .sidebar-header { margin-top: 12px; margin-bottom: 20px; }
        .sidebar-header .sidebar-badge { display: inline-block; color: var(--color-gold); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
        .sidebar-header h2 { font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--color-navy); line-height: 1.2; margin-bottom: 8px; }
        .sidebar-header p { font-size: 14px; color: var(--color-gray); margin-bottom: 2px; }
        .sidebar-header p strong { color: var(--color-navy); }

        .sidebar-form { display: flex; flex-direction: column; gap: 16px; }
        .btn-submit {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 14px 20px;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 16px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          transition: background 0.3s;
          margin-top: 4px;
          width: 100%;
        }
        .btn-submit:hover { background: #e1bb43; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-footer { text-align: center; font-size: 13px; color: var(--color-gray); margin-top: 4px; }
        .form-success { display: none; text-align: center; padding: 30px 20px; }
        .form-success.active { display: block; }
        .form-success .success-icon { font-size: 48px; color: var(--color-gold); margin-bottom: 12px; }
        .form-success h3 { font-family: var(--font-serif); font-size: 22px; color: var(--color-navy); margin-bottom: 8px; }
        .form-success p { color: var(--color-gray); font-size: 14px; }

        /* ===== CTA FINAL ===== */
        .cta-final { background: var(--color-navy); padding: 50px 0; text-align: center; }
        .cta-final h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-white); line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 12px; }
        .cta-final p { color: var(--color-gray-light); font-size: 14px; max-width: 680px; margin: 0 auto 30px auto; }
        .cta-final .cta-group { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }
        .cta-final .btn-primary {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.3s;
          border: none;
          cursor: pointer;
          font-size: 14px;
        }
        .cta-final .btn-primary:hover { background: #e1bb43; }

        /* ================================================================ */
        /* ===== WHATSAPP FLOATING (intégré dans le layout) ===== */
        /* Le WhatsApp float est déjà dans le layout, pas besoin de le réintégrer */
        /* ================================================================ */

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .container { padding: 0 18px; }
          .hero h1 { font-size: 32px; }
          .hero .mission-box h2 { font-size: 24px; }
          .services-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .methodology-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .case-studies-grid { grid-template-columns: 1fr; gap: 14px; }
          .form-row { grid-template-columns: 1fr; }
          .sidebar { width: 45%; max-width: 400px; padding: 28px 20px; }
          .section-spacer { height: 24px; }
        }

        @media (max-width: 768px) {
          .hero { padding: 30px 0 25px 0; }
          .hero h1 { font-size: 26px; }
          .hero .subtitle { font-size: 14px; }
          .hero .mission-box h2 { font-size: 22px; }
          .hero .mission-box p { font-size: 14px; }

          .section { padding: 35px 0; }
          .section-header h2 { font-size: 22px; }
          .section-header p { font-size: 14px; }

          .services-grid { grid-template-columns: 1fr; gap: 12px; }
          .service-card { padding: 18px 16px; }
          .service-card .icon { font-size: 26px; }
          .service-card h3 { font-size: 16px; }

          .methodology-grid { grid-template-columns: 1fr; gap: 12px; }
          .methodology-step { padding: 18px 16px; }
          .methodology-step .step-number { font-size: 32px; }

          .case-card { padding: 18px; }
          .case-card h4 { font-size: 16px; }

          .sidebar { width: 100%; max-width: 100%; padding: 24px 16px; }
          .sidebar-header h2 { font-size: 22px; }

          .cta-final { padding: 35px 0; }
          .cta-final h2 { font-size: 22px; }
          .cta-final .cta-group { flex-direction: column; align-items: center; }
          .cta-final .btn-primary { width: 100%; max-width: 300px; justify-content: center; }

          .section-spacer { height: 18px; }
        }

        @media (max-width: 480px) {
          .hero h1 { font-size: 22px; }
          .hero .subtitle { font-size: 13px; }
          .hero .description { font-size: 13px; }
          .hero .mission-box h2 { font-size: 19px; }
          .hero .mission-box p { font-size: 13px; }

          .section-header h2 { font-size: 20px; }
          .section-header p { font-size: 13px; }

          .service-card h3 { font-size: 15px; }
          .service-card p { font-size: 13px; }
          .service-card .price-tag { font-size: 12px; }

          .case-card h4 { font-size: 15px; }
          .case-card p { font-size: 13px; }

          .cta-final { padding: 28px 0; }
          .cta-final h2 { font-size: 20px; }
          .cta-final p { font-size: 13px; }
          .cta-final .btn-primary { font-size: 13px; padding: 12px 16px; }

          .section-spacer { height: 14px; }

          .sidebar-header h2 { font-size: 20px; }
          .sidebar .form-group input, .sidebar .form-group textarea { font-size: 13px; padding: 8px 12px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
        }
      `}</style>
    </>
  );
}