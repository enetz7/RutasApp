import { useRoute, RouteProp } from "@react-navigation/native";
import * as React from "react";
import { View, Text,Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
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
          latitudeDelta: 0.015,
          longitudeDelta: 0.026,
        }}>

      <Marker
        coordinate={{ latitude: 43.3415452, longitude: -1.7945859 }}
        title="Babu MC"
        description="Un molusco hambriento"
        >

        <Image source={require('../../../assets/babu.png')} style={{height: 5, width:5}} />

        </Marker>


        <Marker
        coordinate={{ latitude: 43.341084, longitude: -1.797485 }}
        title="Puente Irun"
        description="Aqui me encontre un calcetin"
        >

        <Image source={require('../../../assets/bandera.png')} style={{height: 50, width:35}} />

        </Marker>
      <Marker
        coordinate={{ latitude:43.339382, longitude: -1.789343 }}
        title="El callejon"
        description="Sus"
        
      >
        <Image source={require('../../../assets/bandera.png')} style={{height: 50, width:35}} />
        </Marker>
        

        <Polyline
        coordinates={[
          { latitude: 43.341084, longitude: -1.797485 },
          { latitude: 43.339382, longitude: -1.789343 }
        ]}
        strokeColor="#B24112" // fallback for when `strokeColors` is not supported by the map-provider
        strokeColors={[
          '#7F0000',
          '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
          '#B24112',
          '#E5845C',
          '#238C23',
          '#7F0000'
        ]}
        strokeWidth={6}>

        </Polyline>

       
     </MapView>
    </View>
  );
}
