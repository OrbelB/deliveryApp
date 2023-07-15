import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { XMarkIcon } from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress'
import MapView from 'react-native-maps';

const DeliveryScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant)


return (
    <View className='bg-[#00CCBB] flex-1'>
        <SafeAreaView className='z-50'>
            <View className='flex-row justify-between items-center p-5'>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <XMarkIcon color={"white"}/>
                </TouchableOpacity>
                <Text className='font-light text-white'> Contact Support </Text>
            </View>
            <View className='bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-lg space-y-2 shadow-purple-300'>
                <View className='flex-row justify-between'>
                    <View>
                        <Text className='text-xs'>Estimated Arrival</Text>
                        <Text className='text-4xl font-extrabold'>00:00 PM</Text>
                    </View>
                    <Image
                        source={{
                            uri: 'https://links.papareact.com/fls'
                        }}
                        className='h-20 w-20'
                    />
                </View>
                <Progress.Bar size={30} color='#00CCBB' indeterminate={true}/>

                <Text className='mt-3 text-gray-500'>
                    Order from {restaurant.title} is being prepared
                </Text>
            </View>
        </SafeAreaView>
    </View>
)}

export default DeliveryScreen