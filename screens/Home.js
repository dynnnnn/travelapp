import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { auth } from "../database/firebase";

function Home({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.navigate("login");
        console.log("signed out");
        
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View>
      <Text>Home</Text>
      <Button title="sign out" onPress={handleSignOut} />
      <Button title="Add Trip" onPress={()=>navigation.navigate('addtrip')} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
