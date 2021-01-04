import { AuthConsumer } from './auth-provider';
import { Loader } from '../Loader/Loader';
import React from 'react';

export const LogoutCallback = () => (
  <AuthConsumer>
    {({ signoutRedirectCallback }) => {
      signoutRedirectCallback();

      return <Loader/>;
    }}
  </AuthConsumer>
);
