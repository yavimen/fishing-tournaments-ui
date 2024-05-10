import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TournamentList from "./tournaments/TournamentList";
import CreateTournament from "./tournaments/TournamentCreate";
import TournamentDetails from "./tournaments/TournamentDetails";
import UpdateTournament from "./tournaments/TournamentUpdate";
import Settings from "./Settings";
import { PublicTournamentTabs, PublicTournamentDetails } from "./public";

import { MatchCreate, MatchSpotEdit, MatchResultAdd } from "./matches";
import MatchDetails from "./matches/MatchDetails";
import SettingsUserInfo from "./SettingsUserInfo";

import { getAuthTestData } from "../services/authService";
import { PublicMatchDetail } from "./public/PublicMatchDetail";
import NavigationButtons from "../shared/components/NavigationButtons";
import * as Location from "expo-location";

const Stack = createNativeStackNavigator();

export default function MainComponent() {
  React.useEffect(() => {
    getAuthTestData()
      .then((result) => console.info("Connection is well", result))
      .catch((e) => console.info("No connection", result));
  }, []);

  React.useEffect(() => {
    (async () => {
      const ForegroundPermissions =
        await Location.getForegroundPermissionsAsync(); // перевірка чи є  пермішон {"android": {"accuracy": "fine", "scope": "fine"}, "canAskAgain": true, "expires": "never", "granted": true, "status": "granted"}
      //console.info("ForegroundPermissions: ", ForegroundPermissions)
      const BackgroundPermissions =
        await Location.getBackgroundPermissionsAsync();
      //console.info("BackgroundPermissions: ", BackgroundPermissions)
      const ProviderStatus = await Location.getProviderStatusAsync();
      //console.info("ProviderStatus: ", ProviderStatus) // {"backgroundModeEnabled": true, "gpsAvailable": true, "locationServicesEnabled": true, "networkAvailable": true, "passiveAvailable": true}
      const ServicesEnabled = await Location.hasServicesEnabledAsync(); // повертає чи ввімкнена геолокація
      //console.info("ServicesEnabled: ", ServicesEnabled)
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Ви відхилили доступ до геолокації (");
        return;
      }
    })();
  }, []);
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"PublicTournamentTabs"}>
        <Stack.Screen
          options={{ headerShown: false }}
          name="TournamentList"
          component={TournamentList}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="CreateTournament"
          component={CreateTournament}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="TournamentDetails"
          component={TournamentDetails}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="UpdateTournament"
          component={UpdateTournament}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MatchCreate"
          component={MatchCreate}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MatchDetails"
          component={MatchDetails}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MatchSpotEdit"
          component={MatchSpotEdit}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MatchResultAdd"
          component={MatchResultAdd}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Settings"
          component={Settings}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="PublicTournamentTabs"
          component={PublicTournamentTabs}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="PublicTournamentDetails"
          component={PublicTournamentDetails}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="SettingsUserInfo"
          component={SettingsUserInfo}
        ></Stack.Screen>
        <Stack.Screen
          options={{ headerShown: false }}
          name="PublicMatchDetail"
          component={PublicMatchDetail}
        ></Stack.Screen>
      </Stack.Navigator>
      <NavigationButtons />
    </NavigationContainer>
  );
}
