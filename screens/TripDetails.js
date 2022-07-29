import { StyleSheet, Text, View, Button, FlatList, SectionList, SafeAreaView, TouchableOpacity } from "react-native";
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
  }, [id]);
  

  // Fligts collection
  useEffect(() => {

    if (id) {
    const unsubscribe = db
    .collection("trips")
    .doc(id)
    .collection("flights")
    .onSnapshot((collection) => {
      const data = collection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setFlightDetails(data);
    });
    return () => unsubscribe();
  }
  
  }, [id]);


  // Accom collection
  useEffect(() => {
    if (id) {
    const unsubscribe = db
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
  }
  
  }, [id]);


   // Attractions collection
   useEffect(() => {
    if (id) {
    const unsubscribe = db
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
  }
  
  }, [id]);



  function renderFlightDetails({ item }) {
 
    return (

      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          navigation.navigate("flightdetails", {
            id: item.id,
            flightNumber: item.flightNumber,
            startDest: item.startDest,
            endDest: item.endDest,
            flightDate: item.flightDate,
            tripId: id
           
          })
        }
      >
  
      <View>
        <SmallHeading>{item.flightNumber}</SmallHeading>
        <Text>
          {item.startDest} to {item.endDest} {item.flightDate}
        </Text>
      </View>
      </TouchableOpacity>
      
    );
  }

  function renderAccomDetails({ item }) {
    return (
 
      <View>
        <SmallHeading>{item.name}</SmallHeading>
        <Text>
          {item.address} {item.date}
        </Text>
      </View>
   
    );
  }

  function renderAttractionDetails({ item }) {
    return (
  
      <View>
        <SmallHeading>{item.description}</SmallHeading>
        <Text>
          {item.location} {item.date}
        </Text>
      </View>
     
    );
  }

  //delete trip
  async function deleteHandler(id) {
    await db.collection("trips").doc(id).delete();
    navigation.navigate("home");
  }

  return (
    <SafeAreaView style={{flex: 1}}>
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
  
      <View style={styles.box}>
        <SmallHeading>Flight Details</SmallHeading>
        {/* <Button title="edit" onPress={() => navigation.navigate("editflight", {id: id})}/> */}

        <FlatList
          keyExtractor={(item) => item.id}
          data={flightDetails}
          renderItem={renderFlightDetails}
        />
      </View>

      <View style={styles.box}>
        <SmallHeading>Accomodation</SmallHeading>
        {/* <Button title="edit" onPress={() => navigation.navigate("editaccom", {id: id})}/> */}

        <FlatList
          keyExtractor={(item) => item.id}
          data={accomDetails}
          renderItem={renderAccomDetails}
        />
      </View>

      <View style={styles.box}>
        <SmallHeading>Attractions</SmallHeading>
        {/* <Button title="edit" onPress={() => navigation.navigate("editattraction", {id: id})}/> */}

        <FlatList
          keyExtractor={(item) => item.id}
          data={attractionDetails}
          renderItem={renderAttractionDetails}
        />
      </View>
  

      <Button title="delete trip" onPress={() => deleteHandler(id)} />
      </SafeAreaView>
  );
};

export default TripDetails;

const styles = StyleSheet.create({
  box: {
    backgroundColor: "lightgrey",
    borderRadius: 5,
    margin: 20,
  },
  container: {
    padding: 10,
    margin: 10,
  },
});
