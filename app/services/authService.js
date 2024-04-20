import { handleError } from "../shared/helpers";

export const getTestData = async () => {
  return await get("api/v1/test");
};

export const getAuthTestData = async () => {
  return await get("api/v1/test/data");
};

const AUTH_CONTROLLER_URL = "api/v1/auth/";

export const addLogin = async (email, password) => {
  return await post(AUTH_CONTROLLER_URL + "login", { email, password });
};

export const addRegister = async (email, password, confirmPassword) => {
  return await post(AUTH_CONTROLLER_URL + "accounts", {
    email,
    password,
    confirmPassword,
  });
};

export const resetPassword = async (email) => {
  return await post(AUTH_CONTROLLER_URL + "reset-password/start", {
    email,
  });
};

// helpers
export const get = async (endpoint) => {
  const response = await handleError(async () => {
    return await apiService.get(endpoint);
  });
  return response?.data;
};

export const post = async (endpoint, data) => {
  const response = await handleError(async () => {
    return await apiService.post(endpoint, data);
  });
  return response?.data;
};

export const put = async (endpoint, data) => {
  const response = await apiService.put(endpoint, data);
  return response?.data;
};
