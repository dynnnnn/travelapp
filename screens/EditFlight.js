import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Title from "../components/Title";
import SmallHeading from "../components/SmallHeading";
import DateTimePicker from "@react-native-community/datetimepicker";

const EditFlight = ({ navigation, route }) => {
  const db = firebase.firestore();
  const [flightDetails, setFlightDetails] = useState({});
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const flightId = route.params.id;
  const tripId = route.params.tripId;

  async function getFlightDetails() {
    const doc = await db
      .collection("trips")
      .doc(tripId)
      .collection("flights")
      .doc(flightId)
      .get();

    const flight = doc.data();
    setFlightDetails(flight);
  }

  useEffect(() => {
    getFlightDetails();
  }, [flightId, tripId]);

  function onDateChange(event, selectedDate) {
    const currentDate =
      selectedDate || new Date(flightDetails.flightDate.seconds * 1000);
    setShow(Platform.OS === "ios");
    setFlightDetails({ ...flightDetails, flightDate: currentDate });

    let newDate = new Date(currentDate);

    setFlightDetails({ ...flightDetails, flightDate: newDate });
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  async function updateHandler() {
    const newFlight = await firebase
      .firestore()
      .collection("trips")
      .doc(tripId)
      .collection("flights")
      .doc(flightId)
      .update({
        flightDate: flightDetails.flightDate,
        flightNumber: flightDetails.flightNumber,
        startDest: flightDetails.startDest,
        endDest: flightDetails.endDest,
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
            setFlightDetails({ ...flightDetails, flightNumber: text });
          }}
          value={flightDetails.flightNumber}
        />

        <Text> Start destination: </Text>

        <TextInput
          placeholder="Start Destination"
          onChangeText={(text) => {
            setFlightDetails({ ...flightDetails, startDest: text });
          }}
          value={flightDetails.startDest}
        />
        <Text> End destination:</Text>

        <TextInput
          placeholder="End Destination"
          onChangeText={(text) => {
            setFlightDetails({ ...flightDetails, endDest: text });
          }}
          value={flightDetails.endDest}
        />

        <Button
          title="flight date"
          onPress={() => setShow("date")}
          mode={mode}
        />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(flightDetails.flightDate.seconds * 1000)}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}

        <Button title="update" onPress={updateHandler} />
      </View>
    </View>
  );
};

export default EditFlight;

const styles = StyleSheet.create({});
