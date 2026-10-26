import type { MetadataRoute } from 'next';
import { industries, locations, services } from '@/lib/content';
export default function sitemap():MetadataRoute.Sitemap {
  const base='https://dronepatrol.ca';
  const fixed=['','patrol-plans','how-it-works','industries','locations','about','contact','privacy','terms'];
  return [
    ...fixed.map(path=>({url:`${base}/${path}`.replace(/\/$/,path?'':'/'),changeFrequency:path===''?'weekly' as const:'monthly' as const,priority:path===''?1:.7})),
    ...Object.keys(services).map(path=>({url:`${base}/${path}`,changeFrequency:'monthly' as const,priority:.85})),
    ...Object.keys(industries).map(path=>({url:`${base}/industries/${path}`,changeFrequency:'monthly' as const,priority:.75})),
    ...Object.keys(locations).map(path=>({url:`${base}/locations/${path}`,changeFrequency:'monthly' as const,priority:.7})),
  ];
}
