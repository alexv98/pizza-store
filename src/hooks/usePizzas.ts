import {useMemo} from 'react'
import {IPizzaBlock} from "../store/slices/pizzas/types";
import {IFilter} from "../store/slices/filter/types";


export const useCategorized = (
  pizzas: IPizzaBlock[],
  activeCategory: IFilter['categories']['activeCategory']
) => {
  return useMemo(() => {
    if (activeCategory) {
      return [...pizzas].filter(item => item.category === activeCategory)
    }
    return pizzas
  }, [activeCategory, pizzas])
}

export const useCategorizedSorted = (
  pizzas: IPizzaBlock[],
  activeCategory: IFilter['categories']['activeCategory'],
  sort: IFilter['sorts']
) => {
  const categorizedPizzas = useCategorized(pizzas, activeCategory)

  const {activeSort, inverted} = sort

  const categorizedSortedPizzas = useMemo(() => {
    if(activeSort.value === 'rating' || activeSort.value === 'price') {
      return [...categorizedPizzas].sort((a, b) =>
        +a[activeSort.value] - +b[activeSort.value])

    } else {
      return [...categorizedPizzas].sort((a, b) =>
        String(a[activeSort.value]).localeCompare(String(b[activeSort.value])))
    }
  },[sort, categorizedPizzas])

  if(inverted) {
    return categorizedSortedPizzas.reverse()
  }
  return categorizedSortedPizzas
}

export const useFilteredPizzas = (
  pizzas: IPizzaBlock[],
  activeCategory: IFilter['categories']['activeCategory'],
  sort: IFilter['sorts'],
  search: IFilter['search']
) => {
  const categorizedSortedPizzas = useCategorizedSorted(pizzas, activeCategory, sort)

  const filteredPizzas = useMemo(() => {
    if(search) {
      return [...categorizedSortedPizzas]
        .filter(pizza => pizza.name.toLowerCase().includes(search.searchValue))
    }
    return categorizedSortedPizzas
  }, [search, categorizedSortedPizzas])

  return filteredPizzas
}