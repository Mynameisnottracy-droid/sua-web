import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'nyhet',
  title: 'Nyheter',
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
      name: 'publiceringsdatum',
      title: 'Publiceringsdatum',
      type: 'date',
      options: {dateFormat: 'YYYY-MM-DD'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategori',
      title: 'Kategori',
      type: 'string',
      options: {
        list: [
          {title: 'Nyheter', value: 'Nyheter'},
          {title: 'Event', value: 'Event'},
          {title: 'Team', value: 'Team'},
          {title: 'Samarbete', value: 'Samarbete'},
          {title: 'Utbildning', value: 'Utbildning'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'brodtext',
      title: 'Brödtext',
      type: 'array',
      of: [{type: 'block'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'citat',
      title: 'Utdraget citat',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'citatKalla',
      title: 'Citatets källa',
      type: 'string',
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
      subtitle: 'publiceringsdatum',
      media: 'bild',
    },
  },
})
