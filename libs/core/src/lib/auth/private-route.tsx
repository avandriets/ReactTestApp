import { AuthConsumer } from './auth-provider';
import React from 'react';
import { Route } from 'react-router-dom';

export const PrivateRoute = ({ component, ...rest }) => {
  const renderFn = (Component) => (props) => (
    <AuthConsumer>
      {({ isAuthenticated, signinRedirect }) => {
        if (!!Component && isAuthenticated()) {
          return <Component {...props} />;
        } else {
          signinRedirect();
          return <span>loading</span>;
        }
      }}
    </AuthConsumer>
  );

  return <Route {...rest} render={renderFn(component)} />;
};
