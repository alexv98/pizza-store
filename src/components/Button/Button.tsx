import React, {FC} from 'react';
import styles from './Button.module.scss'

export enum ButtonTheme  {
  ORANGE = 'orange',
  BLACK = 'black',
  ADD = 'add',
  GRAY = 'gray',
  ROUND = 'round',
  ROUND_GRAY = 'round-gray'
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  theme?: ButtonTheme
}

const Button: FC<ButtonProps> = (props) => {

  const {
    className,
    children,
    theme = ButtonTheme.ORANGE,
    ...otherProps
  } = props

  return (
    <button
      type='button'
      className={`${styles.Button} ${styles[theme]} ${className}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;