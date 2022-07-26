import { StyleSheet, Text, View, Button } from 'react-native'
import React, {useContext} from 'react';
import { auth } from "../database/firebase";
import { LogInContext } from "../context/LogInContext";
import Title from '../components/Title';

const Account = ({navigation}) => {
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
      <Title>Account</Title>

      <Button title="sign out" onPress={handleSignOut} />
    </View>
  )
}

export default Account

const styles = StyleSheet.create({})