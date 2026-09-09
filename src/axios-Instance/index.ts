import axios from "axios";
import { baseURL } from "./constants";
import { getUserItem } from "../storage";


let isHandlingExpiredToken = false;
const isHandlingSubscriptionIssue = false;
let logoutCallback: (() => void) | null = null;
let subscriptionCallback: (() => void) | null = null;

export const setTokenExpirationHandler = (callback: () => void) => {
  logoutCallback = callback;
};

export const setSubscriptionExpiredHandler = (callback: () => void) => {
  subscriptionCallback = callback;
};

const config = {
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
};

export const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getUserItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (config.url?.includes('product-images/exists')) {
        // console.log("Token added to request:", token ? `${token.substring(0, 20)}...` : "No token");
        // console.log("Request headers:", config.headers);
      }
    } else {
      console.warn("No token found for request:", config.url);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const errorMessage = error.response?.data?.message || error.response?.data?.error || '';
    const errorString = typeof errorMessage === 'string' ? errorMessage.toLowerCase() : '';

    const isTokenError = errorString.includes('token') && (
      errorString.includes('expired') ||
      errorString.includes('invalid') ||
      // errorString.includes('unauthorized') ||
      errorString.includes('not found') ||
      errorString.includes('malformed')
    );

    if (error.response?.status === 401 || isTokenError) {
      const token = await getUserItem("token");

      if (token && !isHandlingExpiredToken) {
        isHandlingExpiredToken = true;
        console.error("Token expired or invalid. Triggering session expiry flow...");

        if (logoutCallback) {
          logoutCallback();
        }

      }
    }

    if (error.response?.status === 403 && !isHandlingSubscriptionIssue && !isTokenError) {
      const errorMessage = error.response?.data?.message || error.response?.data?.error;
      const msgStr = typeof errorMessage === 'string' ? errorMessage.toLowerCase() : '';

      if (errorMessage && (
        msgStr.includes('subscription') ||
        msgStr.includes('trial') ||
        msgStr.includes('plan') ||
        (msgStr.includes('access') && !msgStr.includes('token'))
      )) {
        //   // Alert already shown this session, silently reject
        //   console.log("Subscription alert already shown this session");
      } else {
        // Other 403 errors - log but don't spam
        console.error("Access denied (403):", errorMessage || "You don't have permission to access this resource");
      }
    }

    return Promise.reject(error);
  }
);
