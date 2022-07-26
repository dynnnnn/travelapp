import { StyleSheet, Text, View, Button } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Title from "../components/Title";
import SmallHeading from "../components/SmallHeading";

const TripDetails = ({ navigation, route }) => {
  const db = firebase.firestore();

  const [country, setCountry] = useState("");
  const [id, setId] = useState("");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  async function deleteHandler(id) {
    await db.collection("trips").doc(id).delete();
    navigation.navigate("home");
  }

  return (
    <View>
      <Title>{country}</Title>
      <Text>
        {" "}
        {date} to {endDate}
      </Text>

      <SmallHeading>Flight Details</SmallHeading>

      <Button
        title="add"
        onPress={() => navigation.navigate("chooseaddtype", { id: id })}
      />

      <Button
        title="edit trip"
        onPress={() =>
          navigation.navigate("edittrip", {
            id: id,
            country: country,
            date: date,
            endDate: endDate,
          })
        }
      />

      <Button title="delete trip" onPress={() => deleteHandler(id)} />

      <SmallHeading>Itinerary</SmallHeading>

     


    </View>
  );
};

export default TripDetails;

const styles = StyleSheet.create({});
