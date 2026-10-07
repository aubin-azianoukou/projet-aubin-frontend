"use client";

import { useParams } from 'next/navigation';
import Link from 'next/link';

// ============================================================
// CONTENU DE TOUS LES ARTICLES
// ============================================================
const articlesData: Record<string, any> = {
  // ==========================================================
  // 1. BUSINESS PLAN
  // ==========================================================
  'business-plan': {
    title: 'Comment réussir son Business Plan : Les étapes clés pour convaincre les investisseurs',
    category: 'Entrepreneuriat',
    date: '15 juin 2026',
    readTime: '8 min',
    excerpt: 'Le Business Plan est la clé de voûte de tout projet entrepreneurial. Découvrez les étapes incontournables pour structurer votre projet, convaincre les investisseurs et maximiser vos chances de succès.',
    content: (
      <>
        <div className="article-image-placeholder">
          <i className="fas fa-file-alt"></i>
        </div>

        <p>Le Business Plan est souvent perçu comme une formalité administrative, un document que l'on rédige pour obtenir un financement et que l'on oublie ensuite. C'est une erreur. Un bon Business Plan est un <strong>outil de pilotage stratégique</strong>, un guide qui vous accompagne tout au long de la vie de votre entreprise.</p>
        <p>Que vous soyez en phase de création, en recherche de financement ou en phase de développement, un Business Plan bien construit vous permettra de clarifier votre vision, de valider votre modèle économique et de convaincre vos interlocuteurs.</p>

        <h2>1. Pourquoi un Business Plan est indispensable</h2>
        <p>Un Business Plan remplit plusieurs fonctions essentielles pour votre projet :</p>
        <ul>
          <li><strong>Structurer votre idée :</strong> Il vous oblige à formaliser votre projet, à le mettre par écrit et à en vérifier la cohérence.</li>
          <li><strong>Valider votre marché :</strong> Il vous pousse à analyser votre marché, vos concurrents et vos clients potentiels.</li>
          <li><strong>Convaincre les investisseurs :</strong> C'est le document de référence pour toute recherche de financement (banques, investisseurs, subventions).</li>
          <li><strong>Piloter votre activité :</strong> Une fois l'entreprise lancée, il devient un outil de suivi et de pilotage.</li>
          <li><strong>Anticiper les risques :</strong> Il vous permet d'identifier les risques et de préparer des plans d'action.</li>
        </ul>

        <div className="highlight-box">
          <p><strong>💡 À retenir :</strong> Un Business Plan n'est pas un document figé. Il évolue avec votre projet et votre marché. Considérez-le comme un outil vivant que vous actualiserez régulièrement.</p>
        </div>

        <h2>2. Les 6 parties essentielles d'un Business Plan</h2>
        <p>Un Business Plan complet et convaincant doit comporter plusieurs sections. Voici les 6 parties que vous ne devez pas négliger.</p>

        <h3>2.1. L'Executive Summary (résumé exécutif)</h3>
        <p>C'est la première partie que l'on lit, mais la dernière que l'on rédige. L'Executive Summary est un résumé synthétique de votre Business Plan. Il doit être percutant, clair et donner envie de lire la suite.</p>
        <p><strong>À inclure :</strong> La présentation de votre projet, votre valeur ajoutée, votre marché, votre modèle économique, vos besoins de financement et votre équipe.</p>

        <div className="highlight-box">
          <p><strong>💡 Astuce :</strong> Rédigez l'Executive Summary en dernier, lorsque vous avez une vision claire de l'ensemble de votre projet. Gardez un ton enthousiaste et confiant.</p>
        </div>

        <h3>2.2. L'étude de marché</h3>
        <p>Cette partie démontre que vous connaissez votre marché, vos clients et vos concurrents. Elle est essentielle pour convaincre de la pertinence de votre projet.</p>
        <p><strong>À inclure :</strong> Une analyse de votre marché (taille, évolution, tendances), une étude de la concurrence (forces, faiblesses, positionnement) et une définition précise de votre cible (profil client, besoins, attentes).</p>

        <h3>2.3. Le modèle économique</h3>
        <p>Comment allez-vous gagner de l'argent ? Cette section doit expliquer clairement votre Business Model Canvas ou votre modèle d'affaires.</p>
        <p><strong>À inclure :</strong> Votre offre de produits ou services, votre stratégie de prix, vos canaux de distribution, vos sources de revenus et votre structure de coûts.</p>

        <h3>2.4. La stratégie marketing et commerciale</h3>
        <p>Comment allez-vous attirer et convaincre vos premiers clients ? Cette section détaille votre stratégie d'acquisition.</p>
        <p><strong>À inclure :</strong> Votre stratégie de communication, vos canaux d'acquisition (réseaux sociaux, SEO, publicité, relations publiques), votre plan d'action commercial et vos objectifs de croissance.</p>

        <h3>2.5. Les prévisions financières</h3>
        <p>C'est la partie la plus technique, mais aussi la plus importante pour convaincre les investisseurs. Vos prévisions doivent être réalistes et cohérentes avec votre stratégie.</p>
        <p><strong>À inclure :</strong> Le compte de résultat prévisionnel, le bilan prévisionnel, le plan de financement, les tableaux de bord et les indicateurs clés.</p>

        <div className="highlight-box">
          <p><strong>📊 Important :</strong> Soyez réaliste dans vos prévisions. Les investisseurs préfèrent des prévisions prudentes et atteignables plutôt que des projections trop optimistes qui ne se réaliseront pas.</p>
        </div>

        <h3>2.6. L'équipe</h3>
        <p>Les investisseurs investissent dans les personnes autant que dans les projets. Cette section présente les compétences et l'expérience de votre équipe.</p>
        <p><strong>À inclure :</strong> Les CV des membres clés de l'équipe, leurs compétences, leurs expériences passées et leurs rôles dans le projet.</p>

        <h2>3. Les erreurs à éviter</h2>
        <p>Pour maximiser vos chances de convaincre, voici les pièges les plus fréquents à éviter dans la rédaction de votre Business Plan :</p>
        <ul>
          <li><strong>Un résumé trop long :</strong> L'Executive Summary doit tenir sur une page maximum.</li>
          <li><strong>Des prévisions trop optimistes :</strong> Soyez réaliste, les investisseurs ne sont pas dupes.</li>
          <li><strong>Une étude de marché superficielle :</strong> Montrez que vous connaissez véritablement votre marché.</li>
          <li><strong>Un document trop théorique :</strong> Appuyez vos propos avec des données concrètes.</li>
          <li><strong>Négliger la présentation :</strong> Un Business Plan bien présenté inspire confiance.</li>
        </ul>

        <h2>4. Le Pitch : votre Business Plan en 5 minutes</h2>
        <p>En plus du document écrit, vous aurez besoin de présenter votre projet en quelques minutes. Le pitch est un exercice clé pour capter l'attention des investisseurs.</p>
        <p><strong>Conseils pour un pitch réussi :</strong></p>
        <ul>
          <li>Structurez votre pitch en 3 parties : problème, solution, opportunité.</li>
          <li>Soyez concis : 5 minutes maximum pour le pitch principal.</li>
          <li>Mettez en avant votre valeur ajoutée et votre proposition unique.</li>
          <li>Terminez par un appel à l'action clair.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Le Business Plan est bien plus qu'un simple document de financement. C'est un véritable outil de structuration, de validation et de pilotage de votre projet. En prenant le temps de le construire de manière rigoureuse, vous augmentez considérablement vos chances de succès.</p>
        <p>N'oubliez pas : un Business Plan n'est jamais terminé. Il évolue avec votre projet et votre marché. Utilisez-le comme un compagnon de route qui vous aide à rester sur la bonne voie.</p>

        <div className="highlight-box">
          <p><strong>🚀 Besoin d'aide pour rédiger votre Business Plan ?</strong> Je vous accompagne dans la structuration de votre projet et la rédaction d'un Business Plan convaincant.</p>
        </div>
      </>
    )
  },

  // ==========================================================
  // 2. ERREURS PME
  // ==========================================================
  'erreurs-pme': {
    title: '10 erreurs fréquentes des PME : Les pièges qui ralentissent votre croissance',
    category: 'Gestion d\'entreprise',
    date: '10 juin 2026',
    readTime: '10 min',
    excerpt: 'Les PME commettent souvent les mêmes erreurs de gestion, ce qui freine leur développement et met parfois leur pérennité en danger. Découvrez les 10 erreurs les plus fréquentes et comment les éviter.',
    content: (
      <>
        <div className="article-image-placeholder">
          <i className="fas fa-exclamation-triangle"></i>
        </div>

        <p>Gérer une PME est un défi de tous les jours. Entre les urgences opérationnelles, la gestion des équipes et les impératifs financiers, il est facile de commettre des erreurs qui, à long terme, peuvent compromettre la santé de votre entreprise.</p>
        <p>Fort de plus de 20 ans d'accompagnement de PME au Burkina Faso et en Afrique, j'ai identifié <strong>10 erreurs récurrentes</strong> qui freinent la croissance des entreprises. Voici ces pièges à éviter pour assurer le développement durable de votre organisation.</p>

        <div className="highlight-box">
          <p><strong>01. Absence de plan stratégique clair</strong><br />De nombreuses PME fonctionnent au jour le jour, sans vision à moyen ou long terme. Sans plan stratégique, vous naviguez à vue et vous réagissez aux événements plutôt que de les anticiper.<br /><br /><strong>Solution :</strong> Définissez une vision claire, des objectifs annuels et un plan d'action structuré. Révisez votre stratégie régulièrement pour vous adapter aux évolutions du marché.</p>
        </div>

        <div className="highlight-box">
          <p><strong>02. Mauvaise gestion de la trésorerie</strong><br />La trésorerie est le nerf de la guerre pour toute PME. Les retards de paiement, les dépenses imprévues ou une mauvaise anticipation peuvent mettre votre entreprise en difficulté.<br /><br /><strong>Solution :</strong> Établissez des prévisions de trésorerie sur 3 à 6 mois. Relancez vos clients de manière systématique et négociez des délais de paiement avec vos fournisseurs.</p>
        </div>

        <div className="highlight-box">
          <p><strong>03. Négliger la formation des équipes</strong><br />Les compétences de vos collaborateurs sont un atout majeur. Ne pas investir dans leur formation, c'est limiter la capacité de votre entreprise à évoluer et à innover.<br /><br /><strong>Solution :</strong> Identifiez les besoins en compétences de votre équipe et planifiez des formations régulières.</p>
        </div>

        <div className="highlight-box">
          <p><strong>04. Sous-estimer l'importance du marketing</strong><br />Beaucoup de PME considèrent le marketing comme un coût superflu. Pourtant, sans visibilité, vous ne pourrez pas attirer de nouveaux clients et développer votre activité.<br /><br /><strong>Solution :</strong> Investissez dans une stratégie marketing adaptée à votre secteur. Utilisez les réseaux sociaux, le SEO et les campagnes publicitaires pour gagner en visibilité.</p>
        </div>

        <div className="highlight-box">
          <p><strong>05. Mauvaise gestion du temps</strong><br />Les dirigeants de PME sont souvent submergés par les tâches quotidiennes et manquent de temps pour se concentrer sur l'essentiel : la stratégie et le développement.<br /><br /><strong>Solution :</strong> Déléguez les tâches opérationnelles, priorisez vos actions et apprenez à dire non. Utilisez des outils de gestion de temps et de projets pour mieux organiser votre travail.</p>
        </div>

        <div className="highlight-box">
          <p><strong>06. Ne pas écouter ses clients</strong><br />Les clients sont la raison d'être de votre entreprise. Ignorer leurs retours, leurs besoins et leurs insatisfactions, c'est prendre le risque de les perdre au profit de la concurrence.<br /><br /><strong>Solution :</strong> Mettez en place des canaux d'écoute : enquêtes de satisfaction, entretiens clients, analyse des avis en ligne. Utilisez ces retours pour améliorer vos produits et services.</p>
        </div>

        <div className="highlight-box">
          <p><strong>07. Investir sans étudier le marché</strong><br />Certains entrepreneurs investissent dans de nouveaux équipements, locaux ou produits sans avoir réalisé une étude de marché approfondie. Résultat : des investissements qui ne génèrent pas le retour attendu.<br /><br /><strong>Solution :</strong> Avant tout investissement majeur, réalisez une étude de marché pour valider la pertinence de votre projet et estimer son potentiel.</p>
        </div>

        <div className="highlight-box">
          <p><strong>08. Manque de suivi des indicateurs clés</strong><br />Comment piloter votre entreprise si vous ne mesurez pas ses performances ? Beaucoup de PME ne disposent pas de tableaux de bord fiables pour suivre leur activité.<br /><br /><strong>Solution :</strong> Définissez vos indicateurs clés de performance (KPI) et suivez-les régulièrement. Utilisez des outils comme Excel ou des logiciels de reporting pour centraliser vos données.</p>
        </div>

        <div className="highlight-box">
          <p><strong>09. Résister au changement et à l'innovation</strong><br />Dans un monde en constante évolution, les entreprises qui refusent de s'adapter sont condamnées à disparaître. La résistance au changement est un frein majeur à la croissance.<br /><br /><strong>Solution :</strong> Adoptez une culture d'innovation et d'amélioration continue. Formez-vous aux nouvelles technologies pour rester compétitif.</p>
        </div>

        <div className="highlight-box">
          <p><strong>10. Négliger la gestion des ressources humaines</strong><br />Les collaborateurs sont le capital le plus précieux de votre entreprise. Une mauvaise gestion des RH (recrutement, motivation, évaluation) peut générer un turnover élevé et une baisse de productivité.<br /><br /><strong>Solution :</strong> Investissez dans le recrutement, la formation et le bien-être de vos équipes. Mettez en place des entretiens individuels, des objectifs clairs et des perspectives d'évolution.</p>
        </div>

        <h2>Conclusion</h2>
        <p>Éviter ces 10 erreurs ne garantit pas le succès, mais cela augmente considérablement vos chances de développer une entreprise solide et durable. La clé est d'être proactif, d'anticiper les difficultés et de s'entourer des bons conseils.</p>
        <p>Vous reconnaissez certaines de ces erreurs dans votre entreprise ? Ce n'est pas grave. L'important est de les identifier pour pouvoir les corriger. Demandez de l'aide si nécessaire : un regard extérieur permet souvent de voir ce qui nous échappe.</p>

        <div className="highlight-box">
          <p><strong>Besoin d'un diagnostic de votre entreprise ?</strong> Je vous propose un accompagnement personnalisé pour identifier vos axes d'amélioration et structurer votre croissance.</p>
        </div>
      </>
    )
  },

  // ==========================================================
  // 3. EXCEL BUSINESS
  // ==========================================================
  'excel-business': {
    title: 'Comment utiliser Excel pour son business : 10 astuces pratiques',
    category: 'Bureautique',
    date: '5 juin 2026',
    readTime: '6 min',
    excerpt: 'Excel est un outil puissant pour les entrepreneurs. Découvrez 10 astuces pratiques pour suivre vos ventes, gérer votre trésorerie, analyser vos données et prendre de meilleures décisions.',
    content: (
      <>
        <div className="article-image-placeholder">
          <i className="fas fa-chart-bar"></i>
        </div>

        <p>Excel est souvent considéré comme un simple tableur, mais c'est bien plus que cela. Pour un entrepreneur, c'est un véritable outil de pilotage qui permet de suivre son activité, d'analyser ses performances et de prendre des décisions éclairées.</p>
        <p>Dans cet article, je vous partage 10 astuces concrètes pour utiliser Excel au service de votre business. Que vous soyez débutant ou utilisateur confirmé, ces conseils vous aideront à gagner du temps et à mieux piloter votre entreprise.</p>

        <div className="highlight-box">
          <p><strong>01. Utiliser les tableaux structurés</strong><br />Les tableaux structurés (insertion &gt; tableau) sont bien plus que de simples plages de données. Ils s'étendent automatiquement, conservent les formules et facilitent les références. Transformez vos plages de données en tableaux pour gagner en efficacité.</p>
        </div>

        <div className="highlight-box">
          <p><strong>02. Maîtriser les formules essentielles</strong><br />Quelques formules suffisent pour faire la différence : SOMME, MOYENNE, SI, RECHERCHEV, SOMME.SI et NB.SI. Ces fonctions vous permettent de centraliser, d'analyser et de synthétiser vos données sans effort.</p>
        </div>

        <div className="highlight-box">
          <p><strong>03. Créer des tableaux de bord simples</strong><br />Un tableau de bord est un résumé visuel de vos indicateurs clés. Utilisez des graphiques, des courbes et des mises en forme conditionnelles pour visualiser vos performances en un coup d'œil.</p>
        </div>

        <div className="highlight-box">
          <p><strong>04. Utiliser les mises en forme conditionnelles</strong><br />Les mises en forme conditionnelles permettent de mettre en évidence des données importantes : seuils de rentabilité, retards de paiement, objectifs atteints, etc. Un outil simple mais très puissant pour le suivi.</p>
        </div>

        <div className="highlight-box">
          <p><strong>05. Importer et nettoyer des données</strong><br />Excel permet d'importer des données provenant de sources variées (CSV, bases de données, sites web). Utilisez les outils de nettoyage pour supprimer les doublons, standardiser les formats et préparer vos données à l'analyse.</p>
        </div>

        <div className="highlight-box">
          <p><strong>06. Utiliser les tableaux croisés dynamiques</strong><br />Les tableaux croisés dynamiques sont l'un des outils les plus puissants d'Excel. Ils permettent de synthétiser et d'analyser des volumes de données en quelques clics. Idéal pour les rapports de vente et les analyses par catégorie.</p>
        </div>

        <div className="highlight-box">
          <p><strong>07. Créer des graphiques professionnels</strong><br />Un bon graphique vaut mieux qu'un long discours. Excel propose de nombreux types de graphiques pour visualiser vos données de manière claire et impactante. Choisissez celui qui correspond le mieux à votre message.</p>
        </div>

        <div className="highlight-box">
          <p><strong>08. Automatiser les tâches répétitives</strong><br />Les macros et l'enregistrement de macros permettent d'automatiser les actions répétitives. Gagnez un temps précieux en automatisant vos rapports hebdomadaires ou mensuels.</p>
        </div>

        <div className="highlight-box">
          <p><strong>09. Utiliser les modèles prédéfinis</strong><br />Excel propose des modèles pour de nombreux usages : suivi de budget, planning, facturation, etc. Utilisez-les comme point de départ pour gagner du temps et adopter les bonnes pratiques.</p>
        </div>

        <div className="highlight-box">
          <p><strong>10. Partager et collaborer en temps réel</strong><br />Avec Excel Online et OneDrive, vous pouvez partager vos fichiers et collaborer en temps réel avec vos collaborateurs. Une fonctionnalité indispensable pour le travail en équipe.</p>
        </div>

        <h2>Conclusion</h2>
        <p>Excel est un outil puissant qui peut transformer la façon dont vous pilotez votre entreprise. Ces 10 astuces vous permettront de gagner en efficacité, d'analyser vos données et de prendre de meilleures décisions.</p>
        <p>N'oubliez pas : la maîtrise d'Excel est un investissement qui rapporte. Plus vous l'utiliserez, plus vous découvrirez de nouvelles fonctionnalités pour optimiser votre activité.</p>

        <div className="highlight-box">
          <p><strong>📊 Vous souhaitez aller plus loin avec Excel ?</strong> Je propose des formations personnalisées pour maîtriser les fonctions avancées, les tableaux croisés dynamiques et l'automatisation.</p>
        </div>
      </>
    )
  },

  // ==========================================================
  // 4. ÉTUDE DE MARCHÉ
  // ==========================================================
  'etude-marche': {
    title: 'Comment rédiger une étude de marché : guide complet en 6 étapes',
    category: 'Marketing',
    date: '30 mai 2026',
    readTime: '9 min',
    excerpt: 'L\'étude de marché est une étape incontournable pour tout projet entrepreneurial. Découvrez comment la réaliser en 6 étapes pour valider votre idée, analyser votre secteur et convaincre vos partenaires.',
    content: (
      <>
        <div className="article-image-placeholder">
          <i className="fas fa-search"></i>
        </div>

        <p>L'étude de marché est souvent perçue comme une formalité. Pourtant, c'est l'une des étapes les plus importantes de la création d'entreprise. Elle vous permet de valider votre projet, de connaître vos concurrents et de comprendre vos futurs clients.</p>
        <p>Dans ce guide, je vous propose une méthode en 6 étapes pour réaliser une étude de marché complète et professionnelle. Que vous soyez en phase de réflexion ou déjà engagé dans votre projet, ces conseils vous aideront à structurer votre approche.</p>

        <div className="highlight-box">
          <p><strong>01. Définir les objectifs de l'étude</strong><br />Avant de commencer, demandez-vous : pourquoi réalisez-vous cette étude ? Pour valider votre idée ? Pour convaincre des investisseurs ? Pour connaître vos concurrents ? Des objectifs clairs vous permettront de cibler les bonnes informations et d'éviter de vous disperser.</p>
        </div>

        <div className="highlight-box">
          <p><strong>02. Analyser le marché et son environnement</strong><br />Commencez par une analyse large de votre secteur d'activité : taille du marché, tendances, évolutions. Utilisez des études existantes, des rapports sectoriels et des données publiques pour comprendre les dynamiques de votre marché.</p>
        </div>

        <div className="highlight-box">
          <p><strong>03. Étudier la concurrence</strong><br />Identifiez vos concurrents directs et indirects. Analysez leur offre, leur positionnement, leurs forces et leurs faiblesses. Cette analyse vous permettra de définir votre propre positionnement et de vous différencier.</p>
        </div>

        <div className="highlight-box">
          <p><strong>04. Définir et analyser sa cible</strong><br />À qui vous adressez-vous ? Définissez précisément votre client idéal : profil démographique, besoins, attentes, comportements d'achat. Réalisez des enquêtes ou des entretiens pour recueillir des informations de première main.</p>
        </div>

        <div className="highlight-box">
          <p><strong>05. Valider la demande et les besoins</strong><br />Votre projet répond-il à un besoin réel ? Testez votre offre auprès de clients potentiels. Utilisez des questionnaires, des focus groups ou des prototypes pour recueillir leurs retours et ajuster votre proposition.</p>
        </div>

        <div className="highlight-box">
          <p><strong>06. Synthétiser et présenter les résultats</strong><br />Une fois vos données collectées, synthétisez-les dans un document clair et structuré. Présentez les conclusions principales, les opportunités et les risques. Ce document sera précieux pour votre Business Plan et vos échanges avec les partenaires.</p>
        </div>

        <h2>Les outils pour réaliser votre étude de marché</h2>
        <p>Pour mener à bien votre étude de marché, vous pouvez utiliser plusieurs outils :</p>
        <ul>
          <li><strong>Google Trends :</strong> pour analyser les tendances de recherche.</li>
          <li><strong>Questionnaires en ligne :</strong> Google Forms, Typeform ou SurveyMonkey.</li>
          <li><strong>Entretiens :</strong> rencontrez des clients potentiels ou des experts du secteur.</li>
          <li><strong>Rapports sectoriels :</strong> consultez les études disponibles sur votre secteur.</li>
          <li><strong>Analyse concurrentielle :</strong> visitez les sites et les points de vente de vos concurrents.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>L'étude de marché est un investissement en temps qui rapporte. Elle vous permet de prendre des décisions éclairées, d'ajuster votre offre et de maximiser vos chances de succès. Ne la négligez pas.</p>
        <p>Vous avez une idée de projet mais vous ne savez pas par où commencer ? Je vous accompagne dans la réalisation de votre étude de marché.</p>

        <div className="highlight-box">
          <p><strong>📊 Besoin d'un accompagnement pour votre étude de marché ?</strong> Je vous propose un service de consulting pour analyser votre secteur, votre concurrence et valider votre projet.</p>
        </div>
      </>
    )
  },

  // ==========================================================
  // 5. ENTRETIEN D'EMBAUCHE
  // ==========================================================
  'entretien-embauche': {
    title: 'Comment réussir un entretien d\'embauche : 8 conseils pour vous démarquer',
    category: 'Leadership',
    date: '25 mai 2026',
    readTime: '7 min',
    excerpt: 'L\'entretien d\'embauche est une étape déterminante dans votre carrière. Découvrez 8 conseils pour préparer votre entretien, convaincre le recruteur et décrocher le poste.',
    content: (
      <>
        <div className="article-image-placeholder">
          <i className="fas fa-users"></i>
        </div>

        <p>L'entretien d'embauche est souvent perçu comme une épreuve stressante. Pourtant, avec une bonne préparation, il peut devenir une opportunité de valoriser votre parcours et de convaincre le recruteur que vous êtes le bon candidat.</p>
        <p>Dans cet article, je vous partage 8 conseils pratiques pour réussir vos entretiens d'embauche, que vous soyez du côté du candidat ou du recruteur. Ces conseils sont issus de mon expérience en accompagnement des entreprises et des professionnels.</p>

        <div className="highlight-box">
          <p><strong>01. Préparer en amont l'entretien</strong><br />Une bonne préparation est la clé de la réussite. Renseignez-vous sur l'entreprise, son secteur, ses activités et sa culture. Analysez l'offre d'emploi en détail pour comprendre ce que recherche le recruteur. Préparez des questions pertinentes à poser en fin d'entretien.</p>
        </div>

        <div className="highlight-box">
          <p><strong>02. Soigner sa présentation et son attitude</strong><br />La première impression compte. Adoptez une tenue professionnelle adaptée au poste et à l'entreprise. Arrivez à l'heure, soyez souriant et montrez-vous dynamique. La communication non verbale (regard, posture, gestes) est tout aussi importante que ce que vous dites.</p>
        </div>

        <div className="highlight-box">
          <p><strong>03. Savoir se présenter avec impact</strong><br />Préparez un pitch de présentation de 2 à 3 minutes. Structurez-le autour de votre parcours, vos compétences et vos motivations. Montrez en quoi votre expérience est en adéquation avec le poste. Utilisez des exemples concrets pour illustrer vos propos.</p>
        </div>

        <div className="highlight-box">
          <p><strong>04. Utiliser la méthode STAR</strong><br />La méthode STAR (Situation, Tâche, Action, Résultat) est un outil efficace pour structurer vos réponses. Pour chaque question, présentez le contexte (Situation), ce que vous deviez faire (Tâche), ce que vous avez fait (Action) et les résultats obtenus (Résultat).</p>
        </div>

        <div className="highlight-box">
          <p><strong>05. Mettre en avant ses compétences clés</strong><br />Identifiez les compétences essentielles pour le poste et préparez des exemples qui les illustrent. Ne vous contentez pas de les énumérer, montrez comment vous les avez mises en œuvre dans des situations professionnelles concrètes.</p>
        </div>

        <div className="highlight-box">
          <p><strong>06. Gérer son stress</strong><br />Le stress est normal, mais il ne doit pas vous paralyser. Respirez profondément avant l'entretien, préparez vos réponses à l'avance et visualisez-vous réussir. Rappelez-vous que l'entretien est aussi une opportunité pour vous de découvrir l'entreprise.</p>
        </div>

        <div className="highlight-box">
          <p><strong>07. Poser les bonnes questions</strong><br />En fin d'entretien, le recruteur vous demandera si vous avez des questions. C'est une occasion de montrer votre intérêt pour le poste et l'entreprise. Préparez 3 à 4 questions pertinentes sur l'équipe, les projets, les évolutions possibles, etc.</p>
        </div>

        <div className="highlight-box">
          <p><strong>08. Assurer le suivi après l'entretien</strong><br />Envoyez un email de remerciement dans les 24 heures suivant l'entretien. C'est un geste professionnel qui montre votre motivation et votre courtoisie. Profitez-en pour rappeler brièvement votre intérêt pour le poste.</p>
        </div>

        <h2>Le regard du recruteur</h2>
        <p>Si vous êtes de l'autre côté de la table, ces conseils vous seront également utiles. Un bon recruteur est un recruteur qui prépare ses entretiens, qui sait écouter et qui cherche à comprendre le candidat au-delà de son CV.</p>
        <p>Pour réussir vos entretiens, n'oubliez pas : vous recrutez une personne, pas un CV. Cherchez à comprendre les motivations, les valeurs et le potentiel d'évolution du candidat.</p>

        <h2>Conclusion</h2>
        <p>L'entretien d'embauche est une compétence qui s'apprend et se perfectionne. Avec une bonne préparation, une attitude professionnelle et une connaissance de vous-même, vous maximiserez vos chances de réussite.</p>
        <p>Que vous soyez candidat ou recruteur, ces 8 conseils vous aideront à aborder l'entretien avec confiance et à en faire une expérience positive pour toutes les parties.</p>

        <div className="highlight-box">
          <p><strong>👥 Besoin d'un accompagnement pour vos entretiens ou pour recruter ?</strong> Je vous propose un coaching personnalisé pour préparer vos entretiens ou structurer vos recrutements.</p>
        </div>
      </>
    )
  },

  // ==========================================================
  // 6. CRÉER ENTREPRISE BURKINA
  // ==========================================================
  'creer-entreprise-burkina': {
    title: 'Créer une entreprise au Burkina Faso en 2026 : démarches, coûts et formalités',
    category: 'Entrepreneuriat',
    date: '20 mai 2026',
    readTime: '12 min',
    excerpt: 'Guide complet pour créer votre entreprise au Burkina Faso. CEFORE, formes juridiques, capital social, IFU, RCCM et coûts détaillés étape par étape.',
    content: (
      <>
        <div className="article-image-placeholder">
          <i className="fas fa-flag-checkered"></i>
        </div>

        <p>Le Burkina Faso a considérablement simplifié les démarches de création d'entreprise ces dernières années. Grâce au guichet unique du CEFORE (Centre de Formalités des Entreprises), il est désormais possible de créer une société en 72 heures à Ouagadougou, et en moins d'une semaine dans les CEFORE régionaux de Bobo-Dioulasso, Koudougou, Ouahigouya, Fada N'Gourma et Dédougou.</p>
        <p>Ce guide vous détaille chaque étape, les coûts exacts et les pièges à éviter pour créer votre entreprise en toute sérénité.</p>

        <h2>Choisir la forme juridique adaptée</h2>
        <p>Le choix de la forme juridique est une décision importante qui aura des conséquences sur votre responsabilité, votre fiscalité et votre gouvernance. Voici les principales options :</p>

        <div className="highlight-box">
          <p><strong>01. Entreprise individuelle</strong><br />La forme la plus simple, idéale pour démarrer seul. Pas de capital minimum, mais votre patrimoine personnel est engagé. Adaptée aux auto-entrepreneurs et aux petites activités.</p>
        </div>

        <div className="highlight-box">
          <p><strong>02. SARL (Société à Responsabilité Limitée)</strong><br />La forme la plus courante au Burkina Faso. Capital minimum de 100 000 F CFA, responsabilité limitée aux apports, de 1 à 100 associés. Idéale pour les PME.</p>
        </div>

        <div className="highlight-box">
          <p><strong>03. SAS (Société par Actions Simplifiée)</strong><br />Plus flexible dans sa gouvernance, adaptée aux projets ambitieux avec plusieurs investisseurs. Capital minimum de 100 000 F CFA.</p>
        </div>

        <div className="highlight-box">
          <p><strong>04. SA (Société Anonyme)</strong><br />Pour les grandes entreprises. Capital minimum de 10 000 000 F CFA, au moins un administrateur. Adaptée aux grands projets et aux introductions en bourse.</p>
        </div>

        <div className="highlight-box">
          <p><strong>05. GIE (Groupement d'Intérêt Économique)</strong><br />Adapté pour mutualiser des moyens entre plusieurs entreprises existantes. Idéal pour des projets collaboratifs.</p>
        </div>

        <h2>Les étapes de création au CEFORE</h2>
        <p>Le CEFORE centralise toutes les formalités de création d'entreprise. Voici les 6 étapes à suivre :</p>
        <ol>
          <li><strong>Vérifier la disponibilité du nom commercial</strong> auprès du CEFORE (résultat en quelques heures).</li>
          <li><strong>Rédiger les statuts de la société</strong> — vous pouvez utiliser les modèles types disponibles au CEFORE ou faire appel à un notaire.</li>
          <li><strong>Déposer le capital social</strong> sur un compte bancaire au nom de la société en formation (minimum 100 000 F CFA pour une SARL).</li>
          <li><strong>Constituer le dossier complet</strong> : statuts signés, pièces d'identité des associés, attestation de dépôt du capital, déclaration de conformité.</li>
          <li><strong>Déposer le dossier au guichet unique du CEFORE</strong> et payer les frais de constitution.</li>
          <li><strong>Recevoir vos documents officiels</strong> : RCCM (Registre du Commerce et du Crédit Mobilier), IFU (Identifiant Financier Unique) et attestation d'immatriculation.</li>
        </ol>

        <div className="highlight-box">
          <p><strong>💡 Délais :</strong> 72 heures à Ouagadougou, moins d'une semaine dans les CEFORE régionaux (Bobo-Dioulasso, Koudougou, Ouahigouya, Fada N'Gourma, Dédougou).</p>
        </div>

        <h2>Les coûts détaillés de la création</h2>
        <p>Voici un tableau récapitulatif des frais à prévoir pour créer votre entreprise au Burkina Faso :</p>

        <ul>
          <li><strong>Frais d'immatriculation au CEFORE :</strong> 47 000 F CFA</li>
          <li><strong>Frais de notaire pour les statuts :</strong> 50 000 - 150 000 F CFA</li>
          <li><strong>Capital social minimum (SARL) :</strong> 100 000 F CFA</li>
          <li><strong>Droit d'enregistrement des statuts (1 % du capital) :</strong> min. 25 000 F CFA</li>
          <li><strong>Frais bancaires d'ouverture de compte :</strong> 10 000 - 50 000 F CFA</li>
          <li><strong>Publication au Journal Officiel :</strong> 20 000 F CFA</li>
          <li style={{ listStyle: 'none', borderTop: '2px solid #d4af37', paddingTop: '12px', marginTop: '4px' }}><strong>Budget total indicatif :</strong> 250 000 - 500 000 FCFA</li>
        </ul>

        <div className="highlight-box">
          <p><strong>💼 Option prestataire :</strong> Des prestataires offrent leurs services à partir de 150 000 F CFA par dossier, frais de création compris (hors capital social). Une solution pratique si vous préférez déléguer les formalités.</p>
        </div>

        <h2>Les obligations après la création</h2>
        <p>Une fois votre entreprise créée, vous devez respecter plusieurs obligations :</p>
        <ul>
          <li><strong>Déclaration d'existence</strong> auprès de la Direction Générale des Impôts dans les 15 jours.</li>
          <li><strong>Affiliation à la CNSS</strong> (Caisse Nationale de Sécurité Sociale) si vous embauchez du personnel.</li>
          <li><strong>Tenue d'une comptabilité</strong> conforme au SYSCOHADA.</li>
          <li><strong>Déclarations fiscales</strong> mensuelles ou trimestrielles selon votre régime d'imposition (réel normal ou réel simplifié d'imposition).</li>
          <li><strong>Renouvellement du RCCM</strong> tous les 5 ans.</li>
          <li><strong>IFU permanent</strong> (Identifiant Financier Unique) pour toutes vos démarches fiscales.</li>
        </ul>

        <h2>Conclusion</h2>
        <p>Créer une entreprise au Burkina Faso est aujourd'hui plus simple que jamais grâce au guichet unique du CEFORE. En suivant ce guide et en vous entourant des bons conseils, vous pouvez concrétiser votre projet entrepreneurial dans des délais raisonnables.</p>
        <p>N'oubliez pas : la création d'entreprise est une aventure exigeante mais passionnante. Préparez-vous bien, entourez-vous de professionnels et lancez-vous !</p>

        <div className="highlight-box">
          <p><strong>📌 Besoin d'accompagnement pour créer votre entreprise ?</strong> Je vous propose un service de consulting pour vous guider dans les démarches, le choix de la structure et la rédaction des statuts.</p>
        </div>
      </>
    )
  }
};

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function ArticlePage() {
  const params = useParams();
  const slug = params?.slug as string || 'business-plan';
  
  const article = articlesData[slug];

  if (!article) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center', background: '#f8f5ee', minHeight: '100vh' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '32px', color: '#06172f' }}>Article non trouvé</h1>
          <p style={{ color: '#6c7280' }}>L'article que vous cherchez n'existe pas.</p>
          <Link href="/ressources" style={{ color: '#d4af37', fontWeight: '600', textDecoration: 'none' }}>
            ← Retour aux ressources
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ===== ARTICLE HERO ===== */}
      <section className="article-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/ressources">Ressources</Link>
            <span className="separator">›</span>
            <span>{article.category}</span>
          </div>
          <span className="article-category">{article.category}</span>
          <h1>{article.title}</h1>
          <div className="article-meta">
            <span><i className="far fa-calendar-alt"></i> {article.date}</span>
            <span><i className="far fa-clock"></i> {article.readTime}</span>
            <span><i className="far fa-user"></i> Aubin Romain AZIANOUKOU</span>
          </div>
          <div className="article-excerpt">{article.excerpt}</div>
        </div>
      </section>

      <div className="section-spacer"></div>

      {/* ===== ARTICLE CONTENT ===== */}
      <article className="article-content">
        <div className="container">
          {article.content}
        </div>
      </article>

      <div className="section-spacer"></div>

      {/* ===== AUTHOR BOX ===== */}
      <div className="author-box">
        <div className="avatar"><i className="fas fa-user"></i></div>
        <div>
          <h4>Aubin Romain AZIANOUKOU</h4>
          <p>Expert en entrepreneuriat, consulting et développement d'entreprise. J'accompagne les entrepreneurs et les dirigeants dans la structuration et la croissance de leurs projets depuis plus de 20 ans.</p>
        </div>
      </div>

      <div className="section-spacer"></div>

      {/* ===== CTA FINAL ===== */}
      <section className="cta-final">
        <div className="cta-container">
          <h2>Vous avez aimé cet article ?</h2>
          <p>Besoin d'un accompagnement pour votre projet ? Contactez-moi pour un échange personnalisé.</p>
          <div className="cta-group">
            <a href="https://wa.me/22662381272?text=Bonjour%2C%20je%20souhaite%20%C3%A9changer%20sur%20mon%20projet." target="_blank" rel="noopener noreferrer" className="btn-primary">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
            <Link href="/contact" className="btn-secondary">
              <i className="fas fa-envelope"></i> Envoyer un message
            </Link>
          </div>
        </div>
      </section>

      <div className="section-spacer"></div>

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

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .section-spacer { height: 36px; background: var(--color-cream); }

        /* ===== ARTICLE HERO ===== */
        .article-hero { background: var(--color-white); padding: 50px 0 40px 0; }
        .article-hero .container { max-width: 800px; }
        .article-hero .breadcrumb { font-size: 13px; color: var(--color-gray); margin-bottom: 16px; }
        .article-hero .breadcrumb a { color: var(--color-gold); font-weight: 600; }
        .article-hero .breadcrumb .separator { margin: 0 6px; color: var(--color-gray); }
        .article-hero .article-category {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-gold);
          background: rgba(212, 175, 55, 0.1);
          padding: 4px 14px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }
        .article-hero h1 {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.15;
          margin-bottom: 12px;
        }
        .article-hero .article-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13px;
          color: var(--color-gray);
          margin-bottom: 12px;
        }
        .article-hero .article-meta span { display: flex; align-items: center; gap: 6px; }
        .article-hero .article-meta i { color: var(--color-gold); }
        .article-hero .article-excerpt {
          font-size: 17px;
          color: var(--color-gray);
          line-height: 1.7;
          padding-top: 16px;
          border-top: 1px solid rgba(6, 23, 47, 0.06);
        }

        /* ===== ARTICLE CONTENT ===== */
        .article-content { padding: 50px 0; background: var(--color-white); }
        .article-content .container { max-width: 800px; }
        .article-content .article-image-placeholder {
          background: linear-gradient(135deg, var(--color-cream), #e8e3d8);
          border-radius: 16px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
          color: var(--color-gold);
          margin-bottom: 30px;
          border: 2px dashed rgba(212, 175, 55, 0.3);
        }
        .article-content h2 {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--color-navy);
          margin-top: 40px;
          margin-bottom: 12px;
          line-height: 1.2;
        }
        .article-content h3 {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--color-navy);
          margin-top: 30px;
          margin-bottom: 10px;
          line-height: 1.2;
        }
        .article-content p {
          color: var(--color-gray);
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 16px;
        }
        .article-content ul, .article-content ol {
          padding-left: 24px;
          margin-bottom: 16px;
        }
        .article-content ul li, .article-content ol li {
          color: var(--color-gray);
          font-size: 16px;
          line-height: 1.8;
          margin-bottom: 8px;
        }
        .article-content ul li::before {
          content: "•";
          color: var(--color-gold);
          font-weight: 700;
          margin-right: 10px;
        }
        .article-content ol {
          counter-reset: item;
        }
        .article-content ol li {
          counter-increment: item;
        }
        .article-content ol li::before {
          content: counter(item) ".";
          color: var(--color-gold);
          font-weight: 700;
          margin-right: 10px;
        }
        .article-content .highlight-box {
          background: var(--color-cream);
          border-left: 4px solid var(--color-gold);
          padding: 20px 24px;
          border-radius: 8px;
          margin: 24px 0;
        }
        .article-content .highlight-box p {
          margin-bottom: 0;
          color: var(--color-gray);
          line-height: 1.7;
        }
        .article-content .highlight-box p strong {
          color: var(--color-navy);
        }

        /* ===== AUTHOR BOX ===== */
        .author-box {
          background: var(--color-cream);
          border-radius: 16px;
          padding: 30px;
          display: flex;
          gap: 24px;
          align-items: center;
          margin-top: 40px;
          border: 1px solid rgba(6, 23, 47, 0.06);
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        .author-box .avatar {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: var(--color-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 32px;
          color: var(--color-navy);
          flex-shrink: 0;
        }
        .author-box h4 {
          font-weight: 700;
          color: var(--color-navy);
          font-size: 17px;
          margin-bottom: 4px;
        }
        .author-box p {
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.6;
          margin-bottom: 0;
        }

        /* ===== CTA FINAL ===== */
        .cta-final {
          background: var(--color-navy);
          padding: 50px 0;
          text-align: center;
          width: 100%;
          margin: 0;
        }
        .cta-container {
          max-width: 680px;
          margin: 0 auto;
          padding: 0 20px;
        }
        .cta-final h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          margin-bottom: 12px;
        }
        .cta-final p {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-final .cta-group {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
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
        .cta-final .btn-secondary {
          border: 1px solid rgba(255, 255, 255, 0.3);
          color: var(--color-white);
          padding: 12px 24px;
          border-radius: 9999px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background 0.3s;
          background: transparent;
          cursor: pointer;
          font-size: 14px;
        }
        .cta-final .btn-secondary:hover { background: rgba(255, 255, 255, 0.08); }

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .article-hero h1 { font-size: 32px; }
          .article-content h2 { font-size: 24px; }
          .article-content h3 { font-size: 19px; }
        }

        @media (max-width: 768px) {
          .section-spacer { height: 24px; }
          .article-hero { padding: 30px 0 25px 0; }
          .article-hero h1 { font-size: 26px; }
          .article-hero .article-excerpt { font-size: 15px; }
          .article-content { padding: 35px 0; }
          .article-content h2 { font-size: 22px; }
          .article-content h3 { font-size: 18px; }
          .article-content .article-image-placeholder { height: 150px; font-size: 36px; }
          .article-content p, .article-content ul li, .article-content ol li { font-size: 15px; }
          .article-content .highlight-box { padding: 16px 18px; }
          
          .author-box { flex-direction: column; text-align: center; padding: 24px; }
          .author-box .avatar { width: 60px; height: 60px; font-size: 26px; }
          
          .cta-final { padding: 35px 0; }
          .cta-final h2 { font-size: 22px; }
          .cta-final .cta-group { flex-direction: column; align-items: center; }
          .cta-final .btn-primary, .cta-final .btn-secondary { width: 100%; max-width: 300px; justify-content: center; }
        }

        @media (max-width: 480px) {
          .section-spacer { height: 18px; }
          .article-hero h1 { font-size: 22px; }
          .article-hero .article-meta { font-size: 12px; gap: 12px; }
          .article-hero .article-excerpt { font-size: 14px; }
          .article-content h2 { font-size: 20px; }
          .article-content h3 { font-size: 17px; }
          .article-content p, .article-content ul li, .article-content ol li { font-size: 14px; }
          .article-content .article-image-placeholder { height: 120px; font-size: 28px; }
          .article-content .highlight-box { padding: 14px 16px; }
          
          .author-box { padding: 18px; }
          .author-box .avatar { width: 50px; height: 50px; font-size: 22px; }
          .author-box h4 { font-size: 16px; }
          
          .cta-final { padding: 28px 0; }
          .cta-final h2 { font-size: 20px; }
          .cta-final p { font-size: 13px; }
        }
      `}</style>
    </>
  );
}