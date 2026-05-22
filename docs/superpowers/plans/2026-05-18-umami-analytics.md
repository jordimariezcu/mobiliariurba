# Umami Analytics Event Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Instrumentar events Umami al codi (data attributes + MutationObserver) i documentar la configuració manual del dashboard per a objectius i embuts.

**Architecture:** Canvis purament HTML/JS en arxius Astro estàtics. Cap nova dependència. `data-umami-event` per a clicks, `MutationObserver` per a l'enviament del formulari Formspree.

**Tech Stack:** Astro 5 (prerender:true), Umami script ja carregat al Layout, Formspree `@formspree/ajax@1`

---

## Arxius afectats

| Arxiu | Canvi |
|---|---|
| `src/layouts/Layout.astro` | `data-umami-event="cta-contacte-nav"` al botó del header |
| `src/pages/contacte.astro` | `data-umami-event="email-click"` al mailto + script MutationObserver |
| `src/pages/productes/jocs-infantils/index.astro` | `data-umami-event` al CTA línia 253 |
| `src/pages/productes/jocs-infantils/gronxadors-i-balancins.astro` | CTA línia 101 |
| `src/pages/productes/jocs-infantils/tobogans.astro` | CTA línia 96 |
| `src/pages/productes/jocs-infantils/jocs-inclusius.astro` | CTA línia 101 |
| `src/pages/productes/jocs-infantils/circuits-multijoc.astro` | CTA línia 100 |
| `src/pages/productes/circuit-esportiu/index.astro` | CTA línia 186 |
| `src/pages/productes/aparells-biosaludables/index.astro` | CTA línia 177 |
| `src/pages/productes/aparells-biosaludables/aparells-gent-gran.astro` | CTA línia 230 |
| `src/pages/productes/aparells-biosaludables/circuits-passeig.astro` | CTA línia 157 |
| `src/pages/productes/zones-de-gossos/index.astro` | CTA línia 182 |
| `src/pages/productes/zones-de-gossos/equipament-de-joc.astro` | CTA línia 123 |
| `src/pages/productes/zones-de-gossos/mobiliari-complementari.astro` | CTA línia 186 |
| `src/pages/productes/zones-de-gossos/tanques-i-tancaments.astro` | CTA línia 150 |
| `src/pages/productes/bancs/index.astro` | CTA línia 81 |
| `src/pages/productes/fonts-i-bebedors/index.astro` | CTA línia 83 |
| `src/pages/productes/taules-de-picnic/index.astro` | CTA línia 82 |
| `src/pages/productes/papereres/index.astro` | CTA línia 78 |
| `src/pages/productes/pilones-i-bolards/index.astro` | CTA línia 77 |
| `src/pages/productes/alcorques/index.astro` | CTA línia 86 |
| `src/pages/productes/index.astro` | CTA línia 158 |
| `src/pages/productes/[slug].astro` | CTA línia 70 |

---

## Task 1: Layout.astro — CTA nav header

**Arxius:**
- Modify: `src/layouts/Layout.astro` (línia 111)

- [ ] **Step 1: Afegir l'atribut al botó de nav**

Busca la línia:
```html
<a href="/contacte" class="nav-cta">Contacte</a>
```
Substitueix per:
```html
<a href="/contacte" class="nav-cta" data-umami-event="cta-contacte-nav">Contacte</a>
```

- [ ] **Step 2: Verificar que compila**

