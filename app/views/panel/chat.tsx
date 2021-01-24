import { useRoute } from "@react-navigation/native";
import * as React from "react";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Button,
} from "react-native";
import { MapNavigation } from "../interface/mapNavigation";
import useChat from "./useChat";

export interface ChatProps {}

export default function Chat(props: ChatProps) {
  const parametros = useRoute<MapNavigation>().params;
  const { roomId } = { roomId: parametros.nombreRuta };
  const { messages, sendMessage } = useChat(roomId);
  const [newMessage, setNewMessage] = React.useState("");
  const handleNewMessageChange = (event: any) => {
    setNewMessage(event);
  };

  const handleSendMessage = () => {
    if (newMessage !== "") {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };
  React.useEffect(() => {}, [messages]);

  return (
    <View>
      <FlatList
        data={messages}
        renderItem={({ item, index }) => <Text key={index}>{item.body}</Text>}
      ></FlatList>
      <View style={styles.textinput}>
        <TextInput
          style={{ marginLeft: 10, flex: 1 }}
          autoCapitalize={"none"}
          placeholder={"Mensaje"}
          onChangeText={(text: any) => handleNewMessageChange(text)}
          value={newMessage}
        />
      </View>
      <View style={styles.buttons}>
        <Button
          color="black"
          title="Enviar"
          onPress={() => handleSendMessage()}
        ></Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttons: {
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  textinput: {
    color: "black",
    height: 50,
    borderWidth: 2,
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
});
