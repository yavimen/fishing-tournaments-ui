import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

// Screens
import Tournaments from "./Tournaments";
import Settings from "./Settings";
import { SafeAreaView } from "react-native-safe-area-context";

//Screen names
const tournamentsName = "Tournaments";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function Home() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        initialRouteName={tournamentsName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === tournamentsName) {
              iconName = focused ? "home" : "home-outline";
            } else if (rn === settingsName) {
              iconName = focused ? "settings" : "settings-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 60 },
          headerShown: false,
        })}
      >
        <Tab.Screen name={tournamentsName} component={Tournaments} />
        <Tab.Screen name={settingsName} component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Home;
