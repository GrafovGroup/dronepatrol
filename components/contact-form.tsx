'use client';

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

export function ContactForm({locale='en'}:{locale?:'en'|'fr'}) {
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
  const successRef = useRef<HTMLOutputElement>(null);
  const hasError = (field: keyof ContactFields) =>
    Boolean(state.errors?.getFieldErrors(field).length);
  const errorProps = (field: keyof ContactFields) => ({
    'aria-invalid': hasError(field) || undefined,
    'aria-describedby': hasError(field) ? `${field}-error` : undefined,
  });

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

  return translate(
    <form
      className="commercial-form"
      action="https://formspree.io/f/mkjnprar"
      method="POST"
      onSubmit={handleSubmit}
      aria-busy={state.submitting}
    >
      <input type="hidden" name="language" value={locale} />
      <input
        type="hidden"
        name="_subject"
        value={locale === 'fr' ? 'Nouvelle demande DronePatrol.ca — français' : 'New DronePatrol.ca site review request'}
      />

      <p className="form-help">Required: name, company, email, service, city, province or territory, and project details. Everything else is optional.</p>
      <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="form-honeypot" aria-hidden="true" />
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            required
            {...errorProps('name')}
          />
          <FieldError
            id="name-error"
            className="form-error"
            field="name"
            errors={state.errors}
          />
        </div>
        <div className="form-field">
          <label htmlFor="company">Company</label>
          <input
            id="company"
            name="company"
            autoComplete="organization"
            required
            {...errorProps('company')}
          />
          <FieldError
            id="company-error"
            className="form-error"
            field="company"
            errors={state.errors}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="email">Work Email</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            {...errorProps('email')}
          />
          <FieldError
            id="email-error"
            className="form-error"
            field="email"
            errors={state.errors}
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            {...errorProps('phone')}
          />
          <FieldError
            id="phone-error"
            className="form-error"
            field="phone"
            errors={state.errors}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="service">Service Required</label>
        <select
          id="service"
          name="service"
          required
          defaultValue=""
          {...errorProps('service')}
        >
          <option value="" disabled>
            Select a service
          </option>
          {services.map((service) => (
            <option value={service} key={service}>{service}</option>
          ))}
        </select>
        <FieldError
          id="service-error"
          className="form-error"
          field="service"
          errors={state.errors}
        />
      </div>

      <div className="form-field">
        <label htmlFor="address">Property / Site Address</label>
        <input
          id="address"
          name="address"
          autoComplete="street-address"
          {...errorProps('address')}
        />
        <FieldError
          id="address-error"
          className="form-error"
          field="address"
          errors={state.errors}
        />
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="city">City</label>
          <input
            id="city"
            name="city"
            autoComplete="address-level2"
            required
            {...errorProps('city')}
          />
          <FieldError
            id="city-error"
            className="form-error"
            field="city"
            errors={state.errors}
          />
        </div>
        <div className="form-field">
          <label htmlFor="province">Province / Territory</label>
          <select
            id="province"
            name="province"
            autoComplete="address-level1"
            required
            defaultValue=""
            {...errorProps('province')}
          >
            <option value="" disabled>
              Select province or territory
            </option>
            {provinces.map((province) => (
              <option value={province} key={province}>{province}</option>
            ))}
          </select>
          <FieldError
            id="province-error"
            className="form-error"
            field="province"
            errors={state.errors}
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="locations">Number of Locations</label>
          <input
            id="locations"
            name="locations"
            type="number"
            min="1"
            defaultValue="1"
            {...errorProps('locations')}
          />
          <FieldError
            id="locations-error"
            className="form-error"
            field="locations"
            errors={state.errors}
          />
        </div>
        <div className="form-field">
          <label htmlFor="timing">Preferred Timing</label>
          <input
            id="timing"
            name="timing"
            placeholder="Date or timeframe"
            {...errorProps('timing')}
          />
          <FieldError
            id="timing-error"
            className="form-error"
            field="timing"
            errors={state.errors}
          />
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="details">
          What would you like inspected or documented?
        </label>
        <textarea
          id="details"
          name="details"
          required
          rows={6}
          {...errorProps('details')}
        />
        <FieldError
          id="details-error"
          className="form-error"
          field="details"
          errors={state.errors}
        />
      </div>

      <div className="upload-placeholder">
        <Paperclip />
        <span>
          <strong>Have site plans, photos or documents?</strong>
          <small>
            Mention them in your request and we&apos;ll arrange a secure
            transfer if they are needed.
          </small>
        </span>
      </div>

      <label className="check-label">
        <input type="checkbox" name="multiple_locations" value="Yes" /> This
        project includes multiple locations
      </label>

      <FieldError
        className="form-error form-error-summary"
        errors={state.errors}
        role="alert"
        aria-live="assertive"
      />
      {state.errors && <p className="form-help" role="alert">Your request was not confirmed. Please try again, email <a href="mailto:info@dronepatrol.ca">info@dronepatrol.ca</a> or call <a href={sitePhone.href}>{sitePhone.display}</a>.</p>}
      <button className="form-submit" type="submit" disabled={state.submitting}>
        {state.submitting ? 'Sending Request…' : 'Request Site Review'}
        {!state.submitting && <ArrowRight />}
      </button>
      <p className="form-note">
        We use your details to respond to this inquiry. Read our <a href="/privacy">privacy policy</a>. Do not include sensitive personal information. Form submissions are processed by Formspree.
      </p>
    </form>
  );
}
