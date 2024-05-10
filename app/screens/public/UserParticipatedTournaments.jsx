import { ScrollView, View, RefreshControl, Text  } from "react-native";
import React, { useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { publicTournamentsService  } from "../../services";

import { TournamentListItem } from "../../shared/components";

import { useGlobalContext } from "../../context/GlobalContext";

export function UserParticipatedTournaments({ loading }) {
  const { participatedTournamens, setParticipatedTournamens } = useGlobalContext();
  const [refreshing, setRefreshing] = useState(loading);
  const navigation = useNavigation();

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await publicTournamentsService.getPublicTournaments({
        getUserParticipations: true,
      });
      setParticipatedTournamens(result);
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
        {participatedTournamens?.totalCount ? participatedTournamens.items.map((x) => (
          <TournamentListItem
            tournament={x}
            onPress={() => navigateToDetailsPage(x.id)}
            key={x.id}
            isPublic={true}
          /> 
        )) : <Text className='text-center text-base'>Зараз ви не приймаєте участь у жодному турнірі</Text>}
      </ScrollView>
    </View>
  );
}
