import React, { FC } from 'react';
import { LineAwesomeName } from './LineAwesomeName';
import { MaterialIconName } from './MaterialIconName';
import { IcomoonUltimateName } from './IcomoonUltimateName';
import { classNames } from 'shared';
import withStyles, { WithStylesProps } from 'shared/hocs/withStyles';
import styles from './Icons.module.scss';

interface IconProps extends WithStylesProps {
  /** #### Sự kiện khi bấm vào icon */
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export interface LineAwesomeProps extends IconProps {
  /** #### Icon name */
  name: LineAwesomeName;
  /** #### Icon size */
  size?: number;
}

const LineAwesomeComponent: FC<LineAwesomeProps> = ({ name, className = '', size, style = {}, ...rest }) => {
  return (
    <i
      {...rest}
      style={{ ...style, ...(!!size ? { '--font-size': `${size}px` } : {}) }}
      className={classNames(`la la-${name}`, styles.container, className)}
    />
  );
};

export const LineAwesome = withStyles(LineAwesomeComponent);

export interface MaterialIconProps extends IconProps {
  /** #### Icon name */
  name: MaterialIconName;
  /** #### Icon size */
  size?: number;
  /** #### Icon type */
  type?: 'filled' | 'outlined';
}

export const MaterialIconComponent: FC<MaterialIconProps> = ({ name, type = 'filled', className = '', size, style = {}, ...rest }) => {
  return (
    <i
      {...rest}
      style={{ ...style, ...(!!size ? { '--font-size': `${size}px` } : {}) }}
      className={classNames(`material-icons${type === 'filled' ? '' : '-outlined'}`, styles.container, className)}
    >
      {name}
    </i>
  );
};
export const MaterialIcon = withStyles(MaterialIconComponent);

export interface IcomoonUltimateProps extends IconProps {
  /** #### Icon name */
  name: IcomoonUltimateName;
  /** #### Icon size */
  size?: number;
}

export const IcomoonUltimateComponent: FC<IcomoonUltimateProps> = ({ name, className = '', size, style = {}, ...rest }) => {
  return (
    <i
      {...rest}
      style={{ ...style, ...(!!size ? { '--font-size': `${size}px` } : {}) }}
      className={classNames(`icmn-${name}`, styles.container, className)}
    />
  );
};
export const IcomoonUltimate = withStyles(IcomoonUltimateComponent);
