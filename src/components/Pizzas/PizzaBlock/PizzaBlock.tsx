import React, {FC, useState} from 'react';
import styles from './PizzaBlock.module.scss'
import stylesBtn from '../../Button/Button.module.scss'
import {IPizzaBlock} from "../../../store/slices/pizzas/types";
import Button, {ButtonTheme} from "../../Button/Button";
import {IPizzaCart} from "../../../store/slices/cart/types";
import {useRootDispatch, useRootSelector} from "../../../store";
import {selectCartItemById, toggleCartItems} from "../../../store/slices/cart/slice";
import {pizzaSizes, pizzaTypes} from "../../../store/slices/filter/slice";

const PizzaBlock: FC<IPizzaBlock> = (pizza) => {

  const dispatch = useRootDispatch()

  const [activeType, setActiveType] = useState(pizza.types[0])
  const [activeSize, setActiveSize] = useState(pizza.sizes[0])

  const setOptions = (
    option: number | string,
    index: number
  ) => {
    if(typeof option === "string") {
      if(pizza.types.includes(index)) {
        setActiveType(index)
      }
    }
    if(typeof option === "number") {
      if(pizza.sizes.includes(option)) {
        setActiveSize(option)
      }
    }
  }

  const addPizza = () => {
    const newPizza: IPizzaCart = {
      id: pizza.id,
      name: pizza.name,
      imageUrl: pizza.imageUrl,
      type: activeType,
      size: activeSize,
      price: pizza.price,
      count: 1
    }
    dispatch(toggleCartItems({item: newPizza, action: 'add'}))
  }

  const addedPizzas = useRootSelector(selectCartItemById(pizza.id))

  return (
    <div className={styles.PizzaBlock}>
      <img className={styles.PizzaBlock__img} src={pizza.imageUrl} alt="pizzaImg"/>
      <h4 className={styles.PizzaBlock__name}>{pizza.name}</h4>
      <div className={styles.PizzaBlock__options}>
        <ul className={styles.PizzaBlock__types}>
          {
            pizzaTypes.map((type, index) =>
              <li
                key={type}
                className={
                  !pizza.types.includes(index) ? styles.inactive
                    : index === activeType ? styles.active : ''
                }
                onClick={() => setOptions(type, index)}
              >
                {type}
              </li>
            )
          }
        </ul>
        <ul className={styles.PizzaBlock__sizes}>
          {
            pizzaSizes.map((size, index) =>
              <li
                key={size}
                className={
                  !pizza.sizes.includes(size) ? styles.inactive
                    : size === activeSize ? styles.active : ''
                }
                onClick={() => setOptions(size, index)}
              >
                {size} см.
              </li>
            )
          }
        </ul>
      </div>
      <div className={styles.PizzaBlock__footer}>
        <span className={styles.PizzaBlock__price}>от {pizza.price} ₽</span>
        <Button
          theme={ButtonTheme.ADD}
          onClick={addPizza}
        >
          {
            addedPizzas ?
              <>
                <span>В корзине</span>
                <span className={stylesBtn.counter}>{addedPizzas}</span>
              </>
              :
              <span>Выбрать</span>
          }
        </Button>
      </div>
    </div>
  );
};

export default PizzaBlock;
