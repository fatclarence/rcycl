import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default function ScanButton({ navigation }) {
    
    const pressHandler= () => {
        navigation.navigate('Scan');
    }
    return (
        <View style={styles.container}>
            <Text style={styles.container}>Button</Text>
            <Button title='Scan QR code' onPress={pressHandler}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});
  