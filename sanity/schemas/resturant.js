import {defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'resturant',
  title: 'Resturant',
  type: 'document',
  fields: [
    defineField({
      name: 'Resturant',
      title: 'Resturnat name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'short desc',
      type: 'string',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'image',
      title: 'image',
      type: 'image',
    }),
    defineField({
      name: 'lat',
      title: 'latitude of resturant',
      type: 'number',
    }),
    defineField({
      name: 'long',
      title: 'log of resturant',
      type: 'number',
    }),
    defineField({
      name: 'address',
      title: 'resturnat address',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'avg price $ - $$$$$',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    {
      name: 'type',
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{type: "category"}]
    },
    {
      name: "dishes",
      type: "array",
      title: "dishes",
      of: [{type:"reference", to: [{type: "dish"}] }],
    }
  ],

})
