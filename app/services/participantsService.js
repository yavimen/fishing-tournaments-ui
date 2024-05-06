import {get, put, post, remove} from './apiRequestHelpers'

const PARTICIPANTS_CONTROLLER_URL = "api/v1/participants";

export const participantsService = {
  getMyTournamentParticipants: async (queryParams = {}) => {
    const data = await get(`${PARTICIPANTS_CONTROLLER_URL}`, { sorting: 'createdAt asc', ...queryParams});
    return data;
  },
}