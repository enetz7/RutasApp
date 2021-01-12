import React, { useState } from "react";
import { Row } from "react-bootstrap";
import { View, Text, StyleSheet, Image, ViewStyle } from "react-native";
import { Usuario } from "../../interface/usuario";
import { LinearGradient } from 'expo-linear-gradient';
export interface CartaProps {
  usuario: Usuario;
  indice: number;
  puntuacion: number;
  ruta: string;
}

export function Carta(props: CartaProps) {
  const image = "./avatares/avatarPorDefecto.jpg";
  let RankingStyle;
  let gradientColor=[];
  if (props.indice == 0) {
    RankingStyle = styles.vistaPrimero;
    gradientColor=["#B78628","#C69320","#DBA514","#EEB609","#FCC201"];
  } else if (props.indice == 1) {
    RankingStyle = styles.vistaSegundo;
    gradientColor=["#D7D7D8","#C7C9CB","#AEB2B8","#959BA3","#848B98"];
  } else if (props.indice == 2) {
    RankingStyle = styles.vistaTercero;
    gradientColor=["#804A00","#895E1A","#9C7A3C","#B08D57"];
  } else {
    RankingStyle = styles.vista;
    gradientColor=["white","white"];
  }
  return (
    <LinearGradient
       // Button Linear Gradient
       colors={gradientColor}
       style={RankingStyle}
       >

      
      <Image
        style={{ width: 50, height: 50, borderRadius: 25 }}
        source={require(image)}
      ></Image>
      <Text>{props.usuario.nombre}</Text>
      <Text style={styles.textoPuntuacion}>{props.puntuacion}</Text>

    </LinearGradient>
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
  vistaPrimero: {
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    alignItems: "center",
    borderRadius: 10,
    borderColor: "yellow",
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
  vistaSegundo: {
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    justifyContent: "space-around",
    borderColor: "grey",
    alignItems: "center",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.9,
    elevation: 2,
  },
  vistaTercero: {
    padding: 15,
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 10,
    borderColor: "brown",
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
