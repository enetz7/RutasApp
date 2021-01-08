import React, { useEffect, useState } from "react";
import { ip } from "../../config/credenciales";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TouchableOpacity,
  ToastAndroid,
  Dimensions,
  TextInput,
  Button,
} from "react-native";

import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";
import { render } from "react-dom";
import { Ruta } from "../interface/rutas";

export interface RankingProps {}

export default function Ranking(props: RankingProps) {

  const [puntuaciones,setPuntuaciones]= useState([]);

  function ranking(){
    return puntuaciones.map((item,index)=>(
    <Text key={index} style={styles.texto}>
      {index}: {item["usuario"]}    Puntuacion: {item["puntos"]}
      {"\n"}{" "}
    </Text>
    ));
  }

  useEffect(() => {
    var puntos = [] as any;
    var urlPuntuaciones = "http://" + ip + ":8080/puntuaciones/all";
    axios
      .get(urlPuntuaciones)
      .then((response) => {
        return response.data;
      })
      .then((puntuacion) => {
        puntuacion.map((numero: any) => {
          puntos.push({
            usuario: numero["idUsuario"],
            puntos: numero["puntos"],
            ruta: numero["idRuta"]
          });
        });
        setPuntuaciones(puntos);
      });
  }, []);

  return (
    <View>
      {ranking()}
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
});