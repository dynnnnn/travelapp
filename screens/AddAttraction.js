import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Image,
} from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../components/Title";
import firebase from "firebase";
import DateTimePicker from "@react-native-community/datetimepicker";
import Style from "../components/Styles";


import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import getMapPreview, { getCoordiates } from "../util/location";
import { getAddress } from "../util/location";
import { useIsFocused } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";

const db = firebase.firestore();

const AddActivity = ({ navigation, route }) => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [ searchAddress, setSearchAddress] = useState("");
  const [ placeId, setPlaceId] = useState();
  const [ tripId, setTripId] = useState("");
 
  const [pickedLocation, setPickedLocation] = useState();

  function getTrip() {
    const id = route.params.id;
    setTripId(id);

  }

  useEffect(() => {
    getTrip();
  }, []);
  

  useEffect(() => {
if (route.params.address){
  const address = route.params.address;
  const placeId = route.params.placeId;
  setSearchAddress(address);
  setPlaceId(placeId);

}

  }, [route]);
 


async function submitHandler() {

 try{

  const newAttraction = await  db
  .collection("trips")
  .doc(tripId)
  .collection("attractions")
  .doc()
    .set({
        location: searchAddress,
        description: description,
        lat: pickedLocation.lat, 
        lng: pickedLocation.lng,
        placeId: placeId
    });

  navigation.navigate("tripdetails");
  return newAttraction;
} catch(error){
  console.log(error);
}
}




  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

 

//convert coordinates to address
  // useEffect(() => {
  //   async function handleLocation() {
  //     if (pickedLocation) {
  //       const address = await getAddress(
  //         pickedLocation.lat,
  //         pickedLocation.lng
  //       );
  //       setLocation(address);
    
  //     }
  //   }

  //   handleLocation();
  // }, [pickedLocation]);

  //convert placeId to coordinates

  useEffect(() => {
    async function getLocationCoords() {
      if (placeId) {
        const coordinates = await getCoordiates(placeId);
        console.log(coordinates);
        setPickedLocation({
          lat: coordinates.lat,
          lng: coordinates.lng,
        });
    
      }
    }

    getLocationCoords();
  }, [placeId]);

  return (
    <View>
    
      <Title>Add Attraction</Title>
      

      <View style={styles.mapPreview}>{locationPreview}</View>


      <PrimaryButton onPress={() => navigation.navigate("googleautocomplete")}>Search Location</PrimaryButton>

      <TextInput
        placeholder="name"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />

     

      <Text>{searchAddress}</Text>


      
      <PrimaryButton onPress={submitHandler}>Add</PrimaryButton>
    </View>
  );
};

export default AddActivity;

const styles = StyleSheet.create({
  mapPreview: {
    margin: 10,
    width: "100%",
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
  google:{
    flex: 1,

  }
});
