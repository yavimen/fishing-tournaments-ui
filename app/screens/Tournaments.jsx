import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TournamentList from "./tournaments/TournamentList";
import CreateTournament from "./tournaments/TournamentCreate";
import TournamentDetails from "./tournaments/TournamentDetails";
import UpdateTournament from "./tournaments/TournamentUpdate";

import { MatchCreate, MatchDetails, EditMatchSpot } from "./matches";

const Stack = createNativeStackNavigator();

export default function Tournaments() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={"TournamentList"}>
        <Stack.Screen
          options={{ title: "Мої турніри" }}
          name="TournamentList"
          component={TournamentList}
        ></Stack.Screen>
        <Stack.Screen
          options={{ title: "Додати турнір" }}
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
          name="EditMatchSpot"
          component={EditMatchSpot}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
