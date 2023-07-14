import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    restaurant: {
        id: null,
        imgUrl: null,
        title: null,
        price: null,
        genre: null,
        address: null,
        shortDesc: null,
        dishes: null,
    },
}

export const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState,
    reducers: {
        setRestaurant: (state, action) => {
            state.restaurant = action.payload;
        },
    },
})

// Action creators are generated for each case reducer function
export const { setRestaurant } = restaurantSlice.actions

// allows you to access the global state
export const selectRestaurant = (state) => state.restaurant.restaurant;

export default restaurantSlice.reducer

