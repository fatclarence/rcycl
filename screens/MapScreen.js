import React, { useState, useEffect } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Marker, Callout } from 'react-native-maps';
import { firebase } from '../firebase.config';

export default function MapScreen() {

  const [bins, setBins] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const binsRef = firebase.firestore().collection('bins');

  useEffect(() => {
    binsRef.onSnapshot((querySnapshot) => {
      const bins = [];
      querySnapshot.forEach((doc) => {
        const { location, description } = doc.data();
        bins.push({ id: doc.id, location, description });
      })
      setBins(bins);
      setLoaded(bins.length != 0);
    });
  }, []);

  console.log(loaded);
  console.log(bins);

  function mapBins() {
    return (bins.map((bin) => (
      <Marker
        key={bin.id}
        coordinate={{latitude: bin.location.latitude, longitude: bin.location.longitude}}
      >
        <Callout>
          <Text>{bin.description}</Text>
        </Callout>

      </Marker>
    )));
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
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider="google"
        >

          {mapBins()}
        </MapView>
      </View>
    );
  } else {
    return (<Text>Loading...</Text>)
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