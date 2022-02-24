import React, { useContext, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { IconButton } from '../button/button.component';
import constants from '../../constants/constants';
import { UserContext } from '../../context/userContext';
import Textarea from '../textarea/textarea.component';
import styles from './chatForm.module.scss';
import { ChannelContext } from '../../context/channelContext';
import { ChatContext } from '../../context/chatContext';

const POST_MESSAGE_QUERY = gql`
  mutation PostMessage($channelId: String!, $text: String!, $userId: String!) {
    postMessage(channelId: $channelId, text: $text, userId: $userId) {
      messageId
      text
      userId
      datetime
    }
  }
`;

export default function ChatForm(): React.ReactElement {
  const { user } = useContext(UserContext);
  const { channel } = useContext(ChannelContext);
  const { chatList, addChat, updateChat } = useContext(ChatContext);
  // eslint-disable-next-line max-len
  // eslint-disable-next-line operator-linebreak
  const [postMessage] = useMutation(POST_MESSAGE_QUERY);
  const [message, setMessage] = useState('');

  // TODO: error handling and testing
  /**
   * TODO:
   * @param event React.SyntheticEvent
   */
  const handleMessageSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (!message) {
      return;
    }

    const messageToPost = {
      channelId: channel?.id,
      text: message,
      userId: user,
    };

    const idx = chatList.length;
    addChat({
      text: messageToPost.text,
      userId: messageToPost.userId,
    });

    try {
      const {
        data: { postMessage: result },
      } = await postMessage({
        variables: messageToPost,
      });
      updateChat(idx, '1', result?.messageId);
    } catch (e) {
      updateChat(idx, '-1');
    } finally {
      setMessage('');
    }
  };

  /**
   * TODO:
   * @param event React.ChangeEvent<HTMLTextAreaElement>
   */
  const handleInputMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const inputMessage = event.target.value;
    setMessage(inputMessage ?? '');
  };

  return (
    <form className={styles.form} onSubmit={handleMessageSubmit}>
      <Textarea
        rows={3}
        value={message}
        placeholder={constants.TEXT.TEXTAREA_TEXT_PLACEHOLDER}
        onChange={handleInputMessageChange}
      />
      <div className={styles.formAction}>
        <IconButton
          type="submit"
          icon="fa fa-send"
          label={constants.TEXT.BUTTON_TEXT_SEND}
        />
      </div>
    </form>
  );
}
