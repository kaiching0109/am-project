import React from 'react';
import styles from './profile.module.scss';

interface ProfileProps {
  name: string;
  imgSrc: string;
}

export default function Profile(props: ProfileProps): React.ReactElement {
  const { name, imgSrc } = props;

  return (
    <div className={styles.root}>
      <img className={styles.image} src={imgSrc} alt="User" />
      <span className={styles.label}>{name}</span>
    </div>
  );
}
