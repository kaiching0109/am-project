import React from 'react';
import styles from './iconText.module.scss';

interface IconTextProps {
  text: string;
  icon: React.ReactElement;
}

function IconText(props: IconTextProps): React.ReactElement {
  const { text, icon } = props;
  return (
    <p className={styles.root}>
      {icon}
      <span className={styles.text}>{text}</span>
    </p>
  );
}

export default IconText;
