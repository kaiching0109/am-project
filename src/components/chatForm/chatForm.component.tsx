import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { IconButton } from '../button/button.component';
import constants from '../../constants/constants';
import { UserContext } from '../../context/userContext';
import Textarea from '../textarea/textarea.component';
import styles from './chatForm.module.scss';

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
  const [postMessage] = useMutation(POST_MESSAGE_QUERY);

  const handleMessageSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    postMessage({
      variables: {
        channelId: '3',
        text: 'text',
        userId: user,
      },
    });
  };

  return (
    <form onSubmit={handleMessageSubmit}>
      <Textarea
        rows={3}
        placeholder={constants.TEXT.TEXTAREA_TEXT_PLACEHOLDER}
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
