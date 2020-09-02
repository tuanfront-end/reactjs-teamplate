import React, { forwardRef, ReactNode, CSSProperties } from 'react';
import withTachyons, { WithTachyonsProps } from 'shared/hocs/withTachyons';
import { View } from '../View/View';
import styles from './Alert.module.scss';
import { Text } from '../Text/Text';
import classNames from 'utils/functions/classNames';
import { getBgColorClassName, getBdColorClassName, getColorClassName } from 'shared/utils/getStyles';
import { ColorKey } from 'shared/types/Themes';
import { LineAwesome } from '../Icons/Icons';
import { LineAwesomeName } from '../Icons/LineAwesomeName';

export interface AlertProps extends WithTachyonsProps {
  /** #### Bật tắt nút ( X ) */
  closable?: boolean;
  /** #### Đoạn text mô tả */
  description?: string;
  /** #### Đoạn text size to giống title */
  message: string;
  /** #### Bật tắt icon phía bên trái */
  showIcon?: boolean;
  /** #### Bật tắt border cho component */
  disableBorder?: boolean;
  /** #### Chọn kiểu alert */
  type?: 'success' | 'info' | 'warning' | 'danger';
  /** #### Chọn kích thước */
  size?: 'small' | 'medium' | 'large';
  /** #### Render Icon */
  renderIcon?: ReactNode;
  /** #### Chỉnh sửa border radius */
  radius?: 'square' | 'round' | 'pill' | number;
  /** #### Bấm nút close */
  onClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const getIconName = (type: string): LineAwesomeName => {
  switch (type) {
    case 'info':
      return 'exclamation-circle';
    case 'success':
      return 'check-circle-o';
    case 'warning':
      return 'exclamation-triangle';
    case 'danger':
      return 'times-circle';

    default:
      return 'info';
  }
};

/**
 * ### example
 * ```typescript
 * <div>test</div>
 * ```
 */
const AlertComponent = forwardRef<HTMLElement, AlertProps>(
  (
    {
      closable = true,
      description,
      disableBorder,
      radius = 'square',
      message,
      className,
      showIcon = true,
      type = 'info',
      size = 'medium',
      renderIcon,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const bgColor = getBgColorClassName(type as ColorKey);
    const bdColor = getBdColorClassName(type as ColorKey);
    const iConColor = getColorClassName(type as ColorKey);

    const sizeClass = styles[size];
    const radiusClass = typeof radius === 'string' ? styles[radius] : '';
    const disableBorderClass = disableBorder ? styles.disableBorder : '';
    const closableClass = closable ? styles.enableClose : '';
    const showIconClass = showIcon ? styles.showIcon : '';
    const containerClass = classNames(bdColor, sizeClass, radiusClass, disableBorderClass, closableClass, showIconClass, styles.container, className);

    const radiusStyle: CSSProperties = typeof radius === 'number' ? { borderRadius: radius } : {};
    const iconName = getIconName(type);

    const renderAlertIcon = () => {
      if (!showIcon) {
        return null;
      }
      if (renderIcon) {
        return renderIcon;
      }
      return <LineAwesome className={classNames(styles.icon, iConColor)} tachyons={['absolute', 'left-1', 'pointer']} name={iconName} />;
    };

    const renderClose = () => {
      if (!closable) {
        return null;
      }
      return (
        <LineAwesome
          colorHover="dark1"
          size={16}
          tachyons={['absolute', 'top-1', 'right-1', 'pointer']}
          name="times"
          onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => onClose?.(event)}
          color="dark3"
        />
      );
    };

    return (
      <View {...rest} ref={ref} className={containerClass} style={radiusStyle}>
        {renderAlertIcon()}
        <Text className={styles.message} color="dark1">
          {message}
        </Text>
        {description && (
          <Text className={styles.description} color="dark3">
            {description}
          </Text>
        )}
        {renderClose()}
        <View tachyons={['absolute', 'absolute--fill']} className={classNames(styles.bgOverlay, bgColor)} />
      </View>
    );
  },
);

export const Alert = withTachyons<HTMLElement, AlertProps>(AlertComponent);
