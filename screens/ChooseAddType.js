import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react';
import Title from '../components/Title';

const ChooseAddType = ({navigation, route}) => {

    const id = route.params.id;

  return (
    <View>
    <Title>Add Plan</Title>
      <Button title="add flight" onPress={() => navigation.navigate("addflight", { id: id })} />
      <Button title="add accomodation" onPress={() => navigation.navigate("addaccom", { id: id })} />
      <Button title="add attraction" onPress={() => navigation.navigate("addattraction", { id: id })} />

    </View>
  )
}

export default ChooseAddType

const styles = StyleSheet.create({})