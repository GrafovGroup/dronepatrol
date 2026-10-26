import { locations, industries } from './content';
export type InquiryDefaults={service?:string;city?:string;province?:string;sourcePage?:string};
export const inquiryServices:Record<string,string>={
'drone-inspections':'Other','commercial-roof-inspections':'Commercial Roof Inspection','construction-drone-services':'Construction Monitoring','building-facade-inspections':'Building / Façade Inspection','industrial-drone-inspections':'Industrial Inspection','thermal-drone-inspections':'Thermal Inspection','solar-drone-inspections':'Solar Inspection','damage-documentation':'Storm / Damage Documentation','property-patrol':'Property Patrol','patrol-plans':'Property Patrol'
};
export function resolveInquiryContext(value:unknown,locale:'en'|'fr'='en'):InquiryDefaults{
 if(typeof value!=='string'||value.length>160)return {};
 const path=value.replace(/^\/fr(?=\/|$)/,'')||'/';
 const parts=path.split('/').filter(Boolean);
 if(parts.length===1&&Object.hasOwn(inquiryServices,parts[0]))return {service:inquiryServices[parts[0]],sourcePage:value};
 if(parts.length===2&&parts[0]==='locations'&&Object.hasOwn(locations,parts[1])){
  const p=locations[parts[1] as keyof typeof locations];
  const frenchCity:Record<string,string>={'quebec-city':'Québec',montreal:'Montréal','greater-sudbury':'Grand Sudbury'};
  return {city:locale==='fr'?(frenchCity[parts[1]]||p.city):p.city,province:p.province,sourcePage:value};
 }
 if(parts.length===2&&parts[0]==='industries'&&Object.hasOwn(industries,parts[1]))return {sourcePage:value};
 if(['/', '/about','/how-it-works','/locations','/industries'].includes(path))return {sourcePage:value};
 return {};
}
