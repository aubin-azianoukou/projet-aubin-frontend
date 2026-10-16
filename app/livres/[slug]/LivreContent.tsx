"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import BookPrice from '@/components/BookPrice';
import {
  livreConfig,
  packIntegral,
  boutiqueChariow,
  whatsappAubin,
  librairieJeunesse,
  mercuryLibrairie,
} from '@/lib/livre-config';

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyscbtJ9-7CxGQHp2yKNOIbDm2Hg0U7ofeXF2P9-BrW9kUD63hD3slJdYhtGzHKzNA/exec';

interface LivreContentProps {
  livre: any;
  slug: string;
  localCoverImages: Record<string, string>;
  localThumbnailImages: Record<string, string[]>;
}

function getCitationText(citation: any): string {
  if (typeof citation === 'string') return citation;
  if (citation?.Citation) return citation.Citation;
  if (citation?.citation) return citation.citation;
  if (citation?.Texte) return citation.Texte;
  if (citation?.texte) return citation.texte;
  if (citation?.contenu) return citation.contenu;
  if (citation?.text) return citation.text;
  return '';
}

function getCitationAuteur(citation: any): string {
  if (typeof citation === 'string') return '';
  if (citation?.Auteur) return citation.Auteur;
  if (citation?.auteur) return citation.auteur;
  if (citation?.author) return citation.author;
  return '';
}

function extractListFromBlocks(blocks: any): string[] {
  if (!blocks) return [];
  if (typeof blocks === 'string') return [blocks];

  if (Array.isArray(blocks)) {
    return blocks.flatMap((block: any) => extractListFromBlocks(block)).filter(Boolean);
  }

  if (typeof blocks === 'object') {
    if (blocks.type === 'list') {
      const items = blocks.children?.map((child: any) => {
        const text = child.children?.map((c: any) => c.text || '').join('') || '';
        return text;
      }).filter(Boolean) || [];
      return items;
    }
    if (blocks.text) return [blocks.text];
    if (blocks.children) {
      return blocks.children.flatMap((child: any) => extractListFromBlocks(child)).filter(Boolean);
    }
  }

  return [];
}

