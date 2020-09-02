import React, { ReactNode } from 'react';
import { isEmpty } from 'ramda';
import styles from './List.module.scss';
import { View, classNames } from 'shared';

export interface ListProps<T> {
  data: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor?: (item: T, index: number) => string;
  variant?: 'vertical' | 'horizontal';
}

function List<T>({ data, renderItem, keyExtractor = (_, index) => String(index), variant = 'horizontal' }: ListProps<T>) {
  return (
    <View className={classNames(styles.container, styles[variant])}>
      {!isEmpty('data') &&
        data.map((item, index) => {
          return (
            <View className={styles.item} key={keyExtractor(item, index)}>
              {renderItem(item, index)}
            </View>
          );
        })}
    </View>
  );
}

export default List;
