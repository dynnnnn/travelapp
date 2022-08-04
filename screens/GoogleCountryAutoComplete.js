import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { View, StyleSheet, Button, Alert } from 'react-native';
import { GOOGLE_API_KEY } from "../util/location";
import React, {useState, useLayoutEffect, useCallback} from 'react';

export default function GoogleCountryAutoComplete({navigation}){

    const [destination, setDestination] = useState();
    const [placeId, setPlaceId] = useState();

    const saveDestinationHandler = useCallback(() => {
        if (!destination) {
          Alert.alert(
            "No destination picked!",
            "You have to pick a destination first! "
          );
          return;
        }
        navigation.navigate("addtrip", {
          destination: destination,
          placeId: placeId
          
        
        });
      }, [navigation, destination]);
    
    
      useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: ({ tintColor }) => (
            <Button
              title="Add"
              color={tintColor}
              onPress={saveDestinationHandler}
            />
          ),
        });
      }, [navigation, saveDestinationHandler]);


    return (

    <View style={styles.container}>
    <GooglePlacesAutocomplete
      style={styles.textInput}
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        // console.log(data, details);
        setPlaceId(data.place_id);
        setDestination(data.description);
     
        
      }}
      query={{
        key: GOOGLE_API_KEY,
        language: "en",
        types: '(cities)',
      }}

    />
    </View>
    );
}


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