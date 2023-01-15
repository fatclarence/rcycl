import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MapView from 'react-native-maps';
import { firebase } from '../firebase.config';

// import { SQLite } from "react-native-sqlite-storage";
// import * as SQLite from "expo-sqlite";

export default function ScannerScreen() {
  // const [forceUpdate, forceUpdateId] = useForceUpdate();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState('Not yet scanned')
  const [location, setLocation] = useState(null);

  const [exists, setExists] = useState(null);


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
   
   /** calculates the distance between two locations in KM < 0.01km */
   const distance = (lat1, lng1, lat2, lng2) => {
      //console.log(lat2);
      //console.log(lng2);
      function degToRad(deg) {
        return deg * (Math.PI / 180.0);
      }
   
       const earthRadius = 6371; // in miles, change to 6371 for kilometer output
   
       const dLat = degToRad(lat2-lat1);
       const dLng = degToRad(lng2-lng1);
   
       const sindLng = Math.sin(dLng / 2);
       const sindLat = Math.sin(dLat / 2);
   
       const a = Math.pow(sindLat, 2) + Math.pow(sindLng, 2)
           * Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2));
   
       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
   
       const dist = earthRadius * c;
   
       return dist < 0.03; // output distance, in MILES
   }

  // read text from database
  const add = (text) => {
    console.log("adding");
    // is text empty?
    if (text === null || text === "") {
      return false;
    }

    const userDocRef = firebase.firestore().collection('bins').doc(text);
    userDocRef.get().then((doc) => {
      if (!doc.exists) {
        setExists("Invalid QR code")
        console.log('No such document exists!'); 
      } else {
        const data = doc.data();
        setExists(data.description);
        const lat = data.location.latitude;
        const lon = data.location.longitude;
        const near = distance(lat, lon, location.latitude, location.longitude);
        if (near) {
          Alert.alert("Scanning success! GNR will be credited within 1 working day");
        } else {
          Alert.alert("Current Location not within 30 metres of bin!");
        }
        console.log('Document data:', data);
      }
  });
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
      <MapView 
        showsUserLocation = {true}
        provider = "google"
        onUserLocationChange = {(locationChangedResult) => {
          setLocation(locationChangedResult.nativeEvent.coordinate);
        }}
        style = {styles.map}
      />
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }} />
      </View>

      <Text style={styles.maintext}>{exists}</Text>

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
  },
  map: {
    width: 0,
    height: 0
  }
});