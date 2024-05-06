import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { spotsService } from "../../services";
import { MatchDetailsCard } from "./MatchDetailsCard";
import { TabView, SceneMap } from "react-native-tab-view";
import { MatchSpots } from "./MatchSpots";
import { useGlobalContext } from "../../context/GlobalContext";

export function MatchDetails({ route, navigation }) {
  const match = route.params.match;
  const tournament = route.params.tournament;
  const { setSpots } = useGlobalContext();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "first", title: "Деталі" },
    { key: "second", title: "Місця" },
    { key: "third", title: "Результати" },
  ]);

  useEffect(() => {
    spotsService.getSpots({ matchId: match.id})
    .then((results) => {
      setSpots(results);
    })
  }, [])

  return (
    <View className="flex-1">
      <View className='flex p-6 bg-sky-400'></View>
      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => (
            <MatchDetailsCard navigation={navigation} match={match} tournament={tournament} />
          ),
          second: () => (
            <MatchSpots navigation={navigation} match={match} tournament={tournament} />
          ),
          third: () => (
            <View><Text>Результати</Text></View>
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