```bash
cd "C:\Users\g4767939\OneDrive - udl.cat\Claude Code\Mobiliari Urba\mobiliariurba"
npx astro check
```
Esperat: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add src/layouts/Layout.astro
git commit -m "analytics: track nav CTA click with Umami"
```

---

## Task 2: contacte.astro — email-click + form-enviat

**Arxius:**
- Modify: `src/pages/contacte.astro`

- [ ] **Step 1: Afegir data-umami-event al link mailto**

Busca:
```html
<a href="mailto:info@mobiliariurba.cat">info@mobiliariurba.cat</a>
```
Substitueix per:
```html
<a href="mailto:info@mobiliariurba.cat" data-umami-event="email-click">info@mobiliariurba.cat</a>
```

- [ ] **Step 2: Afegir el script MutationObserver per a form-enviat**

Just before the closing `</Layout>` tag (after the Formspree scripts), afegeix:

```astro
<script>
  const successEl = document.querySelector('[data-fs-success]');
  if (successEl) {
    new MutationObserver(() => {
      if ((successEl as HTMLElement).style.display !== 'none') {
        if (typeof window.umami !== 'undefined') {
          window.umami.track('form-enviat');
        }
      }
    }).observe(successEl, { attributes: true, attributeFilter: ['style'] });
  }
</script>
```

> Nota: el guard `typeof window.umami !== 'undefined'` evita errors si Umami no ha carregat (p.ex. ad-blockers).

- [ ] **Step 3: Verificar que compila**

```bash
npx astro check
```
Esperat: 0 errors.

- [ ] **Step 4: Verificar manualment al navegador**

1. Obre `http://localhost:4321/contacte` (amb `npm run dev`)
2. Obre DevTools → Console
3. Escriu `window.umami` — ha de retornar l'objecte Umami
4. Omple el formulari i envia'l
5. A la consola hauria d'aparèixer la crida a `umami.track` (o comprova al dashboard Umami en Temps Real)

- [ ] **Step 5: Commit**

```bash
git add src/pages/contacte.astro
git commit -m "analytics: track email click and form submission with Umami"
```

---

## Task 3a: Jocs Infantils — CTAs (5 arxius)

**Arxius:**
- Modify: `src/pages/productes/jocs-infantils/index.astro` (línia 253)
- Modify: `src/pages/productes/jocs-infantils/gronxadors-i-balancins.astro` (línia 101)
- Modify: `src/pages/productes/jocs-infantils/tobogans.astro` (línia 96)
- Modify: `src/pages/productes/jocs-infantils/jocs-inclusius.astro` (línia 101)
- Modify: `src/pages/productes/jocs-infantils/circuits-multijoc.astro` (línia 100)

- [ ] **Step 1: index.astro**

Busca:
```html
<a href="/contacte" class="btn btn-accent btn-lg">Ser partner exclusiu</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-accent btn-lg" data-umami-event="cta-producte" data-umami-event-categoria="jocs-infantils">Ser partner exclusiu</a>
```

- [ ] **Step 2: gronxadors-i-balancins.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;">Ser partner exclusiu</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="jocs-infantils">Ser partner exclusiu</a>
```

- [ ] **Step 3: tobogans.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;">Contacteu-nos</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="jocs-infantils">Contacteu-nos</a>
```

- [ ] **Step 4: jocs-inclusius.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;">Ser partner exclusiu</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="jocs-infantils">Ser partner exclusiu</a>
```

- [ ] **Step 5: circuits-multijoc.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;">Contacteu-nos</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="jocs-infantils">Contacteu-nos</a>
```

- [ ] **Step 6: Commit**

```bash
git add src/pages/productes/jocs-infantils/
git commit -m "analytics: track jocs-infantils CTAs with Umami"
```

---

## Task 3b: Circuit Esportiu + Aparells Biosaludables (4 arxius)

**Arxius:**
- Modify: `src/pages/productes/circuit-esportiu/index.astro` (línia 186)
- Modify: `src/pages/productes/aparells-biosaludables/index.astro` (línia 177)
- Modify: `src/pages/productes/aparells-biosaludables/aparells-gent-gran.astro` (línia 230)
- Modify: `src/pages/productes/aparells-biosaludables/circuits-passeig.astro` (línia 157)

