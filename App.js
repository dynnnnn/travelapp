
import { StyleSheet, View } from "react-native";
import { useState} from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogIn from "./screens/LogIn";
import Home from "./screens/Home";
import AddTrip from "./screens/AddTrip";

import { LogInContext } from "./context/LogInContext";


const Stack = createNativeStackNavigator();

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);


  return  <NavigationContainer>
  <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>
  <Stack.Navigator>
  
    <Stack.Screen name="login" component={LogIn} />
    <Stack.Screen name="home" component={Home} title="Trips"/>
    <Stack.Screen name="addtrip" component={AddTrip} />
  
  </Stack.Navigator>
  </LogInContext.Provider>
</NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
});
