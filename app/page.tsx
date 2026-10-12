"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// ============================================================
// COMPOSANT LIGHTBOX
// ============================================================
function Lightbox({ 
  image, 
  title, 
  onClose 
}: { 
  image: string; 
  title: string; 
  onClose: () => void;
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
        <div className="lightbox-image-wrapper">
          <Image
            src={image}
            alt={title}
            width={400}
            height={600}
            className="lightbox-image"
            sizes="(max-width: 768px) 300px, 400px"
          />
        </div>
        {title && <p className="lightbox-title">{title}</p>}
      </div>
    </div>
  );
}

// ============================================================
// DONNÉES DES LIVRES
// ============================================================
const livresData = [
  {
    id: 1,
    slug: 'le-declic',
    titre: 'Le Déclic',
    description: "Un ouvrage pour provoquer la prise de conscience, clarifier l'action et encourager une progression durable. 100 exemplaires achetés par l'Ambassade des États-Unis.",
    cover: '/images/auteur/le declic.webp',
    estPhare: true
  },
  {
    id: 2,
    slug: 'dominez-votre-journee',
    titre: 'Dominez votre journée',
    description: 'Des méthodes pratiques pour organiser vos journées, prioriser vos tâches et atteindre vos objectifs avec sérénité.',
    cover: '/images/auteur/Dominez votre journée.webp',
    estPhare: false
  },
  {
    id: 3,
    slug: 'le-soleil-levant-du-quarantenaire',
    titre: 'Le Soleil levant du quarantenaire',
    description: "Un guide inspirant pour les quarantenaires qui souhaitent donner un nouveau sens à leur vie et à leur carrière.",
    cover: '/images/auteur/le soleil levant du quarantenaire.webp',
    estPhare: false
  },
  {
    id: 4,
    slug: 'mariage-le-grand-examen',
    titre: 'Mariage : Le grand examen',
    description: 'Un livre qui vous aide à préparer et à vivre un mariage épanouissant, en abordant les clés de la communication et de la compréhension mutuelle.',
    cover: '/images/auteur/Mariage le grand examen.webp',
    estPhare: false
  },
  {
    id: 5,
    slug: 'secrets-de-vie-prosperite-financiere',
    titre: 'Secrets de Vie — Prospérité financière',
    description: 'Découvrez les principes fondamentaux pour atteindre la prospérité financière et construire un avenir serein.',
    cover: '/images/auteur/secrets de vie prospérité financière.webp',
    estPhare: false
  }
];

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  
  // ===== SIDEBAR FORMATIONS =====
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [devisType, setDevisType] = useState<'formation' | 'english'>('formation');

  const WHATSAPP_NUMBER = '22667739734';
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyscbtJ9-7CxGQHp2yKNOIbDm2Hg0U7ofeXF2P9-BrW9kUD63hD3slJdYhtGzHKzNA/exec';

  // ============================================================
  // GESTION DES SIDEBARS
  // ============================================================
  useEffect(() => {
    if (isInscriptionOpen || isProgrammeOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isInscriptionOpen, isProgrammeOpen]);

  const openInscription = (formation: string, session: string) => {
    setSelectedFormation(formation);
    setSelectedSession(session);
    setDevisType('formation');
    setIsInscriptionOpen(true);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const closeInscription = () => {
    setIsInscriptionOpen(false);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const openProgramme = (formation: string, session: string) => {
    setSelectedFormation(formation);
    setSelectedSession(session);
    setIsProgrammeOpen(true);
  };

  const closeProgramme = () => {
    setIsProgrammeOpen(false);
  };

  // ============================================================
  // SOUMISSION DU FORMULAIRE
  // ============================================================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nom = (form.querySelector('#nomComplet') as HTMLInputElement)?.value.trim();
    const email = (form.querySelector('#email') as HTMLInputElement)?.value.trim();
    const telephone = (form.querySelector('#telephone') as HTMLInputElement)?.value.trim();
    const message = (form.querySelector('#message') as HTMLTextAreaElement)?.value.trim();
    const rgpd = (form.querySelector('#rgpd') as HTMLInputElement)?.checked;

    if (!nom || !email || !telephone) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    if (!rgpd) {
      alert('Veuillez accepter d\'être recontacté pour valider votre inscription.');
      return;
    }

    setIsSubmitting(true);

    let whatsappMessage = '';
    let service = '';

    if (devisType === 'english') {
      service = 'English Training Programs';
      whatsappMessage = `Bonjour Aubin Romain,

Je souhaite obtenir un devis pour :

🌍 *Service :* English Training Programs

👤 *Nom complet :* ${nom}
📧 *Email :* ${email}
📞 *Téléphone :* ${telephone}
${message ? `💬 *Message :* ${message}` : ''}
✅ *RGPD :* Accepté

Merci de me faire parvenir votre devis.`;
    } else {
      service = selectedFormation || 'Formation';
      whatsappMessage = `Bonjour Aubin Romain,

Je souhaite m'inscrire à la formation :

📚 *Formation :* ${selectedFormation || 'Formation'}
📅 *Session :* ${selectedSession || 'Prochaine session'}

👤 *Nom complet :* ${nom}
📧 *Email :* ${email}
📞 *Téléphone :* ${telephone}
${message ? `💬 *Message :* ${message}` : ''}
✅ *RGPD :* Accepté

Merci de me confirmer ma place.`;
    }

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom, email, telephone,
          service: service,
          type: devisType === 'english' ? 'Devis English Training' : 'Inscription Formation',
          message,
          rgpd: rgpd ? 'Oui' : 'Non'
        })
      });
    } catch (error) {
      console.error('Erreur Google Sheets:', error);
    }

    window.open(whatsappUrl, '_blank');

    setIsSubmitting(false);
    setIsSuccess(true);

    setTimeout(() => {
      closeInscription();
    }, 5000);
  };

  // ============================================================
  // LIGHTBOX
  // ============================================================
  const openLightbox = (imageUrl: string, title: string) => {
    setSelectedImage(imageUrl);
    setSelectedTitle(title);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    setSelectedTitle('');
    document.body.style.overflow = '';
  };

  // ============================================================
  // SESSION COURANTE
  // ============================================================
  function getCurrentSession() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const endDay = 5;
    const endDate = new Date(year, month, endDay);
    if (endDate.getMonth() !== month) {
      endDate.setMonth(month + 1);
      endDate.setDate(endDay - (endDate.getDate() - 1));
    }
    const mois = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    return {
      start: 1,
      end: endDate.getDate(),
      month: mois[endDate.getMonth()],
      year: endDate.getFullYear(),
      display: `1 – ${endDate.getDate()} ${mois[endDate.getMonth()]} ${endDate.getFullYear()}`
    };
  }

  const session = getCurrentSession();

  // ============================================================
  // DONNÉES DES FORMATIONS POUR LA PAGE D'ACCUEIL
  // ============================================================
  const formationsAccueil = [
    {
      id: 'excel-expert',
      titre: 'Excel Expert',
      description: 'Analysez, automatisez et pilotez vos données avec des tableaux de bord, fonctions avancées et méthodes professionnelles.',
      duree: '35h',
      prix: '250 000 FCFA',
      categorie: 'Bureautique'
    },
    {
      id: 'business-plan',
      titre: 'Business Plan',
      description: 'Structurez un projet crédible, réaliste et présentable aux partenaires, banques, investisseurs ou institutions.',
      duree: '30h',
      prix: '200 000 FCFA',
      categorie: 'Entrepreneuriat'
    },
    {
      id: 'marketing-digital',
      titre: 'Marketing Digital',
      description: 'Construisez une présence digitale efficace, développez votre visibilité et transformez vos canaux en leviers commerciaux.',
      duree: '40h',
      prix: '150 000 FCFA',
      categorie: 'Marketing & Digital'
    },
    {
      id: 'microsoft-office',
      titre: 'Microsoft Office Professionnel',
      description: 'Devenez autonome sur Word, Excel, PowerPoint et les usages bureautiques attendus dans les organisations modernes.',
      duree: '40h',
      prix: '300 000 FCFA',
      categorie: 'Bureautique'
    },
    {
      id: 'sage-saari',
      titre: 'Sage Saari',
      description: 'Maîtrisez l\'outil de gestion comptable et financière pour piloter efficacement votre entreprise ou votre service.',
      duree: '35h',
      prix: '150 000 FCFA',
      categorie: 'Gestion & Administration'
    },
    {
      id: 'entrepreneuriat',
      titre: 'Entrepreneuriat',
      description: 'De l\'idée au lancement : structurez votre projet, validez votre marché et pilotez votre entreprise avec méthode.',
      duree: '40h',
      prix: '250 000 FCFA',
      categorie: 'Entrepreneuriat'
    }
  ];

  return (
    <main className="main-container">

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* HERO */}
      {/* ================================================================ */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-grid">
            <div className="hero-left">
              <span className="badge-gold">CONSULTING • FORMATION • PUBLICATIONS</span>
              <h1 className="hero-title">Aubin Romain<br />AZIANOUKOU</h1>
              <p className="hero-subtitle">International Business Consultant | SME Development Expert | Executive Trainer | Author</p>
              <p className="hero-description">
                J'accompagne les entrepreneurs, les entreprises, les ONG et les institutions dans le développement des compétences, la structuration des projets, la croissance des organisations et la création de valeur durable.
              </p>
              <div className="hero-cta">
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-gold btn-mobile">
                  <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
                </a>
                <Link href="/formations" className="btn-outline-light btn-mobile">Explorer les services</Link>
                <Link href="/consulting" className="btn-outline-gold btn-mobile">Demander une consultation</Link>
              </div>
            </div>
            <div className="hero-right">
              <span className="badge-gold">UNE MISSION UNIFIÉE</span>
              <div className="mission-box">
                <h2 className="mission-title" style={{ fontSize: '44px' }}>
                  Développer les compétences, structurer les entreprises et accompagner la réussite durable.
                </h2>
                <p className="mission-text">Formations, conseil, publications et développement du potentiel humain sont présentés comme quatre expressions d'une même ambition : faire progresser les personnes et les organisations.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* PILIERS */}
      {/* ================================================================ */}
      <section className="section-cream">
        <div className="container">
          <div className="section-header">
            <span className="badge-gold">LES QUATRE PILIERS</span>
            <h2 className="section-title">Une marque personnelle au service de la progression durable</h2>
          </div>
          <div className="pillars-grid">
            <Link href="/formations" className="pillar-card">
              <div className="icon-gold"><i className="fas fa-graduation-cap"></i></div>
              <h3 className="pillar-title">Formation professionnelle</h3>
              <p className="pillar-desc">Des compétences concrètes, certifiantes et immédiatement applicables.</p>
            </Link>
            <Link href="/consulting" className="pillar-card">
              <div className="icon-gold"><i className="fas fa-briefcase"></i></div>
              <h3 className="pillar-title">Conseil et développement d'entreprise</h3>
              <p className="pillar-desc">Diagnostic, structuration, croissance et suivi des résultats.</p>
            </Link>
            <Link href="/auteur" className="pillar-card">
              <div className="icon-gold"><i className="fas fa-book"></i></div>
              <h3 className="pillar-title">Auteur et publications</h3>
              <p className="pillar-desc">Des ouvrages pour transmettre l'expérience du terrain.</p>
            </Link>
            <Link href="/ressources" className="pillar-card">
              <div className="icon-gold"><i className="fas fa-brain"></i></div>
              <h3 className="pillar-title">Développement du potentiel humain</h3>
              <p className="pillar-desc">Entrepreneuriat, finance, productivité, leadership et santé.</p>
            </Link>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* À PROPOS */}
      {/* ================================================================ */}
      <section className="section-white">
        <div className="container">
          <div className="about-grid">
            <div className="about-left">
              <span className="badge-gold">À PROPOS</span>
              <h2 className="about-title">Un accompagnement de terrain pour des décisions plus solides</h2>
              <p className="about-text">Depuis Ouagadougou, Aubin Romain Azianoukou accompagne celles et ceux qui veulent transformer une idée, une compétence ou une organisation en résultat durable. Son approche relie la rigueur du conseil, la pédagogie de la formation et l'expérience concrète du développement d'entreprise.</p>
              <Link href="/a-propos" className="btn-dark">Découvrir mon parcours</Link>
            </div>
            <div className="about-stats">
              <div className="stat-card"><div className="stat-number">20+</div><div className="stat-label">années d'expérience</div></div>
              <div className="stat-card"><div className="stat-number">5000+</div><div className="stat-label">personnes formées</div></div>
              <div className="stat-card"><div className="stat-number">100+</div><div className="stat-label">entreprises accompagnées</div></div>
              <div className="stat-card"><div className="stat-number">Afrique</div><div className="stat-label">plusieurs pays d'intervention</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* SERVICES */}
      {/* ================================================================ */}
      <section className="section-cream">
        <div className="container">
          <div className="section-header">
            <span className="badge-gold">SERVICES</span>
            <h2 className="section-title">Structurer, diagnostiquer et faire grandir votre organisation</h2>
          </div>
          <div className="services-grid">
            {['Business Plan', 'Étude de marché', "Diagnostic d'entreprise", 'Redressement', 'Formation du personnel', 'Transformation digitale'].map((service) => (
              <Link key={service} href="/consulting" className="service-card">{service}</Link>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* FORMATIONS AVEC SIDEBARS */}
      {/* ================================================================ */}
      <section className="section-white">
        <div className="container">
          <div className="section-header">
            <span className="badge-gold">FORMATIONS</span>
            <h2 className="section-title">Des compétences concrètes, immédiatement applicables</h2>
            <p className="section-desc">Découvrez nos formations professionnelles avec certificat.</p>
          </div>
          <div className="trainings-grid-home">
            {formationsAccueil.map((formation) => (
              <div key={formation.id} className="training-card-home">
                <div className="training-content">
                  <span className="training-category">{formation.categorie}</span>
                  <h3 className="training-title">{formation.titre}</h3>
                  <div className="training-meta">
                    <span><i className="far fa-clock"></i> {formation.duree}</span>
                    <span><i className="fas fa-tag"></i> {formation.prix}</span>
                  </div>
                  <p className="training-desc">{formation.description}</p>
                </div>
                <div className="training-actions">
                  <button 
                    className="btn-outline-small"
                    onClick={() => openProgramme(formation.titre, session.display)}
                  >
                    <i className="fas fa-book"></i> En savoir plus
                  </button>
                  <button 
                    className="btn-gold-small"
                    onClick={() => openInscription(formation.titre, session.display)}
                  >
                    <i className="fas fa-pencil-alt"></i> S'inscrire
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/formations" className="btn-outline-dark">Voir toutes les formations</Link>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* AUTEUR AVEC LIGHTBOX */}
      {/* ================================================================ */}
      <section className="section-cream">
        <div className="container">
          <div className="section-header">
            <span className="badge-gold">AUTEUR</span>
            <h2 className="section-title">Des ouvrages pour éclairer l'action</h2>
            <p className="section-desc">
              Des livres pratiques nés de l'expérience terrain, pour vous guider dans vos décisions et votre progression.
            </p>
          </div>

          <div className="books-grid-home">
            {livresData.map((livre) => (
              <div key={livre.id} className="book-card-home">
                {livre.cover ? (
                  <div 
                    className="book-image-wrapper"
                    onClick={() => openLightbox(livre.cover, livre.titre)}
                    style={{ cursor: 'pointer' }}
                  >
                    <Image
                      src={livre.cover}
                      alt={livre.titre}
                      width={200}
                      height={300}
                      className="book-image"
                      sizes="(max-width: 480px) 140px, (max-width: 768px) 160px, 200px"
                    />
                    <div className="book-image-overlay">
                      <i className="fas fa-search-plus"></i>
                      <span>Agrandir</span>
                    </div>
                  </div>
                ) : (
                  <div className="book-image-placeholder">
                    <i className="fas fa-book"></i>
                  </div>
                )}
                
                <Link href={`/livres/${livre.slug}`} className="book-content-link">
                  <h3 className="book-title">{livre.titre}</h3>
                  <p className="book-desc">{livre.description}</p>
                  <span className="book-link">
                    Lire la suite <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            ))}
          </div>

          {/* ===== CTA VERS TÉMOIGNAGES ===== */}
          <div className="books-cta-wrapper">
            <Link href="/temoignages" className="books-cta-link">
              <i className="fas fa-star"></i>
              <span>Consulter nos témoignages et attestations de bonne fin</span>
              <i className="fas fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* TÉMOIGNAGES */}
      {/* ================================================================ */}
      <section className="section-white">
        <div className="container">
          <div className="section-header">
            <span className="badge-gold">TÉMOIGNAGES</span>
            <h2 className="section-title">Ils ont avancé avec une méthode plus claire</h2>
          </div>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">La formation Business Plan m'a aidée à clarifier mon projet et à présenter un dossier plus professionnel à mes partenaires.</p>
              <span className="testimonial-author">Mariam O.</span>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">L'accompagnement a permis de mieux organiser nos priorités et de mettre en place des outils de suivi simples mais efficaces.</p>
              <span className="testimonial-author">Direction administrative</span>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">J'ai gagné en confiance sur Excel et je peux maintenant produire des tableaux utiles pour mon travail.</p>
              <span className="testimonial-author">Étudiant en reconversion</span>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* CTA FINAL */}
      {/* ================================================================ */}
      <section className="cta-final">
        <div className="container">
          <h2 className="cta-title">Prêt à passer à l'action ?</h2>
          <p className="cta-text">Un échange rapide peut clarifier votre besoin, votre projet ou la prochaine session adaptée à votre objectif.</p>
          <div className="cta-group">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-gold btn-mobile">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
            <Link href="/evenements" className="btn-outline-light btn-mobile">Voir le calendrier des formations</Link>
          </div>
        </div>
      </section>

      <div className="spacer"></div>

      {/* ================================================================ */}
      {/* LIGHTBOX */}
      {/* ================================================================ */}
      {selectedImage && (
        <Lightbox 
          image={selectedImage} 
          title={selectedTitle}
          onClose={closeLightbox}
        />
      )}

      {/* ================================================================ */}
      {/* SIDEBAR INSCRIPTION */}
      {/* ================================================================ */}
      <div className={`sidebar-overlay ${isInscriptionOpen ? 'active' : ''}`}>
        <div className="sidebar">
          <button className="sidebar-close" onClick={closeInscription}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">📝 INSCRIPTION</span>
            <h2>Réservez votre place</h2>
            <p>Formation : <strong>{selectedFormation}</strong></p>
            <p>Session : <strong>{selectedSession}</strong></p>
          </div>

          {!isSuccess ? (
            <form className="sidebar-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="nomComplet">Nom complet *</label>
                <input type="text" id="nomComplet" placeholder="Votre nom et prénom" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input type="email" id="email" placeholder="votre@email.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Téléphone *</label>
                <input type="tel" id="telephone" placeholder="+226 70 00 00 00" required />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message (optionnel)</label>
                <textarea id="message" rows={2} placeholder="Une question particulière ?"></textarea>
              </div>
              <div className="form-group-rgpd">
                <input type="checkbox" id="rgpd" required />
                <label htmlFor="rgpd">
                  J'accepte d'être recontacté par téléphone, email ou WhatsApp dans le cadre de ma demande d'inscription.
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
              <p>Votre inscription a bien été enregistrée.<br />Vous serez recontacté sous 24h.</p>
              <button className="btn-gold-small" style={{ marginTop: '16px', padding: '10px 20px', fontSize: '14px' }} onClick={closeInscription}>
                <i className="fas fa-times"></i> Fermer
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================ */}
      {/* SIDEBAR PROGRAMME */}
      {/* ================================================================ */}
      <div className={`sidebar-overlay ${isProgrammeOpen ? 'active' : ''}`}>
        <div className="sidebar">
          <button className="sidebar-close" onClick={closeProgramme}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">📖 PROGRAMME</span>
            <h2>{selectedFormation}</h2>
            <p>Session : <strong>{selectedSession}</strong></p>
          </div>

          <div className="programme-content">
            <p style={{ fontSize: '14px', color: 'var(--color-gray)', lineHeight: '1.6', marginBottom: '12px' }}>
              Programme détaillé disponible sur demande. Contactez-moi pour plus d'informations.
            </p>
            <div className="price-programme">
              Sur devis
              <small> HT</small>
            </div>
            <button className="btn-inscrire-programme" onClick={() => { closeProgramme(); setTimeout(() => openInscription(selectedFormation, selectedSession), 400); }}>
              <i className="fas fa-pencil-alt"></i> S'inscrire à cette formation
            </button>
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* ===== STYLES ===== */}
      {/* ================================================================ */}
      <style>{`
        :root {
          --color-navy: #06172f;
          --color-navy-light: #0e2a4f;
          --color-gold: #d4af37;
          --color-gold-light: #d6b55e;
          --color-cream: #f8f5ee;
          --color-white: #ffffff;
          --color-gray: #6c7280;
          --color-gray-light: #dde3ee;
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Inter', 'Poppins', sans-serif;
        }

        .main-container { background-color: var(--color-cream); }
        .spacer { height: 36px; background-color: var(--color-cream); }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .text-center { text-align: center; }
        .mt-12 { margin-top: 35px; }
        .text-gray { color: var(--color-gray); font-size: 14px; }

        .section-desc {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        .badge-gold {
          display: inline-block;
          background-color: rgba(255, 255, 255, 0.06);
          padding: 5px 14px;
          border-radius: 9999px;
          color: var(--color-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }

        .btn-gold {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 12px 18px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 13px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          text-decoration: none;
        }
        .btn-gold:hover { background-color: #e1bb43; }

        .btn-gold-small {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 8px 14px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 12px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          justify-content: center;
        }
        .btn-gold-small:hover { background-color: #e1bb43; }

        .btn-outline-small {
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
          gap: 5px;
          text-decoration: none;
          justify-content: center;
        }
        .btn-outline-small:hover { background-color: var(--color-navy); color: var(--color-white); }

        .btn-outline-light {
          border: 1px solid rgba(255, 255, 255, 0.4);
          color: var(--color-white);
          padding: 12px 18px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          transition: background-color 0.3s ease;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .btn-outline-light:hover { background-color: rgba(255, 255, 255, 0.08); }

        .btn-outline-gold {
          border: 1px solid rgba(214, 181, 94, 0.6);
          color: var(--color-gold-light);
          padding: 12px 18px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          transition: background-color 0.3s ease;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .btn-outline-gold:hover { background-color: rgba(214, 181, 94, 0.1); }

        .btn-outline-dark {
          border: 1px solid var(--color-navy);
          color: var(--color-navy);
          padding: 12px 18px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 13px;
          transition: background-color 0.3s ease;
          background: transparent;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
        }
        .btn-outline-dark:hover { background-color: rgba(6, 23, 47, 0.05); }

        .btn-dark {
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
        .btn-dark:hover { background-color: #0a1f3d; }

        /* ===== HERO ===== */
        .hero {
          background: linear-gradient(135deg, var(--color-navy) 0%, var(--color-navy-light) 70%, var(--color-navy) 100%);
          padding: 60px 20px 50px 20px;
          margin: 0 -20px;
        }
        .hero-container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .hero-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: start; }
        .hero-left { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
        .hero-title { font-family: var(--font-serif); font-size: 42px; font-weight: 700; color: var(--color-white); line-height: 1.02; letter-spacing: -0.035em; margin: 0; }
        .hero-subtitle { font-size: 16px; font-weight: 700; color: var(--color-gold-light); line-height: 1.4; margin: 0; }
        .hero-description { font-size: 14px; color: var(--color-gray-light); line-height: 1.65; max-width: 540px; margin: 0; }
        .hero-cta { display: flex; flex-wrap: wrap; gap: 8px; }
        .hero-right { display: flex; flex-direction: column; gap: 14px; align-items: flex-start; padding-top: 4px; }
        .mission-box { 
          border: 1px solid rgba(255, 255, 255, 0.18); 
          background-color: rgba(255, 255, 255, 0.1); 
          padding: 24px; 
          border-radius: 24px; 
          width: 100%; 
        }
        .mission-title { 
          font-family: var(--font-serif); 
          font-size: 28px; 
          font-weight: 700; 
          color: var(--color-white); 
          line-height: 1.1; 
          letter-spacing: -0.025em; 
          margin: 0; 
        }
        .mission-text { margin-top: 12px; color: var(--color-gray-light); font-size: 14px; line-height: 1.65; margin: 0; }

        /* ===== SECTIONS ===== */
        .section-cream { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-cream); }
        .section-white { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .section-header { text-align: center; margin-bottom: 30px; }
        .section-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }

        /* ===== PILIERS ===== */
        .pillars-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
        .pillar-card { background-color: var(--color-white); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 18px; padding: 20px; transition: box-shadow 0.3s ease; display: flex; flex-direction: column; gap: 10px; height: 100%; text-decoration: none; color: inherit; }
        .pillar-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .icon-gold { font-size: 24px; color: var(--color-gold); }
        .pillar-title { font-size: 17px; font-weight: 700; color: var(--color-navy); letter-spacing: -0.04em; line-height: 1.25; margin: 0; }
        .pillar-desc { color: var(--color-gray); font-size: 14px; line-height: 1.65; margin: 0; }

        /* ===== ABOUT ===== */
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
        .about-left { display: flex; flex-direction: column; gap: 16px; align-items: flex-start; }
        .about-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .about-text { color: var(--color-gray); font-size: 14px; line-height: 1.65; margin: 0; }
        .about-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .stat-card { background-color: var(--color-cream); padding: 18px; border-radius: 14px; }
        .stat-number { font-family: var(--font-serif); font-size: 32px; font-weight: 700; color: var(--color-navy); line-height: 1; }
        .stat-label { color: var(--color-gray); font-size: 12px; margin-top: 4px; }

        /* ===== SERVICES ===== */
        .services-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .service-card { background-color: var(--color-white); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 14px; padding: 16px; text-align: center; font-weight: 700; color: var(--color-navy); transition: box-shadow 0.3s ease; font-size: 13px; text-decoration: none; }
        .service-card:hover { box-shadow: 0 4px 16px rgba(6, 23, 47, 0.06); }

        /* ===== FORMATIONS ACCUEIL ===== */
        .trainings-grid-home { display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; }
        .training-card-home {
          background: var(--color-cream);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          transition: box-shadow 0.3s ease;
        }
        .training-card-home:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .training-content { display: flex; flex-direction: column; gap: 8px; }
        .training-category {
          display: inline-block;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.1);
          padding: 2px 10px;
          border-radius: 9999px;
          align-self: flex-start;
        }
        .training-title { font-size: 17px; font-weight: 700; color: var(--color-navy); line-height: 1.25; margin: 0; }
        .training-meta { display: flex; gap: 12px; font-size: 12px; color: var(--color-gray); flex-wrap: wrap; }
        .training-meta span { display: flex; align-items: center; gap: 4px; }
        .training-desc { color: var(--color-gray); font-size: 14px; line-height: 1.5; margin: 0; }
        .training-actions { display: flex; gap: 8px; margin-top: 12px; flex-wrap: wrap; }
        .training-actions .btn-outline-small,
        .training-actions .btn-gold-small {
          flex: 1;
          justify-content: center;
          min-width: 100px;
        }

        /* ===== BOOKS (AUTEUR) ===== */
        .books-grid-home { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 24px; margin-top: 12px; }
        .book-card-home {
          background: var(--color-white);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(6, 23, 47, 0.08);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        .book-card-home:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(6, 23, 47, 0.1); }
        .book-image-wrapper { position: relative; aspect-ratio: 2/3; background: var(--color-cream); overflow: hidden; cursor: pointer; }
        .book-image { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease; }
        .book-image-wrapper:hover .book-image { transform: scale(1.05); }
        .book-image-overlay {
          position: absolute; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(6, 23, 47, 0.6); display: flex; flex-direction: column;
          align-items: center; justify-content: center; gap: 8px; opacity: 0;
          transition: opacity 0.3s ease; color: white;
        }
        .book-image-wrapper:hover .book-image-overlay { opacity: 1; }
        .book-image-overlay i { font-size: 28px; }
        .book-image-overlay span { font-size: 12px; font-weight: 500; }
        .book-image-placeholder { aspect-ratio: 2/3; background: var(--color-cream); display: flex; align-items: center; justify-content: center; font-size: 48px; color: var(--color-gray-light); }
        .book-content-link { padding: 16px 18px 18px 18px; display: flex; flex-direction: column; gap: 6px; text-decoration: none; color: inherit; flex: 1; }
        .book-title { font-size: 16px; font-weight: 700; color: var(--color-navy); line-height: 1.25; margin: 0; }
        .book-desc { color: var(--color-gray); font-size: 14px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; margin: 0; flex: 1; }
        .book-link { font-size: 13px; font-weight: 600; color: var(--color-gold); display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; transition: gap 0.3s ease; }
        .book-link i { font-size: 12px; transition: transform 0.3s ease; }
        .book-content-link:hover .book-link { gap: 12px; }
        .book-content-link:hover .book-link i { transform: translateX(4px); }

        /* ===== CTA TÉMOIGNAGES ===== */
        .books-cta-wrapper { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(6, 23, 47, 0.06); }
        .books-cta-link {
          display: inline-flex; align-items: center; gap: 12px; padding: 12px 24px;
          background: var(--color-cream); border-radius: 9999px; border: 1px solid rgba(6, 23, 47, 0.08);
          color: var(--color-navy); font-size: 14px; font-weight: 600; text-decoration: none;
          transition: all 0.3s ease;
        }
        .books-cta-link:hover { background: var(--color-gold); color: var(--color-navy); border-color: var(--color-gold); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(212, 175, 55, 0.3); }
        .books-cta-link i:first-child { color: var(--color-gold); }
        .books-cta-link:hover i:first-child { color: var(--color-navy); }
        .books-cta-link i:last-child { transition: transform 0.3s ease; }
        .books-cta-link:hover i:last-child { transform: translateX(4px); }

        /* ===== LIGHTBOX ===== */
        .lightbox-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(6, 23, 47, 0.85); backdrop-filter: blur(8px); z-index: 99999;
          display: flex; align-items: center; justify-content: center; animation: fadeIn 0.3s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lightbox-content { position: relative; max-width: 90vw; max-height: 90vh; display: flex; flex-direction: column; align-items: center; }
        .lightbox-close { position: absolute; top: -48px; right: 0; background: none; border: none; color: white; font-size: 28px; cursor: pointer; transition: transform 0.3s ease; padding: 4px 8px; }
        .lightbox-close:hover { transform: scale(1.1); }
        .lightbox-image-wrapper { max-width: 90vw; max-height: 80vh; display: flex; align-items: center; justify-content: center; border-radius: 12px; overflow: hidden; background: var(--color-white); box-shadow: 0 20px 60px rgba(0,0,0,0.5); }
        .lightbox-image { max-width: 100%; max-height: 80vh; object-fit: contain; }
        .lightbox-title { color: white; font-size: 16px; font-weight: 500; margin-top: 16px; text-align: center; }

        /* ===== TÉMOIGNAGES ===== */
        .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .testimonial-card { background-color: var(--color-cream); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 16px; padding: 18px; display: flex; flex-direction: column; gap: 14px; height: 100%; }
        .testimonial-text { color: var(--color-navy); font-size: 14px; line-height: 1.65; margin: 0; }
        .testimonial-author { font-weight: 700; font-size: 14px; color: var(--color-navy); }

        /* ===== CTA FINAL ===== */
        .cta-final { background-color: var(--color-navy); padding: 50px 20px; text-align: center; margin: 0 -20px; }
        .cta-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-white); line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 12px; }
        .cta-text { color: var(--color-gray-light); font-size: 14px; max-width: 680px; margin: 0 auto 30px auto; }
        .cta-group { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }

        /* ===== SIDEBARS ===== */
        .sidebar-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          background: rgba(6, 23, 47, 0.6); backdrop-filter: blur(4px); z-index: 99999;
          opacity: 0; visibility: hidden; transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        .sidebar-overlay.active { opacity: 1; visibility: visible; }
        .sidebar {
          position: fixed; top: 0; right: 0; width: 33.33%; max-width: 480px; height: 100%;
          background: var(--color-white); box-shadow: -8px 0 40px rgba(6, 23, 47, 0.2);
          padding: 32px 28px; overflow-y: auto; transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1); z-index: 100000;
        }
        .sidebar-overlay.active .sidebar { transform: translateX(0); }
        .sidebar-close { position: absolute; top: 16px; right: 16px; background: none; border: none; font-size: 24px; color: var(--color-gray); cursor: pointer; transition: color 0.3s; padding: 4px 8px; }
        .sidebar-close:hover { color: var(--color-navy); }
        .sidebar-header { margin-top: 12px; margin-bottom: 20px; }
        .sidebar-header .sidebar-badge { display: inline-block; color: var(--color-gold); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
        .sidebar-header h2 { font-family: var(--font-serif); font-size: 26px; font-weight: 700; color: var(--color-navy); line-height: 1.2; margin-bottom: 8px; }
        .sidebar-header p { font-size: 14px; color: var(--color-gray); margin-bottom: 2px; }
        .sidebar-header p strong { color: var(--color-navy); }

        .sidebar-form { display: flex; flex-direction: column; gap: 16px; }
        .form-group { display: flex; flex-direction: column; gap: 4px; }
        .form-group label { font-size: 13px; font-weight: 600; color: var(--color-navy); }
        .form-group input, .form-group textarea {
          padding: 10px 14px; border: 1px solid rgba(6, 23, 47, 0.15); border-radius: 10px;
          font-size: 14px; font-family: var(--font-sans); transition: border-color 0.3s; background: var(--color-cream);
        }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--color-gold); background: var(--color-white); }
        .form-group textarea { resize: vertical; min-height: 60px; }
        .form-group-rgpd { display: flex; align-items: flex-start; gap: 10px; margin-top: 4px; }
        .form-group-rgpd input[type="checkbox"] { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: var(--color-gold); cursor: pointer; }
        .form-group-rgpd label { font-size: 13px; color: var(--color-gray); line-height: 1.5; cursor: pointer; }
        .form-group-rgpd label a { color: var(--color-gold); text-decoration: underline; font-weight: 600; }
        .btn-submit {
          background: var(--color-gold); color: var(--color-navy); padding: 14px 20px; border: none; border-radius: 9999px;
          font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px;
          cursor: pointer; transition: background 0.3s; margin-top: 4px; width: 100%;
        }
        .btn-submit:hover { background: #e1bb43; }
        .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }
        .form-footer { text-align: center; font-size: 13px; color: var(--color-gray); margin-top: 4px; }
        .form-success { display: none; text-align: center; padding: 30px 20px; }
        .form-success.active { display: block; }
        .form-success .success-icon { font-size: 48px; color: var(--color-gold); margin-bottom: 12px; }
        .form-success h3 { font-family: var(--font-serif); font-size: 22px; color: var(--color-navy); margin-bottom: 8px; }
        .form-success p { color: var(--color-gray); font-size: 14px; }

        .programme-content .price-programme {
          font-size: 20px; font-weight: 800; color: var(--color-navy);
          padding: 12px 0; border-top: 1px solid rgba(6, 23, 47, 0.08);
          border-bottom: 1px solid rgba(6, 23, 47, 0.08); margin: 8px 0;
        }
        .programme-content .price-programme small { font-size: 14px; font-weight: 400; color: var(--color-gray); }
        .programme-content .btn-inscrire-programme {
          background: var(--color-gold); color: var(--color-navy); padding: 12px 20px;
          border: none; border-radius: 9999px; font-weight: 700; font-size: 15px;
          cursor: pointer; transition: background 0.3s; display: inline-flex;
          align-items: center; justify-content: center; gap: 8px; width: 100%;
        }
        .programme-content .btn-inscrire-programme:hover { background: #e1bb43; }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .hero-title { font-size: 34px !important; }
          .mission-title { font-size: 42px !important; }
          .pillars-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 30px !important; }
          .services-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .trainings-grid-home { grid-template-columns: 1fr !important; gap: 12px !important; }
          .books-grid-home { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)) !important; gap: 16px !important; }
          .testimonials-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
          .spacer { height: 16px !important; }
          .sidebar { width: 45%; max-width: 400px; padding: 28px 20px; }
        }

        @media (max-width: 768px) {
          .spacer { height: 12px !important; }
          .hero { padding: 25px 16px 20px 16px !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 22px !important; }
          .hero-title { font-size: 26px !important; }
          .hero-subtitle { font-size: 14px !important; }
          .hero-description { font-size: 14px !important; }
          .hero-cta { flex-direction: column !important; width: 100% !important; }
          .hero-cta a { width: 100% !important; justify-content: center !important; font-size: 13px !important; padding: 12px 16px !important; }
          .mission-box { padding: 18px !important; }
          .mission-title { font-size: 32px !important; }
          .mission-text { font-size: 14px !important; }
          .section-cream, .section-white { padding: 35px 16px !important; }
          .section-title { font-size: 22px !important; }
          .section-desc { font-size: 14px !important; }
          .pillars-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .pillar-card { padding: 18px !important; }
          .about-grid { gap: 25px !important; }
          .about-title { font-size: 22px !important; }
          .about-stats { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .stat-number { font-size: 28px !important; }
          .services-grid { grid-template-columns: 1fr !important; gap: 10px !important; }
          .trainings-grid-home { grid-template-columns: 1fr !important; gap: 12px !important; }
          .training-card-home { padding: 16px !important; }
          .books-grid-home { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)) !important; gap: 12px !important; }
          .book-title { font-size: 14px !important; }
          .book-desc { font-size: 13px !important; }
          .book-content-link { padding: 12px 14px 14px 14px !important; }
          .testimonials-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .cta-final { padding: 35px 16px !important; }
          .cta-title { font-size: 22px !important; }
          .cta-text { font-size: 14px !important; }
          .cta-group { flex-direction: column !important; align-items: center !important; }
          .cta-group a { width: 100% !important; justify-content: center !important; font-size: 13px !important; padding: 12px 16px !important; }
          .sidebar { width: 100%; max-width: 100%; padding: 24px 16px; }
          .sidebar-header h2 { font-size: 22px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
          .books-cta-link { font-size: 13px; padding: 10px 18px; gap: 10px; }
        }

        @media (max-width: 480px) {
          .spacer { height: 10px !important; }
          .hero { padding: 20px 12px 16px 12px !important; }
          .hero-title { font-size: 22px !important; }
          .hero-subtitle { font-size: 13px !important; }
          .hero-description { font-size: 13px !important; }
          .mission-title { font-size: 24px !important; }
          .mission-text { font-size: 13px !important; }
          
          .btn-mobile {
            width: auto !important;
            max-width: 60% !important;
            justify-content: center !important;
            text-align: center !important;
            padding: 5px 10px !important;
            font-size: 8px !important;
            white-space: normal !important;
            word-break: break-word !important;
            gap: 2px !important;
            border-radius: 9999px !important;
          }
          
          .section-cream, .section-white { padding: 28px 12px !important; }
          .section-title { font-size: 20px !important; }
          .section-desc { font-size: 13px !important; }
          .about-title { font-size: 20px !important; }
          .about-stats { grid-template-columns: 1fr !important; }
          .stat-number { font-size: 26px !important; }
          .books-grid-home { grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)) !important; gap: 10px !important; }
          .book-title { font-size: 13px !important; }
          .book-desc { font-size: 12px !important; -webkit-line-clamp: 2 !important; }
          .book-link { font-size: 12px !important; }
          .book-image-overlay i { font-size: 22px !important; }
          .book-image-overlay span { font-size: 11px !important; }
          .cta-final { padding: 28px 12px !important; }
          .cta-title { font-size: 20px !important; }
          .cta-text { font-size: 13px !important; }
          .cta-group a { font-size: 12px !important; padding: 10px 14px !important; }
          .books-cta-link { font-size: 12px; padding: 8px 16px; gap: 8px; flex-wrap: wrap; justify-content: center; }
          .sidebar-header h2 { font-size: 20px; }
          .sidebar .form-group input, .sidebar .form-group textarea { font-size: 13px; padding: 8px 12px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
          .training-actions { flex-direction: column; }
          .training-actions .btn-outline-small,
          .training-actions .btn-gold-small { width: 100%; }
        }
      `}</style>
    </main>
  );
} 