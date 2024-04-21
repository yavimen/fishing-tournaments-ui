import {get, put, post} from './apiRequestHelpers'

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