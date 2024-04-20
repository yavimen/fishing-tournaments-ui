import db from '../context/DbContext';
import jwtService from '../services/jwtService';

const TournamentService = {
  // Create a new tournament
  createTournament: async (tournament) => {
    const userId = await jwtService.getUserId();

    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        let {
          applicationUserId,
          name,
          description,
          startConditions,
          startDate,
          endDate,
          maxParticipantNumber,
          createdAt,
          updatedAt
        } = tournament;

        applicationUserId = userId;
        createdAt = new Date().toString();

        tx.executeSql(
          'INSERT INTO Tournaments (ApplicationUserId, Name, Description, StartConditions, StartDate, EndDate, MaxParticipantNumber, CreatedAt, UpdatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [applicationUserId, name, description, startConditions, startDate, endDate, maxParticipantNumber, createdAt, updatedAt],
          (_, results) => resolve(results.insertId),
          (_, error) => reject(error)
        );
      });
    });
  },

  // Read all tournaments
  getAllTournaments: async () => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM Tournaments',
          [],
          (_, { rows }) => resolve(rows),
          (_, error) => reject(error)
        );
      });
    });
  },

  // Update a tournament
  updateTournament: async (id, tournament) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        const {
          applicationUserId,
          name,
          description,
          startConditions,
          startDate,
          endDate,
          maxParticipantNumber,
          updatedAt
        } = tournament;
        
        tx.executeSql(
          'UPDATE Tournaments SET applicationUserId=?, name=?, description=?, startConditions=?, startDate=?, endDate=?, maxParticipantNumber=?, updatedAt=? WHERE Id=?',
          [applicationUserId, name, description, startConditions, startDate, endDate, maxParticipantNumber, updatedAt, id],
          (_, results) => resolve(results.rowsAffected),
          (_, error) => reject(error)
        );
      });
    });
  },

  // Delete a tournament
  deleteTournament: async (id) => {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'DELETE FROM Tournaments WHERE Id=?',
          [id],
          (_, results) => resolve(results.rowsAffected),
          (_, error) => reject(error)
        );
      });
    });
  }
};

export default TournamentService;