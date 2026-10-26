'use client';
import type { InquiryDefaults } from '@/lib/inquiry-context';

import { useEffect, useRef, Children, cloneElement, isValidElement, type ReactNode, type ReactElement, type ComponentProps } from 'react';
import { formFr } from '@/lib/form-fr';
import { sitePhone } from '@/lib/site-config';
import { useForm, ValidationError } from '@formspree/react';
import { ArrowRight, Check, Paperclip } from 'lucide-react';

type ContactFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  address: string;
  city: string;
  province: string;
  locations: string;
  timing: string;
  details: string;
  multiple_locations: string;
};

const services = [
  'Commercial Roof Inspection',
  'Construction Monitoring',
  'Building / Façade Inspection',
  'Industrial Inspection',
  'Thermal Inspection',
  'Solar Inspection',
  'Storm / Damage Documentation',
  'Property Patrol',
  'Multiple Locations',
  'Other',
];

const provinces = [
  'Alberta',
  'British Columbia',
  'Manitoba',
  'New Brunswick',
  'Newfoundland and Labrador',
  'Nova Scotia',
  'Ontario',
  'Prince Edward Island',
  'Quebec',
  'Saskatchewan',
  'Northwest Territories',
  'Nunavut',
  'Yukon',
];

export function ContactForm({locale='en',initial={}}:{locale?:'en'|'fr';initial?:InquiryDefaults}) {
  const translate = (node: ReactNode): ReactNode => {
    if (locale !== 'fr') return node;
    if (typeof node === 'string') {
      const normalized = node.replace(/\s+/g, ' ').trim();
      const translated = formFr[normalized];
      return translated ? `${/^\s/.test(node)?' ':''}${translated}${/\s$/.test(node)?' ':''}` : node;
    }
    if (!isValidElement(node)) return node;
    const el = node as ReactElement<Record<string, unknown>>;
    const props: Record<string, unknown> = {};
    for (const key of ['placeholder','aria-label']) if (typeof el.props[key] === 'string') props[key] = formFr[el.props[key] as string] || el.props[key];
    if (el.props.href === '/privacy') props.href='/fr/privacy';
    if (el.props.children !== undefined) props.children=Children.map(el.props.children as ReactNode,translate);
    return cloneElement(el,props);
  };
  function FieldError(props: ComponentProps<typeof ValidationError<ContactFields>>){
    if(locale !== 'fr')return <ValidationError {...props}/>;
    const exists=props.field ? Boolean(state.errors?.getFieldErrors(props.field).length) : Boolean(state.errors);
    return exists ? <span id={props.id} className="form-error" role="alert">{props.field?'Vérifiez ce champ et réessayez.':'L’envoi a échoué. Vérifiez les renseignements ou utilisez les coordonnées ci-dessous.'}</span> : null;
  }
  const [state, handleSubmit, reset] = useForm<ContactFields>('mkjnprar');
  const optionalRef = useRef<HTMLDetailsElement>(null);
  const successRef = useRef<HTMLOutputElement>(null);
  const hasError = (field: keyof ContactFields) =>
    Boolean(state.errors?.getFieldErrors(field).length);
  const errorProps = (field: keyof ContactFields) => ({
    'aria-invalid': hasError(field) || undefined,
    'aria-describedby': hasError(field) ? `${field}-error` : undefined,
  });

  useEffect(() => {
    if(state.errors && ['company','phone','address','locations','timing','multiple_locations'].some(f=>state.errors?.getFieldErrors(f as keyof ContactFields).length) && optionalRef.current) optionalRef.current.open=true;
  },[state.errors]);

  useEffect(() => {
    if (state.succeeded) successRef.current?.focus();
  }, [state.succeeded]);

  if (state.succeeded) {
    return translate(
      <output
        ref={successRef}
        className="form-success"
        aria-live="polite"
        tabIndex={-1}
      >
        <span>
          <Check />
        </span>
        <p className="section-label">Request sent</p>
        <h2>Thank you.</h2>
        <p>
          Your site review request has been received by our form service. We&apos;ll
          review the project details and follow up using the contact information
          you provided.
        </p>
        <button type="button" onClick={reset}>
          Send another request
        </button>
      </output>
    );
  }

  const field=(name:keyof ContactFields,label:string,options:{type?:string;required?:boolean;autoComplete?:string;value?:string;placeholder?:string;min?:number}={})=><div className="form-field"><label htmlFor={name}>{label}</label><input id={name} name={name} type={options.type||'text'} required={options.required} autoComplete={options.autoComplete} defaultValue={options.value} placeholder={options.placeholder} min={options.min} {...errorProps(name)}/><FieldError id={`${name}-error`} field={name} errors={state.errors}/></div>;
  return translate(
    <form className="commercial-form" action="https://formspree.io/f/mkjnprar" method="POST" onSubmit={handleSubmit} aria-busy={state.submitting}>
      <input type="hidden" name="language" value={locale}/>
      <input type="hidden" name="source_page" value={initial.sourcePage||''}/>
      <input type="hidden" name="_subject" value={locale==='fr'?'Nouvelle demande DronePatrol.ca — français':'New DronePatrol.ca site review request'}/>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true"/>
      <p className="form-help">Start with five essentials: name, email, service, city and a short description. You can add more details below.</p>
      {(initial.service||initial.city)&&<p className="inquiry-context" role="status">We filled in details from the page you visited. You can change them before sending.</p>}
      <div className="form-row">{field('name','Name',{required:true,autoComplete:'name'})}{field('email','Work Email',{required:true,type:'email',autoComplete:'email'})}</div>
      <div className="form-field"><label htmlFor="service">Service Required</label><select id="service" name="service" required defaultValue={initial.service||''} {...errorProps('service')}><option value="" disabled>Select a service</option>{services.map(service=><option key={service} value={service}>{service}</option>)}</select><FieldError id="service-error" field="service" errors={state.errors}/></div>
      <div className="form-row">{field('city','City',{required:true,autoComplete:'address-level2',value:initial.city})}<div className="form-field"><label htmlFor="province">Province / Territory (optional)</label><select id="province" name="province" autoComplete="address-level1" defaultValue={initial.province||''} {...errorProps('province')}><option value="">Select province or territory</option>{provinces.map(province=><option key={province} value={province}>{province}</option>)}</select><FieldError id="province-error" field="province" errors={state.errors}/></div></div>
      <div className="form-field"><label htmlFor="details">What would you like inspected or documented?</label><textarea id="details" name="details" required rows={4} placeholder="A brief description is enough to get started." {...errorProps('details')}/><FieldError id="details-error" field="details" errors={state.errors}/></div>
      <details className="optional-details" ref={optionalRef}><summary>Add project details (optional)</summary><div className="optional-fields">
        <div className="form-row">{field('company','Company',{autoComplete:'organization'})}{field('phone','Phone',{type:'tel',autoComplete:'tel'})}</div>
        {field('address','Property / Site Address',{autoComplete:'street-address'})}
        <div className="form-row">{field('locations','Number of Locations',{type:'number',min:1})}{field('timing','Preferred Timing',{placeholder:'Date or timeframe'})}</div>
        <label className="check-label"><input type="checkbox" name="multiple_locations" value="Yes"/>This project includes multiple locations</label>
        <div className="upload-placeholder"><Paperclip/><span><strong>Have site plans, photos or documents?</strong><small>Mention them in your request and we&apos;ll arrange a secure transfer if they are needed.</small></span></div>
      </div></details>
      <FieldError className="form-error form-error-summary" errors={state.errors} role="alert" aria-live="assertive"/>
      {state.errors&&<p className="form-help" role="alert">Your request was not confirmed. Please try again, email <a href="mailto:info@dronepatrol.ca">info@dronepatrol.ca</a> or call <a href={sitePhone.href}>{sitePhone.display}</a>.</p>}
      <button className="form-submit" type="submit" disabled={state.submitting}>{state.submitting?'Sending Request…':'Request Site Review'}{!state.submitting&&<ArrowRight/>}</button>
      <p className="form-note">We use your details to respond to this inquiry. Read our <a href="/privacy">privacy policy</a>. Do not include sensitive personal information. Form submissions are processed by Formspree.</p>
    </form>
  );
}
