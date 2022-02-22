import React from 'react';
import Channel from '../channel/channel.component';
import Select from '../select/select.component';
import styles from './sidePane.module.scss';

export default function SidePane(): React.ReactElement {
  return (
    <aside className={styles.root}>
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
        <dd className={styles.content}>
          <Channel />
        </dd>
      </dl>
    </aside>
  );
}
