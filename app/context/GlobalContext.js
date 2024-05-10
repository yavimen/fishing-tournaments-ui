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
    const [myTournamentParticipants, setMyTournamentParticipants] = useState({items: [], totalCount: 0});
    const [matchPlayers, setMatchPlayers] = useState([]);
    const [matchResults, setMatchResults] = useState({items: [], totalCount: 0});
    const [publicTournaments, setPublicTournaments] = useState({ items: [], totalCount: 0 });
    const [publicTournamentDetails, setPublicTournamentDetails] = useState({});
    const [participatedTournamens, setParticipatedTournamens] = useState({ items: [], totalCount: 0 });
    const [userInfo, setUserInfo] = useState(null);
    const [publicMatches, setPublicMatches] = useState({ items: [], totalCount: 0 });

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
            setSpots,
            myTournamentParticipants,
            setMyTournamentParticipants,
            matchPlayers,
            setMatchPlayers,
            matchResults,
            setMatchResults,
            publicTournaments,
            setPublicTournaments,
            publicTournamentDetails,
            setPublicTournamentDetails,
            participatedTournamens,
            setParticipatedTournamens,
            userInfo,
            setUserInfo,
            publicMatches,
            setPublicMatches,
         }}
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