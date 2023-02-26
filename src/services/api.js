import axios from "axios";
// import TokenService from "./token.service";
import { HOST_API } from 'src/config';
import TokenService from "./tokenService";

const instance = axios.create({
    baseURL: HOST_API,
    headers: {
        "Content-Type": "application/json",
      },
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log('originalConfig====', err.config);
    console.log('err====', err.response);
    if (originalConfig.url !== "/auth/signIn" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const rs = await instance.post("/auth/refreshToken", {
            refreshToken: TokenService.getLocalRefreshToken(),
          });
          console.log('rsssssssss====', rs);

          const { accessToken } = rs.data;
          TokenService.updateLocalAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          console.log('_error====', _error);
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;