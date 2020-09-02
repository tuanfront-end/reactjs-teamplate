import React, { CSSProperties, forwardRef } from 'react';
import { View } from '../View/View';

export interface SpaceProps {
  type?: 'vertical' | 'horizontal';
  size?: number;
}

export const Space = forwardRef<HTMLElement, SpaceProps>(({ type = 'vertical', size = 0 }, ref) => {
  const sizeStyle: CSSProperties = type === 'vertical' ? { height: size } : { width: size };
  return <View ref={ref} style={sizeStyle} />;
});
