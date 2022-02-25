/* eslint-disable no-unused-vars */
import React, { useState, useMemo } from 'react';
import { Chat } from 'components/chatPane/chatPane.type';
import { Status } from 'components/chat/chat.type';

export type LoadingChat = Omit<Chat, 'datetime' | 'status'>;

interface ChatProviderProps {
  children: React.ReactElement;
}

export type ContextType = {
  chatList: Chat[];
  addChat: (chat: LoadingChat) => void;
  updateChat: (
    idx: number,
    status: '1' | '0' | '-1',
    messageId?: string,
  ) => void;
  setChat: (chat: Chat[]) => void;
};

export const ChatContext = React.createContext({} as ContextType);

export default function ChatProvider(props: ChatProviderProps) {
  const { children } = props;
  const [chatList, setChatList] = useState<Chat[]>([]);

  /**
   * TODO:
   */
  const addChat = React.useCallback((chat: LoadingChat) => {
    const newChat: Chat = {
      ...chat,
      datetime: new Date().toISOString(),
      status: '0',
    };
    setChatList((prevChartList) => [...prevChartList, newChat]);
  }, []);

  const updateChat = React.useCallback(
    (idx: number, status: Status, messageId?: string) => {
      setChatList((prevChartList) => {
        const targetChat = prevChartList[idx];
        const newChatList = [...prevChartList];
        newChatList[idx] = {
          ...targetChat,
          status,
          messageId,
        };
        return newChatList;
      });
    },
    [],
  );

  const setChat = React.useCallback((newChatList: Chat[]) => {
    setChatList([...newChatList]);
  }, []);

  const providerProps = useMemo(
    () => ({
      chatList,
      addChat,
      updateChat,
      setChat,
    }),
    [chatList, addChat, updateChat, setChat],
  );

  return (
    <ChatContext.Provider value={providerProps}>
      {children}
    </ChatContext.Provider>
  );
}
