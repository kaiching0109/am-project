import React, { useContext } from 'react';
import Channel from 'components/channel/channel.component';
import Select from 'components/select/select.component';
import constant from 'constants/constants';
import context from 'context';
import styles from './sidePane.module.scss';

const { context: { UserContext } } = context;

export default function SidePane(): React.ReactElement {
  const { updateUser } = useContext(UserContext);
  /**
   * TODO:
   * @param event React.ChangeEventHandler<HTMLSelectElement>
   */
  const handleUserSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event,
  ) => {
    const targetValue = event?.target?.value;
    updateUser(targetValue);
  };

  return (
    <aside className={styles.root}>
      <dl className={styles.list}>
        <dt className={styles.title}>{constant.TEXT.SIDE_PANE_TEXT_STEP_1}</dt>
        <dd className={styles.content}>
          <Select onChange={handleUserSelectChange} options={constant.USERS} />
        </dd>
        <dt className={styles.title}>{constant.TEXT.SIDE_PANE_TEXT_STEP_2}</dt>
        <dd className={styles.content}>
          <Channel />
        </dd>
      </dl>
    </aside>
  );
}
