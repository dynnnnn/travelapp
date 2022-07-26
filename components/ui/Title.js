import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

function Title({children})  {
  return (
    <Text style={styles.title}>{children}</Text>
  )
}

export default Title

const styles = StyleSheet.create({
    title:{
        fontSize: 30
    }
})