import React, { ReactNode, useState, useEffect } from 'react';
import withTachyons, { WithTachyonsProps } from 'shared/hocs/withTachyons';
import styles from './Switch.module.scss';
import { View } from '../View/View';
import { classNames } from 'shared';
import { ColorKey, Size } from 'shared/types/Themes';
import { ActivityIndicator } from '../ActivityIndicator/ActivityIndicator';

export interface SwitchProps extends WithTachyonsProps {
  checked?: boolean;
  defaultChecked?: boolean;
  checkedChildren?: ReactNode;
  unCheckedChildren?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  size?: Size;
  onChange?: ({ checked, event }: { checked: boolean; event: React.MouseEvent<HTMLElement, MouseEvent> }) => void;
}

const SwitchComponent = ({
  checked,
  defaultChecked = true,
  checkedChildren,
  unCheckedChildren,
  disabled = false,
  loading = false,
  size = 'medium',
  onChange,
  className,
  ...rest
}: SwitchProps) => {
  const [checkedState, setCheckedState] = useState(defaultChecked);

  useEffect(() => {
    if (typeof checked === 'boolean') {
      setCheckedState(checked);
    }
  }, [checked, checkedState]);

  const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (loading || disabled) {
      return;
    }
    setCheckedState(!checkedState);
    onChange?.({ checked: !checkedState, event });
  };

  const renderInnerContent = () => {
    if (!checkedChildren && !unCheckedChildren) {
      return null;
    }
    const innerClass = checkedState ? styles.innerChecked : styles.innerUnChecked;
    const innerContent = checkedState ? checkedChildren : unCheckedChildren;

    return (
      <View color="light" className={classNames(styles.inner, innerClass)}>
        {innerContent}
      </View>
    );
  };

  const containercheckedClass = checkedState ? styles.checked : '';
  const disableClass = disabled ? styles.disable : '';
  const sizeClass = styles[size];

  let loadingSize = 9;
  if (size === 'extra-small') loadingSize = 8;
  if (size === 'small') loadingSize = 10;
  if (size === 'medium') loadingSize = 12;
  if (size === 'large') loadingSize = 14;

  const containerBgColor: ColorKey = checkedState ? 'primary' : 'gray1';

  return (
    <View
      {...rest}
      color="dark2"
      backgroundColor={containerBgColor}
      className={classNames(styles.container, containercheckedClass, disableClass, sizeClass, className)}
      onClick={handleClick}
    >
      {renderInnerContent()}
      <View className={classNames(styles.handle)}>{loading && <ActivityIndicator size={loadingSize} className={styles.handleLoadingIcon} />}</View>
    </View>
  );
};

export const Switch = withTachyons<HTMLElement, SwitchProps>(SwitchComponent);
