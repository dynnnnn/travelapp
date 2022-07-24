import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { auth } from "../database/firebase";
import { LogInContext } from "../context/LogInContext";
import firebase from "../database/firebase";
import { useEffect, useState } from "react";

function Home({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [trips, setTrips] = useState([]);
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("trips")
      .onSnapshot((collection) => {
        const data = collection.docs.map((doc) => doc.data());
        setTrips(data);
        console.log(data);
      });
    return () => unsubscribe();
  }, []);

  return (
    <View>
      <Text>{isLoggedIn ? "logged in" : "not logged in"}</Text>
      <TouchableOpacity
        style={styles.tripContainer}
        onPress={() => navigation.navigate("tripdetails")}
      >
        <View>
          <FlatList
            style={styles.gridContainer}
            data={trips}
            renderItem={(itemData) => (
              <Text>
                {itemData.item.country} {itemData.item.numberOfDays} days{" "}
                {itemData.item.date}
              </Text>
            )}
          />
        </View>
      </TouchableOpacity>

      <Button title="Add Trip" onPress={() => navigation.navigate("addtrip")} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  tripContainer: {
    padding: 10,
    margin: 10,
  },
  gridContainer: {
    padding: 30,
    margin: 10,
  },
});
