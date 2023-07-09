import { View, Text, ScrollView } from 'react-native'
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline'
import ResturantCard from './ResturantCard'
import {client} from '../sanity';

const FeatureRow = ({id, title, description}) => {

    const [resturant, setRestaurant] = useState([])
    useEffect(() =>{
        client.fetch(`
        *[_type == 'features' && _id == $id] {
            ...,
            resturants[]-> {
              ...,
              dishes[]->,
              type->{
                name
              }
            },
          }
        `, {id})
        .then((data)=> {setRestaurant(data[0].resturants)})
    },[id])
return (
    <View>
        <View className="mt-4 flex-row items-center justify-between px-4">
            <Text className="font-bold text-lg ">{title}</Text>
            <ArrowRightIcon/>
        </View>
        <Text className="text-xs text-gray-500 px-4">{description}</Text>
        <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        contentContainerStyle={{
            paddingHorizontal:15, 
            paddingTop:20,
        }}>
            {resturant?.map(resturant =>(
                            <ResturantCard
                            key={resturant._id}
                            id={resturant._id}
                            imgUrl={resturant.image}
                            title={resturant.Resturant}
                            price={resturant.Price}
                            genre={resturant.type?.name}
                            address={resturant.address}
                            shortDesc={resturant.description}
                            dishes={resturant.dishes}
                            long={Math.random()}
                            lat={Math.random()}
                            />
            ))}
        </ScrollView>
    </View>
)}

export default FeatureRow