import React from 'react';
import styles from './button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  // TODO: to fix this for allow default color setup
  // eslint-disable-next-line react/require-default-props
  color?: 'primary'; // There is only one color currently
  children: React.ReactElement;
}
const DEFAULT_COLOR = 'primary';

function Button(props: ButtonProps): React.ReactElement {
  const { color = DEFAULT_COLOR, children, ...restProps } = props;
  const COLOR_REF = {
    primary: styles['root-primary'],
  };

  const getButtonClass = (): string => {
    const buttonClassList = [styles.root];
    let colorClass = COLOR_REF[DEFAULT_COLOR];
    if (color && Object.keys(COLOR_REF).includes(color)) {
      colorClass = COLOR_REF[color];
    }
    buttonClassList.push(colorClass);
    return buttonClassList.join(' ');
  };

  return (
    // Disable to reproduce html button properties
    // eslint-disable-next-line react/jsx-props-no-spreading
    <button className={getButtonClass()} type="button" {...restProps}>
      {children}
    </button>
  );
}

interface IconButtonProps extends Omit<ButtonProps, 'children'> {
  label: string;
  icon: string;
}

function IconButton(props: IconButtonProps): React.ReactElement {
  const { label, icon, ...restProps } = props;
  return (
    // Disable to reproduce html button properties
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Button {...restProps}>
      <div className={styles.inner}>
        <span>{label}</span>
        <i className={icon} />
      </div>
    </Button>
  );
}

export default Button;
export { IconButton };
