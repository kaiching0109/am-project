/* eslint-disable prettier/prettier */
import React from 'react';
import '../../styles/index.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';
import WithReadMore from '../../hoc/withReadMore/withReadMore.component';
import constants from '../../constants/constants';
import UserProvider from '../../context/userContext';
import ChatPane from '../chatPane/chatPane.component';
import ChatForm from '../chatForm/chatForm.component';
import ChannelProvider from '../../context/channelContext';
import WithCompose from '../../hoc/withCompose/withCompose';

function App(): React.ReactElement {
  return (
    <WithCompose components={[UserProvider, ChannelProvider]}>
      <PageContainer
        title={constants.TEXT.APP_TEXT_TITLE}
        description={constants.TEXT.APP_TEXT_DESCRIPTION}
      >
        <WithSideContent>
          <Card title="LGTM Channel">
            <WithReadMore>
              <ChatPane />
            </WithReadMore>
            <ChatForm />
          </Card>
        </WithSideContent>
      </PageContainer>
    </WithCompose>
  );
}

export default App;
