import React, { CSSProperties, forwardRef } from 'react';
import classNames from 'shared/utils/classNames';
import withTachyons, { WithTachyonsProps } from 'shared/hocs/withTachyons';
import { ColorKey } from 'shared/types/Themes';
import { View } from '../View/View';
import styles from './ActivityIndicator.module.scss';
import { getColorClassName } from 'shared/utils/getStyles';

export interface ActivityIndicatorProps extends WithTachyonsProps {
  /** #### Kích thước của component */
  size?: 'small' | 'medium' | 'large' | number;
  /** #### Color của component theo ThemeProvider */
  color?: ColorKey;
}

const ActivityIndicatorComponent = forwardRef<HTMLElement, ActivityIndicatorProps>(
  ({ size = 'medium', color = 'primary', className, ...rest }, ref) => {
    const sizeClassName = typeof size === 'string' ? styles[size] : '';
    const sizeStyle: CSSProperties = typeof size === 'number' ? { width: size, height: size } : {};
    const itemClipRectStyle: CSSProperties = typeof size === 'number' ? { clip: `rect(0,  ${size}px,  ${size}px,  ${size / 2}px)` } : {};
    const colorClassName = getColorClassName(color);
    return (
      <View {...rest} ref={ref} className={classNames(styles.container, className)}>
        <View className={classNames(styles.indicator, sizeClassName)} style={sizeStyle}>
          <View className={classNames(styles.item, colorClassName)} style={itemClipRectStyle}></View>
        </View>
      </View>
    );
  },
);

export const ActivityIndicator = withTachyons<HTMLElement, ActivityIndicatorProps>(ActivityIndicatorComponent);
