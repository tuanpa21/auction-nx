import { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import { getAPIEndpoint } from './env';

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' '); // TODO: classnames
}

// set token to local storage
export function setToken(token: string) {
  localStorage.setItem('token', token);
}

// get token from local storage
export function getToken() {
  return localStorage.getItem('token');
}

// set refresh token to local storage
export function setRefreshToken(refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
}

// get refresh token from local storage
export function getRefreshToken() {
  return localStorage.getItem('refreshToken');
}

// set expires in to local storage
export function setExpiresIn(expiresIn: string) {
  localStorage.setItem('expiresIn', expiresIn);
}

// get expires in from local storage
export function getExpiresIn() {
  return localStorage.getItem('expiresIn');
}

export function setUser(user: any) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUser() {
  const user = localStorage.getItem('user');
  if (user) return JSON.parse(user);
  return null;
}

export function removeToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('expiresIn');
}

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
    explorer.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const value = await refresh(explorer);
          if (value) {
            return explorer(originalRequest);
          }
        }
        return Promise.reject(error);
      }
    );

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
