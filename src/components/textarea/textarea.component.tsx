import React from 'react';
import styles from './textarea.module.scss';

export default function Textarea(
  props: React.TextareaHTMLAttributes<HTMLTextAreaElement>,
): React.ReactElement {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <textarea className={styles.root} {...props} />
  );
}
