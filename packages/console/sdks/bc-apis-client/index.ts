import { GraphQLClient } from 'graphql-request';
import { Response } from 'graphql-request/dist/types';
import { RequestInit } from 'graphql-request/dist/types.dom';

import { errorsHandler } from './errors';
import { getSdkWithHooks } from './sdk';

export * from './errors';

const isProd = process.env.NODE_ENV === 'production';
const AUTH_DATA = 'authData';
const getAuthData = () => {
  try {
    const authData = JSON.parse(window.localStorage.getItem(AUTH_DATA) || '{}');
    return authData;
  } catch (error) {
    console.warn('getAuthData failed', error);
    return {};
  }
};

function requestMiddleware(request: RequestInit) {
  const authData = getAuthData();
  const { token_type, id_token } = authData.token || {};
  const Authorization = token_type && id_token && `${token_type} ${id_token}`;
  return {
    ...request,
    headers: Authorization ? { ...request.headers, Authorization } : { ...request.headers },
  };
}

function responseMiddleware(response: Response<unknown> | Error) {
  const errors: Error[] = response.errors || response.response?.errors;
  if (errors) {
    errorsHandler(errors);
  }
}

const devEndpoint = '/bc-apis/bff';
const prodEndpoint = (window as any).__INITIAL_CONFIG__?.bffServerGraphQLUrl || '/bc-apis/bff';
const endpoint = isProd ? prodEndpoint : devEndpoint;

export const client = new GraphQLClient(endpoint, {
  requestMiddleware,
  responseMiddleware,
});
export const sdk = getSdkWithHooks(client);
