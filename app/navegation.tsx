import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { View, Text } from 'react-native';
import Login from './views/login/login';
import  Map  from './views/panel/map';
import Register from './views/login/register';

export interface NavegationProps {
}

export function Navegation (props: NavegationProps) {
    const root = createStackNavigator();
    return (
     <NavigationContainer>
         <root.Navigator initialRouteName="login">
             <root.Screen name="login" component={Login} options={{headerShown:false}}/>
             <root.Screen name="register" component={Register} options={{headerShown:false}}/>
             <root.Screen name="map" component={Map} />
         </root.Navigator>
     </NavigationContainer>
    );
}
