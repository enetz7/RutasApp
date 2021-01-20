import { useRoute, RouteProp } from "@react-navigation/native";
import React, { useState, useEffect, useRef } from "react";
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
  LogBox,
  Alert,
} from "react-native";
import MapView, { LatLng, Marker, Polyline } from "react-native-maps";
import Location, {
  LocationObject,
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from "expo-location";
import axios from "axios";
import { MapNavigation } from "../interface/mapNavigation";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Directions, PolyLineDirections } from "../interface/mapInterface";
import Modal from "react-native-modal";
import { Questions } from "./map/questions";
import { ip } from "../../config/credenciales";

const window = Dimensions.get("window");

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
  const [polyLine, setPolyLine] = useState<any[]>([]);
  const [marker, setMarker] = useState<any[]>([]);
  const mapref = useRef<any>(null);
  const [loading, setLoading] = useState(true);
  const [touchVisible, setTouchVisible] = useState(true);
  const [puntuacion,setPuntuacion] = useState(0);
  const [visibility, setModalVisibility] = useState(false);
  const [questionsData, setQuestionsData] = useState<any>(null);
  const [numeroModal,setNumeroModal] = useState(0)
  const [visualizarModals,setVisualizarModals] = useState<boolean[]>([]);
  const [numeroPuntos,setNumeroPuntos]=useState(0);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      (async () => {
        let { status } = await requestPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }
        setLoading(false);
        let location = await getCurrentPositionAsync({});
        setLocation(location);
        //setInterval(()=>{setGeoLocation() en la base de datos},10000)
        //setInterval(()=>{getGeoLocation() de todos los usuarios,20000 y crear markers})
        const existe = await buscarPartida();
        if(!existe){
          await iniciarRuta();
        }
        await rutes();
        await markers();
        const ciudad = {
          latitude: Number(parametros.latitude),
          longitude: Number(parametros.longitude),
          latitudeDelta: 0.015,
          longitudeDelta: 0.026,
        };
        await mapref.current.animateToRegion(ciudad, 1200);
        setInterval(() => {
          setTouchVisible(false);
        }, 2000);
        clearInterval();
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

  async function markers() {
    var marcadores: any[] = [];
    var visualizaciones: any[] = [];
    var marcas = parametros.loc as Directions[];
    marcas.map((parametro, index) => {
      visualizaciones.push(true);
      marcadores.push(
        <View key={index}>
          {parametro.oculto == 3 ? (
            <Marker
              key={index}
              coordinate={{
                latitude: parametro.latitud,
                longitude: parametro.longitud,
              }}
              onPress={() => {
                if(visualizaciones[index]){
                  setNumeroModal(index);
                  setQuestionsData({
                    preguntas: parametro.preguntas,
                    respuestas: parametro.respuestas[0],
                  });
                  setModalVisibility(!visibility);
                }
              }}
            >
              <Image
                source={require("../../../assets/bandera.png")}
                style={{ height: 50, width: 35 }}
              />
            </Marker>
          ) : (
            <Marker
              key={index}
              style={{ opacity: 0 }}
              coordinate={{
                latitude: parametro.latitud,
                longitude: parametro.longitud,
              }}
            >
              <Image
                source={require("../../../assets/bandera.png")}
                style={{ height: 50, width: 35 }}
              />
            </Marker>
          )}
        </View>
      );
    });
    setNumeroPuntos(marcadores.length)
    setVisualizarModals(visualizaciones);
    setMarker(marcadores);
  }

  async function rutes() {
    var modo = "";
    if (parametros.vehiculo == "Bicicleta") {
      modo = "cycling-regular";
    } else if (parametros.vehiculo == "Andando") {
      modo = "foot-walking";
    } else {
      modo = "driving-car";
    }
    var coordenadas: any[] = [];
    var localizaciones = parametros.loc as Directions[];
    for (var i = 0; i < localizaciones.length - 1; i++) {
      const url =
        "https://api.openrouteservice.org/v2/directions/" +
        modo +
        "?api_key=5b3ce3597851110001cf6248e30e7f7b8c944b66bc961354a6df7824&start=" +
        localizaciones[i].longitud +
        "," +
        localizaciones[i].latitud +
        "&end=" +
        localizaciones[i + 1].longitud +
        "," +
        localizaciones[i + 1].latitud;
      await axios({
        method: "get",
        url,
      }).then((response) => {
        coordenadas.push(
          <Polyline
            key={i}
            coordinates={response.data.features[0].geometry.coordinates.map(
              (cordenada: any) => {
                return { latitude: cordenada[1], longitude: cordenada[0] };
              }
            )}
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
        );
      });
      setPolyLine(coordenadas);
    }
  }

  async function buscarPartida() {
    //LogBox.ignoreLogs(['Warning: ...','Unhandled promise rejection: ...']);
    LogBox.ignoreAllLogs();
    const datos=await axios({
      method: "get",
      url:"http:" + ip + ":8080/puntuaciones/buscarPuntuacion/"+parametros.idRuta+"&"+parametros.idUsuario,
    }).then((response)=>{
      return response.data;
    })
    return datos;
  }


  async function iniciarRuta() {
    await axios({
      method: "post",
      url:"http:" + ip + ":8080/puntuaciones/newPuntuacion",
      data:{
        idRuta:parametros.idRuta,
        idUsuario:parametros.idUsuario,
        puntos:0
      }
    })
  }

  async function resultado(acierto:boolean,numero:number){
    var visuModal=visualizarModals;
    if(acierto){
      visuModal[numero]=false;
      setVisualizarModals(visuModal);
      Alert.alert("Resultado","Has acertado!!!\nPuntos restantes:"+(numeroPuntos-1))
      setNumeroPuntos(numeroPuntos-1);
      setPuntuacion(puntuacion+200);

      // await axios({
      //   method: "put",
      //   url:"http:" + ip + ":8080/puntuaciones/updatePuntuaciones/{id}&{puntos}",
      // })
    }else{
      Alert.alert("Resultado","Lo siento has fallado, \nmás suerte la proxima vez\nPuntos restantes:"+(numeroPuntos-1))
      setNumeroPuntos(numeroPuntos-1);
      visuModal[numero]=false;
      setVisualizarModals(visuModal);
    }
  }

  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View style={{ flex: 1 }} pointerEvents={touchVisible ? "none" : "auto"}>
      <MapView
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: latitudeDelta,
          longitudeDelta: longitudeDelta,
        }}
        ref={mapref}
        moveOnMarkerPress={false}
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
        {polyLine}
        {marker}
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

      <Modal
        style={styles.modalContainer}
        isVisible={visibility}
        deviceWidth={window.width}
        deviceHeight={window.height}
        animationIn={"zoomIn"}
        animationInTiming={1000}
        animationOut={"fadeOut"}
        animationOutTiming={400}
      >
        <Questions
          numeroModal={numeroModal}
          preguntas={questionsData == null ? null : questionsData.preguntas}
          respuestas={questionsData == null ? null : questionsData.respuestas}
          visibility={visibility}
          setModalVisibility={setModalVisibility}
          resultado={resultado}
        ></Questions>
      </Modal>
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
});
