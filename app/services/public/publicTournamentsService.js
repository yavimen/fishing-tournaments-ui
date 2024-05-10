import {get} from '../apiRequestHelpers'

const PUBLIC_TOURNAMENTS_CONTROLLER_URL = "api/v1/public/tournaments";

export const publicTournamentsService = {
  getPublicTournaments: async (queryParams = {}) => {
    const data = await get(`${PUBLIC_TOURNAMENTS_CONTROLLER_URL}`, { sorting: 'startDate asc', ...queryParams});
    return data;
  },
  getPublicTournamentById: async (tounamentId) => {
    const data = await get(`${PUBLIC_TOURNAMENTS_CONTROLLER_URL}/${tounamentId}`);
    return data;
  },
}