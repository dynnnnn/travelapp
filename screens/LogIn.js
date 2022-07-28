import React, { useState, useContext } from "react";
import { auth } from "../database/firebase";
import firebase from "firebase/app";
import { LogInContext } from "../context/LogInContext";

import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native";

function LogIn({ navigation }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(LogInContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLogIn, setIsLogIn] = useState(true);

  function handleSignUp() {
    if (password === confirmPassword) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          console.log("Registered with:", user.email);
          navigation.navigate("loggedInBottomTab");

          setEmail("");
          setPassword("");
          setIsLoggedIn(true);
        })
        .catch((error) => alert(error.message));
    }
  }
  function handleLogin() {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("Logged in with:", user.email);
        navigation.navigate("loggedInBottomTab");
        setIsLoggedIn(true);
        setEmail("");
        setPassword("");
      })
      .catch((error) => alert(error.message));
  }

  return (
    <View style={styles.container}>
      <Text > Hi Gorgeous!</Text>
      <Text style={styles.title}>{isLogIn ? "Log In" : "Sign Up"}</Text>
      <TextInput
        placeholder="email"
        value={email}
        onChangeText={(email) => setEmail(email)}
      />
      <TextInput
        placeholder="password"
        value={password}
        secureTextEntry={true}
        onChangeText={(pw) => setPassword(pw)}
      />
      {isLogIn ? (
        <View />
      ) : (
        <View>
          <TextInput
            placeholder="Confirm Password:"
            secureTextEntry={true}
            onChangeText={(pw) => setConfirmPassword(pw)}
          />
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={isLogIn ? handleLogin : handleSignUp}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={isLogIn ? handleLogin : handleSignUp}
        ></TouchableOpacity>
        <Text style={styles.buttonText}>{isLogIn ? "Log In" : "Sign Up"} </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setIsLogIn(!isLogIn)}>
        <Text style={styles.signuptext}>
          {" "}
          {isLogIn
            ? "No account? Sign up now."
            : "Already have an account? Log in here."}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default LogIn;

const styles = StyleSheet.create({
  signuptext: {
    fontSize: 20,
    padding: 100,
  },
  button: {
    backgroundColor: "#00266B",
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "400",
    fontSize: 15,
    margin: 15,
    color: "white",
  },
});
