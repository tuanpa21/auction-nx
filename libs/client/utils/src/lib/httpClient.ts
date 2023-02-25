import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getAPIEndpoint } from './env';
import {
  getRefreshToken,
  getToken,
  setExpiresIn,
  setRefreshToken,
  setToken,
} from './auth';
import addRefreshToken from './interceptor';

export async function httpClient<T, K>(requestConfig: AxiosRequestConfig<T>) {
  try {
    const explorer = axios.create({
      baseURL: getAPIEndpoint(),
      headers: {
        'Content-Type': 'application/json',
      },
      // withCredentials: true,
    });
    // add token to request
    explorer.interceptors.request.use(
      async (config) => {
        const token = getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // refresh token
    addRefreshToken(explorer);

    if (
      requestConfig.url === 'auth/sign-in' ||
      requestConfig.url === 'auth/sign-up'
    ) {
      const response = await explorer.request(requestConfig);

      if (response.status === 201) {
        return response.data as K;
      } else {
        throw new Error(response.statusText);
      }
    }

    // add token to request
    requestConfig.headers = {
      Authorization: `Bearer ${getToken()}`,
    };

    const response = await explorer.request(requestConfig);

    if (response.status === 200 || response.status === 201) {
      return response.data as K;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      if (error.response) {
        throw new Error(error.response.data.error.message);
      } else {
        throw new Error(error.message);
      }
    }

    if (error instanceof Error) throw new Error(error.message);
  }
}

const refresh = async (explorer: AxiosInstance) => {
  const response = await explorer.post(
    'auth/refresh-token',
    {},
    {
      headers: {
        Authorization: `${getRefreshToken()}`,
      },
    }
  );
  if (response.status === 201) {
    setToken(response.data.accessToken);
    setRefreshToken(response.data.refreshToken);
    setExpiresIn(response.data.expiresIn);

    return true;
  }
  return false;
};

export function addSeconds(date: Date, seconds: number) {
  const dateCopy = new Date(date.getTime());

  dateCopy.setSeconds(dateCopy.getSeconds() + seconds);

  return dateCopy;
}
