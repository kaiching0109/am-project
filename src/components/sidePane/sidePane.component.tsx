import React from 'react';
import Channel from '../channel/channel.component';
import Select from '../select/select.component';
import styles from './sidePane.module.scss';
import constant from '../../constants/constants';

export default function SidePane(): React.ReactElement {
  return (
    <aside className={styles.root}>
      <dl className={styles.list}>
        <dt className={styles.title}>{constant.TEXT.SIDE_PANE_TEXT_STEP_1}</dt>
        <dd className={styles.content}>
          <Select
            onChange={(e) => {
              console.log(e.target.value);
            }}
            options={constant.USERS}
          />
        </dd>
        <dt className={styles.title}>{constant.TEXT.SIDE_PANE_TEXT_STEP_2}</dt>
        <dd className={styles.content}>
          <Channel />
        </dd>
      </dl>
    </aside>
  );
}
