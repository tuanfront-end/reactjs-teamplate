import React, { ReactNode, DOMAttributes, HTMLAttributes, ButtonHTMLAttributes, forwardRef, Ref } from 'react';
import classNames from 'shared/utils/classNames';
import withStyles, { WithStylesProps } from 'shared/hocs/withStyles';
import styles from './Button.module.scss';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';
import { Text } from '../Text/Text';
import { Size } from 'shared/types/Themes';

export interface ButtonProps extends WithStylesProps {
  /** #### React children */
  children: ReactNode;
  /** #### Các kích thước của button */
  size?: Size;
  /** #### Bật lên sẽ dài full 100% */
  block?: boolean;
  /** #### Thuộc tính href của thẻ a */
  href?: string;
  /** #### Thuộc tính target của thẻ a nhưng bỏ "_" ở trước */
  target?: 'blank' | 'self' | 'parent' | 'top';
  /** #### Set css font-size */
  fontSize?: number;
  /** #### Khi bật disabled thì nút mờ đi và không thể thực hiện event */
  disabled?: boolean;
  /** #### Khi bật lên thì sẽ hiển thị icon loading bên trái */
  loading?: boolean;
  /** #### Thuộc tính type của thẻ button */
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  /** #### Sự kiện click */
  onClick?: DOMAttributes<HTMLElement>['onClick'];
}

const ButtonComponent = forwardRef<HTMLElement, ButtonProps>(
  (
    {
      href,
      children,
      target = 'self',
      className,
      size = 'medium',
      block = false,
      onClick,
      disabled = false,
      loading = false,
      type = 'button',
      fontSize,
      style,
    },
    ref,
  ) => {
    const blockClassName = block ? styles.block : '';
    const disabledClassName = disabled ? styles.disabled : '';
    const classes = classNames(styles.container, styles[size], blockClassName, disabledClassName, className);
    const props: HTMLAttributes<HTMLElement> = {
      className: classes,
      style: {
        fontSize,
        ...style,
      },
      ...(disabled ? {} : { onClick }),
    };
    const renderChildren = () => {
      return (
        <>
          {loading && <ActivityIndicator size={18} className={styles.loading} />}
          <Text tagName="span" className={styles.text}>
            {children}
          </Text>
        </>
      );
    };
    if (!!href) {
      return (
        <a ref={ref as Ref<HTMLAnchorElement>} href={href} target={`_${target}`} {...props}>
          {renderChildren()}
        </a>
      );
    }
    return (
      <button ref={ref as Ref<HTMLButtonElement>} type={type} {...props}>
        {renderChildren()}
      </button>
    );
  },
);

export const Button = withStyles<HTMLElement, ButtonProps>(ButtonComponent, {
  color: 'light',
  backgroundColor: 'primary',
  radius: 'square',
});
