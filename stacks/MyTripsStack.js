import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddAccom from '../screens/AddAccom';
import AddActivity from '../screens/AddActivity';
import AddFlight from '../screens/AddFlight';
import AddItinerary from '../screens/AddItinerary';
import AddTrip from '../screens/AddTrip';
import ChooseAddType from '../screens/ChooseAddType';
import EditTrip from '../screens/EditTrip';
import Home from '../screens/Home';
import TripDetails from '../screens/TripDetails';

const Stack = createNativeStackNavigator();

export default function TripStack({navigation}) {
    return (
 

    <Stack.Navigator>
    
      <Stack.Screen name="home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="addtrip" component={AddTrip} options={{ headerShown: false }} />
      <Stack.Screen name="addflight" component={AddFlight} options={{ headerShown: false }} />
      <Stack.Screen name="tripdetails" component={TripDetails} options={{ headerShown: false }} />
      <Stack.Screen name="edittrip" component={EditTrip} options={{ headerShown: false }} />
      <Stack.Screen name="chooseaddtype" component={ChooseAddType} options={{ headerShown: false }} />
      <Stack.Screen name="additinerary" component={AddItinerary} options={{ headerShown: false }} />
      <Stack.Screen name="addaccom" component={AddAccom} options={{ headerShown: false }} />
      <Stack.Screen name="addactivity" component={AddActivity} options={{ headerShown: false }} />
     
     
    
    </Stack.Navigator>


  
    );

}