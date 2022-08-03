import React, {useState, useCallback, useLayoutEffect, useEffect} from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_API_KEY } from "../util/location";
import { StyleSheet, View, Button } from "react-native";


// import Geolocation from 'react-native-geolocation-service';

const GooglePlacesInput = ({navigation}) => {
  const [address, setAddress] = useState("");
  const [placeId, setPlaceId] = useState();


  // function componentDidMount() {
  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //         (position) => {
  //           console.log(position);
  //         },
  //         (error) => {
  //           // See error code charts below.
  //           console.log(error.code, error.message);
  //         },
  //         { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  //     );
  //   }
  // }

  // useEffect(() => {
  //   componentDidMount();
  // }, [])

  

  const savePickedLocationHandler = useCallback(() => {
    if (!address) {
      Alert.alert(
        "No location picked!",
        "You have to pick a location first! "
      );
      return;
    }
    navigation.navigate("addattraction", {
      address: address,
      placeId: placeId
    
    });
  }, [navigation, address]);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Button
          title="Save"
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);
  
  return (
      <View style={styles.container}>
    <GooglePlacesAutocomplete
      style={styles.textInput}
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
        setAddress(data.description);
        setPlaceId(data.place_id);
        
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: "en",
      }}
      // currentLocation={true}
      // currentLocationLabel='Current location'
    />
    </View>
  );
};

export default GooglePlacesInput;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: '100%'
  },
  textInput: {
      height: 50,
      backgroundColor: '#eee',
      marginVertical: 5
  }
});
