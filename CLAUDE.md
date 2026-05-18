# CLAUDE.md — mobiliariurba.cat

## Stack tècnic
- Astro 5 + Keystatic CMS + React + @astrojs/vercel
- `output: "server"` (SSR global); pàgines estàtiques amb `export const prerender = true`
- Keystatic storage: GitHub (`jordimariezcu/mobiliariurba`)
- Adapter: `@astrojs/vercel` (serverless)
- GitHub: https://github.com/jordimariezcu/mobiliariurba
- Vercel: https://mobiliariurba.vercel.app / domini: mobiliariurba.cat

## Regles de contingut — OBLIGATÒRIES
- **Tot el contingut sempre en català.** Mai en castellà ni anglès, excepte termes tècnics sense traducció.
- **Mai mencionar fabricants ni distribuïdors pel seu nom** (Fabregas, Benito, Ros Roca, etc.).
- Registre professional però accessible: dirigit a tècnics municipals, arquitectes, regidors.
- Enllaços interns sempre amb URL relatives (`/productes/bancs`, no URL absoluta).

## Model de negoci
Portal de referència en català sobre equipament urbà. 4 partners exclusius (quota mensual) per nínxol. No vendre leads individuals — presència exclusiva per categoria.

- Partner A: Parcs Infantils
- Partner B: Esport i Cal·listènia
- Partner C: Mobiliari sostenible (bancs, papereres, fonts)
- Partner D: Paviments i seguretat (cautxú, gespa, tanques)

## 5 Nínxols de contingut SEO
1. **Parcs infantils** — normativa EN1176, jocs inclusius, fusta robínia
2. **Smart Cities** — bancs solars, mobiliari intel·ligent, smart waste
3. **Gent gran** — circuits salut, parcs biosaludables, envelliment actiu
4. **Refugis climàtics** — pèrgoles, veles d'ombra, fonts d'aigua, illes de calor
5. **Mascotes / Pipicans** — agility urbà, tanques, fonts per a gossos

## Arquitectura URL
```
/productes/bancs
/productes/pilones-i-bolards
/productes/jardineres
/productes/papereres
/productes/fonts-i-bebedors
/productes/taules-de-picnic          ← (redirect des de /meses-de-picnic)
/productes/aparcabicicletes
/productes/alcorques
/productes/jocs-infantils
/productes/circuit-esportiu
/productes/reductors-de-velocitat
/mobiliari-urba                      ← pilar
/mobiliari-urba/per-a-municipis
/mobiliari-urba/per-a-parcs
/mobiliari-urba/sostenible
/blog
/projectes
/empresa
/contacte
```

## Fitxer local
`C:\Users\g4767939\OneDrive - udl.cat\Claude Code\Mobiliari Urba\mobiliariurba`

## Tasques pendents
- [ ] Fix Keystatic OAuth redirect_uri (localhost → mobiliariurba.cat) — commit 4a2ed65 pendent deploy
- [ ] Article blog: zones de gossos / pipicans
- [ ] Pàgina `/projectes`: 3-4 casos d'estudi ficticis
- [ ] Categories homepage: afegir zones de gossos
- [ ] OG image `public/og-default.png` (1200×630px)
- [ ] DNS: apuntar mobiliariurba.cat a Vercel
- [ ] GitHub OAuth app: afegir callback URL de producció
