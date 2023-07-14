import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
// import { SafeAreaView } from 'react-native-safe-area-context';
import { urlFor } from '../sanity';
import { ArrowLeftCircleIcon, ArrowLeftIcon, ChevronDoubleRightIcon, MapPinIcon, QuestionMarkCircleIcon, StarIcon } from 'react-native-heroicons/solid';
import { ChevronRightIcon } from 'react-native-heroicons/outline';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setRestaurant } from '../slices/restaurantSlice';

const RestaurantScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
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

    useEffect(() => {
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            price,
            genre,
            address,
            shortDesc,
            dishes,
        }))
    }, [dispatch])

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
    // console.log(dishes[0].image)
return (
    <>
    <BasketIcon/>
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
                <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y">
                    <QuestionMarkCircleIcon color={'gray' }/>
                    <Text className="pl-2 flex-1 text-md front-bold">
                        Resturant Food&Safty Grade 
                    </Text>
                    <ChevronRightIcon/>
                </TouchableOpacity>
            </View>

            <View className='pb-32'>
                <Text className="px-4 pt-6 font-bold text-xl">Menu</Text>
                {/* Dish Rows */}
                {dishes.map(dish => (
                    <DishRow
                        key={dish._id}
                        id={dish._id}
                        name={dish.name}
                        desc={dish.description}
                        price={dish.price}
                        waitTime={dish.waitTime}
                        image={dish.image}
                    />
                ))}
                
            </View>

        </ScrollView>
    </>
)}

export default RestaurantScreen