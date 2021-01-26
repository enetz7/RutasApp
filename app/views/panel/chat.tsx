import { useRoute } from "@react-navigation/native";
import React, { useRef, useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { set } from "react-native-reanimated";
import { MapNavigation } from "../interface/mapNavigation";
import useChat from "./useChat";

const window = Dimensions.get("window");
export interface ChatProps {}

export default function Chat(props: ChatProps) {
  const parametros = useRoute<MapNavigation>().params;
  const { roomId } = { roomId: parametros.nombreRuta };
  const { messages, sendMessage } = useChat(roomId);
  const flatlist = useRef<any>();
  const [newMessage, setNewMessage] = useState("");
  const handleNewMessageChange = (event: any) => {
    setNewMessage(event);
  };

  const [scrollView, setScrollView] = useState<any>();

  const handleSendMessage = () => {
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };
  React.useEffect(() => {
    flatlist.current.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={true}
    >
      <FlatList
        ref={flatlist}
        data={messages}
        renderItem={({ item, index }) =>
          item.ownedByCurrentUser ? (
            <Text key={index} style={styles.myText}>
              {item.body}
            </Text>
          ) : (
            <Text key={index} style={styles.otherText}>
              {item.body}
            </Text>
          )
        }
      ></FlatList>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.textView}
      >
        <TextInput
          style={styles.textInput}
          autoCapitalize={"none"}
          placeholder={"Mensaje"}
          onChangeText={(text: any) => handleNewMessageChange(text)}
          value={newMessage}
        />
        <View style={styles.buttons}>
          <Button
            color="black"
            title="Enviar"
            onPress={() => handleSendMessage()}
          ></Button>
        </View>
      </KeyboardAvoidingView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 0,
    marginBottom: 0,
  },
  buttons: {
    color: "black",
    right: 5,
    marginVertical: 15,
    marginLeft: 10,
  },
  textView: {
    flexDirection: "row",
  },
  textInput: {
    color: "black",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    justifyContent: "flex-start",
    marginBottom: 0,
    flexDirection: "column",
    width: window.width - 80,
  },
  myText: {
    marginTop: 10,
    fontSize: 19,
    padding: 10,
    backgroundColor: "#4ABEF1",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    alignSelf: "flex-end",
    marginRight: 10,
  },
  otherText: {
    marginTop: 10,
    fontSize: 19,
    padding: 10,
    backgroundColor: "#949698",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
});
