import HomeView from '@/features/home/components/HomeView';
import { getGalleryCollections } from '@/lib/gallery';
import content from '@/content/site-content.json';

export default async function Home() {
  const collections = await getGalleryCollections();

  return <HomeView content={content} collections={collections} />;
}

