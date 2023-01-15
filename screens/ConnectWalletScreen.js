import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useWalletConnect } from "react-native-walletconnect";

const styles = StyleSheet.create({});

// const ConnectWalletScreen = () => {
//   console.log("im here")
//   const { createSession } = useWalletConnect();

//   return (
//     <View>
//       {/* <Text>ConnectWalletScreen</Text> */}
//       <Button title="Connect" onPress={() => createSession()} />
//       {console.log('hi')}

//       {/* <Button title="Connect" onPress={() => navigation.navigate("Home")} /> */}
//     </View>
//   );
// };
const ConnectWalletScreen = ({ navigation }) => {
  return (
    <View>
      <Text>ConnectWalletScreen</Text>
      <Button title="Connect" onPress={() => navigation.navigate("Home")}/>
    </View>
  )
}

export default ConnectWalletScreen;
