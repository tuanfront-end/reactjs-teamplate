import React, { FC, useRef, useEffect } from 'react';
import scrollEnd from './scrollEnd';
import { View, ViewProps } from '../View/View';

export interface InfiniteScrollProps extends ViewProps {
  root?: Element | null;
  offset?: number;
  onScrollEnd?: () => void;
}

export const InfiniteScroll: FC<InfiniteScrollProps> = ({ children, root = null, offset = 10, onScrollEnd = () => {}, ...rest }) => {
  const itemRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    scrollEnd(itemRef.current, onScrollEnd, {
      offset,
      root,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View {...rest}>
      {children}
      <View ref={c => (itemRef.current = c)} />
    </View>
  );
};
