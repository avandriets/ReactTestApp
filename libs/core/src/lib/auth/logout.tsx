import { AuthConsumer } from './auth-provider';
import React from 'react';

export const Logout = () => (
  <AuthConsumer>
    {({ logout }) => {
      logout();
      return <span>loading</span>;
    }}
  </AuthConsumer>
);
