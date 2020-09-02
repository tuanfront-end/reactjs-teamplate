import { ColorKey, BorderStyle, BorderWidth, Radius } from 'shared/types/Themes';

export function getColorClassName(color?: ColorKey, prev = false) {
  return !!color ? `ui-color${prev ? '-prev' : ''}-${color}` : '';
}

export function getColorHoverClassName(color?: ColorKey, prev = false) {
  return !!color ? `ui-color${prev ? '-prev' : ''}-hover-${color}` : '';
}

export function getBgColorClassName(color?: ColorKey, prev = false) {
  return !!color ? `ui-background-color${prev ? '-prev' : ''}-${color}` : '';
}

export function getBgColorHoverClassName(color?: ColorKey, prev = false) {
  return !!color ? `ui-background-color${prev ? '-prev' : ''}-hover-${color}` : '';
}

export function getBdColorClassName(color?: ColorKey, prev = false) {
  return !!color ? `ui-border-color${prev ? '-prev' : ''}-${color}` : '';
}

export function getBdColorHoverClassName(color?: ColorKey, prev = false) {
  return !!color ? `ui-border-color${prev ? '-prev' : ''}-hover-${color}` : '';
}

export function getBdStyleClassName(borderStyle?: BorderStyle) {
  return !!borderStyle ? `ui-border-style-${borderStyle}` : '';
}

export function getBdWidthClassName(borderWidth?: BorderWidth) {
  if (!borderWidth) {
    return '';
  }
  switch (borderWidth) {
    case '1/6':
      return 'ui-border-width-1';
    case '2/6':
      return 'ui-border-width-2';
    case '3/6':
      return 'ui-border-width-3';
    case '4/6':
      return 'ui-border-width-4';
    case '5/6':
      return 'ui-border-width-5';
    case '6/6':
      return 'ui-border-width-6';
    default:
      return '';
  }
}

export function getRadiusClassName(radius?: Radius) {
  switch (radius) {
    case 'square':
      return 'ui-square';
    case 'round':
      return 'ui-round';
    case 'pill':
      return 'ui-pill';
    default:
      return '';
  }
}
