import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';


const DishRow = ({
    id,
    name,
    desc,
    price,
    waitTime,
    image
}) => {
    const [valueFormattedWithSymbol, valueFormattedWithoutSymbol, symbol] = formatCurrency({ amount: price, code: "USD" })
    if(!desc){
        desc = name + " dish wonderfully cooked by us"
    }
    const [isPressed, setIsPressed] = useState(false);
return (
    <>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)} 
            className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0 bg-green-100"}`} >
        <View className="flex-row">
            <View className="flex-1 pr-2">
                <Text className='text-lg mb-1'>{name}</Text>
                <Text className='text-sm mb-1 text-gray-400'>{desc}</Text>
                <Text>{valueFormattedWithSymbol}</Text>
            </View>
            <View>
            {image && (
                <Image
                    source={{uri: urlFor(image).url()}}
                    className="h-20 w-20 bg-gray-200 p-4"
                />
            )}
            </View>
        </View>
    </TouchableOpacity>
    {isPressed && (
        <View>
            <View className="flex-row items-center space-x-2 pb-3s bg-green-100">
                <TouchableOpacity>
                    <MinusCircleIcon
                    // color={items.length > 0 ? "#00CCBB" : "red"}
                    size={40}/>
                </TouchableOpacity>
                {/* Items counter */}
                <Text>0</Text>
                <TouchableOpacity>
                    <PlusCircleIcon
                    // color={items.length > 0 ? "#00CCBB" : "red"}
                    size={40}/>
                </TouchableOpacity>

            </View>
        </View>
    )}
    </>
)}

export default DishRow

// 2:25