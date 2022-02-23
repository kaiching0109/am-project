import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Chat from '../chat/chat.component';
import styles from './chatPane.module.scss';
import { UserContext } from '../../context/userContext';
import { ChannelContext } from '../../context/channelContext';

const GET_MESSAGE_BT_CHANNEL = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      datetime
      userId
    }
  }
`;

export default function ChatPane(): React.ReactElement {
  const { user } = useContext(UserContext);
  const { channel } = useContext(ChannelContext);
  const { data } = useQuery(GET_MESSAGE_BT_CHANNEL, {
    variables: {
      channelId: channel,
    },
  });

  console.log({ channel, data });

  return (
    <ul>
      <li className={styles.item}>
        <Chat
          profile={{ name: user, imgSrc: `${user}.png` }}
          message="Hello, I'm Russell."
          time="08:55"
          direction="l"
        />
      </li>
      <li className={styles.item}>
        <Chat
          profile={{ name: 'Russell', imgSrc: 'Russell.png' }}
          message="Hello, I'm Russell."
          time="08:55"
          status="1"
          direction="r"
        />
      </li>
      <li className={styles.item}>
        <Chat
          profile={{ name: user, imgSrc: `${user}.png` }}
          message="Hello, I'm Russell."
          time="08:55"
          status="-1"
          direction="l"
        />
      </li>
    </ul>
  );
}
