import { useRoute, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { View, Text } from "react-native";
import MapView from "react-native-maps";
import { MapNavigation } from "../interface/mapNavigation";
export interface MapProps {}

export default function Map(props: MapProps) {
  const parametros = useRoute<MapNavigation>().params;
  const latitude = Number(parametros.latitude);
  const longitude = Number(parametros.longitude);
  return (
    <View>
      <MapView
        style={{ width: 600, height: 800 }}
        region={{
          //latitude: 43.33904,
          //longitude: -1.78938,
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.02,
        }}
      />
    </View>
  );
}
