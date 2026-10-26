'use client';
import { usePathname } from 'next/navigation';
import type { ComponentProps } from 'react';
export function QuoteLink({href,children,...props}:ComponentProps<'a'>){const pathname=usePathname()||'/';const contact=pathname==='/contact'||pathname==='/fr/contact';const target=href&&!contact?`${href}?context=${encodeURIComponent(pathname)}`:href;return <a {...props} href={target}>{children}</a>}
