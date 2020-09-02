import React, { ComponentType, forwardRef, CSSProperties, HTMLAttributes } from 'react';
import { Tachyons } from 'shared/types/Tachyons';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';
import { classNames } from 'shared';
import { useTheme } from 'shared/components/ThemeContext/ThemeContext';
import getTachyonsClassName from 'shared/utils/getTachyonsClassName';

export interface WithTachyonsProps {
  /** #### Sử dụng class của thư viện css tachyons */
  tachyons?: Tachyons | Tachyons[];
  /** #### Sử dụng style inline */
  style?: CSSProperties;
  /** #### Sử dụng className */
  className?: string;
  /** #### Bật tắt direction ngôn ngữ theo thành phần cha */
  globalDirection?: boolean;
}

export default function withTachyons<R, P extends object>(Component: ComponentType<P & HTMLAttributes<HTMLElement>>, classNameProp = 'className') {
  const WithTachyons = forwardRef<R, P & WithTachyonsProps>(({ tachyons, className, globalDirection = true, ...rest }, ref) => {
    const { direction } = useTheme();
    const tachyonsClassName = getTachyonsClassName(tachyons, direction, globalDirection);
    return (
      <Component
        ref={ref}
        {...(rest as P)}
        {...{
          [classNameProp]: classNames(tachyonsClassName, className),
        }}
      />
    );
  });

  WithTachyons.displayName = `WithTachyons ${getDisplayNameHOC(Component)}`;

  return WithTachyons;
}
