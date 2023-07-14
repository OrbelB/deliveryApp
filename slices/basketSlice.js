import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
}

export const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.items = [...state.items, action.payload]
    },
    removeItem: (state, action) => {
      const index = state.items.findIndex((items) => items.id === action.payload.id);
      let newBasket = [...state.items];
      if(index >= 0){
        newBasket.splice(index, 1);
      } else {
        console.log("cant remove item" + action.payload.id + action.payload.name)
      }
      state.items = newBasket;
    },
  },
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem } = basketSlice.actions

// allows you to access the global state
export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithid = (state, id) => state.basket.items.filter((items) => items.id === id);

export const selectBasketTotal = (state) => state.basket.items.reduce((total, items) => total+=items.price, 0);

export default basketSlice.reducer

