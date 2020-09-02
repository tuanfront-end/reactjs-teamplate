import React, { FC, ReactNode } from 'react';
import { View, classNames } from 'shared';
import styles from './HeaderBase.module.scss';
import { ViewProps } from '../View/View';

interface HeaderBaseProps extends Omit<ViewProps, 'className'> {
  Left?: ReactNode;
  Center?: ReactNode;
  Right?: ReactNode;
  containerClassName?: string;
}

export const HeaderBase: FC<HeaderBaseProps> = ({ Left, Center, Right, containerClassName = '', ...rest }) => {
  const centerEmptyClassName = !Center ? styles.centerEmpty : '';
  return (
    <View
      {...rest}
      className={classNames(styles.container, centerEmptyClassName, containerClassName)}
      tachyons={['flex', 'items-center', 'justify-between', 'pv1', 'ph3']}
    >
      <View className={styles.left} tachyons={['flex', 'items-center']}>
        {Left}
      </View>
      {!!Center && (
        <View className={styles.center} tachyons={['flex', 'items-center', 'justify-center']}>
          {Center}
        </View>
      )}
      <View className={styles.right} tachyons={['flex', 'items-center', 'justify-end']}>
        {Right}
      </View>
    </View>
  );
};
