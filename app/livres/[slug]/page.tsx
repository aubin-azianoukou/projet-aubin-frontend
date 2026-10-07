import { getLivreBySlug, getAllLivres } from '@/lib/strapi';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import LivreContent from './LivreContent';

// ⭐ MAPPING DES IMAGES - COUVERTURES
const localCoverImages: Record<string, string> = {
  'le-declic': '/images/auteur/le_declic.webp',
  'dominez-votre-journee': '/images/auteur/Dominez votre journée all real.webp',
  'secrets-de-vie-prosperite-financiere': '/images/auteur/Secrets de Vie - Prospérité financière.webp',
  'le-soleil-levant-du-quarantenaire': '/images/auteur/soleil_levant.webp',
  'mariage-le-grand-examen': '/images/auteur/mariage_livre.webp',
};

// ⭐ MAPPING DES MINIATURES
const localThumbnailImages: Record<string, string[]> = {
  'le-declic': [
    '/images/auteur/le declic.webp',
    '/images/auteur/Le Declic der.webp',
  ],
  'dominez-votre-journee': [
    '/images/auteur/Dominez votre journée.webp',
    '/images/auteur/Dominez votre journée der.webp',
  ],
  'secrets-de-vie-prosperite-financiere': [
    '/images/auteur/secrets de vie prospérité financière.webp',
    '/images/auteur/Secrets de Vie - Prospérité financière der.webp',
  ],
  'le-soleil-levant-du-quarantenaire': [
    '/images/auteur/le soleil levant du quarantenaire.webp',
    '/images/auteur/Le soleil levant du quarantenaire der.webp',
  ],
  'mariage-le-grand-examen': [
    '/images/auteur/Mariage le grand examen.webp',
    '/images/auteur/Mariage le grand examen der.webp',
  ],
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;
  const livreData = await getLivreBySlug(slug);
  const livre = livreData;

  if (!livre) {
    return { title: 'Livre non trouvé' };
  }

  const titre = livre.Titre || livre.titre || 'Livre';
  const description = livre.seo_description || livre.Description || 'Découvrez ce livre';

  return {
    title: livre.seo_title || titre,
    description: description,
  };
}

export async function generateStaticParams() {
  const livres = await getAllLivres();
  return livres.map((livre: any) => ({
    slug: livre.slug,
  }));
}

export default async function Page({ params }: any) {
  const { slug } = await params;
  const livreData = await getLivreBySlug(slug);

  if (!livreData) {
    notFound();
  }

  return (
    <LivreContent
      livre={livreData}
      slug={slug}
      localCoverImages={localCoverImages}
      localThumbnailImages={localThumbnailImages}
    />
  );
}