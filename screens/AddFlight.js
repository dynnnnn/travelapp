import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

import firebase from "../database/firebase";
import Title from "../components/Title";
import { monthNames } from "../constants/Month";
import Style from"../components/Styles";

const db = firebase.firestore();

const AddFlight = ({ route, navigation }) => {
  const [id, setId] = useState("");
  const [flightNumber, setFlightNumber] = useState("");
  const [startDest, setStartDest] = useState("");
  const [endDest, setEndDest] = useState("");
  const [flightDate, setFlightDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  function getTrip() {
    const id = route.params.id;
    setId(id);

  }

  useEffect(() => {
    getTrip();
  }, []);

  async function submitFlightHandler() {
    const newTrip = await db
      .collection("trips")
      .doc(id)
      .collection("flights")
      .doc()
      .set({
        flightNumber: flightNumber,
        flightDate: flightDate,
        startDest: startDest,
        endDest: endDest,
      });
    
    navigation.navigate("tripdetails");
    return newTrip;

  }

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || flightDate;
    setShow(Platform.OS === "ios");
    setFlightDate(currentDate);

    let date = new Date(currentDate);
  

    setFlightDate(date);
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View>
      <Title>Add Flight</Title>
      <TextInput
        placeholder="flight number"
        onChangeText={(text) => {
          setFlightNumber(text);
        }}
        value={flightNumber}
      />

      <TextInput
        placeholder="start destination"
        onChangeText={(text) => {
          setStartDest(text);
        }}
        value={startDest}
      />

      <TextInput
        placeholder="end destination"
        onChangeText={(text) => {
          setEndDest(text);
        }}
        value={endDest}
      />

      <Button title="flight date" onPress={() => setShow("date")} mode={mode} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={flightDate}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}
      <Button title="add flight" onPress={submitFlightHandler} />
    </View>
  );
};

export default AddFlight;

const styles = StyleSheet.create({});
