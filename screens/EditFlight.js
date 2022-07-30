import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Title from "../components/Title";
import SmallHeading from "../components/SmallHeading";
import { monthNames } from "../constants/Month";

const EditFlight = ({ navigation, route }) => {
  const db = firebase.firestore();
  const id = route.params.id;
  const [flightId, setFlightId] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [startDest, setStartDest] = useState("");
  const [endDest, setEndDest] = useState("");
  const [flightDate, setFlightDate] = useState("");
  const [tripId, setTripId] = useState("");

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

  // Fligts collection
  useEffect(() => {
    if (id) {
      const unsubscribe = db
        .collection("trips")
        .doc(id)
        .collection("flights")
        .onSnapshot((collection) => {
          const data = collection.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          console.log(data);
        });
      return () => unsubscribe();
    }
  }, [id]);

  async function updateHandler() {
    const newFlight = await firebase
      .firestore()
      .collection("trips")
      .doc(tripId)
      .collection("flights")
      .doc(flightId)
      .update({
        flightDate: flightDate,
        flightNumber: flightNumber,
        startDest: startDest,
        endDest: endDest,
      });
    navigation.navigate("tripdetails");
  }

  return (
    <View>
      <Title>Edit Flight</Title>
      <View>
        <Text>Flight Number:</Text>
        <TextInput
          placeholder="Flight Number"
          onChangeText={(text) => {
            setFlightNumber(text);
          }}
          value={flightNumber}
        />
        <Text> Flight Date: {flightDate} </Text>

        <Text> Start destination: </Text>

        <TextInput
          placeholder="Start Destination"
          onChangeText={(text) => {
            setStartDest(text);
          }}
          value={startDest}
        />
        <Text> End destination:</Text>

        <TextInput
          placeholder="End Destination"
          onChangeText={(text) => {
            setEndDest(text);
          }}
          value={endDest}
        />

        <Button title="update" onPress={updateHandler} />
      </View>
    </View>
  );
};

export default EditFlight;

const styles = StyleSheet.create({});
