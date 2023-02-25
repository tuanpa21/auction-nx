import { AxiosInstance } from 'axios';

export default function addRefreshToken(axiosInstance: AxiosInstance) {
  let isRefreshing = false;
  // let refreshSubscribers: any[] = [];

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
          // refreshSubscribers.push((token: string) => {
          //   originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          // });
        });
      }

      // Otherwise, set isRefreshing to true and call the refresh token API
      isRefreshing = true;
  
      try {
        await axiosInstance.post('/auth/refresh-token',{}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
          },
        });
        // const newAccessToken = response.data.token;
        // localStorage.setItem('token', newAccessToken);

        // Call all the requests that were waiting for the access token to be refreshed
        // refreshSubscribers.forEach((callback) => callback(newAccessToken));
        // refreshSubscribers = [];
        isRefreshing = false;

        // Re-attempt the original request with the new access token
        //originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // TODO: No need either
        return axiosInstance(originalRequest);
      } catch (error) {
        // If the refresh token API fails, log the user out and redirect to login page
        // localStorage.removeItem('token');
        // localStorage.removeItem('refreshToken');

        window.location.href = '/login';
      }
    }
  );
}
