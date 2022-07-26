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

export default function AddTrip({ navigation }) {
  const [country, setCountry] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

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

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  async function submitHandler() {
    const newTrip = await firebase.firestore().collection("trips").doc().set({
      country: country,
      numberOfDays: numberOfDays,
      date: date,
      
    });

    navigation.navigate("home");
  }

  return (
    <View style={styles.container}>
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
      <TextInput
        placeholder="number of days"
        onChangeText={(text) => {
          setNumberOfDays(text);
        }}
        value={numberOfDays}
      />
      <Button onPress={submitHandler} title="submit"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
});
