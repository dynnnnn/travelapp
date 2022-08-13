import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import MyTripsStack from './MyTripsStack';
import {Ionicons} from '@expo/vector-icons/Ionicons';
import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Tab = createBottomTabNavigator();

export default function LoggedInBottomTab({navigation}) {
  return (
    <Tab.Navigator>

    screenOptions={({ route }) => ({
   
    tabBarActiveTintColor: "",
    tabBarInactiveTintColor: "",
    tabBarStyle: {
    backgroundColor: isDark ? "#00266B" : "#FFFFFF",
    },
    tabBarIcon: ({ color, size }) => {
    let iconName;

    if (route.name === "My Trips") {
      iconName = "aircraft";
     } else if (route.name === "Account") {
      iconName = "account-circle";
     }
     // You can return any component that you like here!
     return <Entypo name={iconName} size={size} color={color} />;
            <MaterialCommunityIcons name={iconName} color={color} size={size} />;
    },
   })}

      <Tab.Screen name="My Trips" component={MyTripsStack} options={{ headerShown: false }}  />
      <Tab.Screen name="Account" component={Account} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}