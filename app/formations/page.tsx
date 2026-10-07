"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

// ============================================================
// DONNÉES DES FORMATIONS
// ============================================================
const formationsData = [
  {
    id: 1,
    titre: 'Assistance de Direction',
    description: "Maîtrisez l'organisation administrative, la communication professionnelle et les outils de coordination indispensables au fonctionnement d'une direction.",
    duree: '40h',
    prix: '180 000 FCFA',
    categorie: 'Gestion & Administration',
    disponible: true,
    icon: 'fa-user-tie',
    programme: [
      'Module 1 : Rôle et missions de l\'assistant de direction',
      'Module 2 : Gestion de l\'agenda et des déplacements',
      'Module 3 : Rédaction professionnelle et communication',
      'Module 4 : Organisation de réunions et gestion de projets',
      'Module 5 : Outils collaboratifs et communication interne'
    ],
    objectifs: [
      'Organiser l\'agenda et les déplacements d\'un dirigeant',
      'Rédiger des courriers et comptes rendus professionnels',
      'Gérer les réunions et les projets',
      'Utiliser les outils de travail collaboratif',
      'Assurer une communication interne efficace'
    ],
    prerequis: 'Maîtrise de base des outils bureautiques'
  },
  {
    id: 2,
    titre: 'Opérateur de saisie',
    description: 'Développez la rapidité, la précision et les méthodes de saisie professionnelle pour les environnements administratifs.',
    duree: '40h',
    prix: '100 000 FCFA',
    categorie: 'Bureautique',
    disponible: true,
    icon: 'fa-keyboard',
    programme: [
      'Module 1 : Techniques de frappe et positionnement',
      'Module 2 : Exercices de vitesse et précision',
      'Module 3 : Saisie de documents professionnels',
      'Module 4 : Vérification et correction des saisies',
      'Module 5 : Organisation et archivage numérique'
    ],
    objectifs: [
      'Atteindre une vitesse de frappe professionnelle',
      'Maîtriser les techniques de saisie rapide',
      'Saisir des documents avec précision',
      'Utiliser les outils de vérification orthographique',
      'Organiser et classer les documents numériques'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 3,
    titre: 'Microsoft Office Professionnel',
    description: 'Devenez autonome sur Word, Excel, PowerPoint et les usages bureautiques attendus dans les organisations modernes.',
    duree: '40h',
    prix: '150 000 FCFA',
    categorie: 'Bureautique',
    disponible: true,
    icon: 'fa-file-alt',
    programme: [
      'Module 1 : Word - Mise en page et styles avancés',
      'Module 2 : Excel - Formules et tableaux de bord',
      'Module 3 : PowerPoint - Présentations professionnelles',
      'Module 4 : Outlook - Gestion des emails et agenda',
      'Module 5 : Intégration et workflow Office 365'
    ],
    objectifs: [
      'Maîtriser les fonctionnalités avancées de Word',
      'Créer des tableaux de bord sur Excel',
      'Concevoir des présentations impactantes avec PowerPoint',
      'Optimiser sa productivité avec les outils Office',
      'Gérer ses emails et son agenda avec Outlook'
    ],
    prerequis: 'Connaissances de base des outils Office'
  },
  {
    id: 4,
    titre: 'Excel Expert',
    description: 'Analysez, automatisez et pilotez vos données avec des tableaux de bord, fonctions avancées et méthodes professionnelles.',
    duree: '35h',
    prix: '250 000 FCFA',
    categorie: 'Bureautique',
    disponible: true,
    icon: 'fa-table',
    programme: [
      'Module 1 : Les fonctions avancées et formules complexes',
      'Module 2 : Les tableaux croisés dynamiques et analyse de données',
      'Module 3 : Les graphiques avancés et visualisation',
      'Module 4 : Introduction aux macros et VBA',
      'Module 5 : Tableaux de bord interactifs'
    ],
    objectifs: [
      'Créer des tableaux de bord dynamiques',
      'Utiliser les fonctions avancées (RECHERCHEV, SI, SOMME.SI, INDEX, EQUIV)',
      'Automatiser les tâches avec les macros et VBA',
      'Analyser des données avec les tableaux croisés dynamiques',
      'Visualiser les données avec des graphiques avancés'
    ],
    prerequis: 'Maîtrise de base d\'Excel (saisie, formules simples)'
  },
  {
    id: 5,
    titre: 'Business Plan',
    description: 'Structurez un projet crédible, réaliste et présentable aux partenaires, banques, investisseurs ou institutions.',
    duree: '30h',
    prix: '200 000 FCFA',
    categorie: 'Entrepreneuriat',
    disponible: true,
    icon: 'fa-chart-line',
    programme: [
      'Module 1 : Analyse d\'idée et concept de projet',
      'Module 2 : Étude de marché et analyse concurrentielle',
      'Module 3 : Stratégie commerciale et marketing',
      'Module 4 : Prévisionnel financier et plan de financement',
      'Module 5 : Présentation et pitch'
    ],
    objectifs: [
      'Structurer une idée de projet en business plan',
      'Réaliser une étude de marché complète',
      'Élaborer un prévisionnel financier solide',
      'Présenter son projet à des investisseurs',
      'Défendre son business plan avec conviction'
    ],
    prerequis: 'Avoir une idée de projet ou une entreprise en création'
  },
  {
    id: 6,
    titre: 'Marketing Digital',
    description: 'Construisez une présence digitale efficace, développez votre visibilité et transformez vos canaux en leviers commerciaux.',
    duree: '40h',
    prix: '150 000 FCFA',
    categorie: 'Marketing & Digital',
    disponible: true,
    icon: 'fa-bullhorn',
    programme: [
      'Module 1 : Fondamentaux du marketing digital',
      'Module 2 : Stratégie de contenu et copywriting',
      'Module 3 : SEO et référencement naturel',
      'Module 4 : Publicité sur les réseaux sociaux',
      'Module 5 : Analytics et optimisation de la conversion'
    ],
    objectifs: [
      'Maîtriser les fondamentaux du marketing digital',
      'Créer une stratégie de contenu efficace',
      'Optimiser le référencement (SEO) de votre site',
      'Gérer des campagnes publicitaires sur les réseaux sociaux',
      'Analyser et optimiser vos performances digitales'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 7,
    titre: 'Sage Saari',
    description: "Maîtrisez l'outil de gestion comptable et financière pour piloter efficacement votre entreprise ou votre service.",
    duree: '35h',
    prix: '150 000 FCFA',
    categorie: 'Gestion & Administration',
    disponible: true,
    icon: 'fa-calculator',
    programme: [
      'Module 1 : Prise en main et configuration de Sage Saari',
      'Module 2 : Comptabilité générale et saisie des écritures',
      'Module 3 : Gestion des clients et fournisseurs',
      'Module 4 : Établissement des états financiers',
      'Module 5 : Gestion de trésorerie et pilotage'
    ],
    objectifs: [
      'Configurer Sage Saari pour votre entreprise',
      'Gérer la comptabilité générale et analytique',
      'Établir des états financiers (bilan, compte de résultat)',
      'Piloter la trésorerie et les flux financiers',
      'Suivre les factures clients et fournisseurs'
    ],
    prerequis: 'Connaissances de base en comptabilité'
  },
  {
    id: 8,
    titre: 'Perfecto',
    description: 'Optimisez la gestion des données et des processus avec Perfecto, un outil puissant pour les professionnels.',
    duree: '25h',
    prix: '150 000 FCFA',
    categorie: 'Outils spécialisés',
    disponible: true,
    icon: 'fa-check-circle',
    programme: [
      'Module 1 : Prise en main de Perfecto',
      'Module 2 : Gestion des données',
      'Module 3 : Configuration et paramétrage',
      'Module 4 : Automatisation des tâches',
      'Module 5 : Rapports et analyses'
    ],
    objectifs: [
      'Maîtriser l\'interface de Perfecto',
      'Gérer les données et les processus',
      'Configurer Perfecto pour son activité',
      'Automatiser les tâches répétitives',
      'Générer des rapports et des analyses'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 9,
    titre: 'KoboToolbox',
    description: 'Apprenez à collecter, analyser et visualiser des données terrain avec KoboToolbox, un outil de référence pour les enquêtes et études.',
    duree: '25h',
    prix: '150 000 FCFA',
    categorie: 'Outils spécialisés',
    disponible: true,
    icon: 'fa-database',
    programme: [
      'Module 1 : Prise en main de KoboToolbox',
      'Module 2 : Création de formulaires d\'enquête',
      'Module 3 : Collecte de données terrain (offline)',
      'Module 4 : Analyse et visualisation des données',
      'Module 5 : Export et reporting'
    ],
    objectifs: [
      'Créer des formulaires d\'enquête avec KoboToolbox',
      'Collecter des données sur le terrain (offline)',
      'Analyser les données collectées',
      'Visualiser les résultats avec des graphiques',
      'Exporter les données pour des rapports'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 10,
    titre: 'Graphisme',
    description: 'Créez des visuels professionnels avec les outils de graphisme et développez votre identité visuelle.',
    duree: '40h',
    prix: '250 000 FCFA',
    categorie: 'Outils spécialisés',
    disponible: true,
    icon: 'fa-paint-brush',
    programme: [
      'Module 1 : Introduction au graphisme et aux outils',
      'Module 2 : Photoshop - Retouche et création d\'images',
      'Module 3 : Illustrator - Création de logos et illustrations',
      'Module 4 : Création de supports de communication',
      'Module 5 : Optimisation pour le web et les réseaux sociaux'
    ],
    objectifs: [
      'Maîtriser les logiciels de graphisme (Photoshop, Illustrator)',
      'Créer des visuels pour le web et l\'impression',
      'Concevoir une identité visuelle (logo, charte)',
      'Réaliser des supports de communication',
      'Optimiser ses visuels pour les réseaux sociaux'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 11,
    titre: 'DAO (Dessin Assisté par Ordinateur)',
    description: 'Maîtrisez les bases du dessin assisté par ordinateur pour la création de plans et de schémas techniques.',
    duree: '35h',
    prix: '230 000 FCFA',
    categorie: 'Outils spécialisés',
    disponible: true,
    icon: 'fa-drafting-compass',
    programme: [
      'Module 1 : Introduction à la DAO',
      'Module 2 : Interface et outils de base',
      'Module 3 : Création de plans 2D',
      'Module 4 : Outils de modification et de mise en cote',
      'Module 5 : Préparation à l\'impression'
    ],
    objectifs: [
      'Maîtriser l\'interface d\'un logiciel de DAO',
      'Créer des plans 2D précis',
      'Utiliser les outils de dessin et de modification',
      'Mettre en cote et annoter les plans',
      'Préparer les plans pour l\'impression'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 12,
    titre: 'Infographie',
    description: 'Apprenez à concevoir des infographies percutantes pour vos communications et vos présentations.',
    duree: '35h',
    prix: '125 000 FCFA',
    categorie: 'Outils spécialisés',
    disponible: true,
    icon: 'fa-vector-square',
    programme: [
      'Module 1 : Principes de l\'infographie',
      'Module 2 : Choix des graphiques et visualisation',
      'Module 3 : Conception d\'infographies avec Canva',
      'Module 4 : Création de présentations visuelles',
      'Module 5 : Intégration dans les communications'
    ],
    objectifs: [
      'Maîtriser les principes de l\'infographie',
      'Concevoir des infographies avec les outils adaptés',
      'Choisir les bons graphiques pour ses données',
      'Créer des présentations visuelles impactantes',
      'Intégrer les infographies dans ses communications'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 13,
    titre: 'Entrepreneuriat',
    description: "De l'idée au lancement : structurez votre projet, validez votre marché et pilotez votre entreprise avec méthode.",
    duree: '40h',
    prix: '250 000 FCFA',
    categorie: 'Entrepreneuriat',
    disponible: true,
    icon: 'fa-rocket',
    programme: [
      'Niveau 1 : L\'idée et le concept',
      'Niveau 2 : L\'étude de marché',
      'Niveau 3 : Le business model',
      'Niveau 4 : Aspects juridiques et fiscaux',
      'Niveau 5 : Pilotage et croissance'
    ],
    objectifs: [
      'Valider son idée d\'entreprise',
      'Comprendre son marché et ses clients',
      'Construire un business model solide',
      'Maîtriser les aspects juridiques et fiscaux',
      'Piloter la croissance de son entreprise'
    ],
    prerequis: 'Avoir une idée de projet ou être en création d\'entreprise'
  },
  {
    id: 14,
    titre: 'Intelligence Artificielle',
    description: "Initiez-vous aux enjeux et aux usages pratiques de l'IA pour votre métier ou votre entreprise. Formations disponibles dès maintenant.",
    duree: '30h',
    prix: 'À partir de 75 000 FCFA',
    categorie: 'Intelligence Artificielle',
    disponible: true,
    icon: 'fa-robot',
    programme: [
      'Niveau 1 : Qu\'est-ce que l\'IA ?',
      'Niveau 2 : Applications concrètes de l\'IA',
      'Niveau 3 : Utilisation des outils d\'IA (ChatGPT, etc.)',
      'Niveau 4 : Intégration de l\'IA en entreprise',
      'Niveau 5 : L\'IA et l\'avenir des métiers'
    ],
    objectifs: [
      'Comprendre les fondamentaux de l\'IA',
      'Identifier les applications de l\'IA dans son métier',
      'Utiliser les outils d\'IA (ChatGPT, etc.)',
      'Intégrer l\'IA dans ses processus',
      'Anticiper l\'impact de l\'IA sur son activité'
    ],
    prerequis: 'Aucun prérequis spécifique'
  },
  {
    id: 15,
    titre: 'GBSA PARTNERS avec interweave SOLUTION',
    description: "Certificat Master of Business in The Street. De l'entrepreneuriat au pitch final, structurez votre projet et développez votre entreprise.",
    duree: '6 semaines',
    prix: '120 000 FCFA',
    categorie: 'Entrepreneuriat',
    disponible: true,
    icon: 'fa-briefcase',
    programme: [
      'Module 1 : Entrepreneuriat et innovation',
      'Module 2 : Business model et stratégie',
      'Module 3 : Marketing et développement commercial',
      'Module 4 : Financement et levée de fonds',
      'Module 5 : Pitch final et présentation'
    ],
    objectifs: [
      'Structurer un projet entrepreneurial',
      'Développer son réseau professionnel',
      'Préparer un pitch convaincant',
      'Accéder à des opportunités de financement',
      'Intégrer un écosystème entrepreneurial'
    ],
    prerequis: 'Avoir un projet entrepreneurial ou une entreprise'
  }
];

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function FormationsPage() {
  const WHATSAPP_NUMBER = '22667739734';
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyscbtJ9-7CxGQHp2yKNOIbDm2Hg0U7ofeXF2P9-BrW9kUD63hD3slJdYhtGzHKzNA/exec';

  // ===== STATE =====
  const [selectedFormation, setSelectedFormation] = useState<any>(null);
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);
  const [isEnglishDevisOpen, setIsEnglishDevisOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [devisType, setDevisType] = useState<'formation' | 'english'>('formation');

  // ===== GESTION DES SIDEBARS =====
  useEffect(() => {
    if (isProgrammeOpen || isInscriptionOpen || isEnglishDevisOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isProgrammeOpen, isInscriptionOpen, isEnglishDevisOpen]);

  const openProgramme = (formation: any) => {
    setSelectedFormation(formation);
    setIsProgrammeOpen(true);
  };

  const closeProgramme = () => {
    setIsProgrammeOpen(false);
    setSelectedFormation(null);
  };

  const openInscription = (formation: any) => {
    setSelectedFormation(formation);
    setDevisType('formation');
    setIsInscriptionOpen(true);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const closeInscription = () => {
    setIsInscriptionOpen(false);
    setSelectedFormation(null);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const openEnglishDevis = () => {
    setDevisType('english');
    setIsEnglishDevisOpen(true);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const closeEnglishDevis = () => {
    setIsEnglishDevisOpen(false);
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  // ===== SOUMISSION DU FORMULAIRE =====
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
      alert('Veuillez accepter d\'être recontacté pour valider votre demande.');
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
👤 *Format :* ${message.includes('individuel') ? 'Individuel' : 'Groupe'}

👤 *Nom complet :* ${nom}
📧 *Email :* ${email}
📞 *Téléphone :* ${telephone}
${message ? `💬 *Message :* ${message}` : ''}
✅ *RGPD :* Accepté

Merci de me faire parvenir votre devis.`;
    } else {
      service = selectedFormation?.titre || 'Formation';
      whatsappMessage = `Bonjour Aubin Romain,

Je souhaite m'inscrire à la formation :

📚 *Formation :* ${selectedFormation?.titre || 'Formation'}
⏱️ *Durée :* ${selectedFormation?.duree || 'À définir'}
💰 *Prix :* ${selectedFormation?.prix || 'Sur devis'}

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
      if (devisType === 'english') {
        closeEnglishDevis();
      } else {
        closeInscription();
      }
    }, 5000);
  };

  // ============================================================
  // RENDU
  // ============================================================
  return (
    <main className="formations-container">

      <div className="spacer-formations"></div>

      {/* ===== HERO ===== */}
      <section className="hero-formations">
        <div className="hero-formations-container">
          <div className="hero-formations-content">
            <span className="badge-gold">FORMATIONS</span>
            <h1 className="hero-formations-title">Des compétences concrètes, immédiatement applicables</h1>
            <p className="hero-formations-subtitle">15 formations professionnelles, en présentiel ou en ligne, avec certificat</p>
            <p className="hero-formations-description">
              Que vous soyez entrepreneur, professionnel ou étudiant, chaque formation est conçue pour vous apporter des compétences utilisables dès le lendemain.
            </p>
          </div>
          <div className="hero-formations-right">
            <span className="badge-gold">NOTRE APPROCHE</span>
            <div className="mission-box-formations">
              <h2 className="mission-formations-title">Former pour transformer</h2>
              <p className="mission-formations-text">Chaque programme est construit autour de cas concrets, d'exercices pratiques et d'un suivi personnalisé. L'objectif : maîtriser les compétences clés de votre métier ou de votre projet.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-formations"></div>

      {/* ===== FORMATIONS ===== */}
      <section className="section-formations">
        <div className="container-formations">
          <div className="section-header-formations">
            <span className="badge-gold">CATÉGORIES</span>
            <h2 className="section-title-formations">Choisissez votre domaine</h2>
            <p className="section-subtitle-formations">Des formations adaptées à vos besoins et à votre niveau.</p>
          </div>

          <div className="categories">
            <span className="category-tag">Toutes</span>
            <span className="category-tag">Bureautique</span>
            <span className="category-tag">Gestion &amp; Administration</span>
            <span className="category-tag">Marketing &amp; Digital</span>
            <span className="category-tag">Entrepreneuriat</span>
            <span className="category-tag">Outils spécialisés</span>
            <span className="category-tag">Intelligence Artificielle</span>
          </div>

          <div className="trainings-grid">
            {formationsData.map((formation) => (
              <div key={formation.id} className="training-card">
                <div className="icon"><i className={`fas ${formation.icon}`}></i></div>
                <h3>{formation.titre}</h3>
                <div className="meta">
                  <span><i className="far fa-clock"></i> {formation.duree}</span>
                  <span><i className="fas fa-tag"></i> {formation.prix}</span>
                </div>
                <p>{formation.description}</p>
                <div className="card-actions">
                  <button onClick={() => openProgramme(formation)} className="btn-outline-small">
                    <i className="fas fa-book"></i> En savoir plus
                  </button>
                  <button onClick={() => openInscription(formation)} className="btn-gold-small">
                    <i className="fas fa-pencil-alt"></i> S'inscrire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="spacer-formations"></div>

      {/* ===== FORMATION EN ANGLAIS ===== */}
      <section className="section-english">
        <div className="container-formations">
          <div className="english-training-box">
            <div className="icon"><i className="fas fa-globe"></i></div>
            <h2>English Training Programs</h2>
            <p className="subtitle">Des formations en anglais animées par des coachs experts</p>
            <p>
              Des programmes de formation en anglais, en individuel ou en groupe, pour renforcer vos compétences professionnelles dans la langue internationale des affaires.
            </p>
            <div className="english-options">
              <div className="english-option">
                <div className="option-icon"><i className="fas fa-user"></i></div>
                <h4>Individuel</h4>
                <p>Accompagnement sur mesure</p>
              </div>
              <div className="english-option">
                <div className="option-icon"><i className="fas fa-users"></i></div>
                <h4>Groupe</h4>
                <p>Session collective en ligne</p>
              </div>
            </div>
            <button onClick={openEnglishDevis} className="btn-primary-english">
              <i className="fas fa-paper-plane"></i> Demander un devis
            </button>
          </div>
        </div>
      </section>

      <div className="spacer-formations"></div>

      {/* ===== BÉNÉFICES ===== */}
      <section className="section-benefits">
        <div className="container-formations">
          <div className="section-header-formations">
            <span className="badge-gold">POURQUOI NOUS CHOISIR</span>
            <h2 className="section-title-formations">Une formation qui fait la différence</h2>
            <p className="section-subtitle-formations">Des atouts concrets pour vous accompagner vers la réussite.</p>
          </div>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="icon"><i className="fas fa-certificate"></i></div>
              <h4>Formateur certifié</h4>
              <p>20+ années d'expérience terrain au service de votre progression.</p>
            </div>
            <div className="benefit-card">
              <div className="icon"><i className="fas fa-tools"></i></div>
              <h4>Approche pratique</h4>
              <p>Des exercices concrets, des cas réels et des résultats immédiatement applicables.</p>
            </div>
            <div className="benefit-card">
              <div className="icon"><i className="fas fa-award"></i></div>
              <h4>Certificat de fin</h4>
              <p>Une reconnaissance de vos compétences pour valoriser votre parcours.</p>
            </div>
            <div className="benefit-card">
              <div className="icon"><i className="fas fa-headset"></i></div>
              <h4>Accompagnement post-formation</h4>
              <p>Un suivi personnalisé pour vous aider à mettre en pratique vos acquis.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-formations"></div>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final-formations">
        <div className="container-cta-formations">
          <h2 className="cta-title-formations">Une formation vous intéresse ?</h2>
          <p className="cta-text-formations">Contactez-moi pour connaître les prochaines sessions, les tarifs ou pour une formation sur mesure.</p>
          <div className="cta-group-formations">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-gold-cta-formations">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-formations"></div>

      {/* ================================================================
      SIDEBAR PROGRAMME
      ================================================================ */}
      <div className={`sidebar-overlay ${isProgrammeOpen ? 'active' : ''}`}>
        <div className="sidebar">
          <button className="sidebar-close" onClick={closeProgramme}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">📖 PROGRAMME</span>
            <h2>{selectedFormation?.titre || 'Formation'}</h2>
            <p><strong>Durée :</strong> {selectedFormation?.duree || 'À définir'}</p>
            <p><strong>Prix :</strong> {selectedFormation?.prix || 'Sur devis'}</p>
          </div>

          {selectedFormation && (
            <div className="programme-content">
              <p style={{ fontSize: '14px', color: 'var(--color-gray)', lineHeight: '1.6', marginBottom: '12px' }}>
                {selectedFormation.description}
              </p>

              <div className="info-grid">
                <div className="info-item"><strong>📅 Durée</strong>{selectedFormation.duree}</div>
                <div className="info-item"><strong>🏷️ Prix</strong>{selectedFormation.prix}</div>
                <div className="info-item"><strong>📋 Prérequis</strong>{selectedFormation.prerequis || 'Aucun'}</div>
                <div className="info-item"><strong>📂 Catégorie</strong>{selectedFormation.categorie}</div>
              </div>

              <div className="section-title"><i className="fas fa-bullseye"></i> Objectifs</div>
              <ul>
                {selectedFormation.objectifs?.map((obj: string, i: number) => (
                  <li key={i}>{obj}</li>
                ))}
              </ul>

              <div className="section-title"><i className="fas fa-list-ul"></i> Programme</div>
              <ul>
                {selectedFormation.programme?.map((mod: string, i: number) => (
                  <li key={i}>{mod}</li>
                ))}
              </ul>

              <div className="price-programme">
                {selectedFormation.prix}
                <small> HT</small>
              </div>

              <button className="btn-inscrire-programme" onClick={() => { closeProgramme(); setTimeout(() => openInscription(selectedFormation), 400); }}>
                <i className="fas fa-pencil-alt"></i> S'inscrire à cette formation
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================================================================
      SIDEBAR INSCRIPTION (Formations)
      ================================================================ */}
      <div className={`sidebar-overlay ${isInscriptionOpen ? 'active' : ''}`}>
        <div className="sidebar">
          <button className="sidebar-close" onClick={closeInscription}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">📝 INSCRIPTION</span>
            <h2>Réservez votre place</h2>
            <p>Formation : <strong>{selectedFormation?.titre || 'Formation'}</strong></p>
            <p>Durée : <strong>{selectedFormation?.duree || 'À définir'}</strong></p>
            <p>Prix : <strong>{selectedFormation?.prix || 'Sur devis'}</strong></p>
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

      {/* ================================================================
      SIDEBAR ENGLISH DEVIS
      ================================================================ */}
      <div className={`sidebar-overlay ${isEnglishDevisOpen ? 'active' : ''}`}>
        <div className="sidebar">
          <button className="sidebar-close" onClick={closeEnglishDevis}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">🌍 DEVIS</span>
            <h2>English Training Programs</h2>
            <p>Demandez un devis pour une formation en anglais</p>
            <p>Formats : <strong>Individuel</strong> ou <strong>Groupe</strong></p>
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
                <label htmlFor="message">Votre besoin (optionnel)</label>
                <textarea id="message" rows={2} placeholder="Précisez le format souhaité (individuel/groupe) ou vos besoins spécifiques..."></textarea>
              </div>
              <div className="form-group-rgpd">
                <input type="checkbox" id="rgpd" required />
                <label htmlFor="rgpd">
                  J'accepte d'être recontacté par téléphone, email ou WhatsApp dans le cadre de ma demande de devis.
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
              <button className="btn-gold-small" style={{ marginTop: '16px', padding: '10px 20px', fontSize: '14px' }} onClick={closeEnglishDevis}>
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

        .formations-container { background-color: var(--color-cream); }
        .spacer-formations { height: 36px; background-color: var(--color-cream); }

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

        /* ===== HERO ===== */
        .hero-formations {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-formations-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-formations-content { display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%; }
        .hero-formations-title { font-family: var(--font-serif); font-size: 38px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .hero-formations-subtitle { font-size: 16px; font-weight: 700; color: var(--color-navy); line-height: 1.4; opacity: 0.8; margin: 0; }
        .hero-formations-description { font-size: 14px; color: var(--color-gray); line-height: 1.65; max-width: 700px; margin: 0; }
        .hero-formations-right { display: flex; flex-direction: column; gap: 14px; align-items: center; width: 100%; }
        .mission-box-formations {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-formations-title { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .mission-formations-text { margin-top: 12px; color: var(--color-gray); font-size: 14px; line-height: 1.65; margin: 0; }

        /* ===== SECTIONS ===== */
        .section-formations { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .section-benefits { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-cream); }
        .section-english { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .container-formations { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-header-formations { text-align: center; margin-bottom: 30px; }
        .section-title-formations { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; margin: 0; }
        .section-subtitle-formations { color: var(--color-gray); font-size: 14px; max-width: 760px; margin: 8px auto 0 auto; }

        /* ===== CATEGORIES ===== */
        .categories { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 30px; }
        .category-tag {
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
        .category-tag:hover { background-color: var(--color-gold); color: var(--color-navy); border-color: var(--color-gold); }

        /* ===== GRILLE FORMATIONS ===== */
        .trainings-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .training-card {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          height: 100%;
          transition: box-shadow 0.3s ease;
        }
        .training-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .training-card .icon { font-size: 24px; color: var(--color-gold); }
        .training-card h3 { font-size: 17px; font-weight: 700; color: var(--color-navy); line-height: 1.25; margin: 0; }
        .training-card .meta { display: flex; gap: 12px; font-size: 12px; color: var(--color-gray); flex-wrap: wrap; }
        .training-card .meta span { display: flex; align-items: center; gap: 4px; }
        .training-card p { color: var(--color-gray); font-size: 14px; line-height: 1.5; flex-grow: 1; margin: 0; }
        .training-card .card-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .training-card .card-actions .btn-gold-small, .training-card .card-actions .btn-outline-small { flex: 1; justify-content: center; min-width: 100px; }

        /* ===== BOUTONS ===== */
        .btn-gold-small {
          background-color: var(--color-gold); color: var(--color-navy); padding: 8px 14px; border-radius: 9999px;
          font-weight: 800; font-size: 12px; transition: background-color 0.3s ease; border: none; cursor: pointer;
          display: inline-flex; align-items: center; gap: 5px; text-decoration: none;
        }
        .btn-gold-small:hover { background-color: #e1bb43; }
        .btn-outline-small {
          border: 1px solid rgba(6, 23, 47, 0.25); color: var(--color-navy); padding: 8px 14px; border-radius: 9999px;
          font-weight: 700; font-size: 12px; transition: background-color 0.3s ease, color 0.3s ease;
          background: transparent; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; text-decoration: none;
        }
        .btn-outline-small:hover { background-color: var(--color-navy); color: var(--color-white); }
        .btn-primary-english {
          background-color: var(--color-gold); color: var(--color-navy); padding: 12px 24px; border-radius: 9999px;
          font-weight: 800; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;
          transition: background-color 0.3s ease; border: none; cursor: pointer; text-decoration: none;
        }
        .btn-primary-english:hover { background-color: #e1bb43; }
        .btn-gold-cta-formations {
          background-color: var(--color-gold); color: var(--color-navy); padding: 12px 24px; border-radius: 9999px;
          font-weight: 800; font-size: 14px; display: inline-flex; align-items: center; gap: 8px;
          transition: background-color 0.3s ease; border: none; cursor: pointer; text-decoration: none;
        }
        .btn-gold-cta-formations:hover { background-color: #e1bb43; }

        /* ===== ENGLISH ===== */
        .english-training-box {
          background-color: var(--color-white); border: 2px solid var(--color-gold); border-radius: 20px;
          padding: 40px; text-align: center; max-width: 900px; margin: 0 auto;
        }
        .english-training-box .icon { font-size: 40px; color: var(--color-gold); margin-bottom: 12px; }
        .english-training-box h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); margin-bottom: 10px; }
        .english-training-box .subtitle { font-size: 16px; color: var(--color-gray); font-weight: 600; margin-bottom: 12px; }
        .english-training-box p { color: var(--color-gray); font-size: 14px; line-height: 1.6; max-width: 700px; margin: 0 auto 20px auto; }
        .english-options { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-bottom: 20px; }
        .english-option { background-color: var(--color-cream); border-radius: 16px; padding: 16px 24px; border: 1px solid rgba(6, 23, 47, 0.08); min-width: 140px; }
        .english-option .option-icon { font-size: 24px; color: var(--color-gold); }
        .english-option h4 { font-weight: 700; color: var(--color-navy); margin-top: 4px; font-size: 14px; margin-bottom: 0; }
        .english-option p { font-size: 12px; color: var(--color-gray); margin: 0; }

        /* ===== BENEFITS ===== */
        .benefits-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .benefit-card { background-color: var(--color-white); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 16px; padding: 20px; text-align: center; transition: box-shadow 0.3s ease; }
        .benefit-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .benefit-card .icon { font-size: 28px; color: var(--color-gold); margin-bottom: 10px; }
        .benefit-card h4 { font-size: 15px; font-weight: 700; color: var(--color-navy); margin-bottom: 4px; }
        .benefit-card p { font-size: 13px; color: var(--color-gray); line-height: 1.5; margin: 0; }

        /* ===== CTA ===== */
        .cta-final-formations { background-color: var(--color-navy); padding: 50px 20px; text-align: center; margin: 0 -20px; }
        .container-cta-formations { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-formations { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-white); line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 12px; }
        .cta-text-formations { color: var(--color-gray-light); font-size: 14px; max-width: 680px; margin: 0 auto 30px auto; }
        .cta-group-formations { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }

        /* ================================================================ */
        /* ===== SIDEBARS ===== */
        /* ================================================================ */
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

        /* ===== PROGRAMME SIDEBAR ===== */
        .programme-content { display: flex; flex-direction: column; gap: 16px; }
        .programme-content .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; background: var(--color-cream); padding: 16px; border-radius: 12px; }
        .programme-content .info-grid .info-item { font-size: 13px; color: var(--color-gray); }
        .programme-content .info-grid .info-item strong { color: var(--color-navy); display: block; }
        .programme-content .section-title { font-weight: 700; font-size: 15px; color: var(--color-navy); margin-top: 8px; margin-bottom: 4px; }
        .programme-content .section-title i { color: var(--color-gold); margin-right: 6px; }
        .programme-content ul { list-style: none; padding-left: 0; }
        .programme-content ul li { font-size: 14px; color: var(--color-gray); padding: 4px 0 4px 24px; position: relative; line-height: 1.5; }
        .programme-content ul li::before { content: "▸"; color: var(--color-gold); position: absolute; left: 0; font-weight: 700; }
        .programme-content .price-programme { font-size: 20px; font-weight: 800; color: var(--color-navy); padding: 12px 0; border-top: 1px solid rgba(6, 23, 47, 0.08); border-bottom: 1px solid rgba(6, 23, 47, 0.08); margin: 8px 0; }
        .programme-content .price-programme small { font-size: 14px; font-weight: 400; color: var(--color-gray); }
        .programme-content .btn-inscrire-programme {
          background: var(--color-gold); color: var(--color-navy); padding: 12px 20px; border: none; border-radius: 9999px;
          font-weight: 700; font-size: 15px; cursor: pointer; transition: background 0.3s;
          display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%;
        }
        .programme-content .btn-inscrire-programme:hover { background: #e1bb43; }
        .programme-content .btn-inscrire-programme i { font-size: 18px; }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-formations-title { font-size: 32px !important; }
          .mission-formations-title { font-size: 24px !important; }
          .trainings-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
          .spacer-formations { height: 16px !important; }
          .sidebar { width: 45%; max-width: 400px; padding: 28px 20px; }
        }

        @media (max-width: 768px) {
          .spacer-formations { height: 12px !important; }

          .hero-formations { padding: 30px 16px 25px 16px !important; }
          .hero-formations-container { gap: 22px !important; }
          .hero-formations-title { font-size: 26px !important; }
          .hero-formations-subtitle { font-size: 14px !important; }
          .hero-formations-description { font-size: 14px !important; }
          .mission-box-formations { padding: 18px !important; }
          .mission-formations-title { font-size: 22px !important; }
          .mission-formations-text { font-size: 14px !important; }

          .section-formations, .section-benefits, .section-english { padding: 35px 16px !important; }
          .section-title-formations { font-size: 22px !important; }
          .section-subtitle-formations { font-size: 14px !important; }

          .trainings-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .training-card { padding: 16px !important; }
          .training-card h3 { font-size: 16px !important; }
          .training-card p { font-size: 14px !important; }
          .training-card .card-actions { flex-direction: column !important; }
          .training-card .card-actions .btn-gold-small, .training-card .card-actions .btn-outline-small {
            flex: 1 !important; justify-content: center !important; min-width: unset !important; width: 100% !important;
          }

          .benefits-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
          .benefit-card { padding: 16px !important; }

          .categories { gap: 6px !important; }
          .category-tag { font-size: 11px !important; padding: 4px 12px !important; }

          .english-training-box { padding: 24px 16px !important; }
          .english-training-box h2 { font-size: 22px !important; }
          .english-training-box .subtitle { font-size: 14px !important; }
          .english-options { flex-direction: column !important; align-items: center !important; }

          .cta-final-formations { padding: 35px 16px !important; }
          .cta-title-formations { font-size: 22px !important; }
          .cta-text-formations { font-size: 14px !important; }
          .btn-gold-cta-formations, .btn-primary-english {
            width: 100% !important; justify-content: center !important; font-size: 13px !important; padding: 12px 16px !important;
          }

          .sidebar { width: 100%; max-width: 100%; padding: 24px 16px; }
          .sidebar-header h2 { font-size: 22px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
        }

        @media (max-width: 480px) {
          .spacer-formations { height: 10px !important; }

          .hero-formations { padding: 20px 12px 16px 12px !important; }
          .hero-formations-title { font-size: 22px !important; }
          .hero-formations-subtitle { font-size: 13px !important; }
          .hero-formations-description { font-size: 13px !important; }
          .mission-formations-title { font-size: 19px !important; }
          .mission-formations-text { font-size: 13px !important; }

          .section-formations, .section-benefits, .section-english { padding: 28px 12px !important; }
          .section-title-formations { font-size: 20px !important; }
          .section-subtitle-formations { font-size: 13px !important; }

          .training-card h3 { font-size: 15px !important; }
          .training-card p { font-size: 13px !important; }
          .training-card .card-actions .btn-gold-small, .training-card .card-actions .btn-outline-small {
            font-size: 11px !important; padding: 8px 12px !important;
          }

          .benefit-card h4 { font-size: 14px !important; }
          .benefit-card p { font-size: 12px !important; }

          .english-training-box h2 { font-size: 19px !important; }
          .english-training-box p { font-size: 13px !important; }

          .cta-final-formations { padding: 28px 12px !important; }
          .cta-title-formations { font-size: 20px !important; }
          .cta-text-formations { font-size: 13px !important; }
          .btn-gold-cta-formations, .btn-primary-english { font-size: 12px !important; padding: 10px 14px !important; }

          .sidebar-header h2 { font-size: 20px; }
          .sidebar .form-group input, .sidebar .form-group textarea { font-size: 13px; padding: 8px 12px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
        }
      `}</style>
    </main>
  );
}