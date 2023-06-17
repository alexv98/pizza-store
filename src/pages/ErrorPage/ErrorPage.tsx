import React, {FC} from 'react';
import styles from './ErrorPage.module.scss'

const ErrorPage: FC = () => {
  return (
    <h1 className={styles.ErrorPage}>
      Страница не существует!
      Попробуйте изменить запрос.
    </h1>
  );
};

export default ErrorPage;
