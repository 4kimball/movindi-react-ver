import axios, { AxiosRequestConfig } from 'axios';

export const request = (
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  queryParams?: Object | null,
  body?: Object | null,
  headers?: Object,
  isMultipart: boolean = false,
  responseType?: any
) => {
  axios.defaults.withCredentials = true;

  const config: AxiosRequestConfig = {
    headers: {},
  };

  if (headers) {
    config.headers = {
      ...config.headers,
      ...headers,
    };
  }

  if (isMultipart) {
    config.headers = {
      ...config.headers,
      'content-type': 'multipart/form-data',
    };
  }

  if (queryParams) {
    config.params = {
      ...config.params,
      queryParams,
    };
  }

  switch (method) {
    case 'get':
      return axios.get(url, config);
    case 'post':
      return axios.post(url, body, config);
    case 'put':
      return axios.put(url, body, config);
    case 'delete':
      return axios.delete(url, config);
    default:
      return axios.get(url, config);
  }
};
