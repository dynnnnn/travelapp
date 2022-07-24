import React, { useState } from "react";
import { auth } from "../database/firebase";
import firebase from "firebase/app";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

function LogIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 

  function handleSignUp() {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Registered with:", user.email);
        navigation.navigate("home");
     

        setEmail("");
        setPassword("");
      })
      .catch((error) => alert(error.message));
  }
  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.navigate("home");
    
      })
      .catch((error) => alert(error.message));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        value={password}
        onChangeText={(pw) => setPassword(pw)}
      />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({});
