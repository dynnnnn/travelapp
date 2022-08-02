import { Pressable, Text, StyleSheet } from "react-native";

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
    backgroundColor: "black",
    elevation: 2,
    borderRadius: 4
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    color: "white",
  },
});
