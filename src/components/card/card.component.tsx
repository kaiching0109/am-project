import React from 'react';
import styles from './card.module.scss';

interface CardProps {
  title: string;
  children: React.ReactElement;
}

export default function Card(props: CardProps): React.ReactElement {
  const { title, children } = props;

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>{title}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
