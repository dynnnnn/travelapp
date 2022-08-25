import { Pressable, Text, StyleSheet } from "react-native";
import style from "components/Styles";

function PrimaryButton({ onPress, children }) {
  return (
    <Pressable style={({pressed}) => [styles.button, pressed && styles.pressed]}onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    alignItems: 'center',
    backgroundColor: "#00266B",
    elevation: 2,
    borderRadius: 30
  },

  pressed: {
    opacity: 0.7,
  },
  
  text: {
    textAlign: "center",
    fontFamily: "BandaNova-Book",
    fontSize: 16,
    color: "#FFFFFF",
  },
});
