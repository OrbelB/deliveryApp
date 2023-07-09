import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { urlFor } from '../sanity';
import { ArrowLeftCircleIcon, ArrowLeftIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid';

const RestaurantScreen = () => {

    const navigation = useNavigation();
    // pull the arguments you passed along use root
    // const route = useRoute();
    // can do route.params.title ...
    // can also destructure it to get the params out 
    const {
        params: {
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
        },
    } = useRoute();

    // Idea here would be to have diffrent colors representing if the resturant is open / closed, special deals graphic, etc
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: title,
            headerShown: false,
            headerStyle: {
                backgroundColor: 'green',
            },
            headerTintColor: 'black',
        })
    }, [navigation, title]);
  return (
    // <SafeAreaView>
        <ScrollView 
        >
            <View className="relative">
                <Image
                    source={{
                        uri: urlFor(imgUrl).url(),
                    }}
                    className='w-full h-56 bg-black p-4'
                />
                <TouchableOpacity 
                    className="absolute top-14 left-5 p-2"
                    onPress={navigation.goBack}
                >
                    <ArrowLeftCircleIcon 
                    size={28} color={'#00CCBB'}/>
                </TouchableOpacity>
            </View>
            {/* Resturant Information */}
            <View className='bg-white'>
                <View className="px-4 pt-4">
                    <Text className="text-3xl font-bold">
                        {title} 
                    </Text>
                    <View className="flex-col my-1 space-y-1">
                        <View className="flex-row items-center space-x-2">
                            <StarIcon color={'green'} opacity={.5} size={25}/>
                            <Text className='text-gray-500 text-xs'>
                                <Text className="text-green-500 text-center text-lg">{price}</Text> - {genre}
                            </Text>
                        </View>
                        <View className="flex-row items-center space-x-2">
                            <MapPinIcon color={'gray'} opacity={.5} size={25}/>
                            <Text className="text-gray-500 text-center text-lg">ShowDist</Text>
                            <View style={{ maxWidth: '70%' }} className="items-center">
                                <Text className='text-gray-500 text-xs text-left'> {address} </Text>
                            </View>
                        </View>
                        <View className=" items-center space-x-2 bg-gray-200 rounded-md p-2">
                            <Text className="text-gray-500 mt-2 pb-4">{shortDesc + shortDesc + shortDesc + shortDesc}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity>
                    <QuestionMarkCircleIcon/>
                </TouchableOpacity>
            </View>
        </ScrollView>
    // </SafeAreaView>
  )
}

export default RestaurantScreen