export const prerender = true;

const BASE = 'https://mobiliariurba.cat';

const pages = [
  { url: `${BASE}/`,                                                    priority: '1.0', changefreq: 'weekly' },
  { url: `${BASE}/productes/jocs-infantils`,                           priority: '0.9', changefreq: 'weekly' },
  { url: `${BASE}/productes/jocs-infantils/gronxadors-i-balancins`,    priority: '0.8', changefreq: 'monthly' },
  { url: `${BASE}/productes/jocs-infantils/tobogans`,                  priority: '0.8', changefreq: 'monthly' },
  { url: `${BASE}/productes/jocs-infantils/jocs-inclusius`,            priority: '0.8', changefreq: 'monthly' },
  { url: `${BASE}/productes/jocs-infantils/circuits-multijoc`,         priority: '0.8', changefreq: 'monthly' },
  { url: `${BASE}/productes/circuit-esportiu`,                         priority: '0.8', changefreq: 'monthly' },
  { url: `${BASE}/productes/bancs`,                                    priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/productes/papereres`,                                priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/productes/fonts-i-bebedors`,                         priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/productes/meses-de-picnic`,                          priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/productes/pilones-i-bolards`,                        priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/productes/alcorques`,                                priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/guia/parcs-infantils`,                               priority: '0.9', changefreq: 'monthly' },
  { url: `${BASE}/guia/normativa-en1176`,                              priority: '0.9', changefreq: 'monthly' },
  { url: `${BASE}/blog`,                                               priority: '0.7', changefreq: 'weekly' },
  { url: `${BASE}/productes`,                                          priority: '0.7', changefreq: 'monthly' },
  { url: `${BASE}/projectes`,                                          priority: '0.6', changefreq: 'monthly' },
  { url: `${BASE}/contacte`,                                           priority: '0.6', changefreq: 'yearly' },
];

export async function GET() {
  const today = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
