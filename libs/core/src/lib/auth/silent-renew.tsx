import { AuthConsumer } from './auth-provider';
import React from 'react';

export const SilentRenew = () => (
  <AuthConsumer>
    {({ signinSilentCallback }) => {
      signinSilentCallback();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
