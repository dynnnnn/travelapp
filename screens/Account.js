import { StyleSheet, Text, View, Button } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../database/firebase";
import { LogInContext } from "../context/LogInContext";
import Title from "../components/Title";
import firebase from "firebase";
import Style from"../components/Styles";

const Account = ({ navigation }) => {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [user, setUser] = useState("");

  //get user info

  useEffect(() => {
    const user = firebase.auth().currentUser;
    const email = user.email;
    console.log(user.uid);
    console.log(email);
    setUser(email);
  }, []);
  //sign out

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
      <Title>Account</Title>
      <Text>{user}</Text>

      <Button title="sign out" onPress={handleSignOut} />
    </View>
  );
};

export default Account;


const styles = StyleSheet.create({});

