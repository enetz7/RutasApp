import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Map from "./views/panel/map";
import Chat from "./views/panel/chat";
import Ranking from "./views/panel/ranking";
import { useRoute } from "@react-navigation/native";
import { View } from "react-native";
import Constants from "expo-constants";
const Tab = createMaterialTopTabNavigator();

export default function MyTabs() {
  const { params } = useRoute();
  return (
    <View style={{ marginTop: Constants.statusBarHeight, flex: 1 }}>
      <Tab.Navigator swipeEnabled={false}>
        <Tab.Screen name="Map" component={Map} initialParams={params} />
        <Tab.Screen name="Chat" component={Chat} initialParams={params}/>
        <Tab.Screen name="Ranking" component={Ranking} initialParams={params} />
      </Tab.Navigator>
    </View>
  );
}
