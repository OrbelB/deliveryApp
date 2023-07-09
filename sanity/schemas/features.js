import {defineField,  defineType ,validation} from 'sanity'

export default defineType({
    name: 'features',
    type: 'document',
    title: 'Featured menu categories',
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            title: 'feature cat name',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'desc',
            type: 'string',
            title: 'short desc',
            validation: (Rule) => Rule.required(),
        }),
        {
            name: "resturants",
            type: "array",
            title: "resturants",
            of: [{type:"reference", to: [{type: "resturant"}] }],
        }
    ],
})