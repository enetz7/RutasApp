import * as React from "react";
import { Text, StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export interface ButtonProps {
  label: string;
  onPress: () => void;
  width: number;
}

//Boton personalizado para todos los botones de la aplicacion
const Button = ({ label, width, onPress }: ButtonProps) => {
  return (
    <RectButton
      style={[styles.container, { width, backgroundColor: "black" }]}
      {...{ onPress }}
    >
      <Text style={[styles.label, { color: "white" }]}>{label}</Text>
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
  },
  label: {
    fontSize: 15,
  },
});
export default Button;
