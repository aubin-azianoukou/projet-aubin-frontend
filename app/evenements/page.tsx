"use client";

import { useState, useEffect } from 'react';

export default function EvenementsPage() {
  // ===== STATE =====
  const [isInscriptionOpen, setIsInscriptionOpen] = useState(false);
  const [isProgrammeOpen, setIsProgrammeOpen] = useState(false);
  const [selectedFormation, setSelectedFormation] = useState('');
  const [selectedSession, setSelectedSession] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // ===== CONSTANTES =====
  const WHATSAPP_NUMBER = '22667739734';
  const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyscbtJ9-7CxGQHp2yKNOIbDm2Hg0U7ofeXF2P9-BrW9kUD63hD3slJdYhtGzHKzNA/exec';

  // ============================================================
  // DATES DES SESSIONS
  // ============================================================
  function getCurrentSession() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDay = 1;
    const endDay = 5;
    const startDate = new Date(year, month, startDay);
    const endDate = new Date(year, month, endDay);
    if (endDate.getMonth() !== month) {
      endDate.setMonth(month + 1);
      endDate.setDate(endDay - (endDate.getDate() - 1));
    }
    const mois = ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
    return {
      start: startDay,
      end: endDate.getDate(),
      month: mois[endDate.getMonth()],
      year: endDate.getFullYear(),
      display: `${startDay} – ${endDate.getDate()} ${mois[endDate.getMonth()]} ${endDate.getFullYear()}`
    };
  }

  // ============================================================
  // DONNÉES DES FORMATIONS
  // ============================================================
  const formations = [
    { id: 'excel-expert', nom: 'Excel Expert', categorie: '📊 Bureautique', badge: 'ouvert', prix: '250 000 FCFA', particulier: '', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '3 / 12', urgent: true },
    { id: 'marketing-digital', nom: 'Marketing Digital', categorie: '📱 Marketing & Digital', badge: 'ouvert', prix: '150 000 FCFA', particulier: '', lieu: '💻 En ligne', horaire: '14h – 17h (5 jours)', places: '5 / 15', urgent: true },
    { id: 'business-plan', nom: 'Business Plan', categorie: '🚀 Entrepreneuriat', badge: 'ouvert', prix: '200 000 FCFA', particulier: '', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '8 / 12', urgent: false },
    { id: 'sage-saari', nom: 'Sage Saari', categorie: '📊 Gestion & Administration', badge: 'ouvert', prix: '150 000 FCFA', particulier: '', lieu: '💻 En ligne', horaire: '14h – 17h (5 jours)', places: '10 / 15', urgent: false },
    { id: 'microsoft-office', nom: 'Microsoft Office Professionnel', categorie: '📊 Bureautique', badge: 'ouvert', prix: '300 000 FCFA', particulier: '', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '4 / 12', urgent: true },
    { id: 'kobotoolbox', nom: 'KoboToolbox', categorie: '📊 Outils spécialisés', badge: 'bientot', prix: '100 000 FCFA', particulier: '', lieu: '💻 En ligne', horaire: '14h – 17h (5 jours)', places: '12 / 15', urgent: false },
    { id: 'graphisme', nom: 'Graphisme', categorie: '🎨 Marketing & Digital', badge: 'ouvert', prix: '200 000 FCFA', particulier: '', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '6 / 12', urgent: false },
    { id: 'assistance-direction', nom: 'Assistance de Direction', categorie: '📊 Gestion & Administration', badge: 'complet', prix: '180 000 FCFA', particulier: 'Nuit: 250 000 FCFA', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '0 / 12', urgent: false, complet: true },
    { id: 'operateur-saisie', nom: 'Opérateur de saisie', categorie: '📊 Bureautique', badge: 'ouvert', prix: '80 000 FCFA', particulier: 'Nuit: 100 000 FCFA', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '7 / 12', urgent: false },
    { id: 'dao', nom: 'DAO (Dessin Assisté par Ordinateur)', categorie: '📊 Outils spécialisés', badge: 'ouvert', prix: '230 000 FCFA', particulier: '', lieu: '💻 En ligne', horaire: '14h – 17h (5 jours)', places: '9 / 15', urgent: false },
    { id: 'infographie', nom: 'Infographie', categorie: '🎨 Marketing & Digital', badge: 'ouvert', prix: '200 000 FCFA', particulier: '', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '5 / 12', urgent: false },
    { id: 'entrepreneuriat', nom: 'Entrepreneuriat', categorie: '🚀 Entrepreneuriat', badge: 'ouvert', prix: '250 000 FCFA', particulier: '5 niveaux à 50 000 FCFA', lieu: '📍 Ouagadougou', horaire: '9h – 12h (5 jours)', places: '3 / 12', urgent: true },
    { id: 'perfecto', nom: 'Perfecto', categorie: '📊 Gestion & Administration', badge: 'bientot', prix: '150 000 FCFA', particulier: '', lieu: '💻 En ligne', horaire: '14h – 17h (5 jours)', places: '12 / 15', urgent: false },
    { id: 'ia', nom: 'Intelligence Artificielle', categorie: '🤖 Intelligence Artificielle', badge: 'bientot', prix: '280 000 FCFA', particulier: '5 niveaux à 60 000 FCFA', lieu: '📍 Ouagadougou', horaire: 'À définir', places: 'À venir', urgent: false },
    { id: 'gbsa', nom: 'GBSA PARTNERS avec interweave SOLUTION', categorie: '🚀 Entrepreneuriat', badge: 'ouvert', prix: 'Sur devis', particulier: 'indicatif 120 000 FCFA', lieu: '📍 Abidjan / Ouaga', horaire: '6 semaines', places: 'Sur devis', urgent: false }
  ];

  // ============================================================
  // DONNÉES DES PROGRAMMES
  // ============================================================
  const programmesData: Record<string, any> = {
    "Excel Expert": {
      description: "Maîtrisez les fonctionnalités avancées d'Excel pour analyser, automatiser et piloter vos données avec des tableaux de bord professionnels.",
      objectifs: ["Créer des tableaux de bord dynamiques", "Utiliser les fonctions avancées (RECHERCHEV, SI, SOMME.SI, INDEX, EQUIV)", "Automatiser les tâches avec les macros et VBA", "Analyser des données avec les tableaux croisés dynamiques", "Visualiser les données avec des graphiques avancés"],
      programme: ["Module 1 : Les fonctions avancées et formules complexes", "Module 2 : Les tableaux croisés dynamiques et analyse de données", "Module 3 : Les graphiques avancés et visualisation", "Module 4 : Introduction aux macros et VBA", "Module 5 : Tableaux de bord interactifs"],
      prerequis: "Maîtrise de base d'Excel (saisie, formules simples)", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "250 000 FCFA"
    },
    "Marketing Digital": {
      description: "Construisez une présence digitale efficace, développez votre visibilité et transformez vos canaux en leviers commerciaux.",
      objectifs: ["Maîtriser les fondamentaux du marketing digital", "Créer une stratégie de contenu efficace", "Optimiser le référencement (SEO) de votre site", "Gérer des campagnes publicitaires sur les réseaux sociaux", "Analyser et optimiser vos performances digitales"],
      programme: ["Module 1 : Fondamentaux du marketing digital", "Module 2 : Stratégie de contenu et copywriting", "Module 3 : SEO et référencement naturel", "Module 4 : Publicité sur les réseaux sociaux", "Module 5 : Analytics et optimisation de la conversion"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "En ligne", prix: "150 000 FCFA"
    },
    "Business Plan": {
      description: "Structurez un projet crédible, réaliste et présentable aux partenaires, banques, investisseurs ou institutions.",
      objectifs: ["Structurer une idée de projet en business plan", "Réaliser une étude de marché complète", "Élaborer un prévisionnel financier solide", "Présenter son projet à des investisseurs", "Défendre son business plan avec conviction"],
      programme: ["Module 1 : Analyse d'idée et concept de projet", "Module 2 : Étude de marché et analyse concurrentielle", "Module 3 : Stratégie commerciale et marketing", "Module 4 : Prévisionnel financier et plan de financement", "Module 5 : Présentation et pitch"],
      prerequis: "Avoir une idée de projet ou une entreprise en création", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "200 000 FCFA"
    },
    "Sage Saari": {
      description: "Maîtrisez l'outil de gestion comptable et financière pour piloter efficacement votre entreprise ou votre service.",
      objectifs: ["Configurer Sage Saari pour votre entreprise", "Gérer la comptabilité générale et analytique", "Établir des états financiers (bilan, compte de résultat)", "Piloter la trésorerie et les flux financiers", "Suivre les factures clients et fournisseurs"],
      programme: ["Module 1 : Prise en main et configuration de Sage Saari", "Module 2 : Comptabilité générale et saisie des écritures", "Module 3 : Gestion des clients et fournisseurs", "Module 4 : Établissement des états financiers", "Module 5 : Gestion de trésorerie et pilotage"],
      prerequis: "Connaissances de base en comptabilité", duree: "5 jours (35 heures)", format: "En ligne", prix: "150 000 FCFA"
    },
    "Microsoft Office Professionnel": {
      description: "Devenez autonome sur Word, Excel, PowerPoint et les usages bureautiques attendus dans les organisations modernes.",
      objectifs: ["Maîtriser les fonctionnalités avancées de Word", "Créer des tableaux de bord sur Excel", "Concevoir des présentations impactantes avec PowerPoint", "Optimiser sa productivité avec les outils Office", "Gérer ses emails et son agenda avec Outlook"],
      programme: ["Module 1 : Word - Mise en page et styles avancés", "Module 2 : Excel - Formules et tableaux de bord", "Module 3 : PowerPoint - Présentations professionnelles", "Module 4 : Outlook - Gestion des emails et agenda", "Module 5 : Intégration et workflow Office 365"],
      prerequis: "Connaissances de base des outils Office", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "300 000 FCFA"
    },
    "KoboToolbox": {
      description: "Apprenez à collecter, analyser et visualiser des données terrain avec KoboToolbox, un outil de référence pour les enquêtes et études.",
      objectifs: ["Créer des formulaires d'enquête avec KoboToolbox", "Collecter des données sur le terrain (offline)", "Analyser les données collectées", "Visualiser les résultats avec des graphiques", "Exporter les données pour des rapports"],
      programme: ["Module 1 : Prise en main de KoboToolbox", "Module 2 : Création de formulaires d'enquête", "Module 3 : Collecte de données terrain (offline)", "Module 4 : Analyse et visualisation des données", "Module 5 : Export et reporting"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "En ligne", prix: "100 000 FCFA"
    },
    "Graphisme": {
      description: "Créez des visuels professionnels avec les outils de graphisme et développez votre identité visuelle.",
      objectifs: ["Maîtriser les logiciels de graphisme (Photoshop, Illustrator)", "Créer des visuels pour le web et l'impression", "Concevoir une identité visuelle (logo, charte)", "Réaliser des supports de communication", "Optimiser ses visuels pour les réseaux sociaux"],
      programme: ["Module 1 : Introduction au graphisme et aux outils", "Module 2 : Photoshop - Retouche et création d'images", "Module 3 : Illustrator - Création de logos et illustrations", "Module 4 : Création de supports de communication", "Module 5 : Optimisation pour le web et les réseaux sociaux"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "200 000 FCFA"
    },
    "Assistance de Direction": {
      description: "Maîtrisez l'organisation administrative, la communication professionnelle et les outils de coordination indispensables au fonctionnement d'une direction.",
      objectifs: ["Organiser l'agenda et les déplacements d'un dirigeant", "Rédiger des courriers et comptes rendus professionnels", "Gérer les réunions et les projets", "Utiliser les outils de travail collaboratif", "Assurer une communication interne efficace"],
      programme: ["Module 1 : Rôle et missions de l'assistant de direction", "Module 2 : Gestion de l'agenda et des déplacements", "Module 3 : Rédaction professionnelle et communication", "Module 4 : Organisation de réunions et gestion de projets", "Module 5 : Outils collaboratifs et communication interne"],
      prerequis: "Maîtrise de base des outils bureautiques", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "180 000 FCFA (Nuit: 250 000 FCFA)"
    },
    "Opérateur de saisie": {
      description: "Développez la rapidité, la précision et les méthodes de saisie professionnelle pour les environnements administratifs.",
      objectifs: ["Atteindre une vitesse de frappe professionnelle", "Maîtriser les techniques de saisie rapide", "Saisir des documents avec précision", "Utiliser les outils de vérification orthographique", "Organiser et classer les documents numériques"],
      programme: ["Module 1 : Techniques de frappe et positionnement", "Module 2 : Exercices de vitesse et précision", "Module 3 : Saisie de documents professionnels", "Module 4 : Vérification et correction des saisies", "Module 5 : Organisation et archivage numérique"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "80 000 FCFA (Nuit: 100 000 FCFA)"
    },
    "DAO (Dessin Assisté par Ordinateur)": {
      description: "Maîtrisez les bases du dessin assisté par ordinateur pour la création de plans et de schémas techniques.",
      objectifs: ["Maîtriser l'interface d'un logiciel de DAO", "Créer des plans 2D précis", "Utiliser les outils de dessin et de modification", "Mettre en cote et annoter les plans", "Préparer les plans pour l'impression"],
      programme: ["Module 1 : Introduction à la DAO", "Module 2 : Interface et outils de base", "Module 3 : Création de plans 2D", "Module 4 : Outils de modification et de mise en cote", "Module 5 : Préparation à l'impression"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "En ligne", prix: "230 000 FCFA"
    },
    "Infographie": {
      description: "Apprenez à concevoir des infographies percutantes pour vos communications et vos présentations.",
      objectifs: ["Maîtriser les principes de l'infographie", "Concevoir des infographies avec les outils adaptés", "Choisir les bons graphiques pour ses données", "Créer des présentations visuelles impactantes", "Intégrer les infographies dans ses communications"],
      programme: ["Module 1 : Principes de l'infographie", "Module 2 : Choix des graphiques et visualisation", "Module 3 : Conception d'infographies avec Canva", "Module 4 : Création de présentations visuelles", "Module 5 : Intégration dans les communications"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "Présentiel à Ouagadougou", prix: "200 000 FCFA"
    },
    "Entrepreneuriat": {
      description: "De l'idée au lancement : structurez votre projet, validez votre marché et pilotez votre entreprise avec méthode.",
      objectifs: ["Valider son idée d'entreprise", "Comprendre son marché et ses clients", "Construire un business model solide", "Maîtriser les aspects juridiques et fiscaux", "Piloter la croissance de son entreprise"],
      programme: ["Niveau 1 : L'idée et le concept", "Niveau 2 : L'étude de marché", "Niveau 3 : Le business model", "Niveau 4 : Aspects juridiques et fiscaux", "Niveau 5 : Pilotage et croissance"],
      prerequis: "Avoir une idée de projet ou être en création d'entreprise", duree: "5 niveaux de 5 jours chacun", format: "Présentiel à Ouagadougou", prix: "250 000 FCFA (5 niveaux à 50 000 FCFA)"
    },
    "Perfecto": {
      description: "Optimisez la gestion des données et des processus avec Perfecto, un outil puissant pour les professionnels.",
      objectifs: ["Maîtriser l'interface de Perfecto", "Gérer les données et les processus", "Configurer Perfecto pour son activité", "Automatiser les tâches répétitives", "Générer des rapports et des analyses"],
      programme: ["Module 1 : Prise en main de Perfecto", "Module 2 : Gestion des données", "Module 3 : Configuration et paramétrage", "Module 4 : Automatisation des tâches", "Module 5 : Rapports et analyses"],
      prerequis: "Aucun prérequis spécifique", duree: "5 jours (35 heures)", format: "En ligne", prix: "150 000 FCFA"
    },
    "Intelligence Artificielle": {
      description: "Initiez-vous aux enjeux et aux usages pratiques de l'IA pour votre métier ou votre entreprise.",
      objectifs: ["Comprendre les fondamentaux de l'IA", "Identifier les applications de l'IA dans son métier", "Utiliser les outils d'IA (ChatGPT, etc.)", "Intégrer l'IA dans ses processus", "Anticiper l'impact de l'IA sur son activité"],
      programme: ["Niveau 1 : Qu'est-ce que l'IA ?", "Niveau 2 : Applications concrètes de l'IA", "Niveau 3 : Utilisation des outils d'IA", "Niveau 4 : Intégration de l'IA en entreprise", "Niveau 5 : L'IA et l'avenir des métiers"],
      prerequis: "Aucun prérequis spécifique", duree: "5 niveaux de 5 jours chacun", format: "Présentiel à Ouagadougou", prix: "280 000 FCFA (5 niveaux à 60 000 FCFA)"
    },
    "GBSA PARTNERS avec interweave SOLUTION": {
      description: "Certificat Master of Business in The Street. De l'entrepreneuriat au pitch final, structurez votre projet et développez votre entreprise.",
      objectifs: ["Structurer un projet entrepreneurial", "Développer son réseau professionnel", "Préparer un pitch convaincant", "Accéder à des opportunités de financement", "Intégrer un écosystème entrepreneurial"],
      programme: ["Module 1 : Entrepreneuriat et innovation", "Module 2 : Business model et stratégie", "Module 3 : Marketing et développement commercial", "Module 4 : Financement et levée de fonds", "Module 5 : Pitch final et présentation"],
      prerequis: "Avoir un projet entrepreneurial ou une entreprise", duree: "6 semaines", format: "Présentiel à Abidjan ou Ouagadougou", prix: "Sur devis (indicatif 120 000 FCFA)"
    }
  };

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

    const whatsappMessage = `Bonjour Aubin Romain,

Je souhaite m'inscrire à la formation :

📚 *Formation :* ${selectedFormation}
📅 *Session :* ${selectedSession}

👤 *Nom complet :* ${nom}
📧 *Email :* ${email}
📞 *Téléphone :* ${telephone}
${message ? `💬 *Message :* ${message}` : ''}
✅ *RGPD :* Accepté

Merci de me confirmer ma place.`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    try {
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom, email, telephone, formation: selectedFormation, session: selectedSession, message,
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
  // RENDU DES CARTES
  // ============================================================
  const session = getCurrentSession();

  const renderCards = () => {
    return formations.map((formation) => {
      let badgeClass = formation.badge;
      let badgeText = formation.badge === 'ouvert' ? 'Ouvert' : formation.badge === 'complet' ? 'Complet' : 'Bientôt';

      let placesHtml = '';
      if (formation.complet) {
        placesHtml = `<i className="fas fa-users"></i> Places disponibles : <span style="font-weight:800;color:var(--color-gray);">0 / 12</span>`;
      } else if (formation.places === 'À venir' || formation.places === 'Sur devis') {
        placesHtml = `<i className="fas fa-users"></i> Places disponibles : <span>${formation.places}</span>`;
      } else {
        placesHtml = `<i className="fas fa-users"></i> Places disponibles : <span className="${formation.urgent ? 'urgent' : ''}">${formation.places}</span>`;
      }

      let priceHtml = formation.prix;
      if (formation.particulier) {
        priceHtml += ` <span style="font-size:11px;color:var(--color-gold);">(${formation.particulier})</span>`;
      }

      let actionsHtml = '';
      if (formation.complet) {
        actionsHtml = `
          <button class="btn-outline-small btn-programme" data-formation="${formation.nom}" data-session="${session.display}">
            <i className="fas fa-book"></i> Voir le programme
          </button>
          <button class="btn-outline-small" style="border-color:var(--color-gold);color:var(--color-gold);" data-formation="${formation.nom}" data-session="${session.display} (Liste d'attente)" onClick="window.openInscriptionFromProgramme('${formation.nom}', '${session.display}')">
            <i className="fas fa-bell"></i> Liste d'attente
          </button>
        `;
      } else {
        actionsHtml = `
          <button class="btn-outline-small btn-programme" data-formation="${formation.nom}" data-session="${session.display}">
            <i className="fas fa-book"></i> Voir le programme
          </button>
          <button class="btn-inscrire-small" data-formation="${formation.nom}" data-session="${session.display}" onClick={() => openInscription(formation.nom, session.display)}>
            <i className="fas fa-pencil-alt"></i> S'inscrire
          </button>
        `;
      }

      return (
        <div key={formation.id} className="event-card">
          <span className={`event-badge ${badgeClass}`}>{badgeText}</span>
          <span className="event-category">{formation.categorie}</span>
          <h3>{formation.nom}</h3>
          <div className="meta">
            <span><i className="far fa-calendar-alt"></i> {session.display}</span>
            <span><i className="far fa-clock"></i> {formation.horaire}</span>
            <span><i className="fas fa-map-marker-alt"></i> {formation.lieu}</span>
          </div>
          <div className="places" dangerouslySetInnerHTML={{ __html: placesHtml }} />
          <div className="price" dangerouslySetInnerHTML={{ __html: priceHtml }} />
          <div className="card-actions">
            <button className="btn-outline-small btn-programme" onClick={() => openProgramme(formation.nom, session.display)}>
              <i className="fas fa-book"></i> Voir le programme
            </button>
            <button className="btn-inscrire-small" onClick={() => openInscription(formation.nom, session.display)}>
              <i className="fas fa-pencil-alt"></i> S'inscrire
            </button>
          </div>
        </div>
      );
    });
  };

  // ============================================================
  // RENDU DU PROGRAMME
  // ============================================================
  const renderProgramme = () => {
    const data = programmesData[selectedFormation];
    if (!data) {
      return <p>Programme détaillé disponible sur demande.</p>;
    }

    return (
      <>
        <p style={{ fontSize: '14px', color: 'var(--color-gray)', lineHeight: '1.6', marginBottom: '12px' }}>{data.description}</p>

        <div className="info-grid">
          <div className="info-item"><strong>📅 Durée</strong>{data.duree}</div>
          <div className="info-item"><strong>📍 Format</strong>{data.format}</div>
          <div className="info-item"><strong>📋 Prérequis</strong>{data.prerequis}</div>
          <div className="info-item"><strong>🏷️ Prix</strong>{data.prix}</div>
        </div>

        <div className="section-title"><i className="fas fa-bullseye"></i> Objectifs</div>
        <ul>
          {data.objectifs.map((obj: string, i: number) => <li key={i}>{obj}</li>)}
        </ul>

        <div className="section-title"><i className="fas fa-list-ul"></i> Programme</div>
        <ul>
          {data.programme.map((mod: string, i: number) => <li key={i}>{mod}</li>)}
        </ul>

        <div className="price-programme">
          {data.prix}
          <small> HT</small>
        </div>

        <button className="btn-inscrire-programme" onClick={() => { closeProgramme(); setTimeout(() => openInscription(selectedFormation, selectedSession), 400); }}>
          <i className="fas fa-pencil-alt"></i> S'inscrire à cette formation
        </button>
      </>
    );
  };

  // ============================================================
  // RENDU
  // ============================================================
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <div className="left">
            <span className="badge">📅 ÉVÉNEMENTS</span>
            <h1>Prochaines sessions de formation</h1>
            <p className="subtitle">Des places limitées pour un accompagnement sur mesure</p>
            <p className="description">
              Consultez le calendrier des prochaines formations à Ouagadougou et en ligne.
              Chaque session est conçue pour vous apporter des compétences utilisables dès le lendemain.
            </p>
          </div>
          <div className="right">
            <span className="badge">📈 STATISTIQUES</span>
            <div className="mission-box">
              <h2>Déjà 127 participants formés cette année</h2>
              <p>
                Nos formations affichent un taux de satisfaction de <strong>92%</strong>.
                Rejoignez les entrepreneurs, professionnels et étudiants qui ont choisi
                de progresser avec une méthode concrète et un suivi personnalisé.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== ÉVÉNEMENTS ===== */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <span className="badge">FILTRER</span>
            <h2>Choisissez votre session</h2>
            <p>Retrouvez toutes nos formations à venir, classées par catégorie.</p>
          </div>

          <div className="filters">
            <span className="filter-tag">Toutes <span className="count">15</span></span>
            <span className="filter-tag">Bureautique <span className="count">4</span></span>
            <span className="filter-tag">Gestion &amp; Administration <span className="count">4</span></span>
            <span className="filter-tag">Marketing &amp; Digital <span className="count">3</span></span>
            <span className="filter-tag">Entrepreneuriat <span className="count">3</span></span>
            <span className="filter-tag">Intelligence Artificielle <span className="count">1</span></span>
          </div>

          <div className="events-grid">
            {renderCards()}
          </div>

          {/* ===== STATS ===== */}
          <div className="stats-banner">
            <div className="stat-item">
              <div className="number">20+</div>
              <div className="label">années d'expérience</div>
            </div>
            <div className="stat-item">
              <div className="number">5000+</div>
              <div className="label">personnes formées</div>
            </div>
            <div className="stat-item">
              <div className="number">+100</div>
              <div className="label">jeunes formés au CIDJ</div>
            </div>
            <div className="stat-item">
              <div className="number">95%</div>
              <div className="label">taux de placement CV</div>
              <span className="badge-success">⭐ clients satisfaits</span>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== RÉFÉRENCES (AVEC ATTESTATIONS AJOUTÉES) ===== */}
      <section className="references-section">
        <div className="container">
          <div className="section-header">
            <span className="badge">RÉFÉRENCES</span>
            <h2>Ils m'ont fait confiance</h2>
            <p>Des institutions et organisations qui ont accompagné mon parcours.</p>
          </div>

          <div className="references-grid">
            {/* === NOUVELLES ATTESTATIONS === */}
            <div className="reference-card attestation-card">
              <div className="icon"><i className="fas fa-building"></i></div>
              <div className="ref-title">🔹 Chambre de Commerce du Burkina Faso</div>
              <div className="ref-desc">Attestation de bonne fin d'exécution - Forum AFRICALLIA 2014</div>
              <div className="attestation-detail">
                <i className="fas fa-info-circle"></i>
                <span>Sensibilisation, communication, organisation des chefs d'entreprise du Bénin</span>
              </div>
              <div className="attestation-date">
                <i className="fas fa-calendar-alt"></i>
                <span>02 mai 2014</span>
              </div>
              <div className="attestation-seal">
                <i className="fas fa-check-circle"></i>
                <span>Attestation officielle</span>
              </div>
            </div>

            <div className="reference-card attestation-card">
              <div className="icon"><i className="fas fa-graduation-cap"></i></div>
              <div className="ref-title">🔹 Ministère de l'Enseignement Secondaire du Bénin</div>
              <div className="ref-desc">Attestation de bonne exécution - CFCE Adjahonmè 2014</div>
              <div className="attestation-detail">
                <i className="fas fa-info-circle"></i>
                <span>Expert formateur en Marketing et communication pour les CFCE</span>
              </div>
              <div className="attestation-date">
                <i className="fas fa-calendar-alt"></i>
                <span>21-27 mai 2014</span>
              </div>
              <div className="attestation-seal">
                <i className="fas fa-check-circle"></i>
                <span>Attestation officielle</span>
              </div>
            </div>

            <div className="reference-card attestation-card">
              <div className="icon"><i className="fas fa-graduation-cap"></i></div>
              <div className="ref-title">🔹 Ministère de l'Enseignement Secondaire du Bénin</div>
              <div className="ref-desc">Attestation de bonne exécution - CFCE Banikoara 2015</div>
              <div className="attestation-detail">
                <i className="fas fa-info-circle"></i>
                <span>Expert formateur en Marketing et communication pour les CFCE</span>
              </div>
              <div className="attestation-date">
                <i className="fas fa-calendar-alt"></i>
                <span>24-29 mai 2015</span>
              </div>
              <div className="attestation-seal">
                <i className="fas fa-check-circle"></i>
                <span>Attestation officielle</span>
              </div>
            </div>

            {/* === ANCIENNES RÉFÉRENCES === */}
            <div className="reference-card">
              <div className="icon"><i className="fas fa-flag-usa"></i></div>
              <div className="ref-title">Ambassade des États-Unis</div>
              <div className="ref-desc">100 exemplaires du Déclic achetés pour des programmes d'entrepreneuriat au Bénin</div>
            </div>
            <div className="reference-card">
              <div className="icon"><i className="fas fa-university"></i></div>
              <div className="ref-title">UNESCO / OCD — Liptako-Gourma</div>
              <div className="ref-desc">Formation à Ouagadougou, novembre 2022</div>
            </div>
            <div className="reference-card">
              <div className="icon"><i className="fas fa-users"></i></div>
              <div className="ref-title">International Youth Fellowship (IYF)</div>
              <div className="ref-desc">Plusieurs formations animées dans les camps nationaux des jeunes au Bénin</div>
            </div>
            <div className="reference-card">
              <div className="icon"><i className="fas fa-church"></i></div>
              <div className="ref-title">Mission Évangélique de la Foi</div>
              <div className="ref-desc">Section Bénin — accompagnement et formations pour les communautés</div>
            </div>
            <div className="reference-card">
              <div className="icon"><i className="fas fa-graduation-cap"></i></div>
              <div className="ref-title">Universités du Bénin</div>
              <div className="ref-desc">Tournées dans les universités publiques et privées pour des conférences</div>
            </div>
            <div className="reference-card">
              <div className="icon"><i className="fas fa-globe-africa"></i></div>
              <div className="ref-title">Afrique de l'Ouest</div>
              <div className="ref-desc">Interventions au Bénin, Burkina Faso, Togo et dans plusieurs pays de la région</div>
            </div>
            <div className="reference-card">
              <div className="icon"><i className="fas fa-lightbulb"></i></div>
              <div className="ref-title">CIDJ — Centre d'Innovation et de Développement de la Jeunesse</div>
              <div className="ref-desc">Formation des jeunes en 2021 et 2022</div>
            </div>
            <div className="reference-card" style={{ border: '2px dashed var(--color-gold)', backgroundColor: 'rgba(212, 175, 55, 0.05)' }}>
              <div className="icon"><i className="fas fa-plus-circle"></i></div>
              <div className="ref-title">Et bien d'autres encore...</div>
              <div className="ref-desc">Des dizaines d'entreprises, institutions et organisations m'ont fait confiance à travers la sous-région.</div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== CLOSING ===== */}
      <section className="closing-section">
        <div className="container">
          <div className="urgency-badge">⚠️ PLACES LIMITÉES — PROCHAINES SESSIONS DANS 2 SEMAINES</div>
          <h2>Chaque mois, une session démarre.</h2>
          <h2 style={{ fontSize: '22px', marginTop: '-4px', color: 'var(--color-gold)' }}>Ne remettez pas à demain votre progression.</h2>
          <p>
            Les places sont limitées à <strong>12 participants</strong> pour garantir un accompagnement personnalisé.
            Une fois la session complète, il faudra attendre <strong>le mois suivant</strong>.
          </p>
          <div className="closing-ctas">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C%20je%20souhaite%20m%27inscrire%20%C3%A0%20une%20formation%20pour%20cette%20session.`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '16px', padding: '14px 28px' }}>
              <i className="fab fa-whatsapp"></i> Réserver ma place maintenant
            </a>
            <a href="/formations" className="btn-secondary-outline dark" style={{ fontSize: '16px', padding: '14px 28px', borderColor: 'var(--color-navy)', color: 'var(--color-navy)' }}>
              <i className="fas fa-list"></i> Voir toutes les formations
            </a>
          </div>
          <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-gray)' }}>
            📞 Réponse sous 24h maximum — Inscription confirmée par WhatsApp
          </p>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final">
        <div className="container">
          <h2>Vous ne trouvez pas votre formation ?</h2>
          <p>Besoin d'une formation sur mesure, en intra-entreprise ou à une date spécifique ? Je vous accompagne.</p>
          <div className="cta-group">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=Bonjour%2C%20je%20souhaite%20un%20devis%20pour%20une%20formation%20sur%20mesure.`} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ fontSize: '15px', padding: '12px 24px' }}>
              <i className="fab fa-whatsapp"></i> Demander un devis personnalisé
            </a>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ================================================================
      SIDEBAR INSCRIPTION
      ================================================================ */}
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
            <h2>{selectedFormation}</h2>
            <p>Session : <strong>{selectedSession}</strong></p>
          </div>

          <div className="programme-content">
            {renderProgramme()}
          </div>
        </div>
      </div>

      {/* ================================================================ */}
      {/* ===== STYLES ===== */}
      {/* ================================================================ */}
      <style>{`
        /* ===== VARIABLES ===== */
        :root {
          --color-navy: #06172f;
          --color-gold: #d4af37;
          --color-cream: #f8f5ee;
          --color-white: #ffffff;
          --color-gray: #6c7280;
          --color-gray-light: #dde3ee;
          --color-green: #28a745;
          --font-serif: 'Playfair Display', serif;
          --font-sans: 'Inter', 'Poppins', sans-serif;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-spacer { height: 36px; background: var(--color-cream); }

        /* ===== HERO ===== */
        .hero { background: var(--color-white); padding: 50px 0 40px 0; }
        .hero .container { display: flex; flex-direction: column; align-items: center; gap: 30px; max-width: 900px; text-align: center; }
        .hero .left { display: flex; flex-direction: column; gap: 16px; align-items: center; width: 100%; }
        .hero .badge {
          display: inline-flex; align-items: center; gap: 6px; background: rgba(6, 23, 47, 0.06);
          padding: 5px 14px; border-radius: 9999px; color: var(--color-gold); font-size: 10px;
          font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
        }
        .hero h1 { font-family: var(--font-serif); font-size: 38px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; }
        .hero .subtitle { font-size: 16px; font-weight: 700; color: var(--color-navy); opacity: 0.8; max-width: 700px; }
        .hero .description { font-size: 14px; color: var(--color-gray); max-width: 700px; }
        .hero .right { display: flex; flex-direction: column; gap: 14px; align-items: center; width: 100%; }
        .hero .mission-box {
          border: 1px solid rgba(6, 23, 47, 0.12); background: var(--color-cream); padding: 24px;
          border-radius: 20px; width: 100%; max-width: 800px; box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06); text-align: center;
        }
        .hero .mission-box h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; }
        .hero .mission-box p { margin-top: 12px; color: var(--color-gray); font-size: 14px; line-height: 1.65; }

        /* ===== SECTION ===== */
        .section { padding: 50px 0; }
        .section-white { background: var(--color-white); }
        .section-header { text-align: center; margin-bottom: 30px; }
        .section-header .badge { display: inline-block; color: var(--color-gold); font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 6px; }
        .section-header h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); line-height: 1.1; letter-spacing: -0.025em; }
        .section-header p { color: var(--color-gray); font-size: 14px; max-width: 760px; margin: 0 auto; }

        /* ===== FILTRES ===== */
        .filters { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; margin-bottom: 30px; }
        .filter-tag { background: var(--color-white); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 9999px; padding: 6px 16px; font-size: 12px; font-weight: 600; color: var(--color-navy); transition: all 0.3s; cursor: default; }
        .filter-tag:hover { background: var(--color-gold); color: var(--color-navy); border-color: var(--color-gold); }
        .filter-tag .count { background: rgba(6, 23, 47, 0.08); border-radius: 9999px; padding: 0 8px; font-size: 10px; margin-left: 4px; }

        /* ===== EVENT CARDS ===== */
        .events-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
        .event-card {
          background: var(--color-white); border: 1px solid rgba(6, 23, 47, 0.1); border-radius: 16px;
          padding: 20px; transition: box-shadow 0.3s ease; display: flex; flex-direction: column;
          gap: 10px; height: 100%; position: relative;
        }
        .event-card:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .event-card .event-badge { position: absolute; top: 12px; right: 12px; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 3px 12px; border-radius: 9999px; }
        .event-card .event-badge.ouvert { background: var(--color-gold); color: var(--color-navy); }
        .event-card .event-badge.complet { background: var(--color-gray); color: var(--color-white); }
        .event-card .event-badge.bientot { background: #d6b55e; color: var(--color-navy); }
        .event-card .event-category { display: inline-block; font-size: 11px; font-weight: 600; color: var(--color-gold); letter-spacing: 0.04em; margin-bottom: 2px; }
        .event-card h3 { font-size: 18px; font-weight: 700; color: var(--color-navy); line-height: 1.2; margin-right: 60px; }
        .event-card .meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: 13px; color: var(--color-gray); }
        .event-card .meta span { display: flex; align-items: center; gap: 5px; }
        .event-card .meta i { color: var(--color-gold); width: 16px; }
        .event-card .places { font-size: 13px; font-weight: 600; color: var(--color-navy); }
        .event-card .places .urgent { color: #b8860b; font-weight: 800; }
        .event-card .price { font-size: 18px; font-weight: 800; color: var(--color-navy); }
        .event-card .price small { font-size: 13px; font-weight: 400; color: var(--color-gray); }
        .event-card .card-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 4px; }
        .event-card .card-actions .btn-inscrire-small, .event-card .card-actions .btn-outline-small { flex: 1; justify-content: center; min-width: 120px; }

        /* ===== BUTTONS ===== */
        .btn-primary {
          background: var(--color-gold); color: var(--color-navy); padding: 12px 18px; border-radius: 9999px;
          font-weight: 700; display: inline-flex; align-items: center; gap: 6px; transition: background 0.3s;
          border: none; cursor: pointer; font-size: 13px;
        }
        .btn-primary:hover { background: #e1bb43; }
        .btn-secondary-outline { border: 1px solid rgba(214, 181, 94, 0.6); color: #d6b55e; padding: 12px 18px; border-radius: 9999px; font-weight: 700; font-size: 13px; transition: all 0.3s; background: transparent; cursor: pointer; display: inline-flex; align-items: center; gap: 6px; }
        .btn-secondary-outline:hover { background: rgba(214, 181, 94, 0.1); }
        .btn-secondary-outline.dark { border-color: var(--color-navy); color: var(--color-navy); }
        .btn-secondary-outline.dark:hover { background: var(--color-navy); color: var(--color-white); }
        .btn-outline-small {
          border: 1px solid rgba(6, 23, 47, 0.25); color: var(--color-navy); padding: 8px 14px; border-radius: 9999px;
          font-weight: 700; font-size: 12px; transition: all 0.3s; background: transparent; cursor: pointer;
          display: inline-flex; align-items: center; gap: 5px; justify-content: center;
        }
        .btn-outline-small:hover { background: var(--color-navy); color: var(--color-white); }
        .btn-inscrire-small {
          background: var(--color-gold); color: var(--color-navy); padding: 8px 14px; border-radius: 9999px;
          font-weight: 700; font-size: 12px; transition: background 0.3s; border: none; cursor: pointer;
          display: inline-flex; align-items: center; gap: 5px; justify-content: center;
        }
        .btn-inscrire-small:hover { background: #e1bb43; }
        .btn-gold-small { background: var(--color-gold); color: var(--color-navy); padding: 8px 14px; border-radius: 9999px; font-weight: 700; font-size: 12px; transition: background 0.3s; border: none; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; }
        .btn-gold-small:hover { background: #e1bb43; }

        /* ===== STATS ===== */
        .stats-banner {
          background: var(--color-navy); border-radius: 20px; padding: 30px 20px;
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; text-align: center;
          color: var(--color-white); margin-top: 30px;
        }
        .stats-banner .stat-item .number { font-family: var(--font-serif); font-size: 32px; font-weight: 700; color: var(--color-gold); }
        .stats-banner .stat-item .label { font-size: 13px; color: var(--color-gray-light); opacity: 0.8; }
        .stats-banner .stat-item .badge-success { display: inline-block; font-size: 10px; font-weight: 700; color: var(--color-green); letter-spacing: 0.04em; margin-top: 2px; }

        /* ===== REFERENCES (AVEC ATTESTATIONS) ===== */
        .references-section { background: var(--color-white); padding: 40px 0; border-top: 1px solid rgba(6, 23, 47, 0.06); border-bottom: 1px solid rgba(6, 23, 47, 0.06); }
        .references-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }

        .reference-card { background: var(--color-cream); border-radius: 14px; padding: 18px 16px; border: 1px solid rgba(6, 23, 47, 0.06); text-align: center; transition: box-shadow 0.3s; }
        .reference-card:hover { box-shadow: 0 4px 16px rgba(6, 23, 47, 0.06); }
        .reference-card .icon { font-size: 28px; color: var(--color-gold); margin-bottom: 6px; }
        .reference-card .ref-title { font-weight: 700; font-size: 14px; color: var(--color-navy); margin-bottom: 2px; }
        .reference-card .ref-desc { font-size: 12px; color: var(--color-gray); line-height: 1.5; }

        /* === STYLES POUR LES ATTESTATIONS === */
        .reference-card.attestation-card {
          border: 2px solid var(--color-gold);
          background: #fdfaf0;
          position: relative;
          padding-bottom: 14px;
        }
        .reference-card.attestation-card .ref-title {
          color: var(--color-navy);
          font-size: 13px;
        }
        .reference-card.attestation-card .ref-desc {
          font-size: 11px;
          font-weight: 600;
          color: var(--color-navy);
          margin-bottom: 6px;
        }
        .attestation-detail {
          display: flex;
          align-items: flex-start;
          gap: 6px;
          font-size: 11px;
          color: var(--color-gray);
          text-align: left;
          line-height: 1.4;
          padding: 6px 8px;
          background: var(--color-white);
          border-radius: 6px;
          border-left: 2px solid var(--color-gold);
          margin: 4px 0;
        }
        .attestation-detail i {
          color: var(--color-gold);
          margin-top: 1px;
          flex-shrink: 0;
          font-size: 12px;
        }
        .attestation-date {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          font-size: 11px;
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
          gap: 4px;
          font-size: 10px;
          color: #28a745;
          font-weight: 700;
          margin-top: 4px;
          padding-top: 6px;
          border-top: 1px solid rgba(6, 23, 47, 0.06);
        }
        .attestation-seal i {
          color: #28a745;
        }

        /* ===== CLOSING ===== */
        .closing-section {
          background: var(--color-cream); padding: 40px 0; border-top: 2px solid var(--color-gold); border-bottom: 2px solid var(--color-gold);
        }
        .closing-section .container { max-width: 900px; margin: 0 auto; padding: 0 20px; text-align: center; }
        .closing-section .urgency-badge { display: inline-block; background: var(--color-gold); color: var(--color-navy); padding: 4px 16px; border-radius: 9999px; font-size: 12px; font-weight: 800; letter-spacing: 0.04em; margin-bottom: 14px; }
        .closing-section h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-navy); margin-bottom: 10px; }
        .closing-section p { font-size: 16px; color: var(--color-gray); margin-bottom: 20px; max-width: 700px; margin-left: auto; margin-right: auto; }
        .closing-section .closing-ctas { display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; }

        /* ===== CTA FINAL ===== */
        .cta-final { background: var(--color-navy); padding: 50px 0; text-align: center; }
        .cta-final h2 { font-family: var(--font-serif); font-size: 28px; font-weight: 700; color: var(--color-white); line-height: 1.1; letter-spacing: -0.025em; margin-bottom: 12px; }
        .cta-final p { color: var(--color-gray-light); font-size: 14px; max-width: 680px; margin: 0 auto 30px auto; }
        .cta-final .cta-group { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; }

        /* ===== SIDEBARS ===== */
        .sidebar-overlay {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(6, 23, 47, 0.6); backdrop-filter: blur(4px); z-index: 99999;
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
        .form-group input, .form-group textarea { padding: 10px 14px; border: 1px solid rgba(6, 23, 47, 0.15); border-radius: 10px; font-size: 14px; font-family: var(--font-sans); transition: border-color 0.3s; background: var(--color-cream); }
        .form-group input:focus, .form-group textarea:focus { outline: none; border-color: var(--color-gold); background: var(--color-white); }
        .form-group textarea { resize: vertical; min-height: 60px; }
        .form-group-rgpd { display: flex; align-items: flex-start; gap: 10px; margin-top: 4px; }
        .form-group-rgpd input[type="checkbox"] { width: 18px; height: 18px; flex-shrink: 0; margin-top: 2px; accent-color: var(--color-gold); cursor: pointer; }
        .form-group-rgpd label { font-size: 13px; color: var(--color-gray); line-height: 1.5; cursor: pointer; }
        .form-group-rgpd label a { color: var(--color-gold); text-decoration: underline; font-weight: 600; }
        .btn-submit { background: var(--color-gold); color: var(--color-navy); padding: 14px 20px; border: none; border-radius: 9999px; font-weight: 700; font-size: 16px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; transition: background 0.3s; margin-top: 4px; width: 100%; }
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
        .programme-content .btn-inscrire-programme { background: var(--color-gold); color: var(--color-navy); padding: 12px 20px; border: none; border-radius: 9999px; font-weight: 700; font-size: 15px; cursor: pointer; transition: background 0.3s; display: inline-flex; align-items: center; justify-content: center; gap: 8px; width: 100%; }
        .programme-content .btn-inscrire-programme:hover { background: #e1bb43; }
        .programme-content .btn-inscrire-programme i { font-size: 18px; }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .container { padding: 0 18px; }
          .hero h1 { font-size: 32px; }
          .hero .mission-box h2 { font-size: 24px; }
          .events-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
          .references-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; }
          .stats-banner { grid-template-columns: repeat(2, 2fr); gap: 12px; padding: 20px 16px; }
          .stats-banner .stat-item .number { font-size: 26px; }
          .sidebar { width: 45%; max-width: 400px; padding: 28px 20px; }
          .section-spacer { height: 24px; }
        }

        @media (max-width: 768px) {
          .container { padding: 0 16px; }
          .section-spacer { height: 18px; }

          .hero { padding: 30px 0 25px 0; }
          .hero h1 { font-size: 26px; }
          .hero .subtitle { font-size: 14px; }
          .hero .description { font-size: 14px; }
          .hero .mission-box { padding: 18px; }
          .hero .mission-box h2 { font-size: 22px; }
          .hero .mission-box p { font-size: 14px; }

          .section { padding: 35px 0; }
          .section-header h2 { font-size: 22px; }
          .section-header p { font-size: 14px; }

          .events-grid { grid-template-columns: 1fr; gap: 14px; }
          .event-card { padding: 16px; }
          .event-card h3 { font-size: 17px; margin-right: 50px; }
          .event-card .card-actions { flex-direction: column; }
          .event-card .card-actions .btn-inscrire-small, .event-card .card-actions .btn-outline-small { width: 100%; }

          .references-grid { grid-template-columns: 1fr 1fr; gap: 12px; }
          .reference-card { padding: 14px 12px; }
          .reference-card .icon { font-size: 22px; }
          .reference-card .ref-title { font-size: 13px; }
          .reference-card.attestation-card .ref-title { font-size: 12px; }
          .reference-card.attestation-card .ref-desc { font-size: 10px; }

          .stats-banner { grid-template-columns: 1fr 1fr; gap: 10px; padding: 16px 12px; }
          .stats-banner .stat-item .number { font-size: 22px; }
          .stats-banner .stat-item .label { font-size: 11px; }

          .sidebar { width: 100%; max-width: 100%; padding: 24px 16px; }
          .sidebar-header h2 { font-size: 22px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }

          .filters { gap: 6px; }
          .filter-tag { font-size: 11px; padding: 4px 12px; }

          .closing-section { padding: 30px 0; }
          .closing-section h2 { font-size: 22px; }
          .closing-section p { font-size: 14px; }

          .cta-final { padding: 35px 0; }
          .cta-final h2 { font-size: 22px; }
          .cta-final .cta-group { flex-direction: column; align-items: center; }
          .cta-final .btn-primary { width: 100%; max-width: 300px; justify-content: center; }
        }

        @media (max-width: 480px) {
          .container { padding: 0 12px; }
          .section-spacer { height: 14px; }

          .hero { padding: 20px 0 16px 0; }
          .hero h1 { font-size: 22px; }
          .hero .subtitle { font-size: 13px; }
          .hero .description { font-size: 13px; }
          .hero .mission-box h2 { font-size: 19px; }
          .hero .mission-box p { font-size: 13px; }

          .section { padding: 28px 0; }
          .section-header h2 { font-size: 20px; }
          .section-header p { font-size: 13px; }

          .event-card h3 { font-size: 15px; }
          .event-card .meta { font-size: 12px; }
          .event-card .price { font-size: 16px; }

          .references-grid { grid-template-columns: 1fr; gap: 10px; }

          .stats-banner { grid-template-columns: 1fr; gap: 8px; padding: 14px 10px; }
          .stats-banner .stat-item .number { font-size: 20px; }
          .stats-banner .stat-item .label { font-size: 10px; }

          .closing-section h2 { font-size: 20px; }
          .closing-section p { font-size: 13px; }

          .cta-final { padding: 28px 0; }
          .cta-final h2 { font-size: 20px; }
          .cta-final p { font-size: 13px; }
          .cta-final .btn-primary { font-size: 13px; padding: 12px 16px; }

          .sidebar-header h2 { font-size: 20px; }
          .sidebar .form-group input, .sidebar .form-group textarea { font-size: 13px; padding: 8px 12px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
        }
      `}</style>
    </>
  );
}