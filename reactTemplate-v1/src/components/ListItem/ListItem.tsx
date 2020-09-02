import React, { FC, DOMAttributes, CSSProperties } from 'react';
import { Text, LineAwesome, View } from 'shared';
import styles from './ListItem.module.scss';

export interface ListItemProps {
  textLeft: string | number;
  textRight?: string | number;
  arrowEnabled?: boolean;
  isActive?: boolean;
  containerClassName?: string;
  containerStyle?: CSSProperties;
  onClick?: DOMAttributes<HTMLDivElement>['onClick'];
}

const ListItem: FC<ListItemProps> = ({
  textLeft,
  textRight,
  containerClassName = '',
  arrowEnabled = true,
  isActive = false,
  containerStyle = {},
  onClick,
}) => {
  const activeClassName = isActive ? styles.active : '';
  return (
    <View
      className={`${styles.container} ${activeClassName} ${containerClassName}`}
      tachyons={['flex', 'items-center', 'justify-between', 'pa2', 'pointer']}
      style={containerStyle}
      onClick={onClick}
    >
      <Text className={styles.textLeft}>{textLeft}</Text>
      <View tachyons={['flex', 'items-center']}>
        <Text className={styles.textRight} backgroundColor="gray2">
          {textRight}
        </Text>
        {arrowEnabled && <LineAwesome name="angle-right" />}
      </View>
    </View>
  );
};

export default ListItem;
