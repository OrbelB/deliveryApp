import { View, Text, SafeAreaView, Image, TextInput, ScrollView } from 'react-native';
import React, { useLayoutEffect, useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  UserIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  AdjustmentsVerticalIcon
} from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeatureRow from '../components/FeatureRow';
import { client } from "../sanity";

const HomeScreen = () => {
  // piece of state
  const navigation = useNavigation();
  // the first enitial state will be an empty array
  const [featuredCategories, setFeaturedCategories] = useState({})

  // This is when the UI initially loads
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  // when a component loads initially
  useEffect(()=> {
    client.fetch(`*[_type == 'features'] {
      ...,
      resturants[]-> {
        ...,
        dishes[] ->,
        type->{
          name
        }
      },
    }`).then(data => setFeaturedCategories(data))
  }, []);

  // console.log(featuredCategories)
  return (
    <SafeAreaView className="bg-white pt-5">
      <View className="flex-row pb-3 items-center mx-4 justify-between space-x-2">
        <Image
          source={{ uri: 'https://links.papareact.com/wru' }}
          className="h-10 w-10 bg-gray-300 p-4 rounded-xl"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs pl-2">Deliver now</Text>
          <Text className="font-semibold text-2xl">
            Current location
            <ChevronDownIcon size={20} color={"#00CCBB"} />
          </Text>
        </View>
        <UserIcon size={35} color={"#00CCBB"} />
      </View>

      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row flex-1 items-center space-x-2 bg-gray-200 p-3 rounded-lg">
          <MagnifyingGlassIcon color={"gray"} size={20} />
          <TextInput placeholder="Search restaurant / dish / drinks" keyboardType="default"/>
        </View>
        <AdjustmentsVerticalIcon color={"#00CCBB"} />
      </View>

      {/* Body */}
      <View>
        <ScrollView className="bg-gray-100 "
            contentContainerStyle={{
                paddingBottom: 240,
            }}
            showsHorizontalScrollIndicator={false}
            >
          {/* Categories */}
          <Categories />
          {/* Featured rows - 3 */}

          {Array.isArray(featuredCategories) && featuredCategories?.map(category => (
            <FeatureRow
            title={category.name}
            description={category.desc}
            id={category._id}
            key={category._id}
            />
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;