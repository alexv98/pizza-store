import React, {FC, useEffect} from 'react';
import styles from './Categories.module.scss'
import btnStyles from './../Button/Button.module.scss'
import Button, {ButtonTheme} from "../Button/Button";
import {useRootDispatch, useRootSelector} from "../../store";
import {fetchCategories} from "../../store/slices/filter/asyncActions";
import {setActiveCategory} from "../../store/slices/filter/slice";


const Categories: FC = () => {

  const dispatch = useRootDispatch()

  const {itemsCategories, activeCategory} = useRootSelector(state => state.filter.categories)

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <ul className={styles.Categories}>
      {
        itemsCategories.map((item, index) =>
          <li key={item}>
            <Button
              className={index === activeCategory ? btnStyles.active : ''}
              theme={ButtonTheme.BLACK}
              onClick={() => dispatch(setActiveCategory(index))}
            >
              {item}
            </Button>
          </li>
        )
      }
    </ul>
  );
};

export default Categories;
