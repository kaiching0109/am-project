import React from 'react';
import styles from './channel.module.scss';

// interface ChannelProps {
//   // title: string;
//   // children: React.ReactElement | React.ReactElement[];
// }

export default function Channel(): React.ReactElement {
  // const { title, children } = props;
  // console.log(props);
  return (
    <div className={styles.root} aria-label="Channel list" role="grid">
      <ul className={styles.list}>
        <li className={styles.item}>
          <button
            className={[styles.button, styles.active].join(' ')}
            type="button"
          >
            <span className={styles.label}>General Channel</span>
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.button} type="button">
            <span className={styles.label}>Technology Channel</span>
          </button>
        </li>
        <li className={styles.item}>
          <button className={styles.button} type="button">
            <span className={styles.label}>LGTM Channel</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