- [ ] **Step 1: circuit-esportiu/index.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;">Ser partner exclusiu</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="circuit-esportiu">Ser partner exclusiu</a>
```

- [ ] **Step 2: aparells-biosaludables/index.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary btn-lg">Sol·licitar assessorament</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary btn-lg" data-umami-event="cta-producte" data-umami-event-categoria="aparells-biosaludables">Sol·licitar assessorament</a>
```

- [ ] **Step 3: aparells-gent-gran.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary">Sol·licitar pressupost</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" data-umami-event="cta-producte" data-umami-event-categoria="aparells-biosaludables">Sol·licitar pressupost</a>
```

- [ ] **Step 4: circuits-passeig.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary">Contactar</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" data-umami-event="cta-producte" data-umami-event-categoria="aparells-biosaludables">Contactar</a>
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/productes/circuit-esportiu/ src/pages/productes/aparells-biosaludables/
git commit -m "analytics: track circuit-esportiu and aparells-biosaludables CTAs"
```

---

## Task 3c: Zones de Gossos (4 arxius)

**Arxius:**
- Modify: `src/pages/productes/zones-de-gossos/index.astro` (línia 182)
- Modify: `src/pages/productes/zones-de-gossos/equipament-de-joc.astro` (línia 123)
- Modify: `src/pages/productes/zones-de-gossos/mobiliari-complementari.astro` (línia 186)
- Modify: `src/pages/productes/zones-de-gossos/tanques-i-tancaments.astro` (línia 150)

- [ ] **Step 1: zones-de-gossos/index.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary btn-lg">Sol·licitar assessorament</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary btn-lg" data-umami-event="cta-producte" data-umami-event-categoria="zones-de-gossos">Sol·licitar assessorament</a>
```

- [ ] **Step 2: equipament-de-joc.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary">Contactar</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" data-umami-event="cta-producte" data-umami-event-categoria="zones-de-gossos">Contactar</a>
```

- [ ] **Step 3: mobiliari-complementari.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary">Contactar</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" data-umami-event="cta-producte" data-umami-event-categoria="zones-de-gossos">Contactar</a>
```

- [ ] **Step 4: tanques-i-tancaments.astro**

Busca:
```html
<a href="/contacte" class="btn btn-primary">Sol·licitar pressupost</a>
```
Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" data-umami-event="cta-producte" data-umami-event-categoria="zones-de-gossos">Sol·licitar pressupost</a>
```

- [ ] **Step 5: Commit**

```bash
git add src/pages/productes/zones-de-gossos/
git commit -m "analytics: track zones-de-gossos CTAs"
```

---

## Task 3d: Mobiliari urbà (6 arxius)

**Arxius:**
- Modify: `src/pages/productes/bancs/index.astro` (línia 81)
- Modify: `src/pages/productes/fonts-i-bebedors/index.astro` (línia 83)
- Modify: `src/pages/productes/taules-de-picnic/index.astro` (línia 82)
- Modify: `src/pages/productes/papereres/index.astro` (línia 78)
- Modify: `src/pages/productes/pilones-i-bolards/index.astro` (línia 77)
- Modify: `src/pages/productes/alcorques/index.astro` (línia 86)

A tots 6 arxius, la línia a canviar és del tipus:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;">Ser partner exclusiu</a>
```

- [ ] **Step 1: bancs/index.astro**

Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="mobiliari">Ser partner exclusiu</a>
```

- [ ] **Step 2: fonts-i-bebedors/index.astro**

Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="mobiliari">Ser partner exclusiu</a>
```

- [ ] **Step 3: taules-de-picnic/index.astro**

Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="mobiliari">Ser partner exclusiu</a>
```

- [ ] **Step 4: papereres/index.astro**

Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="mobiliari">Ser partner exclusiu</a>
```

- [ ] **Step 5: pilones-i-bolards/index.astro**

Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="mobiliari">Ser partner exclusiu</a>
```

- [ ] **Step 6: alcorques/index.astro**

Substitueix per:
```html
<a href="/contacte" class="btn btn-primary" style="width:100%; text-align:center; margin-top:1rem;" data-umami-event="cta-producte" data-umami-event-categoria="mobiliari">Ser partner exclusiu</a>
```

