import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import * as Location from 'expo-location';
// Screens
import Tournaments from "./Tournaments";
import Settings from "./Settings";

import { getAuthTestData } from "../services/authService";

//Screen names
const tournamentsName = "Tournaments";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

function Home() {

  React.useEffect(() => {
    getAuthTestData()
    .then((result) => console.info("Home test req", result));
  }, []);

  React.useEffect(() => {
    (async () => {
      const ForegroundPermissions = await Location.getForegroundPermissionsAsync(); // перевірка чи є  пермішон {"android": {"accuracy": "fine", "scope": "fine"}, "canAskAgain": true, "expires": "never", "granted": true, "status": "granted"} 
      //console.info("ForegroundPermissions: ", ForegroundPermissions)
      const BackgroundPermissions = await Location.getBackgroundPermissionsAsync()
      //console.info("BackgroundPermissions: ", BackgroundPermissions)
      const ProviderStatus = await Location.getProviderStatusAsync()
      //console.info("ProviderStatus: ", ProviderStatus) // {"backgroundModeEnabled": true, "gpsAvailable": true, "locationServicesEnabled": true, "networkAvailable": true, "passiveAvailable": true} 
      const ServicesEnabled = await Location.hasServicesEnabledAsync() // повертає чи ввімкнена геолокація
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
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "black",
          tabBarLabelStyle: { paddingBottom: 10, fontSize: 10 },
          tabBarStyle: { padding: 10, height: 60, backgroundColor: "#d1d5db", },
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
