import { AuthConsumer } from './auth-provider';
import { Loader } from '../Loader/Loader';
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
          return <Loader/>;
        }
      }}
    </AuthConsumer>
  );

  return <Route {...rest} render={renderFn(component)} />;
};
