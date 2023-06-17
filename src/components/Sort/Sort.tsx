import React, {FC, useEffect, useRef, useState} from 'react';
import styles from './Sort.module.scss'

import {useRootDispatch, useRootSelector} from "../../store";
import {fetchSorts} from "../../store/slices/filter/asyncActions";
import {setActiveSort, setSortBy} from "../../store/slices/filter/slice";
import {ISort} from "../../store/slices/filter/types";
import sortLogo from '../../assets/img/icons/arrow-top.svg'
import useClickOutside from "../../hooks/useClickOutside";


const Sort: FC = () => {
  const dispatch = useRootDispatch()
  const {itemsSort, activeSort, inverted} = useRootSelector(state => state.filter.sorts)

  const sortRef = useRef<HTMLDivElement>(null)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const handleModal = (item: ISort) => {
    dispatch(setActiveSort(item))
    setIsOpenModal(false)
  }

  useEffect(() => {
    dispatch(fetchSorts())
  }, [])

  useClickOutside(sortRef, setIsOpenModal)

  return (
    <div ref={sortRef} className={styles.Sort}>
      <img
        className={inverted === false ? styles.Sort__img : `${styles.Sort__img} ${styles.rotate}`}
        src={sortLogo}
        alt="sort"
        onClick={() => dispatch(setSortBy())}
      />
      <h4>Сортировка по: </h4>
      <span
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        {activeSort.name}
      </span>
      {
        isOpenModal
          ?
          <ul className={styles.Sort__modal}>
            {
              itemsSort.map(item =>
                <li
                  key={item.name}
                  className={item.value === activeSort.value ? styles.active : ''}
                  onClick={() => handleModal(item)}
                >
                  {item.name}
                </li>
              )
            }
          </ul>
          :
          ''
      }
    </div>
  );
};

export default Sort;
