import {get, put, remove} from './apiRequestHelpers'

const SPOTS_CONTROLLER_URL = "api/v1/spots";

export const spotsService = {
  getSpots: async (queryParams = {}) => {
    const data = await get(`${SPOTS_CONTROLLER_URL}`, queryParams);
    return data;
  },
  getSpotById: async (spotId) => {
    const data = await get(`${SPOTS_CONTROLLER_URL}/${spotId}`);
    return data;
  },
  updateSpot: async (id, spot) => {
    console.log('updateSpot: ', spot)
    const data = await put(`${SPOTS_CONTROLLER_URL}/${id}`, spot);
    return data;
  },
  deleteSpot: async (spotId) => {
    const data = await remove(`${SPOTS_CONTROLLER_URL}/${spotId}`);
    return data;
  }
}