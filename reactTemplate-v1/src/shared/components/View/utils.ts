import COLUMN_FORMAT from './constants';
import { Columns, ViewColGapProps } from './types';
import styles from './View.module.scss';

export const getColumnsClassName = (columns: Columns) => {
  return COLUMN_FORMAT.map((colFormat, index) => {
    if (!columns[index] || columns[index] === 0) {
      return '';
    }
    return styles[`col-${colFormat}-${columns[index]}`];
  }).join(' ');
};

export const getStyleForGridEqual = ({ colXs, colSm, colMd, colLg, gapXs, gapSm, gapMd, gapLg }: ViewColGapProps) => {
  return {
    '--col-xs': colXs,
    '--col-sm': colSm,
    '--col-md': colMd,
    '--col-lg': colLg,
    '--gap-xs': `${gapXs}px`,
    ...(gapSm ? { '--gap-sm': `${gapSm}px` } : {}),
    ...(gapMd ? { '--gap-md': `${gapMd}px` } : {}),
    ...(gapLg ? { '--gap-lg': `${gapLg}px` } : {}),
  };
};