export default function LivreContent({
  livre,
  slug,
  localCoverImages,
  localThumbnailImages,
}: LivreContentProps) {
  const [selectedThumbIndex, setSelectedThumbIndex] = useState(0);
  const [showThumbnail, setShowThumbnail] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFormat, setDrawerFormat] = useState<'papier' | 'numerique'>('papier');

  const [isExtraitModalOpen, setIsExtraitModalOpen] = useState(false);
  const [extraitNom, setExtraitNom] = useState('');
  const [extraitEmail, setExtraitEmail] = useState('');
  const [extraitWhatsApp, setExtraitWhatsApp] = useState('');
  const [extraitRgpd, setExtraitRgpd] = useState(false);
  const [isSubmittingExtrait, setIsSubmittingExtrait] = useState(false);
  const [isExtraitSuccess, setIsExtraitSuccess] = useState(false);

  const config = livreConfig[slug] || {
    lienChariow: '',
    prixBarrePDF: '',
    badgePromo: '',
  };

  const coverUrl = livre.Maquette_Couverture?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${livre.Maquette_Couverture.url}`
    : localCoverImages[slug] || null;

  const thumbnails = localThumbnailImages[slug] || [];
  const titre = livre.Titre || livre.titre || 'Titre non disponible';

  const displayImage = showThumbnail && thumbnails.length > 0
    ? thumbnails[selectedThumbIndex]
    : coverUrl;

  const isThumbnailMode = showThumbnail && thumbnails.length > 0;

  const nextThumb = () => {
    if (thumbnails.length === 0) return;
    setShowThumbnail(true);
    setSelectedThumbIndex((prev) => (prev + 1) % thumbnails.length);
  };

  const prevThumb = () => {
    if (thumbnails.length === 0) return;
    setShowThumbnail(true);
    setSelectedThumbIndex((prev) => (prev - 1 + thumbnails.length) % thumbnails.length);
  };

  const selectThumb = (index: number) => {
    setShowThumbnail(true);
    setSelectedThumbIndex(index);
  };

  const resetToCover = () => {
    setShowThumbnail(false);
  };

  const openDrawer = (format: 'papier' | 'numerique') => {
    setDrawerFormat(format);
    setIsDrawerOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    document.body.style.overflow = '';
  };

  // Calcul de l'URL de l'extrait (AVANT le modal)
  let extraitUrl: string | null = null;
  if (livre.Extrait_Gratuit) {
    if (Array.isArray(livre.Extrait_Gratuit) && livre.Extrait_Gratuit.length > 0) {
      extraitUrl = livre.Extrait_Gratuit[0]?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${livre.Extrait_Gratuit[0].url}`
        : null;
    } else if (!Array.isArray(livre.Extrait_Gratuit) && livre.Extrait_Gratuit?.url) {
      extraitUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${livre.Extrait_Gratuit.url}`;
    }
  }

  const openExtraitModal = () => {
    setIsExtraitModalOpen(true);
    setIsExtraitSuccess(false);
    setExtraitNom('');
    setExtraitEmail('');
    setExtraitWhatsApp('');
    setExtraitRgpd(false);
  };

  const closeExtraitModal = () => {
    setIsExtraitModalOpen(false);
    setIsExtraitSuccess(false);
  };

  const handleExtraitSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!extraitNom.trim() || !extraitEmail.trim() || !extraitWhatsApp.trim()) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    if (!extraitRgpd) {
      alert('Veuillez accepter d\'être recontacté pour recevoir votre extrait.');
      return;
    }

    setIsSubmittingExtrait(true);

    const messageWhatsApp = `Bonjour Aubin,

Je viens de télécharger l'extrait gratuit du livre "${titre}" :

👤 *Nom :* ${extraitNom}
📧 *Email :* ${extraitEmail}
📱 *WhatsApp :* ${extraitWhatsApp}

Je souhaite en savoir plus sur ce livre.

Merci !`;

    const whatsappUrl = `${whatsappAubin}?text=${encodeURIComponent(messageWhatsApp)}`;

    // Envoi vers Google Sheets
    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'extrait',
          nom: extraitNom,
          email: extraitEmail,
          telephone: extraitWhatsApp,
          livre: titre,
          slug: slug,
          rgpd: extraitRgpd ? 'Oui' : 'Non',
        }),
      });
    } catch (error) {
      console.error('Erreur Google Sheets:', error);
    }

    // ⭐ TÉLÉCHARGEMENT AUTOMATIQUE DU PDF
    if (extraitUrl) {
      const link = document.createElement('a');
      link.href = extraitUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = `Extrait - ${titre}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Ouvrir WhatsApp dans un nouvel onglet
    window.open(whatsappUrl, '_blank');

    // Marquer comme succès (modal reste ouvert)
    setIsSubmittingExtrait(false);
    setIsExtraitSuccess(true);
  };

  const messageWhatsAppPapier = encodeURIComponent(
    `Bonjour Aubin, je souhaite commander le livre "${titre}" en version papier (${livre.Prix_Papier} FCFA).`
  );

  return (
    <main className="book-detail-page">
      <nav className="breadcrumb">
        <div className="container">
          <Link href="/" className="breadcrumb-link">Accueil</Link>
          <span className="breadcrumb-separator">›</span>
          <Link href="/ressources" className="breadcrumb-link">Ressources</Link>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-current">{titre}</span>
        </div>
      </nav>

      <section className="book-hero">
        <div className="container">
          <div className="book-hero-grid">
            <div className="book-cover-section">
              {thumbnails.length > 0 && (
                <div className="thumbnails-wrapper">
                  <button className="thumb-btn thumb-prev" onClick={prevThumb} aria-label="Précédent">
                    ‹
                  </button>
                  <div className="thumbnails-container">
                    {thumbnails.map((thumb, index) => (
                      <div
                        key={index}
                        className={`thumbnail-item ${index === selectedThumbIndex && showThumbnail ? 'active' : ''}`}
                        onClick={() => selectThumb(index)}
                      >
                        <Image
                          src={thumb}
                          alt={`${titre} - vue ${index + 1}`}
                          width={80}
                          height={120}
                          className="thumbnail-image"
                        />
                      </div>
                    ))}
                  </div>
                  <button className="thumb-btn thumb-next" onClick={nextThumb} aria-label="Suivant">
                    ›
                  </button>
                </div>
              )}

              <div className="book-cover-wrapper">
                <div
                  className={`book-cover-container ${isThumbnailMode ? 'thumbnail-mode' : ''}`}
                  onClick={isThumbnailMode ? resetToCover : undefined}
                  style={{ cursor: isThumbnailMode ? 'pointer' : 'default' }}
                >
                  {displayImage ? (
                    <Image
                      src={displayImage}
                      alt={titre}
                      width={isThumbnailMode ? 400 : 600}
                      height={isThumbnailMode ? 600 : 400}
                      className="book-cover-image"
                      priority
                      sizes="(max-width: 768px) 300px, 600px"
                    />
                  ) : (
                    <div className="book-cover-placeholder">
                      <span>{titre}</span>
                    </div>
                  )}
                  {livre.badge && (
                    <span className="book-badge">{livre.badge}</span>
                  )}
                  {isThumbnailMode && (
                    <span className="thumbnail-hint">Cliquez pour revenir à la couverture</span>
                  )}
                </div>
              </div>
            </div>

            <div className="book-info-wrapper">
              <h1 className="book-title">{titre}</h1>
              {livre.sous_titre && <h2 className="book-subtitle">{livre.sous_titre}</h2>}
              {livre.Auteur && <p className="book-author">Par <span>{livre.Auteur}</span></p>}
              {livre.Description && <p className="book-description">{livre.Description}</p>}

              <div className="book-prices">
                {livre.Prix_Papier && (
                  <div className="price-item">
                    <span className="price-label">📖 Papier</span>
                    <BookPrice prix={livre.Prix_Papier} size="medium" />
                  </div>
                )}
                {livre.Prix_PDF && (
                  <div className="price-item">
                    <span className="price-label">📄 PDF</span>
                    <BookPrice
                      prix={config.prixBarrePDF || livre.Prix_PDF}
                      prixPromo={livre.Prix_PDF}
                      badge={config.badgePromo}
                      size="medium"
                    />
                  </div>
                )}
              </div>

              <p className="buy-section-title">Commander selon votre format</p>

              <div className="book-buttons-group">
                <button
                  className="btn-buy btn-papier"
                  onClick={() => openDrawer('papier')}
                >
                  <span>📖</span> Papier - {livre.Prix_Papier} FCFA
                </button>

                <button
                  className="btn-buy btn-numerique"
                  onClick={() => openDrawer('numerique')}
                >
                  <span>📄</span> Numérique - {livre.Prix_PDF} FCFA
                  {config.badgePromo && (
                    <span className="btn-badge">{config.badgePromo}</span>
                  )}
                </button>

                {extraitUrl && (
                  <button
                    onClick={openExtraitModal}
                    className="btn-buy btn-extrait"
                  >
                    <span>📖</span> Télécharger un extrait gratuit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`} onClick={closeDrawer}></div>

      <div className={`buy-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-content">
          <div className="drawer-header">
            <h2 className="drawer-title">
              {drawerFormat === 'papier' ? '📖 Livre papier' : '📄 Livre numérique'}
            </h2>
            <button className="drawer-close" onClick={closeDrawer}>✕</button>
          </div>

          <div className="format-selector">
            <button
              className={`format-tab ${drawerFormat === 'papier' ? 'active' : ''}`}
              onClick={() => setDrawerFormat('papier')}
            >
              📖 Papier
            </button>
            <button
              className={`format-tab ${drawerFormat === 'numerique' ? 'active' : ''}`}
              onClick={() => setDrawerFormat('numerique')}
            >
              📄 Numérique
            </button>
          </div>

          {drawerFormat === 'papier' && (
            <div className="format-panel">
              <p className="price-display">
                <strong>{livre.Prix_Papier} FCFA</strong>
              </p>

              <div className="buy-section">
                <h3>Commander en ligne</h3>
                <div className="retailer-grid retailer-grid-3">
                  <a
                    href={`${whatsappAubin}?text=${messageWhatsAppPapier}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retailer-card"
                  >
                    <div className="retailer-logo retailer-site">
                      <Image
                        src="/images/logos/aubinromain-logo.png"
                        alt="Aubin Romain"
                        width={40}
                        height={40}
                        className="retailer-logo-img aubin-logo"
                      />
                    </div>
                    <span className="retailer-name">Aubin Romain</span>
                  </a>

                  <a href="#" target="_blank" rel="noopener noreferrer" className="retailer-card">
                    <div className="retailer-logo retailer-amazon">
                      <Image
                        src="/images/logos/amazon-logo.png"
                        alt="Amazon KDP"
                        width={40}
                        height={40}
                        className="retailer-logo-img"
                      />
                    </div>
                    <span className="retailer-name">Amazon</span>
                  </a>

                  <a href={librairieJeunesse.lien} target="_blank" rel="noopener noreferrer" className="retailer-card">
                    <div className="retailer-logo retailer-librairie">
                      <Image
                        src="/images/logos/Librairie jeunesse d'afrique-logo.png"
                        alt="Librairie Jeunesse d'Afrique"
                        width={40}
                        height={40}
                        className="retailer-logo-img"
                      />
                    </div>
                    <span className="retailer-name">Librairie Jeunesse</span>
                  </a>

                  <a href={mercuryLibrairie.lien} target="_blank" rel="noopener noreferrer" className="retailer-card">
                    <div className="retailer-logo retailer-mercury">
                      <Image
                        src="/images/logos/mercury-logo.png"
                        alt="Mercury Librairie"
                        width={40}
                        height={40}
                        className="retailer-logo-img"
                      />
                    </div>
                    <span className="retailer-name">Mercury Librairie</span>
                  </a>
                </div>
              </div>

              <div className="buy-section">
                <h3>Où trouver le livre ?</h3>
                <div className="librairies-info">
                  <div className="librairie-info-card">
                    <h4>📚 Librairie Jeunesse d'Afrique</h4>
                    <p>📍 {librairieJeunesse.adresse}</p>
                    <p>📞 {librairieJeunesse.telephone}</p>
                    <p>📧 {librairieJeunesse.email}</p>
                  </div>
                  <div className="librairie-info-card">
                    <h4>📚 Mercury Librairie</h4>
                    <p>📍 {mercuryLibrairie.adresse}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {drawerFormat === 'numerique' && (
            <div className="format-panel">
              <p className="price-display">
                <strong>{livre.Prix_PDF} FCFA</strong>
                {config.badgePromo && (
                  <span className="badge-promo-display">{config.badgePromo}</span>
                )}
              </p>

              <div className="buy-section">
                <h3>Commander le PDF sécurisé</h3>
                <div className="retailer-grid retailer-grid-2">
                  <a href={config.lienChariow || '#'} target="_blank" rel="noopener noreferrer" className="retailer-card">
                    <div className="retailer-logo retailer-chariow">
                      <Image
                        src="/images/logos/chariow-logo.png"
                        alt="Chariow"
                        width={40}
                        height={40}
                        className="retailer-logo-img chariow-logo-color"
                      />
                    </div>
                    <span className="retailer-name">Chariow</span>
                  </a>

                  <a
                    href={`${whatsappAubin}?text=${encodeURIComponent(
                      `Bonjour Aubin, je souhaite commander le PDF du livre "${titre}" (${livre.Prix_PDF} FCFA).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="retailer-card"
                  >
                    <div className="retailer-logo" style={{ background: '#25D366' }}>
                      <span style={{ color: 'white', fontSize: '20px' }}>💬</span>
                    </div>
                    <span className="retailer-name">WhatsApp</span>
                  </a>
                </div>
              </div>

              <div className="buy-section">
                <h3>🎁 Économisez encore plus</h3>
                <a
                  href={packIntegral.lienChariow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pack-card"
                >
                  <div className="pack-badge">{packIntegral.badge}</div>
                  <div className="pack-title">Pack Intégral — Les 5 livres</div>
                  <div className="pack-prix">
                    <span className="pack-prix-barre">{packIntegral.prixNormal} FCFA</span>
                    <span className="pack-prix-promo">{packIntegral.prix} FCFA</span>
                  </div>
                </a>
              </div>

              <div className="buy-section">
                <a
                  href={boutiqueChariow}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-voir-boutique"
                >
                  🛒 Voir tous mes livres
                </a>
              </div>

              <div className="buy-section">
                <h3>Sécurisé</h3>
                <p className="secure-note">🔐 Paiement sécurisé • Téléchargement immédiat</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {isExtraitModalOpen && (
        <div className="extrait-modal-overlay" onClick={closeExtraitModal}>
          <div className="extrait-modal" onClick={(e) => e.stopPropagation()}>
            <button className="extrait-modal-close" onClick={closeExtraitModal}>✕</button>

            {!isExtraitSuccess ? (
              <>
                <div className="extrait-modal-header">
                  <h2 className="extrait-modal-title">📖 Recevez votre extrait gratuit</h2>
                  <p className="extrait-modal-subtitle">
                    Téléchargez les premières pages de <strong>{titre}</strong>
                  </p>
                </div>

                <form className="extrait-modal-form" onSubmit={handleExtraitSubmit}>
                  <div className="extrait-form-group">
                    <label htmlFor="extraitNom">Nom complet *</label>
                    <input
                      type="text"
                      id="extraitNom"
                      value={extraitNom}
                      onChange={(e) => setExtraitNom(e.target.value)}
                      placeholder="Votre nom et prénom"
                      required
                    />
                  </div>

                  <div className="extrait-form-group">
                    <label htmlFor="extraitEmail">Email *</label>
                    <input
                      type="email"
                      id="extraitEmail"
                      value={extraitEmail}
                      onChange={(e) => setExtraitEmail(e.target.value)}
                      placeholder="votre@email.com"
                      required
                    />
                  </div>

                  <div className="extrait-form-group">
                    <label htmlFor="extraitWhatsApp">WhatsApp *</label>
                    <input
                      type="tel"
                      id="extraitWhatsApp"
                      value={extraitWhatsApp}
                      onChange={(e) => setExtraitWhatsApp(e.target.value)}
                      placeholder="+226 70 00 00 00"
                      required
                    />
                  </div>

                  <div className="extrait-form-rgpd">
                    <input
                      type="checkbox"
                      id="extraitRgpd"
                      checked={extraitRgpd}
                      onChange={(e) => setExtraitRgpd(e.target.checked)}
                      required
                    />
                    <label htmlFor="extraitRgpd">
                      J'accepte de recevoir l'extrait et d'être recontacté par email ou WhatsApp.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="extrait-submit-btn"
                    disabled={isSubmittingExtrait}
                  >
                    {isSubmittingExtrait ? (
                      <>⏳ Envoi en cours...</>
                    ) : (
                      <>📥 Recevoir mon extrait</>
                    )}
                  </button>

                  <p className="extrait-form-footer">
                    🔒 Vos données sont protégées et confidentielles
                  </p>
                </form>
              </>
            ) : (
              <div className="extrait-success">
                <div className="extrait-success-icon">✅</div>
                <h3>Merci {extraitNom} !</h3>
                <p>Votre extrait est en cours de téléchargement.</p>
                {extraitUrl && (
                  <a
                    href={extraitUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="extrait-download-btn"
                    download
                  >
                    📥 Télécharger à nouveau
                  </a>
                )}
                <button
                  className="extrait-close-btn"
                  onClick={closeExtraitModal}
                >
                  Fermer
                </button>
                <p className="extrait-success-footer">
                  Un message WhatsApp vous a été envoyé.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="book-content container">
        {livre.hero_titre && (
          <div className="content-block hero-block">
            <h2 className="content-title">{livre.hero_titre}</h2>
            {livre.hero_sous_titre && <p className="content-subtitle">{livre.hero_sous_titre}</p>}
            {livre.hero_description && <p className="content-text">{livre.hero_description}</p>}
          </div>
        )}

        {livre.presentation_titre && livre.presentation_texte && (
          <div className="content-block presentation-block">
            <h3 className="content-title">{livre.presentation_titre}</h3>
            <p className="content-text">{livre.presentation_texte}</p>
          </div>
        )}

        {livre.mission_titre && livre.mission_texte && (
          <div className="content-block mission-block">
            <h3 className="content-title">{livre.mission_titre}</h3>
            <p className="content-text">{livre.mission_texte}</p>
          </div>
        )}

        {livre.pourquoi_liste && livre.pourquoi_liste.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">✅ Pourquoi ce livre ?</h3>
            <ul className="content-list">
              {livre.pourquoi_liste.map((item: any, index: number) => {
                const text = item.raison || item.pourquoi || item.texte || '';
                if (!text) return null;
                return (
                  <li key={index} className="content-list-item">
                    <span className="list-icon">✓</span>
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {livre.public_liste && livre.public_liste.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">🎯 À qui s'adresse ce livre ?</h3>
            <ul className="content-list">
              {livre.public_liste.map((item: any, index: number) => {
                const text = item.public || item.cible || item.texte || '';
                if (!text) return null;
                return (
                  <li key={index} className="content-list-item">
                    <span className="list-icon">🎯</span>
                    <span>{text}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {livre.volet_livre && livre.volet_livre.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">📚 Les piliers du livre</h3>
            <div className="piliers-grid">
              {livre.volet_livre.map((item: any, index: number) => {
                const titreVolet = item.Titre || '';
                const texteVolet = item.Texte || '';
                const listeItems = item.Liste || [];

                return (
                  <div key={index} className="pilier-card">
                    {titreVolet && <h4 className="pilier-title">{titreVolet}</h4>}
                    {texteVolet && <p className="pilier-text">{texteVolet}</p>}
                    {listeItems && Array.isArray(listeItems) && listeItems.length > 0 && (
                      <ul className="pilier-list">
                        {listeItems.map((point: any, i: number) => {
                          const pointText = typeof point === 'string' ? point : point.text || point.titre || '';
                          if (!pointText) return null;
                          return (
                            <li key={i} className="pilier-list-item">• {pointText}</li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {livre.Contenu_liste && livre.Contenu_liste.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">📖 Contenu du livre</h3>
            <div className="contenu-list">
              {livre.Contenu_liste
                .filter((item: any) => item.Pilier || item.Chapitre || item.Description)
                .map((item: any, index: number) => {
                  const ordre = item.Ordre || String(index + 1);
                  const pilier = item.Pilier || '';
                  const chapitre = item.Chapitre || '';
                  const description = item.Description || '';

                  return (
                    <div key={index} className="contenu-item">
                      <span className="contenu-order">{ordre}</span>
                      <div className="contenu-info">
                        {pilier && <h4 className="contenu-pilier">{pilier}</h4>}
                        {chapitre && <p className="contenu-chapitre">{chapitre}</p>}
                        {description && <p className="contenu-description">{description}</p>}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {livre.Ressource_pratique && livre.Ressource_pratique.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">🛠️ Ressources pratiques</h3>
            <div className="ressources-grid">
              {livre.Ressource_pratique.map((item: any, index: number) => {
                const nom_outil = item.nom_outil || '';
                const chapitre = item.Chapitre || '';
                const description = item.Description || '';

                return (
                  <div key={index} className="ressource-card">
                    <h4 className="ressource-name">{nom_outil || `Outil ${index + 1}`}</h4>
                    {chapitre && <p className="ressource-chapitre">📖 {chapitre}</p>}
                    {description && <p className="ressource-description">{description}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {livre.raison && livre.raison.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">💡 Raisons de ce livre</h3>
            <ul className="content-list">
              {livre.raison.map((item: any, index: number) => {
                const items = extractListFromBlocks(item.Texte);
                if (!items || items.length === 0) return null;
                return items.map((line: string, i: number) => (
                  <li key={`${index}-${i}`} className="content-list-item">
                    <span className="list-icon">✦</span>
                    <span>{line}</span>
                  </li>
                ));
              })}
            </ul>
          </div>
        )}

        {livre.public && livre.public.length > 0 && (
          <div className="content-block">
            <h3 className="content-title">👥 Public cible</h3>
            <ul className="content-list">
              {livre.public.map((item: any, index: number) => {
                const items = extractListFromBlocks(item.Texte);
                if (!items || items.length === 0) return null;
                return items.map((line: string, i: number) => (
                  <li key={`${index}-${i}`} className="content-list-item">
                    <span className="list-icon">👤</span>
                    <span>{line}</span>
                  </li>
                ));
              })}
            </ul>
          </div>
        )}

        {(livre.annee_publication || livre.statut || livre.format || livre.ISBN_Papier || livre.ISBN_PDF || livre.informations_pratiques) && (
          <div className="content-block infos-block">
            <h3 className="content-title">📋 Informations pratiques</h3>
            <div className="infos-grid">
              {livre.annee_publication && <span>📅 Année : {livre.annee_publication}</span>}
              {livre.statut && <span>📖 Statut : {livre.statut}</span>}
              {livre.format && <span>📄 Format : {livre.format}</span>}
              {livre.ISBN_Papier && <span>📚 ISBN Papier : {livre.ISBN_Papier}</span>}
              {livre.ISBN_PDF && <span>📚 ISBN PDF : {livre.ISBN_PDF}</span>}
              {livre.Editeur && <span>🏷️ Éditeur : {livre.Editeur}</span>}
              {livre.informations_pratiques && livre.informations_pratiques.map((info: any, idx: number) => (
                <span key={idx}>
                  {info.Nom} : {info.Valeur}
                </span>
              ))}
            </div>
          </div>
        )}

        {livre.soutien_citation && livre.soutien_citation.length > 0 && (
          <div className="content-block soutien-block">
            <h3 className="content-title">🔖 Soutien</h3>
            {livre.soutien_citation.map((item: any, index: number) => {
              const text = getCitationText(item);
              const auteur = getCitationAuteur(item);
              if (!text) return null;
              return (
                <div key={index} className="citation-block">
                  <blockquote className="citation-text">"{text}"</blockquote>
                  {auteur && <p className="citation-auteur">— {auteur}</p>}
                </div>
              );
            })}
          </div>
        )}

        {livre.Citation_Item && livre.Citation_Item.length > 0 && (
          <div className="content-block citations-block">
            <h3 className="content-title">🗣️ Citations</h3>
            <div className="citations-list">
              {livre.Citation_Item.map((citation: any, index: number) => {
                const citationText = getCitationText(citation);
                const citationAuteur = getCitationAuteur(citation);
                if (!citationText) return null;
                return (
                  <blockquote key={index} className="citation-item">
                    <p className="citation-text">"{citationText}"</p>
                    {citationAuteur && (
                      <footer className="citation-auteur">— {citationAuteur}</footer>
                    )}
                  </blockquote>
                );
              })}
            </div>
          </div>
        )}

        {livre.Auteur && (
          <div className="content-block author-block">
            <h3 className="content-title">👤 Auteur</h3>
            <p className="content-text">{livre.Auteur}</p>
          </div>
        )}

        {livre.auteur_bio && (
          <div className="content-block bio-block">
            <h3 className="content-title">📝 À propos de l'auteur</h3>
            <p className="content-text">{livre.auteur_bio}</p>
          </div>
        )}

        {livre.Avis_Item && livre.Avis_Item.length > 0 && (
          <div className="content-block avis-block">
            <h3 className="content-title">💬 Témoignages</h3>
            <div className="avis-grid">
              {livre.Avis_Item.map((avis: any, index: number) => {
                const nom = avis.Nom || 'Anonyme';
                const texte = avis.Texte || '';
                const changement = avis.Changement || '';
                const resultat = avis.Resultat || '';
                return (
                  <div key={index} className="avis-card">
                    <p className="avis-nom">{nom}</p>
                    {texte && <p className="avis-texte">"{texte}"</p>}
                    {changement && <p className="avis-changement">✨ {changement}</p>}
                    {resultat && <p className="avis-resultat">📈 {resultat}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {livre.Table_Matieres && (
          <div className="content-block table-block">
            <h3 className="content-title">📑 Table des matières</h3>
            <div className="table-content">
              {typeof livre.Table_Matieres === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: livre.Table_Matieres }} />
              ) : (
                <div>
                  {livre.Table_Matieres.map((item: any, index: number) => {
                    let text = '';
                    if (typeof item === 'string') text = item;
                    else if (item.children) {
                      text = item.children.map((child: any) => child.text || '').join('');
                    } else if (item.text) text = item.text;
                    else if (item.titre) text = item.titre;
                    if (!text || text.trim() === '' || text === '{}' || text === 'text') return null;
                    return (
                      <div key={index} className="table-item">
                        <p>{text}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style>{`
        :root {
          --color-navy: #06172f;
          --color-gold: #d4af37;
          --color-cream: #f8f5ee;
          --color-white: #ffffff;
          --color-gray: #6c7280;
          --font-serif: 'Playfair Display', serif;
        }

        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .breadcrumb { background: var(--color-cream); padding: 16px 0; border-bottom: 1px solid rgba(6,23,47,0.06); }
        .breadcrumb-link { color: var(--color-navy); text-decoration: none; font-size: 14px; }
        .breadcrumb-link:hover { color: var(--color-gold); }
        .breadcrumb-separator { margin: 0 8px; color: var(--color-gray); font-size: 14px; }
        .breadcrumb-current { color: var(--color-gray); font-size: 14px; }

        .book-hero { background: var(--color-white); padding: 40px 0 50px 0; border-bottom: 1px solid rgba(6,23,47,0.06); }
        .book-hero-grid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 50px; align-items: start; }

        .book-cover-section { display: flex; gap: 16px; align-items: flex-start; }
        .thumbnails-wrapper { display: flex; flex-direction: column; align-items: center; gap: 8px; flex-shrink: 0; }
        .thumbnails-container { display: flex; flex-direction: column; gap: 8px; max-height: 500px; overflow-y: auto; padding: 4px; }
        .thumbnails-container::-webkit-scrollbar { width: 4px; }
        .thumbnails-container::-webkit-scrollbar-track { background: var(--color-cream); border-radius: 4px; }
        .thumbnails-container::-webkit-scrollbar-thumb { background: var(--color-gold); border-radius: 4px; }
        .thumbnail-item { width: 80px; height: 120px; border-radius: 6px; overflow: hidden; border: 2px solid transparent; flex-shrink: 0; cursor: pointer; transition: all 0.3s; }
        .thumbnail-item:hover { border-color: var(--color-gold); transform: scale(1.05); }
        .thumbnail-item.active { border-color: var(--color-gold); box-shadow: 0 0 20px rgba(212,175,55,0.3); }
        .thumbnail-image { width: 100%; height: 100%; object-fit: cover; }

        .thumb-btn { background: var(--color-cream); border: 1px solid rgba(6,23,47,0.1); border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 16px; color: var(--color-navy); transition: all 0.3s; flex-shrink: 0; }
        .thumb-btn:hover { background: var(--color-gold); color: var(--color-white); border-color: var(--color-gold); }

        .book-cover-wrapper { display: flex; justify-content: center; flex: 1; }
        .book-cover-container { position: relative; width: 100%; max-width: 500px; aspect-ratio: 3/2; border-radius: 12px; overflow: hidden; box-shadow: 0 20px 60px rgba(6,23,47,0.15); background: var(--color-cream); transition: all 0.3s; }
        .book-cover-container:hover { transform: translateY(-4px); box-shadow: 0 30px 80px rgba(6,23,47,0.2); }
        .book-cover-container.thumbnail-mode { aspect-ratio: 2/3; max-width: 380px; }

        .book-cover-image { width: 100%; height: 100%; object-fit: cover; }
        .book-cover-placeholder { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, var(--color-cream), #e8e3d8); color: var(--color-gray); font-weight: 600; }
        .book-badge { position: absolute; top: 16px; right: 16px; background: var(--color-gold); color: var(--color-navy); padding: 4px 14px; border-radius: 9999px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
        .thumbnail-hint { position: absolute; bottom: 16px; left: 50%; transform: translateX(-50%); background: rgba(6,23,47,0.8); color: white; padding: 6px 16px; border-radius: 9999px; font-size: 11px; font-weight: 500; opacity: 0; transition: opacity 0.3s; white-space: nowrap; }
        .book-cover-container.thumbnail-mode:hover .thumbnail-hint { opacity: 1; }

        .book-info-wrapper { display: flex; flex-direction: column; gap: 16px; }
        .book-title { font-family: var(--font-serif); font-size: 36px; font-weight: 700; color: var(--color-navy); margin: 0; }
        .book-subtitle { font-size: 18px; color: var(--color-gray); margin: 0; }
        .book-author { font-size: 15px; color: var(--color-gray); margin: 0; }
        .book-author span { color: var(--color-navy); font-weight: 600; }
        .book-description { font-size: 16px; color: var(--color-gray); line-height: 1.7; margin: 0; }

        .book-prices { display: flex; gap: 32px; padding: 12px 0; border-top: 1px solid rgba(6,23,47,0.08); border-bottom: 1px solid rgba(6,23,47,0.08); flex-wrap: wrap; }
        .price-item { display: flex; flex-direction: column; gap: 6px; }
        .price-label { font-size: 12px; color: var(--color-gray); font-weight: 500; }

        .buy-section-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--color-gray);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin: 4px 0 0 0;
          text-align: left;
        }

        .book-buttons-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 280px;
          margin: 0;
        }

        .btn-buy {
          border: none;
          padding: 12px 20px;
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          text-decoration: none;
          color: white;
          transition: transform 0.3s, box-shadow 0.3s;
          font-family: inherit;
          cursor: pointer;
          min-width: 180px;
          white-space: nowrap;
          position: relative;
        }
        .btn-buy:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.15); }

        .btn-papier { background: var(--color-navy); }
        .btn-papier:hover { background: #0a1f3a; }

        .btn-numerique { background: #1a7a3a; }
        .btn-numerique:hover { background: #14682f; }

        .btn-badge {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 2px 8px;
          border-radius: 9999px;
          font-size: 10px;
          font-weight: 700;
          margin-left: 6px;
        }

        .btn-extrait {
          background: transparent;
          color: var(--color-navy);
          border: 1px dashed var(--color-gold);
        }
        .btn-extrait:hover {
          background: var(--color-cream);
          border-color: var(--color-navy);
          box-shadow: none;
        }

        .drawer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(6, 23, 47, 0.6);
          backdrop-filter: blur(4px);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.3s ease, visibility 0.3s ease;
        }

        .drawer-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .buy-drawer {
          position: fixed;
          top: 0;
          right: 0;
          width: 420px;
          max-width: 90vw;
          height: 100%;
          background: #FFF9EF;
          z-index: 1000;
          transform: translateX(100%);
          transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: -8px 0 40px rgba(6, 23, 47, 0.15);
          overflow-y: auto;
        }

        .buy-drawer.open {
          transform: translateX(0);
        }

        .drawer-content {
          padding: 24px 28px;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(6, 23, 47, 0.08);
          flex-shrink: 0;
        }

        .drawer-title {
          font-family: var(--font-serif);
          font-size: 20px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0;
        }

        .drawer-close {
          background: none;
          border: none;
          font-size: 26px;
          color: var(--color-gray);
          cursor: pointer;
          transition: color 0.3s ease;
          line-height: 1;
        }

        .drawer-close:hover {
          color: var(--color-navy);
        }

        .format-selector {
          display: flex;
          gap: 8px;
          background: #f0ebe4;
          padding: 4px;
          border-radius: 10px;
          margin: 20px 0 24px 0;
          flex-shrink: 0;
        }

        .format-tab {
          flex: 1;
          padding: 10px 12px;
          border: none;
          border-radius: 8px;
          background: transparent;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: var(--color-gray);
          font-family: inherit;
        }

        .format-tab.active {
          background: var(--color-white);
          color: var(--color-navy);
          box-shadow: 0 2px 8px rgba(6, 23, 47, 0.08);
        }

        .format-tab:hover:not(.active) {
          background: rgba(255,255,255,0.3);
        }

        .format-panel {
          flex: 1;
          overflow-y: auto;
        }

        .price-display {
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0 0 20px 0;
          padding-bottom: 16px;
          border-bottom: 1px solid rgba(6, 23, 47, 0.06);
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .badge-promo-display {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
        }

        .buy-section {
          margin-bottom: 24px;
        }

        .buy-section h3 {
          font-size: 13px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--color-gray);
          margin: 0 0 12px 0;
        }

        .retailer-grid {
          display: grid;
          gap: 8px;
        }

        .retailer-grid-3 {
          grid-template-columns: repeat(3, 1fr);
        }

        .retailer-grid-2 {
          grid-template-columns: repeat(2, 1fr);
        }

        .retailer-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          padding: 10px 4px;
          background: var(--color-white);
          border-radius: 10px;
          text-decoration: none;
          color: var(--color-navy);
          transition: all 0.3s ease;
          border: 1px solid rgba(6, 23, 47, 0.06);
          width: 100%;
          max-width: 100%;
        }

        .retailer-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(6, 23, 47, 0.08);
          border-color: var(--color-gold);
        }

        .retailer-logo {
          width: 40px;
          height: 40px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--color-cream);
          transition: all 0.3s ease;
          overflow: hidden;
          padding: 4px;
          flex-shrink: 0;
        }

        .retailer-card:hover .retailer-logo {
          transform: scale(1.05);
        }

        .retailer-logo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .retailer-site { background: #e8e3d8; }
        .retailer-amazon { background: #232f3e; }
        .retailer-chariow { background: #ffffff; border: 1px solid #e8e8e8; }
        .retailer-librairie { background: #8B4513; }
        .retailer-mercury { background: #1a5276; }

        .aubin-logo { filter: none !important; }
        .chariow-logo-color { filter: none !important; }

        .retailer-name {
          font-size: 10px;
          font-weight: 600;
          text-align: center;
          color: var(--color-gray);
          line-height: 1.1;
        }

        .librairies-info {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .librairie-info-card {
          background: var(--color-white);
          padding: 14px 16px;
          border-radius: 10px;
          border: 1px solid rgba(6, 23, 47, 0.08);
        }
        .librairie-info-card h4 {
          font-size: 13px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0 0 8px 0;
        }
        .librairie-info-card p {
          font-size: 12px;
          color: var(--color-gray);
          margin: 2px 0;
          line-height: 1.4;
        }

        .pack-card {
          display: block;
          padding: 18px 20px;
          background: linear-gradient(135deg, #f8f5ee, #e8e3d8);
          border-radius: 12px;
          text-decoration: none;
          border: 2px solid var(--color-gold);
          position: relative;
          transition: all 0.3s ease;
        }
        .pack-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(212,175,55,0.3);
        }
        .pack-badge {
          position: absolute;
          top: -10px;
          right: 16px;
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 3px 12px;
          border-radius: 9999px;
          font-size: 11px;
          font-weight: 700;
        }
        .pack-title {
          font-weight: 700;
          color: var(--color-navy);
          font-size: 14px;
          margin-bottom: 8px;
        }
        .pack-prix {
          display: flex;
          align-items: baseline;
          gap: 10px;
        }
        .pack-prix-barre {
          font-size: 12px;
          color: var(--color-gray);
          text-decoration: line-through;
        }
        .pack-prix-promo {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-gold);
        }

        .btn-voir-boutique {
          display: block;
          padding: 12px 20px;
          background: transparent;
          color: var(--color-navy);
          text-decoration: none;
          border-radius: 9999px;
          text-align: center;
          font-weight: 600;
          font-size: 13px;
          border: 1px solid var(--color-navy);
          transition: all 0.3s ease;
        }
        .btn-voir-boutique:hover {
          background: var(--color-navy);
          color: white;
        }

        .secure-note {
          font-size: 13px;
          color: var(--color-gray);
          text-align: center;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid rgba(6, 23, 47, 0.06);
        }

        .extrait-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(6, 23, 47, 0.75);
          backdrop-filter: blur(6px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .extrait-modal {
          background: var(--color-white);
          border-radius: 16px;
          padding: 32px 28px;
          max-width: 480px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow: 0 20px 60px rgba(6, 23, 47, 0.3);
          animation: slideUp 0.3s ease;
        }

        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .extrait-modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          background: none;
          border: none;
          font-size: 24px;
          color: var(--color-gray);
          cursor: pointer;
          transition: color 0.3s;
          line-height: 1;
          padding: 4px;
        }

        .extrait-modal-close:hover {
          color: var(--color-navy);
        }

        .extrait-modal-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .extrait-modal-title {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0 0 8px 0;
        }

        .extrait-modal-subtitle {
          font-size: 14px;
          color: var(--color-gray);
          margin: 0;
          line-height: 1.5;
        }

        .extrait-modal-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .extrait-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .extrait-form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--color-navy);
        }

        .extrait-form-group input {
          padding: 12px 14px;
          border: 1px solid rgba(6, 23, 47, 0.15);
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          background: var(--color-cream);
          transition: border-color 0.3s, background 0.3s;
        }

        .extrait-form-group input:focus {
          outline: none;
          border-color: var(--color-gold);
          background: var(--color-white);
        }

        .extrait-form-rgpd {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 4px;
        }

        .extrait-form-rgpd input[type="checkbox"] {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          margin-top: 2px;
          accent-color: var(--color-gold);
          cursor: pointer;
        }

        .extrait-form-rgpd label {
          font-size: 12px;
          color: var(--color-gray);
          line-height: 1.5;
          cursor: pointer;
        }

        .extrait-submit-btn {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 14px 20px;
          border: none;
          border-radius: 9999px;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.3s, transform 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 4px;
          font-family: inherit;
        }

        .extrait-submit-btn:hover:not(:disabled) {
          background: #e1bb43;
          transform: translateY(-2px);
        }

        .extrait-submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .extrait-form-footer {
          text-align: center;
          font-size: 12px;
          color: var(--color-gray);
          margin: 0;
        }

        .extrait-success {
          text-align: center;
          padding: 20px 0;
        }

        .extrait-success-icon {
          font-size: 56px;
          margin-bottom: 12px;
        }

        .extrait-success h3 {
          font-family: var(--font-serif);
          font-size: 22px;
          font-weight: 700;
          color: var(--color-navy);
          margin: 0 0 8px 0;
        }

        .extrait-success p {
          font-size: 14px;
          color: var(--color-gray);
          margin: 0 0 20px 0;
        }

        .extrait-download-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 14px 28px;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: background 0.3s, transform 0.3s;
          margin-bottom: 12px;
        }

        .extrait-download-btn:hover {
          background: #e1bb43;
          transform: translateY(-2px);
        }

        .extrait-close-btn {
          display: block;
          width: 100%;
          padding: 12px 20px;
          background: transparent;
          color: var(--color-gray);
          border: 1px solid rgba(6, 23, 47, 0.15);
          border-radius: 9999px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.3s;
          margin-top: 8px;
        }

        .extrait-close-btn:hover {
          background: var(--color-cream);
          color: var(--color-navy);
        }

        .extrait-success-footer {
          font-size: 12px;
          color: var(--color-gray);
          margin-top: 16px;
        }

        .book-content { padding: 40px 0 60px 0; }
        .content-block { margin-bottom: 40px; padding: 24px 28px; background: var(--color-white); border-radius: 12px; box-shadow: 0 2px 12px rgba(6,23,47,0.06); border: 1px solid rgba(6,23,47,0.06); }
        .content-title { font-family: var(--font-serif); font-size: 24px; font-weight: 700; color: var(--color-navy); margin: 0 0 12px 0; }
        .content-subtitle { font-size: 18px; color: var(--color-gray); margin: 0 0 8px 0; }
        .content-text { font-size: 15px; color: var(--color-gray); line-height: 1.7; margin: 0; }
        .content-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        .content-list-item { display: flex; align-items: flex-start; gap: 12px; padding: 10px 14px; background: var(--color-cream); border-radius: 8px; font-size: 15px; color: var(--color-gray); line-height: 1.6; }
        .list-icon { font-size: 18px; flex-shrink: 0; color: var(--color-gold); }

        .piliers-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .pilier-card { background: var(--color-cream); padding: 18px 20px; border-radius: 10px; border-left: 4px solid var(--color-gold); }
        .pilier-title { font-family: var(--font-serif); font-size: 18px; font-weight: 700; color: var(--color-navy); margin: 0 0 6px 0; }
        .pilier-text { font-size: 14px; color: var(--color-gray); line-height: 1.6; margin: 0 0 8px 0; }
        .pilier-list { list-style: none; padding: 0; margin: 0; }
        .pilier-list-item { font-size: 14px; color: var(--color-gray); line-height: 1.5; padding: 2px 0; }

        .contenu-list { display: flex; flex-direction: column; gap: 10px; }
        .contenu-item { display: flex; align-items: flex-start; gap: 14px; padding: 12px 16px; background: var(--color-cream); border-radius: 10px; }
        .contenu-order { background: var(--color-gold); color: var(--color-navy); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
        .contenu-pilier { font-weight: 600; color: var(--color-navy); font-size: 15px; margin: 0; }
        .contenu-chapitre { font-size: 13px; color: var(--color-gray); margin: 2px 0 0 0; }
        .contenu-description { font-size: 14px; color: var(--color-gray); margin: 4px 0 0 0; line-height: 1.5; }

        .ressources-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .ressource-card { background: var(--color-cream); padding: 16px 18px; border-radius: 10px; border: 1px solid rgba(6,23,47,0.06); }
        .ressource-name { font-weight: 600; color: var(--color-navy); font-size: 14px; margin: 0 0 4px 0; }
        .ressource-chapitre { font-size: 12px; color: var(--color-gold); margin: 0 0 6px 0; }
        .ressource-description { font-size: 13px; color: var(--color-gray); line-height: 1.5; margin: 0; }

        .infos-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 8px 16px; font-size: 14px; color: var(--color-gray); }

        .citation-block { padding: 16px 20px; background: var(--color-cream); border-radius: 10px; border-left: 4px solid var(--color-gold); margin-bottom: 12px; }
        .citation-text { font-style: italic; font-size: 16px; color: var(--color-navy); line-height: 1.6; margin: 0; }
        .citation-auteur { font-size: 14px; color: var(--color-gray); text-align: right; margin: 8px 0 0 0; }
        .citations-list { display: flex; flex-direction: column; gap: 12px; }
        .citation-item { padding: 16px 20px; background: var(--color-cream); border-radius: 10px; border-left: 4px solid var(--color-gold); margin: 0; }

        .avis-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .avis-card { background: var(--color-cream); padding: 18px 20px; border-radius: 10px; border: 1px solid rgba(6,23,47,0.06); }
        .avis-nom { font-weight: 600; color: var(--color-navy); margin: 0 0 6px 0; }
        .avis-texte { font-style: italic; font-size: 14px; color: var(--color-gray); line-height: 1.6; margin: 0 0 8px 0; }
        .avis-changement { font-size: 13px; color: var(--color-gold); margin: 0; }
        .avis-resultat { font-size: 13px; color: var(--color-navy); margin: 2px 0 0 0; }

        .table-content { max-height: 400px; overflow-y: auto; padding: 4px; }
        .table-item { padding: 6px 0; border-bottom: 1px solid rgba(6,23,47,0.06); }
        .table-item p { font-size: 14px; color: var(--color-gray); margin: 0; line-height: 1.5; }
        .table-item:last-child { border-bottom: none; }

        @media (max-width: 1024px) {
          .book-hero-grid { gap: 30px; }
          .book-title { font-size: 30px; }
          .piliers-grid { grid-template-columns: 1fr; }
          .ressources-grid { grid-template-columns: 1fr 1fr; }
          .avis-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 768px) {
          .book-hero { padding: 24px 0 32px 0; }
          .book-hero-grid { grid-template-columns: 1fr; gap: 24px; }
          .book-cover-section { flex-direction: column-reverse; align-items: center; }
          .thumbnails-wrapper { flex-direction: row; }
          .thumbnails-container { flex-direction: row; max-height: none; max-width: 280px; overflow-x: auto; overflow-y: visible; }
          .thumbnail-item { width: 60px; height: 90px; }
          .book-cover-container { max-width: 320px; margin: 0 auto; }
          .book-cover-container.thumbnail-mode { max-width: 260px; }
          .book-title { font-size: 26px; }
          .book-subtitle { font-size: 16px; }

          .book-buttons-group { max-width: 100%; }
          .btn-buy { font-size: 13px; padding: 10px 16px; white-space: normal; min-width: unset; }

          .buy-drawer { width: 100%; max-width: 100vw; }
          .drawer-content { padding: 20px; }
          .retailer-grid-3 { grid-template-columns: repeat(2, 1fr); }
          .retailer-grid-2 { grid-template-columns: repeat(2, 1fr); }
          .retailer-logo { width: 38px; height: 38px; padding: 4px; }
          .book-content { padding: 20px 0 40px 0; }
          .content-block { padding: 16px 18px; margin-bottom: 24px; }
          .content-title { font-size: 20px; }
          .piliers-grid { grid-template-columns: 1fr; }
          .ressources-grid { grid-template-columns: 1fr; }
          .avis-grid { grid-template-columns: 1fr; }
          .infos-grid { grid-template-columns: 1fr 1fr; }

          .extrait-modal { padding: 24px 20px; }
          .extrait-modal-title { font-size: 18px; }
        }

        @media (max-width: 480px) {
          .book-title { font-size: 22px; }
          .book-subtitle { font-size: 14px; }
          .book-cover-container { max-width: 260px; }
          .book-cover-container.thumbnail-mode { max-width: 200px; }

          .btn-buy { font-size: 12px; padding: 10px 14px; white-space: normal; min-width: unset; }

          .buy-section-title { font-size: 12px; }
          .buy-drawer { width: 100%; }
          .drawer-content { padding: 16px; }
          .drawer-title { font-size: 17px; }
          .price-display { font-size: 22px; }
          .retailer-grid-3 { grid-template-columns: repeat(2, 1fr); }
          .retailer-grid-2 { grid-template-columns: 1fr; }
          .retailer-card { padding: 8px 4px; }
          .retailer-logo { width: 34px; height: 34px; padding: 3px; }
          .retailer-name { font-size: 9px; }
          .content-block { padding: 14px 14px; }
          .content-title { font-size: 18px; }
          .infos-grid { grid-template-columns: 1fr; }
          .thumbnails-container { max-width: 180px; }
          .thumbnail-item { width: 50px; height: 75px; }
          .thumbnail-hint { font-size: 9px; padding: 4px 10px; white-space: normal; }

          .extrait-modal { padding: 20px 16px; }
          .extrait-modal-title { font-size: 16px; }
          .extrait-modal-subtitle { font-size: 13px; }
        }
      `}</style>
    </main>
  );
}