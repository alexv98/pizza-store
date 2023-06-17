import React, {ChangeEvent, FC} from 'react';
import styles from './Search.module.scss'
import {useRootDispatch, useRootSelector} from "../../store";
import {setSearchValue} from "../../store/slices/filter/slice";

import closeLogo from '../../assets/img/icons/close.svg'

const Search: FC = () => {

  const dispatch = useRootDispatch()
  const searchValue = useRootSelector(state => state.filter.search.searchValue)

  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchValue(event.target.value))
  }

  return (
    <div className={styles.Search}>
      <input
        className={styles.Search__input}
        value={searchValue}
        onChange={onChangeInput}
        placeholder='Поиск пиццы...'
      />
      {
        searchValue &&
        <img
          className={styles.Search__close}
          onClick={() => dispatch(setSearchValue(''))}
          src={closeLogo}
          alt="closeLogo"
        />
      }

    </div>
  );
};

export default Search;
