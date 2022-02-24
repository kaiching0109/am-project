/* eslint-disable prettier/prettier */
/* eslint-disable object-curly-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
import React, { useCallback, useContext } from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import constants from '../../constants/constants';
import { IconButton } from '../../components/button/button.component';
import styles from './withReadMore.module.scss';
import { Chat, ChatContext } from '../../context/chatContext';
import { ChannelContext } from '../../context/channelContext';

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
    (messageId: string, old: boolean): ReturnType<typeof fetchMoreMessages> =>
      fetchMoreMessages({
        variables: {
          channelId: channel.id,
          messageId,
          old,
        },
      }),
    [channel, fetchMoreMessages],
  );

  const fetchMoreMessagesNew = useCallback(
    (messageId: string): ReturnType<typeof fetchMoreMessages> =>
      fetchMoreMessagesMemo(messageId, false),
    [fetchMoreMessagesMemo],
  );

  const fetchMoreMessagesOld = useCallback(
    (messageId: string): ReturnType<typeof fetchMoreMessages> =>
      fetchMoreMessagesMemo(messageId, true),
    [fetchMoreMessagesMemo],
  );

  const getOldestMessageId = (list: Chat[]): string | undefined =>
    list[0]?.messageId;

  // eslint-disable-next-line prettier/prettier
  const getLatestMessageId = (list: Chat[]): string | undefined =>
    list[list.length - 1]?.messageId;

  // const isChatListEqual = (newChatList: Chat[]): boolean => {
  //   const newTopMessageId = getLatestMessageId(newChatList);
  //   const newBottomMessageId = getOldestMessageId(newChatList);
  //   const topMessageId = getLatestMessageId(chatList);
  //   const bottomMessageId = getOldestMessageId(chatList);
  //   return (
  //     newTopMessageId !== topMessageId || newBottomMessageId !== bottomMessageId
  //   );
  // };

  // const findTopChatIndex = (newChatList: Chat[]) => {
  //   const top10Chat = chatList.splice(10);
  //   const newTopMessageId = getLatestMessageId(newChatList);
  //   return top10Chat.findIndex(
  //     (chat: Chat) => newTopMessageId === chat.messageId,
  //   );
  // };

  const findMatchedChatIndex = (newChatList: Chat[]) => {
    const bottom10Chat = chatList.slice(0, 10);
    // const matchedIndex = getLatestMessageId(newChatList);
    const matchedIndex = getOldestMessageId(newChatList);
    console.log({ chatList, bottom10Chat, newChatList, matchedIndex });
    return bottom10Chat.findIndex(
      (chat: Chat) => matchedIndex === chat.messageId,
    );
  };

  // const isChaptListOverlap = (newChatList: Chat[]): boolean => {

  //   const newTopMessageId = getLatestMessageId(newChatList);
  //   const newBottomMessageId = getOldestMessageId(newChatList);
  //   const bottomMessageId = getOldestMessageId(chatList);

  //   const topMessageId = getLatestMessageId(chatList);
  //   const bottomMessageId = getOldestMessageId(chatList);
  //   return (
  //     newTopMessageId !== topMessageId || newBottomMessageId !== bottomMessageId
  //   );
  // };

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
