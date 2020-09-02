import defaultColors from 'shared/themes/defaultColors';

export type Colors = typeof defaultColors;

export type ColorKey = keyof Colors;

export type BorderStyle = 'solid' | 'dashed' | 'dotted';

export type BorderWidth = '1/6' | '2/6' | '3/6' | '4/6' | '5/6' | '6/6';

export type Size = 'extra-small' | 'small' | 'medium' | 'large';

export type Radius = 'square' | 'round' | 'pill' | number;
