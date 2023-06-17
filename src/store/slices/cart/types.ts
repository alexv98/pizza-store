
export interface IPizzaCart {
  id: string
  imageUrl: string
  name: string
  type: number
  size: number
  price: number
  count: number
}

export interface ICart {
  cartItems: IPizzaCart[],
  cartCounts: number,
  cartPrice: number
}

export interface PayloadAddDelete {
  item: IPizzaCart,
  action: 'add' | 'removeOne' | 'removeAll'
}

