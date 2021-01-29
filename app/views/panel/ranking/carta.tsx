import React from "react";
import {Text, StyleSheet, Image} from "react-native";
import { Usuario } from "../../interface/usuario";
import { LinearGradient } from "expo-linear-gradient";
//Interfaz de los datos que recibe para poder crear este componente
export interface CartaProps {
  usuario: Usuario;
  indice: number;
  puntuacion: number;
  ruta: string;
}
//Funcion para crear el ranking con sus cartas depediendo la posicion
export function Carta(props: CartaProps) {
  const image = "./avatares/avatarPorDefecto.jpg";
  let RankingStyle;
  let gradientColor = [];
  //Cambiar los estilos en funcion a tu posicion en el ranking
  if (props.indice == 0) {
    RankingStyle = styles.vistaPrimero;
    gradientColor = ["#fceabb", "#f8b500"];
  } else if (props.indice == 1) {
    RankingStyle = styles.vistaSegundo;
    gradientColor = ["#bdc3c7", "#2c3e50"];
  } else if (props.indice == 2) {
    RankingStyle = styles.vistaTercero;
    gradientColor = ["#b29f94", "#603813"];
  } else {
    RankingStyle = styles.vista;
    gradientColor = ["white", "white"];
  }
  //Vista de cada carta del ranking
  return (
    <LinearGradient
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
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

//Estilos de la carta del ranking
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
