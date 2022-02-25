import React, { useContext, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import Chat from 'components/chat/chat.component';
import context from 'context';
import { toTimeString } from 'helpers/parser';
import { findUser } from 'helpers/utility';
import { Direction } from 'components/chat/chat.type';
import constant from 'constants/constants';
import styles from './chatPane.module.scss';
import { Chat as ChatType } from './chatPane.type';

const { context: { UserContext, ChannelContext, ChatContext } } = context;

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

  useEffect((): void => {
    if (!loading && !error) {
      const { fetchLatestMessages: result } = data;
      const parseResult = [...result].reverse();
      setChat(parseResult);
    }
  }, [loading, error, data, setChat]);

  const getDirection = (current: string, userId: string): Direction => (current === userId ? 'r' : 'l');

  const renderChatList = (): React.ReactElement => {
    let component = <p>{constant.TEXT.EMPTY_MESSAGE_TEXT}</p>;
    if (loading) {
      component = <p>{constant.TEXT.LOADING_TEXT}</p>;
    } else if (error) {
      component = (
        <div>
          <p>{constant.TEXT.ERROR_TEXT}</p>
          <p>{constant.TEXT.REFRESH_TEXT}</p>
        </div>
      );
    }
    if (!data) return component;

    return chatList.length > 0 ? (
      <ul>
        {chatList.map(
          ({
            messageId, text, datetime, userId, status,
          }: ChatType) => {
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
