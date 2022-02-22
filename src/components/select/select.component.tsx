import React from 'react';
import styles from './select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export default function Select(props: SelectProps): React.ReactElement {
  const { options, ...restProps } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <select className={styles.root} {...restProps}>
      {options.map(({ label, value }) => (
        <option value={value}>{label}</option>
      ))}
    </select>
  );
}
