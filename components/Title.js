import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({children}) => {
  return (
    <View>
      <Text style={styles.title}>{children}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    title:{
        color: '#00266B',
        fontSize: 40,
        fontWeight: 'bold',
        fontFamily: 'BandaNova',
        textAlign: 'center',
        padding: 20,
        marginTop: 50,
    }
})