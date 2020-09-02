import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { store, persistor } from './store/configureStore';
import Routes from 'routes';
import { ThemeProvider, ThemeOverrides } from 'shared';
import { ConfigProvider } from 'antd';

export const themeOverrides: ThemeOverrides = {
  colors: {
    primary: '#6f9dff',
    secondary: '#2DDE98',
    tertiary: '#fd5678',
    quaternary: '#FFC20E',
    dark1: '#27262B',
    dark2: '#343238',
    dark3: '#75737C',
    dark4: '#929099',
    dark5: '#b6b4b9',
    gray1: '#DBDADE',
    gray2: '#ECEBEE',
    gray3: '#F0F0F2',
    gray4: '#F7F6F9',
  },
  nightModeColors: {
    dark: '#ffffff',
    light: '#343238',
    gray1: '#27262B',
    gray2: '#343238',
    gray3: '#75737C',
    gray4: '#929099',
    gray5: '#b6b4b9',
    dark1: '#F7F6F9',
    dark2: '#F0F0F2',
    dark3: '#ECEBEE',
    dark4: '#DBDADE',
    dark5: '#DBDADE',
  },
};

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <ThemeProvider themeOverrides={themeOverrides}>
          <ConfigProvider direction={themeOverrides.direction || 'ltr'}>
            <Routes />
          </ConfigProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
