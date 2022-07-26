import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import { monthNames } from "../constants/Month";

const db = firebase.firestore();

const AddAccom = ({ navigation, route }) => {


  const [name, setName] = useState("");
  const [address, setAddress] = useState("");


  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const [accomDate, setAccomDate] = useState(new Date());
  const [accomEndDate, setAccomEndDate] = useState(new Date());
  

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || accomDate;
    setShow(Platform.OS === "ios");
    setAccomDate(currentDate);

    let tempDate = new Date(currentDate);
  
    setAccomDate(tempDate);
   
  }

  function onEndDateChange(event, selectedDate) {
    const currentDate = selectedDate || accomEndDate;
    setShow(Platform.OS === "ios");
    setAccomEndDate(currentDate);

    let tempDate = new Date(currentDate);
  
    setAccomEndDate(tempDate);
   
  }



  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

 
 

  async function submitHandler() {
    try{
  const id = route.params.id;
  console.log(id);

    const newAccom = await  db
    .collection("trips")
    .doc(id)
    .collection("accomodation")
    .doc()
      .set({
        date: accomDate,
        name: name,
        address: address,
        endDate: accomEndDate
      });

    navigation.navigate("tripdetails");
    return newAccom;
  } catch(error){
    console.log(error);
  }
}




  return (
    <View>
      <Title>Add Accomodation</Title>

  

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


<Button title="end date" onPress={() => setShow("date")} mode={mode} />

{show && (
  <DateTimePicker
    testID="dateTimePicker"
    value={accomEndDate}
    is24Hour={true}
    display="default"
    onChange={onEndDateChange}
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
