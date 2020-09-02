import React, { ReactNode } from 'react';
import { useHistory } from 'react-router';
import { LineAwesome } from 'shared';
import styles from './GoBack.module.scss';

interface GoBackProps {
  children?: ReactNode;
}

export default function GoBack({ children }: GoBackProps) {
  const history = useHistory();

  return (
    <div className="pointer" onClick={() => history.goBack()}>
      {children ?? <LineAwesome name="angle-left" className={styles.icon} />}
    </div>
  );
}
