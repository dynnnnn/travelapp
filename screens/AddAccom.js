import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import React, {useState, useEffect} from 'react';
import Title from '../components/Title';
import firebase from 'firebase';


const db = firebase.firestore();

const AddAccom = ({navigation, route}) => {
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");

    const id = route.params.id;



        async function submitHandler() {
            const newAccom = await db
              .collection("trips")
              .doc(id)
              .collection(date)
              .doc("accomodation")
              .set({
               date: date,
               name: name,
               address: address
              });
        
            navigation.navigate("tripdetails");
          }

    

  return (
    <View>
      <Title>Add Accomodation</Title>
      <TextInput placeholder="date" value={date} onChangeText={(text) => {
          setDate(text);
        }}/>
      <TextInput placeholder="name" value={name} onChangeText={(text) => {
          setName(text);
        }}/>
      <TextInput placeholder="address" value={address} onChangeText={(text) => {
          setAddress(text);
        }}/>
      <Button title="add" onPress={submitHandler} />
    </View>
  )
}

export default AddAccom

const styles = StyleSheet.create({})