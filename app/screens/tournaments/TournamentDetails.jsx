import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { tournamentsService, matchesService } from "../../services";
import { useGlobalContext } from "../../context/GlobalContext";
import { SafeAreaView } from "react-native-safe-area-context";
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
    <SafeAreaView className="flex-1 pt-6">
      <View className="flex flex-row pl-3">
        <TouchableOpacity onPress={() => navigation.navigate("TournamentList")}>
          <Text>Турніри / </Text>
        </TouchableOpacity>
        <Text>{tournamentDetails?.name}</Text>
      </View>
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
          <View className="flex flex-row mt-3">
            {props.navigationState.routes.map((route, i) => (
              <TouchableOpacity
                className={`flex-1 justify-center items-center rounded-t-lg ${
                  index == i ? "bg-gray-500" : "bg-gray-400"
                }`}
                key={route.key}
                onPress={() => setIndex(i)}
              >
                <Text className="text-white text-lg">{route.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}
