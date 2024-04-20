import { openDatabase } from 'expo-sqlite';

const db = openDatabase('fishing.db')

const initializeDb = () => {
  db.transaction(tx => {
    // Create tables if they don't exist
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Tournaments (
        Id INTEGER PRIMARY KEY,
        ApplicationUserId TEXT, -- Using TEXT instead of UNIQUEIDENTIFIER
        Name TEXT NOT NULL,
        Description TEXT,
        StartConditions TEXT,
        StartDate TEXT, -- Using TEXT instead of DATETIME
        EndDate TEXT, -- Using TEXT instead of DATETIME
        MaxParticipantNumber INTEGER NOT NULL,
        CreatedAt TEXT NOT NULL, -- Using TEXT instead of DATETIME
        UpdatedAt TEXT -- Using TEXT instead of DATETIME
      )`,
      [],
      () => {
        console.log('Table Tournaments created successfully');
      },
      error => {
        console.log('Error creating table Tournaments: ', error);
      }
    );
  });
}

initializeDb();

export default db;