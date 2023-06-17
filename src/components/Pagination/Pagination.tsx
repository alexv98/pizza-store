import React, {FC} from 'react';
import styles from './Pagination.module.scss'
import {useRootDispatch, useRootSelector} from "../../store";
import {setActivePage} from "../../store/slices/pagination/slice";


const Pagination: FC = () => {

  const dispatch = useRootDispatch()
  const {countPagesArray, activePage} = useRootSelector(state => state.pagination)

  const toStart = () => {
    dispatch(setActivePage(1))
  }

  const toEnd = () => {
    dispatch(setActivePage(countPagesArray.length))
  }


  if(countPagesArray.length) {
    return (
      <div className={styles.Pagination}>
        <ul>
          <li
            onClick={toStart}
          >{'<'}</li>
          {countPagesArray.map(page =>
            <li
              key={page}
              className={page === activePage ? styles.active : ''}
              onClick={() => dispatch(setActivePage(page))}
            >
              {page}
            </li>
          )
          }
          <li
            onClick={toEnd}
          >{'>'}</li>
        </ul>
      </div>
    )
  }

  return <></>

};

export default Pagination;
