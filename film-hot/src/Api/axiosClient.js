import axios from "axios";

const instance = axios.create({
  baseURL: `https://api.themoviedb.org/3/`,
  headers: { "Content-Type": "application/json" },
});

// Interceptors
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const { config, response } = error;
    const URLS = ["/auth/local/register", "/auth/local"];
    if (response.status === 400 && URLS.includes(config.url)) {
      const errorList = response.data.data || [];
      const fistError = errorList.length > 0 ? errorList[0] : {};
      const messageList = fistError.messages || [];
      const firstMessage = messageList.length > 0 ? messageList[0] : {};
      throw new Error(firstMessage.message);
    }
    return Promise.reject(error);
  }
);

export default instance;
