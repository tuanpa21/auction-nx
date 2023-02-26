import { AxiosInstance } from 'axios';
import { ROUTES } from './routes';

export default function addRefreshToken(axiosInstance: AxiosInstance) {
  let isRefreshing = false;
  let refreshSubscribers: any[] = [];

  // Add a response interceptor to handle 401 errors
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // If the error is not a 401 error, reject the promise with the error
      const isErrorFromRefreshToken =
        error.config?.url.includes('refresh-token');
      if (error.response.status !== 401 || isErrorFromRefreshToken) {
        return Promise.reject(error);
      }

      // If the refresh token API is already being called, add the original request to the refreshSubscribers array
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          refreshSubscribers.push(() => {
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      // Otherwise, set isRefreshing to true and call the refresh token API
      isRefreshing = true;

      try {
        await axiosInstance.post('/auth/refresh-token');

        // Call all the requests that were waiting for the access token to be refreshed
        refreshSubscribers.forEach((callback) => callback());
        refreshSubscribers = [];
        isRefreshing = false;

        // Re-attempt the original request with the new access token
        return axiosInstance(originalRequest);
      } catch (error) {
        // If the refresh token API fails, log the user out and redirect to login page

        window.location.href = ROUTES.login;
      }
    }
  );
}
