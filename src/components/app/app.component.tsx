import React, { useMemo, useState } from 'react';
import '../../styles/index.scss';
import styles from './app.module.scss';
import Card from '../card/card.component';
import PageContainer from '../pageContainer/pageContainer.component';
import WithSideContent from '../../hoc/withSideContent/withSideContent.component';
import { IconButton } from '../button/button.component';
import Chat from '../chat/chat.component';
import WithReadMore from '../../hoc/withReadMore/withReadMore.component';
import Textarea from '../textarea/textarea.component';
import constants from '../../constants/constants';
import { UserContext } from '../../context/userContext';

export default function App(): React.ReactElement {
  // set default first User
  const [user, setUser] = useState<string>(constants.USERS[0]?.value);

  /**
   * TODO:
   */
  const updateUser = React.useCallback(
    (id: string) => {
      const matchUser = constants.USERS.find(
        ({ value }: { value: string }) => id === value,
      );
      if (matchUser && user !== matchUser?.value) {
        setUser(matchUser?.value);
      }
    },
    [user],
  );

  const providerProps = useMemo(
    () => ({
      user,
      updateUser,
    }),
    [user, updateUser],
  );

  return (
    <UserContext.Provider value={providerProps}>
      <PageContainer
        title={constants.TEXT.APP_TEXT_TITLE}
        description={constants.TEXT.APP_TEXT_DESCRIPTION}
      >
        <WithSideContent>
          <Card title="LGTM Channel">
            <WithReadMore>
              <Chat
                profile={{ name: user, imgSrc: `${user}.png` }}
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
                profile={{ name: user, imgSrc: `${user}.png` }}
                message="Hello, I'm Russell."
                time="08:55"
                status="-1"
                direction="l"
              />
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
    </UserContext.Provider>
  );
}
