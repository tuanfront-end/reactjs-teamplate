import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Page } from './types';
import HomePage from 'containers/HomePage/HomePage';

export const pages: Page[] = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
];

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        {pages.map(({ component, path, exact }) => {
          return <Route key={path} component={component} exact={exact} path={path} />;
        })}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
