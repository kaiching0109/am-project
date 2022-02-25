import React, { useCallback, useContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import constants from 'constants/constants';
import { IconButton } from 'components/button/button.component';
import { ChatContext } from 'context/chatContext';
import { ChannelContext } from 'context/channelContext';
import { Chat as ChatType } from 'components/chatPane/chatPane.type';
import styles from './withReadMore.module.scss';

const GET_MORE_MESSAGE = gql`
  query FetchMoreMessages(
    $channelId: String!
    $messageId: String!
    $old: Boolean!
  ) {
    fetchMoreMessages(channelId: $channelId, messageId: $messageId, old: $old) {
      messageId
      text
      userId
      datetime
    }
  }
`;

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

interface WithReadMoreProps {
  children: React.ReactElement | React.ReactElement[];
}

export default function WithReadMore(
  props: WithReadMoreProps,
): React.ReactElement {
  const { children } = props;
  const { chatList, setChat } = useContext(ChatContext);
  const { channel } = useContext(ChannelContext);
  const [fetchMoreMessages] = useLazyQuery(GET_MORE_MESSAGE);
  const [fetchLatestMessages] = useLazyQuery(GET_MESSAGE_BT_CHANNEL);

  const fetchMoreMessagesMemo = useCallback(
    (messageId: string, old: boolean): ReturnType<typeof fetchMoreMessages> => fetchMoreMessages({
      variables: {
        channelId: channel.id,
        messageId,
        old,
      },
    }),
    [channel, fetchMoreMessages],
  );

  const fetchMoreMessagesNew = useCallback(
    (messageId: string): ReturnType<typeof fetchMoreMessages> => fetchMoreMessagesMemo(messageId, false),
    [fetchMoreMessagesMemo],
  );

  const fetchMoreMessagesOld = useCallback(
    (messageId: string): ReturnType<typeof fetchMoreMessages> => fetchMoreMessagesMemo(messageId, true),
    [fetchMoreMessagesMemo],
  );

  const getOldestMessageId = (list: ChatType[]): string | undefined => list[0]?.messageId;

  const getLatestMessageId = (list: ChatType[]): string | undefined => list[list.length - 1]?.messageId;

  const findMatchedChatIndex = (newChatList: ChatType[]) => {
    const bottom10Chat = chatList.slice(0, 10);
    const matchedIndex = getOldestMessageId(newChatList);
    return bottom10Chat.findIndex(
      (chat: ChatType) => matchedIndex === chat.messageId,
    );
  };

  const handleReadMoreNewClick = async () => {
    const messageId = getLatestMessageId(chatList);
    let fetchFunc = async () => {
      const {
        data: { fetchLatestMessages: result },
      } = await fetchLatestMessages({
        variables: {
          channelId: channel.id,
        },
      });
      return result;
    };
    if (messageId) {
      fetchFunc = async () => {
        const {
          data: { fetchMoreMessages: result },
        } = await fetchMoreMessagesNew(messageId);
        return result;
      };
    }
    const { data } = await fetchFunc();
    if (data && data?.length !== 0) {
      setChat([...data.reverse(), ...chatList]);
    }
  };

  const handleReadMoreOldClick = async () => {
    const messageId = getOldestMessageId(chatList);
    let fetchFunc = async () => {
      const {
        data: { fetchLatestMessages: result },
      } = await fetchLatestMessages({
        variables: {
          channelId: channel.id,
        },
      });
      return result;
    };

    if (messageId) {
      fetchFunc = async () => {
        const {
          data: { fetchMoreMessages: result },
        } = await fetchMoreMessagesOld(messageId);
        return result ?? [];
      };
    }
    const data = await fetchFunc();
    const parsedData = [...data].reverse();
    if (findMatchedChatIndex(parsedData) === -1) {
      setChat([...parsedData, ...chatList]);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerTop}>
        <IconButton
          icon="fa fa-arrow-up"
          label={constants.TEXT.BUTTON_TEXT_READ_MORE}
          onClick={handleReadMoreOldClick}
        />
      </div>
      {children}
      <div className={styles.innerBottom}>
        <IconButton
          icon="fa fa-arrow-down"
          label={constants.TEXT.BUTTON_TEXT_READ_MORE}
          onClick={handleReadMoreNewClick}
        />
      </div>
    </div>
  );
}
