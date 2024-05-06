import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({});
    const [tournaments, setTournaments] = useState({ items: [], totalCount: 0 });
    const [historicalTournaments, setHistoricalTournaments] = useState({ items: [], totalCount: 0 });
    const [isTournamentsLoading, setIsTournamentsLoading] = useState(false);
    const [tournamentDetails, setTournamentDetails] = useState({});
    const [matches, setMatches] = useState({items: [], totalCount: 0});
    const [spots, setSpots] = useState({items: [], totalCount: 0});

    return (
        <GlobalContext.Provider value={{ 
            globalData, 
            setGlobalData,
            tournaments,
            setTournaments,
            historicalTournaments,
            setHistoricalTournaments,
            isTournamentsLoading,
            setIsTournamentsLoading,
            tournamentDetails,
            setTournamentDetails, 
            matches,
            setMatches,
            spots,
            setSpots }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within a GlobalProvider');
    }
    return context;
};