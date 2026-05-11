import { config, fields, collection, singleton } from '@keystatic/core';

export default config({
  storage: {
    kind: 'github',
    repo: 'jordimariezcu/mobiliariurba',
  },

  ui: {
    brand: {
      name: 'Mobiliari Urbà',
    },
  },

  collections: {
    productes: collection({
      label: 'Productes',
      slugField: 'nom',
      path: 'src/content/productes/*',
      format: { contentField: 'descripcio' },
      schema: {
        nom: fields.slug({ name: { label: 'Nom' } }),
        categoria: fields.select({
          label: 'Categoria',
          options: [
            { label: 'Bancs', value: 'bancs' },
            { label: 'Papereres', value: 'papereres' },
            { label: 'Jardineres', value: 'jardineres' },
            { label: 'Aparcabicicletes', value: 'aparcabicicletes' },
            { label: 'Faroles', value: 'faroles' },
            { label: 'Pilones', value: 'pilones' },
            { label: 'Jocs infantils', value: 'jocs-infantils' },
            { label: 'Altres', value: 'altres' },
          ],
          defaultValue: 'altres',
        }),
        imatge: fields.image({
          label: 'Imatge principal',
          directory: 'public/imatges/productes',
          publicPath: '/imatges/productes/',
        }),
        galeria: fields.array(
          fields.image({
            label: 'Imatge',
            directory: 'public/imatges/productes',
            publicPath: '/imatges/productes/',
          }),
          { label: 'Galeria d\'imatges', itemLabel: () => 'Imatge' }
        ),
        material: fields.text({ label: 'Material' }),
        dimensions: fields.text({ label: 'Dimensions' }),
        colors: fields.text({ label: 'Colors disponibles' }),
        referencia: fields.text({ label: 'Referència' }),
        destacat: fields.checkbox({ label: 'Producte destacat', defaultValue: false }),
        descripcio: fields.mdx({ label: 'Descripció' }),
      },
    }),

    projectes: collection({
      label: 'Projectes',
      slugField: 'titol',
      path: 'src/content/projectes/*',
      format: { contentField: 'descripcio' },
      schema: {
        titol: fields.slug({ name: { label: 'Títol' } }),
        client: fields.text({ label: 'Client' }),
        ubicacio: fields.text({ label: 'Ubicació' }),
        any: fields.number({ label: 'Any' }),
        imatge: fields.image({
          label: 'Imatge principal',
          directory: 'public/imatges/projectes',
          publicPath: '/imatges/projectes/',
        }),
        galeria: fields.array(
          fields.image({
            label: 'Imatge',
            directory: 'public/imatges/projectes',
            publicPath: '/imatges/projectes/',
          }),
          { label: 'Galeria', itemLabel: () => 'Imatge' }
        ),
        destacat: fields.checkbox({ label: 'Projecte destacat', defaultValue: false }),
        descripcio: fields.mdx({ label: 'Descripció' }),
      },
    }),
  },

  singletons: {
    inici: singleton({
      label: 'Pàgina d\'inici',
      path: 'src/content/inici',
      schema: {
        titular: fields.text({ label: 'Titular principal' }),
        subtitular: fields.text({ label: 'Subtítol', multiline: true }),
        imatge_hero: fields.image({
          label: 'Imatge hero',
          directory: 'public/imatges',
          publicPath: '/imatges/',
        }),
        seccio_productes_titol: fields.text({ label: 'Títol secció productes' }),
        seccio_projectes_titol: fields.text({ label: 'Títol secció projectes' }),
      },
    }),

    empresa: singleton({
      label: 'Informació empresa',
      path: 'src/content/empresa',
      schema: {
        nom: fields.text({ label: 'Nom empresa' }),
        descripcio: fields.text({ label: 'Descripció curta', multiline: true }),
        adreca: fields.text({ label: 'Adreça' }),
        telefon: fields.text({ label: 'Telèfon' }),
        email: fields.text({ label: 'Email' }),
        horari: fields.text({ label: 'Horari', multiline: true }),
        linkedin: fields.text({ label: 'LinkedIn URL' }),
        instagram: fields.text({ label: 'Instagram URL' }),
      },
    }),
  },
});
