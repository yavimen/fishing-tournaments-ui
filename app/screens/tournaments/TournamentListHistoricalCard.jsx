import { ScrollView, View, RefreshControl, Text } from "react-native";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { tournamentsService } from "../../services";

import { TournamentListItem } from "../../shared/components";

import { useGlobalContext } from "../../context/GlobalContext";

export function TournamentListHistoricalCard({loading}) {
    const { historicalTournaments, setHistoricalTournaments } = useGlobalContext();
    const [refreshing, setRefreshing] = useState(loading);
    const navigation = useNavigation();
  
    const onRefresh = async () => {
      setRefreshing(true);
      const result = await tournamentsService.getMyTournaments({actual: false});
      setHistoricalTournaments(result);
      setRefreshing(false);
    };
  
    const navigateToDetailsPage = (id) => {
      navigation.navigate("TournamentDetails", { id });
    };
  
    return (
      <View className="flex-1">
        <ScrollView
          className="p-3"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          { historicalTournaments?.totalCount ?  historicalTournaments.items.map((x) => (
            <TournamentListItem
              tournament={x}
              onPress={() => navigateToDetailsPage(x.id)}
              key={x.id}
            />
          ))  : <Text className='text-center text-base'>У вас ще немає минулих турнірів</Text>}
        </ScrollView>
      </View>
  )
}