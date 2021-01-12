import React, { useEffect, useState } from "react";
import { ip } from "../../config/credenciales";
import { StyleSheet, View } from "react-native";

import axios from "axios";
import { FlatList } from "react-native-gesture-handler";
import { Carta } from "./ranking/carta";

export interface RankingProps {}

export default function Ranking(props: RankingProps) {
  const [puntuaciones, setPuntuaciones] = useState([]);

  function ranking() {
    return (
      <View>
        <FlatList
          data={puntuaciones}
          keyExtractor={(item) => item.usuario}
          renderItem={renderCarta}
        ></FlatList>
      </View>
    );

    // return puntuaciones.map((item,index)=>(
    // <Text key={index} style={styles.texto}>
    //   {index}: {item["usuario"]}    Puntuacion: {item["puntos"]}
    //   {"\n"}{" "}
    // </Text>
    //));
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
    var urlPuntuaciones = "http://" + ip + ":8080/puntuaciones/all";
    axios
      .get(urlPuntuaciones)
      .then((response) => {
   
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
