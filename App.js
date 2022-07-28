import { StyleSheet, View, SafeAreaView } from "react-native";
import { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Onboarding from "./screens/Onboarding";
import LogIn from "./screens/LogIn";
import Home from "./screens/Home";
import AddTrip from "./screens/AddTrip";
import TripDetails from "./screens/TripDetails";
import AddFlight from "./screens/AddFlight";

import { LogInContext } from "./context/LogInContext";
import LoggedInBottomTab from "./stacks/LoggedInBottomTab";
import Onboarding from 'react-native-onboarding-swiper';

import { useFonts } from "expo-font";


const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Stack.Navigator
          initialRouteName={isLoggedIn ? "loggedInBottomTab" : "login"}
        >
          <Stack.Screen name="login" component={LogIn} />
          <Stack.Screen
            name="loggedInBottomTab"
            component={LoggedInBottomTab}
          />
        </Stack.Navigator>
      </LogInContext.Provider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
