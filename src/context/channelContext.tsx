import React, { useState, useMemo } from 'react';
import constants from '../constants/constants';

// interface IUser {
//   user: string;
// }

interface ChannelProviderProps {
  children: React.ReactElement;
}

export type ContextType = {
  channel: string;
  // eslint-disable-next-line no-unused-vars
  updateChannel: (id: string) => void;
};

export const ChannelContext = React.createContext({} as ContextType);

export default function ChannelProvider(props: ChannelProviderProps) {
  const { children } = props;
  const [channel, setChannel] = useState(constants.CHANNELS[0]?.id);

  /**
   * TODO:
   */
  const updateChannel = React.useCallback(
    (channelId: string) => {
      const matchChannel = constants.CHANNELS.find(
        ({ id }: { id: string }) => channelId === id,
      );
      if (matchChannel && channel !== matchChannel?.id) {
        setChannel(matchChannel?.id);
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
