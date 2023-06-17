import React, {FC} from 'react';
import styles from './Empty.module.scss'

const Empty: FC = () => {
  return (
    <h1 className={styles.Empty}>
      По Вашему запросу ничего не найдено.
    </h1>
  );
};

export default Empty;
