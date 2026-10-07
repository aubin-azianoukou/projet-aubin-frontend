const API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

interface StrapiResponse<T> {
  data: T[];
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

interface Livre {
  id: number;
  documentId?: string;
  Titre?: string;
  titre?: string;
  slug: string;
  // ... tous les autres champs optionnels
  [key: string]: any; // Pour la flexibilité
}

export async function getAllLivres(): Promise<Livre[]> {
  try {
    const response = await fetch(`${API_URL}/api/livres?populate=*`, {
      next: { revalidate: 3600 } // Cache 1 heure
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse<Livre> = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des livres:', error);
    return [];
  }
}

export async function getLivreBySlug(slug: string): Promise<Livre | null> {
  try {
    const url = `${API_URL}/api/livres?filters[slug][$eq]=${slug}&populate=*`;
    console.log('🔎 URL appelée:', url);
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: StrapiResponse<Livre> = await response.json();
    console.log('📦 Données reçues:', data);
    
    if (data.data && data.data.length > 0) {
      return data.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Erreur lors de la récupération du livre ${slug}:`, error);
    return null;
  }
}

export async function getAllTemoignages(): Promise<any[]> {
  try {
    const response = await fetch(`${API_URL}/api/temoignages?populate=*`, {
      next: { revalidate: 3600 }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('📦 Témoignages reçus:', data);
    
    return data.data || [];
  } catch (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    return [];
  }
}