export interface IServerConfig {
  api_token_ls_name: string;
  app_locale_ls_name: string;
  origin: string;
  api_endpoint: string;
  auth_token_email: string;
  auth_token_avatar: string;
  auth_domain: string;
  auth_client_id: string;
  auth_audience: string;
  auth_scope: string;
  auth_dev_token_endpoint: string;
  schedule_subscription_in_ms: string;
  env: string;
}

export interface IConfig {
  API_TOKEN_LS_NAME: string;
  APP_LOCALE_LS_NAME: string;
  ORIGIN: string;
  API_ENDPOINT: string;
  AUTH_TOKEN_EMAIL: string;
  AUTH_TOKEN_AVATAR: string;
  AUTH_DOMAIN: string;
  AUTH_CLIENT_ID: string;
  AUTH_AUDIENCE: string;
  AUTH_SCOPE: string;
  AUTH_DEV_TOKEN_ENDPOINT: string;
  SCHEDULE_SUBSCRIPTION_IN_MS: string;
}
