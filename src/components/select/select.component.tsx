import React, { useState } from 'react';
import styles from './select.module.scss';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { label: string; value: string }[];
}

export default function Select(props: SelectProps): React.ReactElement {
  const { options, value: defaultValue, ...restProps } = props;
  const [value, setValue] = useState(defaultValue ?? options[0]?.value);

  const handleChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const targetValue = event?.target?.value;
    setValue(targetValue);
    const { onChange } = props;
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select
      className={styles.root}
      value={value}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      onChange={handleChange}
    >
      {options.map(({ label, value: optionValue }) => (
        <option value={optionValue}>{label}</option>
      ))}
    </select>
  );
}
