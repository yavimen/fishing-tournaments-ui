import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import TournamentList from "./tournaments/TournamentList";
import CreateTournament from "./tournaments/TournamentCreate";
import TournamentDetails from "./tournaments/TournamentDetails";
import UpdateTournament from "./tournaments/TournamentUpdate";

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
