import React, { ReactNode, HTMLAttributes, createElement, forwardRef, Children } from 'react';
import classNames from 'shared/utils/classNames';
import { Columns, ViewColGapProps } from './types';
import { getColumnsClassName, getStyleForGridEqual } from './utils';
import withStyles, { WithStylesProps } from 'shared/hocs/withStyles';
import styles from './View.module.scss';
import { useTheme } from '../ThemeContext/ThemeContext';

export interface ViewProps extends WithStylesProps, ViewColGapProps, Omit<HTMLAttributes<HTMLElement>, 'color' | 'className' | 'style'> {
  /** #### Tên thẻ html */
  tagName?: 'div' | 'section' | 'header' | 'article' | 'aside' | 'footer' | 'figure' | 'figcaption' | 'main' | 'nav' | 'ol' | 'ul' | 'li';
  /** #### React children */
  children?: ReactNode;
  /** #### Bật grid với column đều nhau được set với props `colXs`, `colSm`, `colMd`, `colLg`, `gapXs`, `gapSm`, `gapMd`, `gapLg` */
  gridEqual?: boolean;
  /** #### Thêm className cho column sử dụng với gridEqual */
  columnClassName?: string;
  /** #### Thêm className container ( giống như bootstrap ) */
  container?: boolean;
  /** #### Thêm className row ( giống như bootstrap ) */
  row?: boolean;
  /** #### Thêm 1 mảng columns đc set theo thứ tự `[xs, sm, md, lg]` và lớn nhất là 12 columns */
  columns?: Columns;
}

const ViewComponent = forwardRef<HTMLElement, ViewProps>(
  (
    {
      tagName = 'div',
      colXs = 1,
      colSm,
      colMd,
      colLg,
      gapXs = 30,
      gapSm,
      gapMd,
      gapLg,
      children,
      className,
      style,
      columnClassName,
      gridEqual = false,
      container = false,
      row = false,
      columns = [0, 0, 0, 0],
      ...rest
    },
    ref,
  ) => {
    const { debug } = useTheme();
    const gridStyle = gridEqual ? getStyleForGridEqual({ colXs, colSm, colMd, colLg, gapXs, gapSm, gapMd, gapLg }) : {};
    const gridClassName = gridEqual ? styles.grid : '';
    const containerClassName = container ? styles.container : '';
    const rowClassName = row ? styles.row : '';
    const columnsClassName = getColumnsClassName(columns);
    const classes = classNames(gridClassName, containerClassName, rowClassName, columnsClassName, className);
    const renderChildren = () => {
      return Array.isArray(children) ? (
        Children.map(children, child => <div className={columnClassName}>{child}</div>)
      ) : (
        <div className={columnClassName}>{children}</div>
      );
    };
    return createElement(
      tagName,
      {
        ...rest,
        ref,
        style: {
          ...gridStyle,
          ...style,
          ...(debug ? { outline: '1px solid red' } : {}),
        },
        ...(classes ? { className: classes } : {}),
      },
      gridEqual ? renderChildren() : children,
    );
  },
);

export const View = withStyles<HTMLElement, ViewProps>(ViewComponent);
