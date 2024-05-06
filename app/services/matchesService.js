import {get, put, post, remove} from './apiRequestHelpers'

const MATCHES_CONTROLLER_URL = "api/v1/matches";

export const matchesService = {
  getMatches: async (queryParams = {}) => {
    const data = await get(`${MATCHES_CONTROLLER_URL}`, { sorting: 'startDateTime asc', ...queryParams});
    return data;
  },
  getMatchById: async (matchId) => {
    const data = await get(`${MATCHES_CONTROLLER_URL}/${matchId}`);
    return data;
  },
  createMatch: async (match) => {
    const data = await post(`${MATCHES_CONTROLLER_URL}`, match);
    return data;
  },
  updateMatch: async (id, match) => {
    console.log('updateMatch: ', match)
    const data = await put(`${MATCHES_CONTROLLER_URL}/${id}`, match);
    return data;
  },
  deleteMatch: async (matchId) => {
    const data = await remove(`${MATCHES_CONTROLLER_URL}/${matchId}`);
    return data;
  }
}