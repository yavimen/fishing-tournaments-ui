import { ScrollView, View, RefreshControl, Text  } from "react-native";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { publicTournamentsService  } from "../../services";

import { TournamentListItem } from "../../shared/components";

import { useGlobalContext } from "../../context/GlobalContext";

export function PublicActualTournamentsCard({ loading }) {
  const { publicTournaments, setPublicTournaments } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(loading);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await publicTournamentsService.getPublicTournaments();
    setPublicTournaments(result);
    setRefreshing(false);
  };

  const navigateToDetailsPage = (id) => {
    navigation.navigate("PublicTournamentDetails", { id });
  };

  return (
    <View className="flex-1">
      <ScrollView
        className="p-3"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {publicTournaments?.totalCount ? publicTournaments.items.map((x) => (
          <TournamentListItem
            tournament={x}
            onPress={() => navigateToDetailsPage(x.id)}
            key={x.id}
            isPublic={true}
          /> 
        )) : <Text className='text-center text-base'>Зараз немає опублікованих турнірів</Text>}
      </ScrollView>
    </View>
  );
}
