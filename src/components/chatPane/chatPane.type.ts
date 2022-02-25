import { Status } from 'components/chat/chat.type';

export interface Chat {
  messageId?: string;
  text: string;
  datetime: string;
  userId: string;
  status?: Status;
}
