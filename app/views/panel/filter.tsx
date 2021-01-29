import React, { useEffect, useState } from "react";
import { ip } from "../../config/credenciales";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";

import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import DropDownPicker from "react-native-dropdown-picker";
import Slider from "@react-native-community/slider";
import { Ruta } from "../interface/rutas";
import Button from "../component/button";

export interface FilterProps {}

//Funcion para hacer el filtro de busqueda de las rutas
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
    //Peticion a la api para recoger todas las ciudades que haya
    var urlCiudades = "http://" + ip + ":8080/ciudades/all";
    axios
      .get(urlCiudades)
      .then((response) => {
        return response.data;
      })
      .then((ciudades) => {
        //Guardar cada informacion que me interese de las ciudades en un array
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

  //Funcion para crear una carta con la imagen de la ruta y su informacion dependiendo los valores que has escogido en la busqueda
  function printList() {
    return arrayRuta.map((item, index) => (
      <View key={index} style={styles.viewImage}>
        <TouchableOpacity
          onPress={() => {
            //Pasarle a la navegacion los datos que quiero que tenga la ventana a la que voy a acceder, el mapa
            navegacion.navigate("map", {
              vehiculo: item.vehiculo,
              nombreRuta: item.nombre,
              loc: item.loc,
              latitude: latitude,
              longitude: longitude,
              idRuta: item.idRuta,
              idUsuario: parametros.usuario.id,
            });
          }}
          style={styles.touchImage}
        >
          <ImageBackground
            source={{ uri: item.imagen }}
            key={index}
            style={styles.backgroundImage}
            imageStyle={{
              borderRadius: 10,
              shadowColor: "#000",
              shadowOffset: { width: 5, height: 5 },
              shadowOpacity: 0.9,
            }}
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
    ));
  }

  //Funcion para buscar rutas dependiendo los datos que has seleccionado
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
        //Guardar los valores que me interesan de la ruta dentro de un array
        rutas.map((numero: any) => {
          var img = "";
          if (numero.imagen == null) {
            img = "../../../assets/acierto.png";
          } else {
            img = numero.imagen.thumbUrl;
          }
          ruta.push({
            idRuta: numero._id,
            nombre: numero.nombre,
            longitud: numero.longitud,
            vehiculo: numero.vehiculo,
            ciudad: numero.ciudad,
            dificultad: numero.dificultad,
            tiempo: numero.tiempo,
            imagen: img,
            loc: numero.loc,
          });
        });
        setArrayRuta(ruta);
      });
  };

  //Vista del filtro
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
        <View
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 30,
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            paddingHorizontal: 50,
          }}
        >
          {printList()}
        </View>
        <View style={styles.buttons}>
          <Button label="Buscar" onPress={buscar} width={250}></Button>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

//Estilos de la vista del filtro
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: "center",
    padding: 20,
    fontSize: 18,

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
    marginBottom: 50,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    borderRadius: 20,
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
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  backgroundImage: {
    width: 130,
    position: "absolute",
    height: 170,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.4,
    // borderRadius: 10,
    // shadowColor: "#000",
    // shadowOffset: { width: 5, height: 5 },
    // shadowOpacity: 0.9,
    // elevation: 5,
  },
});
