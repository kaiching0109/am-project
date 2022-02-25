import React from 'react';
import IconText from 'components/iconText/iconText.component';
import Profile from 'components/profile/profile.component';
import styles from './chat.module.scss';
import { Direction, Profile as ProfileType, Status } from './chat.type';

export interface ChatProps {
  message: string;
  status?: Status;
  time: string;
  profile: ProfileType;
  direction: Direction;
}

export default function Chat(props: ChatProps): React.ReactElement {
  // eslint-disable-next-line object-curly-newline
  const { message, status, time, profile, direction } = props;

  const STATUS_REF = {
    1: ['Sent', 'fa fa-check-circle', styles.success],
    '-1': ['Error', 'fa fa-exclamation-circle', styles.error],
    0: [],
  };

  const getChatClass = (): string => {
    const chatClassList = [styles.root];
    if (direction === 'r') {
      chatClassList.push(styles.rootRight);
    } else {
      chatClassList.push(styles.rootLeft);
    }
    return chatClassList.join(' ');
  };

  const renderStatusText = (): React.ReactElement | null => {
    if (status && Object.keys(STATUS_REF).includes(status)) {
      const [text, icon, iconColor] = STATUS_REF[status];
      const iconClass = [icon, iconColor].join(' ');
      return <IconText text={text} icon={<i className={iconClass} />} />;
    }
    return null;
  };

  return (
    <div className={getChatClass()}>
      <div className={styles.inner}>
        <div className={styles.mainBox}>
          <Profile imgSrc={profile?.imgSrc} name={profile?.name} />
          <div className={styles.messageBox}>
            <p className={styles.message}>{message}</p>
          </div>
        </div>
        <div className={styles.infoBox}>
          {renderStatusText()}
          <span className={styles.info}>{time}</span>
        </div>
      </div>
    </div>
  );
}

Chat.defaultProps = {
  status: undefined,
};
