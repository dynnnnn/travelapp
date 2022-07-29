import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";



const EditTrip = ({ navigation, route }) => {
 
  const [country, setCountry] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  
  
 

function getTrip() {
    const id = route.params.id;
    const country = route.params.country;
    // const date = route.params.date;
    // const endDate = route.params.endDate;
    setCountry(country);
    setId(id);
    // setDate(date);
    // setEndDate(endDate);
  }

  useEffect(() => {
    getTrip();
  }, []);

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








  async function updateHandler(){
    const newTrip = await firebase.firestore().collection("trips").doc(id).update({
        country: country,
        date: date,
        endDate: endDate
      });
      navigation.navigate("home")
  
  }


  return (
    <View>
      <Title>Edit Trip</Title>

     

      <TextInput
        placeholder="country"
        onChangeText={(text) => {
          setCountry(text);
        }}
        value={country}
      />

      {/* <Text>{date} to {endDate}</Text> */}

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



      <Button onPress={updateHandler} title="submit"></Button>


    </View>
  );
};

export default EditTrip;

const styles = StyleSheet.create({});
