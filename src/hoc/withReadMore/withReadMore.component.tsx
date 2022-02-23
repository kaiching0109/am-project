import React from 'react';
import { IconButton } from '../../components/button/button.component';
import styles from './withReadMore.module.scss';

interface WithReadMoreProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function WithReadMore(
  props: WithReadMoreProps,
): React.ReactElement {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.innerTop}>
        <IconButton icon="fa fa-arrow-up" label="Read More" />
      </div>
      {children}
      <div className={styles.innerBottom}>
        <IconButton icon="fa fa-arrow-down" label="Read More" />
      </div>
    </div>
  );
}
