import { getGalleryCollections } from '@/lib/gallery';
import content from '@/content/site-content.json';
import PortfolioView from '@/features/portfolio/components/PortfolioView';

export default async function Portfolio() {
  const collections = await getGalleryCollections();

  return <PortfolioView collections={collections} content={content} />;
}

