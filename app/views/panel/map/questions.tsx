import React, { useEffect, useState } from "react";
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
    FlatList
  } from "react-native";
  import Modal from 'react-native-modal';

const window = Dimensions.get('window');
const screen = Dimensions.get('screen');
export interface QuestionsProps {
    index:number;
    preguntas:Array<string>;
    respuestas:Array<Array<string>>;
}

export function Questions(props: QuestionsProps) {

    const [visibility, setModalVisibility] = useState<boolean[]>([false]);
    const renderDatos = (({item,index}: { item: any; index: any })=>{
        return(
            <Text key={index}>{item}</Text>         
        )
    })
    const random = Math.floor(Math.random() * props.preguntas.length);
    return(
        <Modal
            style={styles.modalContainer}
            isVisible={visibility[0]}
            deviceWidth={window.width}
            deviceHeight={window.height}
            animationIn={"zoomIn"}
            animationInTiming={1200}
            animationOut={"fadeOut"}
            animationOutTiming={1200}
            key={props.index}
            >
            <View style={styles.modalContainer}>
            <Text>{props.preguntas[random]}</Text>
            <FlatList
                data={props.respuestas[random]}
                key={props.index}
                renderItem={renderDatos}
            ></FlatList>
            <Button
                    color="black"
                    
                    onPress={() => {setModalVisibility([!visibility[props.index]])}}
                    title="Hide Modal"
            />
            </View>

            {/* <View style={styles.modalContainer}>
                <Text>I'm a simple Modal</Text>
                <View style={styles.modalButton}>
                <Button
                    color="black"
                    
                    onPress={() => {setModalVisibility([!visibility[0]])}}
                    title="Hide Modal"
                />
                </View>
            </View> */}
        </Modal>
    )
    
}

const styles = StyleSheet.create({
    modalContainer: {
      flex:1,
      alignItems:"center",
      textAlign:"center",
      margin:22,
      width:window.width-60,
      height:window.height-100,
      backgroundColor:"white"
    },
    modalButton:{
      flex:2,
      justifyContent: "center",
      alignItems: "center",
  
    },
    modalText:{
      flex:1,
      alignItems:"center",
      textAlign:"center",
      margin:22,
      width:window.width-60,
      height:window.height-100,
      
    }
  
  });