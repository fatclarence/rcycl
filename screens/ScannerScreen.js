import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

// import { SQLite } from "react-native-sqlite-storage";
import * as SQLite from "expo-sqlite";


export default function ScannerScreen() {
  // const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')


  const db = SQLite.openDatabase("test4.db");
  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })()
  }

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // add text to database
  const add = (text) => {
    console.log("adding");
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    const start_of_lat = text.search("latitude");
    const start_of_lon = text.search("longitude");
    const start_of_d = text.search("description");
    const end = text.length;
    const latitude = text.slice(start_of_lat+10, start_of_lon - 3);
    const longitude = text.slice(start_of_lon + 11, start_of_d - 3);
    const description = text.slice(start_of_d + 14, end - 2);

    db.transaction(
      (tx) => {
        tx.executeSql("insert into items (latitude, longitude, description) values (?, ?, ?)", [latitude, longitude, description]);
        tx.executeSql("select * from items", [], (_, { rows }) =>
           console.log(JSON.stringify(rows))
        );
      },
      null
    );
  };

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data)
    add(data)
    console.log('Type: ' + type + '\nData: ' + data)
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>)
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={'Allow Camera'} onPress={() => askForCameraPermission()} />
      </View>)
  }
  
  // Return the View
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {scanned && <Button title={'Scan again?'} onPress={() => setScanned(false)} color='tomato' />}
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
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: 300,
    overflow: 'hidden',
    borderRadius: 30,
    backgroundColor: 'tomato'
  }
});