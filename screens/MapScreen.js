import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

export default function MapScreen() {
  const [location, setLocation] = useState(null);
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
                showsUserLocation = {true}
                showsMyLocationButton={true}
                provider = "google"
                onUserLocationChange = {(locationChangedResult) => {
                  setLocation(locationChangedResult.nativeEvent.coordinate);
                  console.log(location);
                }}
            >
                <Marker 
                    coordinate={{ latitude : 1.295 , longitude : 103.7764 }}
                >
                  <Callout>
                    <View>
                      <Text> 
                        <Image style={{ height: 100, width:100 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} resizeMode="cover" />  
                      </Text>
                    
                      <Text>Hello</Text>
                    </View>
                  </Callout>
                </Marker>
            </MapView>
        </View>
      );
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