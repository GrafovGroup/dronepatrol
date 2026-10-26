import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import { sitePhone } from '@/lib/site-config';
import './globals.css';

const display = Manrope({ variable:'--font-display', subsets:['latin'], weight:['500','600','700','800'] });
const body = Inter({ variable:'--font-body', subsets:['latin'], weight:['400','500','600','700'] });

export const metadata: Metadata = {
  metadataBase:new URL('https://dronepatrol.ca'),
  verification:{google:'R9njiTK9aLQxNNuhVi8NPSM7DeEnpU2mrP96u4W3u64'},
  title:{ default:'Commercial Drone Inspections Across Canada | DronePatrol.ca', template:'%s | DronePatrol.ca' },
  description:'Commercial drone inspection, aerial monitoring and site documentation coordinated across Canada for properties, construction, industrial facilities and infrastructure.',
  icons:{
    icon:[
      {url:'/favicon.svg',type:'image/svg+xml'},
      {url:'/favicon-32.png',type:'image/png',sizes:'32x32'},
    ],
    shortcut:'/favicon.svg',
    apple:[{url:'/apple-touch-icon.png',sizes:'180x180',type:'image/png'}],
  },
  openGraph:{ title:'DronePatrol.ca — Aerial Inspections & Site Monitoring', description:'Commercial drone services coordinated across Canada.', url:'https://dronepatrol.ca', siteName:'DronePatrol.ca', locale:'en_CA', type:'website', images:[{url:'/images/hero-commercial-drone.jpg',width:1774,height:887,alt:'Commercial inspection drone above a large rooftop'}] },
  twitter:{card:'summary_large_image',title:'DronePatrol.ca — Aerial Inspections & Site Monitoring',description:'Commercial drone services coordinated across Canada.',images:['/images/hero-commercial-drone.jpg']},
};

export default async function RootLayout({children}:{children:React.ReactNode}) {
  const locale=(await headers()).get('x-site-locale')==='fr'?'fr-CA':'en-CA';
  const schema={ '@context':'https://schema.org','@graph':[
    {'@type':'Organization','@id':'https://dronepatrol.ca/#organization',name:'DronePatrol.ca',url:'https://dronepatrol.ca',email:'info@dronepatrol.ca',telephone:sitePhone.e164,areaServed:{'@type':'Country',name:'Canada'}},
    {'@type':'WebSite','@id':'https://dronepatrol.ca/#website',url:'https://dronepatrol.ca',name:'DronePatrol.ca',publisher:{'@id':'https://dronepatrol.ca/#organization'}},
    {'@type':'ProfessionalService',name:'DronePatrol.ca',url:'https://dronepatrol.ca',email:'info@dronepatrol.ca',telephone:sitePhone.e164,areaServed:{'@type':'Country',name:'Canada'},serviceType:['Commercial drone inspection','Construction progress monitoring','Aerial site documentation']}
  ]};
  return <html lang={locale}><body className={`${display.variable} ${body.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>{children}</body></html>;
}
