import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Button,
  TouchableHighlight,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import Modal from "react-native-modal";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");
type setModalVisibility = (visibility: boolean) => void;
type resultado = (
  acierto: boolean,
  numero: number,
  oculto: boolean,
  puntos: number
) => void;
export interface QuestionsProps {
  numeroModal: number;
  preguntas: Array<string> | null;
  respuestas: Array<Array<string>> | null;
  visibility: boolean;
  setModalVisibility: setModalVisibility;
  resultado: resultado;
  puntuacion: number;
}

export function Questions({
  numeroModal,
  preguntas,
  respuestas,
  visibility,
  setModalVisibility,
  resultado,
  puntuacion,
}: QuestionsProps) {
  const renderDatos = ({ item, index }: { item: any; index: any }) => {
    return (
      <View style={{ paddingBottom: 10 }}>
        <TouchableOpacity
          style={styles.vista}
          key={index}
          onPress={() => {
            setModalVisibility(!visibility);
            if (index == 0) {
              resultado(true, numeroModal, false, puntuacion);
            } else {
              resultado(false, numeroModal, false, puntuacion);
            }
          }}
        >
          <Text style={{ fontSize: 15 }} key={index}>
            {item}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  if (preguntas == null || respuestas == null) {
    return null;
  }
  const random = Math.floor(Math.random() * preguntas.length);
  return (
    <View style={styles.modalContainer}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        {preguntas[random]}
        {"\n"}
      </Text>
      <FlatList
        data={respuestas[random]}
        renderItem={renderDatos}
        keyExtractor={(item, index) => item + index}
      ></FlatList>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    margin: 22,
    width: window.width - 60,
    height: window.height - 100,
    backgroundColor: "white",
    paddingBottom: 20,
  },
  modalText: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    margin: 22,
    width: window.width - 60,
    height: window.height - 100,
  },
  vista: {
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign: "center",
    width: window.width - 100,
    height: 100,
    shadowColor: "rgba(0,0,0, .4)",
    shadowOffset: { height: 1, width: 1 },
    shadowOpacity: 1,
    shadowRadius: 1,
    backgroundColor: "#fff",
    elevation: 2,
    borderRadius: 20,
  },
});
