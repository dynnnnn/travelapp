import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Title from "../components/Title";
import SmallHeading from "../components/SmallHeading";
import moment from "moment";
import Style from "../components/styles";

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


  //delete trip
  async function deleteHandler(id) {
    await db.collection("trips").doc(id).delete();
    navigation.navigate("home");
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Title>{country}</Title>
      
      <Text>
     
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

        {flightDetails.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() =>
              navigation.navigate("flightdetails", {
                id: item.id,
                flightNumber: item.flightNumber,
                startDest: item.startDest,
                endDest: item.endDest,
                flightDate: moment(item.flightDate.toDate()).format('DD MMMM YYYY'),
                tripId: id,
              })
            }
          >
            <View>
              <SmallHeading>{item.flightNumber}</SmallHeading>
              <Text>
                {item.startDest} to {item.endDest} {moment(item.flightDate.toDate()).format('DD MMMM YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.box}>
        <SmallHeading>Accomodation</SmallHeading>

        {accomDetails.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() =>
              navigation.navigate("accomdetails", {
                accomId: item.id,
                name: item.name,
                address: item.address,
                date: moment(item.date.toDate()).format('DD MMMM YYYY'),
                endDate: moment(item.endDate.toDate()).format('DD MMMM YYYY'),
                tripId: id,
              })
            }
          >
            <View>
              <SmallHeading>{item.name}</SmallHeading>
              <Text>
              {moment(item.date.toDate()).format('DD MMMM YYYY')} to {moment(item.endDate.toDate()).format('DD MMMM YYYY')}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      
      </View>

      <View style={styles.box}>
        <SmallHeading>Attractions</SmallHeading>


        {attractionDetails.map((item) => 
        
          <TouchableOpacity
            key={item.id}
            style={styles.container}
            onPress={() =>
              navigation.navigate("attractiondetails", {
                attractionId: item.id,
                tripId: id,
              })
            }
          >
        <View>
        <SmallHeading>{item.description}</SmallHeading>
        <Text>
          {item.location} 
        </Text>
      </View>
      </TouchableOpacity>
       )}

     
      </View>

      <Button title="delete trip" onPress={() => deleteHandler(id)} />
    </ScrollView>
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
    margin: 5,
  },
});
