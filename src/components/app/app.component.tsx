import React from 'react';
import '../../styles/index.scss';
import styles from './app.module.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';
import { IconButton } from '../button/button.component';
import WithReadMore from '../../hoc/withReadMore/withReadMore.component';
import Textarea from '../textarea/textarea.component';
import constants from '../../constants/constants';
import UserProvider from '../../context/userContext';
import ChatPane from '../chatPane/chatPane.component';

export default function App(): React.ReactElement {
  return (
    <UserProvider>
      <PageContainer
        title={constants.TEXT.APP_TEXT_TITLE}
        description={constants.TEXT.APP_TEXT_DESCRIPTION}
      >
        <WithSideContent>
          <Card title="LGTM Channel">
            <WithReadMore>
              <ChatPane />
            </WithReadMore>
            <div className={styles.form}>
              <Textarea
                rows={3}
                placeholder={constants.TEXT.TEXTAREA_TEXT_PLACEHOLDER}
              />
              <div className={styles.formAction}>
                <IconButton
                  icon="fa fa-send"
                  label={constants.TEXT.BUTTON_TEXT_SEND}
                />
              </div>
            </div>
          </Card>
        </WithSideContent>
      </PageContainer>
    </UserProvider>
  );
}
