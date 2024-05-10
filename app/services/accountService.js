import {get, put} from './apiRequestHelpers';

const ACCOUNTS_CONTROLLER_URL = "api/v1/auth/accounts/info";

export const accountService = {
  getUserInfo: async () => {
    const data = await get(`${ACCOUNTS_CONTROLLER_URL}`);
    return data;
  },
  updateUserInfo: async (info) => {
    const data = await put(`${ACCOUNTS_CONTROLLER_URL}`, info);
    return data;
  },
}