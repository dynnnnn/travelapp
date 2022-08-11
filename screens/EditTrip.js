import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";
import Style from "../components/styles";


const EditTrip = ({ navigation, route }) => {
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [tripDetails, setTripDetails] = useState({});
  const db = firebase.firestore();

  const id = route.params.id;

  //get Trip Details
  async function getTripDetails() {
    if (id) {
      const doc = await db.collection("trips").doc(id).get();

      const trip = doc.data();
      setTripDetails(trip);
    }
  }

  useEffect(() => {
    getTripDetails();
  }, [id]);

  function onDateChange(event, selectedDate) {
    const currentDate =
      selectedDate || new Date(tripDetails.date.seconds * 1000);
    setShow(Platform.OS === "ios");
    setTripDetails({ ...tripDetails, date: currentDate });

    let newDate = new Date(currentDate);

    setTripDetails({ ...tripDetails, date: newDate });
  }

  function onEndDateChange(event, selectedDate) {
    const currentDate =
      selectedDate || new Date(tripDetails.endDate.seconds * 1000);
    setEndShow(Platform.OS === "ios");
    setTripDetails({ ...tripDetails, endDate: currentDate });

    let newEndDate = new Date(currentDate);

    setTripDetails({ ...tripDetails, endDate: newEndDate });
  }

  async function updateHandler() {
    const newTrip = await firebase
      .firestore()
      .collection("trips")
      .doc(id)
      .update({
        country: tripDetails.country,
        date: tripDetails.date,
        endDate: tripDetails.endDate,
      });
    navigation.navigate("home");
  }

  return (
    <View>
      <Title>Edit Trip</Title>

      <TextInput
        placeholder="Country"
        onChangeText={(text) => {
          setTripDetails({ ...tripDetails, country: text });
        }}
        value={tripDetails.country}
      />

      <Button title="start date" onPress={() => setShow("date")} mode={mode} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(tripDetails.date.seconds * 1000)}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <Button title="end date" onPress={() => setEndShow("date")} mode={mode} />

      {endShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(tripDetails.endDate.seconds * 1000)}
          is24Hour={true}
          display="default"
          onChange={onEndDateChange}
        />
      )}

      <Button onPress={updateHandler} title="submit"></Button>
    </View>
  );
};

export default EditTrip;

const styles = StyleSheet.create({});
