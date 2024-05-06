import { View, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SpotListItem } from '../../shared/components';
import { useGlobalContext } from "../../context/GlobalContext";
import { spotsService } from "../../services";

export function MatchSpots({ navigation, match, tournament }) {
  const [refreshing, setRefreshing] = useState(false);
  const { spots, setSpots } = useGlobalContext();
  const onRefresh = async () => {
    setRefreshing(true);
    const result = await spotsService.getSpots({ matchId: match.id });
    console.log(result);
    setSpots(result);
    setRefreshing(false);
  };
  return (
    <View className="flex-1 bg-white px-3">
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {spots.items.map((x) => (
        <SpotListItem spot={x} key={x.id} navigation={navigation} match={match} tournament={tournament} />
      ))}
    </ScrollView>
    </View>
  )
}