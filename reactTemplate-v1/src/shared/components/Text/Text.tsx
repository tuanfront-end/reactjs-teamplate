import { ReactNode, HTMLAttributes, createElement, forwardRef, CSSProperties } from 'react';
import classNames from 'shared/utils/classNames';
import withStyles, { WithStylesProps } from 'shared/hocs/withStyles';
import styles from './Text.module.scss';
import { useTheme } from '../ThemeContext/ThemeContext';

export interface TextProps extends Omit<HTMLAttributes<HTMLElement>, 'ref' | 'color' | 'className' | 'style'>, WithStylesProps {
  /** #### Tên thẻ html */
  tagName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'i' | 'span' | 'strong' | 'small' | 'label' | 'div';
  /** #### Chỉnh font-size cho text */
  size?: 'inherit' | number;
  /** #### Render children */
  children?: ReactNode;
}

const TextComponent = forwardRef<HTMLElement, TextProps>(({ tagName = 'div', children, className = '', style, size, ...rest }, ref) => {
  const { debug } = useTheme();
  const classes = classNames(styles.container, className);
  const sizeStyle: CSSProperties = !!size ? { fontSize: size } : {};
  return createElement(
    tagName,
    {
      ...rest,
      ref,
      style: {
        ...style,
        ...sizeStyle,
        ...(debug ? { outline: '1px solid cyan' } : {}),
      },
      ...(classes ? { className: classes } : {}),
    },
    children,
  );
});

export const Text = withStyles<HTMLElement, TextProps>(TextComponent);
