import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'utbildning',
  title: 'Utbildningar',
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
      name: 'larosate',
      title: 'Lärosäte',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nivaPoang',
      title: 'Nivå & poäng (t.ex. Kandidat, 180 hp)',
      type: 'string',
    }),
    defineField({
      name: 'amnesomrade',
      title: 'Ämnesområde',
      type: 'string',
      options: {
        list: [
          {title: 'Teknik', value: 'Teknik'},
          {title: 'Ekonomi', value: 'Ekonomi'},
          {title: 'Hållbarhet', value: 'Hållbarhet'},
          {title: 'Data & AI', value: 'Data & AI'},
          {title: 'Samhällsvetenskap', value: 'Samhällsvetenskap'},
          {title: 'Övrigt', value: 'Övrigt'},
        ],
      },
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
    defineField({
      name: 'ansokanslank',
      title: 'Ansökningslänk',
      type: 'url',
    }),
  ],
  preview: {
    select: {
      title: 'rubrik',
      subtitle: 'larosate',
      media: 'bild',
    },
  },
})
