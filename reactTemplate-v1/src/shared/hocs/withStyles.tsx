import React, { ComponentType, forwardRef, CSSProperties, HTMLAttributes } from 'react';
import { Tachyons } from 'shared/types/Tachyons';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';
import { classNames } from 'shared';
import { ColorKey, BorderStyle, BorderWidth, Radius } from 'shared/types/Themes';
import {
  getColorClassName,
  getColorHoverClassName,
  getBgColorClassName,
  getBgColorHoverClassName,
  getBdColorClassName,
  getBdColorHoverClassName,
  getBdStyleClassName,
  getBdWidthClassName,
  getRadiusClassName,
} from 'shared/utils/getStyles';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import getTachyonsClassName from 'shared/utils/getTachyonsClassName';

type Blacklist = 'all' | 'color' | 'colorHover' | 'backgroundColor' | 'backgroundColorHover' | 'borderColor' | 'borderColorHover';

export interface WithStylesProps {
  /** #### Sử dụng class của thư viện css tachyons */
  tachyons?: Tachyons | Tachyons[];
  /** #### Sử dụng style inline */
  style?: CSSProperties;
  /** #### Màu text được lấy màu từ ThemeProvider */
  color?: ColorKey;
  /** #### Màu text khi hover được lấy màu từ ThemeProvider */
  colorHover?: ColorKey;
  /** #### Màu nền được lấy màu từ ThemeProvider */
  backgroundColor?: ColorKey;
  /** #### Màu nền khi hover được lấy màu từ ThemeProvider */
  backgroundColorHover?: ColorKey;
  /** #### Màu border được lấy màu từ ThemeProvider */
  borderColor?: ColorKey;
  /** #### Màu border khi hover được lấy màu từ ThemeProvider */
  borderColorHover?: ColorKey;
  /** #### Kiểu của border */
  borderStyle?: BorderStyle;
  /** #### Border width css */
  borderWidth?: BorderWidth;
  /** #### Border radius css */
  radius?: Radius;
  /** #### Set width */
  width?: number | string;
  /** #### Set height */
  height?: number | string;
  /** #### Add className */
  className?: string;
  /** #### Khi ThemeProvider bật chế độ nightMode, nếu không muốn những props màu sắc nào thay đổi thì thêm nó vào đây ( ví dụ nightModeBlacklist="color" ) */
  nightModeBlacklist?: Blacklist | Omit<Blacklist, 'all'>[];
  /** #### Bật tắt direction ngôn ngữ theo thành phần cha */
  globalDirection?: boolean;
}

export interface WithStylesConfig extends Omit<WithStylesProps, 'tachyons' | 'nightModeBlacklist' | 'style' | 'globalDirection'> {}

const prevColor = (type: Blacklist, nightModeBlacklist?: Blacklist | Omit<Blacklist, 'all'>[]) => {
  if (!nightModeBlacklist) {
    return false;
  }
  if (nightModeBlacklist === type) {
    return true;
  }
  if (nightModeBlacklist === 'all') {
    return true;
  }
  return nightModeBlacklist.includes(type);
};

export default function withStyles<R, P extends object>(
  Component: ComponentType<P & HTMLAttributes<HTMLElement>>,
  defaultProps?: WithStylesConfig,
  classNameProp = 'className',
) {
  const WithStyles = forwardRef<R, P & WithStylesProps>(
    (
      {
        tachyons,
        nightModeBlacklist,
        globalDirection = true,
        className = defaultProps?.className,
        color = defaultProps?.color,
        colorHover = defaultProps?.colorHover,
        backgroundColor = defaultProps?.backgroundColor,
        backgroundColorHover = defaultProps?.backgroundColorHover,
        borderColor = defaultProps?.borderColor,
        borderColorHover = defaultProps?.borderColorHover,
        borderStyle = defaultProps?.borderStyle,
        borderWidth = defaultProps?.borderWidth,
        radius = defaultProps?.radius,
        width = defaultProps?.width,
        height = defaultProps?.height,
        style,
        ...rest
      },
      ref,
    ) => {
      const { nightMode, direction } = useTheme();
      const tachyonsClassName = getTachyonsClassName(tachyons, direction, globalDirection);
      const colorClassName = getColorClassName(color, nightMode && prevColor('color', nightModeBlacklist));
      const colorHoverClassName = getColorHoverClassName(colorHover, nightMode && prevColor('colorHover', nightModeBlacklist));
      const backgroundColorClassName = getBgColorClassName(backgroundColor, nightMode && prevColor('backgroundColor', nightModeBlacklist));
      const backgroundColorHoverClassName = getBgColorHoverClassName(
        backgroundColorHover,
        nightMode && prevColor('backgroundColorHover', nightModeBlacklist),
      );
      const borderColorClassName = getBdColorClassName(borderColor, nightMode && prevColor('borderColor', nightModeBlacklist));
      const borderColorHoverClassName = getBdColorHoverClassName(borderColorHover, nightMode && prevColor('borderColorHover', nightModeBlacklist));
      const borderStyleClassName = getBdStyleClassName(borderStyle);
      const borderWidthClassName = getBdWidthClassName(borderWidth);
      const radiusClassName = getRadiusClassName(radius);
      const radiusStyle: CSSProperties = typeof radius === 'number' ? { borderRadius: radius } : {};
      return (
        <Component
          ref={ref}
          {...(rest as P)}
          style={{
            ...(width !== undefined ? { width } : {}),
            ...(height !== undefined ? { height } : {}),
            ...radiusStyle,
            ...style,
          }}
          {...{
            [classNameProp]: classNames(
              tachyonsClassName,
              colorClassName,
              colorHoverClassName,
              backgroundColorClassName,
              backgroundColorHoverClassName,
              borderColorClassName,
              borderColorHoverClassName,
              borderStyleClassName,
              borderWidthClassName,
              radiusClassName,
              className,
            ),
          }}
        />
      );
    },
  );

  WithStyles.displayName = `WithStyles ${getDisplayNameHOC(Component)}`;

  return WithStyles;
}
