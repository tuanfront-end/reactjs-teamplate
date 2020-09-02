import { Colors } from 'shared/types/Themes';
import hexToRgb from './hexToRgb';

const getRootVariables = (colors: Colors, isPrev = false) => {
  return Object.entries(colors).reduce<Record<string, string>>((obj, [key, value]) => {
    if (value === 'transparent') {
      return {
        ...obj,
        [`--color${isPrev ? `-prev` : ''}-${key}`]: value,
      };
    }
    const { r, g, b } = hexToRgb(value);
    return {
      ...obj,
      [`--color${isPrev ? `-prev` : ''}-${key}`]: value,
      [`--rgb${isPrev ? `-prev` : ''}-${key}`]: `${r},${g},${b}`,
    };
  }, {});
};

export default getRootVariables;
