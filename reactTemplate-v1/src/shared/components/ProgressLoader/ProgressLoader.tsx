import React, { FC, useState, useEffect, useRef } from 'react';
import { View } from '../View/View';
import { ColorKey } from 'shared/types/Themes';
import styles from './ProgressLoader.module.scss';
import classNames from 'shared/utils/classNames';
import { Tachyons } from 'shared/types/Tachyons';

export interface ProgressLoaderProps {
  /** #### Đã load xong */
  done: boolean;
  /** #### Màu của thanh loader */
  color?: ColorKey;
  /** #### Duration của bar đơn vị là ms */
  duration?: number;
  /** #### className của thẻ bao */
  containerClassName?: string;
  /** #### className của bar */
  barClassName?: string;
  /** #### tachyons vendors */
  tachyons?: Tachyons;
}

export const ProgressLoader: FC<ProgressLoaderProps> = ({
  done,
  color = 'primary',
  duration = 300,
  containerClassName = '',
  barClassName = '',
  tachyons,
}) => {
  const [count, setCount] = useState(0);
  const [doneState, setDoneState] = useState(false);
  const intervalRef = useRef<number | NodeJS.Timeout>(0);
  const timeoutRef = useRef<number | NodeJS.Timeout>(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (count < 9) {
        setCount(count => count + 1);
      } else {
        clearInterval(intervalRef.current as number);
      }
    }, duration + 200);
    return () => {
      clearInterval(intervalRef.current as number);
    };
  }, [count, duration]);

  useEffect(() => {
    if (done) {
      setCount(10);
      clearInterval(intervalRef.current as number);
      timeoutRef.current = setTimeout(() => {
        setDoneState(true);
        clearTimeout(timeoutRef.current as number);
      }, duration);
    }
    return () => {
      clearTimeout(timeoutRef.current as number);
    };
  }, [done, duration]);

  if (doneState) {
    return null;
  }

  return (
    <View className={classNames(styles.container, containerClassName)} tachyons={tachyons}>
      <View
        className={classNames(styles.bar, barClassName)}
        style={{ width: `${count * 10}%`, transition: `width ${duration}ms` }}
        backgroundColor={color}
      />
    </View>
  );
};
