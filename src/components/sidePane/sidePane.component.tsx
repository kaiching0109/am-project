import React from 'react';
import Select from '../select/select.component';
import styles from './sidePane.module.scss';

export default function SidePane(): React.ReactElement {
  return (
    <aside className={styles.container}>
      <dl className={styles.list}>
        <dt className={styles.title}>1. Choose your user</dt>
        <dd className={styles.content}>
          <Select
            options={[
              { label: 'Joyse', value: 'Joyse' },
              { label: 'Sam', value: 'Sam' },
              { label: 'Russell', value: 'Russell' },
            ]}
          />
        </dd>
        <dt className={styles.title}>2. Choose your Channel</dt>
        <dd className={styles.content}>Channels</dd>
      </dl>
    </aside>
  );
}
