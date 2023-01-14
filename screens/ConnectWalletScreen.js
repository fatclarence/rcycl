import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ConnectWalletScreen = ({navigation}) => {
  return (
    <View>
      <Text>ConnectWalletScreen</Text>
      <Button title="Connect" onPress={() => navigation.navigate("Home")}/>
    </View>
  )
}

export default ConnectWalletScreen

const styles = StyleSheet.create({})