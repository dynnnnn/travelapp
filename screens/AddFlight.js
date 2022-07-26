import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, {useState, useEffect} from 'react';
import DateTimePicker from "@react-native-community/datetimepicker";



import firebase from "../database/firebase";

const db = firebase.firestore();

const AddFlight = ({route, navigation}) => {

const [ id, setId] = useState("");
const [flightNumber, setFlightNumber] = useState("");
const [flightDate, setFlightDate] = useState(new Date());
const [mode, setMode] = useState("date");
const [show, setShow] = useState(false);

 function getTrip(){
    const id = route.params.id;
    setId(id);
    console.log(id);
  }

  useEffect(() => {
    getTrip();
  }, []);

  async function submitFlightHandler() {
    const newTrip = await db.collection("trips").doc(id).collection("flights").doc().set({
      flightNumber: flightNumber,
      flightDate: flightDate
      
    });

    navigation.navigate("tripdetails");
  }

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || flightDate;
    setShow(Platform.OS === "ios");
    setFlightDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();

    setFlightDate(fDate);
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  return (
    <View>
      <Text>AddFlight</Text>
      <TextInput
        placeholder="flight number"
        onChangeText={(text) => {
          setFlightNumber(text);
        }}
        value={flightNumber}
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
      <Button title="add flight" onPress={submitFlightHandler}/>
      
    </View>
  )
}

export default AddFlight

const styles = StyleSheet.create({})