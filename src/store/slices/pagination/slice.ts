import {IPagination} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState: IPagination = {
  countPagesArray: [],
  activePage: 1,
  limitItems: 8
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCountPagesArray: (state, action: PayloadAction<number>) => {
      state.countPagesArray = []
      const limit = Math.ceil(action.payload / state.limitItems)

      for (let i = 0; i < limit; i++) {
        state.countPagesArray.push(i+1)
      }
    },
    setActivePage: (state, action: PayloadAction<IPagination['activePage']>) => {
      state.activePage = action.payload
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
})

export const {setCountPagesArray, setActivePage} = paginationSlice.actions
export default paginationSlice.reducer