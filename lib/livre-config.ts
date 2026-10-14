// ============================================================
// CONFIGURATION DES LIVRES
// ============================================================
// Ce fichier centralise les liens d'achat et les promos
// pour chaque livre. Modifie ici, redéploie Vercel.
// ============================================================

export interface LivreConfig {
  // Liens d'achat
  lienChariow: string;           // URL Chariow (PDF)

  // Promo PDF
  prixBarrePDF: string;          // Prix BARRÉ du PDF (= Prix PDF × 2)
  badgePromo: string;            // Badge affiché (ex: "50% OFF")
}

export const livreConfig: Record<string, LivreConfig> = {
  'le-declic': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_aeurbcj6',
    prixBarrePDF: '13 800',
    badgePromo: '50% OFF',
  },

  'dominez-votre-journee': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_oohuey',
    prixBarrePDF: '7 800',
    badgePromo: '50% OFF',
  },

  'mariage-le-grand-examen': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_eo6g1pkl',
    prixBarrePDF: '9 800',
    badgePromo: '50% OFF',
  },

  'le-soleil-levant-du-quarantenaire': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_kvxdx3cr',
    prixBarrePDF: '9 800',
    badgePromo: '50% OFF',
  },

  'secrets-de-vie-prosperite-financiere': {
    lienChariow: 'https://ukltipvj.mychariow.shop/prd_j8rb4a80',
    prixBarrePDF: '9 800',
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

// ============================================================
// CONTACT AUBIN (WhatsApp direct)
// ============================================================
export const whatsappAubin = 'https://wa.me/22667739734';

// ============================================================
// LIBRAIRIE JEUNESSE D'AFRIQUE
// ============================================================
export const librairieJeunesse = {
  lien: 'https://www.facebook.com/soeurmarie.2020',
  telephone: '+226 25 33 36 25',
  email: 'ljaouaga@yahoo.fr',
  adresse: 'Avenue de la Cathédrale, Ouagadougou',
  bp: '01 BP 1471 Ouagadougou 01',
};

// ============================================================
// MERCURY LIBRAIRIE
// ============================================================
export const mercuryLibrairie = {
  lien: 'https://www.facebook.com/profile.php?id=100033773276448',
  adresse: 'ZAD2, Ouagadougou 01',
};