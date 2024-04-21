import { View, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { FloatingAddButton, MatchListItem } from "../../shared/components";

import { matchesService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";

export function MatchesList({ tournamentId }) {
  const [refreshing, setRefreshing] = useState(false);
  const { matches, setMatches } = useGlobalContext();

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await matchesService.getMatches({ tournamentId });
    console.log(result);
    setMatches(result);
    setRefreshing(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!matches.items.length) {
        const result = await matchesService.getMatches({ tournamentId });
        setMatches(result);
      }
    };
    fetchData()
  }, [tournamentId, setMatches]);

  return (
    <View className="flex bg-gray-500 mx-3 p-3 rounded-b-lg h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {matches.items.map((x) => (
          <MatchListItem match={x} key={x.id} />
        ))}
      </ScrollView>
      <FloatingAddButton />
    </View>
  );
}
