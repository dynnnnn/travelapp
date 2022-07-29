import { StyleSheet, Text, View, Button } from 'react-native';
import React, {useEffect, useState} from 'react';
import Title from '../components/Title';
import firebase from "firebase";

const FlightDetails = ({ navigation, route}) => {
    const db = firebase.firestore();

    const [flightId, setFlightId] = useState("");
    const [flightNumber, setFlightNumber] = useState("");
    const [startDest, setStartDest] = useState("");
    const [endDest, setEndDest] = useState("");
    const [flightDate, setFlightDate] = useState("");
    const [tripId, setTripId] = useState("")
   


  function getDetails() {
    const flightId = route.params.id;
    const flightNumber = route.params.flightNumber;
    const startDest = route.params.startDest;
    const endDest = route.params.endDest;
    const flightDate = route.params.flightDate;
    const tripId = route.params.tripId;
 
    setFlightNumber(flightNumber);
    setFlightId(flightId);
    setStartDest(startDest);
    setEndDest(endDest);
    setFlightDate(flightDate);
    setTripId(tripId);

  }

  useEffect(() => {
    getDetails();
  }, []);

  async function deleteFlightHandler(id) {

    
    await db.collection("trips").doc(tripId).collection("flights").doc(id).delete();
    navigation.navigate("home");
  }


  return (
    <View>
      <Title>Flight Details</Title>
      <Text>Flight Number: {flightNumber}</Text>
      <Text> Flight Date: {flightDate} </Text>
      <Text> Start destination: {startDest} </Text>
      <Text> End destination: {endDest}</Text>
      <Text>{tripId}</Text>

      <Text>{flightId}</Text>
<Button title="edit" onPress={()=> navigation.navigate("editflight", {
            id: id,
            flightNumber: flightNumber,
            startDest: startDest,
            endDest: endDest,
            flightDate: flightDate
           
          })}/>
<Button title="delete" onPress={() =>deleteFlightHandler(flightId)}/>

    </View>
  )
}

export default FlightDetails

const styles = StyleSheet.create({})