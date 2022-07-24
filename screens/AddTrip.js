import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import firebase from '../database/firebase';

export default function AddTrip() {
    const [country, setCountry] = useState("");
    const [numberOfDays, setNumberOfDays] = useState("");
    const [trips, setTrips] = useState([]);
  
  
    useEffect(() => {	
      const unsubscribe = firebase	
        .firestore()	
        .collection("trips")	
        .onSnapshot((collection) => {	
          const data = collection.docs.map((doc) => doc.data());	
          setTrips(data);	
        
        });	
      return () => unsubscribe();	
    }, []);
  
  
  
    function submitHandler(){
  
    firebase.firestore().collection("trips").doc(country).set({
      country: country,
      numberOfDays: numberOfDays
    })
  
  }
  
  
  
  
  
  
  
   
  
  
    return (
      <View style={styles.container}>
        <TextInput placeholder='country' onChangeText={(text) => {setCountry(text)}}/>
        <TextInput placeholder='number of days' onChangeText={(text) => {setNumberOfDays(text)}}/>
        <Button onPress={submitHandler} title="submit"></Button>
  
        <FlatList
          data={trips}
          renderItem={(itemData) => <Text>{itemData.item.country} {itemData.item.numberOfDays}days</Text>}
          
      
        />
  
  
    
      </View>
    );
  }
  
  const styles = StyleSheet.create({
   container: {
     padding: 100
   }
  });