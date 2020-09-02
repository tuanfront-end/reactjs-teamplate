import React, { FC, CSSProperties } from 'react';
import { Text } from '../Text/Text';
import styles from './TextUnderline.module.scss';
import { ColorKey } from 'shared/types/Themes';
import { getColorClassName } from 'shared/utils/getStyles';
import classNames from 'shared/utils/classNames';

export interface TextUnderineProps {
  /** #### Set css font-size */
  size?: number | 'inherit';
  /** #### Color của component theo ThemeProvider */
  color?: ColorKey;
  /** #### React children */
  children: string | number;
  /** #### Màu của line */
  lineColor?: string;
  /** #### Kích thước line */
  lineSize?: number;
  /** #### Khoảng cách line tính từ bottom của chữ */
  lineBottomSpace?: number;
}

export const TextUnderline: FC<TextUnderineProps> = ({ children, color = 'dark2', size, lineSize, lineColor, lineBottomSpace }) => {
  const colorClassName = getColorClassName(color);
  const lineSizeStyle: CSSProperties = !!lineSize ? { borderWidth: lineSize } : {};
  const lineColorStyle: CSSProperties = !!lineColor ? { borderColor: lineColor } : {};
  const lineBottomSpaceWrapStyle: CSSProperties = !!lineBottomSpace ? { top: -lineBottomSpace } : {};
  const lineBottomSpaceStyle: CSSProperties = !!lineBottomSpace ? { top: lineBottomSpace } : {};
  return (
    <Text
      tagName="span"
      className={classNames(styles.container, colorClassName)}
      size={size}
      style={{ ...lineSizeStyle, ...lineColorStyle, ...lineBottomSpaceWrapStyle }}
    >
      <Text tagName="span" style={lineBottomSpaceStyle}>
        {children}
      </Text>
    </Text>
  );
};
