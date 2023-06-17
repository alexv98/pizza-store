import {IFilter} from "./types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Status} from "../types";
import {fetchCategories, fetchSorts} from "./asyncActions";

export const pizzaTypes = ['тонкое', 'традиционное']
export const pizzaSizes = [26, 30, 40]

const initialState: IFilter = {
  categories: {
    status: Status.IDLE,
    itemsCategories: [],
    activeCategory: 0
  },
  sorts: {
    status: Status.IDLE,
    itemsSort: [],
    activeSort: {
      name: 'популярности',
      value: 'rating'
    },
    inverted: false
  },
  search: {
    searchValue: ''
  },
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setActiveCategory: (state, action:PayloadAction<IFilter['categories']['activeCategory']>) => {
      state.categories.activeCategory = action.payload
    },
    setActiveSort: (state, action:PayloadAction<IFilter['sorts']['activeSort']>) => {
      state.sorts.activeSort = action.payload
      state.sorts.inverted = false
    },
    setSortBy: (state) => {
      state.sorts.inverted = !state.sorts.inverted
    },
    setSearchValue: (state, action: PayloadAction<IFilter['search']['searchValue']>) => {
      state.search.searchValue = action.payload
    },
  },
  extraReducers: (builder) => {
    //Categories
    builder.addCase(fetchCategories.pending, (state) => {
      state.categories.status = Status.PENDING
      state.categories.itemsCategories = []
    })
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories.itemsCategories = action.payload
      state.categories.status = Status.SUCCEEDED
    })
    builder.addCase(fetchCategories.rejected, (state) => {
      state.categories.status = Status.FAILED
      state.categories.itemsCategories = []
    });

    //Sorts
    builder.addCase(fetchSorts.pending, (state, action) => {
      state.sorts.status = Status.PENDING
      state.sorts.itemsSort = []
    })
    builder.addCase(fetchSorts.fulfilled, (state, action) => {
      state.sorts.status = Status.SUCCEEDED
      state.sorts.itemsSort = action.payload
      state.sorts.activeSort = state.sorts.itemsSort[0]
    })
    builder.addCase(fetchSorts.rejected, (state, action) => {
      state.sorts.status = Status.FAILED
      state.sorts.itemsSort = []
    })
  }
})

export const {setActiveCategory, setActiveSort, setSortBy, setSearchValue} = filterSlice.actions
export default filterSlice.reducer