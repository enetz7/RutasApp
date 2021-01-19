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
export interface QuestionsProps {
  preguntas: Array<string> | null;
  respuestas: Array<Array<string>> | null;
  visibility: boolean;
  setModalVisibility: setModalVisibility;
}

export function Questions({
  preguntas,
  respuestas,
  visibility,
  setModalVisibility,
}: QuestionsProps) {
  const renderDatos = ({ item, index }: { item: any; index: any }) => {
    return <Text key={index}>{item}</Text>;
  };
  if (preguntas == null || respuestas == null) {
    return null;
  }
  const random = Math.floor(Math.random() * preguntas.length);
  return (
    <View style={styles.modalContainer}>
      <Text>{preguntas[random]}</Text>
      <FlatList
        data={respuestas[random]}
        renderItem={renderDatos}
        keyExtractor={(item, index) => item + index}
      ></FlatList>
      <Button
        color="black"
        onPress={() => {
          setModalVisibility(!visibility);
        }}
        title="Hide Modal"
      />
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
  },
  modalButton: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    margin: 22,
    width: window.width - 60,
    height: window.height - 100,
  },
});
