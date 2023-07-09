import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CategoryCard = ({cardImage, title}) => {
return (
    // This is a touchable button
    // This means when you touch it the opacity will change
    // Need to make the parent relative or else
    <TouchableOpacity className="relative mr-2">
        <Image
      source={{
        uri:urlFor(cardImage).url(),
      }}
            className="rounded-lg w-40 h-40 bg-blue-600"
        />
        <Text className="absolute bottom-1 left-1 text-white font-bold">{title}</Text>
    </TouchableOpacity>
)}

export default CategoryCard

// 1:58

// tapz40Vmyzq