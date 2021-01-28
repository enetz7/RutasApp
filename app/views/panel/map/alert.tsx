import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
} from "react-native";
import Modal from "react-native-modal";
import Button from "../../component/button";
type setAlertVisibility = (visibility: boolean) => void;

export interface AlertProps {
    titulo:string;
    mensaje:string;
    modo:string;
    visibility: boolean;
    setAlertVisibility: setAlertVisibility;
  }
  
export function Alert({titulo,mensaje,modo,visibility,setAlertVisibility}: AlertProps) {

    if(titulo==null || mensaje==null || modo==null){
        return null;
    }
    return (
        <View>
            <View>
                <Text>{titulo}</Text>
            </View>
            <View>
                {modo=="Correcto"?
                <ImageBackground
                    source={require("../../../../assets/acierto.png")}
                    style={{ height: 20, width: 20 }}
                />
                :
                <ImageBackground
                source={require("../../../../assets/incorrecto.png")}
                style={{ height: 20, width: 20 }}
            />}
                <Text>{mensaje}</Text> 
            </View>
            <View>
                <Button 
                    label={"Aceptar"}
                    width={200}
                    onPress={()=>setAlertVisibility(!visibility)}
                />
            </View>
        </View>
    );
}

