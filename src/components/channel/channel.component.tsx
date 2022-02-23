import React, { useContext } from 'react';
import { ChannelContext } from '../../context/channelContext';
import constants from '../../constants/constants';
import styles from './channel.module.scss';

export default function Channel(): React.ReactElement {
  const { channel, updateChannel } = useContext(ChannelContext);

  const handleChannelItemClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const { id } = event.currentTarget as HTMLElement;
    if (channel !== id) {
      updateChannel(id);
    }
  };

  const getButtonClass = (id: string) => {
    const classList = [styles.button];
    if (id === channel) {
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
