import React, { useRef, useState } from "react";
import { ip } from "../../config/credenciales";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from "react-native";
import axios from "axios";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import {
  useNavigation,
} from "@react-navigation/native";
import Button from "../component/button";
import DropdownAlert from "react-native-dropdownalert";
export interface LoginProps {}


//Funcion para loguear en la aplicacion
export default function Login(this: any, props: LoginProps) {

  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navegacion = useNavigation();
  const dropDownAlertRef = useRef<any>();


  //Funcion donde se comprueba que los datos establecidos son correctos para poder loguear
  const onFinish = () => {
    //Peticion de busqueda a la api
    var urlNick = "http://" + ip + ":8080/usuario/" + nombre;
    if (nombre == "") {
      //Alerta de que no son correctos los datos introducidos
      dropDownAlertRef.current.alertWithType(
        "error",
        "Error",
        "Los datos introducidos no son correctos"
      );
    } else {
      axios
        .get(urlNick)
        .then((response) => {
          return response.data[0];
        })
        .then((usuarios) => {
          if (usuarios == null) {
            //Alerta de que no son existe el usuario
            dropDownAlertRef.current.alertWithType(
              "error",
              "Error",
              "El usuario introducido no existe"
            );
          } else {
            if (password === usuarios["contrasena"]) {
              dropDownAlertRef.current.alertWithType(
                "success",
                "Correcto",
                "Login existoso"
              );
              //Navegacion hacia la siguiente pestaña
              setTimeout(() => {
                navegacion.navigate("filter", {
                  usuario: usuarios,
                });
              }, 1000);
            } else {
              //Alerta de que los datos introducidos no son correctos
              dropDownAlertRef.current.alertWithType(
                "error",
                "Error",
                "Los datos introducidos no son correctos"
              );
            }
          }
        });
    }
  };

  //Funcion para navegar a la ventana de registro
  const Registrarse = () => {
    navegacion.navigate("register", {});
  };

  //Vista del login
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DropdownAlert ref={(ref) => (dropDownAlertRef.current = ref)} />
      </View>
      <View style={styles.container}>
        <View style={styles.login}>
          <View style={styles.header}>
            <Text style={styles.h1}>RutasApp</Text>
            <Text>{"\n"}</Text>
          </View>
          <View style={styles.form}>
            <View style={styles.textinputs}>
              <View style={styles.textinput}>
                <TextInput
                  style={{ marginLeft: 10, flex: 1 }}
                  autoCapitalize={"none"}
                  placeholder={"Nombre"}
                  autoCompleteType={"username"}
                  onChangeText={(text) => setNombre(text)}
                  value={nombre}
                />
              </View>
              <View style={styles.textinput}>
                <TextInput
                  style={{ marginLeft: 10, flex: 1 }}
                  autoCapitalize={"none"}
                  placeholder={"Password"}
                  autoCompleteType={"username"}
                  onChangeText={(text) => setPassword(text)}
                  value={password}
                  secureTextEntry={true}
                />
              </View>
            </View>
          </View>
          <View style={styles.buttons}>
            <Button
              label="Iniciar Sesion"
              onPress={onFinish}
              width={200}
            ></Button>
            <Text>{"\n"}</Text>
            <Button
              label="Registrarse"
              onPress={Registrarse}
              width={200}
            ></Button>
          </View>
        </View>
        <View style={styles.footer}></View>
      </View>
    </KeyboardAwareScrollView>
  );
}


//Estilos de la vista del login
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  login: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    borderBottomEndRadius: 80,
    borderBottomStartRadius: 80,
    paddingHorizontal: 30,
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
    justifyContent: "center",
    alignItems: "center",
    flex: 0.9,
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
});
