import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux';
import { selectRestaurant } from '../slices/restaurantSlice';
import { selectBasketItems, selectBasketTotal } from '../slices/basketSlice';
import { useState } from 'react';
import { useEffect } from 'react';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import { CurrencyDollarIcon } from 'react-native-heroicons/solid';
import { removeItem } from '../slices/basketSlice';
import PreparingOrderScreen from './PreparingOrderScreen';

const BasketScreen = () => {

    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items = useSelector(selectBasketItems);
    const [groupItemsInBasket, setgroupItemsInBasket] = useState([])
    const dispatch = useDispatch();
    const basketTotal = useSelector(selectBasketTotal);
    // console.log(restaurant)
    const salesTax = (basketTotal* .1025).toFixed(2);
    const deliveryFee = (basketTotal*.25).toFixed(2);
    const total = ( parseFloat(basketTotal) + parseFloat(deliveryFee) + parseFloat(salesTax)).toFixed(2)


    // Optimization, if the value of items does not change it wont recompute the value
    useEffect(()=> {
        const groupedItems = items.reduce((results, item) => {
            (results[item.id] = results[item.id] || []).push(item);
            return results;
        }, {});
        setgroupItemsInBasket(groupedItems);
    }, [items])

return (
    <SafeAreaView className='flex-1 bg-white'>
        <View className='flex-1 bg-gray-100'>
            <View className='p-5 border-b-4 border-[#00CCBB] bg-white shadow-xs'>
                <View>
                    <Text className='text-lg font-extrabold text-center'>Order From</Text>
                    <Text className='text-4xl font-extrablod text-center'>{restaurant.title}</Text>
                </View>
                <TouchableOpacity 
                    onPress={navigation.goBack}
                    className='absolute top-5 right-5'>
                        <XCircleIcon color='red' height={30} width={30}/>
                </TouchableOpacity>
            </View>
            <View className='flex-row items-center space-x-4 px-4 py-3 bg-white my-5'>
                <Image source={{
                    uri: "https://links.papareact.com/wru",
                }}
                className='h-7 w-9 bg-gray-300 p-4 rounded-full'
                />
            
                {/* since there isnt really a backend or location set up this will do */}
                <Text className='flex-1'>Delivery in ###</Text>
                <TouchableOpacity>
                    <Text className='text-[#00CCBB]'>Update Delivery</Text>
                </TouchableOpacity>
            </View>

            <ScrollView className='divide-y-2 divide-gray-300'>
                {Object.entries(groupItemsInBasket).map(([key, items]) => (
                    
                    <View key={key} className='flex-row items-center space-x-3 bg-white py-2 px-5'>
                        <Text>{items.length} x </Text>
                        {items[0]?.image && <Image
                            source={{uri: urlFor(items[0]?.image).url()}}
                            className='h-12 w-12 rounded-full'
                        />}
                        {!items[0]?.image && <Image
                            source={{uri: urlFor(restaurant.imgUrl).url()}}
                            className='h-12 w-12 rounded-full'
                        />

                        }
                        <Text className='flex-1'>{items[0].name}</Text>
                        
                        <CurrencyDollarIcon color='#00CCBB'/>
                        <Text>{items[0]?.price}</Text>

                        <TouchableOpacity className='border rounded-full bg-red-400' onPress={() => dispatch(removeItem({id: key}))}>
                            <Text className='text-white text-xs p-1' >
                                Remove
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
                {/* Subtotal */}
            </ScrollView>
            <View className='p-5 bg-white mt-5 space-y-4'>
                <View className='flex-row justify-between'>
                    <Text className='font-bold' >Subtotal</Text>
                    <Text className='font-extrabold'>$ {(basketTotal).toFixed(2)}</Text>
                    
                </View>
                <View className='flex-row justify-between'>
                    <Text className='font-bold' >Delivery fee</Text>
                    <Text className='font-extrabold'>$ {deliveryFee}</Text>                    
                </View>
                <View className='flex-row justify-between'>
                    <Text className='font-bold' >Tax</Text>
                    <Text className='font-extrabold'>$ {salesTax}</Text>                    
                </View>
                <View className='flex-row justify-between'>
                    <Text className='font-bold' >Total</Text>
                    <Text className='font-extrabold'>$ {(total)}</Text>                    
                </View>

                <TouchableOpacity 
                onPress={() => navigation.navigate('preparingOrderScreen')}
                className='rounded-lg bg-green-400 p-4'>
                    <Text className='text-center text-white text-xl font-bold'>Place Order</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
)}

export default BasketScreen