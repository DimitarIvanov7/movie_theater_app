import { AxiosRequestConfig, AxiosResponse } from "axios";

export enum AuthType {
  SignUp = "signup",
  SignIn = "signin",
  Refresh = "refresh",
}

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface SingInData {
  name: string;
  password: string;
}

export interface SingUpData {
  name: string;
  password: string;
  email: string;
}

export interface RequestOptions {
  params?: any;
  data?: any;
}

export interface RequestConfig {
  method?: HttpMethod;
  url: string;
  options?: RequestOptions;
  config?: AxiosRequestConfig;
  data?: any;
  authorizationToken?: string;
}

export interface ActionRequestConfing extends RequestConfig {
  onSuccess: string;
  onStart: string;
  onError: string;
}

export interface Response {
  ok: boolean;
  data: any;
}

export interface HttpError {
  ok: boolean;
  data: string;
}

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface SingInResponse extends Response {
  data: AxiosResponse<Tokens>;
}

export interface AccessTokenData {
  name: string;
}
