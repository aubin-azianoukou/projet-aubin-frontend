// ============================================================
// CONFIGURATION DES LIVRES
// ============================================================
// Ce fichier centralise les liens d'achat et les promos
// pour chaque livre. Modifie ici, redéploie Vercel.
// ============================================================

export interface LivreConfig {
  // Liens d'achat
  lienChariow: string;           // URL Chariow (PDF)
  lienAmazonPapier: string;      // URL Amazon KDP (papier) - vide pour l'instant
  lienLibrairieJeunesse: string; // URL Librairie Jeunesse - vide pour l'instant
  lienMercury: string;           // URL Mercury Librairie - vide pour l'instant

  // Promo PDF
  prixPromoPDF: string;          // Prix barré du PDF
  badgePromo: string;            // Badge affiché (ex: "50% OFF")
}

export const livreConfig: Record<string, LivreConfig> = {
  'le-declic': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_aeurbcj6',
    lienAmazonPapier: '',
    lienLibrairieJeunesse: '',
    lienMercury: '',
    prixPromoPDF: '6 900',
    badgePromo: '50% OFF',
  },

  'dominez-votre-journee': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_oohuey',
    lienAmazonPapier: '',
    lienLibrairieJeunesse: '',
    lienMercury: '',
    prixPromoPDF: '3 900',
    badgePromo: '50% OFF',
  },

  'mariage-le-grand-examen': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_eo6g1pkl',
    lienAmazonPapier: '',
    lienLibrairieJeunesse: '',
    lienMercury: '',
    prixPromoPDF: '4 900',
    badgePromo: '50% OFF',
  },

  'le-soleil-levant-du-quarantenaire': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_kvxdx3cr',
    lienAmazonPapier: '',
    lienLibrairieJeunesse: '',
    lienMercury: '',
    prixPromoPDF: '4 900',
    badgePromo: '50% OFF',
  },

  'secrets-de-vie-prosperite-financiere': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_j8rb4a80',
    lienAmazonPapier: '',
    lienLibrairieJeunesse: '',
    lienMercury: '',
    prixPromoPDF: '4 900',
    badgePromo: '50% OFF',
  },
};

// ============================================================
// PACK INTÉGRAL (BUNDLE)
// ============================================================
export const packIntegral = {
  lienChariow: 'https://ukltipvj.mychariow.shop/prd_xlbx2920',
  prix: '19 900',
  prixNormal: '24 500',
  badge: '-61%',
};

// ============================================================
// URL BOUTIQUE CHARIOW
// ============================================================
export const boutiqueChariow = 'https://ukltipvj.mychariow.shop/';