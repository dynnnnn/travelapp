import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import React, {useContext} from "react";
import { auth } from "../database/firebase";
import { LogInContext } from "../context/LogInContext";
import firebase from '../database/firebase';
import {useEffect, useState} from "react";

function Home({ navigation }) {

    const { isLoggedIn, setIsLoggedIn} = useContext(LogInContext);
    const [trips, setTrips] = useState([]);
    useEffect(() => {	
        const unsubscribe = firebase	
          .firestore()	
          .collection("trips")	
          .onSnapshot((collection) => {	
            const data = collection.docs.map((doc) => doc.data());	
            setTrips(data);	
          
          });	
        return () => unsubscribe();	
      }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("login");
        console.log("signed out");
        setIsLoggedIn(false);

        
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Text>{isLoggedIn ? "logged in" : "not logged in"}</Text>

      <FlatList
          data={trips}
          renderItem={(itemData) => <Text>{itemData.item.country} {itemData.item.numberOfDays}days</Text>}
          
      
        />
 
      <Button title="sign out" onPress={handleSignOut} />
      <Button title="Add Trip" onPress={()=>navigation.navigate('addtrip')} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
