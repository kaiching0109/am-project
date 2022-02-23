import React, { useContext } from 'react';
import Channel from '../channel/channel.component';
import Select from '../select/select.component';
import styles from './sidePane.module.scss';
import constant from '../../constants/constants';
import { UserContext } from '../../context/userContext';

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
