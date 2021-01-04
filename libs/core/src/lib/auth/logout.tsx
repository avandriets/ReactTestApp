import { AuthConsumer } from './auth-provider';
import { Loader } from '../Loader/Loader';
import React from 'react';

export const Logout = () => (
  <AuthConsumer>
    {({ logout }) => {
      logout();

      return <Loader/>;
    }}
  </AuthConsumer>
);
