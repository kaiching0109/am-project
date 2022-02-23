import React, { useState } from 'react';
import constants from '../../constants/constants';
import styles from './channel.module.scss';
// import Channel from './channel.component';

// interface ChannelProps {
//   // title: string;
//   // children: React.ReactElement | React.ReactElement[];
// }

export default function Channel(): React.ReactElement {
  // const { title, children } = props;
  const [current, setCurrent] = useState(constants.CHANNELS[0]?.id);

  const handleChannelItemClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { id } = event.target as HTMLElement;
    if (current !== id) {
      setCurrent(id);
    }
  };

  const getButtonClass = (id: string) => {
    const classList = [styles.button];
    if (id === current) {
      classList.push(styles.active);
    }
    return classList.join(' ');
  };

  const getChannelLabel = (label: string) => `${label} Channel`;

  const renderChannelList = (): React.ReactElement | null => {
    const shouldRender = constants.CHANNELS.length > 0;
    return shouldRender ? (
      <ul className={styles.list}>
        {constants.CHANNELS.map(({ id, label }) => (
          <li className={styles.item}>
            <button
              id={id}
              className={getButtonClass(id)}
              type="button"
              onClick={handleChannelItemClick}
            >
              <span className={styles.label}>{getChannelLabel(label)}</span>
            </button>
          </li>
        ))}
      </ul>
    ) : null;
  };

  // const getChannelItemClass = (id: string) => {
  //   [styles.button, styles.active]
  // }

  return (
    <div className={styles.root} aria-label="Channel list" role="grid">
      {renderChannelList()}
    </div>
  );
}
