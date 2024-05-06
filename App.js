import { AuthProvider, useAuth } from "./app/context/AuthContext";
import Home from "./app/screens/Home";
import Login from "./app/screens/Login";
import Register from "./app/screens/Register";
import ChangePassword from "./app/screens/ChangePassword";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GlobalProvider } from "./app/context/GlobalContext";
import { ToastProvider } from "react-native-toast-notifications";

export default function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <ToastProvider
          placement="top"
          duration={4000}
          animationType='slide-in'
          animationDuration={250}
          offsetTop={60}
          swipeEnabled={true}
        >
          <Layout></Layout>
        </ToastProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

const Stack = createNativeStackNavigator();

export const Layout = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={authState.authenticated ? "Home" : "Login"}
      >
        {authState.authenticated ? (
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          ></Stack.Screen>
        ) : (
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ title: "Fishment" }}
          ></Stack.Screen>
        )}
        <Stack.Screen
          options={{ title: "" }}
          name="Register"
          component={Register}
        ></Stack.Screen>
        <Stack.Screen
          options={{ title: "" }}
          name="ChangePassword"
          component={ChangePassword}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};
