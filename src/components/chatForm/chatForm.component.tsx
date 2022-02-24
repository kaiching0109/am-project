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
      datetime
    }
  }
`;

export default function ChatForm(): React.ReactElement {
  const { user } = useContext(UserContext);
  const { channel } = useContext(ChannelContext);
  const { addChat } = useContext(ChatContext);
  const [postMessage] = useMutation(POST_MESSAGE_QUERY);
  const [message, setMessage] = useState('');

  // TODO: error handling and testing
  /**
   * TODO:
   * @param event React.SyntheticEvent
   */
  const handleMessageSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const messageToPost = {
      channelId: channel?.id,
      text: message,
      userId: user,
    };
    postMessage({
      variables: messageToPost,
    });
    addChat({
      text: messageToPost.text,
      userId: messageToPost.userId,
    });
    setMessage('');
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
