import React from 'react';
import styles from './sidePane.module.scss';

export default function SidePane(): React.ReactElement {
  return (
    <aside className={styles.container}>
      <dl>
        <dt>1. Choose your user</dt>
        <dd>Select</dd>
      </dl>
      <dl>
        <dt>2. Choose your Channel</dt>
        <dd>Channels</dd>
      </dl>
    </aside>
  );
}
