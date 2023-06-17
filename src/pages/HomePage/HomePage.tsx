import React, {memo, useEffect} from "react";
import {useRootDispatch, useRootSelector} from "../../store";
import PizzaBlock from "../../components/Pizzas/PizzaBlock/PizzaBlock";
import styles from './HomePage.module.scss'
import {Status} from "../../store/slices/types";
import {Skeleton} from "../../components/Pizzas/Skeleton";
import {fetchPizzas} from "../../store/slices/pizzas/asyncActions";
import Pagination from "../../components/Pagination/Pagination";
import {useFilteredPizzas} from "../../hooks/usePizzas";
import {setActivePage, setCountPagesArray} from "../../store/slices/pagination/slice";
import Empty from "../../components/Empty/Empty";
import Categories from "../../components/Categories/Categories";
import Sort from "../../components/Sort/Sort";

const HomePage = () => {

  const dispatch = useRootDispatch()
  const {itemsPizzas, status} = useRootSelector(state => state.pizzas)
  const {sorts, search} = useRootSelector(state => state.filter)
  const {itemsCategories, activeCategory} = useRootSelector(state => state.filter.categories)
  const {activePage, limitItems} = useRootSelector(state => state.pagination)

  const filteredPizzas = useFilteredPizzas(itemsPizzas, activeCategory, sorts, search)

  const activeItems = filteredPizzas
    .slice(limitItems*(activePage-1), limitItems*activePage)
    .map(item => <li key={item.id}><PizzaBlock {...item} /></li>)

  const skeletons = [...new Array(limitItems)].map((_, index) => <Skeleton key={index} />)

  useEffect(() => {
    dispatch(fetchPizzas())
    dispatch(setCountPagesArray(filteredPizzas.length))
  }, [])

  useEffect(() => {
    dispatch(setCountPagesArray(filteredPizzas.length))
    dispatch(setActivePage(1))
  }, [filteredPizzas.length])


  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h1 className='content__title'>{itemsCategories[activeCategory]} пиццы</h1>
      <div className={styles.HomePage}>
        <ul className={styles.HomePage__content}>
          {
            status === Status.PENDING ?
               skeletons :
              status === Status.SUCCEEDED && activeItems.length ?
                activeItems
            : <Empty />
          }
        </ul>
        <Pagination />
      </div>
    </>
  );
};

export default HomePage;
