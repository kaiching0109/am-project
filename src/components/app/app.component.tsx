import React from 'react';
import '../../styles/index.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';
import { IconButton } from '../button/button.component';

export default function App(): React.ReactElement {
  return (
    <PageContainer>
      <WithSideContent>
        <Card title="LGTM Channel">
          <IconButton icon="fa fa-arrow-up" label="Read More" />
          <IconButton icon="fa fa-arrow-down" label="Read More" />
          <IconButton icon="fa fa-send" label="Send Message" />
        </Card>
      </WithSideContent>
    </PageContainer>
  );
}
