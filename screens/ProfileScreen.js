import { StyleSheet, Text, View, Button } from "react-native";
import React from "react";
import { useWalletConnect } from "react-native-walletconnect";

const ProfileScreen = () => {
  const { killSession } = useWalletConnect();
  return (
    <View style={{ marginTop: 80 }}>
      {/* <Text>ProfileScreen</Text> */}
      <Button title="Kill Session" onPress={() => killSession()} />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
