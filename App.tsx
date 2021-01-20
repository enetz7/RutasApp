import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import { Navegation } from './app/navegation';
import Login from './app/views/login/login';


export default function App() {
  LogBox.ignoreLogs(['Warning: ...']);
  return (
      <Navegation></Navegation>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});