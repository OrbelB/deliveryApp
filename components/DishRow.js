import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, selectBasketItems, selectBasketItemsWithid } from '../slices/basketSlice';


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
    //state is a call back function
    const items = useSelector((state) => selectBasketItemsWithid(state,id));
    const [isPressed, setIsPressed] = useState(false);

    // gives the abilities to fire off actions
    const dispatch = useDispatch();

    // redux stuff 
    const addItemsToBasket = () => {
        dispatch(addItem({id, name, desc, price, image, waitTime}))
    };

    const removeItemFromBasket = () => {
        if(!items.length > 0) {
            // console.log("no items to remove")
            return;
        }
        dispatch(removeItem({id}))
    }


return (
    <>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)} 
            className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0 bg-gray-100"}`} >
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
            <View className={`flex-row items-center space-x-2 pb-1  pt-1 pl-2 bg-gray-100 ${items.length>0 && "bg-green-100"}`}>
                <TouchableOpacity 
                onPress={removeItemFromBasket}
                disabled={items.length == 0}
                >
                    <MinusCircleIcon
                    color={items.length > 0 ? "red" : "grey"}
                    size={40}/>
                </TouchableOpacity>
                {/* Items counter */}
                <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemsToBasket}>
                    <PlusCircleIcon
                    color={items.length > 0 ? "#00CCBB" : "green"}
                    size={40}/>
                </TouchableOpacity>

            </View>
        </View>
    )}
    </>
)}

export default DishRow