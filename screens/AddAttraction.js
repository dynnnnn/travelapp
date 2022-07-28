import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Title from "../components/Title";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";

const db = firebase.firestore();

const AddActivity = ({ navigation, route }) => {

  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [attractionDate, setAttractionDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const id = route.params.id;

  async function submitHandler() {
    const newAttraction = await db
      .collection("trips")
      .doc(id)
      .collection("attractions")
      .doc()
      .set({
        date: attractionDate,
        location: location,
        description: description,
      });

    navigation.navigate("tripdetails");
    return newAttraction;
  }

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || attractionDate;
    setShow(Platform.OS === "ios");
    setAttractionDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setAttractionDate(fDate);
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View>
      <Title>Add Attraction</Title>

      <Button title="date" onPress={() => setShow("date")} mode={mode} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={attractionDate}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <TextInput
        placeholder="location"
        value={location}
        onChangeText={(text) => {
          setLocation(text);
        }}
      />
      <TextInput
        placeholder="description"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
      <Button title="add" onPress={submitHandler} />
    </View>
  );
};

export default AddActivity;

const styles = StyleSheet.create({});
