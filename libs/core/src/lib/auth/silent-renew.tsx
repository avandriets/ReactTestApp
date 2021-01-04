import { AuthConsumer } from './auth-provider';
import { Loader } from '../Loader/Loader';
import React from 'react';

export const SilentRenew = () => (
  <AuthConsumer>
    {({ signinSilentCallback }) => {
      signinSilentCallback();

      return <Loader/>;
    }}
  </AuthConsumer>
);
