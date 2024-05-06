import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { tournamentsService, matchesService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";
import TournamentDetailsCart from "./TournamentDetailsCart";
import { TabView, SceneMap } from "react-native-tab-view";
import { MatchesList } from "../matches";

export default function TournamentDetails({ route, navigation }) {
  const { tournamentDetails, setTournamentDetails, setMatches } = useGlobalContext();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Деталі" },
    { key: "second", title: "Матчі" },
  ]);

  useEffect(() => {
    tournamentsService
      .getMyTournamentById(route.params.id)
      .then((result) => setTournamentDetails(result));

    matchesService.getMatches({ tournamentId: route.params.id })
    .then((result) => setMatches(result))
  }, [route.params.id]);

  return (
    <View className="flex-1 bg-white">
    <View className="flex p-6 bg-sky-400"></View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => (
            <TournamentDetailsCart
              navigation={navigation}
              tournamentDetails={tournamentDetails}
            />
          ),
          second: () => (
            <MatchesList
              tournamentId={tournamentDetails.id}
              tournament={tournamentDetails}
              navigation={navigation}
            />
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
