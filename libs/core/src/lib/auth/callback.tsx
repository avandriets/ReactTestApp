import { AuthConsumer } from './auth-provider';
import React from 'react';

export const Callback = () => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {
      signinRedirectCallback();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
