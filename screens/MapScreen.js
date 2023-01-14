import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
    const [location, setLocation] = useState({
        latitude: 1.2966,
        longitude: 103.7764,
        latitudeDelta: 0.008,
        longitudeDelta: 0.008,
    });
    const [loaded, setLoaded] = useState(false);
    const [latitude, setLatitude] = useState(1.2966);
    const [longitude, setLongitude] = useState(103.7764);
    const [errorMsg, setErrorMsg] = useState(null);
  
    setTimeout(() => {
      (async () => {
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
        setLoaded(true);
      })();
    }, 3000);
  
    let text = 'Waiting..';
    if (errorMsg) {
      text = errorMsg;
    } else if (location) {
      text = JSON.stringify(location);
      console.log(text);
    }
  if (loaded) {
    return (
        <View style={styles.container}>
            <MapView 
                style={styles.map} 
                initialRegion={{
                    latitude: 1.2966,
                    longitude: 103.7764,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
            >
                <Marker 
                    coordinate={{ latitude : 1.295 , longitude : 103.7764 }}
                />
    
            <Marker 
                    coordinate={{ latitude : latitude, longitude : longitude }}
                    pinColor = "green"
                />
            </MapView>
        </View>
      );
  } else {
    return (
        <View style={styles.container}>
            <Text>Loading...</Text>
        </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});