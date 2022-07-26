import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, {useState} from 'react';
import Title from '../components/Title';
import firebase from 'firebase';

const db = firebase.firestore();

const AddActivity = ({navigation, route}) => {
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [activity, setActivity] = useState("");

    const id = route.params.id;

    async function submitHandler() {
        const newActivity = await db
          .collection("trips")
          .doc(id)
          .collection(date)
          .doc()
        //   .collection("activity")
        //   .doc()
          .set({
           date: date,
           time: time,
           activity: activity
          });
    
        navigation.navigate("tripdetails");
      }


  return (
    <View>
      <Title>Add Activity</Title>

      <TextInput placeholder="date" value={date} onChangeText={(text) => {
          setDate(text);
        }}/>
      <TextInput placeholder="time" value={time} onChangeText={(text) => {
          setTime(text);
        }}/>
      <TextInput placeholder="address" value={activity} onChangeText={(text) => {
          setActivity(text);
        }}/>
      <Button title="add" onPress={submitHandler} />

    </View>
  )
}

export default AddActivity

const styles = StyleSheet.create({})