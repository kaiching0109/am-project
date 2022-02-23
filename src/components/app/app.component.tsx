import React from 'react';
import '../../styles/index.scss';
import styles from './app.module.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';
import { IconButton } from '../button/button.component';
import Chat from '../chat/chat.component';
import WithReadMore from '../../hoc/withReadMore/withReadMore.component';
import Textarea from '../textarea/textarea.component';

export default function App(): React.ReactElement {
  return (
    <PageContainer>
      <WithSideContent>
        <Card title="LGTM Channel">
          <WithReadMore>
            <Chat
              profile={{ name: 'Russell', imgSrc: 'Russell.png' }}
              message="Hello, I'm Russell."
              time="08:55"
              direction="l"
            />
            <Chat
              profile={{ name: 'Russell', imgSrc: 'Russell.png' }}
              message="Hello, I'm Russell."
              time="08:55"
              status="1"
              direction="r"
            />
            <Chat
              profile={{ name: 'Russell', imgSrc: 'Russell.png' }}
              message="Hello, I'm Russell."
              time="08:55"
              status="-1"
              direction="l"
            />
          </WithReadMore>
          <div className={styles.form}>
            <Textarea rows={3} placeholder="Type your message here..." />
            <div className={styles.formAction}>
              <IconButton icon="fa fa-send" label="Send Message" />
            </div>
          </div>
        </Card>
      </WithSideContent>
    </PageContainer>
  );
}
