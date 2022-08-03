import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Alert, Button } from "react-native";
import { useState, useLayoutEffect, useCallback, useEffect } from "react";

export default function Map({ navigation, route }) {
//   const [selectedLocation, setSelectedLocation] = useState();
const lat = route.params?.lat;
const lng = route.params?.lng;


  const region = {
    latitude: lat,
    longitude: lng,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

//   function selectLocationHandler(event) {
//     const lat = event.nativeEvent.coordinate.latitude;
//     const lng = event.nativeEvent.coordinate.longitude;

//     setSelectedLocation({ lat: lat, lng: lng });
//   }

//   const savePickedLocationHandler = useCallback(() => {
//     if (!selectedLocation) {
//       Alert.alert(
//         "No location picked!",
//         "You have to pick a location by tapping on the map first! "
//       );
//       return;
//     }
//     navigation.navigate("addattraction", {
//       pickedLat: selectedLocation.lat,
//       pickedLng: selectedLocation.lng,
//     });
//   }, [navigation, selectedLocation]);

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       headerRight: ({ tintColor }) => (
//         <Button
//           title="Save"
//           color={tintColor}
//           onPress={savePickedLocationHandler}
//         />
//       ),
//     });
//   }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
    //   onPress={selectLocationHandler}
    >
      { route.params && (
        <Marker
          title="Location"
          coordinate={{
            latitude: lat,
            longitude: lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
