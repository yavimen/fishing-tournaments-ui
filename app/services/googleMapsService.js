import axios from "axios";
import { handleError } from "../shared/helpers";

const BASE_GOOGLE_MAP = "https://maps.googleapis.com/maps/api/geocode/json"; // Replace with your API base URL
const MY_API_KEY = "AIzaSyCYaKb5wlYrzyqbUSCttdb595uZ17B1k4w";
// helpers
export const getLocationData = async (latitude, longitude) => {
  console.log(`get with params:  la - ${latitude}, lo - ${longitude}`);
  const response = await handleError(async () => {
    return await axios.get(BASE_GOOGLE_MAP, { 
        params: {
            key: MY_API_KEY,
            latlng: `${latitude}, ${longitude}`,
            language: 'uk'
        } 
    });
  });
  return response?.data;
};
