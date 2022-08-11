import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react';
import Title from '../components/Title';
import Style from '../components/Styles';


const AddItinerary = () => {
  return (
    <View>
      <Title>Add Itinerary</Title>
      <TextInput placeholder='date' />
      <TextInput placeholder='hotel' />
      
    
    </View>
  )
}

export default AddItinerary

const styles = StyleSheet.create({})