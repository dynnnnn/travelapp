import { StyleSheet, Text, View, FlatList, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import firebase from "firebase";
import Title from "../components/Title";
import SmallHeading from "../components/SmallHeading";
import { monthNames } from "../constants/Month";

const EditFlight = ({ navigation, route }) => {
  const db = firebase.firestore();
  const id = route.params.id;
  const [flightDetails, setFlightDetails] = useState([]);

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
      console.log(flightDetails);
    });
    return () => unsubscribe();
  }
  
  }, [id]);
  

  function renderFlightDetails({ item }) {
    return (
  
      <View>
        <SmallHeading>{item.flightNumber}</SmallHeading>
        <Text>
          {item.startDest} to {item.endDest} {item.flightDate}
        </Text>
        
      </View>
      
    );
  }





  return (
    <View>
      <Title>Edit Flight</Title>


      <FlatList
          keyExtractor={(item) => item.id}
          data={flightDetails}
          renderItem={renderFlightDetails}
        />
        
    </View>
  );
};

export default EditFlight;

const styles = StyleSheet.create({});
