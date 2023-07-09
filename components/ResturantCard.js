import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { StarIcon } from 'react-native-heroicons/solid'
import {MapPinIcon} from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'
import { useNavigation } from '@react-navigation/native'

const ResturantCard = ({
    id,
    imgUrl,
    title,
    price,
    genre,
    address,
    shortDesc,
    dishes,
    long,
    lat,
}) => {
  // console.log(price)
  // allows you to navigate between pages 
  const navigation = useNavigation();
  return (
    // make the card clickable
    <TouchableOpacity 
    onPress={() => {
      console.log("going to " + title)
      navigation.navigate('Restaurant',
      {    
        id,
        imgUrl,
        title,
        price,
        genre,
        address,
        shortDesc,
        dishes,
        long,
        lat
      })
    }}
    className='bg-white mr-3 shadow-sm w-64 h-60'>
      <Image
        source={{
          uri:urlFor(imgUrl).url(),
        }}
        className="h-36 w-64 rounded-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2">{title}</Text>
        <View className='flex-row items-center space-x-1'>
          <StarIcon color="green" opacity={0.5} size={22}/>
          <Text className='text-gray-500 text-xs'>
            <Text className="text-green-500 text-center text-lg">{price}</Text> - {genre}
          </Text>
        </View>
        <View className="flex-row space-x-2 items-center">
          <MapPinIcon color={'pink'} opacity={0.8} size={22}/>
          <View style={{ maxWidth: '90%' }} className="items-center">
            <Text className='text-gray-500 text-xs text-left'> {address} </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default ResturantCard