import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";

import { tournamentsService } from "../../services";

import { TabView, SceneMap } from "react-native-tab-view";

import { useGlobalContext } from "../../context/GlobalContext";
import { TournamentListCard } from "./TournamentListCard";
import { TournamentListHistoricalCard } from "./TournamentListHistoricalCard";

export default function TournamentList() {

  const { setHistoricalTournaments, setTournaments } = useGlobalContext();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRefreshing(true);

    const loadData = async () => {
      const actualTournaments = await tournamentsService.getMyTournaments({actual: true});
      setTournaments(actualTournaments);

      const historicalTournaments = await tournamentsService.getMyTournaments({actual: false});
      setHistoricalTournaments(historicalTournaments);

      setRefreshing(false);
    }

    loadData();
  }, []);

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Актуальні" },
    { key: "second", title: "Минулі" },
  ]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => (
            <TournamentListCard loading={refreshing} />
          ),
          second: () => (
            <TournamentListHistoricalCard loading={refreshing} />
          ),
        })}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <View className="flex flex-row bg-sky-400">
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                className={`flex-1 justify-center items-center rounded-t-3xl ${
                  index == i ? "bg-white" : "bg-gray-300"
                }`}
                key={route.key}
                onPress={() => setIndex(i)}
              >
                <Text className="text-lg">{route.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />

    </View>
  );
}
/*


      <View className="bg-white bg-sky-400">
        <View className="flex justify-center items-center rounded-t-3xl bg-white">
          <Text className="text-lg">Редагувати місце</Text>
        </View>
      </View>
      <ScrollView
        className="p-3"
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
*/
