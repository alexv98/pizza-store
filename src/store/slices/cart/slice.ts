import {ICart, IPizzaCart, PayloadAddDelete} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../../index";

const initialState: ICart = {
  cartItems: [],
  cartCounts: 0,
  cartPrice: 0
}

export const selectCartItemById = (id: IPizzaCart['id']) => (state: RootState) =>
  state.cart.cartItems
    .filter(pizza => pizza.id === id)
    .reduce((sum, item) => sum+item.count, 0)


export const selectCartItemsByOptions = (
  id: IPizzaCart['id'],
  type: IPizzaCart['type'],
  size: IPizzaCart['size']) => (state: RootState) =>
  state.cart.cartItems.find((pizza) =>
    pizza.id === id &&
    pizza.type === type &&
    pizza.size === size
  )

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCartItems: (state, action: PayloadAction<PayloadAddDelete>) => {
      const findItem = state.cartItems.find(item =>
        item.id === action.payload.item.id &&
        item.size === action.payload.item.size &&
        item.type === action.payload.item.type
      )

      switch (action.payload.action) {
        case "add":
          if(findItem) {
            findItem.count++
          } else {
            state.cartItems = [...state.cartItems, action.payload.item]
          } break


        case "removeOne":
          if(findItem!.count === 1) {
            state.cartItems.splice(state.cartItems.indexOf(findItem!), 1)
          } else {
            findItem!.count--
          } break


        case "removeAll":
          state.cartItems.splice(state.cartItems.indexOf(findItem!), 1)
          break
      }


      state.cartCounts = state.cartItems.reduce((sum, item) => sum + item.count, 0)
      state.cartPrice = state.cartItems.reduce((sum, item) => sum + item.price*item.count, 0)
    },
    setClearCart: (state) => {
      state.cartItems = []
      state.cartCounts = 0
      state.cartPrice = 0
    }
  }
})

export const {toggleCartItems, setClearCart} = cartSlice.actions
export default cartSlice.reducer