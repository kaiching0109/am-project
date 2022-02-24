import React, { useContext } from 'react';
import '../../styles/index.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';
import WithReadMore from '../../hoc/withReadMore/withReadMore.component';
import constants from '../../constants/constants';
import ChatPane from '../chatPane/chatPane.component';
import ChatForm from '../chatForm/chatForm.component';
import { Channel, ChannelContext } from '../../context/channelContext';

function App(): React.ReactElement {
  const { channel } = useContext(ChannelContext);

  const getChannelLabel = (current: Channel) => `${current.name} Channel`;

  return (
    <PageContainer
      title={constants.TEXT.APP_TEXT_TITLE}
      description={constants.TEXT.APP_TEXT_DESCRIPTION}
    >
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
