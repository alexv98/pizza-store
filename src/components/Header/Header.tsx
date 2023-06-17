import React, {FC, useRef, useState} from 'react';
import styles from './Header.module.scss'

import HeaderLogo from '../../assets/img/pizza-logo.svg'
import CartLogo from '../../assets/img/icons/cart.svg'
import Button from "../Button/Button";
import Search from "../Search/Search";
import {useRootDispatch, useRootSelector} from "../../store";
import {fetchPizzas} from "../../store/slices/pizzas/asyncActions";
import {Link, useLocation} from "react-router-dom";
import Hamburger from "../Hamburger/Hamburger";


const Header: FC = () => {
  const location = useLocation()

  const dispatch = useRootDispatch()
  const {cartCounts, cartPrice} = useRootSelector(state => state.cart)


  return (
    <header className={styles.Header}>
      <Link to="/">
        <div
          className={styles.Header__logo}
          onClick={() => dispatch(fetchPizzas())}
        >
          <img src={HeaderLogo} alt="HeaderLogo"/>
          <div className={styles.Header__title}>
            <h1>REACT PIZZA</h1>
            <p>самая вкусная пицца во вселенной</p>
          </div>
        </div>
      </Link>
      { location.pathname === '/' &&
        <div className={styles.Header__search}>
          <Search />
        </div>
      }
      {
        location.pathname === '/' &&
        <div>
          <div className={styles.Header__cart}>
            <Link to='/cart'>
              <Button className={styles.cartBtn}>
                <span>{cartPrice} ₽</span>
                <div className={styles.hr}></div>
                <span>
              <img src={CartLogo} alt="CartLogo"/>
                  {cartCounts}
            </span>
              </Button>
            </Link>
          </div>

          {/*HamburgerIcon*/}
          <Hamburger />
        </div>
      }
    </header>
  );
};

export default Header;
