import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
const tmp=await fs.mkdtemp(path.join(os.tmpdir(),'dronepatrol-content-'));
try{
 for(const name of ['content','content-fr','form-fr','inquiry-context']){
  const source=await fs.readFile(`lib/${name}.ts`,'utf8');
  const result=ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022,module:ts.ModuleKind.ESNext}}).outputText.replaceAll("'./content'","'./content.mjs'").replaceAll("'./content-fr'","'./content-fr.mjs'");
  await fs.writeFile(path.join(tmp,`${name}.mjs`),result);
 }
 const en=await import(pathToFileURL(path.join(tmp,'content.mjs')));
 const fr=await import(pathToFileURL(path.join(tmp,'content-fr.mjs')));
 for(const key of ['services','industries','locations'])assert.deepEqual(Object.keys(fr[`${key}Fr`]).sort(),Object.keys(en[key]).sort(),`${key}: both languages need the same routes`);
 for(const [slug,item] of Object.entries(fr.servicesFr)){assert(item.title&&item.short&&item.intro,slug);assert.equal(item.uses.length,4,slug);assert.equal(item.deliverables.length,4,slug);}
 for(const [slug,item] of Object.entries(fr.industriesFr)){assert(item.title&&item.intro&&item.needs.length,slug);for(const service of item.related)assert(fr.servicesFr[service],`${slug}: broken service link`);}
 for(const [slug,item] of Object.entries(fr.locationsFr)){assert(item.city&&item.province&&item.context&&item.areas&&item.sectorsText,`${slug}: untranslated location data`);assert.notEqual(item.context,en.locations[slug].context,`${slug}: English context leaked`);await fs.access(`public${item.image}`);}
 assert.equal(Object.keys(fr.provincesFr).length,13);
 const form=await import(pathToFileURL(path.join(tmp,'form-fr.mjs')));
 for(const s of ['Name','Company','Work Email','Request sent','Thank you.','Sending Request…','Request Site Review','privacy policy'])assert(form.formFr[s],`Missing form label: ${s}`);
 const {resolveInquiryContext}=await import(pathToFileURL(path.join(tmp,'inquiry-context.mjs')));
 assert.equal(resolveInquiryContext('/commercial-roof-inspections').service,'Commercial Roof Inspection');
 assert.equal(resolveInquiryContext('/fr/thermal-drone-inspections','fr').service,'Thermal Inspection');
 assert.deepEqual(resolveInquiryContext('/fr/locations/montreal','fr'),{city:'Montréal',province:'Quebec',sourcePage:'/fr/locations/montreal'});
 assert.equal(resolveInquiryContext('/locations/toronto').province,'Ontario');
 assert.equal(resolveInquiryContext('/patrol-plans').service,'Property Patrol');
 for(const value of ['/__proto__','/locations/__proto__','/unknown','https://example.com','/contact', ['bad'],null])assert.deepEqual(resolveInquiryContext(value),{});
 console.log('PASS: service and city preselection, French context, patrol plans and invalid-input rejection.');
 console.log(`PASS: ${Object.keys(fr.servicesFr).length} services, ${Object.keys(fr.industriesFr).length} industries, ${Object.keys(fr.locationsFr).length} locations, all location assets, 13 provinces/territories and core form strings.`);
}finally{await fs.rm(tmp,{recursive:true,force:true})}
