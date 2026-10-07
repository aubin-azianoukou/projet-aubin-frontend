"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function TelechargementsPage() {
  // ===== STATE =====
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    whatsapp: '',
    ressource: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedRessource, setSelectedRessource] = useState('');
  const [isSidebarSubmitting, setIsSidebarSubmitting] = useState(false);
  const [sidebarSuccess, setSidebarSuccess] = useState(false);

  // ===== COMPTEURS DE TÉLÉCHARGEMENTS (stockés dans localStorage) =====
  const [downloadCounts, setDownloadCounts] = useState<Record<string, number>>({
    'cv-modele': 0,
    'brochure': 0,
    'catalogue-formations': 0,
    'guide-business-plan': 0
  });

  // Charger les compteurs depuis localStorage
  useEffect(() => {
    const saved = localStorage.getItem('downloadCounts');
    if (saved) {
      try {
        setDownloadCounts(JSON.parse(saved));
      } catch {
        // Ignorer
      }
    }
  }, []);

  // Sauvegarder les compteurs dans localStorage
  const incrementDownload = (key: string) => {
    const newCounts = {
      ...downloadCounts,
      [key]: (downloadCounts[key] || 0) + 1
    };
    setDownloadCounts(newCounts);
    localStorage.setItem('downloadCounts', JSON.stringify(newCounts));
  };

  // ============================================================
  // GESTION DU FORMULAIRE PRINCIPAL
  // ============================================================
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/mqevvkya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _subject: 'Demande de téléchargement - Ressources'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nom: '',
          email: '',
          whatsapp: '',
          ressource: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ============================================================
  // GESTION DU SIDEBAR
  // ============================================================
  const openSidebar = (ressource: string) => {
    setSelectedRessource(ressource);
    setIsSidebarOpen(true);
    setSidebarSuccess(false);
    setIsSidebarSubmitting(false);
    document.body.style.overflow = 'hidden';
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    document.body.style.overflow = '';
    setSidebarSuccess(false);
    setIsSidebarSubmitting(false);
  };

  // ============================================================
  // SOUMISSION DU SIDEBAR
  // ============================================================
  const handleSidebarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const nom = (form.querySelector('#sidebarNom') as HTMLInputElement)?.value.trim();
    const email = (form.querySelector('#sidebarEmail') as HTMLInputElement)?.value.trim();
    const whatsapp = (form.querySelector('#sidebarWhatsapp') as HTMLInputElement)?.value.trim();
    const rgpd = (form.querySelector('#sidebarRgpd') as HTMLInputElement)?.checked;

    if (!nom || !email) {
      alert('Veuillez remplir tous les champs obligatoires (*)');
      return;
    }

    if (!rgpd) {
      alert('Veuillez accepter d\'être recontacté pour valider votre demande.');
      return;
    }

    setIsSidebarSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mqevvkya', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nom,
          email,
          whatsapp,
          ressource: selectedRessource,
          _subject: `Téléchargement - ${selectedRessource}`
        }),
      });

      if (response.ok) {
        // Incrémenter le compteur
        const keyMap: Record<string, string> = {
          'CV professionnel (modèle)': 'cv-modele',
          'Brochure institutionnelle': 'brochure',
          'Catalogue complet des formations': 'catalogue-formations',
          'Guide : Les 10 étapes d\'un Business Plan': 'guide-business-plan'
        };
        const key = keyMap[selectedRessource] || 'cv-modele';
        incrementDownload(key);

        setSidebarSuccess(true);
        setTimeout(() => {
          closeSidebar();
        }, 3000);
      } else {
        alert('Une erreur s\'est produite. Veuillez réessayer.');
      }
    } catch {
      alert('Une erreur s\'est produite. Veuillez réessayer.');
    } finally {
      setIsSidebarSubmitting(false);
    }
  };

  // ============================================================
  // RENDU
  // ============================================================
  return (
    <main className="telechargements-container">

      <div className="spacer-telechargements"></div>

      {/* ===== HERO ===== */}
      <section className="hero-telechargements">
        <div className="hero-telechargements-container">
          <div className="hero-telechargements-content">
            <span className="badge-gold">TÉLÉCHARGEMENTS</span>
            <h1 className="hero-telechargements-title">Ressources gratuites à télécharger</h1>
            <p className="hero-telechargements-subtitle">Des outils concrets pour vous aider à avancer</p>
            <p className="hero-telechargements-description">
              Téléchargez gratuitement des ressources utiles pour votre activité, votre projet ou votre développement professionnel.
            </p>
          </div>
          <div className="hero-telechargements-right">
            <span className="badge-gold">LEADS</span>
            <div className="mission-box-telechargements">
              <h2 className="mission-telechargements-title">Des ressources en échange de vos coordonnées</h2>
              <p className="mission-telechargements-text">Remplissez le formulaire et recevez immédiatement les documents sélectionnés. Je vous tiendrai informé des prochaines ressources et actualités.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="spacer-telechargements"></div>

      {/* ===== RESSOURCES AVEC COMPTEURS ===== */}
      <section className="section-telechargements-white">
        <div className="container-telechargements">
          <div className="section-header-telechargements">
            <span className="badge-gold">RESSOURCES</span>
            <h2 className="section-title-telechargements">Ce que vous pouvez télécharger</h2>
            <p className="section-subtitle-telechargements">Sélectionnez les ressources qui vous intéressent.</p>
          </div>

          <div className="downloads-grid-telechargements">
            {/* Ressource 1 */}
            <div className="download-card-telechargements">
              <div className="icon"><i className="fas fa-file-pdf"></i></div>
              <h3>CV professionnel (modèle)</h3>
              <p>Un modèle de CV structuré pour valoriser votre parcours, vos compétences et vos réalisations.</p>
              <div className="download-meta-telechargements">
                <span><i className="fas fa-file-alt"></i> PDF</span>
                <span><i className="fas fa-download"></i> 2.4 Mo</span>
              </div>
              <div className="download-stats">
                <i className="fas fa-download"></i> {downloadCounts['cv-modele'] || 0} téléchargements
              </div>
              <button onClick={() => openSidebar('CV professionnel (modèle)')} className="btn-gold-small-telechargements">
                <i className="fas fa-download"></i> Télécharger
              </button>
            </div>

            {/* Ressource 2 */}
            <div className="download-card-telechargements">
              <div className="icon"><i className="fas fa-file-pdf"></i></div>
              <h3>Brochure institutionnelle</h3>
              <p>Présentation complète des services, des formations et de l'accompagnement proposé par Aubin Romain AZIANOUKOU.</p>
              <div className="download-meta-telechargements">
                <span><i className="fas fa-file-alt"></i> PDF</span>
                <span><i className="fas fa-download"></i> 3.8 Mo</span>
              </div>
              <div className="download-stats">
                <i className="fas fa-download"></i> {downloadCounts['brochure'] || 0} téléchargements
              </div>
              <button onClick={() => openSidebar('Brochure institutionnelle')} className="btn-gold-small-telechargements">
                <i className="fas fa-download"></i> Télécharger
              </button>
            </div>

            {/* Ressource 3 */}
            <div className="download-card-telechargements">
              <div className="icon"><i className="fas fa-file-pdf"></i></div>
              <h3>Catalogue complet des formations</h3>
              <p>Découvrez l'ensemble des 15 formations professionnelles avec leurs objectifs, programmes et tarifs.</p>
              <div className="download-meta-telechargements">
                <span><i className="fas fa-file-alt"></i> PDF</span>
                <span><i className="fas fa-download"></i> 5.1 Mo</span>
              </div>
              <div className="download-stats">
                <i className="fas fa-download"></i> {downloadCounts['catalogue-formations'] || 0} téléchargements
              </div>
              <button onClick={() => openSidebar('Catalogue complet des formations')} className="btn-gold-small-telechargements">
                <i className="fas fa-download"></i> Télécharger
              </button>
            </div>

            {/* Ressource 4 */}
            <div className="download-card-telechargements">
              <div className="icon"><i className="fas fa-file-pdf"></i></div>
              <h3>Guide : Les 10 étapes d'un Business Plan</h3>
              <p>Un guide pratique pour structurer votre Business Plan étape par étape, avec des exemples concrets.</p>
              <div className="download-meta-telechargements">
                <span><i className="fas fa-file-alt"></i> PDF</span>
                <span><i className="fas fa-download"></i> 1.8 Mo</span>
              </div>
              <div className="download-stats">
                <i className="fas fa-download"></i> {downloadCounts['guide-business-plan'] || 0} téléchargements
              </div>
              <button onClick={() => openSidebar('Guide : Les 10 étapes d\'un Business Plan')} className="btn-gold-small-telechargements">
                <i className="fas fa-download"></i> Télécharger
              </button>
            </div>
          </div>

          {/* ===== STATISTIQUES GLOBALES ===== */}
          <div className="stats-banner-telechargements">
            <div className="stat-item">
              <div className="number">{Object.values(downloadCounts).reduce((a, b) => a + b, 0)}</div>
              <div className="label">Téléchargements totaux</div>
            </div>
            <div className="stat-item">
              <div className="number">4</div>
              <div className="label">Ressources disponibles</div>
            </div>
            <div className="stat-item">
              <div className="number">100%</div>
              <div className="label">Gratuit</div>
            </div>
          </div>

          {/* ===== FORMULAIRE PRINCIPAL ===== */}
          <div className="form-section-telechargements" id="formulaire">
            <h2>Recevez vos ressources gratuitement</h2>
            <p>Remplissez le formulaire ci-dessous pour accéder aux téléchargements.</p>

            <form className="download-form-telechargements" onSubmit={handleSubmit}>
              <div className="form-row-telechargements">
                <div className="form-group-telechargements">
                  <label htmlFor="nom">Nom complet *</label>
                  <input 
                    type="text" 
                    id="nom" 
                    value={formData.nom}
                    onChange={handleChange}
                    placeholder="Votre nom" 
                    required 
                  />
                </div>
                <div className="form-group-telechargements">
                  <label htmlFor="email">Email *</label>
                  <input 
                    type="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com" 
                    required 
                  />
                </div>
              </div>

              <div className="form-group-telechargements">
                <label htmlFor="whatsapp">WhatsApp (optionnel)</label>
                <input 
                  type="tel" 
                  id="whatsapp" 
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="+226 XX XX XX XX" 
                />
              </div>

              <div className="form-group-telechargements">
                <label htmlFor="ressource">Ressource souhaitée *</label>
                <select id="ressource" value={formData.ressource} onChange={handleChange} required>
                  <option value="">Sélectionnez une ressource</option>
                  <option value="cv">CV professionnel (modèle)</option>
                  <option value="brochure">Brochure institutionnelle</option>
                  <option value="catalogue">Catalogue des formations</option>
                  <option value="guide">Guide Business Plan</option>
                  <option value="toutes">Toutes les ressources</option>
                </select>
              </div>

              {submitStatus === 'success' && (
                <div style={{ textAlign: 'center', color: '#28a745', marginBottom: '16px', fontWeight: 600 }}>
                  ✅ Votre demande a été envoyée ! Vous recevrez les ressources par email.
                </div>
              )}
              {submitStatus === 'error' && (
                <div style={{ textAlign: 'center', color: '#dc3545', marginBottom: '16px', fontWeight: 600 }}>
                  ❌ Une erreur s'est produite. Veuillez réessayer ou me contacter directement sur WhatsApp.
                </div>
              )}

              <button type="submit" className="btn-primary-telechargements" disabled={isSubmitting}>
                <i className="fas fa-download"></i> {isSubmitting ? 'Envoi...' : 'Télécharger'}
              </button>
            </form>
          </div>
        </div>
      </section>

      <div className="spacer-telechargements"></div>

      {/* ===== CTA WHATSAPP ===== */}
      <section className="cta-final-telechargements">
        <div className="container-cta-telechargements">
          <h2 className="cta-title-telechargements">Une question sur les ressources ?</h2>
          <p className="cta-text-telechargements">Contactez-moi directement sur WhatsApp pour toute question ou demande spécifique.</p>
          <div className="cta-group-telechargements">
            <a href="https://wa.me/22667739734" target="_blank" rel="noopener noreferrer" className="btn-gold-cta-telechargements">
              <i className="fab fa-whatsapp"></i> Contacter sur WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="spacer-telechargements"></div>

      {/* ================================================================
      SIDEBAR DE COLLECTE D'INFORMATIONS
      ================================================================ */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={closeSidebar}>
        <div className="sidebar" onClick={(e) => e.stopPropagation()}>
          <button className="sidebar-close" onClick={closeSidebar}>
            <i className="fas fa-times"></i>
          </button>

          <div className="sidebar-header">
            <span className="sidebar-badge">📥 TÉLÉCHARGEMENT</span>
            <h2>Recevez votre ressource</h2>
            <p>Remplissez le formulaire pour télécharger :</p>
            <p className="sidebar-ressource"><strong>{selectedRessource}</strong></p>
          </div>

          {!sidebarSuccess ? (
            <form className="sidebar-form" onSubmit={handleSidebarSubmit}>
              <div className="form-group">
                <label htmlFor="sidebarNom">Nom complet *</label>
                <input type="text" id="sidebarNom" placeholder="Votre nom et prénom" required />
              </div>

              <div className="form-group">
                <label htmlFor="sidebarEmail">Email *</label>
                <input type="email" id="sidebarEmail" placeholder="votre@email.com" required />
              </div>

              <div className="form-group">
                <label htmlFor="sidebarWhatsapp">WhatsApp (optionnel)</label>
                <input type="tel" id="sidebarWhatsapp" placeholder="+226 70 00 00 00" />
              </div>

              <div className="form-group-rgpd">
                <input type="checkbox" id="sidebarRgpd" required />
                <label htmlFor="sidebarRgpd">
                  J'accepte d'être recontacté par téléphone, email ou WhatsApp dans le cadre de ma demande de téléchargement.
                  <a href="#" target="_blank">En savoir plus</a>
                </label>
              </div>

              <button type="submit" className="btn-submit" disabled={isSidebarSubmitting}>
                {isSidebarSubmitting ? (
                  <><i className="fas fa-spinner fa-spin"></i> Envoi en cours...</>
                ) : (
                  <><i className="fas fa-download"></i> Télécharger maintenant</>
                )}
              </button>

              <p className="form-footer">📞 Réponse sous 24h maximum</p>
            </form>
          ) : (
            <div className="form-success active">
              <div className="success-icon"><i className="fas fa-check-circle"></i></div>
              <h3>Téléchargement disponible !</h3>
              <p>Votre demande a bien été enregistrée.<br />Vous recevrez le lien de téléchargement par email.</p>
              <button className="btn-gold-small" style={{ marginTop: '16px', padding: '10px 20px', fontSize: '14px' }} onClick={closeSidebar}>
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

        .telechargements-container { background-color: var(--color-cream); }
        .spacer-telechargements { height: 36px; background-color: var(--color-cream); }

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
        .btn-gold-small-telechargements {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 6px 14px;
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
          align-self: flex-start;
        }
        .btn-gold-small-telechargements:hover { background-color: #e1bb43; }

        .btn-primary-telechargements {
          background-color: var(--color-gold);
          color: var(--color-navy);
          padding: 12px 28px;
          border-radius: 9999px;
          font-weight: 800;
          font-size: 14px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.3s ease;
          border: none;
          cursor: pointer;
          margin-top: 6px;
        }
        .btn-primary-telechargements:hover { background-color: #e1bb43; }
        .btn-primary-telechargements:disabled { opacity: 0.6; cursor: not-allowed; }

        .btn-gold-cta-telechargements {
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
        .btn-gold-cta-telechargements:hover { background-color: #e1bb43; }

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
        }
        .btn-gold-small:hover { background-color: #e1bb43; }

        /* ===== HERO ===== */
        .hero-telechargements {
          background-color: var(--color-white);
          padding: 50px 20px 40px 20px;
          margin: 0 -20px;
        }
        .hero-telechargements-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          text-align: center;
        }
        .hero-telechargements-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
          align-items: center;
          width: 100%;
        }
        .hero-telechargements-title {
          font-family: var(--font-serif);
          font-size: 38px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .hero-telechargements-subtitle {
          font-size: 16px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.4;
          opacity: 0.8;
          margin: 0;
        }
        .hero-telechargements-description {
          font-size: 14px;
          color: var(--color-gray);
          line-height: 1.65;
          max-width: 700px;
          margin: 0;
        }
        .hero-telechargements-right {
          display: flex;
          flex-direction: column;
          gap: 14px;
          align-items: center;
          width: 100%;
        }
        .mission-box-telechargements {
          border: 1px solid rgba(6, 23, 47, 0.12);
          background-color: var(--color-cream);
          padding: 24px;
          border-radius: 20px;
          width: 100%;
          max-width: 800px;
          box-shadow: 0 4px 20px rgba(6, 23, 47, 0.06);
          text-align: center;
        }
        .mission-telechargements-title {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .mission-telechargements-text {
          margin-top: 12px;
          color: var(--color-gray);
          font-size: 14px;
          line-height: 1.65;
          margin: 0;
        }

        /* ===== SECTIONS ===== */
        .section-telechargements-white { padding: 50px 20px; margin: 0 -20px; background-color: var(--color-white); }
        .container-telechargements { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

        .section-header-telechargements { text-align: center; margin-bottom: 30px; }
        .section-title-telechargements {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin: 0;
        }
        .section-subtitle-telechargements {
          color: var(--color-gray);
          font-size: 14px;
          max-width: 760px;
          margin: 8px auto 0 auto;
        }

        /* ===== DOWNLOADS ===== */
        .downloads-grid-telechargements {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }
        .download-card-telechargements {
          background-color: var(--color-white);
          border: 1px solid rgba(6, 23, 47, 0.1);
          border-radius: 16px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: box-shadow 0.3s ease;
        }
        .download-card-telechargements:hover { box-shadow: 0 8px 30px rgba(6, 23, 47, 0.08); }
        .download-card-telechargements .icon { font-size: 32px; color: var(--color-gold); }
        .download-card-telechargements h3 { font-size: 18px; font-weight: 700; color: var(--color-navy); line-height: 1.25; margin: 0; }
        .download-card-telechargements p { color: var(--color-gray); font-size: 14px; line-height: 1.6; flex-grow: 1; margin: 0; }
        .download-meta-telechargements {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          font-size: 12px;
          color: var(--color-gray);
        }
        .download-meta-telechargements span { display: flex; align-items: center; gap: 4px; }
        .download-stats {
          font-size: 12px;
          color: var(--color-gray);
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .download-stats i { color: var(--color-gold); }

        /* ===== STATS BANNER ===== */
        .stats-banner-telechargements {
          background: var(--color-navy);
          border-radius: 16px;
          padding: 24px 20px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          text-align: center;
          color: var(--color-white);
          margin-bottom: 40px;
        }
        .stats-banner-telechargements .stat-item .number {
          font-family: var(--font-serif);
          font-size: 32px;
          font-weight: 700;
          color: var(--color-gold);
        }
        .stats-banner-telechargements .stat-item .label {
          font-size: 13px;
          color: var(--color-gray-light);
          opacity: 0.8;
        }

        /* ===== FORMULAIRE ===== */
        .form-section-telechargements {
          background-color: var(--color-navy);
          border-radius: 20px;
          padding: 40px 35px;
          text-align: center;
          color: var(--color-white);
        }
        .form-section-telechargements h2 {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .form-section-telechargements p {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 600px;
          margin: 0 auto 20px auto;
        }
        .download-form-telechargements { max-width: 600px; margin: 0 auto; }

        .form-row-telechargements {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-group-telechargements { margin-bottom: 14px; }
        .form-group-telechargements label {
          display: block;
          font-weight: 600;
          font-size: 13px;
          color: var(--color-white);
          margin-bottom: 4px;
          text-align: left;
        }
        .form-group-telechargements input,
        .form-group-telechargements select {
          width: 100%;
          padding: 10px 14px;
          border: none;
          border-radius: 10px;
          font-family: var(--font-sans);
          font-size: 14px;
          background-color: var(--color-white);
          color: var(--color-navy);
        }
        .form-group-telechargements input:focus,
        .form-group-telechargements select:focus { outline: 2px solid var(--color-gold); }

        /* ===== CTA ===== */
        .cta-final-telechargements {
          background-color: var(--color-navy);
          padding: 50px 20px;
          text-align: center;
          margin: 0 -20px;
        }
        .container-cta-telechargements { max-width: 680px; margin: 0 auto; padding: 0 20px; }
        .cta-title-telechargements {
          font-family: var(--font-serif);
          font-size: 28px;
          font-weight: 700;
          color: var(--color-white);
          line-height: 1.1;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
        }
        .cta-text-telechargements {
          color: var(--color-gray-light);
          font-size: 14px;
          max-width: 680px;
          margin: 0 auto 30px auto;
        }
        .cta-group-telechargements {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 8px;
        }

        /* ================================================================ */
        /* ===== SIDEBAR ===== */
        /* ================================================================ */
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
          transition: opacity 0.3s ease, visibility 0.3s ease;
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
        .sidebar-header .sidebar-badge {
          display: inline-block;
          color: var(--color-gold);
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .sidebar-header h2 {
          font-family: var(--font-serif);
          font-size: 26px;
          font-weight: 700;
          color: var(--color-navy);
          line-height: 1.2;
          margin-bottom: 8px;
        }
        .sidebar-header p {
          font-size: 14px;
          color: var(--color-gray);
          margin-bottom: 2px;
        }
        .sidebar-header .sidebar-ressource {
          font-size: 16px;
          color: var(--color-navy);
          margin-top: 6px;
        }
        .sidebar-header .sidebar-ressource strong {
          color: var(--color-gold);
        }

        .sidebar-form { display: flex; flex-direction: column; gap: 16px; }
        .sidebar-form .form-group { display: flex; flex-direction: column; gap: 4px; }
        .sidebar-form .form-group label { font-size: 13px; font-weight: 600; color: var(--color-navy); }
        .sidebar-form .form-group input {
          padding: 10px 14px;
          border: 1px solid rgba(6, 23, 47, 0.15);
          border-radius: 10px;
          font-size: 14px;
          font-family: var(--font-sans);
          transition: border-color 0.3s;
          background: var(--color-cream);
        }
        .sidebar-form .form-group input:focus { outline: none; border-color: var(--color-gold); background: var(--color-white); }

        .sidebar-form .form-group-rgpd {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-top: 4px;
        }
        .sidebar-form .form-group-rgpd input[type="checkbox"] {
          width: 18px;
          height: 18px;
          flex-shrink: 0;
          margin-top: 2px;
          accent-color: var(--color-gold);
          cursor: pointer;
        }
        .sidebar-form .form-group-rgpd label {
          font-size: 13px;
          color: var(--color-gray);
          line-height: 1.5;
          cursor: pointer;
        }
        .sidebar-form .form-group-rgpd label a {
          color: var(--color-gold);
          text-decoration: underline;
          font-weight: 600;
        }

        .btn-submit {
          background: var(--color-gold);
          color: var(--color-navy);
          padding: 14px 20px;
          border: none;
          border-radius: 9999px;
          font-weight: 700;
          font-size: 16px;
          display: flex;
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

        /* ================================================================ */
        /* ===== RESPONSIVE ===== */
        /* ================================================================ */

        @media (max-width: 1024px) {
          .hero-telechargements-title { font-size: 32px !important; }
          .mission-telechargements-title { font-size: 24px !important; }
          .downloads-grid-telechargements { grid-template-columns: 1fr !important; gap: 16px !important; }
          .stats-banner-telechargements { grid-template-columns: repeat(3, 1fr) !important; }
          .form-section-telechargements { padding: 30px 24px !important; }
          .form-section-telechargements h2 { font-size: 24px !important; }
          .spacer-telechargements { height: 16px !important; }
          .sidebar { width: 45%; max-width: 400px; padding: 28px 20px; }
        }

        @media (max-width: 768px) {
          .spacer-telechargements { height: 12px !important; }

          .hero-telechargements { padding: 30px 16px 25px 16px !important; }
          .hero-telechargements-container { gap: 22px !important; }
          .hero-telechargements-title { font-size: 26px !important; }
          .hero-telechargements-subtitle { font-size: 14px !important; }
          .hero-telechargements-description { font-size: 14px !important; }
          .mission-box-telechargements { padding: 18px !important; }
          .mission-telechargements-title { font-size: 22px !important; }
          .mission-telechargements-text { font-size: 14px !important; }

          .section-telechargements-white { padding: 35px 16px !important; }
          .section-title-telechargements { font-size: 22px !important; }
          .section-subtitle-telechargements { font-size: 14px !important; }

          .downloads-grid-telechargements { grid-template-columns: 1fr !important; gap: 14px !important; }
          .download-card-telechargements { padding: 18px !important; }
          .download-card-telechargements h3 { font-size: 17px !important; }
          .download-card-telechargements p { font-size: 14px !important; }

          .stats-banner-telechargements { grid-template-columns: 1fr !important; gap: 8px !important; padding: 16px !important; }
          .stats-banner-telechargements .stat-item .number { font-size: 24px !important; }
          .stats-banner-telechargements .stat-item .label { font-size: 11px !important; }

          .form-section-telechargements { padding: 24px 16px !important; }
          .form-section-telechargements h2 { font-size: 22px !important; }
          .form-section-telechargements p { font-size: 14px !important; }
          .form-row-telechargements { grid-template-columns: 1fr !important; gap: 0 !important; }

          .cta-final-telechargements { padding: 35px 16px !important; }
          .cta-title-telechargements { font-size: 22px !important; }
          .cta-text-telechargements { font-size: 14px !important; }
          .btn-gold-cta-telechargements,
          .btn-primary-telechargements {
            width: 100% !important;
            justify-content: center !important;
            font-size: 13px !important;
            padding: 12px 16px !important;
          }
          .btn-gold-small-telechargements {
            width: 100% !important;
            justify-content: center !important;
            font-size: 12px !important;
            padding: 10px !important;
          }

          .sidebar { width: 100%; max-width: 100%; padding: 24px 16px; }
          .sidebar-header h2 { font-size: 22px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
        }

        @media (max-width: 480px) {
          .spacer-telechargements { height: 10px !important; }

          .hero-telechargements { padding: 20px 12px 16px 12px !important; }
          .hero-telechargements-title { font-size: 22px !important; }
          .hero-telechargements-subtitle { font-size: 13px !important; }
          .hero-telechargements-description { font-size: 13px !important; }
          .mission-telechargements-title { font-size: 19px !important; }
          .mission-telechargements-text { font-size: 13px !important; }

          .section-telechargements-white { padding: 28px 12px !important; }
          .section-title-telechargements { font-size: 20px !important; }
          .section-subtitle-telechargements { font-size: 13px !important; }

          .download-card-telechargements { padding: 16px !important; }
          .download-card-telechargements h3 { font-size: 16px !important; }
          .download-card-telechargements p { font-size: 13px !important; }

          .form-section-telechargements h2 { font-size: 20px !important; }
          .form-section-telechargements p { font-size: 13px !important; }

          .cta-final-telechargements { padding: 28px 12px !important; }
          .cta-title-telechargements { font-size: 20px !important; }
          .cta-text-telechargements { font-size: 13px !important; }
          .btn-gold-cta-telechargements,
          .btn-primary-telechargements {
            font-size: 12px !important;
            padding: 10px 14px !important;
          }
          .btn-gold-small-telechargements {
            font-size: 11px !important;
            padding: 8px !important;
          }

          .sidebar-header h2 { font-size: 20px; }
          .sidebar .form-group input { font-size: 13px; padding: 8px 12px; }
          .btn-submit { font-size: 14px; padding: 12px 16px; }
        }
      `}</style>
    </main>
  );
}