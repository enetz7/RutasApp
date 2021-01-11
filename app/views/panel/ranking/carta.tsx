import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { Usuario } from "../../interface/usuario";
export interface CartaProps {
  usuario: Usuario;
  indice: number;
  puntuacion: number;
  ruta: string;
}

export function Carta(props: CartaProps) {
  const image = "./avatares/avatarPorDefecto.jpg";
  let RankingStyle;
  if(props.indice==0){
    RankingStyle=styles.vistaPrimero;
  }else if(props.indice==1){
    RankingStyle=styles.vistaSegundo;
  }else if(props.indice==2){
    RankingStyle=styles.vistaTercero;
  }else{
    RankingStyle=styles.vista;
  }
  return (
    
    <View style={RankingStyle}>
      <Image style={{ width: 50, height: 50 }} source={require(image)}></Image>
      <Text>{props.usuario.nombre}</Text>
      <Text style={styles.textoPuntuacion}>{props.puntuacion}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  texto: {
    fontSize: 15,
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  vista: {
    backgroundColor: "white",
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
  vistaPrimero:{
    backgroundColor: "#FFE347",
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    borderColor:"yellow",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
  vistaSegundo:{
    backgroundColor: "grey",
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    borderColor:"grey",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
  vistaTercero:{
    backgroundColor: "brown",
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    borderColor:"brown",
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
  textoPuntuacion: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
    textAlign: "right",
  },
});
