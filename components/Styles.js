import { StyleSheet , Text, View } from 'react-native';
import React from 'react';
import * as Font from 'expo-font';




export const Styles = {

 container: {
     flex: 1,
     padding: 100,
     backgroundColor: "#FFFFFF",
     justifyContent:"center",
  },

 button: {
    backgroundColor: '#00266B',
    borderRadius: 55,
    width: "50%",
    alignItems: "center",
    
 },

 buttonText: { 
    fontSize: 20, 
    margin: 10,
    color: "#FFFFFF",
    fontWeight: 'book',
    fontFamily: "BandaNova-Book",
    alignItems: "center",
 },

 title: {
   fontSize: 50, 
   textAlign: 'center',
   fontFamily: "BandaNova-Bold",
   color: '#FFFFFF',  
 },

 content: {
   fontSize: 20,
   fontFamily: "BandaNova-Book",
   
 },

  text: {
   color: "#00266B",
   fontFamily: "BandaNova-Book",
   fontWeight: 'book',
   textAlign: "center",
 },

  textInput:{
   fontFamily: "BandaNova-Book",
   fontSize: 20,
   textAlign:"center",
   color: '#00266B',
 } ,
 
  switchText:{
   fontFamily:"BandaNova-Book",
   fontSize: 30,
   textAlign:"center",
   color: '#FFFFFF',
 },
}
 
export const lightStyles = {
 
  text: {
    textAlign: 'center',
    color: "#00266B",
    fontWeight: 'normal',
    fontFamily: "BandaNova-Book",
    fontSize: 30,
 },

  header: {
    backgroundColor: "#00266B",
    height: 100,
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.2,
    shadowRadius: 5,
 },

  headerTitle: {
    alignItems: 'center',
    fontSize: 40,
    color: "#FFFFFF",
    fontFamily: "BandaNova-Bold",
    fontWeight: "bold",
 },

  headerTint: "#FFFFFF",
};

export const darkStyles = {
  container: {
    flex: 1,
    backgroundColor: "#00266B",
 },

  text: {
    color: "#FFFFFF",
    fontWeight: "normal",
    fontFamily: "BandaNova-Book",
    fontSize: 30,
 },

  header: {
    backgroundColor: "#00266B",
    height: 100,
    shadowColor: "#FFFFFF",
    shadowOpacity: 0.2,
    shadowRadius: 5,
 },

  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily:"BandaNova-Bold",
    alignItems: "center",
    color: "#FFFFFF",
  },
  
 headerTint: "#00266B",
};
