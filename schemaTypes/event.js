import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Events',
  type: 'document',
  fields: [
    defineField({
      name: 'rubrik',
      title: 'Rubrik',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      options: {source: 'rubrik'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bild',
      title: 'Bild',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ingress',
      title: 'Kort ingress (puff)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'eventdatum',
      title: 'Eventdatum',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventslut',
      title: 'Sluttid',
      type: 'datetime',
    }),
    defineField({
      name: 'plats',
      title: 'Plats',
      type: 'string',
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Seminarium', value: 'Seminarium'},
          {title: 'Konferens', value: 'Konferens'},
          {title: 'Nätverksmöte', value: 'Nätverksmöte'},
          {title: 'Webinar', value: 'Webinar'},
          {title: 'Övrigt', value: 'Övrigt'},
        ],
      },
    }),
    defineField({
      name: 'brodtext',
      title: 'Brödtext',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'anmalanlank',
      title: 'Anmälningslänk',
      type: 'url',
    }),
    defineField({
      name: 'citat',
      title: 'Utdraget citat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'faktaruta',
      title: 'Faktaruta',
      type: 'object',
      fields: [
        defineField({
          name: 'rubrik',
          title: 'Rubrik',
          type: 'string',
        }),
        defineField({
          name: 'innehall',
          title: 'Innehåll',
          type: 'text',
          rows: 4,
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'rubrik',
      subtitle: 'eventdatum',
      media: 'bild',
    },
  },
})
