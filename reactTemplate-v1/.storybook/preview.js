import React from 'react';
import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'shared';
import { themeOverrides } from 'App';
import '!style-loader!css-loader!sass-loader!styles/main.scss';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'store/configureStore';

const withThemeContext = storyFn => (
  <Provider store={store}>
    <PersistGate loading={<div />} persistor={persistor}>
      <ThemeProvider themeOverrides={themeOverrides}>
        <MemoryRouter>{storyFn()}</MemoryRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);

addDecorator(withThemeContext);

addDecorator(withKnobs);

addParameters({
  options: {
    showRoots: true,
  },
});
