import { StyleSheet, TextInput, View } from 'react-native'
import React from 'react'

const Input = ({children}) => {
  return (
    <View>
      <TextInput style={styles.input}>{children}</TextInput>
    </View>
  )
}

export default Input;

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: '80%',
        padding: 20,
        margin: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 9
    }
})