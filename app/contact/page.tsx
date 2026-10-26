import type { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ContactForm } from '@/components/contact-form';
import { Footer, Header } from '@/components/site-shell';
import { sitePhone } from '@/lib/site-config';
export const metadata:Metadata={title:'Request a Commercial Drone Inspection',description:'Request a commercial drone site review in Canada. Share the location, service, timing and required aerial documentation.',alternates:{canonical:'/contact'}};
export default function Contact(){return <main><Header/><section id="main-content" tabIndex={-1} className="contact-layout"><div><p className="eyebrow"><MapPin/>Commercial requests across Canada</p><h1>Request a site review.</h1><p>Tell us what needs to be inspected, monitored or documented. Approximate details are enough to begin; operations are confirmed only after feasibility review.</p><a href="mailto:info@dronepatrol.ca"><Mail/>info@dronepatrol.ca</a><a href={sitePhone.href}><Phone/>{sitePhone.display}</a><div className="contact-notes"><h3>Helpful information</h3><p>Exact address and site contact</p><p>Asset and areas of interest</p><p>Preferred timing or frequency</p><p>Known access or operating constraints</p></div></div><ContactForm/></section><Footer/></main>}
