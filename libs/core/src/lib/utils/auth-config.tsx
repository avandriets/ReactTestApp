export const IDENTITY_CONFIG = {
  authority: process.env.NX_APP_AUTH_URL,
  client_id: process.env.NX_APP_IDENTITY_CLIENT_ID,
  redirect_uri: process.env.NX_APP_IDENTITY_AUTH_HTML,
  silent_redirect_uri: process.env.NX_APP_IDENTITY_SILENT_RENEW_HTML,
  post_logout_redirect_uri: process.env.NX_APP_IDENTITY_LOGOUT_REDIRECT_URI,

  response_type: 'id_token token',
  scope: 'openid profile email',
  automaticSilentRenew: true,
  monitorSession: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};
