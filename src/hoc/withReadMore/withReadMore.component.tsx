import React, { useContext } from 'react';
import constants from '../../constants/constants';
import { IconButton } from '../../components/button/button.component';
import styles from './withReadMore.module.scss';
import { ChatContext } from '../../context/chatContext';

interface WithReadMoreProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function WithReadMore(
  props: WithReadMoreProps,
): React.ReactElement {
  const { children } = props;
  const { chatList } = useContext(ChatContext);

  const renderContent = (): React.ReactElement | React.ReactElement[] => {
    const showReadMore = chatList.length >= 10;
    if (showReadMore) {
      return (
        <>
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
        </>
      );
    }
    return children;
  };

  return <div className={styles.container}>{renderContent()}</div>;
}
