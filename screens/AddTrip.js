import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
} from "react-native";
import firebase from "../database/firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { auth } from "../database/firebase";
import Title from "../components/Title";

export default function AddTrip({ navigation }) {
  const [country, setCountry] = useState("");
//   const [numberOfDays, setNumberOfDays] = useState("");
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    console.log(fDate);
    setDate(fDate);
  }

  function onEndDateChange(event, selectedDate) {
    const currentDate = selectedDate || endDate;
    setEndShow(Platform.OS === "ios");
    setEndDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    console.log(fDate);
    setEndDate(fDate);
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  async function submitHandler() {
    const newTrip = await firebase.firestore().collection("trips").doc().set({
      country: country,
    //   numberOfDays: numberOfDays,
      date: date,
      endDate: endDate
    });

    navigation.navigate("home");
  }

  return (
    <View style={styles.container}>
      <Title>Add Trip</Title>

      <TextInput
        placeholder="country"
        onChangeText={(text) => {
          setCountry(text);
        }}
        value={country}
      />

      <Button title="start date" onPress={() => setShow("date")} mode={mode} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <Button title="end date" onPress={() => setEndShow("date")} mode={mode} />

      {endShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          is24Hour={true}
          display="default"
          onChange={onEndDateChange}
        />
      )}

      {/* <TextInput
        placeholder="number of days"
        onChangeText={(text) => {
          setNumberOfDays(text);
        }}
        value={numberOfDays}
      /> */}
      <Button onPress={submitHandler} title="submit"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
});
