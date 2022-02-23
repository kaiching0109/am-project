import React from 'react';
import styles from './pageContainer.module.scss';

interface PageContainerProps {
  title: string;
  description: string;
  children: React.ReactElement;
}

export default function PageContainer(
  props: PageContainerProps,
): React.ReactElement {
  const { title, description, children } = props;

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.description}>{description}</p>
      </header>
      <div className={styles.contentWrapper}>{children}</div>
    </main>
  );
}
