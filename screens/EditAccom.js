import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React,{useState, useEffect} from 'react';
import Title from '../components/Title';
import firebase from 'firebase';
import moment from 'moment';
import DateTimePicker from "@react-native-community/datetimepicker";


const EditAccom = ({navigation, route}) => {
  const db = firebase.firestore();
  const [accomDetails, setAccomDetails] = useState({});

  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [endShow, setEndShow] = useState(false);

  

  const accomId = route.params.accomId;
  const tripId = route.params.tripId;
  console.log(accomId);
  console.log(tripId);

  async function getAccomDetails(){
    
const doc = await  db.collection("trips")
.doc(tripId)
.collection("accomodation")
.doc(accomId)
.get();

const accom = doc.data();
setAccomDetails(accom);


  }

useEffect(()=>{
  getAccomDetails();

}, [accomId, tripId]);


function onDateChange(event, selectedDate) {
  const currentDate = selectedDate || new Date(accomDetails.date.seconds*1000);
  setShow(Platform.OS === "ios");
  setAccomDetails({...accomDetails, date: currentDate} );

  let newDate = new Date(currentDate);
 
  setAccomDetails({...accomDetails, date: newDate} );
  
}

function onEndDateChange(event, selectedDate) {
  const currentDate = selectedDate || new Date(accomDetails.endDate.seconds*1000);
  setEndShow(Platform.OS === "ios");
  setAccomDetails({...accomDetails, endDate: currentDate} );

  let newEndDate = new Date(currentDate);
 
  setAccomDetails({...accomDetails, endDate: newEndDate} );
  
}





function showMode(currentMode) {
  setShow(true);
  setMode(currentMode);
}

async function updateHandler() {
  const newFlight = await firebase
    .firestore()
    .collection("trips")
    .doc(tripId)
    .collection("accomodation")
    .doc(accomId)
    .update({
      name: accomDetails.name,
      date: accomDetails.date,
      endDate: accomDetails.endDate,
      address: accomDetails.address,
    });
  navigation.navigate("tripdetails");
}




  return (
    <View>
      <Title>Edit Accom</Title>
      <Text> {accomDetails.name}</Text>

      <Button title="start date" onPress={() => setShow("date")} mode={mode} />

{show && (
  <DateTimePicker
    testID="dateTimePicker"
    value={new Date(accomDetails.date.seconds*1000)}
    is24Hour={true}
    display="default"
    onChange={onDateChange}
  />
)}

<Button title="end date" onPress={() => setEndShow("date")} mode={mode} />

{endShow && (
  <DateTimePicker
    testID="dateTimePicker"
    value={new Date(accomDetails.endDate.seconds*1000)}
    is24Hour={true}
    display="default"
    onChange={onEndDateChange}
  />
)}


<Button title="update" onPress={updateHandler} /> 
    </View>

    
  )
}

export default EditAccom

const styles = StyleSheet.create({})