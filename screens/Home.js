import { StyleSheet, Text, View, Button } from "react-native";
import React, {useContext} from "react";
import { auth } from "../database/firebase";
import { LogInContext } from "../context/LogInContext";

function Home({ navigation }) {

    const { isLoggedIn, setIsLoggedIn} = useContext(LogInContext);

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
 
      <Button title="sign out" onPress={handleSignOut} />
      <Button title="Add Trip" onPress={()=>navigation.navigate('addtrip')} />
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({});
