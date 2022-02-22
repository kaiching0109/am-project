import React from 'react';
import '../../styles/index.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';

export default function App(): React.ReactElement {
  return (
    <PageContainer>
      <WithSideContent>
        <Card title="LGTM Channel">
          <p>?!?!?!?!</p>
        </Card>
      </WithSideContent>
    </PageContainer>
  );
}
