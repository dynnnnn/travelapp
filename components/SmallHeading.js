import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SmallHeading = ({children}) => {
  return (
    <View>
      <Text style={styles.heading}>{children}</Text>
    </View>
  )
}

export default SmallHeading;

const styles = StyleSheet.create({
    heading:{
        fontSize: 20,
        marginTop: 10,
    }
})