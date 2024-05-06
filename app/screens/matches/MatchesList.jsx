import { View, ScrollView, RefreshControl } from "react-native";
import React, { useState, useEffect } from "react";
import { FloatingAddButton, MatchListItem } from "../../shared/components";

import { matchesService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";

export function MatchesList({ tournamentId, navigation, tournament }) {
  const [refreshing, setRefreshing] = useState(false);
  const { matches, setMatches } = useGlobalContext(null);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await matchesService.getMatches({ tournamentId });
    console.log(result);
    setMatches(result);
    setRefreshing(false);
  };

  return (
    <View className="flex bg-white p-3 h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {matches.items.map((x) => (
          <MatchListItem match={x} key={x.id} onPress={() => navigation.navigate('MatchDetails', { match: x, tournament })} />
        ))}
      </ScrollView>
      <FloatingAddButton onPress={() => navigation.navigate("MatchCreate", { tournament })}/>
    </View>
  );
}
