import React, {FC} from 'react';
import styles from './CartItem.module.scss'
import {pizzaTypes} from "../../store/slices/filter/slice";
import Button, {ButtonTheme} from "../Button/Button";
import {toggleCartItems} from "../../store/slices/cart/slice";
import {useRootDispatch} from "../../store";
import {IPizzaCart} from "../../store/slices/cart/types";

const CartItem: FC<IPizzaCart> = (item) => {

  const dispatch = useRootDispatch()

  return (
    <div className={styles.CartItem}>
      <div className={styles.CartItem__title}>
        <img className={styles.CartItem__img} src={item.imageUrl} alt="itemImg"/>
        <div className={styles.CartItem__options}>
          <h6>{item.name}</h6>
          <p>{pizzaTypes[item.type]} тесто, {item.size} см.</p>
        </div>
      </div>
      <div className={styles.CartItem__counter}>
        <Button
          theme={ButtonTheme.ROUND}
          onClick={() => dispatch(toggleCartItems({item, action: 'removeOne'}))}>-</Button>
        <b>{item.count}</b>
        <Button
          theme={ButtonTheme.ROUND}
          onClick={() => dispatch(toggleCartItems({item, action: 'add'}))}>+</Button>
      </div>
      <b className={styles.CartItem__price}>{item.price} ₽</b>
      <Button
        theme={ButtonTheme.ROUND_GRAY}
        onClick={() => dispatch(toggleCartItems({item, action: "removeAll"}))}
      >
        x
      </Button>
    </div>
  );
};

export default CartItem;
