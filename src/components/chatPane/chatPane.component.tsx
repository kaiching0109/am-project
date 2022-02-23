import React, { useContext } from 'react';
import Chat from '../chat/chat.component';
import { UserContext } from '../../context/userContext';

export default function ChatPane(): React.ReactElement {
  const { user } = useContext(UserContext);

  return (
    <ul>
      <li>
        <Chat
          profile={{ name: user, imgSrc: `${user}.png` }}
          message="Hello, I'm Russell."
          time="08:55"
          direction="l"
        />
      </li>
      <li>
        <Chat
          profile={{ name: 'Russell', imgSrc: 'Russell.png' }}
          message="Hello, I'm Russell."
          time="08:55"
          status="1"
          direction="r"
        />
      </li>
      <li>
        <Chat
          profile={{ name: user, imgSrc: `${user}.png` }}
          message="Hello, I'm Russell."
          time="08:55"
          status="-1"
          direction="l"
        />
      </li>
    </ul>
  );
}
