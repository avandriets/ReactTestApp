import { AuthConsumer } from './auth-provider';
import React from 'react';

export const LogoutCallback = () => (
  <AuthConsumer>
    {({ signoutRedirectCallback }) => {
      signoutRedirectCallback();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
