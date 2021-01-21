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
type resultado = (acierto:boolean,numero:number,oculto:boolean)=>void
export interface QuestionsProps {
  numeroModal:number;
  preguntas: Array<string> | null;
  respuestas: Array<Array<string>> | null;
  visibility: boolean;
  setModalVisibility: setModalVisibility;
  resultado:resultado;
}

export function Questions({
  numeroModal,
  preguntas,
  respuestas,
  visibility,
  setModalVisibility,
  resultado
}: QuestionsProps) {
  const renderDatos = ({ item, index }: { item: any; index: any }) => {
    return(
      <TouchableOpacity 
      style={styles.vista} 
      key={index}
      onPress={()=>{
        setModalVisibility(!visibility);
        if(index==0){
          resultado(true,numeroModal,false)
        }else{
          resultado(false,numeroModal,false)
        };
        
      }}>
        <Text style={{fontSize:15}} key={index}>{item}</Text>
      </TouchableOpacity>
    )
  };
  if (preguntas == null || respuestas == null) {
    return null;
  }
  const random = Math.floor(Math.random() * preguntas.length);
  return (
    <View style={styles.modalContainer}>
      <Text style={{fontSize:20,fontWeight:"bold"}}>{preguntas[random]}{"\n"}</Text>
      <FlatList
        data={respuestas[random]}
        renderItem={renderDatos}
        keyExtractor={(item, index) => item + index}
      ></FlatList>
      {/* <Button
        color="black"
        onPress={() => {
          setModalVisibility(!visibility);
        }}
        title="Hide Modal"
      /> */}
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
  vista:{
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
    textAlign:"center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.30,

    elevation: 13,
    width:window.width - 100,
    height:100
  }
});
