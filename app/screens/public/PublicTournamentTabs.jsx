import { View, Text, TouchableOpacity } from "react-native";
import { TabView, SceneMap } from "react-native-tab-view";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useGlobalContext } from "../../context/GlobalContext";
import { publicTournamentsService } from "../../services";
import { PublicActualTournamentsCard } from "./PublicActualTournamentsCard";
import { UserParticipatedTournaments } from "./UserParticipatedTournaments";

export function PublicTournamentTabs({ navigation, route }) {
  const { setPublicTournaments, setParticipatedTournamens } =
    useGlobalContext();

  const { authState } = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setRefreshing(true);
      const publicTournaments =
        await publicTournamentsService.getPublicTournaments();
      setPublicTournaments(publicTournaments);

      const participatedTournamens =
        await publicTournamentsService.getPublicTournaments({
          getUserParticipations: true,
        });
      setParticipatedTournamens(participatedTournamens);
      setRefreshing(false);
    };

    loadData();
  }, []);

  const [index, setIndex] = useState(0);

  let allowedTabs = [{ key: "first", title: "Публічні турніри" }];

  if (authState.authenticated) {
    allowedTabs.push({ key: "second", title: "Я учасник" });
  }

  const [routes] = useState(allowedTabs);

  return (
    <View className="flex-1 bg-white">
      <View className="flex p-6 bg-sky-400"></View>

      <TabView
        navigationState={{ index, routes }}
        renderScene={SceneMap({
          first: () => <PublicActualTournamentsCard loading={refreshing} />,
          second: () => <UserParticipatedTournaments loading={refreshing} />,
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
