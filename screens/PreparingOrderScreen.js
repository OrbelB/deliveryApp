import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native';

//React native animatable
const PreparingOrderScreen = () => {
    const navigation = useNavigation();

    // Simulating the accepting order part 
    useEffect(()=>{
        setTimeout(() => {
            navigation.navigate("deliveryScreen")
        }, 4000)
    }, []);
return (
    <SafeAreaView className='bg-[#00CCBB] flex-1 justify-center items-center'>
        <Animatable.Image
            source={require("../assets/deliver_gif.gif")}
            animation='slideInUp'
            iterationCount={1}
            className='w-96 h-96'
        />
        <Animatable.Text
            animation='slideInUp'
            iterationCount={1}
            className='text-lg my-10 text-white font-bold text-center'
        >
            Order being prepared
        </Animatable.Text>
        <Progress.Bar size={60} indeterminate={true} color={'white'}/>
    </SafeAreaView>
)}

export default PreparingOrderScreen