import React, { createContext, useContext, useState } from 'react';

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [globalData, setGlobalData] = useState({});
    const [tournaments, setTournaments] = useState({ items: [], totalCount: 0 });
    const [isTournamentsLoading, setIsTournamentsLoading] = useState(false);
    const [tournamentDetails, setTournamentDetails] = useState({});

    return (
        <GlobalContext.Provider value={{ 
            globalData, 
            setGlobalData,
            tournaments,
            setTournaments,
            isTournamentsLoading,
            setIsTournamentsLoading,
            tournamentDetails,
            setTournamentDetails,  }}
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