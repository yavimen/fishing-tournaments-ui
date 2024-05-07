import {get, post, remove} from './apiRequestHelpers'

const RESULTS_CONTROLLER_URL = "api/v1/results";

export const matchResultsService = {
  getMatchResults: async (matchId) => {
    const data = await get(`${RESULTS_CONTROLLER_URL}`, { sorting: 'createdAt desc', matchId});
    return data;
  },
  createMatchResult: async (result) => {
    const data = await post(`${RESULTS_CONTROLLER_URL}`, result);
    return data;
  },
  deleteMatchResult: async (resultId) => {
    const data = await remove(`${RESULTS_CONTROLLER_URL}/${resultId}`);
    return data;
  }
}