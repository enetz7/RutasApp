import React, { useEffect, useState } from "react";
import { ip } from "../../config/credenciales";
import { StyleSheet, View } from "react-native";

import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Carta } from "./ranking/carta";
import { useRoute } from "@react-navigation/native";
import { MapNavigation } from "../interface/mapNavigation";

export interface RankingProps {}

export default function Ranking(props: RankingProps) {
  const [puntuaciones, setPuntuaciones] = useState([]);
  const parametros = useRoute<MapNavigation>().params;
  function ranking() {
    return (
      <View>
        <FlatList
          data={puntuaciones}
          keyExtractor={(item, index) => item.usuario + index}
          renderItem={renderCarta}
        ></FlatList>
      </View>
    );
  }

  const renderCarta = ({ item, index }: { item: any; index: any }) => {
    return (
      <Carta
        puntuacion={item.puntos}
        ruta={item.ruta}
        usuario={item.usuario}
        indice={index}
      ></Carta>
    );
  };

  useEffect(() => {
    var puntos = [] as any;
    var urlPuntuaciones =
      "http://" + ip + ":8080/puntuaciones/all/" + parametros.idRuta;
    axios
      .get(urlPuntuaciones)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .then((puntuacion) => {
        puntuacion.map((numero: any) => {
          puntos.push({
            usuario: numero["usuario"],
            puntos: numero["puntuacion"],
            ruta: numero["ruta"],
          });
        });
        setPuntuaciones(puntos);
      });
  }, []);

  return <View>{ranking()}</View>;
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
