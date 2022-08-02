import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const AttractionDetails = ({navigation, route}) => {

  const attractionId = route.params?.attractionId;
  const tripId = route.params?.tripId;
  console.log(attractionId);
  console.log(tripId);

  return (
    <View>
      <Text>Attraction Details</Text>
    </View>
  )
}

export default AttractionDetails

const styles = StyleSheet.create({})