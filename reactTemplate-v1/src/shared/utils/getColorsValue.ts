import { Colors, ColorKey } from 'shared/types/Themes';

const getColorsValue = (colors: Colors, nightMode = false) => {
  return Object.keys(colors).reduce<Record<ColorKey, string>>((obj, key) => {
    return {
      ...obj,
      [key]: `var(--color${nightMode ? `-nightmode` : ''}-${key})`,
    };
  }, {} as Record<string, string>);
};

export default getColorsValue;
