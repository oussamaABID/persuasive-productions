import siteContent from '@/content/site-content.json';

export type SiteContent = typeof siteContent;

export interface Stat {
  label: string;
  value: string;
  subtitle: string;
}
