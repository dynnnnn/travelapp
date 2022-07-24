
import { StyleSheet, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LogIn from "./screens/LogIn";
import Home from "./screens/Home";
import AddTrip from "./screens/AddTrip";


const Stack = createNativeStackNavigator();

export default function App() {
  return  <NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="login" component={LogIn} />
    <Stack.Screen name="home" component={Home} />
    <Stack.Screen name="addtrip" component={AddTrip} />
  </Stack.Navigator>
</NavigationContainer>
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
});
