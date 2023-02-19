import { StyleSheet, Text, View, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import Title from '../components/Title';
import firebase from "firebase";
// import moment from 'moment';
// import Style from"../components/Styles";


const AccomDetails = ({navigation, route}) => {
    const db = firebase.firestore();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [tripId, setTripId] = useState("");
    const [accomId, setAccomId] = useState("");
 

    function getDetails() {
        const accomId = route.params.accomId;
        const name = route.params.name;
        const sDate = route.params.date;
        const eDate = route.params.endDate;
        const address = route.params.address;
        const tripId = route.params.tripId;
     
        setAccomId(accomId);
        setName(name);
        setStartDate(sDate);
        setEndDate(eDate);
        setAddress(address);
        setTripId(tripId);
        console.log(tripId);
        console.log(startDate);
    
    
      }
    
      useEffect(() => {
        getDetails();
      }, []);


      async function deleteAccomHandler(id) {

    
        await db.collection("trips").doc(tripId).collection("accomodation").doc(id).delete();
        navigation.navigate("home");
      }
    



  return (
    <View>
      <Title>Accom Details</Title>
      <Text>Accomodation Name: {name}</Text>
      <Text>Start Date: {startDate}</Text>
      <Text>End Date: {endDate}</Text>
     
   
     
      <Text>Address: {address}</Text>

      <Button title="edit" onPress={()=> navigation.navigate("editaccom", {
            accomId: accomId,
            tripId: tripId
           
          })}/>

      <Button title="delete" onPress={() =>deleteAccomHandler(accomId)}/>
      
    </View>
  )
}

export default AccomDetails

const styles = StyleSheet.create({
    container:{
      flex: 1,
      padding: 24,
      paddingBottom: 96,
      justifyContent: 'center',
      alignItems: 'center',
    },

    title:{
      fontSize: 30,
      fontFamily: 'BandaNova-Bold',
      textAlign: 'center',
    },

    text: {
      fontSize: 20,
      fontFamily: 'BandaNova-Book',
      textAlign: 'center',

    },

    button  : {
      backgroundColor: '#00266B',
      borderRadius: 30,
      alignItems: 'center'  
    },
    
  
})