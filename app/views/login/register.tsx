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
import { useNavigation } from "@react-navigation/native";
import Button from "../component/button";
import DropdownAlert from "react-native-dropdownalert";
export interface RegisterProps {}

//Funcion para el registro
export default function Register(props: RegisterProps) {
  const [nombre, setNombre] = useState("");
  const [password, setPassword] = useState("");
  const navegacion = useNavigation();
  const dropDownAlertRef = useRef<any>();

  //Funcion para registrar el usuario nuevo
  const Registrarse = () => {
    if (nombre == "") {
      //Alerta de error de que no son correctos los datos introducidos
      dropDownAlertRef.current.alertWithType(
        "error",
        "Error",
        "Los datos introducidos no son correctos"
      );
    } else {
      //Peticion a la base de datos donde le enviamos la informacion del nuevo usuario
      axios({
        method: "post",
        url: "http://" + ip + ":8080/usuario/newUsuario",
        data: {
          nombre: nombre,
          contrasena: password,
          avatar: "avatares/avatarPorDefecto.jpg",
          admin: false,
        },
      }).then(() => {
        //Alerta de que se ha registrado correctamente
        dropDownAlertRef.current.alertWithType(
          "success",
          "Correcto",
          "Se ha registrado correctamente"
        );
        //Navegacion hacia el login despues de registrarte
        setTimeout(() => {
          navegacion.navigate("login", {});
        }, 1000);
      });
    }
  };
  //Vista del registro
  return (
    <KeyboardAwareScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <DropdownAlert ref={(ref) => (dropDownAlertRef.current = ref)} />
      </View>
      <View style={styles.container}>
        <View style={styles.login}>
          <View style={styles.header}>
            <Text style={styles.h1}>Register</Text>
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
              label="Registrarse"
              onPress={Registrarse}
              width={200}
            ></Button>
            <Text>{"\n"}</Text>
            <Button
              label="Iniciar Sesion"
              onPress={() => navegacion.navigate("login", {})}
              width={200}
            ></Button>
          </View>
        </View>
        <View style={styles.footer}></View>
      </View>
    </KeyboardAwareScrollView>
  );
}

//Estilos de la vista de registro
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
