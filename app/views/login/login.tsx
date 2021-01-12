import React, { useState } from "react";
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

export interface LoginProps {}

export default function Login(this: any, props: LoginProps) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("PRUEBA DE ERROR");
  const [mostrarError, setMostrarError] = useState(false);
  const navegacion = useNavigation();

  const onFinish = () => {
    var urlNick = "http://" + ip + ":8080/usuario/" + nombre;
    if (nombre == "") {
      setError("COMPPUEBA LOS DATOS INTRODUCIDOS");
      setMostrarError(true);
    } else {
      axios
        .get(urlNick)
        .then((response) => {
          console.log(response.data);
          return response.data[0];
        })
        .then((usuarios) => {
          if (usuarios == null) {
            setError("El usuario introducido no existe");
            setMostrarError(true);
          } else {
            setError("");
            setMostrarError(false);
            console.log(usuarios["contrasena"]);
            if (password === usuarios["contrasena"]) {
              console.log("HAY QUE LOGUEAR AL USUARIO");
              navegacion.navigate("filter", {});
            } else {
              setError("COMPRUEBA LOS DATOS INTRODUCIDOS");
              setMostrarError(true);
            }
          }
          //console.log('USUARIOS:', usuarios);
        });
    }
  };

  const Registrarse = () => {
    navegacion.navigate("register", {});
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <KeyboardAwareScrollView style={{ flex: 1, paddingTop: 100 }}>
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
              color="black"
              title="Iniciar Sesion"
              onPress={() => onFinish()}
            ></Button>
            <Text>{"\n"}</Text>
            <Button
              color="black"
              title="Registrarse"
              onPress={() => {
                Registrarse();
              }}
            ></Button>
          </View>
        </View>
        <View style={styles.footer}></View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
