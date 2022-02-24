import React, { useContext } from 'react';
import { useQuery, gql } from '@apollo/client';
import Chat from '../chat/chat.component';
import styles from './chatPane.module.scss';
// import { UserContext } from '../../context/userContext';
import { ChannelContext } from '../../context/channelContext';
import { toTimeString } from '../../helpers/parser';
import { findUser } from '../../helpers/utility';

export interface Message {
  messageId: string;
  text: string;
  datetime: string;
  userId: string;
}

const GET_MESSAGE_BT_CHANNEL = gql`
  query FetchLatestMessages($channelId: String!) {
    fetchLatestMessages(channelId: $channelId) {
      messageId
      text
      userId
      datetime
    }
  }
`;

export default function ChatPane(): React.ReactElement {
  // const { user } = useContext(UserContext);
  const { channel } = useContext(ChannelContext);
  const { loading, data, error } = useQuery(GET_MESSAGE_BT_CHANNEL, {
    variables: {
      channelId: channel.id,
    },
  });

  const getDirection = (idx: number): 'l' | 'r' => (idx % 2 === 0 ? 'l' : 'r');

  const renderChatList = (): React.ReactElement => {
    let component = <p>There is no message.</p>;
    if (loading) {
      component = <p>loading...</p>;
    } else if (error) {
      console.log({ error });
      component = (
        <div>
          <p>Something went wrong...</p>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }
    if (!data) return component;

    const { fetchLatestMessages: result } = data;

    return result.length > 0 ? (
      <ul>
        {[...result].reverse().map(
          // eslint-disable-next-line object-curly-newline
          ({ messageId, text, datetime, userId }: Message, i: number) => {
            const parsedDatetime = toTimeString(datetime);
            const direction = getDirection(i);
            const matchedUser = findUser(userId);
            const profile = {
              name: matchedUser?.label ?? '',
              imgSrc: `${matchedUser?.value}.png`,
            };

            return (
              <li className={styles.item} key={messageId}>
                <Chat
                  profile={profile}
                  message={text}
                  time={parsedDatetime}
                  direction={direction}
                />
              </li>
            );
          },
        )}
      </ul>
    ) : (
      component
    );
  };

  return renderChatList();
}
