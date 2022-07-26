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

const db = firebase.firestore();

function Home({ navigation }) {
  const db = firebase.firestore();

  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [trips, setTrips] = useState([]);


//get data
  useEffect(() => {
    const unsubscribe = db.collection("trips").onSnapshot((collection) => {
      const data = collection.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTrips(data);
      console.log(data);
    
    });
    return () => unsubscribe();
  }, []);


  function renderItem({ item }) {
    return (
      <TouchableOpacity style={styles.tripContainer}
        onPress={() => navigation.navigate("tripdetails", { id: item.id, country: item.country })}
      >
        <View>
          <Text>{item.country}</Text>
          <Text>{item.date}</Text>
          <Text>{item.numberOfDays}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <TouchableOpacity
        style={styles.tripContainer}
        onPress={() => navigation.navigate("tripdetails")}
      >
        <View>
          <FlatList
            keyExtractor={(item) => item.id}
            data={trips}
            renderItem={renderItem}
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
    margin: 20,
  },
});
