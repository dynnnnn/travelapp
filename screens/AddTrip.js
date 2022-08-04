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


import Title from "../components/Title";
import GoogleCountryAutoComplete from "./GoogleCountryAutoComplete";
import PrimaryButton from "../components/PrimaryButton";

export default function AddTrip({ navigation, route }) {
  const [country, setCountry] = useState("");
  const [placeId, setPlaceId] = useState();
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const user = firebase.auth().currentUser;

    setUser(user.email);
  }, []);

  useEffect(() => {
   const destination = route.params?.destination;
   const placeId = route.params?.placeId;

   if (destination){
     setCountry(destination);
     setPlaceId(placeId);

   }

  }, [route]);



  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let date = new Date(currentDate);
  
    setDate(date);
  }

  function onEndDateChange(event, selectedDate) {
    const currentDate = selectedDate || endDate;
    setEndShow(Platform.OS === "ios");
    setEndDate(currentDate);

    let date = new Date(currentDate);
    
    setEndDate(date);
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  //add trip
  async function submitHandler() {
    const newTrip = await firebase.firestore().collection("trips").doc().set({
      country: country,
      date: date,
      endDate: endDate,
      user: user,
      placeId: placeId
    });

    navigation.navigate("home");
    return newTrip;
  }

  return (
    <View style={styles.container}>
      <Title>Add Trip</Title>

<PrimaryButton onPress={() => navigation.navigate("Country")}>Set Destination</PrimaryButton>
      <TextInput
        
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

     
      <Button onPress={submitHandler} title="submit"></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 100,
  },
});
