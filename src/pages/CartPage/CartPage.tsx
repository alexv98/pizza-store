import React, {FC} from 'react';
import styles from './CartPage.module.scss'
import Button, {ButtonTheme} from "../../components/Button/Button";

import cartLogo from '../../assets/img/icons/cart-black.svg'
import emptyCart from '../../assets/img/empty-cart.png'
import {useRootDispatch, useRootSelector} from "../../store";

import trashLogo from '../../assets/img/icons/trash.svg'
import {setClearCart} from "../../store/slices/cart/slice";
import {useNavigate} from "react-router-dom";
import CartItem from "../../components/CartItem/CartItem";

const CartPage: FC = () => {

  const navigate = useNavigate()

  const dispatch = useRootDispatch()
  const {cartCounts, cartPrice, cartItems} = useRootSelector(state => state.cart)

  if(!cartItems.length) {
    return (
      <div className={styles.CartPage}>
        <div className={styles.CartPage__empty}>
          <h4>Корзина пустая 😕</h4>
          <p>Видимо, Вы ничего не выбрали. <br/>
            Для того, чтобы заказать пиццу, перейдите на главную страницу.</p>
          <img src={emptyCart} alt="emptyCart"/>
          <Button onClick={() => navigate(-1)}>Вернуться назад</Button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.CartPage}>
      <div className={styles.CartPage__content}>
        <div className={styles.CartPage__header}>
          <div className={styles.CartPage__title}>
            <img src={cartLogo} alt="cartLogo"/>
            <h4>Корзина</h4>
          </div>
          <Button
            theme={ButtonTheme.GRAY}
            className={styles.CartPage__trashBtn}
            onClick={() => dispatch(setClearCart())}
          >
            <img src={trashLogo} alt="trash"/>
            Очистить корзину
          </Button>
        </div>
        <div className={styles.CartPage__main}>
          <ul className={styles.cartList}>
            {
              cartItems.map((item, index) =>
                <li key={index}>
                  <CartItem {...item}/>
                </li>
              )
            }
          </ul>
          <div className={styles.cartList__footer}>
            <div className={styles.CartPage__counts}>
              Всего пицц: <b>{cartCounts} шт.</b>
            </div>
            <div className={styles.CartPage__price}>
              Сумма заказа: <b>{cartPrice} ₽</b>
            </div>
          </div>
        </div>
        <div className={styles.CartPage__footer}>
          <Button
            className={styles.backBtn}
            onClick={() => navigate(-1)}
          >
            {'< Вернуться назад'}
          </Button>
          <Button>Оплатить сейчас</Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
