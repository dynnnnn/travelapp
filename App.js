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
import styles from './components/Styles';
import { useFonts } from 'expo-fonts';
import AppLoading from 'expo-app-loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loaded] = useFonts({
    "BandaNovaBook": require('./assets/fonts/BandaNova-Book.ttf'),
    "BandaNovaBold": require('./assets/fonts/BandaNova-Bold.ttf'),
  });
  
  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'BandaNova', fontSize: 30 }}></Text>
    </View>
  );
}
 
             
          <NavigationContainer>
    <LogInContext.Provider value={{ isLoggedIn, setIsLoggedIn}}>

    <Stack.Navigator  initialRouteName={isLoggedIn ? "loggedInBottomTab" : "login"}>

    <Stack.Screen name="Onboarding" component={Onboarding}/>
    <Stack.Screen name="login" component={LogIn} options={{ headerShown: false }}/>
    <Stack.Screen name="loggedInBottomTab" component={LoggedInBottomTab} options={{ headerShown: false }}/>
   
  
  </Stack.Navigator>
  </LogInContext.Provider>
</NavigationContainer>



const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
});
