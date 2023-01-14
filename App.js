import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Navigator from './routes/homeStack';
import Scan from './src/components/Scan';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <View style={styles.container}>
      <Navigator/>
      {/* <Scan/> */}
    </View>
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
