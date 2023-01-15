import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useWalletConnect } from "react-native-walletconnect";
import { withOrientation } from "react-navigation";

const ProfileScreen = () => {
  const { killSession } = useWalletConnect();
  return (
    <View style={styles.container}>
      {/* <Text>ProfileScreen</Text> */}
      <TouchableOpacity title="Kill Session" style={styles.button} onPress={() => killSession()}>
        <Text style={styles.buttonText}>Kill Current Session</Text>
      </TouchableOpacity>

      <Image source={require('../icons/icon_transparent.png')} style={styles.image}/>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: "#0782F9",
    padding: 20,
    alignItems: 'center',
    width: '50%',
    borderRadius: 20,
    marginTop: '50%'
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
  },
  image: {
    width: '20%',
    height: '20%',
    resizeMode: 'contain',
  }
});
