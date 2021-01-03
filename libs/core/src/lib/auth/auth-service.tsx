import { Log, SigninRequest, User, UserManager } from 'oidc-client';
import { IDENTITY_CONFIG } from '../utils';
import jwt from 'jwt-decode';

export class AuthService {

  public userManager: UserManager;
  public user: User;

  public constructor() {

    this.userManager = new UserManager({
      ...IDENTITY_CONFIG,
    });

    this.userManager.getUser()
      .then((user) => this.setUser(user))
      .catch(err => console.log('Cannot load user'));

    // Logger
    Log.logger = console;
    Log.level = Log.DEBUG;

    this.userManager.events.addUserLoaded((user) => {
      console.log('User loaded');
      if (window.location.href.indexOf("signin-oidc") !== -1) {
        this.navigateToScreen();
      }
    });

    this.userManager.events.addSilentRenewError(e => {
      console.log('Silent renew error', e.message);
    });

    this.userManager.events.addAccessTokenExpired(_ => {
      console.log('Token expired');
      this.signinSilent();
    });

    this.getUser = this.getUser.bind(this);
    this.signinRedirectCallback = this.signinRedirectCallback.bind(this);
    this.setUser = this.setUser.bind(this);
    this.signinRedirect = this.signinRedirect.bind(this);
    this.navigateToScreen = this.navigateToScreen.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.signinSilent = this.signinSilent.bind(this);
    this.signinSilentCallback = this.signinSilentCallback.bind(this);
    this.createSigninRequest = this.createSigninRequest.bind(this);
    this.logout = this.logout.bind(this);
    this.signoutRedirectCallback = this.signoutRedirectCallback.bind(this);

  }

  public setUser(user: User | null): void {
    this.user = user;
    this.user.profile = jwt(user.access_token);
  }

  public signinRedirectCallback(): void {
    this.userManager.signinRedirectCallback().then(() => {
      console.log('signinRedirectCallback done');
    }).catch((err) => {
      console.log(err);
    });
  }

  public async getUser(): Promise<User> {
    const user = await this.userManager.getUser();
    if (!user) {
      return await this.userManager.signinRedirectCallback();
    }
    return user;
  }

  public signinRedirect(): void {

    localStorage.setItem('redirectUri', window.location.pathname);

    this.userManager.signinRedirect({}).then(() => {
      console.log('signinRedirect done');
    }).catch(function (err) {
      console.log(err);
    });

  }

  public navigateToScreen(): void {
    window.location.replace('/');
  }

  // isAuthenticated = () => {
  //   const oidcStorage = JSON.parse(sessionStorage.getItem(`oidc.user:${process.env.REACT_APP_AUTH_URL}:${process.env.REACT_APP_IDENTITY_CLIENT_ID}`))
  //
  //   return (!!oidcStorage && !!oidcStorage.access_token)
  // };

  public isAuthenticated(): boolean {
    return !!this.user;
  }

  public signinSilent(): void {
    this.userManager.signinSilent()
      .then(user => console.log('signed in', user))
      .catch(err => console.log(err));
  }

  public signinSilentCallback(): void {
    this.userManager.signinSilentCallback();
  }

  public createSigninRequest(): Promise<SigninRequest> {
    return this.userManager.createSigninRequest();
  }

  public logout(): void {
    this.userManager.signoutRedirect()
      .then(resp => console.log('signed out', resp))
      .catch(err => console.log(err));

    this.userManager.clearStaleState()
      .then(resp => console.log('signed out, clear state', resp))
      .catch(err => console.log(err));
  }

  public signoutRedirectCallback(): void {
    this.userManager.signoutRedirectCallback().then(() => {
      localStorage.clear();
      window.location.replace(process.env.REACT_APP_PUBLIC_URL);
    });
    this.userManager.clearStaleState();
  }

}
