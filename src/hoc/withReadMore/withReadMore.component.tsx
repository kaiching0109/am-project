import React from 'react';
import constants from '../../constants/constants';
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
        <IconButton
          icon="fa fa-arrow-up"
          label={constants.TEXT.BUTTON_TEXT_READ_MORE}
        />
      </div>
      {children}
      <div className={styles.innerBottom}>
        <IconButton
          icon="fa fa-arrow-down"
          label={constants.TEXT.BUTTON_TEXT_READ_MORE}
        />
      </div>
    </div>
  );
}
