import React from 'react';
import styles from './pageContainer.module.scss';

export default function PageContainer(props: {
  children: React.ReactElement;
}): React.ReactElement {
  const { children } = props;

  return (
    <section className={styles.container}>
      <header className="page-title">
        <h1>1 day chat App</h1>
        <p>All messages will be deleted at every 00:00 UTC</p>
      </header>
      <div className="content-wrapper">{children}</div>
    </section>
  );
}
