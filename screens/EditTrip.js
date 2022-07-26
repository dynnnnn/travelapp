import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import DateTimePicker from "@react-native-community/datetimepicker";
import firebase from "firebase";



const EditTrip = ({ navigation, route }) => {
  const [country, setCountry] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState(date);
  const [endDate, setEndDate] = useState(endDate);
 

  async function getTrip() {
    const id = route.params.id;
    const country = route.params.country;
    const date = route.params.date;
    const endDate = route.params.endDate;
    setCountry(country);
    setId(id);
    setDate(date);
    setEndDate(endDate);
  }

  useEffect(() => {
    getTrip();
  }, []);



  async function updateHandler(){
    const newTrip = await firebase.firestore().collection("trips").doc(id).update({
        country: country,
      //   numberOfDays: numberOfDays,
        date: date,
        endDate: endDate
      });
      navigation.navigate("tripdetails")
  
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

      <Text>{date}</Text>


      <Button onPress={updateHandler} title="submit"></Button>


    </View>
  );
};

export default EditTrip;

const styles = StyleSheet.create({});
