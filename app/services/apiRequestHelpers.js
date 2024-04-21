import axios from "axios";
import { handleError } from "../shared/helpers";

const BASE_URL = "https://7361-176-39-31-157.ngrok-free.app"; // Replace with your API base URL

/*const apiService = axios.create({
  baseURL: BASE_URL,
});*/

// helpers
export const get = async (endpoint, queryParams = {}) => {
  console.log(`get with params: ${JSON.stringify(queryParams)}:`, BASE_URL+"/"+endpoint);
  const response = await handleError(async () => {
    return await axios.get(BASE_URL+"/"+endpoint, { params: queryParams });
  });
  return response?.data;
};

export const post = async (endpoint, data) => {
  console.log(`post with data: ${JSON.stringify(data)}:`, BASE_URL+"/"+endpoint);
  const response = await handleError(async () => {
    return await axios.post(BASE_URL+"/"+endpoint, data);
  });
  return response?.data;
};

export const put = async (endpoint, data) => {
  console.log(`put with data: ${JSON.stringify(data)}:`, BASE_URL+"/"+endpoint);
  const response = await handleError(async () => {
    return await axios.put(BASE_URL+"/"+endpoint, data);
  });
  return response?.data;
};

export const remove = async (endpoint) => {
  console.log(`delete:`, BASE_URL+"/"+endpoint);
  const response = await handleError(async () => {
    return await axios.delete(BASE_URL+"/"+endpoint);
  });
  return response?.data;
};
