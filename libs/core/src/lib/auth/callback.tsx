import { AuthConsumer } from './auth-provider';
import { Loader } from '../Loader/Loader';
import React from 'react';

export const Callback = () => (
  <AuthConsumer>
    {({ signinRedirectCallback }) => {

      signinRedirectCallback();

      return <Loader/>;
    }}
  </AuthConsumer>
);
