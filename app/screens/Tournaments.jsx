import React from 'react'

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import TournamentList from './TournamentList';
import CreateTournament from './TournamentCreate';

const Stack = createNativeStackNavigator();

export default function Tournaments() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName={'TournamentList'}>
        <Stack.Screen
            options={{ title: 'Мої турніри' }}
            name="TournamentList"
            component={TournamentList}
          ></Stack.Screen>
          <Stack.Screen
              options={{ title: 'Додати турнір' }}
              name="CreateTournament"
              component={CreateTournament}
            ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}