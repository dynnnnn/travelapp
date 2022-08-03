import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Title from "../components/Title";
import getMapPreview from "../util/location";
import PrimaryButton from "../components/PrimaryButton";

const AttractionDetails = ({ navigation, route }) => {
  const db = firebase.firestore();
  const [attractionDetails, setAttractionDetails] = useState({});

  const attractionId = route.params?.attractionId;
  const tripId = route.params?.tripId;

  //getDetails

  async function getAttractionDetails() {
    if (attractionId && tripId){
    const doc = await db
      .collection("trips")
      .doc(tripId)
      .collection("attractions")
      .doc(attractionId)
      .get();

    const data = doc.data();
    console.log(data);
    setAttractionDetails(data);
  }
}

  useEffect(() => {
    getAttractionDetails();
  }, [attractionId, tripId]);

  let locationPreview = <Text>Getting location preview</Text>;

  if (attractionDetails) {
    locationPreview = (
      <Image
      style={styles.image}
      source={{
        uri: getMapPreview(attractionDetails.lat, attractionDetails.lng)
        ,
      }}
    />
    );
  }

  function navigateToMap(){
    navigation.navigate("Map", { lat: attractionDetails.lat, lng: attractionDetails.lng});
  }

  return (
    <View>
      <Title>Attraction Details</Title>
      <Text>{attractionDetails.description}</Text>
      <Text>{attractionDetails.location}</Text>
      <View style={styles.mapPreview}>
        
        {locationPreview}
      </View>

      <PrimaryButton onPress={navigateToMap}>Map View</PrimaryButton>
    </View>
  );
};

export default AttractionDetails;

const styles = StyleSheet.create({
  mapPreview: {
    margin: 10,
    width: "100%",
    height: 400,
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
});
