import { StyleSheet } from 'react-native';



export const Styles = {

 container: {
     flex: 1,
     padding: 24,
     backgroundColor: "#FFFFFF",
     justifyContent:"center",
  },

 button: {
    backgroundColor: '#00266B',
    borderRadius: 55,
    width: "50%",
    alignItems: "center",
    fontFamily: "BandaNova-Book",
 },

 buttonText: { 
    fontSize: 20, 
    margin: 10,
    color: "#FFFFFF",
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
    color: "#00266B",
    fontFamily: "BandaNova-Book",
    fontSize: 30,
 },

  header: {
    backgroundColor: "#00266B",
    height: 100,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowRadius: 5,
 },

  headerTitle: {
    fontSize: 40,
    color: "#FFFFFF",
    fontFamily: "BandaNova",
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
    fontFamily:"BandaNova-Bold",
    alignItems: "center",
    color: "#FFFFFF",
  },
  
 headerTint: "#00266B",
};
