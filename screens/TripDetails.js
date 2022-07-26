import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useState, useEffect} from 'react'
import firebase from 'firebase';



const TripDetails = ({navigation, route}) => {
  const db = firebase.firestore();

const [country, setCountry] = useState("")
const [ id, setId] = useState("");
const [ flightDetails, setFlightDetails] = useState("");

  async function getTrip(){
    const id = route.params.id;
    const country = route.params.country;
   
    setCountry(country);
    setId(id);
  

  }

  useEffect(() => {
getTrip();
  }, []);

 

  return (
    <View>
      <Text>{country}</Text>

   

      <Button title="add flight" onPress={()=> navigation.navigate("addflight", {id: id})}/>

      <Text>Itinerary</Text>
    </View>
  )
}

export default TripDetails

const styles = StyleSheet.create({})