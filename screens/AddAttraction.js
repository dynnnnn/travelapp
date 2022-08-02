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
import { monthNames } from "../constants/Month";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from "expo-location";
import getMapPreview from "../util/location";
import { getAddress } from "../util/location";
import { useIsFocused } from "@react-navigation/native";
import PrimaryButton from "../components/PrimaryButton";

const db = firebase.firestore();

const AddActivity = ({ navigation, route }) => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [attractionDate, setAttractionDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [pickedLocation, setPickedLocation] = useState();
  const isFocused = useIsFocused();

  const id = route.params.id;

  async function submitHandler() {
    const newAttraction = await db
      .collection("trips")
      .doc(id)
      .collection("attractions")
      .doc()
      .set({
        date: attractionDate,
        location: location,
        description: description,
        coordinates: { lat: pickedLocation.lat, lng: pickedLocation.lng}
      });

    navigation.navigate("tripdetails");
    return newAttraction;
  }

  function onDateChange(event, selectedDate) {
    const currentDate = selectedDate || attractionDate;
    setShow(Platform.OS === "ios");
    setAttractionDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      " " +
      monthNames[tempDate.getMonth()] +
      " " +
      tempDate.getFullYear();

    setAttractionDate(fDate);
  }

  function showMode(currentMode) {
    setShow(true);
    setMode(currentMode);
  }

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions."
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMap() {
    navigation.navigate("Map");
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

  function savePlaceHandler() {
    console.log(pickedLocation);
  }

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation.lat,
          pickedLocation.lng
        );
        setLocation(address);
    
      }
    }

    handleLocation();
  }, [pickedLocation]);

  return (
    <View>
      <Title>Add Attraction</Title>

      <View style={styles.mapPreview}>{locationPreview}</View>

      <PrimaryButton onPress={getLocationHandler}>Locate User</PrimaryButton>

      <PrimaryButton onPress={pickOnMap}>Pick on Map</PrimaryButton>

      <PrimaryButton onPress={savePlaceHandler}>Save location</PrimaryButton>

      <Button title="date" onPress={() => setShow("date")} mode={mode} />

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={attractionDate}
          is24Hour={true}
          display="default"
          onChange={onDateChange}
        />
      )}

      <TextInput
        placeholder="location"
        value={location}
        onChangeText={(text) => {
          setLocation(text);
        }}
      />
      <TextInput
        placeholder="description"
        value={description}
        onChangeText={(text) => {
          setDescription(text);
        }}
      />
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
});
