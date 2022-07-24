import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { NavigationContainerRefContext } from '@react-navigation/native'

const TripDetails = ({navigation}) => {
  return (
    <View>
      <Text>Flight Details</Text>

      <Button title="add flight" onPress={()=> navigation.navigate("addflight")}/>

      <Text>Itinerary</Text>
    </View>
  )
}

export default TripDetails

const styles = StyleSheet.create({})