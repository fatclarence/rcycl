import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from './screens/MapScreen';
import ConnectWalletScreen from './screens/ConnectWalletScreen';
import ScannerScreen from './screens/ScannerScreen';
import * as SQLite from "expo-sqlite";

const Stack = createNativeStackNavigator();
const db = SQLite.openDatabase("test4.db");

export default function App() {
  useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        "create table if not exists items (id integer primary key not null, latitude text, longitude text, description text);"
      );
      console.log('db created');
    });
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Connect Wallet" component={ConnectWalletScreen}/>
        <Stack.Screen name="Map" component={MapScreen}/>
        <Stack.Screen name="Scan" component={ScannerScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
    
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
