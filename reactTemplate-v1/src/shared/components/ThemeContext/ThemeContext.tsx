import React, { createContext, ReactNode, useContext, FC, ComponentType, useEffect } from 'react';
import { Colors } from 'shared/types/Themes';
import defaultColors from 'shared/themes/defaultColors';
import getDisplayNameHOC from 'shared/utils/getDisplayNameHOC';
import getColorsValue from 'shared/utils/getColorsValue';
import getRootVariables from 'shared/utils/getRootVariables';
import { Helmet } from 'react-helmet';

export type Direction = 'ltr' | 'rtl';
export interface ThemeOverrides {
  colors?: Partial<Colors>;
  nightModeColors?: Partial<Colors>;
  nightMode?: boolean;
  direction?: Direction;
  debug?: boolean;
}

export interface ThemeProviderProps {
  themeOverrides?: ThemeOverrides;
  children: ReactNode;
}

export const defaultTheme: ThemeOverrides = {
  colors: defaultColors,
  nightModeColors: defaultColors,
  nightMode: false,
  direction: 'ltr',
  debug: false,
};

const ThemeContext = createContext(defaultTheme);

function setDefaultDirection(direction: Direction = 'ltr') {
  const htmlEl = document.querySelector('html');
  if (htmlEl) {
    htmlEl.setAttribute('dir', direction);
  }
}

// Khi app được load thì gán luôn <html dir="ltr">
setDefaultDirection();

export function ThemeProvider({ themeOverrides = defaultTheme, children }: ThemeProviderProps) {
  const colors = { ...defaultColors, ...themeOverrides.colors };
  const nightModeColors = { ...colors, ...themeOverrides.nightModeColors };
  const debug = themeOverrides.debug || false;
  const nightMode = themeOverrides.nightMode || false;
  const direction = themeOverrides.direction || 'ltr';
  const rootVariables = getRootVariables(nightMode ? nightModeColors : colors);
  const rootPrevVariables = nightMode ? getRootVariables(colors, true) : {};
  const rootAllVariables = { ...rootVariables, ...rootPrevVariables };
  const colorsValue = getColorsValue(colors);
  const nightModeColorsValue = getColorsValue(nightModeColors, true);

  useEffect(() => {
    setDefaultDirection(direction);
  }, [direction]);

  return (
    <ThemeContext.Provider
      value={{
        colors: colorsValue,
        nightModeColors: nightModeColorsValue,
        nightMode,
        direction,
        debug,
      }}
    >
      <div className="__ThemeProvider__">{children}</div>
      <Helmet>
        <style>{`:root ${JSON.stringify(rootAllVariables)
          .replace(/,(?="--)/g, ';')
          .replace(/"/g, '')}`}</style>
      </Helmet>
    </ThemeContext.Provider>
  );
}

export const ThemeConsumer = ThemeContext.Consumer;

export function useTheme() {
  const theme = useContext(ThemeContext);
  return theme;
}

export function withTheme<P extends object>(Component: ComponentType<P>) {
  const WithTheme: FC<P> = ({ ...rest }) => {
    const theme = useTheme();
    return <Component {...rest} theme={theme} />;
  };
  WithTheme.displayName = `WithTheme ${getDisplayNameHOC(Component)}`;
  return WithTheme;
}