- [ ] **Step 7: Commit**

```bash
git add src/pages/productes/bancs/ src/pages/productes/fonts-i-bebedors/ src/pages/productes/taules-de-picnic/ src/pages/productes/papereres/ src/pages/productes/pilones-i-bolards/ src/pages/productes/alcorques/
git commit -m "analytics: track mobiliari urbà CTAs"
```

---

## Task 3e: productes/index.astro + [slug].astro

**Arxius:**
- Modify: `src/pages/productes/index.astro` (línia 158)
- Modify: `src/pages/productes/[slug].astro` (línia 70)

- [ ] **Step 1: productes/index.astro**

Busca:
```html
<a href="/contacte" class="guia-pill guia-pill-primary">Contactar →</a>
```
Substitueix per:
```html
<a href="/contacte" class="guia-pill guia-pill-primary" data-umami-event="cta-producte" data-umami-event-categoria="index">Contactar →</a>
```

- [ ] **Step 2: [slug].astro**

En aquest arxiu, `slug` és la variable disponible al frontmatter. Busca:
```html
<a href="/contacte" class="btn-contact">Sol·licitar informació</a>
```
Substitueix per (nota: `{slug}` és interpolació Astro):
```html
<a href="/contacte" class="btn-contact" data-umami-event="cta-producte" data-umami-event-categoria={slug}>Sol·licitar informació</a>
```

- [ ] **Step 3: Commit**

```bash
git add src/pages/productes/index.astro src/pages/productes/[slug].astro
git commit -m "analytics: track productes index and dynamic slug CTAs"
```

---

## Task 4: Push i verificació final

- [ ] **Step 1: Verificar astro check global**

```bash
npx astro check
```
Esperat: 0 errors.

- [ ] **Step 2: Push a GitHub (activa deploy Vercel)**

```bash
git push
```

- [ ] **Step 3: Verificar al dashboard Umami en Temps Real**

1. Obre https://umami-production-c3fa.up.railway.app (login)
2. Selecciona el website `mobiliariurba.cat`
3. Ves a **Temps real**
4. Obre `https://mobiliariurba.cat/contacte` en una altra pestanya
5. Fes clic al link de l'email → ha d'aparèixer l'event `email-click` al dashboard
6. Navega a qualsevol pàgina de producte → fes clic al CTA → ha d'aparèixer `cta-producte`
7. Envia el formulari de contacte → ha d'aparèixer `form-enviat`

---

## Task 5: Configuració manual del dashboard Umami

> Aquesta tasca no requereix codi. Cal fer-la manualment al dashboard Umami un cop el codi estigui desplegat.

### 5.1 Objectius (Goals)

Navega a: **Umami → Website → Edit → Goals → Add goal**

| # | Nom | Tipus | Valor |
|---|---|---|---|
| 1 | Formulari enviat | Event name | `form-enviat` |
| 2 | Clic email | Event name | `email-click` |
| 3 | Visita pàgina contacte | Page URL | `/contacte` |

### 5.2 Embuts (Funnels)

Navega a: **Umami → Website → Edit → Funnels → Add funnel**

**Embut 1 — Producte → Lead**

Nom: `Producte → Lead`
Steps:
1. Page URL → contains → `/productes/`
2. Page URL → equals → `/contacte`
3. Event name → equals → `form-enviat`

**Embut 2 — Contingut → Lead**

Nom: `Contingut → Lead`
Steps:
1. Page URL → contains → `/blog/` OR `/guia/`
2. Page URL → contains → `/productes/`
3. Page URL → equals → `/contacte`
4. Event name → equals → `form-enviat`

**Embut 3 — Directe → Lead**

Nom: `Directe → Lead`
Steps:
1. Page URL → equals → `/`
2. Page URL → equals → `/contacte`
3. Event name → equals → `form-enviat`
