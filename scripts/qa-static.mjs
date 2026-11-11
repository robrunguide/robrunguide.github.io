import { readFileSync, existsSync } from 'node:fs';
import assert from 'node:assert/strict';
const read = p => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');
const json = p => JSON.parse(read(p));
const expected = ['server-status','change-server','wipe','console','bank-account'];
const pages = json('content/generated/pages.json');
const home = json('content/generated/home.json');
const site = json('content/generated/site.json');
assert.equal(site.hosting.siteUrl, 'https://robrunguide.github.io');
assert.equal(pages.length,5);
assert.deepEqual(pages.map(p=>p.slug),expected);
const uniques = new Set();
for (const page of [home,...pages]) {
  assert(!uniques.has(page.slug));uniques.add(page.slug);
  assert(page.title.length>=20 && page.description.length>=80);
  assert(page.hero.heading && page.hero.lead.length>80);
  assert(page.sections.length>=5);
  assert(page.faq.length>=4);
  if(page.slug) assert.equal(page.navVisible,true);
  const ids=page.sections.map(s=>s.id);assert.equal(ids.length,new Set(ids).size);
  const text=[page.title,page.description,page.hero.heading,page.hero.lead,...page.sections.flatMap(s=>[s.heading,s.intro,...(s.paragraphs||[]),...(s.subsections||[]).flatMap(x=>[x.heading,...(x.paragraphs||[])])]),...page.faq.flatMap(f=>[f.question,f.answer])].filter(Boolean).join(' ');
  const words=(text.match(/[A-Za-z0-9]+(?:['-][A-Za-z0-9]+)*/g)||[]).length;
  console.log(`${page.slug||'/'}: ${words} visible SEO text words, ${page.sections.length} sections, ${page.faq.length} FAQs`);
  assert(words>600, `${page.slug} insufficient substantive content`);
  assert(!/lorem ipsum|coming soon|placeholder content/i.test(text));
  if(page.slug){
    assert(page.relatedSlugs?.every(s=>uniques.has(s) || expected.includes(s)));
    assert(page.sections.some(s=>s.table));
  }
}
const h=read('components/site/site-header.tsx');
assert(h.includes('top-full') && h.includes('lg:static') && h.includes('lg:hidden'));
assert(h.includes('href={routePath(link.slug)}') && h.includes('onClick={() => setOpen(false)}'));
const layout=read('app/layout.tsx');
assert(layout.includes('"./globals.css"') && layout.includes('SiteHeader links={navLinks}'));
assert(read('next.config.ts').includes('output: "export"'));
assert(read('app/sitemap.ts').includes('enabledCorePages'));
console.log('STATIC SOURCE CHECK: PASS (not a build or browser test)');
