import React, { CSSProperties, forwardRef } from 'react';
import classNames from 'shared/utils/classNames';
import { ColorKey } from 'shared/types/Themes';
import { View } from '../View/View';
import { getBgColorClassName } from 'shared/utils/getStyles';
import styles from './Divider.module.scss';
import withTachyons, { WithTachyonsProps } from 'shared/hocs/withTachyons';

export interface DividerProps extends WithTachyonsProps {
  /** #### Size của component nếu set number sẽ là width còn set array sẽ là [width, height] */
  size?: number | [number, number];
  /** #### Color của component theo ThemeProvider */
  color?: ColorKey;
}

const DividerComponent = forwardRef<HTMLElement, DividerProps>(({ size = 1, color = 'gray2', className }, ref) => {
  const sizeStyle: CSSProperties = typeof size === 'number' ? { height: 1 } : { width: size[0], height: size[1] };
  const colorClassName = getBgColorClassName(color);
  return (
    <View ref={ref} className={classNames(styles.container, className)}>
      <View className={classNames(styles.divider, colorClassName)} style={sizeStyle} />
    </View>
  );
});

export const Divider = withTachyons<HTMLElement, DividerProps>(DividerComponent);
