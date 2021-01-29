import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Login from "./views/login/login";
import Register from "./views/login/register";
import Filter from "./views/panel/filter";
import MyTabs from "./tabsNavigation";

export interface NavegationProps {}

//Funcion para crear la navegacion de la aplicacion
export function Navegation(props: NavegationProps) {
  const root = createStackNavigator();
  return (
    //Pantalla de login
    <NavigationContainer>
      <root.Navigator initialRouteName="login">
        <root.Screen
          name="login"
          component={Login}
          options={{ headerShown: false }}
        />
        {/* Pantalla de registro */}
        <root.Screen
          name="register"
          component={Register}
          options={{ headerShown: false }}
        />
        {/* Pantalla del mapa */}
        <root.Screen
          name="map"
          component={MyTabs}
          options={{ headerShown: false }}
        />
        {/* Pantalla de filter */}
        <root.Screen
          name="filter"
          component={Filter}
          options={{ headerShown: false }}
        />
      </root.Navigator>
    </NavigationContainer>
  );
}
