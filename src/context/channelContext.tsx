import React, { useState, useMemo } from 'react';
import constants from '../constants/constants';

export interface Channel {
  id: string;
  name: string;
}

interface ChannelProviderProps {
  children: React.ReactElement;
}

export type ContextType = {
  channel: Channel;
  // eslint-disable-next-line no-unused-vars
  updateChannel: (id: string) => void;
};

export const ChannelContext = React.createContext({} as ContextType);

export default function ChannelProvider(props: ChannelProviderProps) {
  const { children } = props;
  const defaultChannel = constants.CHANNELS[0];
  const [channel, setChannel] = useState({
    id: defaultChannel.id,
    name: defaultChannel.label,
  });

  /**
   * TODO:
   */
  const updateChannel = React.useCallback(
    (channelId: string) => {
      const matchChannel = constants.CHANNELS.find(
        ({ id }: { id: string }) => channelId === id,
      );
      if (matchChannel && channel?.id !== matchChannel?.id) {
        const { label, id } = matchChannel;
        setChannel({
          id,
          name: label,
        });
      }
    },
    [channel],
  );

  const providerProps = useMemo(
    () => ({
      channel,
      updateChannel,
    }),
    [channel, updateChannel],
  );

  return (
    <ChannelContext.Provider value={providerProps}>
      {children}
    </ChannelContext.Provider>
  );
}
