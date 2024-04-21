import {get, put, post, remove} from './apiRequestHelpers'

const TOURNAMENTS_CONTROLLER_URL = "api/v1/tournaments";

export const tournamentsService = {
  getMyTournaments: async () => {
    const data = await get(`${TOURNAMENTS_CONTROLLER_URL}`);
    return data;
  },
  getMyTournamentById: async (tounamentId) => {
    const data = await get(`${TOURNAMENTS_CONTROLLER_URL}/${tounamentId}`);
    return data;
  },
  createTournament: async (tournament) => {
    const data = await post(`${TOURNAMENTS_CONTROLLER_URL}`, tournament);
    return data;
  },
  updateTournament: async (id, tournament) => {
    const data = await put(`${TOURNAMENTS_CONTROLLER_URL}/${id}`, tournament);
    return data;
  },
  deleteTournament: async (tounamentId) => {
    const data = await remove(`${TOURNAMENTS_CONTROLLER_URL}/${tounamentId}`);
    return data;
  }
}