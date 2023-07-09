import {defineField, defineType, validation} from 'sanity'

export default defineType({
  name: 'dish',
  title: 'dish',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'dish name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      type: 'number',
      title: 'price of dish',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'string',
      title: 'dish description',
    }),
    defineField({
      name: 'waittime',
      type: 'string',
      title: 'minutes to prepare the dish',
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'image of food',
    }),
  ]
})
