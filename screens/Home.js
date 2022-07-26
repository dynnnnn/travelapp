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
  const tripsCollectionRef = db.collection("trips");


//   useEffect(() => {
//       async function getTrips(){
//           const data = await 

//       }
//       getTrips();
//   }, []);

  useEffect(() => {
    const unsubscribe = db
      .collection("trips")
      .onSnapshot((collection) => {
        const data = collection.docs.map((doc) => ({ ...doc.data(), id: doc.id}));
        setTrips(data);
        console.log(data);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    db.collection("trips").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            console.log(`${doc.id}`);
<<<<<<< HEAD
      
        });
      });
   
  }, []);



=======
        });
        
       
      });

  }, []);
  
>>>>>>> 180c2b104e2f4ddd9799b440eae7c85d6c20e2f6

  return (
    <View>
     
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
