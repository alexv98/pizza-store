import {Status} from "../types";

export interface IPizzaBlock {
  id: string
  imageUrl: string
  name: string
  types: number[]
  sizes: number[]
  price: number
  category: number
  rating: number
}

export interface IPizzasSlice {
  status: Status
  itemsPizzas: IPizzaBlock[]
}
