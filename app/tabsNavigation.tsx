import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Map from "./views/panel/map";
import Chat from "./views/panel/chat";
import Ranking from "./views/panel/ranking";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
const Tab = createMaterialTopTabNavigator();

//Funcion para crear una navegacion de pestañas 
export default function MyTabs() {
  const { params } = useRoute();
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator swipeEnabled={false} lazy={true}>
        {/* Pestaña mapa */}
        <Tab.Screen name="Map" component={Map} initialParams={params} />
        {/* Pestaña chat */}
        <Tab.Screen name="Chat" component={Chat} initialParams={params} />
        {/* Pestaña ranking */}
        <Tab.Screen name="Ranking" component={Ranking} initialParams={params} />
      </Tab.Navigator>
    </View>
  );
}
