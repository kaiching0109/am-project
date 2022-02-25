import React, { useContext } from 'react';
import 'styles/index.scss';
import Card from 'components/card/card.component';
import PageContainer from 'components/pageContainer/pageContainer.component';
import { WithSideContent, WithReadMore } from 'hoc';
import constants from 'constants/constants';
import ChatPane from 'components/chatPane/chatPane.component';
import ChatForm from 'components/chatForm/chatForm.component';
import context from 'context';
import { Channel } from 'components/channel/channel.type';

const {
  context: { ChannelContext },
} = context;

function App(): React.ReactElement {
  const { channel } = useContext(ChannelContext);

  const getChannelLabel = (current: Channel) => `${current.name} Channel`;

  return (
    <PageContainer title={constants.TEXT.APP_TEXT_TITLE} description={constants.TEXT.APP_TEXT_DESCRIPTION}>
      <WithSideContent>
        <Card title={getChannelLabel(channel)}>
          <WithReadMore>
            <ChatPane />
          </WithReadMore>
          <ChatForm />
        </Card>
      </WithSideContent>
    </PageContainer>
  );
}

export default App;
