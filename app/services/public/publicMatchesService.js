import {get} from '../apiRequestHelpers'

const PUBLIC_MATCHES_CONTROLLER_URL = "api/v1/public/matches";

export const publicMatchesService = {
  getPublicMatches: async (queryParams = {}) => {
    const data = await get(`${PUBLIC_MATCHES_CONTROLLER_URL}`, { sorting: 'startDateTime asc', ...queryParams});
    return data;
  },
}