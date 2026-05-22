# Umami Analytics — Disseny de configuració

**Data:** 2026-05-18  
**Projecte:** mobiliariurba.cat  
**Estat:** Aprovat

---

## Context

Umami ja està instal·lat al `Layout.astro` (script defer, website-id `fbd04185-24ba-4017-bdcb-4eaedb05b96e`). Ara mateix només es capturen pageviews. Cal instrumentar events de conversió i configurar objectius i embuts al dashboard per quan arribi el trànsit orgànic.

---

## Enfocament escollit: Data attributes + JS per al formulari

- `data-umami-event` per a clicks simples (email, nav CTA, CTAs de producte)
- `umami.track()` via JS per a l'enviament reeixit del formulari (Formspree callback)

---

## 1. Events a instrumentar al codi

| Event name | Disparador | Arxiu |
|---|---|---|
| `form-enviat` | Callback JS de Formspree success | `src/pages/contacte.astro` |
| `email-click` | `data-umami-event` al link `mailto:` | `src/pages/contacte.astro` |
| `cta-contacte-nav` | `data-umami-event` al botó "Contacte" del header | `src/layouts/Layout.astro` |
| `cta-producte` | `data-umami-event` als botons "Demana pressupost" | pàgines de producte |

### Propietats addicionals per a `cta-producte`

```html
<a
  href="/contacte"
  data-umami-event="cta-producte"
  data-umami-event-categoria="jocs-infantils"
>
  Demana pressupost
</a>
```

Permet filtrar per `categoria` al dashboard i saber quin nínxol genera més interès.

### Listener JS per al formulari (`contacte.astro`)

`@formspree/ajax@1` mostra l'element `[data-fs-success]` (canvia `display:none` → bloc) quan l'enviament és correcte. Usem `MutationObserver` per detectar-ho de manera fiable:

```js
const successEl = document.querySelector('[data-fs-success]');
if (successEl) {
  new MutationObserver(() => {
    if (successEl.style.display !== 'none') {
      umami.track('form-enviat');
    }
  }).observe(successEl, { attributes: true, attributeFilter: ['style'] });
}
```

---

## 2. Objectius al dashboard Umami

Configuració manual a **Umami → Website → Goals**.

| # | Nom | Tipus | Valor |
|---|---|---|---|
| 1 | Formulari enviat | Event | `form-enviat` |
| 2 | Clic email | Event | `email-click` |
| 3 | Visita contacte | Pageview | `/contacte` |

---

## 3. Embuts (Funnels)

Configuració manual a **Umami → Website → Funnels**.

**Embut 1 — Producte → Lead**
1. URL conté `/productes/`
2. URL = `/contacte`
3. Event = `form-enviat`

**Embut 2 — Contingut → Lead**
1. URL conté `/blog/` o `/guia/`
2. URL conté `/productes/`
3. URL = `/contacte`
4. Event = `form-enviat`

**Embut 3 — Directe → Lead**
1. URL = `/`
2. URL = `/contacte`
3. Event = `form-enviat`

---

## 4. UTMs

De moment el trànsit és Google Orgànic — no cal cap canvi de codi. Umami captura els paràmetres UTM automàticament quan s'inclouen als links externs.

Quan s'iniciïn campanyes de LinkedIn o newsletters, els links seguiran el patró:
```
https://mobiliariurba.cat/productes/jocs-infantils
  ?utm_source=linkedin&utm_medium=social&utm_campaign=EN1176-juny26
```

---

## 5. Arxius afectats

| Arxiu | Canvi |
|---|---|
| `src/layouts/Layout.astro` | Afegir `data-umami-event="cta-contacte-nav"` al `<a href="/contacte">` del header |
| `src/pages/contacte.astro` | Afegir `data-umami-event="email-click"` al mailto + listener JS `formspree:success` |
| Pàgines de producte (totes) | Afegir `data-umami-event="cta-producte"` + `data-umami-event-categoria` als botons CTA |

---

## 6. Fora d'abast (ara)

- Revenue tracking (no hi ha preu de lead definit encara)
- Retention / cohorts (necessita més volum de dades)
- A/B testing de CTAs
