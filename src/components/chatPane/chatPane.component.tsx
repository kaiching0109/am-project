import React, { useContext, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Chat from '../chat/chat.component';
import styles from './chatPane.module.scss';
import { UserContext } from '../../context/userContext';
import { ChannelContext } from '../../context/channelContext';
import { toTimeString } from '../../helpers/parser';
import { findUser } from '../../helpers/utility';
import { ChatContext } from '../../context/chatContext';

export interface Message {
  messageId?: string;
  text: string;
  datetime: string;
  userId: string;
  status?: '1' | '-1' | '0';
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
  const { user } = useContext(UserContext);
  const { channel } = useContext(ChannelContext);
  const { chatList, setChat } = useContext(ChatContext);
  const { loading, data, error } = useQuery(GET_MESSAGE_BT_CHANNEL, {
    variables: {
      channelId: channel.id,
    },
  });

  // eslint-disable-next-line consistent-return
  useEffect((): void => {
    if (!loading && !error) {
      const { fetchLatestMessages: result } = data;
      const parseResult = [...result].reverse();
      setChat(parseResult);
    }
  }, [loading, error, data]);

  // eslint-disable-next-line max-len
  // eslint-disable-next-line prettier/prettier
  const getDirection = (current: string, userId: string): 'l' | 'r' => (current === userId ? 'r' : 'l');

  const renderChatList = (): React.ReactElement => {
    let component = <p>There is no message.</p>;
    if (loading) {
      component = <p>loading...</p>;
    } else if (error) {
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
        {chatList.map(
          // eslint-disable-next-line object-curly-newline
          ({ messageId, text, datetime, userId, status }: Message) => {
            const parsedDatetime = toTimeString(datetime);
            const direction = getDirection(user, userId);
            const matchedUser = findUser(userId);
            const profile = {
              name: matchedUser?.label ?? '',
              imgSrc: `${matchedUser?.value}.png`,
            };
            let chatStatus = status;
            if (!chatStatus) {
              chatStatus = messageId ? '1' : '-1';
            }

            return (
              <li
                className={styles.item}
                key={`${userId}_${datetime}_${messageId}`}
              >
                <Chat
                  profile={profile}
                  message={text}
                  time={parsedDatetime}
                  direction={direction}
                  status={chatStatus}
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
