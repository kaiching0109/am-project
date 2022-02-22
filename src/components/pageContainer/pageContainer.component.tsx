import React from 'react';
import styles from './pageContainer.module.scss';

interface PageContainerProps {
  children: React.ReactElement;
}

export default function PageContainer(
  props: PageContainerProps,
): React.ReactElement {
  const { children } = props;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>1 day chat App</h1>
        <p className={styles.description}>
          All messages will be deleted at every 00:00 UTC
        </p>
      </header>
      <div className={styles.contentWrapper}>{children}</div>
    </main>
  );
}
