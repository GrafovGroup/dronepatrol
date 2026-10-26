'use client';
import { usePathname, useSearchParams } from 'next/navigation';
export function LanguageSwitch(){const path=usePathname()||'/';const query=useSearchParams();const context=query.get('context');const fr=path==='/fr'||path.startsWith('/fr/');const href=fr?(path.slice(3)||'/'):`/fr${path==='/'?'':path}`;return <a className="language-switch" href={context&&context.length<=160?`${href}?context=${encodeURIComponent(context)}`:href} hrefLang={fr?'en-CA':'fr-CA'} lang={fr?'en':'fr'} aria-label={fr?'View this page in English':'Voir cette page en français'}>{fr?'EN':'FR'}</a>}
