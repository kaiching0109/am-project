import React from 'react';
import SidePane from 'components/sidePane/sidePane.component';
import styles from './withSideContent.module.scss';

interface WithSideContentProps {
  children: React.ReactElement;
}

export default function WithSideContent(
  props: WithSideContentProps,
): React.ReactElement {
  const { children } = props;

  return (
    <div className={styles.container}>
      <div className={styles.sideContentWrapper}>
        <SidePane />
      </div>
      {children}
    </div>
  );
}
