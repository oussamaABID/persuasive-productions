import fs from 'fs';
import path from 'path';

export interface GalleryImageMetadata {
  file: string;
  title: string;
  alt: string;
}

export interface GalleryCollection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: GalleryImageMetadata[];
  path: string;
  showOnHome?: boolean;
}

export async function getGalleryCollections(): Promise<GalleryCollection[]> {
  const galleryDir = path.join(process.cwd(), 'public/gallery');
  
  if (!fs.existsSync(galleryDir)) {
    return [];
  }

  const folders = fs.readdirSync(galleryDir).filter(file => {
    return fs.statSync(path.join(galleryDir, file)).isDirectory();
  });

  const collections: GalleryCollection[] = [];

  for (const folder of folders) {
    const folderPath = path.join(galleryDir, folder);
    const metadataPath = path.join(folderPath, 'metadata.json');

    if (fs.existsSync(metadataPath)) {
      try {
        const metadataRaw = fs.readFileSync(metadataPath, 'utf-8');
        const metadata = JSON.parse(metadataRaw);
        
        collections.push({
          id: folder,
          title: metadata.title,
          description: metadata.description,
          coverImage: `/gallery/${folder}/${metadata.coverImage}`,
          images: metadata.images.map((img: { file: string; title: string; alt: string }) => ({
            ...img,
            file: `/gallery/${folder}/${img.file}`
          })),
          path: folder,
          showOnHome: metadata.showOnHome || false
        });
      } catch (error) {
        console.error(`Error parsing metadata.json in ${folder}:`, error);
      }
    } else {
      // Fallback if no metadata.json exists (optional, but good for robust scanner)
      const images = fs.readdirSync(folderPath).filter(file => {
        return /\.(jpg|jpeg|png|webp|gif)$/i.test(file);
      });

      if (images.length > 0) {
        collections.push({
          id: folder,
          title: folder.replace(/-/g, ' ').toUpperCase(),
          description: "Curated collection",
          coverImage: `/gallery/${folder}/${images[0]}`,
          images: images.map(img => ({
            file: `/gallery/${folder}/${img}`,
            title: img,
            alt: img
          })),
          path: folder
        });
      }
    }
  }

  return collections;
}

