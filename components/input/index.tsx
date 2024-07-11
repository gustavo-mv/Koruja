import { TextInput, TextInputProps, StyleSheet } from "react-native";

export function Input({ style, ...rest }: TextInputProps) {
  return <TextInput style={[styles.input, style]} {...rest} />;
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#E4ECF3",
    height: 54,
    borderRadius: 7,
    padding: 16,
  },
});
