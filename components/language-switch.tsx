'use client';
import { usePathname } from 'next/navigation';
export function LanguageSwitch(){const path=usePathname()||'/';const fr=path==='/fr'||path.startsWith('/fr/');const href=fr?(path.slice(3)||'/'):`/fr${path==='/'?'':path}`;return <a className="language-switch" href={href} hrefLang={fr?'en-CA':'fr-CA'} lang={fr?'en':'fr'} aria-label={fr?'View this page in English':'Voir cette page en français'}>{fr?'EN':'FR'}</a>}
