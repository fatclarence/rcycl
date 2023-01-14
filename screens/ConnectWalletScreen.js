import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConnectWalletScreen = ({navigation}) => {
  return (
    <View>
      <Text>ConnectWalletScreen</Text>
      <Button title="go to map" onPress={() => navigation.navigate("Map")}/>
      <Button title="QR code scanner" onPress={() => navigation.navigate("Scan")}/>
    </View>
  )
}

export default ConnectWalletScreen

const styles = StyleSheet.create({})