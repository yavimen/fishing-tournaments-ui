import { ScrollView, View, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";

import { useNavigation } from "@react-navigation/native";
import { tournamentsService } from "../../services";

import { TournamentListItem, FloatingAddButton } from "../../shared/components";

import { useGlobalContext } from "../../context/GlobalContext";

export default function TournamentList() {
  const navigation = useNavigation();

  const { tournaments, setTournaments } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const result = await tournamentsService.getMyTournaments();
    setTournaments(result);
    setRefreshing(false);
  };

  useEffect(() => {
    setRefreshing(true);
    tournamentsService.getMyTournaments().then((result) => {
      setTournaments(result);
      setRefreshing(false);
    });
  }, []);

  const navigateToDetailsPage = (id) => {
    navigation.navigate("TournamentDetails", { id });
  };
  return (
    <View className="flex-1 pt-6 p-5">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {tournaments.items.map((x) => (
          <TournamentListItem
            tournament={x}
            onPress={() => navigateToDetailsPage(x.id)}
            key={x.id}
          />
        ))}
      </ScrollView>
      <FloatingAddButton
        onPress={() => navigation.navigate("CreateTournament")}
      />
    </View>
  );
}
