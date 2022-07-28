import { StyleSheet, Text, View, Button, FlatList } from "react-native";
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
  const [flightDetails, setFlightDetails] = useState([]);
  const [accomDetails, setAccomDetails] = useState([]);
  const [attractionDetails, setAttractionDetails] = useState([]);

  function getTrip() {
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
    getFlight();
    getAccomodation();
    getAttractions();
  }, [id]);

  //get flight data from firestore

  async function getFlight() {
    if (id) {
      try {
        const unsubscribe = await db
          .collection("trips")
          .doc(id)
          .collection("flights")
          .onSnapshot((collection) => {
            const data = collection.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));
            // console.log(data);
            setFlightDetails(data);
          });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    }
  }

  async function getAccomodation() {
    if (id) {
      try {
        const unsubscribe = await db
          .collection("trips")
          .doc(id)
          .collection("accomodation")
          .onSnapshot((collection) => {
            const data = collection.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            setAccomDetails(data);
          });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    }
  }


  async function getAttractions() {
    if (id) {
      try {
        const unsubscribe = await db
          .collection("trips")
          .doc(id)
          .collection("attractions")
          .onSnapshot((collection) => {
            const data = collection.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
            }));

            setAttractionDetails(data);
          });
        return () => unsubscribe();
      } catch (error) {
        console.log(error);
      }
    }
  }

  function renderFlightDetails({ item }) {
    return (
      // <TouchableOpacity

      //   onPress={() =>
      //     navigation.navigate("tripdetails", {
      //       id: item.id,
      //       startDest: item.startDest,
      //       endDest: item.endDest,
      //       flightDate: item.flightDate,
      //       flightNumber: item.flightNumber
      //     })
      //   }
      // >
      <View>
        <SmallHeading>{item.flightNumber}</SmallHeading>
        <Text>
          {item.startDest} to {item.endDest} {item.flightDate}
        </Text>
      </View>
      // </TouchableOpacity>
    );
  }

  function renderAccomDetails({ item }) {
    return (
      // <TouchableOpacity

      //   onPress={() =>
      //     navigation.navigate("tripdetails", {
      //       id: item.id,
      //       startDest: item.startDest,
      //       endDest: item.endDest,
      //       flightDate: item.flightDate,
      //       flightNumber: item.flightNumber
      //     })
      //   }
      // >
      <View>
        <SmallHeading>{item.name}</SmallHeading>
        <Text>
          {item.address} {item.date}
        </Text>
      </View>
      // </TouchableOpacity>
    );
  }


  function renderAttractionDetails({ item }) {
    return (
      // <TouchableOpacity

      //   onPress={() =>
      //     navigation.navigate("tripdetails", {
      //       id: item.id,
      //       startDest: item.startDest,
      //       endDest: item.endDest,
      //       flightDate: item.flightDate,
      //       flightNumber: item.flightNumber
      //     })
      //   }
      // >
      <View>
        <SmallHeading>{item.description}</SmallHeading>
        <Text>
          {item.location} {item.date}
        </Text>
      </View>
      // </TouchableOpacity>
    );
  }

  //delete trip
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

      <SmallHeading>Flight Details</SmallHeading>

      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={flightDetails}
          renderItem={renderFlightDetails}
        />
      </View>

      <SmallHeading>Accomodation</SmallHeading>

      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={accomDetails}
          renderItem={renderAccomDetails}
        />
      </View>

      <SmallHeading>Attractions</SmallHeading>

      <View>
        <FlatList
          keyExtractor={(item) => item.id}
          data={attractionDetails}
          renderItem={renderAttractionDetails}
        />
      </View>

      <Button title="delete trip" onPress={() => deleteHandler(id)} />
    </View>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "grey",
    borderRadius: 5,
    width: 300,
    height: 20,
  },
});
