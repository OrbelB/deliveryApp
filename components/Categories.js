import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client from '../sanity'

const Categories = () => {

    const [category, setCategory] = useState([]);
    // do it once when its app is loaded
    useEffect(() => {
        client.fetch(`
        *[_type == 'category']
        `)
            .then((data) => setCategory(data))
    },[])
return (
    <ScrollView 
    horizontal
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
    }}
    >
        {/* Category card */}
        {/* passing in props */}
        {category?.map(cat=>(
                    <CategoryCard key={cat._id} cardImage={cat.image} title={cat.name}/>
        ))}
        


    </ScrollView>
)}

export default Categories