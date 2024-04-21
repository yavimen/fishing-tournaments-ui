import axios from "axios";
import { handleError } from "../shared/helpers";

const BASE_URL = "https://7361-176-39-31-157.ngrok-free.app"; // Replace with your API base URL

/*const apiService = axios.create({
  baseURL: BASE_URL,
});*/

// helpers
export const get = async (endpoint) => {
  console.log(BASE_URL+"/"+endpoint);
  const response = await handleError(async () => {
    return await axios.get(BASE_URL+"/"+endpoint);
  });
  return response?.data;
};

export const post = async (endpoint, data) => {
  const response = await handleError(async () => {
    return await axios.post(BASE_URL+"/"+endpoint, data);
  });
  return response?.data;
};

export const put = async (endpoint, data) => {
  const response = await handleError(async () => {
    return await axios.put(BASE_URL+"/"+endpoint, data);
  });
  return response?.data;
};

export const remove = async (endpoint) => {
  const response = await handleError(async () => {
    return await axios.delete(BASE_URL+"/"+endpoint);
  });
  return response?.data;
};
