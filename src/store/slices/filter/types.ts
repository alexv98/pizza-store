import {Status} from "../types";

export interface ISort {
  name: 'популярности' | 'цене' | 'названию',
  value: 'rating' | 'price' | 'name'
}

export interface IFilter {
  categories: {
    status: Status
    itemsCategories: string[]
    activeCategory: number
  },
  sorts: {
    status: Status
    itemsSort: ISort[]
    activeSort: ISort
    inverted: boolean
  },
  search: {
    searchValue: string
  }
}