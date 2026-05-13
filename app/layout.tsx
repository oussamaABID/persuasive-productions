import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import ChatbotPlaceholder from "@/components/organisms/ChatbotPlaceholder";
import content from "@/content/site-content.json";
import { getGalleryCollections } from "@/lib/gallery";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Persuasive Productions | Premium Photography",
  description: "Exquisite photography services. Capture your essence with a touch of Noir elegance.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const collections = await getGalleryCollections();

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-accent-foreground">
        {children}
        {/* ── Global Chatbot Singleton ─────────────────────────────────────────
            Mounted here, outside {children}, so it is NEVER unmounted during
            client-side routing. Conversation state is preserved across all pages.
        ─────────────────────────────────────────────────────────────────────── */}
        <ChatbotPlaceholder content={content} collections={collections} />
      </body>
    </html>
  );
}
