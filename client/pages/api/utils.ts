import axios, { AxiosResponse, AxiosError } from 'axios';
import { settings } from '../../src/utils/settings';
import { RequestConfig, RequestOptions, Response } from '@/src/types';

const API_BASE_URL = settings.baseUrl;

export const makeRequest = async <T>(
  url: string,
  method = 'GET',
  options?: RequestOptions,
  config?: any
): Promise<Response> => {
  const { params, data } = options ?? {};

  return axios({
    method,
    url: `${API_BASE_URL}${url}`,
    params,
    data,
    ...config,
  })
    .then((response: AxiosResponse<T>) => {
      return { data: response.data, ok: true };
    })
    .catch((error: any | AxiosError) => {
      if (error.response) {
        return { ok: false, data: error.response.data };
      } else if (error.request) {
        return {
          ok: false,
          data: 'No response was received from the server',
        };
      } else {
        return { ok: false, data: error.message };
      }
    });
};
