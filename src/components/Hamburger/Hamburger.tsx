import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Hamburger.module.scss'
import {useRootDispatch, useRootSelector} from "../../store";
import {Link} from "react-router-dom";
import Search from "../Search/Search";

import Sort from "../Sort/Sort";
import {setActiveCategory} from "../../store/slices/filter/slice";
import useClickOutside from "../../hooks/useClickOutside";


const Hamburger: FC = () => {

  const [nav, setNav] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null)
  useClickOutside(menuRef, setNav)

  const dispatch = useRootDispatch()
  const {cartPrice, cartCounts} = useRootSelector(state => state.cart)
  const {itemsCategories, activeCategory} = useRootSelector(state => state.filter.categories)


  return (
    <div ref={menuRef} className={styles.Hamburger}>

      {
        !nav ?
        <div
          className={styles.navBtn}
          onClick={() => setNav(true)}
        >
          <i className="fa-solid fa-bars"></i>
        </div>
          :
        <>
          <div
            className={styles.Hamburger__close}
            onClick={() => setNav(false)}
          >
            <i className="fa-solid fa-xmark"></i>
          </div>

          <div className={styles.Hamburger__menu}>
            <div className={styles.Hamburger__cart}>
              <Link to='/cart'>
                В корзине:
              </Link>
              <b> {cartCounts} шт.</b> на <b>{cartPrice} р.</b>
            </div>
            <div className={styles.Hamburger__search}>
              <Search />
            </div>
            <div className={styles.Hamburger__sort}>
              <Sort />
            </div>
            <ul className={styles.Hamburger__categories}>
              <li>Категории:</li>
              {
                itemsCategories.map((item, index) =>
                  <li
                    key={item}
                    className={index === activeCategory ? styles.active : ''}
                    onClick={() => dispatch(setActiveCategory(index))}
                  >
                    {item}
                  </li>
                )
              }
            </ul>
          </div>
        </>
      }
    </div>
  );
};

export default Hamburger;
