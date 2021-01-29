import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { ip } from "../../config/credenciales";
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://" + ip + ":4000";

const useChat = (roomId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<any>();

  //Coger la id de la sala a la que vas a conectar
  useEffect(() => {
    setMessages([]);
    socketRef.current = io(SOCKET_SERVER_URL, {
      query: { roomId },
    });

    //Realizar la conexion a la sala
    socketRef.current.on("connect", () => {
      socketRef.current.connect();
    });
    //Funcion donde coge los nuevos mensajes que llegan
    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: any) => {
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages: any) => [...messages, incomingMessage]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [roomId]);

  //Funcion para enviar un mensaje a la sala
  const sendMessage = (messageBody: any) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
