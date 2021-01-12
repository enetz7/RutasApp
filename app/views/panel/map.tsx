import { useRoute, RouteProp } from "@react-navigation/native";
import React, {
  useState,
  useEffect,
  useRef,
  RefObject,
  MutableRefObject,
} from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import Location, {
  LocationObject,
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import axios from "axios";
import { MapNavigation } from "../interface/mapNavigation";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Directions } from "react-native-gesture-handler";

export interface MapProps {}

export default function Map(props: MapProps) {
  const local: LocationObject = {
    coords: {
      latitude: 43.3415452,
      longitude: -1.7945859,
      altitude: 0,
      accuracy: 0,
      altitudeAccuracy: 0,
      heading: 0,
      speed: 0,
    },
    timestamp: 0,
  };

  const parametros = useRoute<MapNavigation>().params;
  const [location, setLocation] = useState<LocationObject>(local);
  const [errorMsg, setErrorMsg] = useState(String);
  const [latitudeDelta, setLatitudeDelta] = useState(41.3415452);
  const [longitudeDelta, setLongitudeDelta] = useState(-0.0145859);
  const [latitude, setLatitude] = useState(40);
  const [longitude, setLongitude] = useState(10);
  const [zoom, setZoom] = useState(false);
  const [directions,setDirection] = useState(false);
  const [polyLine,setPolyLine] = useState<any>(null);
  const mapref = useRef<any>(null);
  

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        let { status } = await requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        let location = await getCurrentPositionAsync({});
        setLocation(location);
        rutes();
        const ciudad = {
          latitude: Number(parametros.latitude),
          longitude: Number(parametros.longitude),
          latitudeDelta: 0.015,
          longitudeDelta: 0.026,
        };
        await mapref.current.animateToRegion(ciudad, 1200);
      })();
    }
    return function cleanup() {
      mounted = false;
    };
  }, []);

  async function gotToCenter() {
    let location = await getCurrentPositionAsync({});

    const region3 = {
      latitude: Number(location.coords.latitude - 0.0007),
      longitude: Number(location.coords.longitude + 0.00135),
      latitudeDelta: 0.008,
      longitudeDelta: 0.008,
    };
    await mapref.current.animateToRegion(region3, 2000);
  }

  function addZoom() {
    setZoom(true);
    if (latitudeDelta < 0.005) {
      setLatitudeDelta(latitudeDelta);
      setLongitudeDelta(longitudeDelta);
    } else {
      setLatitudeDelta(latitudeDelta * 0.8);
      setLongitudeDelta(longitudeDelta * 0.8);
    }
  }

  function removeZoom() {
    setZoom(true);
    setLatitudeDelta(latitudeDelta * 1.2);
    setLongitudeDelta(longitudeDelta * 1.2);
  }


  function rutes(){
    if(!directions){
    axios({
      method: "get",
      url:"https://api.openrouteservice.org/v2/directions/foot-walking?api_key=5b3ce3597851110001cf6248e30e7f7b8c944b66bc961354a6df7824&start=-1.7945859,43.341084&end=-1.797485,43.339382"
    }).then((response)=>{
      console.log(response.data.features[0].geometry.coordinates)
      setDirection(true);
      setPolyLine(<View><Polyline
        coordinates={response.data.features[0].geometry.coordinates.map((cordenada:any)=>{
           return {latitude:cordenada[1],longitude:cordenada[0]}
        })}
          strokeColor="#B24112"
          strokeColors={[
            "#7F0000",
            "#00000000",
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          strokeWidth={6}
          
        ></Polyline><Polyline

        coordinates={[
          { latitude: 43.141084, longitude: -1.597485 },
          { latitude: 43.339382, longitude: -1.789343 },
        ]}
          strokeColor="#B24112"
          strokeColors={[
            "#7F0000",
            "#00000000",
            "#B24112",
            "#E5845C",
            "#238C23",
            "#7F0000",
          ]}
          strokeWidth={6}
          
        ></Polyline>
        </View>)
    }
    )
  }
  }


  return (
    <View style={{ flex: 1 }}>
      <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        ref={mapref}
        style={{ width: 600, height: 800 }}
        onRegionChangeComplete={(zona) => {
          if (!zoom) {
            setLatitude(zona.latitude);
            setLongitude(zona.longitude);
            setLatitudeDelta(zona.latitudeDelta);
            setLongitudeDelta(zona.longitudeDelta);
          } else {
            setZoom(false);
          }
        }}
        showsUserLocation={true}
      >
        <Marker
          coordinate={{ latitude: 43.3415452, longitude: -1.7945859 }}
          title="Babu MC"
          description="Un molusco hambriento"
        >
          <Image
            source={require("../../../assets/babu.png")}
            style={{ height: 5, width: 5 }}
          />
        </Marker>

        <Marker
          coordinate={{ latitude: 43.341084, longitude: -1.797485 }}
          title="Puente Irun"
          description="Aqui me encontre un calcetin"
        >
          <Image
            source={require("../../../assets/bandera.png")}
            style={{ height: 50, width: 35 }}
          />
        </Marker>
        <Marker
          coordinate={{ latitude: 43.339382, longitude: -1.789343 }}
          title="El callejon"
          description="Sus"
        >
          <Image
            source={require("../../../assets/bandera.png")}
            style={{ height: 50, width: 35 }}
          />
        </Marker>
        {polyLine}
      </MapView>
      <TouchableOpacity
        onPress={() => {
          gotToCenter();
        }}
        style={styles.centerButtonContainer}
      >
        <MaterialIcons name="my-location" size={28} color="black" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => addZoom()} style={styles.zoomButtonAdd}>
        <Ionicons name="add" size={23} color="black" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => removeZoom()}
        style={styles.zoomButtonRemove}
      >
        <Ionicons name="remove" size={23} color="black" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => rutes()}
        style={styles.centerButtonContainer}
      >
        <Ionicons name="remove" size={23} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  centerButtonContainer: {
    width: 60,
    height: 60,
    position: "absolute",
    bottom: 30,
    right: 10,
    borderColor: "#191919",
    borderWidth: 0,
    borderRadius: 30,
    backgroundColor: "#d2d2d2",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    opacity: 0.9,
  },
  carousel: {
    position: "absolute",
    bottom: 25,
  },
  zoomButtonAdd: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 10,
    right: 10,
    borderColor: "#191919",
    borderWidth: 0,

    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    opacity: 0.9,
  },

  zoomButtonRemove: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 51,
    right: 10,
    borderColor: "#191919",
    borderWidth: 0,

    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.48,
    shadowRadius: 11.95,
    elevation: 18,
    opacity: 0.9,
  },
});
