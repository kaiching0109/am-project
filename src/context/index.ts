import ChannelProvider, { ChannelContext } from './channelContext';
import ChatProvider, { ChatContext } from './chatContext';
import UserProvider, { UserContext } from './userContext';

export default {
  provider: { ChannelProvider, ChatProvider, UserProvider },
  context: { ChannelContext, ChatContext, UserContext },
};
