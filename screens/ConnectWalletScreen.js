import { TouchableOpacity, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { useWalletConnect } from "react-native-walletconnect";

const styles = StyleSheet.create({
  container: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center'
},
button: {
  backgroundColor: "#0782F9",
  padding: 20,
  alignItems: 'center',
  width: '50%',
  borderRadius: 20,
},
buttonText: {
  color: 'white',
  fontSize: 20,
},
image: {
  width: '80%',
  height: '50%',
  resizeMode: 'contain'
}
});

const ConnectWalletScreen = () => {
  const { createSession } = useWalletConnect();

  return (
    <View style={styles.container}>
      <Image source={require('../icons/icon_transparent.png')} style={styles.image}/>

      {/* <Text>ConnectWalletScreen</Text> */}
      <TouchableOpacity title="Connect" onPress={() => createSession()} style={styles.button}>
        <Text style={styles.buttonText}>Connect Wallet</Text>
      </TouchableOpacity>

      {/* <Button title="Connect" onPress={() => navigation.navigate("Home")} /> */}
    </View>
  )
}

export default ConnectWalletScreen;
