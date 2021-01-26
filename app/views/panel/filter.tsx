import React, { useEffect, useState } from "react";
import { ip } from "../../config/credenciales";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  ImageBackground,
} from "react-native";

import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { NavigationContainer, useNavigation,useRoute } from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";
import { Ruta } from "../interface/rutas";
export interface FilterProps {}

export default function Filter(props: FilterProps) {
  const [valueCiudades, setValueCiudades] = useState(null);
  const [valueVehiculo, setValueVehiculo] = useState(null);
  const [sliderValue, setSliderValue] = useState(0);
  const [itemsCiudades, setItemsCiudades] = useState([]);
  const [arrayCiudades, setArrayCiudades] = useState([]);
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [arrayRuta, setArrayRuta] = useState<Ruta[]>([]);
  const navegacion = useNavigation();
  const parametros = useRoute<any>().params;
  let controller;

  useEffect(() => {
    var ciudad = [] as any;
    var coordenada = [] as any;
    var urlCiudades = "http://" + ip + ":8080/ciudades/all";
    axios
      .get(urlCiudades)
      .then((response) => {
        return response.data;
      })
      .then((ciudades) => {
        ciudades.map((numero: any) => {
          coordenada.push({
            ciudad: numero["nombre"],
            latitude: numero["latitude"],
            longitude: numero["longitude"],
          });
          ciudad.push({ label: numero["nombre"], value: numero["nombre"] });
        });
        setArrayCiudades(coordenada);
        setItemsCiudades(ciudad);
      });
  }, []);

  function printList() {
    return arrayRuta.map((item, index) =>(
      <View key={index} style={styles.viewImage}>
        <TouchableOpacity
          onPress={() => {
            navegacion.navigate("map", {
              vehiculo:item.vehiculo,
              nombreRuta:item.nombre,
              loc:item.loc,
              latitude: latitude,
              longitude: longitude,
              idRuta:item.idRuta,
              idUsuario:parametros.usuario.id
            });
          }}
          style={styles.touchImage}
        >
          <ImageBackground
            source={{ uri: item.imagen }}
            key={index}
            style={styles.backgroundImage}
          ></ImageBackground>
          <Text style={{ fontWeight: "bold", fontSize: 20, opacity: 1 }}>
            {item["nombre"]}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 15, opacity: 1 }}>
            TIEMPO {item["tiempo"]}
            {"\n"}
          </Text>
          <Text style={{ fontWeight: "500", fontSize: 15, opacity: 1 }}>
            Dificultad {item["dificultad"]}
            {"\n"}
          </Text>
        </TouchableOpacity>
      </View>
    )
    );
  }

  const buscar = () => {
    var urlCiudadVehiculo =
      "http://" +
      ip +
      ":8080/rutas/" +
      valueCiudades +
      "&" +
      valueVehiculo +
      "&" +
      sliderValue;
    axios
      .get(urlCiudadVehiculo)
      .then((response) => {
        return response.data;
      })
      .then((rutas) => {
        var ruta: Ruta[] = [];
        rutas.map((numero: any) => {
          var img ="";
          if(numero.imagen==null){
            img="../../../assets/easter.png";
          }else{
            img = numero.imagen.thumbUrl;
          }
          ruta.push({
            idRuta:numero._id,
            nombre: numero.nombre,
            longitud: numero.longitud,
            vehiculo: numero.vehiculo,
            ciudad: numero.ciudad,
            dificultad: numero.dificultad,
            tiempo: numero.tiempo,
            imagen: img,
            loc:numero.loc
          });
        });
        setArrayRuta(ruta);
      });
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingTop: 50 }}>
      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.text}>Ciudades</Text>
          <DropDownPicker
            items={itemsCiudades}
            controller={(instance) => (controller = instance)}
            onChangeList={(items, callback) => {
              new Promise((resolve, reject) => resolve(setItemsCiudades(items)))
                .then(() => callback())
                .catch(() => {});
            }}
            defaultValue={valueCiudades}
            onChangeItem={(item) => {
              setValueCiudades(item.value);
              arrayCiudades.map((mapa) => {
                if (mapa["ciudad"] == item.value) {
                  setLatitude(mapa["latitude"]);
                  setLongitude(mapa["longitude"]);
                }
              });
            }}
          ></DropDownPicker>
          <Text style={styles.text}>Vehiculo</Text>

          <DropDownPicker
            items={[
              { label: "Andando", value: "Andando" },
              { label: "Bicicleta", value: "Bicicleta" },
              { label: "Coche", value: "Coche" },
            ]}
            controller={(instance) => (controller = instance)}
            defaultValue={valueVehiculo}
            onChangeItem={(item) => setValueVehiculo(item.value)}
          ></DropDownPicker>

          <Text style={styles.text}>KM</Text>
          <Text style={styles.text}>{sliderValue}</Text>
          <Slider
            style={{ width: 200, height: 40, alignSelf: "center" }}
            minimumValue={0}
            maximumValue={50}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            onValueChange={(value) => setSliderValue(Math.floor(value))}
          />
        </View>
        <View style={{flexDirection:"row",justifyContent:"center",flexWrap:"wrap"}}>{printList()}</View>
        <View style={styles.buttons}>
          <Button
            color="black"
            title="Buscar"
            onPress={() => {
              buscar();
            }}
          ></Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    flex: 2,
  },
  textinputs: {
    flex: 0.7,
    justifyContent: "center",
  },
  buttons: {
    marginBottom:50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius:20,
  },
  footerline: {
    flex: 0.4,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    textAlignVertical: "center",
    alignItems: "center",
  },
  footer: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    flex: 0.15,
  },
  h1: {
    fontWeight: "bold",
    fontSize: 25,
    alignSelf: "center",
  },
  h2: {
    fontSize: 15,
    alignSelf: "center",
    padding: 10,
    paddingHorizontal: 20,
    textAlign: "center",
  },
  textinput: {
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  touchImage: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  viewImage: {
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 50,
    paddingBottom: 30,
    paddingLeft:30,
  },
  backgroundImage: {
    width: 130,
    position: "absolute",
    height: 170,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
  },
});
