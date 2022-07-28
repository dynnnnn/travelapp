import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";

const db = firebase.firestore();

const AddAccom = ({ navigation, route }) => {
  const [date, setDate] = useState(new Date());
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");


  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [accomDate, setAccomDate] = useState(new Date());
  

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || accomDate;
    setShow(Platform.OS === "ios");
    setAccomDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

      let dateid =
      tempDate.getDate()

    setAccomDate(fDate);
    setDate(dateid.toString())
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

 
 

  async function submitHandler() {
    try{
  const id = route.params.id;
  console.log(id);

    const newAccom = await db
      .collection("trips")
      .doc(id)
      .collection(date)
      .doc("accomodation")
      .set({
        date: accomDate,
        name: name,
        address: address,
      });

    navigation.navigate("tripdetails");
  } catch(error){
    console.log(error);
  }
}




  return (
    <View>
      <Title>Add Accomodation</Title>

      {/* <TextInput
        placeholder="date"
        value={date}
        onChangeText={(text) => {
          setDate(text);
        }}
      /> */}

<Button title="date" onPress={() => setShow("date")} mode={mode} />

{show && (
  <DateTimePicker
    testID="dateTimePicker"
    value={accomDate}
    is24Hour={true}
    display="default"
    onChange={onDateChange}
  />
)}

     
      <TextInput
        placeholder="name"
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
      />
      <TextInput
        placeholder="address"
        value={address}
        onChangeText={(text) => {
          setAddress(text);
        }}
      />
      <Button title="add" onPress={submitHandler} />
    </View>
  );
};

export default AddAccom;

const styles = StyleSheet.create({});
