import { View, ScrollView, RefreshControl, Text } from "react-native";
import React, { useState } from "react";
import { MatchListItem } from "../../shared/components";

import { publicMatchesService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";

export function PublicMatcheList({ tournamentId, navigation, tournament }) {
  const [refreshing, setRefreshing] = useState(false);
  const { publicMatches, setPublicMatches } = useGlobalContext(null);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await publicMatchesService.getPublicMatches({ tournamentId });
    setPublicMatches(result);
    setRefreshing(false);
  };

  return (
    <View className="flex bg-white p-3 h-full">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {publicMatches.totalCount ? publicMatches.items.map((x) => (
          <MatchListItem match={x} key={x.id} onPress={() => navigation.navigate('PublicMatchDetail', { matchId: x.id, })} />
        )) : <Text className="text-base text-center">{"Ваш турнір ще немає матчів"}</Text>}
      </ScrollView>
    </View>
  );
}
