import React, { useState, useMemo } from 'react';
import { toTimeString } from '../helpers/parser';

export interface Chat {
  // messageId: string;
  text: string;
  datetime: string;
  userId: string;
}

export type LoadingChat = Omit<Chat, 'datetime'>;

interface ChatProviderProps {
  children: React.ReactElement;
}

export type ContextType = {
  chatList: Chat[];
  // eslint-disable-next-line no-unused-vars
  addChat: (chat: LoadingChat) => void;
  // eslint-disable-next-line no-unused-vars
  setChat: (chat: Chat[]) => void;
};

export const ChatContext = React.createContext({} as ContextType);

export default function ChatProvider(props: ChatProviderProps) {
  const { children } = props;
  const [chatList, setChatList] = useState<Chat[]>([]);

  /**
   * TODO:
   */
  const addChat = React.useCallback(
    (chat: LoadingChat) => {
      const newChat = {
        ...chat,
        datetime: toTimeString(new Date().toISOString()),
      };
      setChatList([...chatList, newChat]);
    },
    [chatList],
  );

  const setChat = React.useCallback((newChatList: Chat[]) => {
    setChatList([...newChatList]);
  }, []);

  const providerProps = useMemo(
    () => ({
      chatList,
      addChat,
      setChat,
    }),
    [chatList, addChat, setChat],
  );

  return (
    <ChatContext.Provider value={providerProps}>
      {children}
    </ChatContext.Provider>
  );
}
