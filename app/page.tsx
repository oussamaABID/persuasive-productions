import HomeView from '@/features/home/components/HomeView';
import content from '@/content/site-content.json';

export default async function Home() {
  return <HomeView content={content} />;
}

