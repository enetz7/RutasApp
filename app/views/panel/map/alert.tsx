import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width, height } = Dimensions.get("window");
type setAlertVisibility = (visibility: boolean) => void;

export interface AlertProps {
  titulo: string;
  mensaje: string;
  modo: string;
  visibility: boolean;
  setAlertVisibility: setAlertVisibility;
}

export function Alert({
  titulo,
  mensaje,
  modo,
  visibility,
  setAlertVisibility,
}: AlertProps) {
  if (titulo == null || mensaje == null || modo == null) {
    return null;
  }

  function onPres() {
    setAlertVisibility(!visibility);
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>{titulo}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        {modo == "Correcto" ? (
          <ImageBackground
            source={require("../../../../assets/acierto.png")}
            style={{ height: 60, width: 60, margin: 20 }}
          />
        ) : (
          <ImageBackground
            source={require("../../../../assets/incorrecto.png")}
            style={{ height: 60, width: 60, alignSelf: "center" }}
          />
        )}
      </View>
      <View
        style={{
          flex: 2,
          justifyContent: "space-around",
          alignItems: "center",
          paddingHorizontal: 10,
        }}
      >
        <Text style={styles.text}>{mensaje}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={styles.button} onPress={() => onPres()}>
          <Text style={{ color: "white" }}>Aceptar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    textAlign: "center",
    height: height / 2,
    width: (width * 2) / 3,
    backgroundColor: "white",
    borderRadius: 25,
  },
  text: {
    fontSize: 20,
  },
  button: {
    borderRadius: 25,
    height: 50,
    width: 200,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 1,
    elevation: 1,
    backgroundColor: "black",
  },
});

{
  /* <View
        style={{
          backgroundColor: modo == "Correcto" ? "green" : "red",
          paddingTop: 10,
          top: 0,
        }}
      >
        <Text style={styles.text}>{titulo}</Text>
      </View>
      <View style={{ alignItems: "center", padding: 20 }}>
        {modo == "Correcto" ? (
          <ImageBackground
            source={require("../../../../assets/acierto.png")}
            style={{ height: 70, width: 70 }}
          />
        ) : (
          <ImageBackground
            source={require("../../../../assets/incorrecto.png")}
            style={{ height: 70, width: 70, alignSelf: "center" }}
          />
        )}
        <Text style={styles.text}>{mensaje}</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={() => onPres()}>
          <Text style={{ color: "white" }}>Aceptar</Text>
        </TouchableOpacity>
      </View> */
}
