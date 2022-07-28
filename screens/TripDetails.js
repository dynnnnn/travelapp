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
   
  }, [id]);


  //get flight data from firestore (add try catch)

async function getFlight(){
if (id){

  try{
  const unsubscribe = await db.collection("trips").doc(id).collection("flights").onSnapshot((collection) => {
    const data = collection.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    console.log(data);
    setFlightDetails(data);
});
return () => unsubscribe();
} catch (error) {
  console.log(error);
}
}}



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

 

      <SmallHeading>Flight Details</SmallHeading>

      <View>
          <FlatList
            keyExtractor={(item) => item.id}
            data={flightDetails}
            renderItem={renderFlightDetails}
          />
        </View>



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

const styles = StyleSheet.create({
  box:{

    backgroundColor: 'grey',
    borderRadius: 5,
    width: 300,
    height: 20
  }
});
