import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Account from '../screens/Account';
import MyTripsStack from './MyTripsStack';

const Tab = createBottomTabNavigator();

export default function LoggedInBottomTab({navigation}) {
  return (
    <Tab.Navigator>
      <Tab.Screen name="My Trips" component={MyTripsStack} options={{ headerShown: false }}  />
      <Tab.Screen name="Account" component={Account} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}