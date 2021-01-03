import React, { Component, Context } from 'react';
import { AuthService } from './auth-service';
import axios from 'axios';

export const AuthContext: Context<AuthService> = React.createContext<AuthService>({ } as any);

export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {

  public authService: AuthService;

  constructor(props) {
    super(props);
    this.authService = new AuthService();

    axios.interceptors.request.use(async config => {

      if (!config.url.includes('/auth/')) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${this.authService.user.access_token}`,
        };
      }

      return config;
    });

  }

  render() {
    return <AuthContext.Provider value={this.authService}>{this.props.children}</AuthContext.Provider>;
  }

}
